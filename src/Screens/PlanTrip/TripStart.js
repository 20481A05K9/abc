import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Platform,
} from 'react-native';
import {Styles} from '../../Styles/PlanTripStyles/TripStartStyles';
import {Images} from '../../../assets';
import {Color, FontFamily, FontSize} from '../../../global';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {MAPS_API__KEY} from '../../utils/Constants';
import {connect} from 'react-redux';
import CustomLoader from '../../Components/CustomLoader';
import Validation from '../../Components/Validation';
import * as commonActions from '../../redux/actions/commonActions';
import * as userActions from '../../redux/actions/userActions';
import CarWashCard from '../../Components/ScreenTopCard/CarWashCard';
import CardPopupModal from '../../Components/ScreenTopCard/CardPopupModal';
import CustomStatusBar from '../../Components/CustomStatusBar';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const TripStart = props => {
  const [isModalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const [mobileNo, setMobileNo] = useState(null);
  const [loadingVisibility, setLoadingVisibility] = useState(false);
  const [validationVisible, setValidationVisible] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');
  const [addressListData, setAddressListData] = useState([]);
  const isFocused = useIsFocused();
  const [dataCheckStatus, setDataCheckStatus] = useState(false);

  useEffect(() => {
    getData();
  }, [isFocused]);

  const getData = async () => {
    try {
      const {user} = props.userData;
      setMobileNo(user?.MOBILE_NUMBER);
      getLocationList(user?.MOBILE_NUMBER);
    } catch (error) {}
  };

  const getLocationList = async contact => {
    const data = {
      MOBILE_NUMBER: mobileNo == null ? contact : mobileNo,
      TYPE: 'l',
    };
    props.onAddLocation(
      data,
      res => onAddLocationSuccessCallBack(res),
      error => onAddLocationFailureCallBack(error),
    );
  };

  const onAddLocationSuccessCallBack = async res => {
    setAddressListData(res?.data);
    setDataCheckStatus(true);
  };

  const onAddLocationFailureCallBack = error => {
    let msg = error;
    if (error == undefined || error == null) {
      msg = 'Something went wrong';
    }
    props.showErrorModal(msg, true);
  };

  const renderAddressItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          onPressTripData(
            item.ADDRESS,
            item.LOCATION.y_coordinates,
            item.LOCATION.x_coordinates,
          )
        }
        activeOpacity={0.5}>
        <LinearGradient
          style={Styles.insertBtnTO}
          start={{x: 0, y: 1}}
          end={{x: 1.2, y: 0}}
          colors={['#FFC727', '#000000']}>
          <View style={Styles.innerView}>
            <MaterialIcons
              name={
                item.ADDRESS_TYPE === 'Office'
                  ? 'work'
                  : item.ADDRESS_TYPE === 'Hotel'
                  ? 'hotel'
                  : item.ADDRESS_TYPE === 'Home'
                  ? 'home'
                  : 'flag'
              }
              size={25}
              color={Color.colorWhite}
            />
            <Text style={Styles.txt1}>{item.CITY}</Text>
          </View>
          <Text style={Styles.txt2}>{item.ADDRESS}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  const onPressTripData = (name, lat, lng) => {
    if (!lat || !lng) {
      props.showErrorModal(
        'In your saved address latitude & longitude are not available so please select another address or search your address.',
        true,
      );
      return;
    }
    const data = {
      sourceName: name,
      sourceLat: lat,
      sourceLng: lng,
    };
    navigation.navigate('TripTime', {TripData: data});
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

      <View style={Styles.image}>
        <Text style={Styles.triptxt}>Plan a trip</Text>
      </View>
      <View>
        {Platform.OS == 'ios' ? (
          <CarWashCard
            bg1={'#ffebd8'}
            bg2={'#ffebd8'}
            round1={'#ffebd8'}
            round2={'#ffebd8'}
            txt1={'Start your Journey\nwith our expertise'}
            txt2={''}
            btn1={'#FF5B5B'}
            btn2={'#FF5B5B'}
            btnText={'Plan a trip >'}
            img={Images.TripImage1}
            onPress={() => setModalVisible(true)}
            roundShow={true}
          />
        ) : (
          <CarWashCard
            bg1={'#F8F1FF'}
            bg2={'#F8F1FF'}
            round1={'#F8F1FF'}
            round2={'#F8F1FF'}
            txt1={'Start your Journey\nwith our expertise'}
            txt2={''}
            btn1={'#FF5B5B'}
            btn2={'#FF5B5B'}
            btnText={'Plan a trip >'}
            img={Images.TripImage1}
            onPress={() => setModalVisible(true)}
            roundShow={true}
          />
        )}
      </View>
      <CardPopupModal
        visible={isModalVisible}
        title={'Plan a trip'}
        message={
          'Looking for a safe and secure trip assistance? BALERT will help you out with every service you need as a personal vehicle owner.'
        }
        img={Images.TripImage2}
        onClose={() => {
          setModalVisible(false);
        }}
      />
      <View style={Styles.secondView}>
        <Text style={Styles.startxt}>
          You are starting from? <Text style={{color: 'red'}}>*</Text>
        </Text>
        <View style={Styles.google}>
          <GooglePlacesAutocomplete
            placeholder="Starting from here"
            GooglePlacesDetailsQuery={{fields: 'geometry'}}
            fetchDetails={true}
            styles={{
              textInput: Styles.textinput,
              color: Color.colorBlack,
              description: {
                color: Color.colorBlack,
                fontSize: FontSize.size_13,
                fontFamily: FontFamily.montserratMedium,
              },
            }}
            textInputProps={{
              placeholderTextColor: '#000',
            }}
            onPress={(data, details = null) => {
              onPressTripData(
                data?.description,
                details?.geometry?.location.lat,
                details?.geometry?.location.lng,
              );
            }}
            query={{
              key: MAPS_API__KEY,
              language: 'en',
              components: 'country:in',
            }}
            onFail={error => {}}
          />
        </View>
        <View style={Styles.addressTitleView}>
          <Text style={Styles.saveAddresstxt}>Saved addresses</Text>
          <TouchableOpacity onPress={() => navigation.navigate('LocationHis')}>
            <MaterialCommunityIcons
              name="plus-thick"
              size={26}
              color={Color.colorOrange}
            />
          </TouchableOpacity>
        </View>
        <View style={{height: '60%'}}>
          {dataCheckStatus ? (
            addressListData.length != 0 ? (
              <FlatList
                data={addressListData}
                renderItem={renderAddressItem}
                keyExtractor={item => item._id.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: '10%'}}
              />
            ) : (
              <Image
                source={Images.noRecordFound}
                style={Styles.noRecordFound}
              />
            )
          ) : null}
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    userData: state.user.userData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddLocation: (data, successCallBack, failureCallBack) =>
      dispatch(
        userActions.onAddLocation(data, successCallBack, failureCallBack),
      ),
    showErrorModal: (message, isFromError) =>
      dispatch(commonActions.showErrorModal(message, isFromError)),
    hideErrorModal: () => dispatch(commonActions.hideErrorModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TripStart);
