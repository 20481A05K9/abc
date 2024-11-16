import {
  Alert,
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Color} from '../../../global';
import {Images} from '../../../assets';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import {styles} from '../../Styles/Wallet/PPCartStyles';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import * as commonActions from '../../redux/actions/commonActions';
import * as userActions from '../../redux/actions/userActions';
import PhonePePaymentSDK from 'react-native-phonepe-pg';
import CustomStatusBar from '../../Components/CustomStatusBar';
import CustomLoader from '../../Components/CustomLoader';

const PPCart = props => {
  const navigation = useNavigation();
  const data = [
    {
      image: Images.ppcartcard,
      sty: {
        height: 30,
        width: 50,
      },
      texthead: 'Order a card',
      textsub: 'Order our physical card and\nexperience endless discounts.',
    },
  ];
  const [mobileNo, setMobileNo] = useState(null);
  const [cardAmount, setCardAmount] = useState(50);
  const [platformCharge, setPlatformCharge] = useState(10);
  const [coupon, setCoupon] = useState('');
  const [loadingVisibility, setLoadingVisibility] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    const {user} = props.userData;
    setMobileNo(user?.MOBILE_NUMBER);
  };

  const proceedPayment = () => {
    const data = {
      MOBILE_NUMBER: mobileNo,
      TRIP_ID: '1',
      TOTAL_AMOUNT: Number(cardAmount) + Number(platformCharge),
      COUPON_CODE: coupon,
      TYPE: 'PPI_PHYSICALCARD',
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
          const data = {
            MOBILE_NUMBER: mobileNo,
            TYPE: 'PHYSICAL_CARD',
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
        name: 'PPIPHYCARDSUCCESS',
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

  const Card = ({cimage, cstyle, ctexthead, ctextsub}) => {
    return (
      <View style={styles.cartcard}>
        <View style={styles.cardtop}>
          <View style={styles.imagecard}>
            <Image source={cimage} style={cstyle} />
          </View>
          <View style={styles.textarea}>
            <Text style={styles.text}>{ctexthead}</Text>
            <Text style={styles.text1}>{ctextsub}</Text>
          </View>
          <View style={styles.iconarea}>
            <TouchableOpacity>
              <EntypoIcon name="cross" color="#8e8e8e" size={30} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bottomarea}>
          <Text style={styles.bottomtext}>{`₹${cardAmount}`}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomStatusBar backgroundColor={'#efefef'} barStyle="dark-content" />
      <CustomLoader visible={loadingVisibility} />
      <View style={styles.topconatiner}>
        <Text style={styles.textmain}>My Cart</Text>
        <View style={styles.imagecontainer}>
          <Image source={Images.ppcart} style={styles.cartimage} />
        </View>
      </View>
      <View style={styles.horizontalLine} />
      <FlatList
        data={data}
        showsVerticalScrollIndicator={true}
        keyExtractor={item => item.texthead}
        renderItem={({item}) => (
          <Card
            cimage={item.image}
            cstyle={item.sty}
            ctexthead={item.texthead}
            ctextsub={item.textsub}
          />
        )}
      />
      <View style={styles.couponcontainer}>
        <Image source={Images.ppcoupon} style={styles.imagecoupon} />
        <Text style={styles.apply}>Apply Coupons</Text>
        <View style={styles.verticalLine} />
        <TextInput
          placeholder="Enter coupon number here..."
          placeholderTextColor={Color.colorGray}
          style={styles.inp}
          keyboardType="name-phone-pad"
          onChangeText={setCoupon}
        />
      </View>
      <View style={styles.bottomrupee}>
        <View style={styles.rupeeval}>
          <Text style={[styles.rupeetext, {color: Color.colorBlack}]}>
            Platform charges
          </Text>
          <Text
            style={[
              styles.rupeetext,
              {color: '#ff3b3d'},
            ]}>{`Rs ${platformCharge}`}</Text>
        </View>
        <View style={styles.rupeeval}>
          <Text style={[styles.rupeetext, {color: Color.colorBlack}]}>
            SelectedItem(1)
          </Text>
          <Text style={[styles.rupeetext, {color: Color.colorGray}]}>
            {`Total: ₹${Number(cardAmount) + Number(platformCharge)}`}
          </Text>
        </View>
      </View>

      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#F9A738', '#FEE62A']}
        style={styles.linearGradient}>
        <TouchableOpacity onPress={() => proceedPayment()}>
          <Text style={styles.buttontxt}>Proceed payment</Text>
        </TouchableOpacity>
      </LinearGradient>
    </SafeAreaView>
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

export default connect(mapStateToProps, mapDispatchToProps)(PPCart);
