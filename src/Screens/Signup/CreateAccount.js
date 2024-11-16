import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
  Alert,
  Linking,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {styles} from '../../Styles/SignUp/CreateAccountStyles';
import {Images} from '../../../assets';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ADDRESS} from '../../utils/Constants';
import {connect} from 'react-redux';
import Validation from '../../Components/Validation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomLoader from '../../Components/CustomLoader';
import moment from 'moment';
import {Color} from '../../../global';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Dropdown} from 'react-native-element-dropdown';
import Geolocation from '@react-native-community/geolocation';
import RNExitApp from 'react-native-kill-app';
import * as commonActions from '../../redux/actions/commonActions';
import * as userActions from '../../redux/actions/userActions';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import CustomStatusBar from '../../Components/CustomStatusBar';
import {NAMEREGEX} from '../../utils/Constants';
import {showError, storeData} from '../../utils/helperFunctions';
import DeviceInfo from 'react-native-device-info';
import {NetworkInfo} from 'react-native-network-info';
import {onGetAddressDetails} from '../../redux/GoogleApis/GoogleApis';
import {T_AND_C_URL} from '../../services/config/index.url';

const Pin = /^\d{6}$/;
const EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const today = new Date();
var ago18Years_date = new Date(
  today.getFullYear() - 18,
  today.getMonth(),
  today.getDate(),
);
var ago64Years_date = new Date(
  today.getFullYear() - 65,
  today.getMonth(),
  today.getDate() - 363,
);

const CreateAccount = props => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [emailId, setEmailId] = useState('');
  const [gender, setGender] = useState('');
  const [referralcode, setReferralcode] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const {MOBILE_NUMBER, TOKEN} = route?.params || {};
  const [loadingVisibility, setLoadingVisibility] = useState(false);
  const [validationVisible, setValidationVisible] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date(ago18Years_date));
  const [genderValid, setGenderValid] = useState(true);
  const [genderAlert, setGenderAlert] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isStateFocus, setIsStateFocus] = useState(false);
  const [stateValue, setStateValue] = useState(null);
  const [stateData, setStateData] = useState([]);
  const [DD, setDD] = useState('');
  const [MM, setMM] = useState('');
  const [YYYY, setYYYY] = useState('');
  const [markerPosition, setMarkerPosition] = useState(null);
  const [errorMessages, setErrorMessages] = useState({});
  const [ipAddress, setIpAddress] = useState('');
  const [imeiNumber, setImeiNumber] = useState('');
  const [trackingId, setTrackingId] = useState(null);

  useEffect(() => {
    getIpAddress();
    getIMEINumber();
    getStateList();
    checkTackingUser();
    getLocation();
  }, []);

  const getIpAddress = () =>
    NetworkInfo.getIPAddress().then(ipAddress => {
      setIpAddress(ipAddress);
    });

  const getIMEINumber = async () => {
    let uniqueID = await DeviceInfo.getUniqueId();
    setImeiNumber(uniqueID);
  };

  const getStateList = async () => {
    props.onStateList(
      res => onStateListSuccessCallBack(res),
      error => onStateListFailureCallBack(error),
    );
  };

  const onStateListSuccessCallBack = async res => {
    setStateData(res?.data.sort((a, b) => a.NAME.localeCompare(b.NAME)));
  };

  const onStateListFailureCallBack = error => {
    let msg = error;
    if (error == undefined || error == null) {
      msg = 'Something went wrong';
    }
    props.showErrorModal(msg, true);
  };

  const checkTackingUser = () => {
    const data = {
      TYPE: 'TRACK',
      PHONE_NUMBER: MOBILE_NUMBER,
    };
    props.onTrackUser(
      data,
      res => onTrackUserSuccessCallBack(res),
      error => onTrackUserFailureCallBack(error),
    );
  };

  const onTrackUserSuccessCallBack = async res => {
    if (res?.message === 'success' && res?.TRACKING_ID) {
      setTrackingId(res.TRACKING_ID);
    }
  };

  const onTrackUserFailureCallBack = error => {
    let msg = error;
    if (error == undefined || error == null) {
      msg = 'Something went wrong';
    }
    props.showErrorModal(msg, true);
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
      if (response?.data?.results?.length > 0) {
        const village = response?.data.results[0].address_components.find(
          component => component.types.includes('sublocality'),
        );
        const village1 = response?.data.results[0].address_components.find(
          component => component.types.includes('sublocality_level_1'),
        );
        const village2 = response?.data.results[0].address_components.find(
          component => component.types.includes('sublocality_level_2'),
        );
        const city = response?.data.results[0].address_components.find(
          component => component.types.includes('locality'),
        );
        const state = response?.data.results[0].address_components.find(
          component => component.types.includes('administrative_area_level_1'),
        );
        const pincode = response?.data.results[0].address_components.find(
          component => component.types.includes('postal_code'),
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
        setMarkerPosition({
          latitude: latitude,
          longitude: longitude,
          address2: localAddress,
          city: sCity,
          state: sState,
          pincode: sPincode,
        });
        autoFill(localAddress, sCity, sState, sPincode);
      }
      setLoadingVisibility(false);
    } catch (error) {
      setLoadingVisibility(false);
      showError('Something went wrong');
    }
  };

  const onRegister = async data => {
    if (trackingId) {
      const data = {
        TRACKING_ID: trackingId,
        TYPE: 'TRACK_DOWLOAD',
      };
      props.onTrackUser(
        data,
        res => onTrackDownloadSuccessCallBack(res),
        error => onTrackDownloadFailureCallBack(error),
      );
    }
    try {
      storeData('userData', data)
        .then(value => {
          props.saveProfileData(data);
        })
        .catch(error => {});
      await AsyncStorage.setItem('token', TOKEN);
      setLoadingVisibility(false);
      navigation.reset({
        index: 0,
        routes: [{name: 'BottomTabNavigation'}],
      });
    } catch (error) {
      setLoadingVisibility(false);
      showError('Something went wrong');
    }
  };

  const onTrackDownloadSuccessCallBack = async res => {};

  const onTrackDownloadFailureCallBack = error => {
    let msg = error;
    if (error == undefined || error == null) {
      msg = 'Something went wrong';
    }
    props.showErrorModal(msg, true);
  };

  const handleSaveAddress = () => {
    let validate = validateFields();
    if (validate) {
      const data = {
        MOBILE_NUMBER: '91' + MOBILE_NUMBER,
        ADDRESS_TYPE: 'Home',
        ADDRESS: address1 + ', ' + address2,
        STATE: stateValue,
        CITY: city,
        ZIP_CODE: pincode,
        LOCATION: {
          type: 'Point',
          x_coordinates: markerPosition?.longitude,
          y_coordinates: markerPosition?.latitude,
        },
        TOKEN: TOKEN,
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
    handleCreateAccount();
  };

  const onAddLocationFailureCallBack = error => {
    let msg = error;
    if (error == undefined || error == null) {
      msg = 'Something went wrong';
    }
    props.showErrorModal(msg, true);
  };

  const handleCreateAccount = async () => {
    const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
    const data = {
      MOBILE_NUMBER: '91' + MOBILE_NUMBER,
      FIRST_NAME: firstName,
      LAST_NAME: lastName,
      EMAIL: emailId,
      LANGUAGE: 'English',
      ADDRESS: address1 + ', ' + address2,
      STATE: stateValue,
      CITY: city,
      ZIP_CODE: pincode,
      GENDER: gender,
      DATE_OF_BIRTH: formattedDate,
      REF_CODE: referralcode,
      LOCATION: {
        type: 'Point',
        x_coordinates: markerPosition?.longitude,
        y_coordinates: markerPosition?.latitude,
      },
      LOCK_PIN: '1',
      IP_ADDRESS: ipAddress,
      IMEI_NUMBER: imeiNumber,
      TOKEN: TOKEN,
      TYPE: 'i',
    };
    props.onRegisterUser(
      data,
      res => onRegisterUserSuccessCallBack(res),
      error => onRegisterUserFailureCallBack(error),
    );
  };

  const onRegisterUserSuccessCallBack = async res => {
    onRegister(res);
  };

  const onRegisterUserFailureCallBack = error => {
    let msg = error;
    if (error == undefined || error == null) {
      msg = 'Something went wrong';
    }
    props.showErrorModal(msg, true);
  };

  const validateFields = () => {
    const errors = {};
    if (firstName.trim() === '') {
      errors.firstName = 'Please enter the first name';
    } else if (!NAMEREGEX.test(firstName)) {
      errors.firstName = 'Please enter valid first name';
    }
    if (lastName.trim() === '') {
      errors.lastName = 'Please enter the last name';
    } else if (!NAMEREGEX.test(lastName)) {
      errors.lastName = 'Please enter valid last name';
    }
    if (address1.trim() === '') {
      errors.address1 = 'Please enter the Address Lane 1';
    } else if (!ADDRESS.test(address1)) {
      errors.address1 = 'Please enter the Address Lane 1';
    }
    if (address2.trim() === '') {
      errors.address2 = 'Please enter the Address Lane 2';
    } else if (!ADDRESS.test(address2)) {
      errors.address2 = 'Please enter the Address Lane 2';
    }
    if (city.trim() === '') {
      errors.city = 'Please enter the City';
    } else if (!NAMEREGEX.test(city)) {
      errors.city = 'Please enter Valid City';
    }
    if (stateValue === null) {
      errors.state = 'Please select the State';
    }
    if (pincode.trim() === '') {
      errors.pincode = 'Please enter the pincode';
    } else if (!Pin.test(pincode)) {
      errors.pincode = 'Please enter correct pincode';
    }
    if (emailId.trim() === '') {
      errors.emailId = 'Please enter the EmailID';
    } else if (!EMAIL.test(emailId)) {
      errors.emailId = 'Please enter correct EmailID';
    }
    if (gender === '') {
      errors.gender = 'Please Check the Gender';
    }
    if (DD === '' && MM === '' && YYYY === '') {
      errors.dob = 'Please select the Date Of Birth';
    }
    if (!acceptTerms) {
      errors.acceptTerms = 'Please Check the Terms';
    }
    setErrorMessages(errors);
    if (Object.keys(errors).length === 0) {
      return true;
    } else {
      return false;
    }
  };

  const onConfirmPress = date => {
    setShowDatePicker(false);
    setSelectedDate(date);
    const dateObject = new Date(date);

    const DD = String(dateObject.getDate()).padStart(2, '0');
    const MM = String(dateObject.getMonth() + 1).padStart(2, '0');
    const YYYY = dateObject.getFullYear();

    setDD(DD);
    setMM(MM);
    setYYYY(YYYY);
  };

  const autoFill = (village, city, state, pincode) => {
    setAddress2(village);
    setCity(city);
    setStateValue(state);
    setPincode(pincode);
  };

  return (
    <View style={styles.container}>
      <CustomStatusBar backgroundColor={'#efefef'} barStyle="dark-content" />
      <CustomLoader visible={loadingVisibility} />
      <Validation
        visible={validationVisible}
        message={validationMessage}
        onRetry={() => {
          setValidationVisible(false);
        }}
      />

      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Create your Account</Text>
        <View style={styles.topView}>
          <View style={{...styles.innerView, justifyContent: 'flex-start'}}>
            <View
              style={{
                ...styles.leftView,
                width: '50%',
              }}>
              <Text style={styles.label}>
                First Name <Text style={styles.alertText}> *</Text>
              </Text>
            </View>
            <View
              style={{
                ...styles.leftView,
                width: '50%',
                marginLeft: '2%',
              }}>
              <Text style={styles.label}>
                Last Name <Text style={styles.alertText}> *</Text>
              </Text>
            </View>
          </View>
          <View style={styles.innerView}>
            <View style={styles.leftView}>
              <TextInput
                placeholder="First name"
                value={firstName}
                maxLength={50}
                onChangeText={text => setFirstName(text)}
                style={styles.input}
                keyboardType="default"
                returnKeyType="next"
                onSubmitEditing={() => {
                  firstTextInput.focus();
                }}
                blurOnSubmit={false}
                placeholderTextColor={'rgba(0, 0, 0, 0.65)'}
              />
              {errorMessages.firstName ? (
                <Text style={styles.errorMsgText}>
                  {errorMessages.firstName}
                </Text>
              ) : null}
            </View>
            <View style={styles.leftView}>
              <TextInput
                ref={input => {
                  firstTextInput = input;
                }}
                placeholder="Last name"
                value={lastName}
                maxLength={50}
                onChangeText={text => setLastName(text)}
                style={styles.input}
                keyboardType="default"
                returnKeyType="next"
                onSubmitEditing={() => {
                  secondTextInput.focus();
                }}
                blurOnSubmit={false}
                placeholderTextColor={'rgba(0, 0, 0, 0.65)'}
              />
              {errorMessages.lastName ? (
                <Text style={styles.errorMsgText}>
                  {errorMessages.lastName}
                </Text>
              ) : null}
            </View>
          </View>
        </View>
        <View style={styles.topView}>
          <View style={styles.innerView}>
            <View style={styles.leftView}>
              <Text style={styles.label}>
                Address <Text style={styles.alertText}> *</Text>
              </Text>
            </View>
          </View>
          <View style={styles.innerView}>
            <View style={{...styles.leftView, flex: 1}}>
              <TextInput
                ref={input => {
                  secondTextInput = input;
                }}
                placeholder="Address line 1"
                value={address1}
                maxLength={50}
                onChangeText={text => setAddress1(text)}
                style={[styles.input, {width: '100%'}]}
                keyboardType="default"
                returnKeyType="next"
                onSubmitEditing={() => {
                  thirdTextInput.focus();
                }}
                placeholderTextColor={'rgba(0, 0, 0, 0.65)'}
              />
              {errorMessages.address1 ? (
                <Text style={styles.errorMsgText}>
                  {errorMessages.address1}
                </Text>
              ) : null}
            </View>
          </View>
          <View style={styles.innerView}>
            <View style={{...styles.leftView, flex: 1}}>
              <TextInput
                ref={input => {
                  thirdTextInput = input;
                }}
                placeholder="Address line 2"
                value={address2}
                maxLength={50}
                onChangeText={text => setAddress2(text)}
                style={[styles.input, {width: '100%'}]}
                keyboardType="default"
                returnKeyType="next"
                onSubmitEditing={() => {
                  fourthTextInput.focus();
                }}
                placeholderTextColor={'rgba(0, 0, 0, 0.65)'}
              />
              {errorMessages.address2 ? (
                <Text style={styles.errorMsgText}>
                  {errorMessages.address2}
                </Text>
              ) : null}
            </View>
          </View>
          <View style={styles.innerView}>
            <View style={styles.leftView}>
              <TextInput
                ref={input => {
                  fourthTextInput = input;
                }}
                placeholder="City"
                value={city}
                maxLength={30}
                onChangeText={text => setCity(text)}
                style={styles.input}
                keyboardType="default"
                returnKeyType="next"
                onSubmitEditing={() => {
                  fifthTextInput.focus();
                }}
                placeholderTextColor={'rgba(0, 0, 0, 0.65)'}
              />
              {errorMessages.city ? (
                <Text style={styles.errorMsgText}>{errorMessages.city}</Text>
              ) : null}
            </View>
            <View style={styles.leftView}>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                itemTextStyle={styles.itemTextStyle}
                search={false}
                data={stateData}
                maxHeight={300}
                labelField="NAME"
                valueField="NAME"
                placeholder="State"
                value={stateValue}
                onChange={item => {
                  setStateValue(item.NAME);
                  setIsStateFocus(false);
                  setState('');
                }}
                onFocus={() => setIsStateFocus(true)}
                onBlur={() => setIsStateFocus(false)}
                renderRightIcon={() => (
                  <Ionicons
                    color={Color.colorBlack}
                    name={isStateFocus ? 'chevron-up' : 'chevron-down'}
                    size={18}
                  />
                )}
              />
              {errorMessages.state ? (
                <Text style={styles.errorMsgText}>{errorMessages.state}</Text>
              ) : null}
            </View>
          </View>
          <View style={styles.innerView}>
            <View style={{...styles.leftView, flex: 1}}>
              <TextInput
                ref={input => {
                  fifthTextInput = input;
                }}
                placeholder="Pin code"
                value={pincode}
                onChangeText={text => setPincode(text)}
                style={[styles.input, {width: '100%'}]}
                maxLength={6}
                keyboardType="number-pad"
                returnKeyType="next"
                onSubmitEditing={() => {
                  sixthTextInput.focus();
                }}
                placeholderTextColor={'rgba(0, 0, 0, 0.65)'}
              />
              {errorMessages.pincode ? (
                <Text style={styles.errorMsgText}>{errorMessages.pincode}</Text>
              ) : null}
            </View>
          </View>
          <View style={styles.innerView}>
            <View style={{...styles.leftView, flex: 1}}>
              <TextInput
                ref={input => {
                  sixthTextInput = input;
                }}
                placeholder="Email id"
                value={emailId}
                onChangeText={text => setEmailId(text)}
                style={[styles.input, {width: '100%'}]}
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() => {
                  seventhTextInput.focus();
                }}
                placeholderTextColor={'rgba(0, 0, 0, 0.65)'}
              />
              {errorMessages.emailId ? (
                <Text style={styles.errorMsgText}>{errorMessages.emailId}</Text>
              ) : null}
            </View>
          </View>
        </View>
        <View style={styles.topView}>
          <View style={styles.innerView}>
            <View style={styles.leftView}>
              <Text style={styles.label}>
                Gender <Text style={styles.alertText}> *</Text>
              </Text>
            </View>
          </View>
          <View style={styles.innerView}>
            <View style={styles.leftView}>
              <TouchableOpacity
                style={[
                  styles.genderCard,
                  gender === 'Female' && {backgroundColor: '#E4E1E1'},
                ]}
                onPress={() => {
                  setGender('Female');
                  setGenderAlert(false);
                  setGenderValid(true);
                }}>
                <Image source={Images.female} style={styles.genderImage} />

                <Text style={styles.genderTitle}>Female</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.leftView}>
              <TouchableOpacity
                style={[
                  styles.genderCard,
                  gender === 'Male' && {backgroundColor: '#E4E1E1'},
                ]}
                onPress={() => {
                  setGender('Male');
                  setGenderAlert(false);
                  setGenderValid(true);
                }}>
                <Image source={Images.male} style={styles.genderImage} />

                <Text style={styles.genderTitle}>Male</Text>
              </TouchableOpacity>
            </View>
          </View>
          {errorMessages.gender ? (
            <Text style={styles.errorMsgText}>{errorMessages.gender}</Text>
          ) : null}
        </View>
        <View style={styles.topView}>
          <View style={styles.innerView}>
            <View style={styles.leftView}>
              <Text style={styles.label}>
                Date of Birth <Text style={styles.alertText}> *</Text>
              </Text>
            </View>
          </View>
          <View style={{marginTop: '4%'}}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => setShowDatePicker(true)}
              style={[styles.leftView, styles.dateMainView]}>
              <View style={styles.dateView}>
                <Text style={styles.dateText}>{DD != '' ? DD : 'DD'}</Text>
              </View>
              <View style={styles.dateView1}>
                <Text style={styles.dateText}>{MM != '' ? MM : 'MM'}</Text>
              </View>
              <View style={styles.dateView}>
                <Text style={styles.dateText}>
                  {YYYY != '' ? YYYY : 'YYYY'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          {errorMessages.dob ? (
            <Text style={styles.errorMsgText}>{errorMessages.dob}</Text>
          ) : null}
          <DatePicker
            modal
            mode="date"
            open={showDatePicker}
            date={selectedDate}
            onConfirm={date => onConfirmPress(date)}
            onCancel={() => {
              setShowDatePicker(false);
            }}
            maximumDate={ago18Years_date}
            minimumDate={ago64Years_date}
          />
        </View>
        <View style={styles.topView}>
          <View style={styles.innerView}>
            <View style={styles.leftView}>
              <Text style={styles.label}>Refferal code</Text>
            </View>
          </View>
          <View style={styles.innerView}>
            <View style={{...styles.leftView, flex: 1}}>
              <TextInput
                ref={input => {
                  seventhTextInput = input;
                }}
                placeholder="Enter referral code (optional)"
                value={referralcode}
                onChangeText={text => setReferralcode(text)}
                style={[styles.input, {width: '100%'}]}
                keyboardType="default"
                placeholderTextColor={'rgba(0, 0, 0, 0.65)'}
              />
            </View>
          </View>
          <View style={styles.innerView}>
            <View style={styles.acceptView}>
              <TouchableOpacity
                onPress={() => setAcceptTerms(!acceptTerms)}
                style={styles.checkboxStyle}>
                <MaterialCommunityIcons
                  name={
                    acceptTerms ? 'checkbox-marked' : 'checkbox-blank-outline'
                  }
                  size={24}
                  color={Color.colorBlack}
                />
              </TouchableOpacity>
              <View style={styles.acceptTermsView}>
                <Text style={styles.acceptTermsText}>Accept the</Text>
                <TouchableOpacity
                  onPress={() => Linking.openURL(`${T_AND_C_URL}`)}>
                  <Text style={{color: Color.colorOrange}}>
                    {' Terms of service'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {errorMessages.acceptTerms ? (
            <Text style={styles.errorMsgText}>{errorMessages.acceptTerms}</Text>
          ) : null}
        </View>
        <TouchableOpacity
          onPress={() => handleSaveAddress()}
          style={[styles.createAccountButton]}>
          <Text style={styles.createAccountButtonText}>{'Create Account'}</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    onStateList: (successCallBack, failureCallBack) =>
      dispatch(userActions.onStateList(successCallBack, failureCallBack)),
    onTrackUser: (data, successCallBack, failureCallBack) =>
      dispatch(userActions.onTrackUser(data, successCallBack, failureCallBack)),
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccount);
