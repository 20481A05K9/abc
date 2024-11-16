import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Modal,
  FlatList,
  Dimensions,
  BackHandler,
  ScrollView,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {Images} from '../../../assets';
import {Color, FontFamily, FontSize} from '../../../global';
import {styles} from '../../Styles/Wallet/WalletHomeStyles';
import LinearGradient from 'react-native-linear-gradient';
import CustomStatusBar from '../../Components/CustomStatusBar';
import {connect} from 'react-redux';
import * as commonActions from '../../redux/actions/commonActions';
import * as userActions from '../../redux/actions/userActions';
import {showSuccess} from '../../utils/helperFunctions';

const {width} = Dimensions.get('window');
const managedata = [
  {
    id: 1,
    type: 'fontawesome6',
    icon: 'lock',
    color: '#308FFF',
    text: 'Lock your card',
    back: Images.yellowback,
    image: Images.lock,
    head: 'Wanna lock your card ?',
  },
  {
    id: 2,
    type: 'fontawesome6',
    icon: 'unlock',
    color: '#308FFF',
    text: 'Unlock your card',
    back: Images.purpleback,
    image: Images.unlock,
    head: 'Wanna unlock your card ?',
  },
  {
    id: 3,
    type: 'fontawesome6',
    icon: 'shield-halved',
    color: '#2FA170',
    text: 'Update PIN',
    back: Images.paleblueback,
    image: Images.setpin,
    head: 'Wanna set your card PIN?',
  },
  {
    id: 4,
    type: 'image',
    icon: Images.cardreplaceicon,
    color: null,
    text: 'Card Replacement',
    back: Images.blueback,
    image: Images.block,
    head: 'Block your card to start replacement process',
  },
];

const slides = [
  {
    id: 1,
    title: 'Set card preferences',
    desc: 'Add preferences to your card Maximum limit, transaction limit, transaction count etc.',
    back: Images.setprefslide,
    navi: 'SetPreferencesHome',
  },
  {
    id: 2,
    title: 'Add on Card',
    desc: 'Add another card to your existing wallet, limit the transaction and count as usual.',
    back: Images.addcardslide,
    navi: 'AddOnCard',
  },
];

const WalletHome = props => {
  const {register} = props.route.params || {};
  const [modalVisible, setModalVisible] = useState(false);
  const [viewcardmodalVisible, setviewcardModalVisible] = useState(false);
  const [carddetailsVisible, setcarddetailsVisible] = useState(false);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [mobileNo, setMobileNo] = useState(null);
  const [cardDetails, setCardDetails] = useState({});
  const [cardList, setCardList] = useState([]);
  const [userName, setUserName] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const {user} = props.userData;
    setMobileNo(user?.MOBILE_NUMBER);
    getWalletData(user?.MOBILE_NUMBER);
  }, []);

  useEffect(() => {
    const {user, userImage} = props.userData;
    setUserName(user?.FIRST_NAME + ' ' + user?.LAST_NAME);
    setSelectedImage(userImage?.IMAGE);
  }, [isFocused]);

  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        if (register) {
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

  const getWalletData = mobile => {
    const data = {
      MOBILE_NUMBER: mobile,
      TYPE: 'l',
    };
    props.onPpi(
      data,
      res => onPpiDetailsSuccessCallBack(res, mobile),
      error => onPpiDetailsFailureCallBack(error),
    );
  };

  const onPpiDetailsSuccessCallBack = async (res, mobile) => {
    setCardDetails(res?.data);
    getCardList(mobile, res?.data?.KIT_NUMBER);
  };

  const onPpiDetailsFailureCallBack = error => {
    let msg = error;
    if (error == undefined || error == null) {
      msg = 'Something went wrong';
    }
    props.showErrorModal(msg, true);
  };

  const getCardList = (mobile, kitNo) => {
    const data = {
      MOBILE_NUMBER: mobile,
      KIT_NUMBER: kitNo,
      TYPE: 'CARD_DETAILS',
    };
    props.onPpi(
      data,
      res => onPpiCardListSuccessCallBack(res),
      error => onPpiCardListFailureCallBack(error),
    );
  };

  const onPpiCardListSuccessCallBack = async res => {
    setCardList(res?.data);
  };

  const onPpiCardListFailureCallBack = error => {
    let msg = error;
    if (error == undefined || error == null) {
      msg = 'Something went wrong';
    }
    props.showErrorModal(msg, true);
  };

  const handleCardSelect = card => {
    setSelectedCard(card);
    setcarddetailsVisible(true);
  };

  const handleManageCardAction = action => {
    setSelectedAction(action);
    setModalVisible(true);
  };

  const renderSlide = ({item}) => (
    <ImageBackground source={item.back} style={styles.slide}>
      <Text style={styles.slideTitle}>{item.title}</Text>
      <Text style={styles.slideDescription}>{item.desc}</Text>
      <TouchableOpacity onPress={() => navigation.navigate(item.navi)}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#F9A738', '#FEE62A']}
          style={styles.linearGradient}>
          <Text style={styles.lineargradtxt}>Learn more</Text>
        </LinearGradient>
      </TouchableOpacity>
    </ImageBackground>
  );

  const onScroll = event => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveSlide(slideIndex);
  };

  const ModalManagecard = ({visible, onClose, action}) => {
    if (!action) return null;
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContentaction}>
            <ImageBackground source={action.back} style={styles.Imageaction}>
              <Image
                source={action.image}
                imageStyle={{borderRadius: 30}}
                style={{height: hp('13%'), width: wp('35%')}}
              />
            </ImageBackground>
            <View style={{alignItems: 'center', rowGap: hp('2%')}}>
              <Text style={styles.actionhead}>{action.head}</Text>
              <TouchableOpacity
                onPress={() => onManageCard(action)}
                style={{marginBottom: hp('3%')}}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={['#F9A738', '#FEE62A']}
                  style={styles.linearGradient}>
                  <Text style={styles.lineargradtxt}>Proceed</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const ModalViewCard = ({visible, onClose, onCardSelect}) => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image source={Images.viewcardmodal} style={styles.modalback} />
            <View
              style={{
                margin: wp('10%'),
                rowGap: wp('10%'),
                alignItems: 'center',
              }}>
              <Text style={styles.modalicontxt}>Select your card</Text>
              <FlatList
                style={styles.cardslist}
                horizontal={true}
                data={cardList}
                keyExtractor={item => item?._id}
                ItemSeparatorComponent={
                  <View style={{margin: wp('2%')}}></View>
                }
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={{flexDirection: 'row', columnGap: wp('1%')}}
                    onPress={() => {
                      onCardSelect(item);
                      onClose();
                    }}>
                    <Image
                      source={Images.ppcartcard}
                      style={styles.modalcardcicon}
                    />
                    <Text style={styles.modalicontxt}>Card {item.id}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const Modalcarddetails = ({visible, onClose, card}) => {
    if (!card) return null;

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}>
        <View style={styles.modalContainer}>
          <ImageBackground
            source={Images.cardmodalback}
            imageStyle={{borderTopLeftRadius: 30, borderTopRightRadius: 30}}
            style={styles.carddetailscontainer}>
            <View
              style={{
                marginHorizontal: wp('5%'),
                marginVertical: hp('3%'),
                rowGap: hp('6%'),
              }}>
              <Text style={styles.modalcardhead}>
                Card details (card {card.id})
              </Text>
              <ImageBackground
                source={Images.walletcard}
                style={styles.modalcardbackground}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Image
                    source={Images.chip}
                    style={{height: hp('2.5%'), width: wp('7.5%')}}
                  />
                  <Image
                    source={Images.logofig}
                    style={{height: hp('2.5%'), width: wp('14.5%')}}
                  />
                </View>
                <View>
                  <Text
                    style={[
                      styles.modalcardname,
                      {fontSize: FontSize.size_14},
                    ]}>
                    {card.cardno}
                  </Text>
                </View>
                <View style={{flexDirection: 'row', columnGap: wp('2%')}}>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={[styles.modalcardname, {width: wp('20%')}]}>
                    {card.name}
                  </Text>
                  <Text style={styles.modalcardname}>{card.exp}</Text>
                  <Text style={styles.modalcardname}>{card.cvv}</Text>
                </View>
              </ImageBackground>
              <View style={{marginHorizontal: wp('12%')}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.cardbottomhead}>Kit number: </Text>
                  <Text style={styles.cardbottomtext}>{card.kit}</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.cardbottomhead}>Card type: </Text>
                  <Text style={styles.cardbottomtext}>{card.type}</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.cardbottomhead}>Card status: </Text>
                  <Text style={styles.cardbottomtext}>{card.status}</Text>
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>
      </Modal>
    );
  };

  const onManageCard = item => {
    let data = {
      MOBILE_NUMBER: mobileNo,
    };
    if (item?.id == 1 || item?.id == 2) {
      data = {
        ...data,
        TYPE: 'LOCK_UNLOCK',
        KIT_NUMBER: cardDetails?.KIT_NUMBER,
        REQUEST_TYPE: item?.id == 1 ? 'LOCK' : 'UL',
      };
    } else if (item?.id == 3) {
      data = {
        ...data,
        TYPE: 'SET_PIN',
        KIT_NUMBER: cardDetails?.KIT_NUMBER,
      };
    } else if (item?.id == 4) {
      data = {
        ...data,
        TYPE: 'REPLACE_CARD',
        KIT_NUMBER: cardDetails?.KIT_NUMBER,
      };
    }
    if (Object.keys(data).length > 1) {
      props.onPpi(
        data,
        res => onPpiManageCardSuccessCallBack(res, item),
        error => onPpiManageCardFailureCallBack(error),
      );
    }
  };

  const onPpiManageCardSuccessCallBack = async (res, item) => {
    let checkStatus =
      item?.id == 1
        ? 'Card Locked Successful'
        : item?.id == 2
        ? 'Card Unlocked Successful'
        : item?.id == 3
        ? 'Card Pin Set Successful'
        : item?.id == 4
        ? 'Card Replacement Process Start'
        : '';
    setModalVisible(false);
    showSuccess(checkStatus);
  };

  const onPpiManageCardFailureCallBack = error => {
    let msg = error;
    if (error == undefined || error == null) {
      msg = 'Something went wrong';
    }
    props.showErrorModal(msg, true);
  };

  return (
    <View style={styles.container}>
      {isFocused && (
        <CustomStatusBar
          translucent
          backgroundColor={'#efefef'}
          barStyle="dark-content"
        />
      )}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: '30%'}}>
        <View style={styles.container1}>
          <View style={styles.container2}>
            <Image
              source={
                selectedImage == null
                  ? Images.avatar
                  : {uri: `data:image/jpeg;base64,${selectedImage}`}
              }
              style={styles.image1}
            />
            <View style={{paddingTop: hp('1%')}}>
              <Text style={styles.text1}>Hello</Text>
              <Text style={styles.text2}>{userName}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.icon1}
            onPress={() => navigation.navigate('Notifications')}>
            <Icon name="notifications" color={Color.colorBlack} size={30} />
          </TouchableOpacity>
        </View>

        <View style={styles.container3}>
          <View>
            <ImageBackground
              source={Images.walletcard}
              style={styles.cardBackground}
              imageStyle={{borderRadius: 40}}>
              <View style={{padding: '8%', rowGap: hp('3%')}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Image
                    source={Images.chip}
                    style={{height: hp('3%'), width: wp('9%')}}
                  />
                  <Image
                    source={Images.logofig}
                    style={{height: hp('2.7%'), width: wp('15.5%')}}
                  />
                </View>
                <View>
                  <Text style={styles.cardno}>
                    {cardDetails?.KIT_NUMBER
                      ? cardDetails?.KIT_NUMBER.substring(0, 16)
                      : ''}
                  </Text>
                </View>
                <View style={{flexDirection: 'row', columnGap: wp('10%')}}>
                  <View style={{flexDirection: 'row', columnGap: wp('4%')}}>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={[styles.carddetails, {width: wp('20%')}]}>
                      {cardDetails?.FIRST_NAME + ' ' + cardDetails?.LAST_NAME}
                    </Text>
                    <Text style={styles.carddetails}>10/25</Text>
                    <Text style={styles.carddetails}>123</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => setviewcardModalVisible(true)}>
                    <View style={styles.viewcard}>
                      <Text
                        style={{
                          fontSize: 6.12,
                          fontFamily: FontFamily.montserratMedium,
                          color: Color.colorWhite,
                        }}>
                        View card
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </ImageBackground>
            <ModalViewCard
              visible={viewcardmodalVisible}
              onClose={() => setviewcardModalVisible(false)}
              onCardSelect={handleCardSelect}
            />
            <Modalcarddetails
              visible={carddetailsVisible}
              onClose={() => setcarddetailsVisible(false)}
              card={selectedCard}
            />
          </View>
          <View style={styles.sub}>
            <TouchableOpacity
              style={[styles.trans, {backgroundColor: '#8082ED'}]}
              onPress={() => navigation.navigate('OrderPhysicalCard')}>
              <FoundationIcon
                name="credit-card"
                size={15}
                color="#8082ED"
                style={styles.icon2}
              />
              <Text style={styles.sidetxt}>Physical Card</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.trans, {backgroundColor: '#F5A8BA'}]}
              onPress={() => navigation.navigate('Addbalance')}>
              <FontAwesomeIcon
                name="rupee"
                size={15}
                color="#F5A8BA"
                style={styles.icon2}
              />
              <Text style={styles.sidetxt}>Wallet Balance</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.container4}>
          <Text style={styles.head}>Card Services</Text>
          <View style={styles.list}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Addbalance')}
              style={{marginHorizontal: wp('5%'), alignItems: 'center'}}>
              <Image source={Images.addbal} style={styles.iconimage3} />
              <Text style={styles.icontxt3}>Add balance</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('Sendmoney')}
              style={{marginHorizontal: wp('5%'), alignItems: 'center'}}>
              <Image source={Images.sendmoney} style={styles.iconimage3} />
              <Text style={styles.icontxt3}>Send money</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('Transactions')}
              style={{marginHorizontal: wp('5%'), alignItems: 'center'}}>
              <Image source={Images.transactions} style={styles.iconimage3} />
              <Text style={styles.icontxt3}>Transactions</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.container5}>
          <Text style={styles.head}>Manage your card</Text>
          <FlatList
            data={managedata}
            numColumns={4}
            keyExtractor={item => item.id.toString()}
            ItemSeparatorComponent={<View style={{margin: wp('4%')}}></View>}
            renderItem={({item}) => (
              <TouchableOpacity
                style={{
                  marginHorizontal: wp('4%'),
                  alignItems: 'center',
                  rowGap: wp('1%'),
                }}
                onPress={() => handleManageCardAction(item)}>
                {item.type === 'fontawesome6' ? (
                  <FontAwesome6Icon
                    name={item.icon}
                    color={item.color}
                    size={20}
                  />
                ) : item.type === 'image' ? (
                  <Image
                    source={item.icon}
                    style={{height: wp('5%'), width: wp('6%')}}
                  />
                ) : (
                  <MaterialIconsIcon
                    name={item.icon}
                    color={item.color}
                    size={20}
                  />
                )}
                <Text style={styles.modaltext}>{item.text}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
        <ModalManagecard
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          action={selectedAction}
        />

        <View style={styles.container}>
          <FlatList
            data={slides}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            renderItem={renderSlide}
            onScroll={onScroll}
            scrollEventThrottle={16}
          />
          <View style={styles.dotsContainer}>
            {slides.map((_, i) => (
              <View
                key={i}
                style={
                  i === activeSlide ? styles.activeDot : styles.inactiveDot
                }
              />
            ))}
          </View>
        </View>
      </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(WalletHome);
