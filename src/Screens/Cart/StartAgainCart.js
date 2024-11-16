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

const StartAgainCart = props => {
  const navigation = useNavigation();
  const {tripRouteDetails} = props.route.params || {};
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const [fastagPrice, setFastagPrice] = useState('');
  const [estimatedPrice, setEstimatedPrice] = useState('');
  const [rsaPrice, setRsaPrice] = useState('');
  const [platformPrice, setPlatformPrice] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  const [loadingVisibility, setLoadingVisibility] = useState(false);
  const [validationVisible, setValidationVisible] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');
  const [mobileNo, setMobileNo] = useState(null);
  const [tripData, setTripData] = useState(null);
  const [itemCount, setItemCount] = useState('');
  const [tripId, setTripId] = useState(null);
  const [noVehicleVisible, setNoVehicleVisible] = useState(false);
  const [tripLiveData, setTripLiveData] = useState([]);
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [vehicleDetails, setVehicleDetails] = useState([]);
  const [updatedVehicleNo, setUpdatedVehicleNo] = useState('');
  var mobileNoLocal = null;
  var vehicleNoLocal = null;
  var tripIdLocal = null;
  var tripLiveDataLocal = [];
  const [textInputVisible, setTextInputVisible] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponApplyed, setCouponApplyed] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    updateTotalPrice();
  }, [fastagPrice, isRoundTrip]);

  const getData = async () => {
    try {
      const {user, vehicles} = props.userData;
      setMobileNo(user?.MOBILE_NUMBER);
      mobileNoLocal = user?.MOBILE_NUMBER;
      getTripList(user?.MOBILE_NUMBER, vehicles);
    } catch (error) {
    }
  };

  const getTripList = (contact, vehicles) => {
    const data = {
      MOBILE_NUMBER: mobileNo == null ? contact : mobileNo,
      TYPE: 'l',
    };
    props.onTripList(
      data,
      res => onTripListSuccessCallBack(res, vehicles),
      error => onTripListFailureCallBack(error),
    );
  };

  const onTripListSuccessCallBack = async (res, vehicles) => {
    let startDateTime = formatDateTime(today_date, '00:00:00');
    var result = res?.data.filter(
      item => item.START_DATE_TIME == startDateTime && item.STATUS == 2,
    );
    setTripLiveData(result);
    tripLiveDataLocal = result;
    setVehicleDetails(vehicles);
    checkVehicle(vehicles);
  };

  const onTripListFailureCallBack = error => {
    let msg = error;
    if (error == undefined || error == null) {
      msg = 'Something went wrong';
    }
    props.showErrorModal(msg, true);
  };

  const checkVehicle = vData => {
    if (vData.length != 0) {
      checkHaveAnyLiveTrip(vData);
    } else {
      setNoVehicleVisible(true);
      setValidationMessage('Please add vehicle');
    }
  };

  const checkHaveAnyLiveTrip = vData => {
    let missingVehicle = findMissingVehicle(tripLiveDataLocal, vData);
    if (missingVehicle.length !== 0) {
      let fVehicle = missingVehicle.find(
        item => item.VEHICLE_NUMBER == tripRouteDetails?.VEHICLE_NUMBER,
      );
      let sVehicleNo = null;
      if (fVehicle != undefined) {
        sVehicleNo = fVehicle.VEHICLE_NUMBER;
      } else {
        sVehicleNo = missingVehicle[0].VEHICLE_NUMBER;
      }
      setUpdatedVehicleNo(sVehicleNo);
      vehicleNoLocal = sVehicleNo;
      createTrip(sVehicleNo);
    } else {
      setNoVehicleVisible(true);
      setValidationMessage(
        'You have already planned a trip with a selected date and vehicle so please change your vehicle or start date.',
      );
    }
  };

  function findMissingVehicle(data, data1) {
    const fullNames = data.map(item => item.VEHICLE_NUMBER);
    const missingObjects = data1.filter(
      item => !fullNames.includes(item.VEHICLE_NUMBER),
    );
    return missingObjects;
  }

  const createTrip = sVehicleNo => {
    let startDateTime = formatDateTime(today_date, '00:00:00');
    let endDateTime = formatDateTime(today_date, '23:59:59');
    const data = {
      MOBILE_NUMBER: mobileNoLocal,
      VEHICLE_NUMBER: sVehicleNo,
      TRIP_NAME: tripRouteDetails?.TRIP_NAME,
      SOURCE_FROM: tripRouteDetails?.SOURCE_FROM,
      DESTINATION_TO: tripRouteDetails?.DESTINATION_TO,
      START_DATE_TIME: startDateTime,
      END_DATE_TIME: endDateTime,
      FAMILY_MEMBERS: tripRouteDetails?.FAMILY_MEMBERS,
      GEO_LOCATION: {
        type: 'Point',
        x_coordinates: tripRouteDetails?.GEO_LOCATION?.x_coordinates,
        y_coordinates: tripRouteDetails?.GEO_LOCATION?.y_coordinates,
      },
      DEST_GEO_LOCATION: {
        type: 'Point',
        x_coordinates: tripRouteDetails?.DEST_GEO_LOCATION?.x_coordinates,
        y_coordinates: tripRouteDetails?.DEST_GEO_LOCATION?.y_coordinates,
      },
      FASTAG_AMOUNT: tripRouteDetails?.FASTAG_AMOUNT,
      CAR_POOL: tripRouteDetails?.CAR_POOL,
      CAR_SERVICE: tripRouteDetails?.CAR_SERVICE,
      TRIP_TYPE: tripRouteDetails?.TRIP_TYPE,
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
    tripIdLocal = TripID;
    if (tripRouteDetails?.TRIP_TYPE == 'ROUND_TRIP') {
      onPressReturnTripData();
    } else {
      getTripDetails();
    }
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

  const onPressReturnTripData = () => {
    let startDateTime = formatDateTime(today_date, '00:00:00');
    let endDateTime = formatDateTime(today_date, '23:59:59');
    const data = {
      MOBILE_NUMBER: mobileNoLocal,
      VEHICLE_NUMBER: vehicleNoLocal,
      TRIP_NAME: tripRouteDetails?.TRIP_NAME,
      SOURCE_FROM: tripRouteDetails?.DESTINATION_TO,
      DESTINATION_TO: tripRouteDetails?.SOURCE_FROM,
      START_DATE_TIME: startDateTime,
      END_DATE_TIME: endDateTime,
      FAMILY_MEMBERS: tripRouteDetails?.FAMILY_MEMBERS,
      DEST_GEO_LOCATION: {
        type: 'Point',
        x_coordinates: tripRouteDetails?.GEO_LOCATION?.x_coordinates,
        y_coordinates: tripRouteDetails?.GEO_LOCATION?.y_coordinates,
      },
      GEO_LOCATION: {
        type: 'Point',
        x_coordinates: tripRouteDetails?.DEST_GEO_LOCATION?.x_coordinates,
        y_coordinates: tripRouteDetails?.DEST_GEO_LOCATION?.y_coordinates,
      },
      FASTAG_AMOUNT: tripRouteDetails?.FASTAG_AMOUNT,
      CAR_POOL: tripRouteDetails?.CAR_POOL,
      CAR_SERVICE: tripRouteDetails?.CAR_SERVICE,
      TRIP_TYPE: tripRouteDetails?.TRIP_TYPE,
      TYPE: 'i',
    };
    props.onTripList(
      data,
      res => onReturnTripAddSuccessCallBack(res),
      error => onReturnTripAddFailureCallBack(error),
    );
  };

  const onReturnTripAddSuccessCallBack = async res => {
    getTripDetails();
  };

  const onReturnTripAddFailureCallBack = error => {
    let msg = error;
    if (error == undefined || error == null) {
      msg = 'Something went wrong';
    }
    props.showErrorModal(msg, true);
  };

  const getTripDetails = () => {
    const data = {
      MOBILE_NUMBER: mobileNo != null ? mobileNo : mobileNoLocal,
      TYPE: 'l',
      TRIP_ID: tripId != null ? tripId : tripIdLocal,
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
    PhonePePaymentSDK.init(sKey, mId, '', true)
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
      '',
      '',
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
    onTripList: (data, successCallBack, failureCallBack) =>
      dispatch(userActions.onTripList(data, successCallBack, failureCallBack)),
    onTripDetails: (data, successCallBack, failureCallBack) =>
      dispatch(
        userActions.onTripDetails(data, successCallBack, failureCallBack),
      ),
    onAddVehicle: (data, successCallBack, failureCallBack) =>
      dispatch(
        userActions.onAddVehicle(data, successCallBack, failureCallBack),
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

export default connect(mapStateToProps, mapDispatchToProps)(StartAgainCart);
