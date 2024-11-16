import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import { useNavigation} from '@react-navigation/native';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {Color} from '../../../global';
import {Images} from '../../../assets';
import LinearGradient from 'react-native-linear-gradient';
import {styles} from '../../Styles/Wallet/SendAddAmountStyles';
import moment from 'moment';
import {IMAGE_URL} from '../../services/config/index.url';
import {connect} from 'react-redux';
import * as commonActions from '../../redux/actions/commonActions';
import * as userActions from '../../redux/actions/userActions';
import {showError} from '../../utils/helperFunctions';
import CustomStatusBar from '../../Components/CustomStatusBar';

const SendAddAmount = props => {
  const {name, image, intityId} = props.route.params || {};
  const navigation = useNavigation();
  const [amount, setamount] = useState('');
  const [message, setmessage] = useState('');

  const handleAmountChange = value => {
    const numericValue = value.replace(/[^0-9]/g, '');
    setamount(numericValue);
  };

  const onSendMoney = () => {
    const {user} = props.userData;
    if (amount.trim() == '') {
      showError('Please enter amount');
      return;
    }
    const data = {
      MOBILE_NUMBER: user?.MOBILE_NUMBER,
      TYPE: 'C2C',
      AMOUNT: amount,
      TO_ENTITY_ID: intityId,
    };
    props.onPpi(
      data,
      res => onPpiSendMoneySuccessCallBack(res),
      error => onPpiSendMoneyFailureCallBack(error),
    );
  };

  const onPpiSendMoneySuccessCallBack = async res => {
    navigation.replace('SendMoneySuccess', {
      image: image,
      amount: amount,
      name: name,
      message: message,
      timestamp: moment(new Date()).format('LLL'),
      trans: 'xxxxxxx',
      status: 'Success',
    });
  };

  const onPpiSendMoneyFailureCallBack = error => {
    navigation.replace('SendMoneySuccess', {
      image: image,
      amount: amount,
      name: name,
      message: message,
      timestamp: moment(new Date()).format('LLL'),
      trans: 'xxxxxxx',
      status: 'Failure',
    });
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}>
      <CustomStatusBar backgroundColor={'#efefef'} barStyle="dark-content" />
      <View style={styles.topcontainer}>
        <Text style={styles.texthead}>Send Money</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <EntypoIcon name="cross" color={Color.colorBlack} size={25} />
        </TouchableOpacity>
      </View>
      <View style={styles.imagecontainer}>
        <Image
          source={image ? {uri: IMAGE_URL + image} : Images.avatar}
          style={styles.image}
        />
        <Text style={styles.name}>{name}</Text>
      </View>
      <View style={styles.amountcontainer}>
        <View style={styles.amountinpcontainer}>
          <Text style={styles.inputtext}>₹</Text>
          <TextInput
            maxLength={10}
            value={amount}
            onChangeText={handleAmountChange}
            style={styles.input}
            keyboardType="number-pad"
          />
        </View>
        <TouchableOpacity>
          <Text style={styles.texthelp}>Help</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.messagecontainer}>
        <Text style={styles.messagetext}>Message</Text>
        <TextInput
          value={message}
          onChangeText={value => setmessage(value)}
          placeholder="Add a message"
          placeholderTextColor={Color.colorgray}
          style={styles.message}
          multiline={true}
          numberOfLines={6}
          textAlignVertical="top"
        />
      </View>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#F9A738', '#FEE62A']}
        style={styles.linearGradient}>
        <TouchableOpacity onPress={() => onSendMoney()}>
          <Text style={styles.buttontxt}>Send Money</Text>
        </TouchableOpacity>
      </LinearGradient>
    </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(SendAddAmount);
