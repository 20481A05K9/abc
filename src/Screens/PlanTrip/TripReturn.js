import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {Styles} from '../../Styles/PlanTripStyles/TripReturnStyles';
import {Images} from '../../../assets';
import {Color} from '../../../global';
import DatePicker from 'react-native-date-picker';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CustomLoader from '../../Components/CustomLoader';
import {connect} from 'react-redux';
import * as commonActions from '../../redux/actions/commonActions';
import * as userActions from '../../redux/actions/userActions';
import CustomStatusBar from '../../Components/CustomStatusBar';
import { onGetAddressDetails } from '../../redux/GoogleApis/GoogleApis';

const TripReturn = props => {
  const navigation = useNavigation();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [DD, setDD] = useState('');
  const [MM, setMM] = useState('');
  const [YYYY, setYYYY] = useState('');
  const [HH, setHH] = useState('');
  const [MIN, setMIN] = useState('');
  const {TripData} = props.route.params || {};
  const [sourceCityName, setSourceCityName] = useState('');
  const [destinationCityName, setDestinationCityName] = useState('');
  const [loadingVisibility, setLoadingVisibility] = useState(false);
  const [mobileNo, setMobileNo] = useState(null);
  var tripId = null;
  let startDateTime = null;
  let endDateTime = null;

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getSourceCityName(TripData?.sourceLat, TripData?.sourceLng);
    getDestinationCityName(TripData?.destinationLat, TripData?.destinationLng);
  }, []);

  const getData = async () => {
    try {
      const {user} = props.userData;
      setMobileNo(user?.MOBILE_NUMBER);
    } catch (error) {
    }
  };

  const getSourceCityName = async (latitude, longitude) => {
    setLoadingVisibility(true);
    try {
      const data = {latitude: latitude, longitude: longitude};
      const response = await onGetAddressDetails(data);
      if (response?.data.results.length > 0) {
        const city = response?.data.results[0].address_components.find(component =>
          component.types.includes('locality'),
        );
        let sCity = city ? city.long_name : null;

        setSourceCityName(sCity);
      }
      setLoadingVisibility(false);
    } catch (error) {
      setLoadingVisibility(false);
    }
  };

  const getDestinationCityName = async (latitude, longitude) => {
    setLoadingVisibility(true);
    try {
      const data = {latitude: latitude, longitude: longitude};
      const response = await onGetAddressDetails(data);
      if (response?.data.results.length > 0) {
        const city = response?.data.results[0].address_components.find(component =>
          component.types.includes('locality'),
        );
        let sCity = city ? city.long_name : null;

        setDestinationCityName(sCity);
      }
      setLoadingVisibility(false);
    } catch (error) {
      setLoadingVisibility(false);
    }
  };

  const onConfirmPress = date => {
    setShowDatePicker(false);
    setSelectedDate(date);
    const dateObject = new Date(date);

    const DD = String(dateObject.getDate()).padStart(2, '0'); // Day
    const MM = String(dateObject.getMonth() + 1).padStart(2, '0'); // Month (months are zero-based)
    const YYYY = dateObject.getFullYear(); // Year
    const HH = dateObject.getHours();
    const MIN = dateObject.getMinutes();

    setDD(DD);
    setMM(MM);
    setYYYY(YYYY);
    setHH(HH);
    setMIN(MIN);
    onPressTripData(date);
  };

  const formatDateTime = (dateString, timeString) => {
    const formattedDate = moment(dateString).format('YYYY-MM-DD');

    return formattedDate + ' ' + timeString;
  };

  const onPressTripData = date => {
    startDateTime = formatDateTime(date, '00:00:00');
    endDateTime = formatDateTime(date, '23:59:59');
    const data1 = {
      MOBILE_NUMBER: mobileNo,
      VEHICLE_NUMBER: TripData?.vehicleNumber,
      TRIP_NAME: 'XYZ',
      SOURCE_FROM: TripData?.sourceName,
      DESTINATION_TO: TripData?.destinationName,
      START_DATE_TIME: TripData?.startDateTime,
      END_DATE_TIME: TripData?.endDateTime,
      FAMILY_MEMBERS: [],
      GEO_LOCATION: {
        type: 'Point',
        x_coordinates: TripData?.sourceLng,
        y_coordinates: TripData?.sourceLat,
      },
      DEST_GEO_LOCATION: {
        type: 'Point',
        x_coordinates: TripData?.destinationLng,
        y_coordinates: TripData?.destinationLat,
      },
      FASTAG_AMOUNT: TripData?.returnTrip
        ? Number(TripData?.fastagPrice) * 2
        : TripData?.fastagPrice,
      CAR_POOL: 'No',
      CAR_SERVICE: 'No',
      TRIP_TYPE: TripData?.tripType,
      TYPE: 'i',
    };
    props.onTripList(
      data1,
      res => onTripAddSuccessCallBack(res),
      error => onTripAddFailureCallBack(error),
    );
  };

  const onTripAddSuccessCallBack = async res => {
    tripId = res?.tripId;
    if (TripData?.returnTrip == true) {
      onPressReturnTripData();
    } else {
      onNavigateToCart();
    }
  };

  const onTripAddFailureCallBack = error => {
    let msg = error;
    if (error == undefined || error == null) {
      msg = 'Something went wrong';
    }
    props.showErrorModal(msg, true);
  };

  const onPressReturnTripData = date => {
    const data = {
      MOBILE_NUMBER: mobileNo,
      VEHICLE_NUMBER: TripData?.vehicleNumber,
      TRIP_NAME: 'XYZ',
      SOURCE_FROM: TripData?.destinationName,
      DESTINATION_TO: TripData?.sourceName,
      START_DATE_TIME: startDateTime,
      END_DATE_TIME: endDateTime,
      FAMILY_MEMBERS: [],
      DEST_GEO_LOCATION: {
        type: 'Point',
        x_coordinates: TripData?.sourceLng,
        y_coordinates: TripData?.sourceLat,
      },
      GEO_LOCATION: {
        type: 'Point',
        x_coordinates: TripData?.destinationLng,
        y_coordinates: TripData?.destinationLat,
      },
      FASTAG_AMOUNT: TripData?.fastagPrice,
      CAR_POOL: 'No',
      CAR_SERVICE: 'No',
      TRIP_TYPE: TripData?.tripType,
      TYPE: 'i',
    };
    props.onTripList(
      data,
      res => onReturnTripAddSuccessCallBack(res),
      error => onReturnTripAddFailureCallBack(error),
    );
  };

  const onReturnTripAddSuccessCallBack = async res => {
    onNavigateToCart();
  };

  const onReturnTripAddFailureCallBack = error => {
    let msg = error;
    if (error == undefined || error == null) {
      msg = 'Something went wrong';
    }
    props.showErrorModal(msg, true);
  };

  const onNavigateToCart = () => {
    setLoadingVisibility(false);
    navigation.navigate('Cart', {TripID: tripId});
  };

  return (
    <View style={Styles.container}>
      <CustomStatusBar
        backgroundColor={Color.colorOrange}
        barStyle="dark-content"
      />
      <CustomLoader visible={loadingVisibility} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={Styles.image}>
          <Text style={Styles.triptxt}>Return trip</Text>
        </View>
        <View style={Styles.topView}>
          <View style={Styles.innerView}>
            <Text style={[Styles.txt, {width: wp('40%')}]}>
              {destinationCityName}
            </Text>
            <Text style={Styles.txt}>{`  ->  `}</Text>
            <Text style={[Styles.txt, {width: wp('40%')}]}>
              {sourceCityName}
            </Text>
          </View>
        </View>
        <View style={Styles.secondView}>
          <Text style={Styles.Rdate}>Return date and time (Starting Time)</Text>
          <View style={{marginTop: '4%'}}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => setShowDatePicker(true)}>
              <Text style={Styles.inputcontainer}>
                {DD != '' ? DD : 'DD'} - {MM != '' ? MM : 'MM'} -{' '}
                {YYYY != '' ? YYYY : 'YYYY'} {HH != '' ? HH : 'HH'}:
                {MIN != '' ? MIN : 'MIN'}
              </Text>
            </TouchableOpacity>
          </View>
          <DatePicker
            modal
            mode="datetime"
            open={showDatePicker}
            date={selectedDate}
            onConfirm={date => {
              onConfirmPress(date);
            }}
            onCancel={() => {
              setShowDatePicker(false);
            }}
            minimumDate={new Date(TripData?.startDateTime)}
          />
        </View>
        <Image source={Images.returnImage} style={Styles.imagetxt} />
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
    showErrorModal: (message, isFromError) =>
      dispatch(commonActions.showErrorModal(message, isFromError)),
    hideErrorModal: () => dispatch(commonActions.hideErrorModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TripReturn);
