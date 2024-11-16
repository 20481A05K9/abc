import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
  Modal,
  ScrollView,
  Platform,
} from 'react-native';
import Svg, {G, Path, Circle, Text as SvgText} from 'react-native-svg';
import {Images} from '../../../assets';
import {
  SpinFortune,
  SpinCard,
  SpinCongrats,
  SpinDiscount,
  SpinButton,
  BadLuckSvg,
  BadLuckMidSvg,
} from '../../Components/Svg/SpinWheelSvg/SpinIndexSvg';
import {FontFamily} from '../../../global';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import BlinkLight from './BlinkLight';
import FastImage from 'react-native-fast-image';
import {styles} from '../../Styles/SpinWheelStyles/SpinWheelStyles';
import {connect} from 'react-redux';
import * as commonActions from '../../redux/actions/commonActions';
import * as userActions from '../../redux/actions/userActions';
import CustomStatusBar from '../../Components/CustomStatusBar';
import {SPIN_TERM_AND_CONDITION} from '../../utils/SpinTandC';

const segments = [
  {
    id: '1',
    label: 'Alexa',
    color: 'rgba(255, 255, 255, 0.2)',
  },
  {
    id: '2',
    label: '+2 Spins',
    color: 'rgba(148, 67, 251, 0.25)',
  },
  {
    id: '3',
    label: 'Try again!',
    color: 'rgba(255, 255, 255, 0.2)',
  },
  {
    id: '4',
    label: '-1 Spin',
    color: 'rgba(148, 67, 251, 0.25)',
  },
  {
    id: '5',
    label: '+1 Spin',
    color: 'rgba(255, 255, 255, 0.2)',
  },
  {
    id: '6',
    label: 'AirPods',
    color: 'rgba(148, 67, 251, 0.25)',
  },
  {
    id: '7',
    label: 'Try again!',
    color: 'rgba(255, 255, 255, 0.2)',
  },
  {
    id: '8',
    label: '-2 Spins',
    color: 'rgba(148, 67, 251, 0.25)',
  },
];

const SpinWheel = props => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [winningPrize, setWinningPrize] = useState(null);
  const [spinListData, setSpinListData] = useState([]);
  const [spinsLeft, setSpinsLeft] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const spinValue = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [mobileNo, setMobileNo] = useState(null);
  const [showTandCModal, setShowTandCModal] = useState(false);

  useEffect(() => {
    getData();
  }, [isFocused]);

  const getData = async () => {
    try {
      const {user} = props.userData;
      setMobileNo(user?.MOBILE_NUMBER);
      getSpinList(user?.MOBILE_NUMBER);
    } catch (error) {
    }
  };

  const getSpinList = async contact => {
    const data = {
      MOBILE_NUMBER: mobileNo == null ? contact : mobileNo,
      TYPE: 'l',
    };
    props.onSpin(
      data,
      res => onSpinSuccessCallBack(res),
      error => onSpinFailureCallBack(error),
    );
  };

  const onSpinSuccessCallBack = async res => {
    setSpinListData(res?.data);
    setSpinsLeft(res?.data?.length);
  };

  const onSpinFailureCallBack = error => {
    let msg = error;
    if (error == undefined || error == null) {
      msg = 'Something went wrong';
    }
    props.showErrorModal(msg, true);
  };

  const updateSpinData = prizeDetails => {
    if (spinListData.length != 0) {
      var data = {
        MOBILE_NUMBER: mobileNo,
        ID: spinListData[0]?._id,
        TYPE: 'u',
        REQUEST_TYPE: prizeDetails?.type,
      };
      if (prizeDetails?.type == 'GIFTS') {
        data = {
          ...data,
          SPIN_SCORE: prizeDetails?.count,
        };
      } else {
        data = {
          ...data,
          SPIN_COUNT: prizeDetails?.count,
        };
      }
      props.onSpin(
        data,
        res => onSpinUpdateSuccessCallBack(res),
        error => onSpinUpdateFailureCallBack(error),
      );
    }
  };

  const onSpinUpdateSuccessCallBack = async res => {
    setModalVisible(true);
    getSpinList();
  };

  const onSpinUpdateFailureCallBack = error => {
    let msg = error;
    if (error == undefined || error == null) {
      msg = 'Something went wrong';
    }
    props.showErrorModal(msg, true);
  };

  const spinWheel = () => {
    if (isSpinning || spinsLeft <= 0) return;

    setIsSpinning(true);
    setWinningPrize(null);

    const minSpin = 360 * 4;
    const spinTo = Math.random() * 1000 + minSpin;
    const finalRotation = (spinTo % 360) + 90;
    const winningIndex =
      Math.floor((360 - finalRotation) / 45) % segments.length;

    if (winningIndex < 0 || winningIndex >= segments.length) {
      setIsSpinning(false);
      spinWheel();
      return;
    }

    spinValue.setValue(0);

    Animated.timing(spinValue, {
      toValue: spinTo,
      duration: 3000,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      setIsSpinning(false);
      const prize = segments[winningIndex]?.label;
      const prizeId = segments[winningIndex]?.id;
      if (prizeId) {
        setWinningPrize(prizeId);
        var prizeDetails = getPrizeDetails(prizeId);
        updateSpinData(prizeDetails);
      } else {
        props.showErrorModal('Something went wrong. Please try agian.', true);
      }
    });
  };

  const getPrizeDetails = prizeId => {
    if (prizeId == '1') {
      return {count: 100, type: 'GIFTS'};
    } else if (prizeId == '2') {
      return {count: 2, type: 'ADD'};
    } else if (prizeId == '3' || prizeId == '7') {
      return {count: 0, type: ''};
    } else if (prizeId == '4') {
      return {count: 1, type: 'REMOVE'};
    } else if (prizeId == '5') {
      return {count: 1, type: 'ADD'};
    } else if (prizeId == '6') {
      return {count: 75, type: 'GIFTS'};
    } else if (prizeId == '8') {
      return {count: 2, type: 'REMOVE'};
    }
  };

  const spin = spinValue.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  const renderSegments = () => {
    const angle = 360 / segments.length;
    return segments.map((segment, index) => {
      const startAngle = index * angle;
      const endAngle = startAngle + angle;
      const midAngle = startAngle + angle / 2;
      const largeArcFlag = angle > 180 ? 1 : 0;

      const path = `
        M ${100 + 100 * Math.cos((Math.PI * startAngle) / 180)} ${
        100 + 100 * Math.sin((Math.PI * startAngle) / 180)
      }
        A 100 100 0 ${largeArcFlag} 1 ${
        100 + 100 * Math.cos((Math.PI * endAngle) / 180)
      } ${100 + 100 * Math.sin((Math.PI * endAngle) / 180)}
        L 100 100
      `;

      const textX = 100 + 60 * Math.cos((Math.PI * midAngle) / 180);
      const textY = 100 + 60 * Math.sin((Math.PI * midAngle) / 180);
      const rotateText = `rotate(${midAngle}, ${textX}, ${textY})`;

      const lines = segment.label.split('\n');

      return (
        <G key={index}>
          <Path d={path} fill={segment.color} />
          {lines.map((line, i) => (
            <SvgText
              key={i}
              x={textX}
              y={textY + i * 10}
              fill="white"
              fontSize="10"
              textAnchor="middle"
              alignmentBaseline="middle"
              transform={rotateText}
              fontFamily={FontFamily.montserratBold}>
              {line}
            </SvgText>
          ))}
        </G>
      );
    });
  };

  const renderModalContent = () => {
    switch (winningPrize) {
      case '1':
        return (
          <>
            <SpinCongrats style={{marginTop: '-8%', marginLeft: '-19%'}} />
            <FastImage
              source={Images.alexa}
              style={styles.alexaImg}
              resizeMode={FastImage.resizeMode.stretch}
            />
            <Text style={styles.descText}>You are eligible for Alexa</Text>
          </>
        );
      case '6':
        return (
          <>
            <SpinCongrats style={{marginTop: '-8%', marginLeft: '-19%'}} />
            <FastImage
              source={Images.airpods}
              style={styles.airpodsImg}
              resizeMode={FastImage.resizeMode.stretch}
            />
            <Text style={styles.descText}>You are eligible for AirPods</Text>
          </>
        );
      case '3':
      case '7':
        return (
          <>
            <BadLuckSvg style={{marginTop: '-8%', marginLeft: '-19%'}} />
            <BadLuckMidSvg style={{marginTop: '5%'}}>
              <Text style={styles.discountText}>{'Try\nAgain'}</Text>
            </BadLuckMidSvg>
          </>
        );
      case '4':
        return (
          <>
            <BadLuckSvg style={{marginTop: '-8%', marginLeft: '-19%'}} />
            <BadLuckMidSvg>
              <Text style={styles.discountText}>{'-1\nSpin'}</Text>
            </BadLuckMidSvg>
          </>
        );
      case '8':
        return (
          <>
            <BadLuckSvg style={{marginTop: '-8%', marginLeft: '-19%'}} />
            <BadLuckMidSvg style={{marginTop: '5%'}}>
              <Text style={styles.discountText}>{'-2\nSpins'}</Text>
            </BadLuckMidSvg>
          </>
        );
      case '5':
        return (
          <>
            <SpinCongrats style={{marginTop: '-8%', marginLeft: '-19%'}} />
            <SpinDiscount>
              <Text style={styles.discountText2}>1 Spin</Text>
            </SpinDiscount>
          </>
        );
      case '2':
        return (
          <>
            <SpinCongrats style={{marginTop: '-8%', marginLeft: '-19%'}} />
            <SpinDiscount>
              <Text style={styles.discountText2}>2 Spins</Text>
            </SpinDiscount>
          </>
        );
      default:
        return (
          <>
            <BadLuckSvg style={{marginTop: '-8%', marginLeft: '-19%'}} />

            <Text style={styles.noPrizeText}>No prize won</Text>
          </>
        );
    }
  };

  const getButtonText = () => {
    if (winningPrize === '5' || winningPrize === '2') {
      return 'Claim Now';
    } else if (winningPrize === '1' || winningPrize === '6') {
      return 'Continue';
    } else if (
      winningPrize === '3' ||
      winningPrize === '4' ||
      winningPrize === '7' ||
      winningPrize === '8'
    ) {
      return 'Try again';
    }
  };

  const handleButtonPress = () => {
    if (getButtonText() === 'Continue') {
      setModalVisible(false);
      navigation.navigate('SpinCompetetionDetails');
    } else {
      setModalVisible(false);
    }
  };

  const renderContestRuleModal = () => {
    return (
      <Modal
        animationType={'slide'}
        transparent={true}
        visible={showTandCModal}
        onRequestClose={() => setShowTandCModal(false)}>
        <View style={styles.modalContainer2}>
          <View style={styles.modalContent2}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.tcModalText}>{SPIN_TERM_AND_CONDITION}</Text>
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={{flex: 1}}>
      {isFocused && Platform.OS == 'android' && (
        <CustomStatusBar
          translucent
          backgroundColor="transparent"
          barStyle="light-content"
        />
      )}
      {renderContestRuleModal()}
      <FastImage
        source={Images.spinbackg}
        style={styles.backgroundImage}
        resizeMode={FastImage.resizeMode.stretch}>
        <ScrollView contentContainerStyle={{paddingBottom: '23%'}}>
          <View style={styles.container}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: '5%',
              }}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.spinsLeftContainer2}
                onPress={() => navigation.navigate('BarcodeScanner')}>
                <MaterialCommunityIcons
                  name="line-scan"
                  color="#F7B214"
                  size={30}
                  style={styles.iconScan}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('GetFreeSpins')}>
                <View style={{}}>
                  <View style={styles.spinsLeftContainer}>
                    <Text style={styles.spinsLeftText}>{spinsLeft}</Text>
                    <Text style={styles.spinsLeftText2}>Add spins</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{alignItems: 'center'}}>
              <SpinFortune />
            </View>
            <View style={{alignItems: 'center', marginTop: '5%'}}>
              <FastImage
                source={Images.spinGoldBack}
                style={styles.goldBack}
                resizeMode={FastImage.resizeMode.stretch}>
                <View>
                  <View style={{marginLeft: '42.5%', marginTop: '0.2%'}}>
                    <BlinkLight />
                  </View>
                  <View style={{marginLeft: '12.8%', marginTop: '-3%'}}>
                    <BlinkLight />
                  </View>
                  <View style={{marginLeft: '-0.5%', marginTop: '14.5%'}}>
                    <BlinkLight />
                  </View>
                  <View style={{marginLeft: '13.3%', marginTop: '16%'}}>
                    <BlinkLight />
                  </View>
                  <View style={{marginLeft: '72.5%', marginTop: '-75.5%'}}>
                    <BlinkLight />
                  </View>
                  <View style={{marginLeft: '85%', marginTop: '14%'}}>
                    <BlinkLight />
                  </View>
                  <View style={{marginLeft: '72%', marginTop: '16%'}}>
                    <BlinkLight />
                  </View>
                  <View style={{marginLeft: '42%', marginTop: '-3.4%'}}>
                    <BlinkLight />
                  </View>
                </View>
              </FastImage>
            </View>

            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1,
                marginTop: '-71%',
              }}>
              <Animated.View style={{transform: [{rotate: spin}]}}>
                <Svg width={wp('62%')} height={wp('62%')} viewBox="0 0 200 200">
                  <Circle cx="100" cy="100" r="100" fill="transparent" />

                  {renderSegments()}
                </Svg>
              </Animated.View>
              <View style={{zIndex: 1, alignItems: 'center'}}>
                <FastImage
                  source={Images.spinmid}
                  style={{
                    width: wp('21%'),
                    height: wp('24%'),
                    marginTop: '-43%',
                    alignSelf: 'center',
                  }}
                  resizeMode={FastImage.resizeMode.stretch}
                />
              </View>
            </View>
            <View style={{alignItems: 'center', marginBottom: '5%'}}>
              <TouchableOpacity
                onPress={spinWheel}
                disabled={isSpinning || spinsLeft <= 0}
                style={styles.button}
                activeOpacity={0.7}>
                <SpinButton />
              </TouchableOpacity>
              <View style={{marginTop: '8%'}}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('SpinCompetetionDetails')}
                  activeOpacity={0.7}>
                  <SpinCard>
                    <Text style={styles.competitionText}>Event Details</Text>
                  </SpinCard>

                  <View style={styles.knowMore}>
                    <Text style={styles.knowText}>Know more</Text>

                    <Ionicons
                      name="arrow-forward-circle"
                      color="#FFFFFF"
                      size={29}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            {Platform.OS == 'ios' && (
              <View style={styles.tcView}>
                <Text style={styles.tcText}>{'Contest rules '}</Text>
                <TouchableOpacity onPress={() => setShowTandCModal(true)}>
                  <Text style={styles.tcTextLink}>T&C</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          <Modal
            transparent={true}
            visible={modalVisible}
            animationType="slide"
            onRequestClose={() => setModalVisible(false)}>
            <View style={styles.modalContainer}>
              <LinearGradient
                colors={['#E1C3FF', '#FFFFFF']}
                style={styles.modalContent}>
                {renderModalContent()}
                <TouchableOpacity
                  onPress={handleButtonPress}
                  style={styles.continueButton}>
                  <LinearGradient
                    colors={['#C8F170', '#55D349']}
                    style={styles.continueButtonGradient}>
                    <Text style={styles.continueButtonText}>
                      {getButtonText()}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </Modal>
        </ScrollView>
      </FastImage>
    </View>
  );
};

const mapStateToProps = state => {
  return {userData: state.user.userData};
};

const mapDispatchToProps = dispatch => {
  return {
    onSpin: (data, successCallBack, failureCallBack) =>
      dispatch(userActions.onSpin(data, successCallBack, failureCallBack)),
    showErrorModal: (message, isFromError) =>
      dispatch(commonActions.showErrorModal(message, isFromError)),
    hideErrorModal: () => dispatch(commonActions.hideErrorModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SpinWheel);
