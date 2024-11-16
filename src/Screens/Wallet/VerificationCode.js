import {
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import {styles} from '../../Styles/Wallet/VerificationCodeStyles';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import {showError, showSuccess, storeData} from '../../utils/helperFunctions';
import {INVALID_OTP} from '../../utils/Constants';
import {connect} from 'react-redux';
import * as commonActions from '../../redux/actions/commonActions';
import * as userActions from '../../redux/actions/userActions';
import CustomStatusBar from '../../Components/CustomStatusBar';

const VerificationCode = props => {
  const {PanNo, Dob, CardType, KitNo} = props.route.params || {};
  const CELL_COUNT = 6;
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [propsOTP, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const isOtpComplete = value.length === CELL_COUNT;
  const navigation = useNavigation();
  const [starNo, setStarNo] = useState('');

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    const {user} = props.userData;
    let no = user?.MOBILE_NUMBER;
    no = no.replace('91', '');
    no = no.substring(0, 3);
    setStarNo(no);
  };

  const handleResendOtp = async () => {
    const {user} = props.userData;
    const data = {
      MOBILE_NUMBER: user?.MOBILE_NUMBER,
      TYPE: 'GENERATE_OTP',
    };
    props.onPpi(
      data,
      res => onPpiOtpSendSuccessCallBack(res),
      error => onPpiOtpSendFailureCallBack(error),
    );
  };

  const onPpiOtpSendSuccessCallBack = async res => {
    showSuccess('OTP Resend Successful');
  };

  const onPpiOtpSendFailureCallBack = error => {
    let msg = error;
    if (error == undefined || error == null) {
      msg = 'Something went wrong';
    }
    props.showErrorModal(msg, true);
  };

  const onOtpSubmit = () => {
    if (value.trim().length < 6) {
      showError(INVALID_OTP);
      return;
    }
    const {user} = props.userData;
    let dobDate = moment(Dob).format('DD-MM-YYYY');
    var data = {
      MOBILE_NUMBER: user?.MOBILE_NUMBER,
      TYPE: 'USER_REG',
      CARD_TYPE: CardType,
      OTP: value,
      PAN_NUMBER: PanNo,
      PAN_EXPAIRY_DATE: dobDate,
    };
    if (KitNo) {
      data = {
        ...data,
        KIT_NUMBER: KitNo,
      };
    }
    props.onPpi(
      data,
      res => onPpiOtpSubmitSuccessCallBack(res),
      error => onPpiOtpSubmitFailureCallBack(error),
    );
  };

  const onPpiOtpSubmitSuccessCallBack = async res => {
    if (res?.message == 'Success') {
      const data = {...props.userData, userPPI: {}};
      storeData('userData', data)
        .then(value => {})
        .catch(error => {
        });
      props.saveProfileData(data);
      navigation.navigate('WalletHome', {register: '1'});
    } else {
      props.showErrorModal('Something went wrong', true);
    }
  };

  const onPpiOtpSubmitFailureCallBack = error => {
    let msg = error;
    if (error == undefined || error == null) {
      msg = 'Something went wrong';
    }
    props.showErrorModal(msg, true);
  };

  const handleCodeChange = text => {
    const numericValue = text.replace(/[^0-9]/g, '');
    setValue(numericValue);
  };

  return (
    <View style={styles.container}>
      <CustomStatusBar backgroundColor={'#f5f5f5'} barStyle="dark-content" />
      <View>
        <Text style={styles.texthead}>OTP verification</Text>
        <View style={styles.description}>
          <Text
            style={
              styles.text
            }>{`Enter the OTP sent to +91 ${starNo}*******`}</Text>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <CodeField
          ref={ref}
          {...propsOTP}
          value={value}
          onChangeText={handleCodeChange}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          autoComplete={Platform.select({
            android: 'sms-otp',
            default: 'one-time-code',
          })}
          testID="my-code-input"
          renderCell={({index, symbol, isFocused}) => (
            <Text
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />
      </View>
      <View style={styles.description}>
        <Text style={styles.text1}>Didn't receive any OTP?</Text>
        <TouchableOpacity onPress={() => handleResendOtp()}>
          <Text style={styles.resend}>Resend OTP</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => onOtpSubmit()} disabled={!isOtpComplete}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#F9A738', '#FEE62A']}
          style={styles.linearGradient}>
          <Text style={styles.buttontxt}>Submit</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = state => {
  return {userData: state.user.userData};
};

const mapDispatchToProps = dispatch => {
  return {
    onPpi: (data, successCallBack, failureCallBack) =>
      dispatch(userActions.onPpi(data, successCallBack, failureCallBack)),
    saveProfileData: data => dispatch(userActions.saveProfileData(data)),
    showErrorModal: (message, isFromError) =>
      dispatch(commonActions.showErrorModal(message, isFromError)),
    hideErrorModal: () => dispatch(commonActions.hideErrorModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerificationCode);
