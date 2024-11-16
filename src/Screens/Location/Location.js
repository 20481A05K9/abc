import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  FlatList,
  Linking,
  Image,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Styles} from '../../Styles/Location/LocationStyles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Geolocation from '@react-native-community/geolocation';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {useNavigation} from '@react-navigation/native';
import {Color, FontFamily, FontSize} from '../../../global';
import {MAPS_API__KEY} from '../../utils/Constants';
import {connect} from 'react-redux';
import CustomLoader from '../../Components/CustomLoader';
import Validation from '../../Components/Validation';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import RNExitApp from 'react-native-kill-app';
import {Images} from '../../../assets';
import * as commonActions from '../../redux/actions/commonActions';
import * as userActions from '../../redux/actions/userActions';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import CustomStatusBar from '../../Components/CustomStatusBar';
import {storeData} from '../../utils/helperFunctions';
import { onGetAddressDetails } from '../../redux/GoogleApis/GoogleApis';

const Location = props => {
  const [LocationName, setLocationName] = useState('');
  const navigation = useNavigation();
  const [mobileNo, setMobileNo] = useState(null);
  const [loadingVisibility, setLoadingVisibility] = useState(false);
  const [validationVisible, setValidationVisible] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');
  const [addressListData, setAddressListData] = useState([]);

  useEffect(() => {
    const willFocusSubscription = navigation.addListener('focus', () => {
      getData();
    });
    return willFocusSubscription;
  }, []);

  const getData = async () => {
    try {
      const {user} = props.userData;
      setMobileNo(user?.MOBILE_NUMBER);
      getLocationList(user?.MOBILE_NUMBER);
    } catch (error) {
    }
  };

  const getLocationList = async contact => {
    const data = {
      MOBILE_NUMBER: mobileNo == null ? contact : mobileNo,
      TYPE: 'l',
    };
    props.onAddLocation(
      data,
      res => onAddLocationSuccessCallBack(res),
      error => onAddLocationFailureCallBack(error),
    );
  };

  const onAddLocationSuccessCallBack = async res => {
    setAddressListData(res?.data);
  };

  const onAddLocationFailureCallBack = error => {
    let msg = error;
    if (error == undefined || error == null) {
      msg = 'Something went wrong';
    }
    props.showErrorModal(msg, true);
  };

  const fetchAddress = async () => {
    try {
      const granted = await Permission();
      if (granted === 'granted') {
        setLoadingVisibility(true);
        Geolocation.getCurrentPosition(
          pos => {
            const crd = pos.coords;
            setLoadingVisibility(false);
            getCityName(crd.latitude, crd.longitude);
          },
          error => {
            setLoadingVisibility(false);
            alert('Unable to fetch location');
          },
          {enableHighAccuracy: false, timeout: 30000},
        );
      } else {
        setLoadingVisibility(false);
        let msg =
          Platform.OS == 'ios'
            ? "Click on 'Location' then check Always"
            : "'App Permissions' and then on 'Location' to allow access.";
        Alert.alert(
          'Hold!',
          "Without location access we will not be able to detect your location.\n\nPlease tap on 'Settings' then " +
            msg,
          [
            {
              text: 'Cancel',
              onPress: () => {},
            },
            {
              text: 'Settings',
              onPress: () => {
                Platform.OS == 'android'
                  ? (Linking.openSettings(), RNExitApp.exitApp())
                  : Linking.openSettings();
              },
            },
          ],
        );
      }
    } catch (error) {
      setLoadingVisibility(false);
      Alert.alert('Location', error?.message);
    }
  };

  const Permission = async () => {
    let permission;

    if (Platform.OS === 'ios') {
      permission = PERMISSIONS.IOS.LOCATION_ALWAYS;
    } else {
      permission = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
    }

    try {
      const result = await request(permission);
      if (result === RESULTS.GRANTED) {
        return RESULTS.GRANTED;
      } else {
        return RESULTS.DENIED;
      }
    } catch (error) {
      return RESULTS.DENIED;
    }
  };

  const getCityName = async (latitude, longitude) => {
    setLoadingVisibility(true);
    try {
      const data = {latitude: latitude, longitude: longitude};
      const response = await onGetAddressDetails(data);

      if (response.data.results.length > 0) {
        const village = response.data.results[0].address_components.find(
          component => component.types.includes('sublocality'),
        );
        const village1 = response.data.results[0].address_components.find(
          component => component.types.includes('sublocality_level_1'),
        );
        const village2 = response.data.results[0].address_components.find(
          component => component.types.includes('sublocality_level_2'),
        );
        const city = response.data.results[0].address_components.find(
          component => component.types.includes('locality'),
        );
        const pincode = response.data.results[0].address_components.find(
          component => component.types.includes('postal_code'),
        );
        const state = response.data.results[0].address_components.find(
          component => component.types.includes('administrative_area_level_1'),
        );
        let sVillage = village ? village.long_name : null;
        let sVillage1 = village1 ? village1.long_name : null;
        let sVillage2 = village2 ? village2.long_name : null;
        let sCity = city ? city.long_name : null;
        let sState = state ? state.long_name : null;
        let sPincode = pincode ? pincode.long_name : null;
        let localAddress = '';
        if (sVillage) {
          if (Object.keys(localAddress).length === 0) {
            localAddress = sVillage;
          } else {
            localAddress = localAddress + ', ' + sVillage;
          }
        }
        if (sVillage2) {
          if (Object.keys(localAddress).length === 0) {
            localAddress = sVillage2;
          } else {
            localAddress = localAddress + ', ' + sVillage2;
          }
        }
        if (sVillage1) {
          if (Object.keys(localAddress).length === 0) {
            localAddress = sVillage1;
          } else {
            localAddress = localAddress + ', ' + sVillage1;
          }
        }
        handleChangeAddress(
          sCity,
          sPincode,
          sState,
          localAddress,
          latitude,
          longitude,
          'Other',
        );
      } else {
        setLoadingVisibility(false);
        Alert.alert('Error', 'Something went wrong');
      }
    } catch (error) {
      setLoadingVisibility(false);
      Alert.alert('Error', 'Something went wrong');
    }
  };

  const handleChangeAddress = (
    sCity,
    sPincode,
    sState,
    sVillage,
    latitude,
    longitude,
    addressType,
  ) => {
    const data = {
      MOBILE_NUMBER: mobileNo,
      ADDRESS: sVillage,
      STATE: sState,
      CITY: sCity,
      ZIP_CODE: sPincode,
      LOCATION: {
        type: 'Point',
        x_coordinates: longitude,
        y_coordinates: latitude,
      },
      ADDRESS_TYPE: addressType,
      TYPE: 'u',
    };
    props.onRegisterUser(
      data,
      res => onRegisterUserSuccessCallBack(res, data),
      error => onRegisterUserFailureCallBack(error),
    );
  };

  const onRegisterUserSuccessCallBack = async (res, paramsData) => {
    const data = {
      ...props.userData,
      user: {...props.userData?.user, ...paramsData},
    };
    storeData('userData', data)
      .then(value => {})
      .catch(error => {
      });
    props.saveProfileData(data);
    navigation.goBack();
  };

  const onRegisterUserFailureCallBack = error => {
    let msg = error;
    if (error == undefined || error == null) {
      msg = 'Something went wrong';
    }
    props.showErrorModal(msg, true);
  };

  const onDeletePress = ID => {
    const data = {
      ID: ID,
      MOBILE_NUMBER: mobileNo,
      TYPE: 'd',
    };
    props.onAddLocation(
      data,
      res => onDelLocationSuccessCallBack(res),
      error => onDelLocationFailureCallBack(error),
    );
  };

  const onDelLocationSuccessCallBack = async res => {
    getLocationList();
  };

  const onDelLocationFailureCallBack = error => {
    let msg = error;
    if (error == undefined || error == null) {
      msg = 'Something went wrong';
    }
    props.showErrorModal(msg, true);
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() =>
        handleChangeAddress(
          item.CITY,
          item.ZIP_CODE,
          item.STATE,
          item.ADDRESS,
          item.LOCATION?.y_coordinates,
          item.LOCATION?.x_coordinates,
          item.ADDRESS_TYPE,
        )
      }
      style={Styles.container1}>
      <MaterialIcons
        name={
          item.ADDRESS_TYPE === 'Office'
            ? 'work'
            : item.ADDRESS_TYPE === 'Hotel'
            ? 'hotel'
            : item.ADDRESS_TYPE === 'Home'
            ? 'home'
            : 'flag'
        }
        size={25}
        color={Color.colorOrange}
        style={Styles.iconstyle}
      />
      <View style={Styles.container2}>
        <Text style={Styles.text2}>{item.ADDRESS_TYPE}</Text>
        <Text
          style={
            Styles.text3
          }>{`${item.ADDRESS}, ${item.CITY}, ${item.STATE}, ${item.ZIP_CODE}`}</Text>
      </View>
      <View style={Styles.editView}>
        <TouchableOpacity
          style={{marginTop: wp('4%')}}
          activeOpacity={0.5}
          onPress={() => onDeletePress(item._id)}>
          <MaterialIcons name="delete" size={25} color={Color.colorOrange} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={Styles.container}>
      <CustomStatusBar backgroundColor="#efefef" barStyle="dark-content" />
      <CustomLoader visible={loadingVisibility} />
      <Validation
        visible={validationVisible}
        message={validationMessage}
        onRetry={() => {
          setValidationVisible(false);
        }}
      />
      <View style={Styles.topView}>
        <Text style={Styles.locationtxt}>Enter your location</Text>
      </View>
      <View style={Styles.serachbarparentcontainer}>
        <Text style={Styles.icon}>
          <FontAwesome name="search" size={20} color={Color.colorOrange} />
        </Text>
        <View style={Styles.autocomplete}>
          <GooglePlacesAutocomplete
            placeholder="Enter Location"
            GooglePlacesDetailsQuery={{fields: 'geometry'}}
            fetchDetails={true}
            styles={{
              textInput: Styles.textinput,
              color: Color.colorBlack,
              description: {
                color: Color.colorBlack,
                fontSize: FontSize.size_13,
                fontFamily: FontFamily.montserratMedium,
              },
            }}
            onPress={(data, details = null) => {
              setLocationName(data?.description);
              getCityName(
                details?.geometry?.location?.lat,
                details?.geometry?.location?.lng,
              );
            }}
            textInputProps={{
              placeholderTextColor: '#000',
            }}
            query={{
              key: MAPS_API__KEY,
              language: 'en',
              components: 'country:in',
            }}
            onFail={error => {}}
          />
        </View>
      </View>
      <View style={Styles.view4}>
        <TouchableOpacity onPress={() => fetchAddress()}>
          <View style={Styles.View3}>
            <MaterialIcons
              name="my-location"
              size={26}
              color={Color.colorOrange}
              style={Styles.icon1}
            />
            <Text style={Styles.hometxt}>use current location</Text>
          </View>
        </TouchableOpacity>
        <View style={Styles.horizontalLine}></View>
        <TouchableOpacity
          disabled={addressListData.length >= 3 ? true : false}
          onPress={() => navigation.navigate('LocationHis')}>
          <View style={Styles.View3}>
            <MaterialCommunityIcons
              name="plus"
              size={26}
              color={
                addressListData.length >= 3 ? '#FBD39B' : Color.colorOrange
              }
              style={Styles.icon1}
            />
            <Text
              style={[
                Styles.hometxt,
                addressListData.length >= 3 && {color: Color.Inputborder},
              ]}>
              Add Address
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={Styles.container3}>
        <Text style={Styles.text1}>---------- Saved Address ----------</Text>
        {addressListData.length != 0 ? (
          <FlatList
            data={addressListData}
            keyExtractor={item => item._id.toString()}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: '5%'}}
          />
        ) : (
          <Image source={Images.noRecordFound} style={Styles.noRecordFound} />
        )}
      </View>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    userData: state.user.userData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddLocation: (data, successCallBack, failureCallBack) =>
      dispatch(
        userActions.onAddLocation(data, successCallBack, failureCallBack),
      ),
    onRegisterUser: (data, successCallBack, failureCallBack) =>
      dispatch(
        userActions.onRegisterUser(data, successCallBack, failureCallBack),
      ),
    saveProfileData: data => dispatch(userActions.saveProfileData(data)),
    showErrorModal: (message, isFromError) =>
      dispatch(commonActions.showErrorModal(message, isFromError)),
    hideErrorModal: () => dispatch(commonActions.hideErrorModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Location);
