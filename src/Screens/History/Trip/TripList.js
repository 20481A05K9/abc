import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  BackHandler,
  Platform,
  FlatList,
} from 'react-native';
import {styles} from '../../../Styles/History/Trip/TripListStyles';
import {Color} from '../../../../global';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {Images} from '../../../../assets';
import {connect} from 'react-redux';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import CustomLoader from '../../../Components/CustomLoader';
import Validation from '../../../Components/Validation';
import moment from 'moment';
import * as commonActions from '../../../redux/actions/commonActions';
import * as userActions from '../../../redux/actions/userActions';
import CarWashCard from '../../../Components/ScreenTopCard/CarWashCard';
import CardPopupModal from '../../../Components/ScreenTopCard/CardPopupModal';
import CustomStatusBar from '../../../Components/CustomStatusBar';
import {Searchbar} from 'react-native-paper';

const TripList = props => {
  const navigation = useNavigation();
  const {TripID} = props.route.params || {};
  const [loadingVisibility, setLoadingVisibility] = useState(false);
  const [validationVisible, setValidationVisible] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');
  const [tripListData, setTripListData] = useState([]);
  const [dataCheckStatus, setDataCheckStatus] = useState(false);
  const [mobileNo, setMobileNo] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState('');
  const [filteredtripList, setFilteredTripList] = useState([]);
  const limit = 5;
  const [load, setLoad] = useState(false);
  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
    getData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        if (TripID != undefined && TripID != null && TripID != '') {
          navigation.navigate('BottomTabNavigation');
        } else {
          navigation.goBack();
        }

        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', backAction);
      navigation.addListener('gestureEnd', backAction);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', backAction);
        navigation.removeListener('gestureEnd', backAction);
      };
    }, []),
  );

  const getData = async () => {
    try {
      const {user} = props.userData;
      setMobileNo(user?.MOBILE_NUMBER);
      getTripList(user?.MOBILE_NUMBER);
    } catch (error) {
    }
  };

  const getTripList = contact => {
    const data = {
      MOBILE_NUMBER: mobileNo == null ? contact : mobileNo,
      TYPE: 'l',
      page: pageCount,
      limit: limit,
    };
    props.onTripList(
      data,
      res => onTripListSuccessCallBack(res),
      error => onTripListFailureCallBack(error),
    );
  };

  const onTripListSuccessCallBack = async res => {
    let loadData = [...tripListData, ...res?.data];
    let filterData = loadData.filter(item => item.TRIP_TYPE != 'INSURANCE');
    setTripListData(filterData);
    setFilteredTripList(filterData);
    setDataCheckStatus(true);
    setPageCount(prev => prev + 1);
    if (res?.data.length < limit) {
      setLoad(false);
    } else {
      setLoad(true);
    }
  };

  const onTripListFailureCallBack = error => {
    let msg = error;
    if (error == undefined || error == null) {
      msg = 'Something went wrong';
    }
    props.showErrorModal(msg, true);
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        key={index}
        style={styles.view1}
        activeOpacity={0.2}
        onPress={() => navigation.navigate('TripDetails', {TripID: item?._id})}>
        {item?.STATUS == 3 ? (
          <Text style={styles.past}>Cancelled</Text>
        ) : item?.TRIP_STATUS == 'LIVE' ? (
          <Text style={styles.errortext}>
            .<Text style={styles.live}> Live</Text>
          </Text>
        ) : item?.TRIP_STATUS == 'Upcomming' ? (
          <Text style={styles.errortext1}>
            .<Text style={styles.live}> Upcoming</Text>
          </Text>
        ) : (
          <Text style={styles.past}>Past</Text>
        )}
        {item?.TRIP_STATUS == 'Old' && (
          <TouchableOpacity
            style={styles.opacitytxt2}
            activeOpacity={0.5}
            onPress={() =>
              navigation.navigate('StartAgainCart', {tripRouteDetails: item})
            }>
            <View style={styles.iconStyle}>
              <FontAwesome6
                name="clock-rotate-left"
                color={Color.colorWhite}
                size={10}
              />
            </View>
            <Text style={styles.start}>Start Again</Text>
          </TouchableOpacity>
        )}
        <View style={styles.innerView}>
          <Text style={styles.hyd}>
            <FontAwesome6
              name="location-dot"
              color={Color.colorDimgray}
              size={15}
            />
            {' ' + item?.SOURCE_FROM}
          </Text>
          {item?.DESTINATION_TO != '' && (
            <Text style={styles.Bang}>
              <FontAwesome6
                name="location-dot"
                color={Color.colorDimgray}
                size={15}
              />{' '}
              {item?.DESTINATION_TO}
            </Text>
          )}
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.date}>
            <FontAwesome6
              name="calendar"
              color={Color.colorDimgray}
              size={15}
            />
            {' ' + moment(item?.START_DATE_TIME).format('YYYY-MM-DD')}
          </Text>
          <Text style={styles.tripID}>
            Trip id: <Text style={styles.num}>{item?.TRIP_NUMBER}</Text>
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const ListHeaderComponent = () => {
    return (
      <>
        <View style={{marginLeft: '-5%', marginBottom: '5%', marginTop: '-7%'}}>
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
        <Text style={styles.History}>History</Text>
      </>
    );
  };

  const handleSearch = text => {
    const filteredData = tripListData.filter(item => {
      const source = item?.SOURCE_FROM;
      const destination = item?.DESTINATION_TO;
      const tripID = item?.TRIP_NUMBER;
      const dateTime = moment(item?.START_DATE_TIME).format('YYYY-MM-DD');
      const text_data = text;
      if (source) {
        if (source?.toUpperCase().includes(text_data?.toUpperCase())) return -1;
      }
      if (destination) {
        if (destination?.toUpperCase().includes(text_data?.toUpperCase()))
          return -1;
      }
      if (tripID) {
        if (tripID?.toUpperCase().includes(text_data?.toUpperCase())) return -1;
      }
      if (dateTime) {
        if (dateTime?.toUpperCase().includes(text_data?.toUpperCase()))
          return -1;
      }
    });
    setSearch(text);
    setFilteredTripList(filteredData);
    if (text === '') {
      setFilteredTripList(tripListData);
    }
  };

  const onEndReached = () => {
    if (load) {
      getTripList();
    }
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
      <Text style={styles.HisText}>Trip history</Text>
      <View>
        <Searchbar
          placeholder="Search Here"
          placeholderTextColor={'rgba(0, 0, 0, 0.34)'}
          style={styles.searchBarStyle}
          inputStyle={styles.input}
          clearIcon="close"
          value={search}
          onChangeText={text => handleSearch(text)}
        />
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

      {dataCheckStatus ? (
        filteredtripList.length != 0 ? (
          <FlatList
            data={filteredtripList}
            renderItem={renderItem}
            keyExtractor={item => item._id.toString()}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={ListHeaderComponent}
            onEndReachedThreshold={0.01}
            onEndReached={() => onEndReached()}
          />
        ) : (
          <Image source={Images.noRecordFound} style={styles.noRecordFound} />
        )
      ) : null}
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

export default connect(mapStateToProps, mapDispatchToProps)(TripList);
