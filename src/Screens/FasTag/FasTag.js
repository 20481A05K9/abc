import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {Styles} from '../../Styles/PlanTripStyles/TripVehicleStyles';
import {Images} from '../../../assets';
import {Color} from '../../../global';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Dropdown} from 'react-native-element-dropdown';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import * as commonActions from '../../redux/actions/commonActions';
import {connect} from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import FastagCard from '../../Components/ScreenTopCard/FastagCard';
import CardPopupModal from '../../Components/ScreenTopCard/CardPopupModal';
import CustomStatusBar from '../../Components/CustomStatusBar';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const FasTag = props => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [vehicleDetails, setVehicleDetails] = useState([]);
  const [isVehicleFocus, setIsVehicleFocus] = useState(false);
  const [vehicleNo, setVehicleNo] = useState(null);
  const [vehicleId, setVehicleId] = useState(null);
  const [vehicleFastag, setVehicleFastag] = useState(null);
  const navigation = useNavigation();
  const [mobileNo, setMobileNo] = useState(null);
  const [fastagPrice, setFastagPrice] = useState(500);
  const isFocused = useIsFocused();

  useEffect(() => {
    getData();
  }, [isFocused]);

  const getData = async () => {
    try {
      const {user, vehicles} = props.userData;
      setMobileNo(user?.MOBILE_NUMBER);
      setVehicleDetails(vehicles);
    } catch (error) {}
  };

  const onProceed = () => {
    if (Number(fastagPrice) < 500) {
      props.showErrorModal('Please add amount minimum 500', true);
      return;
    }
    navigation.navigate('FastagCart', {
      vehicleNo,
      vehicleId,
      fastagBalance: Number(fastagPrice),
      vehicleFastag,
    });
  };

  const isSubmitEnabled = () => {
    return vehicleNo != null;
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

  return (
    <View style={Styles.container}>
      <CustomStatusBar backgroundColor={'#efefef'} barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Text style={Styles.fastag}>FasTag recharge</Text>
        </View>
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
            <Text style={Styles.startxt1}>Vehicle Number</Text>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => navigation.navigate('VehicleDetails')}
              style={Styles.addFamilyTO}>
              <Entypo name="edit" size={20} color={Color.colorOrange} />
            </TouchableOpacity>
          </View>
          <Dropdown
            style={Styles.dropdown1}
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
            placeholder="Select Your Vehicle"
            value={vehicleNo}
            onChange={item => {
              setVehicleNo(item.VEHICLE_NUMBER);
              setVehicleId(item._id);
              setVehicleFastag(item.fastagBankName);
              setIsVehicleFocus(false);
            }}
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
        <View>
          <Text style={Styles.text1}>How much would you like to add?</Text>
          <View style={Styles.view1}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={decreaseValue}
              disabled={fastagPrice === 0}>
              <FontAwesome5
                name="minus"
                color="grey"
                size={20}
                style={{
                  backgroundColor: '#C8C8C8',
                  borderRadius: 10,
                  padding: '3%',
                }}
              />
            </TouchableOpacity>
            <Text style={Styles.rs}>RS {fastagPrice}</Text>
            <TouchableOpacity activeOpacity={0.5} onPress={increaseValue}>
              <FontAwesome5
                name="plus"
                color="grey"
                size={20}
                style={{
                  backgroundColor: '#C8C8C8',
                  borderRadius: 10,
                  padding: '3%',
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <TouchableOpacity
            style={[
              Styles.insertBtnTO,
              !isSubmitEnabled() && {backgroundColor: '#e9d9c2'},
            ]}
            onPress={isSubmitEnabled() ? onProceed : undefined}
            disabled={!isSubmitEnabled()}>
            <Text style={Styles.insertBtnText}>Proceed</Text>
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
    showErrorModal: (message, isFromError) =>
      dispatch(commonActions.showErrorModal(message, isFromError)),
    hideErrorModal: () => dispatch(commonActions.hideErrorModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FasTag);
