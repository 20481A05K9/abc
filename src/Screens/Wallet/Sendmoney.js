import {
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {Color, FontSize} from '../../../global';
import {Images} from '../../../assets';
import {useNavigation} from '@react-navigation/native';
import {styles} from '../../Styles/Wallet/SendMoneystyles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CustomStatusBar from '../../Components/CustomStatusBar';
import {connect} from 'react-redux';
import * as commonActions from '../../redux/actions/commonActions';
import * as userActions from '../../redux/actions/userActions';
import {IMAGE_URL} from '../../services/config/index.url';

const Sendmoney = props => {
  const navigation = useNavigation();
  const [entityData, setEntityData] = useState([]);
  const [txnData, setTxnData] = useState([]);

  useEffect(() => {
    const {user} = props.userData;
    onEntityData(user?.MOBILE_NUMBER);
    getTxnData(user?.MOBILE_NUMBER);
  }, []);

  const onEntityData = mobile => {
    const data = {
      MOBILE_NUMBER: mobile,
      TYPE: 'ENTITY_LIST',
    };
    props.onPpi(
      data,
      res => onPpiEntityDataSuccessCallBack(res),
      error => onPpiEntityDataFailureCallBack(error),
    );
  };

  const onPpiEntityDataSuccessCallBack = async res => {
    setEntityData(res?.data);
  };

  const onPpiEntityDataFailureCallBack = error => {
    let msg = error;
    if (error == undefined || error == null) {
      msg = 'Something went wrong';
    }
    props.showErrorModal(msg, true);
  };

  const getTxnData = mobile => {
    const data = {
      MOBILE_NUMBER: mobile,
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

  return (
    <View style={styles.container}>
      <CustomStatusBar backgroundColor={'#efefef'} barStyle="dark-content" />
      <Text style={styles.texthead}>Send money</Text>
      <View style={styles.mobileconatiner}>
        <View style={styles.mobinp}>
          <AntDesignIcon name="search1" color={Color.colorBlack} size={18} />
          <TextInput
            style={styles.textinp}
            placeholder="Search Mobile Number"
            placeholderTextColor={Color.colorGray}
          />
        </View>
      </View>
      <View style={styles.contactcontainer}>
        <Text style={[styles.texthead, {fontSize: FontSize.size_15}]}>
          Recent
        </Text>
        <FlatList
          style={{width: wp('90%')}}
          data={entityData}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item?._id}
          horizontal={true}
          renderItem={({item}) => (
            <TouchableOpacity
              style={{alignItems: 'center', marginRight: wp('5.7%')}}
              onPress={() =>
                navigation.navigate('SendAddAmount', {
                  name: item?.name,
                  image: item?.image,
                  intityId: item?.ENTITY_ID,
                })
              }>
              <Image
                source={
                  item?.image ? {uri: IMAGE_URL + item?.image} : Images.avatar
                }
                style={styles.contactimage}
              />
              <Text style={styles.contacttext}>{item?.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <View style={styles.trancontainer}>
        <Text style={styles.texttransact}>Transcation History</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Transactions')}>
          <Text style={styles.texttransact1}>View all</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={txnData}
        ItemSeparatorComponent={<View style={styles.horizontalLine}></View>}
        keyExtractor={item => item.name}
        renderItem={({item}) => (
          <View style={styles.list}>
            <Image
              source={item.image}
              style={[styles.contactimage, {marginRight: '5%'}]}
            />
            <View style={{marginRight: '27%'}}>
              <Text style={styles.textdeb1}>{item.name}</Text>
              <Text style={styles.textdeb2}>{item.dateandtime}</Text>
            </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Sendmoney);
