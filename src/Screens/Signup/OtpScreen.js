import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  ScrollView,
  Platform,
  Keyboard,
} from 'react-native';
import {styles} from '../../Styles/SignUp/OtpStyles';
import {useNavigation} from '@react-navigation/native';
import {
  INVALID_OTP,
} from '../../utils/Constants';
import {connect} from 'react-redux';
import Validation from '../../Components/Validation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomLoader from '../../Components/CustomLoader';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import messaging from '@react-native-firebase/messaging';
import RNOtpVerify from 'react-native-otp-verify';
import * as commonActions from '../../redux/actions/commonActions';
import * as userActions from '../../redux/actions/userActions';
import Icon from 'react-native-vector-icons/FontAwesome5';
import CustomStatusBar from '../../Components/CustomStatusBar';
import {showError, showSuccess, storeData} from '../../utils/helperFunctions';

const CELL_COUNT = 4;

const OtpScreen = props => {
  const navigation = useNavigation();
  const {MOBILE_NUMBER} = props.route.params;
  const [loadingVisibility, setLoadingVisibility] = useState(false);
  const [validationVisible, setValidationVisible] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [propsOTP, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const [hashCode, setHashCode] = useState('');

  useEffect(() => {
    if (Platform.OS == 'android') {
      getHash();
      startListeningForOtp();
    }
  }, []);

  const getHash = () =>
    RNOtpVerify.getHash()
      .then(hash => {
        setHashCode(hash?.[0]);
      })
      .catch(()=>{});

  const startListeningForOtp = () =>
    RNOtpVerify.getOtp()
      .then(p => RNOtpVerify.addListener(otpHandler))
      .catch(p => {});

  const otpHandler = message => {
    const sOtp = /(\d{4})/g.exec(message)?.[1];
    setValue(sOtp);
    RNOtpVerify.removeListener();
    Keyboard.dismiss();
    if (sOtp != undefined) {
      otpAutoFillValidate(sOtp);
    }
  };

  const onLogin = async data => {
    if (data && data?.token != undefined) {
      if (data?.userStatus == 1) {
        navigation.navigate('CreateAccount', {
          MOBILE_NUMBER,
          TOKEN: data?.token,
        });
      } else {
        try {
          storeData('userData', data)
            .then(value => {
              props.saveProfileData(data);
            })
            .catch(error => {
            });
          await AsyncStorage.setItem('token', data?.token);
          navigation.reset({
            index: 0,
            routes: [{name: 'BottomTabNavigation'}],
          });
        } catch (error) {
          showError('Something went wrong');
        }
      }
    } else {
      showSuccess(data?.message);
    }
  };

  const handleResendOtp = async () => {
    const data = {
      MOBILE_NUMBER: '91' + MOBILE_NUMBER,
      TYPE: 'sendOtp',
      AUTOFILL_HASHCODE: hashCode,
    };
    props.onLoginUser(
      data,
      res => onLoginUserSuccessCallBack(res),
      error => onLoginUserFailureCallBack(error),
    );
  };

  const otpvalidate = async () => {
    if (value.trim().length < 4) {
      showError(INVALID_OTP);
      setLoadingVisibility(false);
      return;
    }
    let fcmToken = await AsyncStorage.getItem('fcm_token');
    if (!fcmToken) {
      fcmToken = await generateFcmKey();
    }
    const data = {
      MOBILE_NUMBER: '91' + MOBILE_NUMBER,
      OTP: value,
      TYPE: 'otpValidation',
      FCM_KEY: fcmToken,
    };
    props.onLoginUser(
      data,
      res => onLoginUserSuccessCallBack(res),
      error => onLoginUserFailureCallBack(error),
    );
  };

  const onLoginUserSuccessCallBack = async res => {
    onLogin(res);
  };

  const onLoginUserFailureCallBack = error => {
    let msg = error;
    if (error == undefined || error == null) {
      msg = 'Something went wrong';
    }
    props.showErrorModal(msg, true);
  };

  const generateFcmKey = async contact => {
    try {
      await messaging().registerDeviceForRemoteMessages();
      const token = await messaging().getToken();
      if (token) {
        await AsyncStorage.setItem('fcm_token', token);
        return token;
      }
      return null;
    } catch (error) {
      return null;
    }
  };

  const otpAutoFillValidate = async sOtp => {
    try {
      let fcmToken = await AsyncStorage.getItem('fcm_token');
      if (!fcmToken) {
        fcmToken = await generateFcmKey();
      }
      const data = {
        MOBILE_NUMBER: '91' + MOBILE_NUMBER,
        OTP: sOtp,
        TYPE: 'otpValidation',
        FCM_KEY: fcmToken,
      };
      props.onLoginUser(
        data,
        res => onLoginUserSuccessCallBack(res),
        error => onLoginUserFailureCallBack(error),
      );
    } catch (error) {
    }
  };

  return (
    <View style={styles.otpcontainer}>
      <CustomStatusBar backgroundColor={'#efefef'} barStyle="dark-content" />
      <CustomLoader visible={loadingVisibility} />
      <Validation
        visible={validationVisible}
        message={validationMessage}
        onRetry={() => {
          setValidationVisible(false);
        }}
      />
      <ScrollView contentContainerStyle={styles.innerView}>
        <View style={styles.headerTextView}>
          <Text style={styles.primarytxt}>Verify OTP</Text>
          <View style={styles.editNoView}>
            <Text style={styles.secondarytxt}>
              {`Enter the OTP sent to +91 ${MOBILE_NUMBER.substring(
                0,
                3,
              )}*******`}
            </Text>
            <TouchableOpacity
              style={styles.editTO}
              activeOpacity={0.7}
              onPress={() => {
                navigation.goBack();
              }}>
              <Icon name="pen" color="#fff" size={8} />
            </TouchableOpacity>
          </View>
          <CodeField
            ref={ref}
            {...propsOTP}
            value={value}
            onChangeText={text => {
              setValue(text);
            }}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({index, symbol, isFocused}) => (
              <View
                onLayout={getCellOnLayoutHandler(index)}
                key={index}
                style={[styles.cellRoot, isFocused && styles.focusCell]}>
                <Text style={styles.cellText}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              </View>
            )}
          />
          <View style={styles.resendOtpView}>
            <Text style={styles.otpdidnt}>{'Didn’t receive any OTP?'}</Text>
            <TouchableOpacity
              style={styles.resendotpbtn}
              onPress={() => handleResendOtp()}>
              <Text style={styles.resenotp}>{'Resend OTP'}</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.button} onPress={() => otpvalidate()}>
            <Text style={styles.buttontext}>{'Continue'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    onLoginUser: (data, successCallBack, failureCallBack) =>
      dispatch(userActions.onLoginUser(data, successCallBack, failureCallBack)),
    saveProfileData: data => dispatch(userActions.saveProfileData(data)),
    showErrorModal: (message, isFromError) =>
      dispatch(commonActions.showErrorModal(message, isFromError)),
    hideErrorModal: () => dispatch(commonActions.hideErrorModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OtpScreen);
