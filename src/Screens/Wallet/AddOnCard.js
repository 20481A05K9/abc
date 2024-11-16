import {Text, View, TextInput, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import React, {useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import {Color, FontFamily} from '../../../global';
import {styles} from '../../Styles/Wallet/AddOnCardStyles';
import {connect} from 'react-redux';
import * as commonActions from '../../redux/actions/commonActions';
import * as userActions from '../../redux/actions/userActions';
import {showError, showSuccess} from '../../utils/helperFunctions';
import CustomStatusBar from '../../Components/CustomStatusBar';
import {useNavigation} from '@react-navigation/native';

const cardtypedata = [
  {label: 'Physical', value: 'PHYSICAL'},
  {label: 'Virtual', value: 'VIRTUAL'},
];

const AddOnCard = props => {
  const navigation = useNavigation();
  const [kitno, setkitno] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [cardtype, setcardtype] = useState('');

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

  const onSubmit = () => {
    const {user} = props.userData;
    if (cardtype.trim() == '') {
      showError('Please select card type');
      return;
    }
    if (cardtype == 'PHYSICAL') {
      if (kitno.trim().length < 15) {
        showError('Please enter kit number');
        return;
      }
    }
    var data = {
      MOBILE_NUMBER: user?.MOBILE_NUMBER,
      CARD_TYPE: cardtype,
      TYPE: 'ADD_CARD',
    };
    if (cardtype == 'PHYSICAL') {
      data = {
        ...data,
        KIT_NUMBER: kitno,
      };
    }
    props.onPpi(
      data,
      res => onPpiAddCardSuccessCallBack(res),
      error => onPpiAddCardFailureCallBack(error),
    );
  };

  const onPpiAddCardSuccessCallBack = async res => {
    showSuccess('Card Added Successful');
    setTimeout(() => {
      navigation.goBack();
    }, 2000);
  };

  const onPpiAddCardFailureCallBack = error => {
    let msg = error;
    if (error == undefined || error == null) {
      msg = 'Something went wrong';
    }
    props.showErrorModal(msg, true);
  };

  return (
    <View style={styles.container}>
      <CustomStatusBar backgroundColor={'#efefef'} barStyle="dark-content" />
      <View style={styles.textcontainer}>
        <Text style={styles.head}>Add card</Text>
        <Text style={styles.text}>Fill the details of your add on card</Text>
      </View>
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
              setkitno('');
            }}
            placeholder="Select card type"
            style={styles.picker}
            itemTextStyle={styles.pickerItem}
            placeholderStyle={styles.placeholderItem}
            selectedTextStyle={styles.pickerItem}
          />
        </View>
      </View>
      {cardtype == 'PHYSICAL' && (
        <View style={styles.inpcontainer1}>
          <Text style={styles.t2}> Kit number </Text>
          <TextInput
            style={styles.inpstyle1}
            onChangeText={handleKitNoChange}
            maxLength={15}
            placeholder="Enter kit number"
            placeholderTextColor={Color.colorGray}
            value={kitno}
          />
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
        </View>
      )}
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

export default connect(mapStateToProps, mapDispatchToProps)(AddOnCard);
