import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {AddVechileStyles} from '../../Styles/AddVehicle/Addvehiclestyles';
import {useNavigation} from '@react-navigation/native';
import {Images} from '../../../assets/index';
import {
  VALID_VEHICLE_NO,
  VALID_VEHICLE_TYPE,
  VEHICLE_NUMBER_PATTERN,
  VEHICLE_NUMBER_PATTERN1,
} from '../../utils/Constants';
import {connect, useDispatch} from 'react-redux';
import {Color} from '../../../global';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Dropdown} from 'react-native-element-dropdown';
import Validation from '../../Components/Validation';
import CustomLoader from '../../Components/CustomLoader';
import * as commonActions from '../../redux/actions/commonActions';
import * as userActions from '../../redux/actions/userActions';
import CustomStatusBar from '../../Components/CustomStatusBar';
import { showError} from '../../utils/helperFunctions';

const {
  container,
  topview,
  vechiletxt,
  input,
  img,
  secondView1,
  vechilenumtxt,
  secondView,
  iconStyle,
  input1,
  insertBtnTO,
  insertBtnText,
  placeholderStyle,
  selectedTextStyle,
  itemTextStyle,
  itemContainerStyle,
  containerStyle,
  errorText,
} = AddVechileStyles;

const AddVehicle = props => {
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [vehicletype, setvehicletype] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation();
  const [loadingVisibility, setLoadingVisibility] = useState(false);
  const [validationVisible, setValidationVisible] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');
  const [mobileNo, setMobileNo] = useState(null);
  const [isVehicleFocus, setIsVehicleFocus] = useState(false);
  const [vehicleTypeValue, setVehicleTypeValue] = useState(null);
  const [vehicleTypeId, setVehicleTypeId] = useState(null);
  const [vehicleTypeData, setVehicleTypeData] = useState([]);
  const [isFastagFocus, setIsFastagFocus] = useState(false);
  const [fastagValue, setFastagValue] = useState(null);
  const [fastagId, setFastagId] = useState(null);
  const [fastagData, setFastagData] = useState([]);

  useEffect(() => {
    getData();
    getVehicleTypeList();
    getFastagList();
  }, []);

  const getData = async () => {
    try {
      const {user} = props.userData;
      setMobileNo(user?.MOBILE_NUMBER);
    } catch (error) {
    }
  };

  const getVehicleTypeList = async () => {
    props.onVehicleTypeList(
      res => onVehicleTypeListSuccessCallBack(res),
      error => onVehicleTypeListFailureCallBack(error),
    );
  };

  const onVehicleTypeListSuccessCallBack = async res => {
    setVehicleTypeData(res?.data);
  };

  const onVehicleTypeListFailureCallBack = error => {
    let msg = error;
    if (error == undefined || error == null) {
      msg = 'Something went wrong';
    }
    props.showErrorModal(msg, true);
  };

  const getFastagList = async () => {
    props.onFastagList(
      res => onFastagListSuccessCallBack(res),
      error => onFastagListFailureCallBack(error),
    );
  };

  const onFastagListSuccessCallBack = async res => {
    setFastagData(res?.data);
  };

  const onFastagListFailureCallBack = error => {
    let msg = error;
    if (error == undefined || error == null) {
      msg = 'Something went wrong';
    }
    props.showErrorModal(msg, true);
  };

  const handleAddVehicle = async () => {
    if (
      !VEHICLE_NUMBER_PATTERN.test(vehicleNumber) &&
      !VEHICLE_NUMBER_PATTERN1.test(vehicleNumber)
    ) {
      setError(VALID_VEHICLE_NO);
      return;
    }
    if (vehicleTypeId == null) {
      setvehicletype(VALID_VEHICLE_TYPE);
      return;
    }
    if (fastagId == null) {
      showError('Please select fastag')
      return;
    }

    const data = {
      MOBILE_NUMBER: mobileNo,
      VEHICLE_NUMBER: vehicleNumber,
      VEHICLE_TYPE: vehicleTypeId,
      VEHICLE_FASTAG: fastagId,
      TYPE: 'i',
    };
    props.onAddVehicle(
      data,
      res => onAddVehicleSuccessCallBack(res),
      error => onAddVehicleFailureCallBack(error),
    );
  };

  const onAddVehicleSuccessCallBack = async res => {
    navigation.replace('VehicleDetails');
  };

  const onAddVehicleFailureCallBack = error => {
    let msg = error;
    if (error == undefined || error == null) {
      msg = 'Something went wrong';
    }
    props.showErrorModal(msg, true);
  };

  return (
    <View style={container}>
      <CustomStatusBar backgroundColor={'#efefef'} barStyle="dark-content" />
      <CustomLoader visible={loadingVisibility} />
      <Validation
        visible={validationVisible}
        message={validationMessage}
        onRetry={() => {
          setValidationVisible(false);
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={topview}>
          <Text style={vechiletxt}>Add Your Vehcile</Text>
        </View>
        <View>
          <Image style={img} source={Images.addVechile} />
        </View>
        <View style={secondView}>
          <Text style={vechilenumtxt}>Vehicle Number</Text>
          {error !== '' && <Text style={errorText}>{error}</Text>}
          <TextInput
            placeholder="Enter Vehicle Number"
            value={vehicleNumber}
            onChangeText={text => {
              setVehicleNumber(text);
              setError('');
            }}
            style={input1}
            keyboardType="default"
            autoCapitalize="characters"
            maxLength={11}
            placeholderTextColor={'rgba(0, 0, 0, 0.65)'}
          />
        </View>
        <View style={secondView1}>
          <Text style={vechilenumtxt}>Vehicle Type</Text>
          <Dropdown
            style={input}
            placeholderStyle={placeholderStyle}
            selectedTextStyle={selectedTextStyle}
            iconStyle={iconStyle}
            itemTextStyle={itemTextStyle}
            itemContainerStyle={itemContainerStyle}
            containerStyle={containerStyle}
            search={false}
            data={vehicleTypeData.filter(
              item => item.VEHICLE_TYPE == 'Four Wheeler',
            )}
            labelField="VEHICLE_TYPE"
            valueField="VEHICLE_TYPE"
            placeholder="Select Vehile Type"
            searchPlaceholder="Search..."
            value={vehicleTypeValue}
            onChange={item => {
              setVehicleTypeValue(item.VEHICLE_TYPE);
              setVehicleTypeId(item._id);
              setIsVehicleFocus(false);
              setvehicletype('');
            }}
            onFocus={() => setIsVehicleFocus(true)}
            onBlur={() => setIsVehicleFocus(false)}
            renderRightIcon={() => (
              <Ionicons
                color={Color.colorBlack}
                name={isFastagFocus ? 'chevron-up' : 'chevron-down'}
                size={20}
              />
            )}
          />
          <Dropdown
            style={input}
            placeholderStyle={placeholderStyle}
            selectedTextStyle={selectedTextStyle}
            iconStyle={iconStyle}
            itemTextStyle={itemTextStyle}
            itemContainerStyle={itemContainerStyle}
            containerStyle={containerStyle}
            search={false}
            data={fastagData}
            maxHeight={300}
            labelField="FASTAG_BANK_NAME"
            valueField="FASTAG_BANK_NAME"
            placeholder="Choose Fastag Partner"
            value={fastagValue}
            onChange={item => {
              setFastagValue(item.FASTAG_BANK_NAME);
              setFastagId(item._id);
              setIsFastagFocus(false);
            }}
            onFocus={() => setIsFastagFocus(true)}
            onBlur={() => setIsFastagFocus(false)}
            renderRightIcon={() => (
              <Ionicons
                color={Color.colorBlack}
                name={isFastagFocus ? 'chevron-up' : 'chevron-down'}
                size={20}
              />
            )}
          />
        </View>
        <View>
          <TouchableOpacity
            style={insertBtnTO}
            onPress={handleAddVehicle}
            activeOpacity={0.8}>
            <Text style={insertBtnText}>Add Vehicle</Text>
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
    onVehicleTypeList: (successCallBack, failureCallBack) =>
      dispatch(userActions.onVehicleTypeList(successCallBack, failureCallBack)),
    onFastagList: (successCallBack, failureCallBack) =>
      dispatch(userActions.onFastagList(successCallBack, failureCallBack)),
    onAddVehicle: (data, successCallBack, failureCallBack) =>
      dispatch(
        userActions.onAddVehicle(data, successCallBack, failureCallBack),
      ),
    showErrorModal: (message, isFromError) =>
      dispatch(commonActions.showErrorModal(message, isFromError)),
    hideErrorModal: () => dispatch(commonActions.hideErrorModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddVehicle);
