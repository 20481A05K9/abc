import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {Styles} from '../../Styles/PlanTripStyles/TripSecureStyles';
import {Images} from '../../../assets';
import {Color} from '../../../global';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import CardPopupModal from '../../Components/ScreenTopCard/CardPopupModal';
import {connect} from 'react-redux';
import * as commonActions from '../../redux/actions/commonActions';
import * as userActions from '../../redux/actions/userActions';
import CustomLoader from '../../Components/CustomLoader';
import Validation from '../../Components/Validation';
import CustomStatusBar from '../../Components/CustomStatusBar';

const TripSecure = props => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const {TripData} = props.route.params || {};
  const [mobileNo, setMobileNo] = useState(null);
  const [loadingVisibility, setLoadingVisibility] = useState(false);
  const [validationVisible, setValidationVisible] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const {user} = props.userData;
      setMobileNo(user?.MOBILE_NUMBER);
    } catch (error) {
    }
  };

  const PopupModal = () => {
    setModalVisible(!isModalVisible);
  };

  const onPressTripData = val => {
    const data = {
      ...TripData,
      returnTrip: val,
    };
    if (val === true) {
      navigation.navigate('TripReturn', {TripData: data});
    } else {
      const data = {
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
        FASTAG_AMOUNT: TripData?.fastagPrice,
        CAR_POOL: 'No',
        CAR_SERVICE: 'No',
        TRIP_TYPE: TripData?.tripType,
        TYPE: 'i',
      };
      props.onTripList(
        data,
        res => onTripAddSuccessCallBack(res),
        error => onTripAddFailureCallBack(error),
      );
    }
  };

  const onTripAddSuccessCallBack = async res => {
    onNavigateToCart(res?.tripId);
  };

  const onTripAddFailureCallBack = error => {
    let msg = error;
    if (error == undefined || error == null) {
      msg = 'Something went wrong';
    }
    props.showErrorModal(msg, true);
  };

  const onNavigateToCart = tripId => {
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
      <Validation
        visible={validationVisible}
        message={validationMessage}
        onRetry={() => {
          setValidationVisible(false);
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={Styles.image}>
          <Text style={Styles.triptxt}>Plan a trip</Text>
        </View>
        <View>
          <ImageBackground source={Images.TripSecure1} style={Styles.topView}>
            <Text style={Styles.journeytxt}>Enjoy your trip while,</Text>
            <Text style={Styles.journeytxt1}>we take care of your</Text>
            <Text style={Styles.journeytxt1}>saftey.</Text>
            <TouchableOpacity activeOpacity={0.7} onPress={PopupModal}>
              <LinearGradient
                style={Styles.opacitytxt}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#1877F2', '#B0D3FA']}>
                <Text style={Styles.plantxt}>{`Get insured >`}</Text>
              </LinearGradient>
            </TouchableOpacity>
            <Text style={Styles.tctxt}>
              *Extra charges may apple for HSBC credit card
            </Text>
            <CardPopupModal
              visible={isModalVisible}
              title={'Secure your Trip'}
              message={
                'Enjoy every moment of your trip while our dedicated team ensures your well- being and handles any unforeseen challenges along the way.'
              }
              img={Images.Tripsecure}
              onClose={() => {
                setModalVisible(false);
              }}
            />
          </ImageBackground>
        </View>
        <View style={Styles.secondView}>
          <Text style={Styles.startxt}>
            Are you willing to plan the return trip?
          </Text>
          <View style={Styles.innerView}>
            <TouchableOpacity
              style={Styles.insertBtnTO1}
              activeOpacity={0.8}
              onPress={() => {
                onPressTripData(false);
              }}>
              <Text style={Styles.insertBtnText1}>No</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={Styles.insertBtnTO}
              activeOpacity={0.8}
              onPress={() => {
                onPressTripData(true);
              }}>
              <Text style={Styles.insertBtnText}>Yes</Text>
            </TouchableOpacity>
          </View>
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
    showErrorModal: (message, isFromError) =>
      dispatch(commonActions.showErrorModal(message, isFromError)),
    hideErrorModal: () => dispatch(commonActions.hideErrorModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TripSecure);
