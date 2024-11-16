import {
  Image,
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Images} from '../../../assets';
import LinearGradient from 'react-native-linear-gradient';
import {styles} from '../../Styles/Wallet/Addbalancestyles';
import {useNavigation} from '@react-navigation/native';
import CustomStatusBar from '../../Components/CustomStatusBar';
import {connect} from 'react-redux';
import * as commonActions from '../../redux/actions/commonActions';
import * as userActions from '../../redux/actions/userActions';
import PhonePePaymentSDK from 'react-native-phonepe-pg';
import CustomLoader from '../../Components/CustomLoader';

const Seperator = () => {
  return <View style={{width: wp('3.33%')}}></View>;
};

const Addbalance = props => {
  const navigation = useNavigation();
  const [addbalance, setaddbalance] = useState('');
  const [error, setError] = useState('');
  const [mobileNo, setMobileNo] = useState(null);
  const [walletBal, setWalletBal] = useState({});
  const [loadingVisibility, setLoadingVisibility] = useState(false);
  const [userName, setUserName] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    getWalletBalance();
  }, []);

  const getWalletBalance = () => {
    const {user, userImage} = props.userData;
    setMobileNo(user?.MOBILE_NUMBER);
    setUserName(user?.FIRST_NAME + ' ' + user?.LAST_NAME);
    setSelectedImage(userImage?.IMAGE);
    const data = {
      MOBILE_NUMBER: user?.MOBILE_NUMBER,
      TYPE: 'WALLET_BALANCE',
    };
    props.onPpi(
      data,
      res => onPpiWalletBalFetchSuccessCallBack(res),
      error => onPpiWalletBalFetchFailureCallBack(error),
    );
  };

  const onPpiWalletBalFetchSuccessCallBack = async res => {
    if (res?.message == 'Success') {
      setWalletBal(res?.data);
    }
  };

  const onPpiWalletBalFetchFailureCallBack = error => {
    let msg = error;
    if (error == undefined || error == null) {
      msg = 'Something went wrong';
    }
    props.showErrorModal(msg, true);
  };

  const handleContinue = () => {
    const numericAmount = parseFloat(addbalance);

    if (isNaN(numericAmount) || numericAmount < 10) {
      setError('Minimum amount ₹10.');
      return;
    }

    setError('');

    const data = {
      MOBILE_NUMBER: mobileNo,
      TRIP_ID: walletBal?._id,
      TOTAL_AMOUNT: numericAmount,
      COUPON_CODE: '',
      TYPE: 'PPI_WALLET',
    };
    props.onCartBalUpdate(
      data,
      res => onCartBalUpdateSuccessCallBack(res),
      error => onCartBalUpdateFailureCallBack(error),
    );
  };

  const onCartBalUpdateSuccessCallBack = async res => {
    if (res?.message === 'success') {
      let cartId = res?.CART_ID;
      let sKey = res?.data?.skey;
      let mId = res?.data?.mId;
      let base64 = res?.data?.base64;
      let sha256 = res?.data?.sha256;

      initPhonePeSDK(cartId, sKey, mId, base64, sha256);
    } else {
      showError('Something went wrong');
    }
  };

  const onCartBalUpdateFailureCallBack = error => {
    let msg = error;
    if (error == undefined || error == null) {
      msg = 'Something went wrong';
    }
    props.showErrorModal(msg, true);
  };

  const initPhonePeSDK = (cartId, sKey, mId, base64, sha256) => {
    PhonePePaymentSDK.init(sKey, mId, '', true)
      .then(result => {
        makePayment(cartId, base64, sha256);
      })
      .catch(error => {
      });
  };

  const makePayment = (cartId, requestBody, checksum) => {
    PhonePePaymentSDK.startTransaction(requestBody, checksum, '', '')
      .then(a => {
        if (a?.status == 'SUCCESS') {
          setLoadingVisibility(true);
          const numericAmount = parseFloat(addbalance);
          const data = {
            MOBILE_NUMBER: mobileNo,
            TYPE: 'LOAD_WALLET',
            AMOUNT: numericAmount,
          };
          props.onPpi(
            data,
            res => onPpiWalletBalAddSuccessCallBack(res),
            error => onPpiWalletBalAddFailureCallBack(error),
          );
        }
      })
      .catch(error => {
        Alert.alert('Error', error.message);
      });
  };

  const onPpiWalletBalAddSuccessCallBack = async res => {
    setLoadingVisibility(false);
    if (res?.message == 'Success') {
      navigation.replace('SuccessFail', {
        name: 'PPIWALLETSUCCESS',
        status: 1,
      });
    } else {
      props.showErrorModal('Something went wrong', true);
    }
  };

  const onPpiWalletBalAddFailureCallBack = error => {
    let msg = error;
    if (error == undefined || error == null) {
      msg = 'Something went wrong';
    }
    setLoadingVisibility(false);
    props.showErrorModal(msg, true);
  };

  const rupees = [
    {value: '1000', amount: 1000},
    {value: '2000', amount: 2000},
    {value: '5000', amount: 5000},
    {value: '10000', amount: 10000},
  ];

  const handleAmountChange = value => {
    const numericValue = value.replace(/[^0-9]/g, '');
    setaddbalance(numericValue);
  };

  return (
    <ScrollView style={styles.container}>
      <CustomStatusBar backgroundColor={'#efefef'} barStyle="dark-content" />
      <CustomLoader visible={loadingVisibility} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={styles.text}>Add balance</Text>
        <TouchableOpacity
          style={{justifyContent: 'space-evenly'}}
          onPress={() => navigation.navigate('FetchPreferences')}>
          <View style={styles.prefcontainer}>
            <Image source={Images.preferenceicon} style={styles.preficon} />
          </View>
          <Text style={styles.preftext}>Preferences</Text>
        </TouchableOpacity>
      </View>

      <ImageBackground source={Images.walletcard} style={styles.imageback}>
        <View
          style={{
            padding: wp('10%'),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              columnGap: wp('2%'),
            }}>
            <Image
              source={
                selectedImage == null
                  ? Images.avatar
                  : {uri: `data:image/jpeg;base64,${selectedImage}`}
              }
              style={{height: wp('7%'), width: wp('7%'), borderRadius: 100}}
            />
            <Text
              numberOfLines={4}
              ellipsizeMode="tail"
              style={[styles.cardname, {width: wp('50%')}]}>
              {userName}
            </Text>
          </View>
        </View>
        <View
          style={{
            padding: wp('10%'),
            paddingTop: wp('0%'),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View>
            <Text style={styles.baltext}>Available balance</Text>
            <Text style={styles.balamount}>{`₹${
              walletBal?.BALANCE_AMOUNT ? walletBal?.BALANCE_AMOUNT : 0
            }`}</Text>
          </View>
          <Image
            source={Images.logofig}
            style={{height: hp('2%'), width: wp('12%')}}
          />
        </View>
      </ImageBackground>

      <View style={styles.input}>
        <Text style={styles.inphead}> Enter amount</Text>
        <View
          style={{flexDirection: 'row', margin: '2%', alignItems: 'center'}}>
          <Text style={styles.rupeetext}>₹</Text>
          <TextInput
            maxLength={10}
            keyboardType="number-pad"
            style={styles.textinp}
            value={addbalance}
            onChangeText={handleAmountChange}
          />
        </View>
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <FlatList
        contentContainerStyle={styles.flatlistContainer}
        ItemSeparatorComponent={Seperator}
        data={rupees}
        horizontal={true}
        keyExtractor={item => item.value}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.rupeebutton}
            onPress={() => setaddbalance(item.amount.toString())}>
            <Text style={styles.listtext}>₹{item.value}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity onPress={handleContinue}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#F9A738', '#FEE62A']}
          style={styles.linearGradient}>
          <Text style={styles.buttontxt}>Continue</Text>
        </LinearGradient>
      </TouchableOpacity>
    </ScrollView>
  );
};

const mapStateToProps = state => {
  return {userData: state.user.userData};
};

const mapDispatchToProps = dispatch => {
  return {
    onPpi: (data, successCallBack, failureCallBack) =>
      dispatch(userActions.onPpi(data, successCallBack, failureCallBack)),
    onCartBalUpdate: (data, successCallBack, failureCallBack) =>
      dispatch(
        userActions.onCartBalUpdate(data, successCallBack, failureCallBack),
      ),
    showErrorModal: (message, isFromError) =>
      dispatch(commonActions.showErrorModal(message, isFromError)),
    hideErrorModal: () => dispatch(commonActions.hideErrorModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Addbalance);
