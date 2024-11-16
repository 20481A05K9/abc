import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Styles} from '../../Styles/Cart/CartStyles';
import {Images} from '../../../assets';
import {Color} from '../../../global';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {connect} from 'react-redux';
import CustomLoader from '../../Components/CustomLoader';
import Validation from '../../Components/Validation';
import PhonePePaymentSDK from 'react-native-phonepe-pg';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import * as commonActions from '../../redux/actions/commonActions';
import * as userActions from '../../redux/actions/userActions';
import CustomStatusBar from '../../Components/CustomStatusBar';
import {showError} from '../../utils/helperFunctions';

const FastagCart = props => {
  const navigation = useNavigation();
  const {vehicleNo, vehicleId, fastagBalance, vehicleFastag} =
    props.route.params || {};
  const [fastagPrice, setFastagPrice] = useState(0);
  const [platformPrice, setPlatformPrice] = useState('');
  const [subTotalPrice, setSubTotalPrice] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  const [loadingVisibility, setLoadingVisibility] = useState(false);
  const [validationVisible, setValidationVisible] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');
  const [mobileNo, setMobileNo] = useState(null);
  var mobileNoLocal = null;
  const [itemCount, setItemCount] = useState('');
  const [userName, setUserName] = useState('');
  const [tripId, setTripId] = useState(null);
  const [noVehicleVisible, setNoVehicleVisible] = useState(false);
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [textInputVisible, setTextInputVisible] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponApplyed, setCouponApplyed] = useState(false);
  const [vehicleFastagName, setVehicleFastagName] = useState('');
  const [vehicleID, setVehicleID] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    updateTotalPrice();
  }, [fastagPrice]);

  const getData = async () => {
    try {
      let {user} = props.userData;
      setMobileNo(user?.MOBILE_NUMBER);
      mobileNoLocal = user?.MOBILE_NUMBER;
      setUserName(user?.FIRST_NAME + ' ' + user?.LAST_NAME);
      setVehicleNumber(vehicleNo);
      setFastagPrice(fastagBalance);
      setPlatformPrice(5);
      setVehicleFastagName(vehicleFastag);
      setVehicleID(vehicleId);
    } catch (error) {}
  };

  const increaseValue = () => {
    if (fastagPrice == 0) {
      setFastagPrice(fastagPrice + 500);
    } else {
      setFastagPrice(fastagPrice + 500);
    }
  };

  const decreaseValue = () => {
    if (fastagPrice > 0) {
      if (fastagPrice <= 500) {
        setFastagPrice(0);
      } else {
        setFastagPrice(fastagPrice - 500);
      }
    } else {
      setFastagPrice(0);
    }
  };

  const updateTotalPrice = () => {
    let subtotal = Number(fastagPrice);
    setSubTotalPrice(subtotal);
    let total = Number(subtotal) + Number(platformPrice);
    setTotalPrice(total);

    let iCount = 0;
    if (fastagPrice != 0) {
      iCount++;
    }
    setItemCount(iCount);
  };

  const proceedPayment = () => {
    if (fastagPrice == 0) {
      props.showErrorModal('Please add amount minimum 500', true);
    } else {
      const data = {
        TYPE: 'i',
        MOBILE_NUMBER: mobileNo,
        VEHICLE_ID: vehicleID,
        AMOUNT: fastagPrice,
      };
      props.onFastagRecharge(
        data,
        res => onFastagRechargeSuccessCallBack(res),
        error => onFastagRechargeFailureCallBack(error),
      );
    }
  };

  const onFastagRechargeSuccessCallBack = async res => {
    if (res?.message == 'success') {
      const data = {
        MOBILE_NUMBER: mobileNo,
        TRIP_ID: res?.TRANSACTION_ID,
        TOTAL_AMOUNT: totalPrice,
        COUPON_CODE: couponCode,
        TYPE: 'FASTAG_RECHARGE',
      };
      props.onCartBalUpdate(
        data,
        res => onCartBalUpdateSuccessCallBack(res),
        error => onCartBalUpdateFailureCallBack(error),
      );
    }
  };

  const onFastagRechargeFailureCallBack = error => {
    let msg = error;
    if (error == undefined || error == null) {
      msg = 'Something went wrong';
    }
    props.showErrorModal(msg, true);
  };

  const onCartBalUpdateSuccessCallBack = async res => {
    if (res?.message === 'success') {
      let cartId = res?.CART_ID;
      let sKey = res?.data?.skey;
      let mId = res?.data?.mId;
      let base64 = res?.data?.base64;
      let sha256 = res?.data?.sha256;

      initPhonePeSDK(cartId, sKey, mId, base64, sha256);
    } else {
      showError('Something went wrong');
    }
  };

  const onCartBalUpdateFailureCallBack = error => {
    let msg = error;
    if (error == undefined || error == null) {
      msg = 'Something went wrong';
    }
    props.showErrorModal(msg, true);
  };

  const initPhonePeSDK = (cartId, sKey, mId, base64, sha256) => {
    PhonePePaymentSDK.init(sKey, mId, null, false)
      .then(result => {
        makePayment(cartId, base64, sha256);
      })
      .catch(error => {});
  };

  const makePayment = (cartId, requestBody, checksum) => {
    PhonePePaymentSDK.startTransaction(requestBody, checksum, null, null)
      .then(a => {
        if (a?.status == 'SUCCESS') {
          const data = {
            CART_ID: cartId,
            MOBILE_NUMBER: mobileNo,
          };
          props.onPaymentSuccess(
            data,
            res => onPaymentSuccessSuccessCallBack(res),
            error => onPaymentSuccessFailureCallBack(error),
          );
        }
      })
      .catch(error => {
        Alert.alert('Error', error.message);
      });
  };

  const onPaymentSuccessSuccessCallBack = async res => {
    if (res?.paymentStatus == 'Success') {
      navigation.replace('SuccessFail', {name: 'TRIPSUCCESS', status: 1});
    } else {
      navigation.navigate('SuccessFail', {name: 'TRIPFAIL', status: 0});
    }
  };

  const onPaymentSuccessFailureCallBack = error => {
    let msg = error;
    if (error == undefined || error == null) {
      msg = 'Something went wrong';
    }
    props.showErrorModal(msg, true);
  };

  const onCouponApply = () => {
    if (couponCode.trim().length == 0) {
      props.showErrorModal('Please enter coupon code', true);
      return;
    }
    setCouponApplyed(true);
  };

  return (
    <View style={Styles.container}>
      <CustomStatusBar backgroundColor={'#efefef'} barStyle="dark-content" />
      <CustomLoader visible={loadingVisibility} />
      <Validation
        visible={validationVisible}
        message={validationMessage}
        onRetry={() => {
          setValidationVisible(false);
        }}
      />
      <Validation
        visible={noVehicleVisible}
        message={validationMessage}
        onRetry={() => {
          setNoVehicleVisible(false);
          navigation.goBack();
        }}
      />

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: '2%',
        }}
        showsVerticalScrollIndicator={false}>
        <View style={Styles.carttxtView}>
          <Text style={Styles.carttxt}>Cart Items</Text>
          <TouchableOpacity
            style={Styles.addtxtTO}
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}>
            <Text style={Styles.addtxt}>Edit Vehicle</Text>
          </TouchableOpacity>
        </View>
        <View style={Styles.view2}>
          <View style={Styles.view1}>
            <Image source={Images.fasTagimg} style={Styles.insuranceImage5} />
          </View>
          <View style={{marginLeft: '5%'}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                width: wp('60%'),
              }}>
              <Text style={[Styles.rsatext]}>Recharge FasTag</Text>
            </View>
            <Text style={[Styles.rupee, {marginTop: '3%'}]}>
              {vehicleFastagName}
            </Text>
            <View style={Styles.topview}>
              <Text style={Styles.vehicletxt}>{vehicleNumber}</Text>
              <View style={Styles.topview1}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={decreaseValue}
                  disabled={fastagPrice === 0}>
                  <Text style={Styles.txt1}> - </Text>
                </TouchableOpacity>
                <Text style={Styles.txt1}> {fastagPrice} </Text>
                <TouchableOpacity activeOpacity={0.5} onPress={increaseValue}>
                  <Text style={Styles.txt1}> + </Text>
                </TouchableOpacity>
              </View>
            </View>
            <Text style={[Styles.insuranceNote, {textAlign: 'left'}]}>
              {"Fastag's minimum recharge is 500"}
            </Text>
          </View>
        </View>
        <View style={Styles.horizontalLine}></View>
        {!textInputVisible && (
          <View>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                marginTop: '5%',
                marginBottom: '5%',
              }}
              onPress={() => setTextInputVisible(!textInputVisible)}>
              <Image source={Images.Coupon} />
              <Text style={Styles.Coupon}> Apply coupons </Text>
              <MaterialIcons
                name="keyboard-arrow-down"
                color={Color.colorOrange}
                size={13}
              />
            </TouchableOpacity>
          </View>
        )}
        {textInputVisible && (
          <View>
            <Text style={Styles.couponCode}>Enter coupon code</Text>
            <View>
              <TextInput
                style={Styles.input1}
                placeholder="Enter coupon code"
                placeholderTextColor={'#00000080'}
                value={couponCode}
                onChangeText={text => setCouponCode(text)}
                editable={!couponApplyed}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: '5%',
              }}>
              {!couponApplyed && (
                <>
                  <TouchableOpacity
                    style={Styles.insertBtnTO1}
                    onPress={() => onCouponApply()}>
                    <Text style={Styles.insertBtnText1}>Apply</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={Styles.insertBtnTO2}
                    onPress={() => setTextInputVisible(false)}>
                    <Text style={Styles.insertBtnText2}>Cancel</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        )}
        <View style={[Styles.view3, {marginTop: '10%'}]}>
          <Text style={Styles.selectxt}>{`Platform charge`}</Text>
          <Text style={Styles.totaltext}>Rs {platformPrice}</Text>
        </View>
        <View style={Styles.view3}>
          <Text style={Styles.selectxt}>{`Selected items(${itemCount})`}</Text>
          <Text style={Styles.totaltext}>Total: Rs {totalPrice}</Text>
        </View>
        <View>
          <TouchableOpacity
            style={Styles.insertBtnTO}
            activeOpacity={0.8}
            onPress={() => proceedPayment()}>
            <Text style={Styles.insertBtnText}>Proceed Payment</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = state => {
  return {userData: state.user.userData};
};

const mapDispatchToProps = dispatch => {
  return {
    onFastagRecharge: (data, successCallBack, failureCallBack) =>
      dispatch(
        userActions.onFastagRecharge(data, successCallBack, failureCallBack),
      ),
    onCartBalUpdate: (data, successCallBack, failureCallBack) =>
      dispatch(
        userActions.onCartBalUpdate(data, successCallBack, failureCallBack),
      ),
    onPaymentSuccess: (data, successCallBack, failureCallBack) =>
      dispatch(
        userActions.onPaymentSuccess(data, successCallBack, failureCallBack),
      ),
    showErrorModal: (message, isFromError) =>
      dispatch(commonActions.showErrorModal(message, isFromError)),
    hideErrorModal: () => dispatch(commonActions.hideErrorModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FastagCart);
