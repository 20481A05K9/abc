import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {Styles} from '../../Styles/PlanTripStyles/EditTripStyles';
import {Images} from '../../../assets';
import {Color} from '../../../global';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Dropdown} from 'react-native-element-dropdown';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import CustomLoader from '../../Components/CustomLoader';
import Validation from '../../Components/Validation';
import Entypo from 'react-native-vector-icons/Entypo';
import * as commonActions from '../../redux/actions/commonActions';
import * as userActions from '../../redux/actions/userActions';
import CustomStatusBar from '../../Components/CustomStatusBar';

const EditTrip = props => {
  const [selectedFamilyMember, setSelectedFamilyMember] = useState([]);
  const [vehicleDetails, setVehicleDetails] = useState([]);
  const [isVehicleFocus, setIsVehicleFocus] = useState(false);
  const [vehicleNo, setVehicleNo] = useState(null);
  const navigation = useNavigation();
  const {TripID, onDataFromScreenEditTrip} = props.route.params || {};
  const [loadingVisibility, setLoadingVisibility] = useState(false);
  const [validationVisible, setValidationVisible] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');
  const [mobileNo, setMobileNo] = useState(null);
  var mobileNoLocal = null;
  const [tripData, setTripData] = useState(null);
  const [tripLiveData, setTripLiveData] = useState([]);
  const [checkButtonEnable, setCheckButtonEnable] = useState(false);
  var tripDataLocal = null;
  const isFocused = useIsFocused();

  useEffect(() => {
    getData();
  }, [isFocused]);

  const getData = async () => {
    try {
      let {user, vehicles} = props.userData;
      setMobileNo(user?.MOBILE_NUMBER);
      mobileNoLocal = user?.MOBILE_NUMBER;
      setVehicleDetails(vehicles);
      getTripDetails(user?.MOBILE_NUMBER);
    } catch (error) {
    }
  };

  const getTripDetails = contact => {
    const data = {
      MOBILE_NUMBER: contact,
      TYPE: 'l',
      TRIP_ID: TripID,
    };
    props.onTripDetails(
      data,
      res => onTripDetailsSuccessCallBack(res),
      error => onTripDetailsFailureCallBack(error),
    );
  };

  const onTripDetailsSuccessCallBack = async res => {
    onSetTripDetails(res?.data);
    getTripList();
  };

  const onTripDetailsFailureCallBack = error => {
    let msg = error;
    if (error == undefined || error == null) {
      msg = 'Something went wrong';
    }
    props.showErrorModal(msg, true);
  };

  const getTripList = contact => {
    const data = {
      MOBILE_NUMBER: mobileNoLocal,
      TYPE: 'l',
    };
    props.onTripList(
      data,
      res => onTripListSuccessCallBack(res),
      error => onTripListFailureCallBack(error),
    );
  };

  const onTripListSuccessCallBack = async res => {
    var result = res?.data.filter(
      item =>
        item.START_DATE_TIME == tripDataLocal?.trip?.START_DATE_TIME &&
        item.STATUS == 2,
    );
    setTripLiveData(result);
  };

  const onTripListFailureCallBack = error => {
    let msg = error;
    if (error == undefined || error == null) {
      msg = 'Something went wrong';
    }
    props.showErrorModal(msg, true);
  };

  const onSetTripDetails = sData => {
    setTripData(sData);
    tripDataLocal = sData;
    let cVehicleNo = sData?.vehicle?.VEHICLE_NUMBER;
    let fVehicleRes = vehicleDetails.find(
      item => item.VEHICLE_NUMBER == cVehicleNo,
    );
    if (fVehicleRes != undefined) {
      setCheckButtonEnable(true);
      setVehicleNo(fVehicleRes.VEHICLE_NUMBER);
    }
  };

  const onVehiclePress = sItem => {
    setIsVehicleFocus(false);
    var checkVehicle = tripLiveData.find(
      item => item.VEHICLE_NUMBER == sItem.VEHICLE_NUMBER,
    );
    if (checkVehicle == undefined) {
      setCheckButtonEnable(true);
      setVehicleNo(sItem.VEHICLE_NUMBER);
    } else {
      setCheckButtonEnable(false);
      setValidationVisible(true);
      setValidationMessage(
        'You have already planned a trip with a selected date and vehicle so please change your vehicle or start date.',
      );
    }
  };

  const onPressUpdate = () => {
    const data = {
      MOBILE_NUMBER: mobileNo,
      ID: TripID,
      VEHICLE_NUMBER: vehicleNo,
      TRIP_NAME: tripData?.trip?.TRIP_NAME,
      SOURCE_FROM: tripData?.trip?.SOURCE_FROM,
      DESTINATION_TO: tripData?.trip?.DESTINATION_TO,
      START_DATE_TIME: tripData?.trip?.START_DATE_TIME,
      END_DATE_TIME: tripData?.trip?.END_DATE_TIME,
      FAMILY_MEMBERS: selectedFamilyMember,
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
      FASTAG_AMOUNT: tripData?.price?.FASTAG,
      FASTAG_FLAG: 'u',
      RSA_FLAG: 'u',
    };
    props.onTripList(
      data,
      res => onTripUpdateSuccessCallBack(res),
      error => onTripUpdateFailureCallBack(error),
    );
  };

  const onTripUpdateSuccessCallBack = async res => {
    onDataFromScreenEditTrip && onDataFromScreenEditTrip();
    navigation.goBack();
  };

  const onTripUpdateFailureCallBack = error => {
    let msg = error;
    if (error == undefined || error == null) {
      msg = 'Something went wrong';
    }
    props.showErrorModal(msg, true);
  };

  const isFormValid = () => {
    return vehicleNo !== null && checkButtonEnable;
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

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={Styles.image}>
          <Text style={Styles.triptxt}>Edit trip</Text>
        </View>
        <Image source={Images.editTripImg} style={Styles.editTripImage} />
        <View style={Styles.secondView}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: '8%',
            }}>
            <Text style={Styles.txt1}>Select vehicle</Text>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => navigation.navigate('VehicleDetails')}
              style={Styles.addFamilyTO}>
              <Entypo name="edit" size={20} color={Color.colorOrange} />
            </TouchableOpacity>
          </View>
          <Dropdown
            style={Styles.dropdown}
            placeholderStyle={Styles.placeholderStyle}
            selectedTextStyle={Styles.selectedTextStyle}
            itemContainerStyle={{borderRadius: 8}}
            selectedStyle={{borderRadius: 8}}
            containerStyle={{borderRadius: 8}}
            iconStyle={Styles.iconStyle}
            itemTextStyle={Styles.itemTextStyle}
            search={false}
            data={vehicleDetails}
            maxHeight={300}
            labelField="VEHICLE_NUMBER"
            valueField="VEHICLE_NUMBER"
            placeholder="Select Vehicle"
            value={vehicleNo}
            onChange={item => onVehiclePress(item)}
            onFocus={() => setIsVehicleFocus(true)}
            onBlur={() => setIsVehicleFocus(false)}
            renderRightIcon={() => (
              <Ionicons
                color={Color.colorBlack}
                name={isVehicleFocus ? 'chevron-up' : 'chevron-down'}
                size={20}
              />
            )}
          />
        </View>
        <TouchableOpacity
          style={[
            Styles.insertBtnTO,
            !isFormValid() && Styles.disabledContinue,
          ]}
          onPress={isFormValid() ? onPressUpdate : undefined}
          disabled={!isFormValid()}
          activeOpacity={0.8}>
          <Text style={Styles.insertBtnText}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = state => {
  return {userData: state.user.userData};
};

const mapDispatchToProps = dispatch => {
  return {
    onAddVehicle: (data, successCallBack, failureCallBack) =>
      dispatch(
        userActions.onAddVehicle(data, successCallBack, failureCallBack),
      ),
    onTripDetails: (data, successCallBack, failureCallBack) =>
      dispatch(
        userActions.onTripDetails(data, successCallBack, failureCallBack),
      ),
    onTripList: (data, successCallBack, failureCallBack) =>
      dispatch(userActions.onTripList(data, successCallBack, failureCallBack)),
    showErrorModal: (message, isFromError) =>
      dispatch(commonActions.showErrorModal(message, isFromError)),
    hideErrorModal: () => dispatch(commonActions.hideErrorModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditTrip);
