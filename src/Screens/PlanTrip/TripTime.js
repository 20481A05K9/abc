import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {Styles} from '../../Styles/PlanTripStyles/TripTimeStyles';
import {Images} from '../../../assets';
import {Color} from '../../../global';
import DatePicker from 'react-native-date-picker';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import FastagCard from '../../Components/ScreenTopCard/FastagCard';
import CardPopupModal from '../../Components/ScreenTopCard/CardPopupModal';
import CustomStatusBar from '../../Components/CustomStatusBar';

var today_date = new Date(new Date().setDate(new Date().getDate()));

export default TripTime = props => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [DD, setDD] = useState('');
  const [MM, setMM] = useState('');
  const [YYYY, setYYYY] = useState('');
  const [HH, setHH] = useState('');
  const [MIN, setMIN] = useState('');
  const navigation = useNavigation();
  const {TripData} = props.route.params || {};

  const PopupModal = () => {
    setModalVisible(!isModalVisible);
  };

  const onConfirmPress = date => {
    setShowDatePicker(false);
    setSelectedDate(date);
    const dateObject = new Date(date);

    const DD = String(dateObject.getDate()).padStart(2, '0'); 
    const MM = String(dateObject.getMonth() + 1).padStart(2, '0'); 
    const YYYY = dateObject.getFullYear(); 
    const HH = dateObject.getHours();
    const MIN = dateObject.getMinutes();
    const mode = dateObject.getTimezoneOffset();

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
    let startDateTime = formatDateTime(date, '00:00:00');
    let endDateTime = formatDateTime(date, '23:59:59');
    const data = {
      ...TripData,
      startDateTime: startDateTime,
      endDateTime: endDateTime,
    };
    navigation.navigate('TripDest', {TripData: data});
  };

  const onConfirmPress1 = date => {
    setShowDatePicker(false);
    setSelectedDate(date);
    const dateObject = new Date(date);

    const DD = String(dateObject.getDate()).padStart(2, '0');
    const MM = String(dateObject.getMonth() + 1).padStart(2, '0'); 
    const YYYY = dateObject.getFullYear();

    setDD(DD);
    setMM(MM);
    setYYYY(YYYY);
  };

  return (
    <View style={Styles.container}>
      <CustomStatusBar
        backgroundColor={Color.colorOrange}
        barStyle="dark-content"
      />
      <View style={Styles.image}>
        <Text style={Styles.triptxt}>Plan a trip</Text>
      </View>
      {Platform.OS == 'ios' ? (
        <FastagCard
          bg={'#ffebd8'}
          round1={'#f5f5f5'}
          round2={'#f5f5f5'}
          txt1={'It’s a great day to start\nyour journey'}
          txt2={''}
          btn1={'#FF76B8'}
          btn2={'#FF76B8'}
          btnText={'more >'}
          img={Images.Calender2}
          onPress={() => setModalVisible(true)}
        />
      ) : (
        <FastagCard
          bg={'#fff'}
          round1={'#FDEFFF'}
          round2={'#FDEFFF'}
          txt1={'It’s a great day to start\nyour journey'}
          txt2={''}
          btn1={'#FF76B8'}
          btn2={'#FF76B8'}
          btnText={'more >'}
          img={Images.Calender2}
          onPress={() => setModalVisible(true)}
        />
      )}
      <CardPopupModal
        visible={isModalVisible}
        title={'Book a Date'}
        message={'Select a date and we will schedule your trip accordingly.'}
        img={Images.Calender3}
        onClose={() => {
          setModalVisible(false);
        }}
      />
      <View style={Styles.secondView}>
        <Text style={Styles.startxt}>Schedule Date and time</Text>
        <Text style={Styles.startxt1}>
          Start date and time <Text style={{color: 'red'}}>*</Text>
        </Text>
        <View>
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
          minimumDate={today_date}
        />
      </View>
    </View>
  );
};
