import {
  TouchableOpacity,
  Text,
  View,
  TextInput,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import React, {useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import {
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import {styles} from '../../Styles/Wallet/RegistrationFormStyles';
import {Color, FontFamily} from '../../../global';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import * as commonActions from '../../redux/actions/commonActions';
import * as userActions from '../../redux/actions/userActions';
import CustomStatusBar from '../../Components/CustomStatusBar';

const RegistrationForm = props => {
  const navigation = useNavigation();
  const [docno, setdocno] = useState('');
  const [cardtype, setcardtype] = useState('');
  const [documentNumberError, setDocumentNumberError] = useState('');
  const [dobError, setDobError] = useState('');
  const [dob, setdob] = useState();
  const [dobshow, setdobshow] = useState(false);
  const [kitno, setkitno] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const cardtypedata = [
    {label: 'Physical', value: 'PHYSICAL'},
    {label: 'Virtual', value: 'VIRTUAL'},
  ];

  const pan = /^[A-Z]{5}\d{4}[A-Z]{1}$/;

  const handleDocumentNumberChange = value => {
    setdocno(value);

    if (pan.test(value)) {
      setDocumentNumberError('');
    } else if (value.length === 0) {
      setDocumentNumberError('');
    } else {
      setDocumentNumberError(
        'Document number must be in the format: ABCDE1234F',
      );
    }
  };

  const isFormValid = () => {
    if (docno.trim() == '' || cardtype == '' || documentNumberError !== '' || dobError !== '') {
      return true;
    }
    if (cardtype === 'PHYSICAL') {
      if (kitno.trim().length < 15) {
        return true;
      }
    }
    return false;
  };

  const calculateAge = dob => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const handleKitNoChange = value => {
    const filteredValue = value.replace(/[^a-zA-Z0-9]/g, '');
    setkitno(filteredValue);
    if (filteredValue.length === 15) {
      setIsValid(true);
      setErrorMsg('');
    } else {
      setIsValid(false);
      setErrorMsg('Kit number must be exactly 15 alphanumeric characters.');
    }
  };

  const onSendOtp = () => {
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
    var routeData = {
      PanNo: docno,
      Dob: dob,
      CardType: cardtype,
    };
    if (cardtype === 'PHYSICAL') {
      routeData = {
        ...routeData,
        KitNo: kitno,
      };
    }
    navigation.navigate('VerificationCode', routeData);
  };

  const onPpiOtpSendFailureCallBack = error => {
    let msg = error;
    if (error == undefined || error == null) {
      msg = 'Something went wrong';
    }
    props.showErrorModal(msg, true);
  };

  return (
    <View style={styles.container}>
      <CustomStatusBar backgroundColor={'#f5f5f5'} barStyle="dark-content" />
      <View style={{marginBottom:'10%'}}>
        <Text style={styles.head}>Registration</Text>
        <Text style={styles.text}> Fill the data to register</Text>
      </View>
      <View style={{rowGap: hp('3%')}}>
        <View style={styles.inpcontainer1}>
          <Text style={styles.t2}> PAN number </Text>
          <TextInput
            style={styles.inpstyle1}
            placeholder="Enter your document no."
            placeholderTextColor={Color.colorGray}
            value={docno}
            onChangeText={handleDocumentNumberChange}
            maxLength={10}
            autoCapitalize="characters"
          />
        </View>
        {documentNumberError ? (
          <Text style={styles.errorText}>{documentNumberError}</Text>
        ) : null}

        <View style={styles.inpcontainer1}>
          <Text style={styles.t2}> Date of birth </Text>
          <TouchableOpacity onPress={() => setdobshow(true)}>
            <Text
              style={
                dob
                  ? [styles.inpstyle1, {height: hp('5%'), padding: '2%'}]
                  : [
                      styles.inpstyle1,
                      {height: hp('5%'), padding: '2%', color: Color.colorGray},
                    ]
              }>
              {dob
                ? dob.toLocaleDateString()
                : 'Select your date of birth as per PAN'}
            </Text>
          </TouchableOpacity>
        </View>
        <DatePicker
          modal
          open={dobshow}
          date={dob || new Date()}
          mode="date"
          onConfirm={date => {
            setdob(date);
            setdobshow(false);
            if (calculateAge(date) < 18) {
              setDobError('You must be at least 18 years old.');
            } else {
              setDobError('');
            }
          }}
          onCancel={() => {
            setdobshow(false);
          }}
        />
        {dobError ? <Text style={styles.errorText}>{dobError}</Text> : null}

        <View style={styles.inpcontainer1}>
          <Text style={styles.t2}> Card type </Text>
          <View style={styles.pickerContainer}>
            <Dropdown
              data={cardtypedata}
              labelField="label"
              valueField="value"
              value={cardtype}
              onChange={item => {
                setcardtype(item.value);
                if (item.value !== 'PHYSICAL') {
                  setkitno('');
                  setIsValid(false);
                  setErrorMsg('');
                }
              }}
              placeholder="Select card type"
              style={styles.picker}
              itemTextStyle={styles.pickerItem}
              placeholderStyle={styles.placeholderItem}
              selectedTextStyle={styles.pickerItem}
            />
          </View>
        </View>
        
      </View>
      {cardtype === 'PHYSICAL' && (
        <View style={[styles.inpcontainer1,{marginTop:hp('3%')}]}>
          <Text style={styles.t2}> Kit number </Text>
          <TextInput
            style={styles.inpstyle1}
            onChangeText={handleKitNoChange}
            maxLength={15}
            placeholder="Enter kit number"
            placeholderTextColor={Color.colorGray}
            value={kitno}
          />
        </View>
      )}
      {errorMsg ? (
        <Text
          style={{
            color: 'red',
            fontFamily: FontFamily.montserratRegular,
            fontSize: 9,
          }}>
          {errorMsg}
        </Text>
      ) : null}
      <TouchableOpacity onPress={() => onSendOtp()} disabled={isFormValid()}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#F9A738', '#FEE62A']}
          style={styles.linearGradient}>
          <Text style={styles.buttontxt}>Get OTP</Text>
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
    showErrorModal: (message, isFromError) =>
      dispatch(commonActions.showErrorModal(message, isFromError)),
    hideErrorModal: () => dispatch(commonActions.hideErrorModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);
