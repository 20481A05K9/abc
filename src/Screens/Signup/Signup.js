import {
  TouchableOpacity,
  TextInput,
  View,
  Text,
  ScrollView,
  Platform,
  Linking,
  BackHandler,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {Color} from '../../../global';
import {styles} from '../../Styles/SignUp/Signupstyles';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {
  INVALID_MIBILE_NUMBER,
  MOBILE_NUMBER_PATTERN,
} from '../../utils/Constants';
import {connect} from 'react-redux';
import Validation from '../../Components/Validation';
import CustomLoader from '../../Components/CustomLoader';
import DeviceInfo from 'react-native-device-info';
import PermissionAllow from '../../Components/PermissionAllow';
import RNExitApp from 'react-native-kill-app';
import RNOtpVerify from 'react-native-otp-verify';
import * as commonActions from '../../redux/actions/commonActions';
import * as userActions from '../../redux/actions/userActions';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import CustomStatusBar from '../../Components/CustomStatusBar';
import SignupIndex from '../../Components/Svg/SignupSvg/SignupIndex';
import {showError} from '../../utils/helperFunctions';
import notifee, {AuthorizationStatus} from '@notifee/react-native';

const Signup = props => {
  const navigation = useNavigation();
  const [phoneNumber, setphoneNumber] = useState();
  const [loadingVisibility, setLoadingVisibility] = useState(false);
  const [validationVisible, setValidationVisible] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');
  const [permissionAllowVisible, setPermissionAllowVisible] = useState(false);
  const [hashCode, setHashCode] = useState('');

  useEffect(() => {
    askPermission();
    if (Platform.OS == 'android') {
      getHash();
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        RNExitApp.exitApp();

        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', backAction);
      navigation.addListener('gestureEnd', backAction);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', backAction);
        navigation.removeListener('gestureEnd', backAction);
      };
    }, []),
  );

  const askPermission = async () => {
    let isNotificationPermitted = await checkNotificationPermission();
    if (!isNotificationPermitted) {
      setPermissionAllowVisible(true);
      let msg =
        Platform.OS == 'ios'
          ? "Click on 'Notifications' then ON the 'Allow Notifications'"
          : "'Notifications' and then on 'Show notifications' to allow access.";
      setValidationMessage(
        "Without notification permission we will not be able to send you notification and proceed ahead.\n\nPlease tap on 'Settings' then " +
          msg,
      );
    }
  };

  const checkNotificationPermission = async () => {
    if (Platform.OS === 'ios') {
      try {
        const settings = await notifee.requestPermission();
        if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        return false;
      }
    } else {
      if (DeviceInfo.getSystemVersion() >= 13) {
        try {
          const result = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
          if (result === RESULTS.GRANTED) {
            return true;
          } else {
            return false;
          }
        } catch (error) {
          return false;
        }
      } else {
        return true;
      }
    }
  };

  const getHash = () =>
    RNOtpVerify.getHash()
      .then(hash => {
        setHashCode(hash?.[0]);
      })
      .catch(()=>{});

  const handleContinue = async () => {
    if (!MOBILE_NUMBER_PATTERN.test(phoneNumber)) {
      showError(INVALID_MIBILE_NUMBER);
      return;
    }
    const data = {
      MOBILE_NUMBER: '91' + phoneNumber,
      TYPE: 'sendOtp',
      AUTOFILL_HASHCODE: hashCode,
    };
    props.onLoginUser(
      data,
      res => onLoginUserSuccessCallBack(res),
      error => onLoginUserFailureCallBack(error),
    );
  };

  const onLoginUserSuccessCallBack = async res => {
    navigation.navigate('OtpScreen', {MOBILE_NUMBER: phoneNumber});
  };

  const onLoginUserFailureCallBack = error => {
    let msg = error;
    if (error == undefined || error == null) {
      msg = 'Something went wrong';
    }
    props.showErrorModal(msg, true);
  };

  return (
    <View style={styles.loginparent}>
      <CustomStatusBar
        backgroundColor={Color.colorOrange}
        barStyle="dark-content"
      />
      <CustomLoader visible={loadingVisibility} />
      <Validation
        visible={validationVisible}
        message={validationMessage}
        onRetry={() => {
          setValidationVisible(false);
        }}
      />
      <PermissionAllow
        visible={permissionAllowVisible}
        message={validationMessage}
        onCancel={() => {
          setPermissionAllowVisible(false);
        }}
        onSetting={() => {
          setPermissionAllowVisible(false),
            Platform.OS == 'android'
              ? (Linking.openSettings(), RNExitApp.exitApp())
              : Linking.openSettings();
        }}
      />
      <ScrollView>
        <View style={styles.svgContainer}>
          <SignupIndex />
        </View>
        <View>
          <Text style={styles.primarytxt}>Sign In</Text>
        </View>
        <View style={styles.inputtxt}>
          <TextInput
            style={styles.inputtxt1}
            placeholder="Enter Mobile Number"
            placeholderTextColor={Color.otpScreenno}
            keyboardType="number-pad"
            maxLength={10}
            value={phoneNumber}
            onChangeText={text => {
              setphoneNumber(text);
            }}
          />
        </View>
        <TouchableOpacity
          style={styles.insertBtnTO}
          onPress={() => handleContinue()}>
          <Text style={styles.insertBtnText}>{'Get OTP'}</Text>
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
    onLoginUser: (data, successCallBack, failureCallBack) =>
      dispatch(userActions.onLoginUser(data, successCallBack, failureCallBack)),
    showErrorModal: (message, isFromError) =>
      dispatch(commonActions.showErrorModal(message, isFromError)),
    hideErrorModal: () => dispatch(commonActions.hideErrorModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
