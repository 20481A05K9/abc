import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Linking,
  Modal,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import {Styles} from '../../Styles/Location/LocationStyles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Geolocation from '@react-native-community/geolocation';
import MapView, {Marker} from 'react-native-maps';
import {useNavigation} from '@react-navigation/native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {Color, FontFamily, FontSize} from '../../../global';
import {ADDRESS, MAPS_API__KEY} from '../../utils/Constants';
import {connect} from 'react-redux';
import CustomLoader from '../../Components/CustomLoader';
import Validation from '../../Components/Validation';
import RNExitApp from 'react-native-kill-app';
import * as commonActions from '../../redux/actions/commonActions';
import * as userActions from '../../redux/actions/userActions';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import CustomStatusBar from '../../Components/CustomStatusBar';
import {showError} from '../../utils/helperFunctions';
import { onGetAddressDetails } from '../../redux/GoogleApis/GoogleApis';

const LocationHis = props => {
  const navigation = useNavigation();
  const [locationName, setLocationName] = useState('');
  const [landmark, setlandmark] = useState('');
  const [saveAddress, setSaveAddress] = useState('Home');
  const [selectedButton, setSelectedButton] = useState(''); 
  const [isModalVisible, setModalVisible] = useState(false);
  const [flatNumber, setFlatNumber] = useState('');
  const [error, setErrortxt] = useState();
  const [mobileNo, setMobileNo] = useState(null);
  const [loadingVisibility, setLoadingVisibility] = useState(false);
  const [validationVisible, setValidationVisible] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');
  const [markerPosition, setMarkerPosition] = useState(null);
  const mapViewRef = useRef();

  useEffect(() => {
    getData();
    getLocation();
  }, []);

  useEffect(() => {
    if (markerPosition != null && markerPosition != undefined) {
      navigateToMarker();
    }
  }, [markerPosition]);

  const getData = async () => {
    try {
      const {user} = props.userData;
      setMobileNo(user?.MOBILE_NUMBER);
    } catch (error) {
    }
  };

  const getLocation = async () => {
    try {
      const granted = await Permission();
      if (granted === 'granted') {
        setLoadingVisibility(true);
        Geolocation.getCurrentPosition(
          pos => {
            const crd = pos.coords;
            getCityName(crd.latitude, crd.longitude);
          },
          error => {
            setLoadingVisibility(false);
            Alert.alert(
              'Location',
              'Unable to fetch location. Please check your device loction settings',
            );
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
              onPress: () => navigation.goBack(),
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

  const onMarkerDragEnd = e => {
    const {latitude, longitude} = e.nativeEvent.coordinate;
    getCityName(latitude, longitude);
  };

  const getCityName = async (latitude, longitude) => {
    setLoadingVisibility(true);
    try {
      const data = {latitude: latitude, longitude: longitude};
      const response = await onGetAddressDetails(data);

      if (response?.data?.results?.length > 0) {
        const village = response?.data.results[0].address_components.find(component =>
          component.types.includes('sublocality'),
        );
        const village1 = response?.data.results[0].address_components.find(component =>
          component.types.includes('sublocality_level_1'),
        );
        const village2 = response?.data.results[0].address_components.find(component =>
          component.types.includes('sublocality_level_2'),
        );
        const city = response?.data.results[0].address_components.find(component =>
          component.types.includes('locality'),
        );
        const state = response?.data.results[0].address_components.find(component =>
          component.types.includes('administrative_area_level_1'),
        );
        const pincode = response?.data.results[0].address_components.find(component =>
          component.types.includes('postal_code'),
        );
        let sVillage = village ? village.long_name : null;
        let sVillage1 = village1 ? village1.long_name : null;
        let sVillage2 = village2 ? village2.long_name : null;
        let sCity = city ? city.long_name : null;
        let sState = state ? state.long_name : null;
        let sPincode = pincode ? pincode.long_name : null;
        let localAddress = '';
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
        setMarkerPosition({
          latitude: latitude,
          longitude: longitude,
          address: sVillage,
          address1: sVillage1,
          address2: sVillage2,
          localAddress: localAddress,
          city: sCity,
          state: sState,
          pincode: sPincode,
        });
        let areaAddress = '';
        if (sVillage) {
          if (Object.keys(areaAddress).length === 0) {
            areaAddress = sVillage;
          } else {
            areaAddress = areaAddress + ', ' + sVillage;
          }
        }
        if (localAddress) {
          if (Object.keys(areaAddress).length === 0) {
            areaAddress = localAddress;
          } else {
            areaAddress = areaAddress + ', ' + localAddress;
          }
        }
        setLocationName(areaAddress);
      }
      setLoadingVisibility(false);
    } catch (error) {
      setLoadingVisibility(false);
      showError('Something went wrong');
    }
  };

  const navigateToMarker = () => {
    mapViewRef.current.animateToRegion(
      {
        ...markerPosition,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      1000,
    );
  };

  const checkAddress = (fNumber, localAddressName, landmarkDetails) => {
    let addressLocal = '';
    if (fNumber) {
      if (Object.keys(addressLocal).length === 0) {
        addressLocal = fNumber;
      } else {
        addressLocal = addressLocal + ', ' + fNumber;
      }
    }
    if (localAddressName) {
      if (Object.keys(addressLocal).length === 0) {
        addressLocal = localAddressName;
      } else {
        addressLocal = addressLocal + ', ' + localAddressName;
      }
    }
    if (landmarkDetails) {
      if (Object.keys(addressLocal).length === 0) {
        addressLocal = landmarkDetails;
      } else {
        addressLocal = addressLocal + ', ' + landmarkDetails;
      }
    }
    return addressLocal;
  };

  const handleSaveAddress = () => {
    if (
      !saveAddress ||
      !flatNumber ||
      flatNumber.trim().length == 0 ||
      !locationName ||
      locationName.trim().length == 0
    ) {
      setErrortxt('Please Fill all the Required Fields');
    } else {
      setErrortxt('');
      let allAddress = checkAddress(flatNumber, locationName, landmark);
      const data = {
        MOBILE_NUMBER: mobileNo,
        ADDRESS_TYPE: saveAddress,
        ADDRESS: allAddress,
        STATE: markerPosition?.state,
        CITY: markerPosition?.city,
        ZIP_CODE: markerPosition?.pincode,
        LOCATION: {
          type: 'Point',
          x_coordinates: markerPosition.longitude,
          y_coordinates: markerPosition.latitude,
        },
        TYPE: 'i',
      };
      props.onAddLocation(
        data,
        res => onAddLocationSuccessCallBack(res),
        error => onAddLocationFailureCallBack(error),
      );
    }
  };

  const onAddLocationSuccessCallBack = async res => {
    setModalVisible(false);
    navigation.goBack();
  };

  const onAddLocationFailureCallBack = error => {
    let msg = error;
    if (error == undefined || error == null) {
      msg = 'Something went wrong';
    }
    props.showErrorModal(msg, true);
  };

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
      <View style={Styles.topView1}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}>
          <FontAwesome5 name="arrow-left" size={22} color={Color.colorBlack} />
        </TouchableOpacity>
        <Text style={Styles.locationtxt1}>Confirm location</Text>
      </View>
      {markerPosition ? (
        <MapView
          ref={mapViewRef}
          initialRegion={{
            latitude: markerPosition?.latitude,
            longitude: markerPosition?.longitude,
            latitudeDelta: 0.5,
            longitudeDelta: 0.5,
          }}
          provider="google"
          mapType="terrain"
          style={Styles.map}
          showsUserLocation
          zoomEnabled
          draggable>
          <Marker
            draggable
            coordinate={{
              latitude: markerPosition.latitude,
              longitude: markerPosition.longitude,
            }}
            onDragEnd={onMarkerDragEnd}
          />
        </MapView>
      ) : (
        <View style={Styles.noLatLngView}>
          <Text style={Styles.noLatLngText}>
            {'Search your Area from search box'}
          </Text>
        </View>
      )}
      <View style={Styles.searchView}>
        <View style={Styles.serachbarparentcontainer1}>
          <View style={Styles.icon2}>
            <FontAwesome name="search" size={20} color={Color.colorOrange} />
          </View>
          <View style={Styles.autocomplete1}>
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
              textInputProps={{
                placeholderTextColor: '#000',
              }}
              onPress={(data, details = null) => {
                getCityName(
                  details?.geometry?.location?.lat,
                  details?.geometry?.location?.lng,
                );
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
      </View>
      {markerPosition && (
        <View style={Styles.markerContainer}>
          <View style={Styles.coordinatesContainer}>
            <FontAwesome6
              name="location-dot"
              color="red"
              size={16}
              style={{marginRight: '5%', marginLeft: '2%', marginTop: '1%'}}
            />
            <View>
              <Text
                style={[
                  Styles.coordinateText,
                  {fontFamily: FontFamily.montserratSemiBold},
                ]}>
                {markerPosition?.address}
              </Text>
              <Text style={Styles.coordinateText}>
                {markerPosition?.localAddress + ', ' + markerPosition?.city}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={Styles.contTO}
            activeOpacity={0.5}
            onPress={() => setModalVisible(true)}>
            <Text style={Styles.contText}>Enter complete address</Text>
          </TouchableOpacity>
        </View>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <TouchableOpacity
          style={{flex: 1}}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}>
          <TouchableOpacity
            style={Styles.viewStyle1}
            onPress={() => setModalVisible(false)}>
            <MaterialIcons name="cancel" size={40} />
          </TouchableOpacity>
          <View style={Styles.viewStyle}>
            <View>
              <Text style={Styles.txt2}>Enter Complete Address</Text>
            </View>
            <Text style={Styles.horizontalLine1}></Text>
            <ScrollView contentContainerStyle={{paddingBottom: '70%'}}>
              <Text style={Styles.savetxt}>Save address as *</Text>
              <View style={Styles.addressView}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    setSaveAddress('Home'), setSelectedButton('Home');
                  }}>
                  <Text
                    style={[
                      Styles.hometxt1,
                      {
                        borderColor:
                          saveAddress === 'Home'
                            ? '#F9A738'
                            : Color.colorOrange,
                        backgroundColor:
                          saveAddress === 'Home' ? '#fcdaaa' : Color.colorWhite,
                      },
                    ]}>
                    Home
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    setSaveAddress('Hotel'), setSelectedButton('Hotel');
                  }}>
                  <Text
                    style={[
                      Styles.hometxt1,
                      {
                        borderColor:
                          saveAddress === 'Hotel'
                            ? '#F9A738'
                            : Color.colorOrange,
                        backgroundColor:
                          saveAddress === 'Hotel'
                            ? '#fcdaaa'
                            : Color.colorWhite,
                      },
                    ]}>
                    Hotel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    setSaveAddress('Office'), setSelectedButton('Office');
                  }}>
                  <Text
                    style={[
                      Styles.hometxt1,
                      {
                        borderColor:
                          saveAddress === 'Office'
                            ? '#F9A738'
                            : Color.colorOrange,
                        backgroundColor:
                          saveAddress === 'Office'
                            ? '#fcdaaa'
                            : Color.colorWhite,
                      },
                    ]}>
                    Office
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    setSaveAddress('Other'), setSelectedButton('Other');
                  }}>
                  <Text
                    style={[
                      Styles.hometxt1,
                      {
                        borderColor:
                          saveAddress === 'Other'
                            ? '#F9A738'
                            : Color.colorOrange,
                        backgroundColor:
                          saveAddress === 'Other'
                            ? '#fcdaaa'
                            : Color.colorWhite,
                      },
                    ]}>
                    Other
                  </Text>
                </TouchableOpacity>
                {selectedButton === 'Other' && (
                  <>
                    <TextInput
                      placeholder={'Other'}
                      keyboardType="default"
                      style={Styles.othertxtfield}
                      onChangeText={text => setSaveAddress(text)}
                      placeholderTextColor={'rgba(0, 0, 0, 0.65)'}
                    />
                    <TouchableOpacity
                      style={{marginRight: '5%', marginTop: '2%'}}
                      onPress={() => setSelectedButton(' ')}>
                      <MaterialIcons
                        name="cancel"
                        size={20}
                        color={Color.colorOrange}
                      />
                    </TouchableOpacity>
                  </>
                )}
              </View>
              <Text style={Styles.horizontalLine1}></Text>
              <KeyboardAvoidingView keyboardVerticalOffset={100}>
                <TextInput
                  placeholder="Flat-number / House *"
                  keyboardType="default"
                  maxLength={50}
                  style={[Styles.input4, {color: Color.colorBlack}]}
                  value={flatNumber}
                  onChangeText={text => {
                    if (ADDRESS.test(text)) {
                      setFlatNumber(text);
                    }
                  }}
                  placeholderTextColor={'rgba(0, 0, 0, 0.65)'}
                />
                <TextInput
                  placeholder="Area / Sector / Locality *"
                  keyboardType="default"
                  style={[Styles.input4, {color: Color.colorBlack}]}
                  maxLength={50}
                  value={locationName}
                  onChangeText={text => {
                    if (ADDRESS.test(text)) {
                      setLocationName(text);
                    }
                  }}
                  placeholderTextColor={'rgba(0, 0, 0, 0.65)'}
                />
                <TextInput
                  placeholder="Nearby landmark (optional)"
                  keyboardType="default"
                  style={[Styles.input4, {color: Color.colorBlack}]}
                  value={landmark}
                  maxLength={30}
                  onChangeText={text => {
                    if (ADDRESS.test(text)) {
                      setlandmark(text);
                    }
                  }}
                  placeholderTextColor={'rgba(0, 0, 0, 0.65)'}
                />
              </KeyboardAvoidingView>
              {error && (
                <Text style={{color: 'red', marginLeft: '5%'}}>{error}</Text>
              )}
              <View>
                <TouchableOpacity
                  style={Styles.insertBtnTO}
                  activeOpacity={0.7}
                  onPress={() => handleSaveAddress()}>
                  <Text style={Styles.insertBtnText}>Save Address</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const mapStateToProps = state => {
  return {userData: state.user.userData};
};

const mapDispatchToProps = dispatch => {
  return {
    onAddLocation: (data, successCallBack, failureCallBack) =>
      dispatch(
        userActions.onAddLocation(data, successCallBack, failureCallBack),
      ),
    showErrorModal: (message, isFromError) =>
      dispatch(commonActions.showErrorModal(message, isFromError)),
    hideErrorModal: () => dispatch(commonActions.hideErrorModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationHis);
