import {
  Text,
  View,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Images} from '../../../assets';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {Color, FontFamily, FontSize} from '../../../global';
import DatePicker from 'react-native-date-picker';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import OcticonsIcon from 'react-native-vector-icons/Octicons';
import {styles} from '../../Styles/Wallet/TransactionsStyles';
import {useNavigation} from '@react-navigation/native';
import CustomStatusBar from '../../Components/CustomStatusBar';
import {connect} from 'react-redux';
import * as commonActions from '../../redux/actions/commonActions';
import * as userActions from '../../redux/actions/userActions';
import {showError} from '../../utils/helperFunctions';
import moment from 'moment';

const Transactions = props => {
  const navigation = useNavigation();
  const [mobileNo, setMobileNo] = useState(null);
  const [txnData, setTxnData] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  useEffect(() => {
    getTxnData();
  }, []);

  const getTxnData = () => {
    const {user} = props.userData;
    setMobileNo(user?.MOBILE_NUMBER);
    const data = {
      MOBILE_NUMBER: user?.MOBILE_NUMBER,
      TYPE: 'TXN_STATUS',
    };
    props.onPpi(
      data,
      res => onPpiTxnDataSuccessCallBack(res),
      error => onPpiTxnDataFailureCallBack(error),
    );
  };

  const onPpiTxnDataSuccessCallBack = async res => {
    if (res?.data != null && res?.data != undefined && res?.data != '') {
      setTxnData(res?.data);
    }
  };

  const onPpiTxnDataFailureCallBack = error => {
    let msg = error;
    if (error == undefined || error == null) {
      msg = 'Something went wrong';
    }
    props.showErrorModal(msg, true);
  };

  const applyFilter = () => {
    if (startDate > endDate) {
      showError('Start date should be less that or equal to end date.');
      return;
    }
    let formatStartDate = moment(startDate).format('DD-MM-YYYY');
    let formatEndDate = moment(endDate).format('DD-MM-YYYY');
    const data = {
      MOBILE_NUMBER: mobileNo,
      TYPE: 'FETCH_TXN',
      START_DATE: formatStartDate,
      END_DATE: formatEndDate,
    };
    props.onPpi(
      data,
      res => onPpiTxnFilterSuccessCallBack(res),
      error => onPpiTxnFilterFailureCallBack(error),
    );
  };

  const onPpiTxnFilterSuccessCallBack = async res => {
    setIsFilterVisible(false)
    if (res?.data != null && res?.data != undefined && res?.data != '') {
      setTxnData(res?.data);
    }
  };

  const onPpiTxnFilterFailureCallBack = error => {
    let msg = error;
    if (error == undefined || error == null) {
      msg = 'Something went wrong';
    }
    props.showErrorModal(msg, true);
  };

  return (
    <View style={styles.container}>
      <CustomStatusBar backgroundColor={'#efefef'} barStyle="dark-content" />
      <Text style={styles.texthead}>Transaction History</Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          marginVertical:'2%'
        }}>
        <View style={styles.mobinp}>
          <AntDesignIcon name="search1" color={Color.colorBlack} size={18} />
          <TextInput
            style={styles.textinp}
            placeholder="Search with transaction ID"
            placeholderTextColor={Color.colorGray}
          />
        </View>
        <TouchableOpacity onPress={() => setIsFilterVisible(true)}>
          <AntDesignIcon name="filter" size={30} color={Color.colorOrange} />
        </TouchableOpacity>
        <Modal
          visible={isFilterVisible}
          animationType="slide"
          transparent={true}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  columnGap: wp('4%'),
                  padding: hp('1%'),
                  width: wp('90%'),
                }}>
                <View style={styles.modalcomponent}>
                  <Text style={styles.modaltext}>Start Date</Text>
                  <DatePicker
                    date={startDate}
                    onDateChange={setStartDate}
                    mode="date"
                    style={{transform: [{scale: 0.5}]}}
                    theme='auto'
                  />
                </View>
                <View style={styles.modalcomponent}>
                  <Text style={styles.modaltext}>End Date</Text>
                  <DatePicker
                    date={endDate}
                    onDateChange={setEndDate}
                    maximumDate={new Date()}
                    mode="date"
                    style={{transform: [{scale: 0.5}]}}
                    theme='auto'
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  paddingVertical: hp('1%'),
                  justifyContent:'space-between',
                  marginHorizontal:'5%'
                }}>
                <TouchableOpacity onPress={() => applyFilter()}>
                  <LinearGradient
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    colors={['#F9A738', '#FEE62A']}
                    style={styles.linearGradient}>
                    <Text style={styles.buttontxt}>Apply filter</Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsFilterVisible(false)}>
                  <LinearGradient
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    colors={['#F9A738', '#FEE62A']}
                    style={styles.linearGradient}>
                    <Text style={styles.buttontxt}>Cancel</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
      <FlatList
        data={txnData}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={<View style={styles.horizontalLine}></View>}
        keyExtractor={item => item.name}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('FetchTransaction', {
                image: item.image,
                amount: item.amount,
                name: item.name,
                trans: item.trans,
                timestamp: item.dateandtime,
                status: item.status,
              })
            }>
            <View style={styles.list}>
              <Image
                source={item.image}
                style={[styles.contactimage, {marginRight: '0%'}]}
              />
              <View style={{marginRight: '5%', rowGap: hp('1%')}}>
                <Text style={styles.textdeb1}>{item.name}</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    columnGap: wp('1%'),
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontFamily: FontFamily.montserratRegular,
                      fontSize: 9,
                      color: Color.colorGray,
                    }}>
                    Txn ID: {item.trans.slice(0, 4) + 'xxxxxx'}
                  </Text>
                  <Text style={styles.textdeb2}>{item.dateandtime}</Text>
                </View>
              </View>
              <View style={styles.colorcontainer}>
                {item.status === 'Failure' ? (
                  <View style={styles.statuscontainer}>
                    <FoundationIcon name="info" color="#ff4a4a" size={10} />
                    <Text style={[styles.statustext, {color: '#ff4a4a'}]}>
                      {item.status}
                    </Text>
                  </View>
                ) : (
                  <View style={styles.statuscontainer}>
                    <OcticonsIcon
                      name="check-circle-fill"
                      color="#0aa06e"
                      size={10}
                    />
                    <Text style={[styles.statustext, {color: '#0aa06e'}]}>
                      {item.status}
                    </Text>
                  </View>
                )}
                {item.type === 'debit' ? (
                  <Text style={[styles.texthistory, {color: '#ff2022'}]}>
                    -₹{item.amount}
                  </Text>
                ) : (
                  <Text style={[styles.texthistory, {color: '#3DCF65'}]}>
                    +₹{item.amount}
                  </Text>
                )}
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const mapStateToProps = state => {
  return {userData: state.user.userData};
};

const mapDispatchToProps = dispatch => {
  return {
    onPpi: (data, successCallBack, failureCallBack) =>
      dispatch(userActions.onPpi(data, successCallBack, failureCallBack)),
    showErrorModal: (message, isFromError) =>
      dispatch(commonActions.showErrorModal(message, isFromError)),
    hideErrorModal: () => dispatch(commonActions.hideErrorModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Transactions);
