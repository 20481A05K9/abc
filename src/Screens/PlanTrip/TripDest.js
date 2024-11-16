import React, {useState} from 'react';
import {View, Text, Platform} from 'react-native';
import {Styles} from '../../Styles/PlanTripStyles/TripDestStyles';
import {Images} from '../../../assets';
import {Color, FontFamily, FontSize} from '../../../global';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {useNavigation} from '@react-navigation/native';
import {MAPS_API__KEY} from '../../utils/Constants';
import CustomLoader from '../../Components/CustomLoader';
import Validation from '../../Components/Validation';
import RsaSupportCard from '../../Components/ScreenTopCard/RsaSupportCard';
import CardPopupModal from '../../Components/ScreenTopCard/CardPopupModal';
import CustomStatusBar from '../../Components/CustomStatusBar';
import {connect} from 'react-redux';
import * as commonActions from '../../redux/actions/commonActions';
import {onGetRouteDetails} from '../../redux/GoogleApis/GoogleApis';

const TripDest = props => {
  const navigation = useNavigation();
  const {TripData} = props.route.params || {};
  const [isModalVisible, setModalVisible] = useState(false);
  const [routeTollData, setRouteTollData] = useState('');
  const [loadingVisibility, setLoadingVisibility] = useState(false);
  const [validationVisible, setValidationVisible] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');

  const getDistanceHourTollPrice = async (name, lat, lng) => {
    setLoadingVisibility(true);
    getInfoApi(lat, lng)
      .then(result => {
        setLoadingVisibility(false);
        if (result) {
          var km = Math.floor(result.distance / 1000);

          var str = result.duration.substring(0, result.duration.length - 1);
          var hours = Math.floor(str / 3600);
          var minutes = Math.floor((str % 3600) / 60);
          var time = hours + ' hrs : ' + minutes + ' min';
          var estPrice = Number(result.tollPrice) / 2;
          const data = {
            distance: km,
            time: time,
            tollPrice: estPrice,
          };
          setRouteTollData(data);
          onPressTripData(name, lat, lng, estPrice);
        } else {
          props.showErrorModal(
            "Something went wrong. The toll price wasn't found.",
            true,
          );
          onPressTripData(name, lat, lng, (estPrice = 0));
        }
      })
      .catch(error => {
        setLoadingVisibility(false);
      });
  };

  const getInfoApi = async (lat, lng) => {
    try {
      const data = {
        oLat: TripData?.sourceLat,
        oLng: TripData?.sourceLng,
        dLat: lat,
        dLng: lng,
      };
      const response = await onGetRouteDetails(data);

      const distance = response?.routes[0]?.distanceMeters;
      const duration = response?.routes[0]?.duration;
      const tollPrice =
        response?.routes[0]?.legs[0]?.travelAdvisory?.tollInfo
          ?.estimatedPrice[0]?.units;

      return {distance, duration, tollPrice};
    } catch (error) {
      return null;
    }
  };

  const onPressTripData = (name, lat, lng, estPrice) => {
    const data = {
      ...TripData,
      destinationName: name,
      destinationLat: lat,
      destinationLng: lng,
      fastagPrice: estPrice,
    };
    navigation.navigate('TripVehicle', {TripData: data});
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
      {Platform.OS == 'ios' ? (
        <RsaSupportCard
          bg1={'#e9fdcd'}
          bg2={'#e9fdcd'}
          round1={'#defcb5'}
          round2={'#d3fb9b'}
          txt1={'Get '}
          txt2={'Road Side Assistance\n'}
          txt3={'and secure your\njourney'}
          btn1={'#1F735C'}
          btn2={'#1CBF73'}
          btnText={'Get Details >'}
          img={Images.RSA}
          onPress={() => setModalVisible(true)}
        />
      ) : (
        <RsaSupportCard
          bg1={'#F4FEE6'}
          bg2={'#fff'}
          round1={'#F5FFE8'}
          round2={'#ECF9DD'}
          txt1={'Get '}
          txt2={'Road Side Assistance\n'}
          txt3={'and secure your\njourney'}
          btn1={'#1F735C'}
          btn2={'#1CBF73'}
          btnText={'Get Details >'}
          img={Images.RSA}
          onPress={() => setModalVisible(true)}
        />
      )}
      <CardPopupModal
        visible={isModalVisible}
        title={'Road Side Assistance'}
        message={
          'Get 20+ services which provides peace of mind for drivers. The primary goal is to assist drivers in resolving immediate problems so they can continue their journey or safely reach a repair facility.'
        }
        img={Images.TripImage4}
        onClose={() => {
          setModalVisible(false);
        }}
      />
      <View style={Styles.secondView}>
        <Text style={Styles.startxt}>
          Choose your destination <Text style={{color: 'red'}}>*</Text>
        </Text>
        <View style={Styles.view2}>
          <MaterialIcons
            name="my-location"
            size={25}
            style={Styles.iconstyle}
          />
          <View style={Styles.google}>
            <GooglePlacesAutocomplete
              GooglePlacesDetailsQuery={{fields: 'geometry'}}
              fetchDetails={true}
              textInputProps={{
                placeholderTextColor: '#000',
              }}
              styles={{
                textInput: Styles.textinput,
                description: {
                  color: Color.colorBlack,
                  fontSize: FontSize.size_13,
                  fontFamily: FontFamily.montserratMedium,
                },
              }}
              placeholder="Choose Destination"
              onPress={(data, details = null) => {
                getDistanceHourTollPrice(
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
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    showErrorModal: (message, isFromError) =>
      dispatch(commonActions.showErrorModal(message, isFromError)),
    hideErrorModal: () => dispatch(commonActions.hideErrorModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TripDest);
