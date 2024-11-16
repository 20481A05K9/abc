import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import {Styles} from '../../Styles/PlanTripStyles/TripVehicleStyles';
import {Images} from '../../../assets';
import {Color} from '../../../global';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Dropdown} from 'react-native-element-dropdown';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Validation from '../../Components/Validation';
import CustomLoader from '../../Components/CustomLoader';
import {connect} from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import * as commonActions from '../../redux/actions/commonActions';
import * as userActions from '../../redux/actions/userActions';
import FastagCard from '../../Components/ScreenTopCard/FastagCard';
import CardPopupModal from '../../Components/ScreenTopCard/CardPopupModal';
import CustomStatusBar from '../../Components/CustomStatusBar';

const TripVehicle = props => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [vehicleDetails, setVehicleDetails] = useState([]);
  const [isVehicleFocus, setIsVehicleFocus] = useState(false);
  const [vehicleNo, setVehicleNo] = useState(null);
  const navigation = useNavigation();
  const [loadingVisibility, setLoadingVisibility] = useState(false);
  const [validationVisible, setValidationVisible] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');
  const [mobileNo, setMobileNo] = useState(null);
  const {TripData} = props.route.params || {};
  const [tripLiveData, setTripLiveData] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    getData();
  }, [isFocused]);

  const getData = async () => {
    try {
      const {user, vehicles} = props.userData;
      setMobileNo(user?.MOBILE_NUMBER);
      setVehicleDetails(vehicles);
      getTripList(user?.MOBILE_NUMBER);
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
    var result = res?.data.filter(
      item =>
        item.START_DATE_TIME == TripData?.startDateTime && item.STATUS == 2,
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

  const onVehiclePress = sItem => {
    setIsVehicleFocus(false);
    var checkVehicle = tripLiveData.find(
      item => item.VEHICLE_NUMBER == sItem.VEHICLE_NUMBER,
    );
    if (checkVehicle == undefined) {
      setVehicleNo(sItem.VEHICLE_NUMBER);
      onPressTripData(sItem.VEHICLE_NUMBER);
    } else {
      setValidationVisible(true);
      setValidationMessage(
        'You have already planned a trip with a selected date and vehicle so please change your vehicle or start date.',
      );
    }
  };

  const onPressTripData = vNumber => {
    const data = {
      ...TripData,
      vehicleNumber: vNumber,
    };
    navigation.navigate('TripSecure', {TripData: data});
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

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: '5%'}}>
        <View style={Styles.image}>
          <Text style={Styles.triptxt}>Plan a trip</Text>
        </View>
        {Platform.OS == 'ios' ? (
          <FastagCard
            bg={'#b9e7ff'}
            round1={'#9addff'}
            round2={'#81d4ff'}
            txt1={'Recharge your FasTag\nusing '}
            txt2={'BALERT'}
            btn1={'#FD8E8E'}
            btn2={'#FD8E8E'}
            btnText={'Recharge now >'}
            img={Images.Triptoll}
            img1={Images.fasTagimg}
            onPress={() => setModalVisible(true)}
          />
        ) : (
          <FastagCard
            bg={'#fff'}
            round1={'#E4F5FF'}
            round2={'#CDEEFF'}
            txt1={'Recharge your FasTag\nusing '}
            txt2={'BALERT'}
            btn1={'#FD8E8E'}
            btn2={'#FD8E8E'}
            btnText={'Recharge now >'}
            img={Images.Triptoll}
            img1={Images.fasTagimg}
            onPress={() => setModalVisible(true)}
          />
        )}
        <CardPopupModal
          visible={isModalVisible}
          title={'Recharge your FasTag'}
          message={
            'Get your FasTag recharge done with BALERT and get extra benefits.'
          }
          img={Images.fasTagimg}
          onClose={() => {
            setModalVisible(false);
          }}
        />
        <View style={Styles.secondView}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={Styles.startxt}>Select your vehicle</Text>
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
            selectedStyle={{}}
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
    onTripList: (data, successCallBack, failureCallBack) =>
      dispatch(userActions.onTripList(data, successCallBack, failureCallBack)),
    showErrorModal: (message, isFromError) =>
      dispatch(commonActions.showErrorModal(message, isFromError)),
    hideErrorModal: () => dispatch(commonActions.hideErrorModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TripVehicle);
