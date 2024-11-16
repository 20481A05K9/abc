import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import LinearGradient from 'react-native-linear-gradient';
import {Color} from '../../../global';
import {styles} from '../../Styles/Wallet/SetPreferencesStyles';
import CustomStatusBar from '../../Components/CustomStatusBar';
import {connect} from 'react-redux';
import * as commonActions from '../../redux/actions/commonActions';
import * as userActions from '../../redux/actions/userActions';
import {showError, showSuccess} from '../../utils/helperFunctions';
import {useNavigation} from '@react-navigation/native';

const cardpref = [
  {label: 'ATM', value: 'ATM'},
  {label: 'POS', value: 'POS'},
  {label: 'Ecom', value: 'Ecom'},
  {label: 'DCC', value: 'DCC'},
  {label: 'Contact Less', value: 'Contact Less'},
  {label: 'International', value: 'International'},
];

const SetPreferences = props => {
  const [transtype, settranstype] = useState('');
  const [dailylimitvalue, setdailylimitvalue] = useState('');
  const [errorMessages, setErrorMessages] = useState({
    dailylimitvalue: '',
    dailylimitcount: '',
    maxamount: '',
  });
  const navigation = useNavigation();

  const handleNumericInput = (value, setter, field) => {
    if (/^\d*$/.test(value)) {
      setter(value);
      setErrorMessages(prev => ({...prev, [field]: ''}));
    } else {
      setErrorMessages(prev => ({
        ...prev,
        [field]: 'Please enter a valid number.',
      }));
    }
  };

  const onSubmit = () => {
    if (transtype.trim() == '') {
      showError('Please select transaction type');
      return;
    }
    if (dailylimitvalue.trim() == '') {
      showError('Please enter transaction daily limit');
      return;
    }

    const {user} = props.userData;
    const data = {
      MOBILE_NUMBER: user?.MOBILE_NUMBER,
      TYPE: 'USER_DAILY_LIMIT',
      REQUEST_TYPE: transtype,
      AMOUNT: dailylimitvalue,
    };
    props.onPpi(
      data,
      res => onPpiPreferencesSuccessCallBack(res),
      error => onPpiPreferencesFailureCallBack(error),
    );
  };

  const onPpiPreferencesSuccessCallBack = async res => {
    showSuccess('Your preferences added!');
    setTimeout(() => {
      navigation.goBack();
    }, 2000);
  };

  const onPpiPreferencesFailureCallBack = error => {
    let msg = error;
    if (error == undefined || error == null) {
      msg = 'Something went wrong';
    }
    props.showErrorModal(msg, true);
  };

  return (
    <View style={styles.container}>
      <CustomStatusBar backgroundColor={'#efefef'} barStyle="dark-content" />
      <View>
        <Text style={styles.head}>Set Limits</Text>
        <Text style={styles.text}>Choose limits for a specific transaction type</Text>
      </View>

      <View style={styles.inpcontainer1}>
        <Text style={styles.t2}> Transaction type </Text>
        <View style={styles.pickerContainer}>
          <Dropdown
            data={cardpref}
            labelField="label"
            valueField="value"
            value={transtype}
            onChange={item => {
              settranstype(item.value);
            }}
            placeholder="Select transaction type"
            style={styles.picker}
            itemTextStyle={styles.pickerItem}
            placeholderStyle={styles.placeholderItem}
            selectedTextStyle={styles.pickerItem}
          />
        </View>
      </View>
      <View style={styles.inpcontainer1}>
        <Text style={styles.t2}> Transaction daily limit </Text>
        <TextInput
          style={styles.inpstyle1}
          keyboardType="number-pad"
          onChangeText={value =>
            handleNumericInput(value, setdailylimitvalue, 'dailylimitvalue')
          }
          maxLength={10}
          placeholder="Set your transaction limit (daily)"
          placeholderTextColor={Color.colorGray}
          value={dailylimitvalue}
        />
      </View>
      {errorMessages.dailylimitvalue ? (
        <Text style={styles.errorText}>{errorMessages.dailylimitvalue}</Text>
      ) : null}
      <TouchableOpacity onPress={() => onSubmit()}>
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
    showErrorModal: (message, isFromError) =>
      dispatch(commonActions.showErrorModal(message, isFromError)),
    hideErrorModal: () => dispatch(commonActions.hideErrorModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SetPreferences);
