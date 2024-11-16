import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {Styles} from '../../../Styles/History/FasTag/FasTagHisStyles';
import {Images} from '../../../../assets';
import {useNavigation} from '@react-navigation/native';
import * as commonActions from '../../../redux/actions/commonActions';
import * as userActions from '../../../redux/actions/userActions';
import {connect} from 'react-redux';
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FastagCard from '../../../Components/ScreenTopCard/FastagCard';
import CardPopupModal from '../../../Components/ScreenTopCard/CardPopupModal';
import CustomStatusBar from '../../../Components/CustomStatusBar';
import {Searchbar} from 'react-native-paper';

const FasTagHistory = props => {
  const [isModalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const [mobileNo, setMobileNo] = useState(null);
  const [fastagList, setFastagList] = useState([]);
  const [dataCheckStatus, setDataCheckStatus] = useState(false);
  const [filteredFastagList, setFilteredFastagList] = useState([]);
  const [search, setSearch] = useState('');
  const limit = 5;
  const [load, setLoad] = useState(false);
  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      let {user} = props.userData;
      setMobileNo(user?.MOBILE_NUMBER);
      getFastagList(user?.MOBILE_NUMBER);
    } catch (error) {
    }
  };

  const getFastagList = contact => {
    const data = {
      MOBILE_NUMBER: mobileNo != null ? mobileNo : contact,
      TYPE: 'l',
      page: pageCount,
      limit: limit,
    };
    props.onFastagRecharge(
      data,
      res => onFastagListSuccessCallBack(res),
      error => onFastagListFailureCallBack(error),
    );
  };

  const onFastagListSuccessCallBack = async res => {
    if (res?.message == 'success') {
      const Data = sortDatabyDate([...fastagList, ...res?.data]);
      setFastagList(Data);
      setFilteredFastagList(Data);
      setPageCount(prev => prev + 1);
      if (res?.data.length < limit) {
        setLoad(false);
      } else {
        setLoad(true);
      }
    }
    setDataCheckStatus(true);
  };

  const sortDatabyDate = data => {
    return data.sort((a, b) => new Date(b.CREATED_ON) - new Date(a.CREATED_ON));
  };

  const onFastagListFailureCallBack = error => {
    let msg = error;
    if (error == undefined || error == null) {
      msg = 'Something went wrong';
    }
    props.showErrorModal(msg, true);
  };

  const renderItems = ({item}) => (
    <View style={Styles.bg}>
      <View style={Styles.view1}>
        <Image source={Images.fasTagimg} style={Styles.tripImage21} />
        <Text style={Styles.recharge}>Recharge successful</Text>
        <Image source={Images.tick111} />
      </View>
      <View style={Styles.view2}>
        <Text style={Styles.vehicle}>
          Vehicle: <Text style={Styles.num}>{item.VEHICLE_NUMBER}</Text>
        </Text>
        <Text style={Styles.vehicle}>
          FasTag partner: <Text style={Styles.num}>{item.VEHICLE_FASTAG}</Text>
        </Text>
        <Text style={Styles.vehicle}>
          Amount: <Text style={Styles.num}>RS {item.AMOUNT}</Text>
        </Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <TouchableOpacity
          style={Styles.again1}
          onPress={() =>
            navigation.navigate('FastagCart', {
              vehicleNo: item.VEHICLE_NUMBER,
              fastagBalance: Number(item.AMOUNT),
            })
          }>
          <Ionicons name="sync-circle" color="#3DCF65" size={13} />
          <Text style={Styles.again}> Recharge again </Text>
        </TouchableOpacity>
        <Text style={Styles.payment}>
          Payment date: {moment(item.CREATED_ON).format('DD-MM-YYYY')}
        </Text>
      </View>
    </View>
  );

  const ListHeaderComponent = () => {
    return (
      <View style={{marginTop: '-8%'}}>
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
        <Text style={Styles.History}>FasTag History</Text>
      </View>
    );
  };

  const handleSearch = text => {
    const filteredData = fastagList.filter(item => {
      const vehicleNo = item?.VEHICLE_NUMBER;
      const fastag = item.VEHICLE_FASTAG;
      const amount = item?.AMOUNT;
      const dateTime = moment(item?.CREATED_ON).format('DD-MM-YYYY');
      const text_data = text;
      if (vehicleNo) {
        if (vehicleNo?.toUpperCase().includes(text_data?.toUpperCase()))
          return -1;
      }
      if (fastag) {
        if (fastag?.toUpperCase().includes(text_data?.toUpperCase())) return -1;
      }
      if (amount) {
        if (amount?.toString().includes(text_data?.toUpperCase())) return -1;
      }
      if (dateTime) {
        if (dateTime?.toUpperCase().includes(text_data?.toUpperCase()))
          return -1;
      }
    });
    setSearch(text);
    setFilteredFastagList(filteredData);
    if (text === '') {
      setFilteredFastagList(fastagList);
    }
  };

  const onEndReached = () => {
    if (load) {
      getFastagList();
    }
  };

  return (
    <View style={Styles.container}>
      <CustomStatusBar backgroundColor={'#efefef'} barStyle="dark-content" />
      <View>
        <Searchbar
          placeholder="Search Here"
          placeholderTextColor={'rgba(0, 0, 0, 0.34)'}
          style={Styles.searchBarStyle}
          inputStyle={Styles.input}
          clearIcon="close"
          value={search}
          onChangeText={text => handleSearch(text)}
        />
      </View>
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
      {dataCheckStatus ? (
        filteredFastagList.length != 0 ? (
          <FlatList
            data={filteredFastagList}
            renderItem={renderItems}
            keyExtractor={item => item._id}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={ListHeaderComponent}
            onEndReachedThreshold={0.01}
            onEndReached={() => onEndReached()}
          />
        ) : (
          <Image source={Images.noRecordFound} style={Styles.noRecordFound} />
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
    onFastagRecharge: (data, successCallBack, failureCallBack) =>
      dispatch(
        userActions.onFastagRecharge(data, successCallBack, failureCallBack),
      ),
    showErrorModal: (message, isFromError) =>
      dispatch(commonActions.showErrorModal(message, isFromError)),
    hideErrorModal: () => dispatch(commonActions.hideErrorModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FasTagHistory);
