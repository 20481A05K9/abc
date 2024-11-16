import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Modal,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Images} from '../../../assets';
import LinearGradient from 'react-native-linear-gradient';
import Share from 'react-native-share';
import {BarcodeTopSvg} from '../../Components/Svg/SpinWheelSvg/SpinIndexSvg';
import {styles} from '../../Styles/SpinWheelStyles/GetFreeSpinsStyles';
import {connect} from 'react-redux';
import * as commonActions from '../../redux/actions/commonActions';
import * as userActions from '../../redux/actions/userActions';
import CustomStatusBar from '../../Components/CustomStatusBar';
import {PLAYSTORE_URL} from '../../services/config/index.url';

const mobileRegex = /^[0-9]{10}$/;
const cardData = [
  {
    image: Images.FreeSpincard4,
    belowImg: Images.freespinsbelow3,
    title: 'Complete and Earn',
    iconnameCaret: 'chevron-right',
    description:
      'Fill Profile, Add a vehicle and Add emergency\ncontact and get 2 free spins for each.',
    buttonText: 'Update now',
    buttonNavigateTo: 'Profile',
    instruction1: 'Fill Profile, Add a vehicle and Add emergency contact',
    instruction2: 'Fill the relevant forms with personal details.',
    instruction3: 'Update your details',
    instruction4: 'Update details and important info.',
    instruction5: 'Claim spins',
    instruction6:
      'We can automatically update free spins\nafter completing each section seperately. ',
  },

  {
    image: Images.FreeSpincard3,
    belowImg: Images.freespinsbelow4,
    title: 'Refer and Earn',
    input: true,
    iconname: 'share',
    iconColor: '#197589',
    inputPlaceholder: 'Enter your mobile number here',
    buttonText: 'Share\t\t',
    buttonNavigateTo: 'onSharePress',
    instruction1: 'Click on the share button',
    instruction2: 'It will redirect to WhatsApp',
    instruction3: 'Share to your contacts',
    instruction4: 'You can share to maximum numbers.',
    instruction5: 'Verify Mobile number',
    instruction6:
      'Enter the mobile number of the contact\nto verify whether the number is eligible\nfor Free Spins. ',
  },
  {
    image: Images.FreeSpincard2,
    belowImg: Images.freespinsbelow2,
    title: 'EnviROAR',
    iconnameCaret: 'chevron-right',
    description:
      'Scan the bar code provided by Go Envi ROAR\nto get free spins.',
    buttonText: 'Scan now',
    buttonNavigateTo: 'BarcodeScanner',
    instruction1: 'Get our EnviROAR bags',
    instruction2: 'We accept EnviROAR bar codes',
    instruction3: 'Scan Bar Code to Claim',
    instruction4: 'Tap on scanner to start scanning.',
    instruction5: 'Collect Spins',
    instruction6: 'You will get 2 spins every day on each \nbar code.',
    name: styles.redCircle2,
  },
];

const GetFreeSpins = props => {
  const navigation = useNavigation();
  const [expandedCardIndex, setExpandedCardIndex] = useState(null);
  const [mobileNumber, setMobileNumber] = useState('');
  const [userName, setUserName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const flatListRef = useRef(null);
  const [verificationResult, setVerificationResult] = useState('');
  const [mobileNo, setMobileNo] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const {user} = props.userData;
      setMobileNo(user?.MOBILE_NUMBER);
      setUserName(user?.FIRST_NAME + ' ' + user?.LAST_NAME || 'User');
    } catch (error) {}
  };

  const onSharePress = async () => {
    let appLink = PLAYSTORE_URL;
    try {
      const shareOptions = {
        message: `${userName} recommends B-Alert. Recharge your FASTag with us and unlock exclusive deals on Travel Insurance and RSA. Enjoy affordable prices for a safe and secure road trip. Download now! 🚗🛡️📲 #BAlert #ReferNow\n\nDownload here: ${appLink}`,
      };
      await Share.open(shareOptions);
    } catch (error) {}
  };

  const handleExpand = index => {
    setExpandedCardIndex(index === expandedCardIndex ? null : index);

    setTimeout(() => {
      if (flatListRef.current) {
        flatListRef.current.scrollToEnd({animated: true});
      }
    }, 300);
  };

  const handleVerifyNow = () => {
    if (!mobileRegex.test(mobileNumber)) {
      setVerificationResult(
        'Invalid referral or Please enter a 10-digit number.',
      );
      setModalVisible(true);
      return;
    }
    const data = {
      MOBILE_NUMBER: mobileNo,
      PHONE_NUMBER: mobileNumber,
    };
    props.onSpinReferFriend(
      data,
      res => onSpinReferFriendSuccessCallBack(res),
      error => onSpinReferFriendFailureCallBack(error),
    );
  };

  const onSpinReferFriendSuccessCallBack = async res => {
    if (res?.message == 'Success') {
      setVerificationResult('Mobile number verified successfully');
      setModalVisible(true);
    } else {
      props.showErrorModal('Mobile number verification failed.', true);
    }
  };

  const onSpinReferFriendFailureCallBack = error => {
    let msg = error;
    if (error == undefined || error == null) {
      msg = 'Something went wrong';
    }
    props.showErrorModal(msg, true);
  };

  const renderCard = ({item, index}) => (
    <View style={{overflow: 'hidden'}}>
      <View style={styles.cardContainer}>
        <FastImage
          source={item.image}
          style={styles.cardImg}
          resizeMode={FastImage.resizeMode.stretch}>
          {item.title && (
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.goGreentext}>{item.title}</Text>
              <View style={item.name} />
            </View>
          )}
          {item.description && (
            <Text style={styles.descreptionText1}>{item.description}</Text>
          )}
          {item.input && (
            <View
              style={{
                marginLeft: '5%',
                marginTop: '-4%',
                flexDirection: 'row',
              }}>
              <TextInput
                style={styles.input}
                placeholder="Enter mobile number here"
                maxLength={10}
                value={mobileNumber}
                keyboardType="phone-pad"
                onChangeText={text => {
                  setMobileNumber(text);
                }}
                placeholderTextColor="rgba(0, 0, 0, 0.8)"
              />
              <TouchableOpacity activeOpacity={0.7} onPress={handleVerifyNow}>
                <LinearGradient
                  colors={['#F9A738', '#FFD808']}
                  style={styles.cancelButton}>
                  <Text style={styles.cancelButtonText}>Verify now</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}
          {item.buttonText && item.iconname && (
            <TouchableOpacity
              style={styles.scanBox}
              onPress={
                item.buttonNavigateTo === 'onSharePress'
                  ? onSharePress
                  : () => navigation.navigate(item.buttonNavigateTo)
              }>
              <Text style={styles.scanText}>
                {item.buttonText}
                <FontAwesome5
                  name={item.iconname}
                  color={item.iconColor || '#197589'}
                  size={15}
                />
              </Text>
            </TouchableOpacity>
          )}
          {item.iconnameCaret && (
            <TouchableOpacity
              style={styles.scanBox}
              onPress={() => navigation.navigate(item.buttonNavigateTo)}>
              <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                <Text style={styles.scanText}>{item.buttonText}</Text>
                <MaterialCommunityIcons
                  name={item.iconnameCaret}
                  color="#000"
                  size={20}
                  style={styles.icon}
                />
              </View>
            </TouchableOpacity>
          )}
        </FastImage>
        <TouchableOpacity
          style={styles.howToGetSpins}
          onPress={() => handleExpand(index)}>
          <Text style={styles.GetSpinsText}>{'How to get spins\t'} </Text>
          <FontAwesome5
            name={
              expandedCardIndex === index
                ? 'chevron-circle-up'
                : 'chevron-circle-down'
            }
            color="#FF3B3D"
            size={18}
          />
        </TouchableOpacity>
        {expandedCardIndex === index && (
          <View style={styles.instructionsContainer}>
            <Text style={styles.titleText}>How to get spins</Text>
            <View style={styles.digitContainer}>
              <Text style={styles.digitText}>1</Text>
            </View>
            <View style={styles.verticalLine}>
              <Text style={styles.subTitle1}>{item.instruction1}</Text>
              <Text style={styles.subTitle2}>{item.instruction2}</Text>
              <FastImage
                source={item.belowImg}
                style={styles.subImg}
                resizeMode={FastImage.resizeMode.stretch}
              />
            </View>
            <View style={styles.digitContainer}>
              <Text style={styles.digitText}>2</Text>
            </View>
            <View style={styles.verticalLine2}>
              <Text style={styles.subTitle1}>{item.instruction3}</Text>
              <Text style={styles.subTitle2}>{item.instruction4}</Text>
            </View>
            <View style={styles.digitContainer}>
              <Text style={styles.digitText}>3</Text>
            </View>
            <View style={{marginLeft: '8%', height: wp('15%')}}>
              <Text style={styles.subTitle1}>{item.instruction5}</Text>
              <Text style={styles.subTitle2}>{item.instruction6}</Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );

  const renderHeader = () => (
    <Text style={styles.freeText}>Get Free Spins</Text>
  );

  return (
    <View style={{flex: 1}}>
      {Platform.OS == 'android' && (
        <CustomStatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />
      )}
      <FastImage
        source={Images.BarcodeBack}
        style={styles.backgroundImage}
        resizeMode={FastImage.resizeMode.stretch}>
        <FlatList
          data={cardData}
          ref={flatListRef}
          showsVerticalScrollIndicator={false}
          renderItem={renderCard}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={renderHeader}
          contentContainerStyle={{paddingBottom: 20}}
        />
        <Modal visible={modalVisible} transparent={true} animationType="slide">
          <View style={styles.modalContainer}>
            <LinearGradient
              colors={['#E1C3FF', '#FFFFFF']}
              style={styles.modalContent}>
              <BarcodeTopSvg style={{marginTop: '-10%', marginLeft: '-5%'}} />

              <FastImage
                source={Images.mobilemid}
                style={styles.barcodeImg}
                resizeMode={FastImage.resizeMode.stretch}
              />
              <Text style={styles.descText}>{verificationResult}</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <LinearGradient
                  colors={['#C8F170', '#55D349']}
                  style={[styles.continueButton, {marginTop: '3%'}]}>
                  <Text style={styles.continueButtonText}>Continue</Text>
                </LinearGradient>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </Modal>
      </FastImage>
    </View>
  );
};

const mapStateToProps = state => {
  return {userData: state.user.userData};
};

const mapDispatchToProps = dispatch => {
  return {
    onSpinReferFriend: (data, successCallBack, failureCallBack) =>
      dispatch(
        userActions.onSpinReferFriend(data, successCallBack, failureCallBack),
      ),
    showErrorModal: (message, isFromError) =>
      dispatch(commonActions.showErrorModal(message, isFromError)),
    hideErrorModal: () => dispatch(commonActions.hideErrorModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GetFreeSpins);
