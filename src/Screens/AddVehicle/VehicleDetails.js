import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Color, FontFamily} from '../../../global';
import {styles} from '../../Styles/AddVehicle/vehicleDetailsstyles';
import {Images} from '../../../assets/index';
import {connect, useDispatch} from 'react-redux';
import Validation from '../../Components/Validation';
import CustomLoader from '../../Components/CustomLoader';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as commonActions from '../../redux/actions/commonActions';
import * as userActions from '../../redux/actions/userActions';
import Entypo from 'react-native-vector-icons/Entypo';
import CustomStatusBar from '../../Components/CustomStatusBar';
import {storeData} from '../../utils/helperFunctions';

const VehicleDetails = props => {
  const navigation = useNavigation();
  const [vehicleDetails, setVehicleDetails] = useState([]);
  const [loadingVisibility, setLoadingVisibility] = useState(false);
  const [validationVisible, setValidationVisible] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');
  const [mobileNo, setMobileNo] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      let {user} = props.userData;
      setMobileNo(user?.MOBILE_NUMBER);
      getVehicleList(user?.MOBILE_NUMBER);
    } catch (error) {
    }
  };

  const getVehicleList = async contact => {
    const data = {
      MOBILE_NUMBER: mobileNo == null ? contact : mobileNo,
      TYPE: 'l',
    };
    props.onAddVehicle(
      data,
      res => onAddVehicleSuccessCallBack(res),
      error => onAddVehicleFailureCallBack(error),
    );
  };

  const onAddVehicleSuccessCallBack = async res => {
    setVehicleDetails(res?.data);
    const data = {...props.userData, vehicles: res?.data};
    storeData('userData', data)
      .then(value => {
        props.saveProfileData(data);
      })
      .catch(error => {
      });
  };

  const onAddVehicleFailureCallBack = error => {
    let msg = error;
    if (error == undefined || error == null) {
      msg = 'Something went wrong';
    }
    props.showErrorModal(msg, true);
  };

  const removeContact = contactToRemove => {
    const data = {
      ID: contactToRemove?._id,
      MOBILE_NUMBER: mobileNo,
      TYPE: 'd',
    };
    props.onAddVehicle(
      data,
      res => onDelVehicleSuccessCallBack(res),
      error => onDelVehicleFailureCallBack(error),
    );
  };

  const onDelVehicleSuccessCallBack = async res => {
    getVehicleList();
  };

  const onDelVehicleFailureCallBack = error => {
    let msg = error;
    if (error == undefined || error == null) {
      msg = 'Something went wrong';
    }
    props.showErrorModal(msg, true);
  };

  const renderItem = (item, index) => {
    return (
      <View
        key={index}
        style={{
          backgroundColor: '#fff',
          marginBottom: '5%',
          shadowColor: '#00000040',
          paddingVertical: '5%',
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderColor: Color.colorOrange,
        }}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <View>
            <Text style={{color: 'black', fontSize: 20}}>
              {item?.VEHICLE_NUMBER}
            </Text>
            <Text style={{color: 'black', marginTop: '5%'}}>
              {item?.vehicleType}
            </Text>
          </View>
          <TouchableOpacity activeOpacity={0.5} onPress={() => {}}>
            <Image source={Images.fasTagimg} style={{width: 85, height: 23}} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => removeContact(item)}>
            <MaterialIcons name="close" color="black" size={20} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
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
        <View style={styles.container1}>
          <View style={styles.topview}>
            <Text style={styles.vechiletxt}>Add Your Vehcile</Text>
          </View>
          <View>
            <Image style={styles.img} source={Images.addVechile} />
          </View>
          <View style={styles.secondView}>
            <Text style={styles.vechilenumtxt}>Vehicle details</Text>
          </View>
        </View>
        {vehicleDetails.length != 0 ? (
          vehicleDetails.map((item, index) => renderItem(item, index))
        ) : (
          <View
            style={{
              backgroundColor: '#fff',
              paddingVertical: '10%',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: Color.colorOrange,
            }}>
            <Text
              style={{
                fontSize: 17,
                fontFamily: FontFamily.montserratMedium,
                color: Color.colorBlack,
              }}>
              No vehicles added
            </Text>
          </View>
        )}
        {vehicleDetails.length < 2 ? (
          <TouchableOpacity
            style={styles.addVehicleButton}
            onPress={() => navigation.replace('Addvehicle')}>
            <Text style={styles.addVehicleButtonText}>
              {vehicleDetails.length == 0
                ? 'Add Vehicle'
                : 'Add Another Vehicle'}
            </Text>
          </TouchableOpacity>
        ) : (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'flex-start',
              marginHorizontal: '5%',
            }}>
            <Text
              style={{
                fontSize: 12,
                fontFamily: FontFamily.montserratMedium,
                color: Color.colorBlack,
              }}>
              {'Vehicles limit reached'}
            </Text>
            <Entypo name="dot-single" color="red" size={40} />
          </View>
        )}
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
    saveProfileData: data => dispatch(userActions.saveProfileData(data)),
    showErrorModal: (message, isFromError) =>
      dispatch(commonActions.showErrorModal(message, isFromError)),
    hideErrorModal: () => dispatch(commonActions.hideErrorModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VehicleDetails);
