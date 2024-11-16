import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  PermissionsAndroid,
  Platform,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Color} from '../../../../global';
import RNFetchBlob from 'rn-fetch-blob';
import {useNavigation, useRoute} from '@react-navigation/native';
import {styles} from '../../../Styles/History/Trip/TripDetailStyles';
import {Images} from '../../../../assets';
import {connect} from 'react-redux';
import CustomLoader from '../../../Components/CustomLoader';
import Validation from '../../../Components/Validation';
import moment from 'moment';
import RNFS from 'react-native-fs';
import DeviceInfo from 'react-native-device-info';
import Share from 'react-native-share';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as commonActions from '../../../redux/actions/commonActions';
import * as userActions from '../../../redux/actions/userActions';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import CarWashCard from '../../../Components/ScreenTopCard/CarWashCard';
import CardPopupModal from '../../../Components/ScreenTopCard/CardPopupModal';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import CustomStatusBar from '../../../Components/CustomStatusBar';
import { onGetAddressDetails } from '../../../redux/GoogleApis/GoogleApis';

const TripDetails = props => {
  const navigation = useNavigation();
  const route = useRoute();
  const {TripID} = route.params || {};
  const [loadingVisibility, setLoadingVisibility] = useState(false);
  const [validationVisible, setValidationVisible] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');
  const [mobileNo, setMobileNo] = useState(null);
  const [tripData, setTripData] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [sourceCityName, setSourceCityName] = useState('');
  const [destinationCityName, setDestinationCityName] = useState('');
  const [showViewUrl, setShowViewUrl] = useState(false);
  const [insuranceList, setInsuranceList] = useState([]);
  const [insuranceDropDown, setInsuranceDropDown] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const {user} = props.userData;
      setMobileNo(user?.MOBILE_NUMBER);
      getTripDetails(user?.MOBILE_NUMBER);
    } catch (error) {
    }
  };

  const getTripDetails = contact => {
    const data = {
      MOBILE_NUMBER: mobileNo == null ? contact : mobileNo,
      TYPE: 'l',
      TRIP_ID: TripID,
    };
    props.onTripDetails(
      data,
      res => onTripDetailsSuccessCallBack(res),
      error => onTripDetailsFailureCallBack(error),
    );
  };

  const onTripDetailsSuccessCallBack = async res => {
    let tData = res?.data;
    setTripData(tData);
    getSourceCityName(
      tData?.trip?.GEO_LOCATION?.y_coordinates,
      tData?.trip?.GEO_LOCATION?.x_coordinates,
    );
    getDestinationCityName(
      tData?.trip?.DEST_GEO_LOCATION?.y_coordinates,
      tData?.trip?.DEST_GEO_LOCATION?.x_coordinates,
    );
    const organizedData = organizeData(tData?.tripInsurenceList);
    setInsuranceDropDown(organizedData);
    const fData = organizedData.filter(
      item => item.DOCUMENT_URL != '' && item.DOCUMENT_URL != undefined,
    );
    setInsuranceList(fData);
  };

  const onTripDetailsFailureCallBack = error => {
    let msg = error;
    if (error == undefined || error == null) {
      msg = 'Something went wrong';
    }
    props.showErrorModal(msg, true);
  };

  const getSourceCityName = async (latitude, longitude) => {
    setLoadingVisibility(true);
    try {
      const data = {latitude: latitude, longitude: longitude};
      const response = await onGetAddressDetails(data);
      if (response?.data.results.length > 0) {
        const city = response?.data.results[0].address_components.find(component =>
          component.types.includes('locality'),
        );
        let sCity = city ? city.long_name : null;

        setSourceCityName(sCity);
      }
      setLoadingVisibility(false);
    } catch (error) {
      setLoadingVisibility(false);
    }
  };

  const getDestinationCityName = async (latitude, longitude) => {
    setLoadingVisibility(true);
    try {
      const data = {latitude: latitude, longitude: longitude};
      const response = await onGetAddressDetails(data);
      if (response?.data.results.length > 0) {
        const city = response?.data.results[0].address_components.find(component =>
          component.types.includes('locality'),
        );
        let sCity = city ? city.long_name : null;

        setDestinationCityName(sCity);
      }
      setLoadingVisibility(false);
    } catch (error) {
      setLoadingVisibility(false);
    }
  };

  function organizeData(input) {
    const result = [];
    const map = new Map();

    input.forEach(item => {
      const key = `${item.INSURENCE_APP_NUMBER}-${item.DOCUMENT_URL}`;
      if (!map.has(key)) {
        map.set(key, {
          policyNo: item.INSURENCE_APP_NUMBER,
          DOCUMENT_URL: item.DOCUMENT_URL,
          COI_NUMBER: item.COI_NUMBER,
          focus: false,
          data: [],
        });
      }
      map.get(key).data.push(item);
    });

    map.forEach(value => {
      result.push(value);
    });

    return result;
  }

  const onPressTripCancel = () => {
    const data = {
      TYPE: 'c',
      MOBILE_NUMBER: mobileNo,
      ID: TripID,
    };
    props.onTripList(
      data,
      res => onTripCancelSuccessCallBack(res),
      error => onTripCancelFailureCallBack(error),
    );
  };

  const onTripCancelSuccessCallBack = async res => {
    navigation.goBack();
  };

  const onTripCancelFailureCallBack = error => {
    let msg = error;
    if (error == undefined || error == null) {
      msg = 'Something went wrong';
    }
    props.showErrorModal(msg, true);
  };

  const onSharePress = async () => {
    let isStoragePermitted = await requestExternalWritePermission();
    if (isStoragePermitted) {
      setLoadingVisibility(true);
      try {
        const htmlContent = await htmlDesign();
        const options = {
          html: htmlContent,
          fileName: 'trip_' + tripData?.trip?.TRIP_NUMBER,
          directory: RNFS.CachesDirectoryPath,
        };
        const pdfFile = await RNHTMLtoPDF.convert(options);
        const shareOptions = {url: `file://${pdfFile.filePath}`};
        try {
          setLoadingVisibility(false);
          await Share.open(shareOptions);
        } catch (error) {
          setLoadingVisibility(false);
        }
      } catch (error) {
        setLoadingVisibility(false);
        Alert.alert('Failed', error);
      }
    } else {
      Alert.alert('Failed', 'Please grant storage permission');
    }
  };

  const htmlDesign = async () => {
    return `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>PDF</title>
          <style>
              body{
                  font-family: 'Times New Roman', Times, serif;
              }
          </style>
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
          <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
      </head>
      <body>
          <div class="container mt-1">
              <div class="d-flex justify-content-center border-bottom border-dark">
                  <h4 class="mt-4 fw-semibold" style="color: #F9A738;">Balert Electroic Slip Trip-Details</h4>
              </div>
              <div class="border-bottom border-warning">
                  <p class="fs-5 fw-bold" style="color: #F9A738;">${
                    tripData?.trip?.STATUS == 3
                      ? 'Cancelled'
                      : tripData?.trip?.TRIP_STATUS
                  }-Trip</p>
                  <p class="fs-5 fw-semibold">From : <span class="fw-normal">${sourceCityName}</span></p>
                  <p class="fs-5 fw-semibold">To : <span class="fw-normal">${destinationCityName}</span></p>
                  <p class="fs-5 fw-semibold">Trip Id : <span class="fw-normal">${
                    tripData?.trip?.TRIP_NUMBER
                  }</span></p>
                  <p class="fs-5 fw-semibold">Trip Created On : <span class="fw-normal">${moment(
                    tripData?.trip?.START_DATE_TIME,
                  ).format('DD-MM-YYYY')}</span></p>
              </div>
              <div class="border-bottom border-warning">
                  <p class="fs-5 fw-bold" style="color: #F9A738;">Insurance</p>
                  <table class="table table-striped table-bordered">
                    <tr>
                      <th>Applicaation Number</th>
                      <th>COI Number</th>
                      <th>Family Members</th>
                      <th>URL</th>
                    </tr>
                    ${insuranceDropDown.map((item, index) => {
                      return `
                        <tr>
                          <td>${
                            item?.policyNo != undefined
                              ? item?.policyNo
                              : 'Under Process'
                          }</td>
                          <td>${
                            item?.COI_NUMBER != undefined &&
                            item?.COI_NUMBER != ''
                              ? item?.COI_NUMBER
                              : 'Under Process'
                          }</td>
                          <td>${item?.data.map(
                            (item1, index1) =>
                              ' ' +
                              item1?.FIRST_NAME +
                              ' ' +
                              item1?.LAST_NAME +
                              ' ',
                          )}</td>
                          <td>${
                            item?.DOCUMENT_URL != undefined &&
                            item?.DOCUMENT_URL != ''
                              ? `<a href="${item.DOCUMENT_URL}">Click here</a>`
                              : 'Under Process'
                          }</td>
                        </tr>
                      `;
                    })}
                  </table>
              </div>
              ${
                tripData?.rsa != null
                  ? `
                <div class="border-bottom border-warning">
                  <p class="fs-5 fw-bold" style="color: #F9A738;">RSA</p>
                  <p class="fs-5 fw-semibold">Reference Number : <span class="fw-normal">${tripData?.rsa?.RSA_NUMBER}</span></p>
                  <p class="fs-5 fw-semibold">Vehicle Number : <span class="fw-normal">${tripData?.trip?.VEHICLE_NUMBER}</span></p>
                </div>
              `
                  : ''
              }
              ${
                tripData?.fastag != null
                  ? `
                <div class="border-bottom border-warning">
                  <p class="fs-5 fw-bold" style="color: #F9A738;">FASTAG</p>
                  <p class="fs-5 fw-semibold">Recharge Amount : <span class="fw-normal">${tripData?.fastag?.AMOUNT}</span></p>
                  <p class="fs-5 fw-semibold">Vehicle Number : <span class="fw-normal">${tripData?.fastag?.VEHICLE_NUMBER}</span></p>
                </div>
              `
                  : ''
              }
              <div>
                  <p class="fs-5 fw-semibold mt-2 mb-2 text-light text-center p-1" style="background-color: #F9A738;">Thank you for using Balert Services</p>
              </div>
          </div>
      </body>
      </html>`;
  };

  const requestExternalWritePermission = async () => {
    let permission;

    if (Platform.OS === 'ios') {
      permission = PERMISSIONS.IOS.PHOTO_LIBRARY;
    } else {
      if (DeviceInfo.getSystemVersion() >= 13) {
        permission = PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES;
      } else {
        permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
      }
    }

    try {
      const result = await request(permission);
      if (result === RESULTS.GRANTED) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };

  const insuranceDownload = async url => {
    let isStoragePermitted = await requestExternalWritePermission();
    if (isStoragePermitted) {
      setLoadingVisibility(true);
      if (url != '' && url != null && url != undefined) {
        const uriParts = url.split('/');
        const fileName = uriParts[uriParts.length - 1];

        const {dirs} = RNFetchBlob.fs;
        RNFetchBlob.config({
          fileCache: true,
          addAndroidDownloads: {
            useDownloadManager: true,
            notification: true,
            mediaScannable: true,
            title: `${fileName}`,
            path: `${dirs.DownloadDir}/${fileName}`,
          },
        })
          .fetch('GET', url, {})
          .then(res => {
            setLoadingVisibility(false);
          })
          .catch(e => {
            setLoadingVisibility(false);
          });
      } else {
        setLoadingVisibility(false);
      }
    }
  };

  const renderViewUrl = () => {
    return (
      <Modal
        visible={showViewUrl}
        animationType={'fade'}
        transparent={true}
        onRequestClose={() => setShowViewUrl(false)}>
        <View style={styles.MSGAlertBGViewStyle}>
          <View style={styles.MSGAlert_Main_View_Style}>
            <TouchableOpacity
              style={styles.BtnMSGTouchStyle}
              onPress={() => setShowViewUrl(false)}
              activeOpacity={0.2}>
              <Ionicons name="close" size={30} color={Color.colorOrange} />
            </TouchableOpacity>
            <ScrollView>
              {insuranceList.length != 0 ? (
                insuranceList.map((item, index) => {
                  return (
                    <View key={index}>
                      <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => insuranceDownload(item.DOCUMENT_URL)}
                        style={styles.urlView}>
                        <Text style={styles.urlText}>{item.DOCUMENT_URL}</Text>
                      </TouchableOpacity>
                      {index < insuranceList.length - 1 && (
                        <View style={styles.horizontalLine} />
                      )}
                    </View>
                  );
                })
              ) : (
                <View>
                  <Text style={styles.comingSoonText}>{'Under process'}</Text>
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  };

  useEffect(() => {}, [insuranceDropDown]);

  const onClickDropDown = async index => {
    const onclickItem = insuranceDropDown[index];
    const updatedArray = insuranceDropDown.map(item => ({
      ...item,
      focus: false,
    }));
    if (onclickItem?.focus == false) {
      updatedArray[index].focus = true;
    }
    setInsuranceDropDown(updatedArray);
  };

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <CustomStatusBar backgroundColor={'#efefef'} barStyle="dark-content" />
      <CustomLoader visible={loadingVisibility} />
      <Validation
        visible={validationVisible}
        message={validationMessage}
        onRetry={() => {
          setValidationVisible(false);
        }}
      />
      {renderViewUrl()}
      <View style={styles.container}>
        <Text style={styles.tripdetailtext}>Trip details</Text>
        <View style={{marginLeft: '-5%', marginBottom: '5%'}}>
          {Platform.OS == 'ios' ? (
            <CarWashCard
              bg1={'#ffebd8'}
              bg2={'#ffebd8'}
              round1={'#ffebd8'}
              round2={'#ffebd8'}
              txt1={'Start your Journey\nwith our expertise'}
              txt2={''}
              btn1={'#FF5B5B'}
              btn2={'#FF5B5B'}
              btnText={'Plan a trip >'}
              img={Images.TripImage1}
              onPress={() => setModalVisible(true)}
              roundShow={true}
            />
          ) : (
            <CarWashCard
              bg1={'#F8F1FF'}
              bg2={'#F8F1FF'}
              round1={'#F8F1FF'}
              round2={'#F8F1FF'}
              txt1={'Start your Journey\nwith our expertise'}
              txt2={''}
              btn1={'#FF5B5B'}
              btn2={'#FF5B5B'}
              btnText={'Plan a trip >'}
              img={Images.TripImage1}
              onPress={() => setModalVisible(true)}
              roundShow={true}
            />
          )}
        </View>
        <CardPopupModal
          visible={isModalVisible}
          title={'Plan a trip'}
          message={
            'Looking for a safe and secure trip assistance? BALERT will help you out with every service you need as a personal vehicle owner.'
          }
          img={Images.TripImage2}
          onClose={() => {
            setModalVisible(false);
          }}
        />
        <View style={styles.view1}>
          {tripData?.trip?.STATUS == 3 ? (
            <View
              style={[
                styles.livetxtView,
                {
                  backgroundColor: Color.colorCancelled,
                },
              ]}>
              <Text style={styles.livetxt}>{'Cancelled'}</Text>
            </View>
          ) : (
            <View
              style={[
                styles.livetxtView,
                {
                  backgroundColor:
                    tripData?.trip?.TRIP_STATUS == 'LIVE'
                      ? Color.colorLive
                      : tripData?.trip?.TRIP_STATUS == 'Upcomming'
                      ? Color.colorUpcoming
                      : Color.colorBlack1,
                },
              ]}>
              <Text style={styles.livetxt}>{tripData?.trip?.TRIP_STATUS}</Text>
            </View>
          )}
          <View style={styles.leftcontainer}>
            <Text style={styles.from}>From</Text>
            <Image
              style={styles.flag}
              contentFit="cover"
              source={Images.flag}
            />
            <Text style={styles.to}>To</Text>
          </View>
          <View style={styles.leftcontainer}>
            <View style={{flex: 1 / 2, marginRight: '2%'}}>
              <Text style={styles.banglore}>{sourceCityName}</Text>
            </View>
            <View style={{flex: 1 / 2}}>
              <Text style={styles.hyd}>{destinationCityName}</Text>
            </View>
          </View>
          <Text style={styles.id}>
            {'Trip id : '}
            <Text style={{color: '#000', fontSize: 13}}>
              {tripData?.trip?.TRIP_NUMBER}
            </Text>
          </Text>

          <Text style={styles.date}>
            {moment(tripData?.trip?.START_DATE_TIME).format('DD-MM-YYYY')}
          </Text>
        </View>

        <View style={styles.view2}>
          <View style={{marginTop: '5%'}}>
            <Text style={styles.insurance}>Insurance</Text>
            <Text style={[styles.familymembers, {marginTop: '3%'}]}>
              Family members:
            </Text>
          </View>
          {insuranceDropDown.map((item, index) => {
            return (
              <View key={index} style={styles.familyMView}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.familyMName}>
                    {'Application number : '}
                  </Text>
                  <Text style={styles.familyMId}>
                    {item?.policyNo != undefined
                      ? item?.policyNo
                      : 'Under Process'}
                  </Text>
                  <TouchableOpacity
                    style={{marginLeft: '1%'}}
                    activeOpacity={0.5}
                    onPress={() => onClickDropDown(index)}>
                    <Ionicons
                      color={Color.colorBlack}
                      name={item.focus ? 'chevron-up' : 'chevron-down'}
                      size={20}
                    />
                  </TouchableOpacity>
                </View>
                {item?.focus && (
                  <>
                    <View style={{flexDirection: 'row', marginTop: '2%'}}>
                      <Text style={styles.familyMName}>{'COI number : '}</Text>
                      <Text style={styles.familyMId}>
                        {item?.COI_NUMBER != undefined && item?.COI_NUMBER != ''
                          ? item?.COI_NUMBER
                          : 'Under Process'}
                      </Text>
                    </View>
                    {item?.data.map((item1, index1) => {
                      return (
                        <Text
                          key={index1}
                          style={[
                            styles.familyMName,
                            index1 == 0 && {marginTop: '2%'},
                          ]}>
                          {item1?.FIRST_NAME + ' ' + item1?.LAST_NAME}
                        </Text>
                      );
                    })}
                  </>
                )}
                {index < insuranceDropDown.length - 1 && (
                  <View style={styles.insuranceHorizontalLine} />
                )}
              </View>
            );
          })}
          <View style={styles.insuranceBottomView}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => setShowViewUrl(true)}
              style={[
                styles.downloadBtnTO,
                insuranceList.length == 0 && {
                  backgroundColor: Color.colorbackground,
                  elevation: 0,
                },
              ]}
              disabled={insuranceList.length == 0}>
              <MaterialCommunityIcons
                name={'download-circle'}
                size={30}
                color={
                  insuranceList.length == 0
                    ? Color.colorDimgray
                    : Color.colorGreen
                }
              />
              <Text
                style={[
                  styles.downloadBtnText,
                  insuranceList.length == 0 && {color: Color.colorDimgray},
                ]}>
                Download
              </Text>
            </TouchableOpacity>
            <Text style={[styles.nov20233]}>
              {moment(tripData?.trip?.START_DATE_TIME).format('DD-MM-YYYY')}
            </Text>
          </View>
          <Text style={[styles.insuranceNoteText]}>
            {
              'Your application is in process, and we will share it through WhatsApp once it is done.'
            }
          </Text>
        </View>

        {tripData?.rsa != null && (
          <View style={styles.view2}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '3%',
              }}>
              <Text style={styles.insurance}>RSA</Text>
            </View>
            <Text style={[styles.familymembers, {marginTop: '2%'}]}>
              Reference number:{' '}
              <Text style={styles.refno}>{tripData?.rsa?.RSA_NUMBER}</Text>
            </Text>
            <Text style={styles.rsavehicleno}>
              Vehicle number:{' '}
              <Text style={styles.rsanoplate}>
                {tripData?.trip?.VEHICLE_NUMBER}
              </Text>
            </Text>
            <View style={styles.rsaBottomView}>
              <Text style={styles.rsadate}>
                {moment(tripData?.trip?.START_DATE_TIME).format('DD-MM-YYYY')}
              </Text>
              <Image
                style={[styles.frameInner, styles.childFrameLayout]}
                contentFit="cover"
                source={Images.RSA}
              />
            </View>
          </View>
        )}

        {tripData?.fastag != null && (
          <View style={styles.view2}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Image
                source={Images.fasTagimg}
                resizeMode="cover"
                style={styles.fastaglogo}
              />
              <Text style={styles.date}>
                {moment(tripData?.trip?.START_DATE_TIME).format('DD-MM-YYYY')}
              </Text>
            </View>
            <Text style={styles.fastagvehicle}>
              Vehicle number:{' '}
              <Text style={styles.fastagvehno}>
                {tripData?.fastag?.VEHICLE_NUMBER}
              </Text>
            </Text>
            <Text style={styles.fastagvehicle}>
              Transaction ID:{' '}
              <Text style={styles.fastagvehno}>
                {tripData?.fastag?.rpid != undefined &&
                tripData?.fastag?.rpid != ''
                  ? tripData?.fastag?.rpid
                  : 'Under Process'}
              </Text>
            </Text>
            <Text style={styles.fastagvehicle}>
              Recharge amount:{' '}
              <Text style={styles.fastagvehno}>{tripData?.fastag?.AMOUNT}</Text>
            </Text>
          </View>
        )}

        <View style={styles.bottomBtnView}>
          <TouchableOpacity
            style={[
              styles.download,
              insuranceList.length == 0 && {borderColor: '#e9d9c2'},
            ]}
            onPress={() => onSharePress()}
            disabled={insuranceList.length == 0}>
            <Text
              style={[
                styles.downloadtext,
                insuranceList.length == 0 && {color: '#e9d9c2'},
              ]}>
              Share
            </Text>
          </TouchableOpacity>
          {tripData?.trip?.STATUS !== 3
            ? tripData?.trip?.TRIP_STATUS == 'Upcomming' && (
                <TouchableOpacity
                  style={styles.download}
                  onPress={() => onPressTripCancel()}>
                  <Text style={styles.downloadtext}>Cancel</Text>
                </TouchableOpacity>
              )
            : null}
        </View>
      </View>
    </ScrollView>
  );
};

const mapStateToProps = state => {
  return {userData: state.user.userData};
};

const mapDispatchToProps = dispatch => {
  return {
    onTripDetails: (data, successCallBack, failureCallBack) =>
      dispatch(
        userActions.onTripDetails(data, successCallBack, failureCallBack),
      ),
    onTripList: (data, successCallBack, failureCallBack) =>
      dispatch(userActions.onTripList(data, successCallBack, failureCallBack)),
    showErrorModal: (message, isFromError) =>
      dispatch(commonActions.showErrorModal(message, isFromError)),
    hideErrorModal: () => dispatch(commonActions.hideErrorModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TripDetails);
