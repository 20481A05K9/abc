import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  ImageBackground,
  ScrollView,
  Alert,
  BackHandler,
  Platform,
} from 'react-native';
import {Color} from '../../../global';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Images} from '../../../assets';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect} from 'react-redux';
import * as commonActions from '../../redux/actions/commonActions';
import * as userActions from '../../redux/actions/userActions';
import CustomLoader from '../../Components/CustomLoader';
import Validation from '../../Components/Validation';
import RNExitApp from 'react-native-kill-app';
import CustomStatusBar from '../../Components/CustomStatusBar';
import Shimmer from 'react-native-shimmer';
import messaging from '@react-native-firebase/messaging';
import {getData, storeData} from '../../utils/helperFunctions';
import { styles } from '../../Styles/Dashboard/DashBoardstyles';

const RESDATA = [
  {
    id: 1,
    image: Images.cup,
    text: 'Continental',
  },
  {
    id: 2,
    image: Images.biryani,
    text: 'South Indian',
  },
  {
    id: 3,
    image: Images.chineese,
    text: 'Chinese',
  },
  {
    id: 4,
    image: Images.northIndian,
    text: 'North Indian',
  },
];

const cardsRenderData = [
  {
    id: 1,
    bgColor: '#FFE0E2',
    text1: 'Wanna plan a safe and\ncomfortable trip?',
    text2: 'Get alerts, suggestions, assistance and more',
    bgColor1: '#FE5964',
    moreText: 'More >',
    image: Images.safeTrip,
    Style: {width: wp('40%'), height: wp('23%'), marginTop: '-2.5%'},
    navigation: 'TripStart',
  },
  {
    id: 3,
    bgColor: Platform.OS == 'ios' ? '#e3d8ff' : '#F5F1FF',
    text1: 'Easy to apply and recharge\nyour FASTag',
    text2: 'Get your FASTag recharge and more updates',
    bgColor1: '#5AD894',
    moreText: 'More >',
    image: Images.TollGate,
    Style: {
      width: wp('35%'),
      height: wp('14%'),
      marginTop: '8%',
      marginLeft: '12%',
    },
    navigation: 'FasTag',
  },
];

const AddDetailsData = [
  {
    id: '1',
    name: 'Add your Vehicle',
    icon: 'car-side',
    bgColor: '#61459D',
    navigateScreen: 'Addvehicle',
    visible: 0,
  },
  {
    id: '2',
    name: 'Add Emergency contact',
    icon: 'phone-alt',
    bgColor: '#FF57A7',
    navigateScreen: 'AddContacts',
    visible: 0,
  },
];

const mainCardData = [
  {
    id: 1,
    backgroundImage: Images.background14,
    cardNumber: '',
    cardHolder: 'CARD HOLDER NAME',
    cardName: '',
  },
];

const serviceData = [
  {
    id: 1,
    image: Images.PlanTripNew,
    text: 'Plan a trip',
    navigatescreen: 'TripStart',
  },
  {
    id: 2,
    image: Images.CarCrashNew,
    text: 'Good Samaritan',
    navigatescreen: 'GoodSamaritan',
  },
];

const screenWidth = Dimensions.get('window').width;
const cardWidth = screenWidth / 2.37;

const DashBoard = props => {
  const flatListref = useRef(null);
  const identityFlatListRef = useRef(null);
  const navigation = useNavigation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeIndex1, setActiveIndex1] = useState(0);
  const [identityDot, setIdentityDot] = useState(0);
  let scrollIndex = 0;
  const flatListCardRef = useRef(null);
  const [currentIndex1, setCurrentIndex1] = useState(0);
  const [location, setLocation] = useState('');
  const [userData, setUserData] = useState({});
  const [mobileNo, setMobileNo] = useState('');
  const [loadingVisibility, setLoadingVisibility] = useState(false);
  const [validationVisible, setValidationVisible] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');
  const [showDetailsItem, setShowDetailsItem] = useState(true);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (props.userData) {
      onUserData(props.userData);
    } else {
      initData();
    }
  }, [isFocused]);

  useEffect(() => {
    const Interval = setInterval(() => {
      if (flatListref.current) {
        scrollIndex = (scrollIndex + 1) % cardsRenderData.length;
        flatListref.current.scrollToIndex({animated: true, index: scrollIndex});
      }
    }, 5000);
    return () => clearInterval(Interval);
  }, []);

  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        Alert.alert('Warning!', 'Are you sure you want to exit?', [
          {
            text: 'Yes',
            onPress: () => RNExitApp.exitApp(),
          },
          {
            text: 'No',
          },
        ]);

        return true;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove();
    }, []),
  );

  const initData = async () => {
    try {
      let data = await getData('userData');
      data = JSON.parse(data);
      if (!!data) {
        props.saveProfileData(data);
        onUserData(data);
      }
    } catch (error) {
    }
  };

  const onUserData = async res => {
    const {user, vehicles, eContact, familyMembers, userCredits} = res;
    setUserData(res);
    setMobileNo(user?.MOBILE_NUMBER);
    let cardNo = userCredits?.CARD_NUMBER.substring(0, 9) + ' **** ****';
    mainCardData[0].cardNumber = cardNo;
    let fullName =
      capitalizeFirstLetter(user?.FIRST_NAME) +
      ' ' +
      capitalizeFirstLetter(user?.LAST_NAME);
    mainCardData[0].cardName = fullName;
    setLocation(user?.ADDRESS + ', ' + user?.CITY);
    let vResult = vehicles.length > 0 ? '1' : '0';
    let cResult = eContact.length > 0 ? '1' : '0';
    if (vResult == '1') {
      AddDetailsData[0].visible = 1;
    } else {
      AddDetailsData[0].visible = 0;
    }
    if (cResult == '1') {
      AddDetailsData[1].visible = 1;
    } else {
      AddDetailsData[1].visible = 0;
    }
    if (vResult == '1' && cResult == '1') {
      setShowDetailsItem(true);
    } else {
      setShowDetailsItem(false);
    }
    let deviceFcmKey = user?.DEVICE_FCM_KEY;
    if (
      deviceFcmKey == null ||
      deviceFcmKey == undefined ||
      deviceFcmKey == ''
    ) {
      let fcmToken = await AsyncStorage.getItem('fcm_token');
      if (fcmToken == null || fcmToken == undefined || fcmToken == '') {
        generateFcmKey(user?.MOBILE_NUMBER);
      } else {
        updateFcmKey(fcmToken, user?.MOBILE_NUMBER);
      }
    }
  };

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const generateFcmKey = async contact => {
    try {
      await messaging().registerDeviceForRemoteMessages();
      const token = await messaging().getToken();
      if (token) {
        await AsyncStorage.setItem('fcm_token', token);
        updateFcmKey(token, contact);
      }
    } catch (error) {
    }
  };

  const updateFcmKey = (key, contact) => {
    const data = {
      MOBILE_NUMBER: contact,
      FCM_KEY: key,
      TYPE: 'UPDATE_FCM_KEY',
    };
    props.onRegisterUser(
      data,
      res => onUserUpdateSuccessCallBack(res, key),
      error => onUserUpdateFailureCallBack(error),
    );
  };

  const onUserUpdateSuccessCallBack = async (res, key) => {
    let data = await getData('userData');
    data = JSON.parse(data);
    data = {...data, user: {...data?.user, DEVICE_FCM_KEY: key}};
    storeData('userData', data)
      .then(value => {
        props.saveProfileData(data);
      })
      .catch(error => {
      });
  };

  const onUserUpdateFailureCallBack = error => {
    let msg = error;
    if (error == undefined || error == null) {
      msg = 'Something went wrong';
    }
    props.showErrorModal(msg, true);
  };

  const cardsRender = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(item.navigation);
        }}
        style={[styles.cardBg, {backgroundColor: item.bgColor}]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginRight: '6%',
            marginTop: '4%',
          }}>
          {renderDots()}
        </View>
        <Text style={styles.text1}>{item.text1}</Text>
        <View style={{flexDirection: 'row'}}>
          <View>
            <Text style={styles.text2}>{item.text2}</Text>
            <View
              style={[styles.moreBtn, {backgroundColor: item.bgColor1}]}
              onPress={() => {
                navigation.navigate(item.navigation);
              }}>
              <Shimmer
                animating={true}
                direction="right"
                duration={2000}
                pauseDuration={200}
                animationOpacity={0.2}
                opacity={1}
                tilt={45}
                intensity={1}
                style={styles.shineContainer}>
                <View style={styles.shine} />
              </Shimmer>

              <Text style={[styles.moretext]}>{item.moreText}</Text>
            </View>
          </View>
          <View>
            <Image source={item.image} style={item.Style} />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderDots = () => {
    return cardsRenderData.map((dot, index) => {
      if (activeIndex === index) {
        return (
          <View
            key={index}
            style={{
              backgroundColor: Color.colorBlack,
              width: 10,
              height: 5,
              borderRadius: 5,
              marginHorizontal: '0.5%',
            }}></View>
        );
      } else {
        return (
          <View
            key={index}
            style={{
              backgroundColor: '#D9D9D9',
              width: 10,
              height: 5,
              borderRadius: 5,
              marginHorizontal: '0.5%',
            }}></View>
        );
      }
    });
  };

  const handleScroll = event => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const Index = scrollPosition / (screenWidth * 0.9);
    setActiveIndex(Math.round(Index, 0));
  };

  const renderData = ({item}) => {
    return (
      item.visible != 1 && (
        <View>
          <TouchableOpacity
            style={styles.addFamilyBtn}
            activeOpacity={0.5}
            onPress={() => navigation.navigate(item.navigateScreen)}>
            <View style={[styles.icon, {backgroundColor: item.bgColor}]}>
              <FontAwesome5 name={item.icon} color={'#fff'} size={8} />
            </View>
            <Text style={styles.addFamilyTxt}>{item.name}</Text>
          </TouchableOpacity>
        </View>
      )
    );
  };

  const renderMainCard = ({item, index}) => (
    <View>
      <ImageBackground
        source={item.backgroundImage}
        resizeMode="contain"
        style={[styles.card, {marginEnd: wp('3%')}]}>
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.cardText2}>Card Number</Text>
          <Text style={styles.cardInnerText}>{item.cardNumber}</Text>
        </View>
        <View
          style={{
            borderBottomWidth: 0.5,
            borderBottomColor: '#FFF',
            marginTop: '6%',
          }}
        />
        <View style={{flexDirection: 'row'}}>
          <View>
            <View style={{flexDirection: 'column', marginTop: '-5%'}}>
              <Text style={styles.cardName1}>{item.cardHolder}</Text>
              <Shimmer
                animating={true}
                direction="right"
                duration={2000}
                pauseDuration={500}
                animationOpacity={1}
                opacity={0.5}
                tilt={45}
                intensity={0.8}
                style={styles.shimmer2}>
                <Text style={styles.cardNameText}>{item.cardName}</Text>
              </Shimmer>
            </View>
          </View>
          <View style={{flexDirection: 'column', marginTop: '5%'}}>
            <Text style={styles.ExpText}>Expires on</Text>
            <Text style={styles.datetext}>10/26</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );

  const renderService = ({item}) => {
    return (
      <View style={{marginVertical: '3%'}}>
        <TouchableOpacity
          style={styles.bgView}
          onPress={() => navigation.navigate(item.navigatescreen)}>
          <Image source={item.image} style={styles.serviceImage} />
          <Text style={styles.planTripText}>{item.text}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const scrollViewRef = useRef(null);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({y: 175, animated: true});
    }
  }, []);
  return (
    <View style={styles.container}>
      {isFocused && (
        <CustomStatusBar
          translucent
          backgroundColor="#efefef"
          barStyle="dark-content"
        />
      )}
      <CustomLoader visible={loadingVisibility} />
      <Validation
        visible={validationVisible}
        message={validationMessage}
        onRetry={() => {
          setValidationVisible(false);
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: '20%'}}
        ref={scrollViewRef}>
        <View style={styles.View1}>
          <View>
            <Text style={styles.locationText}>Home</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Location');
              }}
              activeOpacity={0.5}
              style={{flexDirection: 'row', marginTop: '2%'}}>
              <Ionicons name="location-sharp" color={'red'} size={20} />
              <Text style={styles.locationText1}>{location}</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('CheckoutCart', {userDetails: userData});
            }}
            activeOpacity={0.5}
            style={styles.cartBg}>
            <View style={{flexDirection: 'row'}}>
              <Feather name="shopping-cart" color={'#fff'} size={20} />
              <View style={{marginTop: '-50%'}}>
                <View style={styles.cartBg2}>
                  <Text style={styles.innertext}>1</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.innerView1}>
          <FlatList
            ref={flatListref}
            data={cardsRenderData}
            renderItem={cardsRender}
            keyExtractor={item => item.id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            pagingEnabled={true}
            onScroll={handleScroll}
            scrollEventThrottle={16}
          />
        </View>
        {!showDetailsItem && (
          <View style={styles.innerView2}>
            <FlatList
              data={AddDetailsData}
              renderItem={renderData}
              keyExtractor={item => item.id}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        )}
        <View style={{marginTop: '5%', marginLeft: '10%'}}>
          <FlatList
            data={mainCardData}
            renderItem={renderMainCard}
            keyExtractor={item => item.id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <Text style={styles.cardText}>Services</Text>
        <View style={styles.service}>
          <FlatList
            data={serviceData}
            renderItem={renderService}
            keyExtractor={item => item.id}
            scrollEnabled={false}
            numColumns={4}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View>
          <Text style={styles.driveText}>More than a drive, it’s a</Text>
          <Text style={styles.lifeStyleText}>Lifestyle</Text>
          <Image
            source={Images.dashboardImgNew}
            style={{
              width: '100%',
              height: wp('40%'),
              resizeMode: 'stretch',
              marginTop: '5%',
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    userData: state.user.userData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRegisterUser: (data, successCallBack, failureCallBack) =>
      dispatch(
        userActions.onRegisterUser(data, successCallBack, failureCallBack),
      ),
    saveProfileData: data => dispatch(userActions.saveProfileData(data)),
    showErrorModal: (message, isFromError) =>
      dispatch(commonActions.showErrorModal(message, isFromError)),
    hideErrorModal: () => dispatch(commonActions.hideErrorModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);
