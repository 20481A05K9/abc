import React, {useEffect, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Image,
  ScrollView,
  Alert,
  Linking,
} from 'react-native';
import {Color, FontFamily} from '../../../global';
import {Images} from '../../../assets/index';
import {styles} from '../../Styles/Profile/EditProfileStyles';
import CustomLoader from '../../Components/CustomLoader';
import Validation from '../../Components/Validation';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';
import {Dropdown} from 'react-native-element-dropdown';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as commonActions from '../../redux/actions/commonActions';
import * as userActions from '../../redux/actions/userActions';
import CustomStatusBar from '../../Components/CustomStatusBar';
import {NAMEREGEX} from '../../utils/Constants';
import {showError, storeData} from '../../utils/helperFunctions';
import moment from 'moment';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {CONTACT_URL} from '../../services/config/index.url';

var ago19days_date = new Date(new Date().setDate(new Date().getDate() - 90));

const Editprofile = props => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [email, setEmail] = useState('');
  const [loadingVisibility, setLoadingVisibility] = useState(false);
  const [validationVisible, setValidationVisible] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');
  const [address1, setAddress1] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [gender, setGender] = useState('');
  const [isStateFocus, setIsStateFocus] = useState(false);
  const [stateValue, setStateValue] = useState(null);
  const [stateData, setStateData] = useState([]);
  const [userData, setUserData] = useState({});
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState(new Date(ago19days_date));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [DD, setDD] = useState('');
  const [MM, setMM] = useState('');
  const [YYYY, setYYYY] = useState('');
  const [lockPin, setLockPin] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');

  useEffect(() => {
    getData();
    getStateList();
  }, []);

  const getData = async () => {
    try {
      let {user} = props?.userData;
      setUserData(user);
      setFirstName(user.FIRST_NAME);
      setLastName(user.LAST_NAME);
      setMobileNo(user.MOBILE_NUMBER);
      setEmail(user.EMAIL);
      setAddress1(user.ADDRESS);
      setCity(user.CITY);
      setStateValue(user.STATE);
      setPincode(user.ZIP_CODE);
      setGender(user.GENDER);
      setLockPin(user.LOCK_PIN);
      onConfirmPress(new Date(user.DATE_OF_BIRTH));
    } catch (error) {}
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

  const onRegister = async paramsData => {
    try {
      const data = {
        ...props.userData,
        user: {...props.userData?.user, ...paramsData},
      };
      storeData('userData', data)
        .then(value => {})
        .catch(error => {});
      props.saveProfileData(data);
      setLoadingVisibility(false);
      navigation.goBack();
    } catch (error) {
      setLoadingVisibility(false);
      showError('Something went wrong');
    }
  };

  const handleSave = () => {
    let hasError = false;
    if (firstName.trim() === '') {
      setFirstNameError('Please enter a valid first name');
      hasError = true;
    } else {
      setFirstNameError('');
    }
    if (lastName.trim() === '') {
      setLastNameError('Please enter a valid last name');
      hasError = true;
    } else {
      setLastNameError('');
    }

    if (hasError) {
      return;
    }

    const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
    const data = {
      MOBILE_NUMBER: userData.MOBILE_NUMBER,
      FIRST_NAME: firstName,
      LAST_NAME: lastName,
      ADDRESS: address1,
      STATE: stateValue,
      CITY: city,
      ZIP_CODE: pincode,
      GENDER: gender,
      DATE_OF_BIRTH: formattedDate,
      TYPE: 'u',
    };
    props.onRegisterUser(
      data,
      res => onUserUpdateSuccessCallBack(res, data),
      error => onUserUpdateFailureCallBack(error),
    );
  };

  const onUserUpdateSuccessCallBack = async (res, data) => {
    onRegister(data);
  };

  const onUserUpdateFailureCallBack = error => {
    let msg = error;
    if (error == undefined || error == null) {
      msg = 'Something went wrong';
    }
    props.showErrorModal(msg, true);
  };

  const isSubmitEnabled = () => {
    return (
      firstName.trim().length != 0 &&
      lastName.trim().length != 0 &&
      address1.trim().length != 0 &&
      stateValue != null &&
      city.trim().length != 0 &&
      pincode.trim().length != 0
    );
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

  const onPressDeleteUser = () => {
    Alert.alert('Hold!', 'Are you sure you want to delete your account?', [
      {
        text: 'Yes',
        onPress: () => Linking.openURL(`${CONTACT_URL}`),
      },
      {
        text: 'No',
      },
    ]);
  };

  return (
    <View style={styles.vehicle}>
      <CustomStatusBar backgroundColor={'#efefef'} barStyle="dark-content" />
      <CustomLoader visible={loadingVisibility} />
      <Validation
        visible={validationVisible}
        message={validationMessage}
        onRetry={() => {
          setValidationVisible(false);
        }}
      />

      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.titleView}>
          <Text style={[styles.editProfile]}>Edit profile</Text>
          <TouchableOpacity onPress={() => onPressDeleteUser()}>
            <AntDesign
              name={'deleteuser'}
              color={Color.colorCancelled}
              size={27}
            />
          </TouchableOpacity>
        </View>
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
                placeholder="Enter first name"
                value={firstName}
                maxLength={50}
                onChangeText={text => {
                  if (NAMEREGEX.test(text)) {
                    setFirstName(text);
                  }
                }}
                style={styles.input}
                keyboardType="default"
                returnKeyType="next"
                onSubmitEditing={() => {
                  firstTextInput.focus();
                }}
                blurOnSubmit={false}
                placeholderTextColor={'rgba(0, 0, 0, 0.65)'}
              />
              {firstNameError ? (
                <Text
                  style={{
                    color: 'red',
                    fontFamily: FontFamily.montserratMedium,
                    fontSize: 10,
                  }}>
                  {firstNameError}
                </Text>
              ) : null}
            </View>
            <View style={styles.leftView}>
              <TextInput
                ref={input => {
                  firstTextInput = input;
                }}
                placeholder="Enter last name"
                value={lastName}
                maxLength={50}
                onChangeText={text => {
                  if (NAMEREGEX.test(text)) {
                    setLastName(text);
                  }
                }}
                style={styles.input}
                keyboardType="default"
                returnKeyType="next"
                onSubmitEditing={() => {
                  secondTextInput.focus();
                }}
                blurOnSubmit={false}
                placeholderTextColor={'rgba(0, 0, 0, 0.65)'}
              />
              {lastNameError ? (
                <Text
                  style={{
                    color: 'red',
                    fontFamily: FontFamily.montserratMedium,
                    fontSize: 10,
                  }}>
                  {lastNameError}
                </Text>
              ) : null}
            </View>
          </View>
        </View>
        <View style={styles.topView}>
          <View style={{...styles.innerView, justifyContent: 'flex-start'}}>
            <View
              style={{
                ...styles.leftView,
                width: '50%',
              }}>
              <Text style={styles.label}>
                Mobile No <Text style={styles.alertText}> *</Text>
              </Text>
            </View>
          </View>
          <View style={styles.innerView}>
            <View style={{...styles.leftView, flex: 1}}>
              <TextInput
                placeholder="Mobile Number"
                value={mobileNo}
                editable={false}
                onChangeText={text => setMobileNo(text)}
                style={[
                  styles.input,
                  {
                    width: '100%',
                    backgroundColor: Color.colorWhitesmoke,
                  },
                ]}
                keyboardType="number-pad"
                placeholderTextColor={'rgba(0, 0, 0, 0.65)'}
              />
            </View>
          </View>
        </View>
        <View style={styles.topView}>
          <View style={{...styles.innerView, justifyContent: 'flex-start'}}>
            <View
              style={{
                ...styles.leftView,
                width: '50%',
              }}>
              <Text style={styles.label}>
                E-mail <Text style={styles.alertText}> *</Text>
              </Text>
            </View>
          </View>
          <View style={styles.innerView}>
            <View style={{...styles.leftView, flex: 1}}>
              <TextInput
                placeholder="Email"
                keyboardType="email-address"
                value={email}
                editable={false}
                onChangeText={text => setEmail(text)}
                style={[
                  styles.input,
                  {
                    width: '100%',
                    backgroundColor: Color.colorWhitesmoke,
                  },
                ]}
                placeholderTextColor={'rgba(0, 0, 0, 0.65)'}
              />
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
                placeholder="Address line 1 & 2"
                value={address1}
                onChangeText={text => setAddress1(text)}
                style={[
                  styles.input,
                  {
                    width: '100%',
                  },
                ]}
                maxLength={50}
                keyboardType="default"
                returnKeyType="next"
                onSubmitEditing={() => {
                  fourthTextInput.focus();
                }}
                placeholderTextColor={'rgba(0, 0, 0, 0.65)'}
              />
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
                onChangeText={text => {
                  if (NAMEREGEX.test(text)) {
                    setCity(text);
                  }
                }}
                style={styles.input}
                keyboardType="default"
                returnKeyType="next"
                onSubmitEditing={() => {
                  fifthTextInput.focus();
                }}
                placeholderTextColor={'rgba(0, 0, 0, 0.65)'}
              />
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
                style={[
                  styles.input,
                  {
                    width: '100%',
                  },
                ]}
                maxLength={6}
                keyboardType="number-pad"
                placeholderTextColor={'rgba(0, 0, 0, 0.65)'}
              />
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
                }}>
                <Image source={Images.female} style={styles.genderImage} />

                <Text
                  style={{
                    color: 'black',
                    fontFamily: FontFamily.montserratMedium,
                  }}>
                  Female
                </Text>
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
                }}>
                <Image source={Images.male} style={styles.genderImage1} />

                <Text
                  style={{
                    color: 'black',
                    fontFamily: FontFamily.montserratMedium,
                  }}>
                  Male
                </Text>
              </TouchableOpacity>
            </View>
          </View>
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
              activeOpacity={1}
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
          <DatePicker
            modal
            mode="date"
            open={showDatePicker}
            date={selectedDate}
            onConfirm={date => {
              onConfirmPress(date);
            }}
            onCancel={() => {
              setShowDatePicker(false);
            }}
            maximumDate={ago19days_date}
          />
        </View>

        <TouchableOpacity
          onPress={isSubmitEnabled() ? handleSave : undefined}
          disabled={!isSubmitEnabled()}
          style={[
            styles.createAccountButton,
            !isSubmitEnabled() && styles.disabledContinue,
          ]}>
          <Text style={styles.createAccountButtonText}>{'Save'}</Text>
        </TouchableOpacity>
      </ScrollView>
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
    onStateList: (successCallBack, failureCallBack) =>
      dispatch(userActions.onStateList(successCallBack, failureCallBack)),
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

export default connect(mapStateToProps, mapDispatchToProps)(Editprofile);
