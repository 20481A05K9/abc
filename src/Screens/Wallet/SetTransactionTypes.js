import {Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import LinearGradient from 'react-native-linear-gradient';
import CustomStatusBar from '../../Components/CustomStatusBar';
import {styles} from '../../Styles/Wallet/SetTransactionTypesStyles';
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

const SetTransactionTypes = props => {
  const [prefselected, setprefSelected] = useState('');
  const navigation = useNavigation();

  const onSubmit = () => {
    if (prefselected.trim() == '') {
      showError('Please select transaction type');
      return;
    }

    const {user} = props.userData;
    const data = {
      MOBILE_NUMBER: user?.MOBILE_NUMBER,
      TYPE: 'USER_PREFERENCES',
      REQUEST_TYPE: prefselected,
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

      <View style={styles.topcontainer}>
        <Text style={styles.texthead}>Set Transaction Types</Text>
        <Text style={styles.textsub}>
          Choose the transaction types which you want to enable for your card
        </Text>
      </View>
      <View style={styles.inpcontainer1}>
        <Text style={styles.t2}> Preferences </Text>
        <View style={styles.pickerContainer}>
          <Dropdown
            data={cardpref}
            labelField="label"
            valueField="value"
            value={prefselected}
            onChange={item => {
              setprefSelected(item.value);
            }}
            placeholder="Select transaction type"
            style={styles.picker}
            itemTextStyle={styles.pickerItem}
            placeholderStyle={styles.placeholderItem}
            selectedTextStyle={styles.pickerItem}
          />
        </View>
      </View>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SetTransactionTypes);
