import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  TextInput,
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
import moment from 'moment';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import * as commonActions from '../../redux/actions/commonActions';
import * as userActions from '../../redux/actions/userActions';
import CustomStatusBar from '../../Components/CustomStatusBar';
import {showError} from '../../utils/helperFunctions';

var today_date = new Date(new Date().setDate(new Date().getDate()));

const CheckoutCart = props => {
  const navigation = useNavigation();
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const [fastagPrice, setFastagPrice] = useState('');
  const [estimatedPrice, setEstimatedPrice] = useState('');
  const [rsaPrice, setRsaPrice] = useState('');
  const [platformPrice, setPlatformPrice] = useState('');
  const [subTotalPrice, setSubTotalPrice] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  const [loadingVisibility, setLoadingVisibility] = useState(false);
  const [validationVisible, setValidationVisible] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');
  const [mobileNo, setMobileNo] = useState(null);
  var mobileNoLocal = null;
  const [tripData, setTripData] = useState(null);
  const [itemCount, setItemCount] = useState('');
  const [tripId, setTripId] = useState(null);
  const [noVehicleVisible, setNoVehicleVisible] = useState(false);
  const [tripLiveData, setTripLiveData] = useState([]);
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [textInputVisible, setTextInputVisible] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponApplyed, setCouponApplyed] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    updateTotalPrice();
  }, [fastagPrice]);

  const getData = async () => {
    try {
      let {user, vehicles} = props.userData;
      setMobileNo(user?.MOBILE_NUMBER);
      mobileNoLocal = user?.MOBILE_NUMBER;
      if (vehicles.length != 0) {
        getTripList(user?.MOBILE_NUMBER);
      } else {
        setNoVehicleVisible(true);
        setValidationMessage('Please add vehicle');
      }
    } catch (error) {
    }
  };

  const getTripList = contact => {
    const data = {
      MOBILE_NUMBER: mobileNo == null ? contact : mobileNo,
      TYPE: 'l',
    };
    props.onTripList(
      data,
      res => onTripListSuccessCallBack(res),
      error => onTripListFailureCallBack(error),
    );
  };

  const onTripListSuccessCallBack = async res => {
    let startDateTime = formatDateTime(today_date, '00:00:00');
    var result = res?.data.filter(
      item => item.START_DATE_TIME == startDateTime && item.STATUS == 2,
    );
    setTripLiveData(result);
    checkHaveAnyLiveTrip(result);
  };

  const onTripListFailureCallBack = error => {
    let msg = error;
    if (error == undefined || error == null) {
      msg = 'Something went wrong';
    }
    props.showErrorModal(msg, true);
  };

  const checkHaveAnyLiveTrip = liveData => {
    const {vehicles, user} = props.userData;
    let missingVehicle = findMissingVehicle(liveData, vehicles);
    if (missingVehicle !== undefined) {
      createTrip(missingVehicle, user);
    } else {
      setNoVehicleVisible(true);
      setValidationMessage(
        'You have already planned a trip with a selected date and vehicle so please change your vehicle or start date.',
      );
    }
  };

  function findMissingVehicle(data, data1) {
    for (let item of data1) {
      if (!data.some(elem => elem.VEHICLE_NUMBER === item.VEHICLE_NUMBER)) {
        return item;
      }
    }
    return undefined;
  }

  const createTrip = (mVehicle, user) => {
    let startDateTime = formatDateTime(today_date, '00:00:00');
    let endDateTime = formatDateTime(today_date, '23:59:59');
    const data = {
      MOBILE_NUMBER: mobileNoLocal,
      VEHICLE_NUMBER: mVehicle?.VEHICLE_NUMBER,
      TRIP_NAME: 'XYZ',
      SOURCE_FROM: user?.ADDRESS,
      DESTINATION_TO: user?.ADDRESS,
      START_DATE_TIME: startDateTime,
      END_DATE_TIME: endDateTime,
      FAMILY_MEMBERS: [],
      GEO_LOCATION: {
        type: 'Point',
        x_coordinates: user?.LOCATION?.x_coordinates,
        y_coordinates: user?.LOCATION?.y_coordinates,
      },
      DEST_GEO_LOCATION: {
        type: 'Point',
        x_coordinates: user?.LOCATION?.x_coordinates,
        y_coordinates: user?.LOCATION?.y_coordinates,
      },
      FASTAG_AMOUNT: 0,
      CAR_POOL: 'No',
      CAR_SERVICE: 'No',
      TRIP_TYPE: 'SINGLE_TRIP',
      TYPE: 'i',
    };
    props.onTripList(
      data,
      res => onTripAddSuccessCallBack(res),
      error => onTripAddFailureCallBack(error),
    );
  };

  const onTripAddSuccessCallBack = async res => {
    const TripID = res?.tripId;
    setTripId(TripID);
    getTripDetails(TripID);
  };

  const onTripAddFailureCallBack = error => {
    let msg = error;
    if (error == undefined || error == null) {
      msg = 'Something went wrong';
    }
    props.showErrorModal(msg, true);
  };

  const formatDateTime = (dateString, timeString) => {
    const formattedDate = moment(dateString).format('YYYY-MM-DD');

    return formattedDate + ' ' + timeString;
  };

  const getTripDetails = contact => {
    const data = {
      MOBILE_NUMBER: mobileNo != null ? mobileNo : mobileNoLocal,
      TYPE: 'l',
      TRIP_ID: tripId != null ? tripId : contact,
    };
    props.onTripDetails(
      data,
      res => onTripDetailsSuccessCallBack(res),
      error => onTripDetailsFailureCallBack(error),
    );
  };

  const onTripDetailsSuccessCallBack = async res => {
    onSetDataOnState(res?.data);
  };

  const onTripDetailsFailureCallBack = error => {
    let msg = error;
    if (error == undefined || error == null) {
      msg = 'Something went wrong';
    }
    props.showErrorModal(msg, true);
  };

  const onSetDataOnState = sData => {
    setTripData(sData);
    setVehicleNumber(sData?.vehicle?.VEHICLE_NUMBER);
    setFastagPrice(sData?.price?.FASTAG);
    setEstimatedPrice(sData?.price?.FASTAG);
    setPlatformPrice(sData?.price?.PLATFORM_CHANGES);
    let sTotal =
      Number(sData?.price?.FASTAG) + Number(sData?.price?.PLATFORM_CHANGES);
    setTotalPrice(sTotal);
    let iCount = 0;
    if (sData?.price?.FASTAG != 0) {
      iCount++;
    }
    setItemCount(iCount);
  };

  const increaseValue = () => {
    if (fastagPrice == 0) {
      setFastagPrice(fastagPrice + 500);
    } else {
      setFastagPrice(fastagPrice + 100);
    }
  };

  const decreaseValue = () => {
    if (fastagPrice > 0) {
      if (fastagPrice <= 500) {
        setFastagPrice(0);
      } else {
        setFastagPrice(fastagPrice - 100);
      }
    } else {
      setFastagPrice(0);
    }
  };

  const updateTotalPrice = () => {
    let subtotal = Number(fastagPrice);
    if (isRoundTrip) {
      subtotal *= 2;
    }
    let total = Number(subtotal) + Number(platformPrice);
    setTotalPrice(total);

    let iCount = 0;
    if (fastagPrice != 0) {
      iCount++;
    }
    setItemCount(iCount);
  };

  const initPhonePeSDK = (cartId, sKey, mId, base64, sha256) => {
    PhonePePaymentSDK.init(sKey, mId, null, false)
      .then(result => {
        makePayment(cartId, base64, sha256);
      })
      .catch(error => {
      });
  };

  const makePayment = (cartId, requestBody, checksum) => {
    PhonePePaymentSDK.startTransaction(
      requestBody,
      checksum,
      null,
      null,
    )
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
      navigation.replace('SuccessFail', {
        name: 'TRIPSUCCESS',
        status: 1,
        TripID: tripId,
      });
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

  const proceedPayment = () => {
    const data = {
      MOBILE_NUMBER: mobileNo,
      ID: tripId,
      VEHICLE_NUMBER: tripData?.vehicle?.VEHICLE_NUMBER,
      TRIP_NAME: 'XYZ',
      SOURCE_FROM: tripData?.trip?.SOURCE_FROM,
      DESTINATION_TO: tripData?.trip?.DESTINATION_TO,
      START_DATE_TIME: tripData?.trip?.START_DATE_TIME,
      END_DATE_TIME: tripData?.trip?.END_DATE_TIME,
      FAMILY_MEMBERS: tripData?.trip?.FAMILY_MEMBERS,
      GEO_LOCATION: {
        type: 'Point',
        x_coordinates: tripData?.trip?.GEO_LOCATION?.x_coordinates,
        y_coordinates: tripData?.trip?.GEO_LOCATION?.y_coordinates,
      },
      DEST_GEO_LOCATION: {
        type: 'Point',
        x_coordinates: tripData?.trip?.DEST_GEO_LOCATION?.x_coordinates,
        y_coordinates: tripData?.trip?.DEST_GEO_LOCATION?.y_coordinates,
      },
      TYPE: 'u',
      FASTAG_AMOUNT: fastagPrice,
      FASTAG_FLAG: fastagPrice === 0 ? 'd' : 'u',
      RSA_FLAG: rsaPrice === 0 ? 'd' : 'u',
    };
    props.onTripList(
      data,
      res => onTripUpdateSuccessCallBack(res),
      error => onTripUpdateFailureCallBack(error),
    );
  };

  const onTripUpdateSuccessCallBack = async res => {
    const data = {
      MOBILE_NUMBER: mobileNo,
      TRIP_ID: tripId,
      TOTAL_AMOUNT: totalPrice,
      COUPON_CODE: couponCode,
      TYPE: 'TRIP',
    };
    props.onCartBalUpdate(
      data,
      res => onCartBalUpdateSuccessCallBack(res),
      error => onCartBalUpdateFailureCallBack(error),
    );
  };

  const onTripUpdateFailureCallBack = error => {
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

  const onCouponApply = () => {
    if (couponCode.trim().length == 0) {
      props.showErrorModal('Please enter coupon code', true);
      return;
    }
    setCouponApplyed(true);
  };

  const handleDataFromScreenEditTrip = data => {
    getTripDetails();
  };

  return (
    <View style={Styles.container}>
      <CustomStatusBar backgroundColor="#efefef" barStyle="dark-content" />
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
            onPress={() =>
              navigation.navigate('EditTrip', {
                TripID: tripId,
                onDataFromScreenEditTrip: handleDataFromScreenEditTrip,
              })
            }>
            <Text style={Styles.addtxt}>Edit Trip</Text>
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
              <View
                style={{
                  alignItems: 'flex-end',
                  marginLeft: '3%',
                }}>
                <Text style={Styles.errortxt4}>Estimated Price</Text>
                <Text style={Styles.errortxt5}>Rs {estimatedPrice}</Text>
              </View>
            </View>
            <Text style={[Styles.rupee, {marginTop: '3%'}]}>
              {tripData?.vehicle?.fastagBankName}
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
        <View style={[Styles.view3, {marginTop: '5%'}]}>
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
    onTripList: (data, successCallBack, failureCallBack) =>
      dispatch(userActions.onTripList(data, successCallBack, failureCallBack)),
    onTripDetails: (data, successCallBack, failureCallBack) =>
      dispatch(
        userActions.onTripDetails(data, successCallBack, failureCallBack),
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

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutCart);
