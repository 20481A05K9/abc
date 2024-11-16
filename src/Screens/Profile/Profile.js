import {
  Modal,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
  PermissionsAndroid,
  Alert,
  Linking,
  Switch,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import Material1 from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import {Color} from '../../../global';
import {Images} from '../../../assets';
import {ProfileStyles} from '../../Styles/Profile/ProfileStyles';
import DeviceInfo from 'react-native-device-info';
import RNExitApp from 'react-native-kill-app';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect, useSelector} from 'react-redux';
import CustomLoader from '../../Components/CustomLoader';
import Validation from '../../Components/Validation';
import * as commonActions from '../../redux/actions/commonActions';
import * as userActions from '../../redux/actions/userActions';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import CustomStatusBar from '../../Components/CustomStatusBar';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import {storeData} from '../../utils/helperFunctions';
import {FAQ_URL} from '../../services/config/index.url';

const {
  container,
  view2,
  leftIconStyles,
  txt,
  rightIconStyles,
  View3,
  horizontalLine,
  secondchild,
  cardImage,
  view4,
  profile,
  nametxt,
  mailtxt,
  plusymbol,
  view5,
  insertBtnTO,
  insertBtnText,
  belowtext,
  logoutxt,
  insertBtnTO1,
  insertBtnText1,
  view6,
  style1,
} = ProfileStyles;

const Profile = props => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedBase64, setSelectedBase64] = useState(null);
  var selectedBase64Local = null;
  const [mobileNo, setMobileNo] = useState(null);
  const [loadingVisibility, setLoadingVisibility] = useState(false);
  const [validationVisible, setValidationVisible] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLockEnabled, setIsLockEnabled] = useState(false);

  useEffect(() => {
    getData();
  }, [isFocused]);

  const getData = async () => {
    let {user, userImage} = props.userData;
    try {
      let lockCheck = user?.LOCK_PIN == '0' ? false : true;
      setUserName(user?.FIRST_NAME + ' ' + user?.LAST_NAME);
      setUserEmail(user?.EMAIL);
      setMobileNo(user?.MOBILE_NUMBER);
      setSelectedImage(userImage?.IMAGE);
      setIsLockEnabled(lockCheck);
    } catch (error) {}
  };

  const onImageUploaded = async res => {
    try {
      let data = {...props.userData, userImage: res?.data};
      storeData('userData', data)
        .then(value => {
          props.saveProfileData(data);
        })
        .catch(error => {});
      setSelectedImage(selectedBase64Local);
      setLoadingVisibility(false);
    } catch (error) {
      setLoadingVisibility(false);
      props.showErrorModal('Something went wrong', true);
    }
  };

  const chooseFile = async () => {
    let isStoragePermitted = await requestExternalWritePermission();
    if (isStoragePermitted) {
      try {
        const doc = await DocumentPicker.pick({
          type: [DocumentPicker.types.images],
        });
        const base64String = await RNFS.readFile(doc[0].uri, 'base64');
        setSelectedBase64(base64String);
        selectedBase64Local = base64String;
        uploadImages(base64String);
      } catch (err) {
        if (DocumentPicker.isCancel(err)) {
        } else {
        }
      }
    } else {
      let msg =
        Platform.OS == 'ios'
          ? "Click on 'Photos' then check Full Access"
          : "'App Permissions' and then on 'Photos and videos' to allow access.";
      Alert.alert(
        'Hold!',
        "Without storage access we will not be able to detect your storage.\n\nPlease tap on 'Settings' then " +
          msg,
        [
          {
            text: 'Cancel',
            onPress: () => {},
          },
          {
            text: 'Settings',
            onPress: () => {
              Platform.OS == 'android'
                ? (Linking.openSettings(), RNExitApp.exitApp())
                : Linking.openSettings();
            },
          },
        ],
      );
    }
  };

  const requestExternalWritePermission = async () => {
    let permission;

    if (Platform.OS === 'ios') {
      permission = PERMISSIONS.IOS.PHOTO_LIBRARY;
    } else {
      if (DeviceInfo.getSystemVersion() >= 13) {
        permission = PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES;
      } else {
        permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
      }
    }

    try {
      const result = await request(permission);
      if (result === RESULTS.GRANTED) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };

  const uploadImages = base64Data => {
    const data = {
      TYPE: 'i',
      REQUEST_TYPE: 'PROFILE_IMAGE',
      IMAGE: base64Data,
      MOBILE_NUMBER: mobileNo,
    };
    props.onUploadImage(
      data,
      res => onUploadImageSuccessCallBack(res),
      error => onUploadImageFailureCallBack(error),
    );
  };

  const onUploadImageSuccessCallBack = async res => {
    onImageUploaded(res);
  };

  const onUploadImageFailureCallBack = error => {
    let msg = error;
    if (error == undefined || error == null) {
      msg = 'Something went wrong';
    }
    props.showErrorModal(msg, true);
  };

  const onLogoutPress = () => {
    try {
      AsyncStorage.removeItem('token');
      AsyncStorage.clear();
      setIsModalVisible(false);
      navigation.navigate('Signup');
    } catch (error) {
      alert(error);
    }
  };

  const renderLogout = () => {
    return (
      <Modal
        visible={isModalVisible}
        animationIn="fadeInLeft"
        animationOut="fadeInRight"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}>
        <View
          style={{
            flex: 1,
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.28)',
          }}>
          <View style={view6}>
            <View style={style1} />
            <Text style={logoutxt}>{'Log out?'}</Text>
            <Text style={belowtext}>
              {'Are you sure you want to log out B-ALERT?'}
            </Text>
            <View>
              <TouchableOpacity
                style={insertBtnTO}
                activeOpacity={0.2}
                onPress={() => onLogoutPress()}>
                <Text style={insertBtnText}>Logout</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={insertBtnTO1}
                activeOpacity={0.2}
                onPress={() => setIsModalVisible(false)}>
                <Text style={insertBtnText1}>close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const updateLockPin = () => {
    setIsLockEnabled(previousState => !previousState);
    let lockStatus = isLockEnabled ? '0' : '1';
    const data = {
      MOBILE_NUMBER: mobileNo,
      LOCK_PIN: lockStatus,
      TYPE: 'u',
    };
    props.onRegisterUser(
      data,
      res => onUserUpdateSuccessCallBack(res, lockStatus),
      error => onUserUpdateFailureCallBack(error),
    );
  };

  const onUserUpdateSuccessCallBack = async (res, lockStatus) => {
    const data = {
      ...props.userData,
      user: {...props.userData?.user, LOCK_PIN: lockStatus},
    };
    storeData('userData', data)
      .then(value => {
        props.saveProfileData(data);
      })
      .catch(error => {});
  };

  const onUserUpdateFailureCallBack = error => {
    let msg = error;
    if (error == undefined || error == null) {
      msg = 'Something went wrong';
    }
    props.showErrorModal(msg, true);
  };

  return (
    <View style={container}>
      {isFocused && Platform.OS == 'android' && (
        <CustomStatusBar
          translucent
          backgroundColor="transparent"
          barStyle="light-content"
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
      {renderLogout()}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={secondchild}>
          <ImageBackground source={Images.carbg} style={cardImage}>
            <View
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.45)',
                width: '100%',
                height: '100%',
              }}>
              <Image
                source={
                  selectedImage == null
                    ? Images.avatar
                    : {uri: `data:image/jpeg;base64,${selectedImage}`}
                }
                style={profile}
              />
              <TouchableOpacity
                activeOpacity={0.2}
                onPress={() => chooseFile()}>
                <Text style={plusymbol}>
                  <Entypo name="plus" size={36} color={Color.colorWhite} />
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: '2%',
                  alignItems: 'center',
                }}>
                <Text style={nametxt}>{userName}</Text>
                <TouchableOpacity
                  style={{
                    borderRadius: 99,
                    padding: 5,
                    backgroundColor: Color.colorGray,
                  }}
                  activeOpacity={0.5}
                  onPress={() => {
                    navigation.navigate('Editprofile');
                  }}>
                  <FontAwesome5 name="pen" color="#fff" size={10} />
                </TouchableOpacity>
              </View>
              <Text style={mailtxt}>{userEmail}</Text>
            </View>
          </ImageBackground>
        </View>
        <View style={view2}>
          <TouchableOpacity
            activeOpacity={0.2}
            onPress={() => navigation.goBack()}
            style={View3}>
            <View style={leftIconStyles}>
              <Icon name="home" size={20} color={Color.colorBlack} />
            </View>
            <Text style={txt}>Home</Text>
            <View style={rightIconStyles}>
              <Entypo name="chevron-right" size={20} color={Color.colorGrey} />
            </View>
            <View style={{borderBottomWidth: 1}}></View>
          </TouchableOpacity>
          <View style={horizontalLine} />
          <TouchableOpacity
            activeOpacity={0.2}
            onPress={() => navigation.navigate('Location')}
            style={View3}>
            <View style={leftIconStyles}>
              <Entypo name="direction" size={18} color={Color.colorBlack} />
            </View>
            <Text style={txt}>Address</Text>
            <View style={rightIconStyles}>
              <Entypo name="chevron-right" size={20} color={Color.colorGrey} />
            </View>
          </TouchableOpacity>
          <View style={horizontalLine} />
          <TouchableOpacity activeOpacity={1} onPress={() => {}} style={View3}>
            <View style={leftIconStyles}>
              <Feather name="lock" size={18} color={Color.colorBlack} />
            </View>
            <Text style={[txt, {width: widthPercentageToDP('56%')}]}>
              App Lock
            </Text>
            <View style={rightIconStyles}>
              <Switch
                trackColor={{false: '#767577', true: Color.colorSecondary}}
                thumbColor={isLockEnabled ? Color.colorPrimary : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => updateLockPin()}
                value={isLockEnabled}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={view4}>
          <TouchableOpacity
            activeOpacity={0.2}
            onPress={() => navigation.navigate('VehicleDetails')}
            style={View3}>
            <View style={leftIconStyles}>
              <FontAwesome5
                name="car-side"
                size={20}
                color={Color.colorBlack}
              />
            </View>
            <Text style={txt}>Manage Vehicle</Text>
            <View style={rightIconStyles}>
              <Entypo name="chevron-right" size={20} color={Color.colorGrey} />
            </View>
          </TouchableOpacity>
          <View style={horizontalLine} />
          <TouchableOpacity
            activeOpacity={0.2}
            onPress={() => navigation.navigate('SelectedContact')}
            style={View3}>
            <View style={leftIconStyles}>
              <Ionicons name="call-sharp" size={18} color={Color.colorBlack} />
            </View>
            <Text style={txt}>Emergency Contacts</Text>
            <View style={rightIconStyles}>
              <Entypo name="chevron-right" size={20} color={Color.colorGrey} />
            </View>
          </TouchableOpacity>
          <View style={horizontalLine} />
          <TouchableOpacity
            activeOpacity={0.2}
            onPress={() => navigation.navigate('HistoryPage')}
            style={View3}>
            <View style={leftIconStyles}>
              <Material1
                name="access-time-filled"
                size={19}
                color={Color.colorBlack}
              />
            </View>
            <Text style={txt}>History</Text>
            <View style={rightIconStyles}>
              <Entypo name="chevron-right" size={20} color={Color.colorGrey} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={view5}>
          <TouchableOpacity
            activeOpacity={0.2}
            onPress={() => Linking.openURL(`${FAQ_URL}`)}
            style={View3}>
            <View style={leftIconStyles}>
              <Icon name="question-circle" size={22} color={Color.colorBlack} />
            </View>
            <Text style={txt}>FAQs</Text>
          </TouchableOpacity>
          <View style={horizontalLine} />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setIsModalVisible(true)}>
            <View style={View3}>
              <View style={leftIconStyles}>
                <Material name="logout" size={24} color={Color.colorBlack} />
              </View>
              <Text style={txt}>Logout</Text>
            </View>
          </TouchableOpacity>
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
    onUploadImage: (data, successCallBack, failureCallBack) =>
      dispatch(
        userActions.onUploadImage(data, successCallBack, failureCallBack),
      ),
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
