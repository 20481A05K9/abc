import React, {useState, useCallback, useEffect, useRef} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Modal,
  Alert,
  Image,
  FlatList,
  Linking,
  Platform,
  PermissionsAndroid,
  BackHandler,
  AppState,
  Dimensions,
} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DocumentPicker from 'react-native-document-picker';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Color} from '../../../global';
import {styles} from '../../Styles/GoodSamaritan/ChatMessagesStyles';
import {Images} from '../../../assets';
import {connect} from 'react-redux';
import * as commonActions from '../../redux/actions/commonActions';
import * as userActions from '../../redux/actions/userActions';
import CustomStatusBar from '../../Components/CustomStatusBar';
import RNExitApp from 'react-native-kill-app';
import {PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import DeviceInfo from 'react-native-device-info';
import {IMAGE_URL} from '../../services/config/index.url';
import EmojiSelector from '../../Components/EmojiSelector/index';
import ImagePicker from 'react-native-image-crop-picker';

const randomMessages = [
  '🚫 Wrong Parking',
  '🚗 Doors left open',
  '💡 Headlights still on',
  '💡 Car lights on',
  '🚙 windshield wiper malfunction',
  '❄ AC on',
  '🔓 Car unlocked',
  '💥Hit by another vehicle',
  '⚫ Flat tires',
  '🔥Engine over heating',
  '🛢Oil leakage',
  '🚗 Parking on slope',
  '💥Car crash',
  '🚫 parking brake failure',
  '🚨 Car alarm failure',
];

const ChatMessages = props => {
  const {
    inAppId,
    vehicleNumber,
    profileImage,
    receiverName,
    receiverUserId,
    blockUnblock,
    mobileNo,
    userId,
  } = props.route.params || {};
  const [messages, setMessages] = useState([]);
  const [optionModalVisible, setOptionModalVisible] = useState(false);
  const [actionModalVisible, setActionModalVisible] = useState(false);
  const [reportSuccessModalVisible, setReportSuccessModalVisible] =
    useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [reportReason, setReportReason] = useState('');
  const navigation = useNavigation();
  const [muteUnmuteStatus, setMuteUnmuteStatus] = useState(0);
  const [blockUnblockStatus, setBlockUnblockStatus] = useState(blockUnblock);
  const [text, setText] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [imageUploadData, setImageUploadData] = useState(null);
  const intervalRef = useRef(null);
  const [isEmojiModalVisible, setIsEmojiModalVisible] = useState(false);
  const [userStatus, setUserStatus] = useState(0);
  const [selectedMessage, setSelectedMessage] = useState('');
  const [showInbuildMsg, setShowInbuildMsg] = useState(null);
  const [reportNowStatus, setReportNowStatus] = useState(null);
  const limit = 15;
  const [load, setLoad] = useState(false);
  const [pageCount, setPageCount] = useState(1);
  const [isLoadingEarlier, setIsLoadingEarlier] = useState(false);
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    getMessageList();
    getNotificationStatus();
    updateUserStatus(1);
  }, []);

  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        updateUserStatus(0);
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

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState == 'active') {
        startInterval();
        updateUserStatus(1);
      } else {
        clearInterval(intervalRef.current);
        updateUserStatus(0, 'background');
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    startInterval();
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  const startInterval = () => {
    intervalRef.current = setInterval(() => {
      getMessageList();
      getUserStatus();
    }, 30000);
  };

  const getMessageList = async () => {
    const data = {
      MOBILE_NUMBER: mobileNo,
      TYPE: 'messageList',
      INAPP_ID: inAppId,
      page: pageCount,
      limit: limit,
    };
    props.onInAppMessage(
      data,
      res => onMessageListSuccessCallBack(res),
      error => onMessageListFailureCallBack(error),
    );
  };

  const onMessageListSuccessCallBack = async res => {
    if (res?.message == 'Success') {
      setMessages([...messages, ...res?.data]);
      setPageCount(prev => prev + 1);
      if (res?.data.length < limit) {
        setLoad(false);
      } else {
        setLoad(true);
      }
      setIsLoadingEarlier(false);
      if (showInbuildMsg == 1 || showInbuildMsg == null) {
        getNotificationStatus();
      }
      setReportNowStatus(0);
    }
  };

  const onMessageListFailureCallBack = error => {
    let msg = error;
    if (error == undefined || error == null) {
      msg = 'Something went wrong';
    }
    props.showErrorModal(msg, true);
  };

  const getNotificationStatus = async () => {
    const data = {
      MOBILE_NUMBER: mobileNo,
      TYPE: 'INAPP_STATUS',
      INAPP_ID: inAppId,
    };
    props.onInAppMessage(
      data,
      res => onNotificationStatusSuccessCallBack(res),
      error => onNotificationStatusFailureCallBack(error),
    );
  };

  const onNotificationStatusSuccessCallBack = async res => {
    if (res?.message == 'Success') {
      setMuteUnmuteStatus(res?.userStatusData?.NOTIFICATION_STATUS);
      setShowInbuildMsg(res?.userStatusData?.INITIAL_MSG_STATUS);
    }
  };

  const onNotificationStatusFailureCallBack = error => {
    let msg = error;
    if (error == undefined || error == null) {
      msg = 'Something went wrong';
    }
    props.showErrorModal(msg, true);
  };

  const updateUserStatus = async (type, appState) => {
    const data = {
      MOBILE_NUMBER: mobileNo,
      TYPE: 'UPDATE_USER_STATUS',
      USER_INAPP_STATUS: type,
    };
    props.onInAppMessage(
      data,
      res => onUpdateUserStatusSuccessCallBack(res, appState),
      error => onUpdateUserStatusFailureCallBack(error),
    );
  };

  const onUpdateUserStatusSuccessCallBack = async (res, appState) => {
    if (!appState) {
      if (res?.message == 'Success' && res?.USER_INAPP_STATUS == 1) {
        getUserStatus();
      } else if (res?.USER_INAPP_STATUS == 0) {
        navigation.goBack();
      }
    }
  };

  const onUpdateUserStatusFailureCallBack = error => {
    let msg = error;
    if (error == undefined || error == null) {
      msg = 'Something went wrong';
    }
    props.showErrorModal(msg, true);
  };

  const getUserStatus = async () => {
    const data = {
      MOBILE_NUMBER: mobileNo,
      TYPE: 'USER_INAPP_STATUS',
      INAPP_ID: inAppId,
    };
    props.onInAppMessage(
      data,
      res => onUserStatusSuccessCallBack(res),
      error => onUserStatusFailureCallBack(error),
    );
  };

  const onUserStatusSuccessCallBack = async res => {
    if (res?.message == 'Success') {
      setUserStatus(res?.USER_INAPP_STATUS?.USER_INAPP_STATUS);
    }
  };

  const onUserStatusFailureCallBack = error => {
    let msg = error;
    if (error == undefined || error == null) {
      msg = 'Something went wrong';
    }
    props.showErrorModal(msg, true);
  };

  const onSendButtonClick = () => {
    if (imageUri) {
      uploadImages();
    } else if (text.trim()) {
      onSend({text: text.trim()}, true);
    }
  };

  const onSend = useCallback((newMessages = []) => {
    let txt = newMessages?.text;
    let img = newMessages?.image;
    var data = {
      MOBILE_NUMBER: mobileNo,
      TYPE: 'u',
      INAPP_ID: inAppId,
      user: {
        _id: userId,
      },
      createdAt: new Date(),
    };
    if (txt && img) {
      data = {
        ...data,
        text: txt,
        image: img,
      };
    } else if (txt) {
      data = {
        ...data,
        text: txt,
      };
    } else if (img) {
      data = {
        ...data,
        image: img,
      };
    }
    props.onInAppMessage(
      data,
      res => onMessageSendSuccessCallBack(res),
      error => onMessageSendFailureCallBack(error),
    );
  }, []);

  const onMessageSendSuccessCallBack = async res => {
    if (res?.message == 'Blocked') {
      props.showErrorModal('You are blocked from receiver', true);
      setReportNowStatus(1);
      return;
    }
    setText('');
    setImageUri(null);
    setImageUploadData(null);
    getMessageList();

    clearInterval(intervalRef.current);
    startInterval();
  };

  const onMessageSendFailureCallBack = error => {
    let msg = error;
    if (error == undefined || error == null) {
      msg = 'Something went wrong';
    }
    props.showErrorModal(msg, true);
  };

  const chooseFile = async () => {
    let isStoragePermitted = await requestExternalWritePermission();
    if (isStoragePermitted) {
      try {
        const doc = await DocumentPicker.pick({
          type: [DocumentPicker.types.images],
        });
        const formData = new FormData();
        formData.append('pdf', {
          uri: doc[0].uri,
          type: doc[0].type,
          name: doc[0].name,
        });
        formData.append('REQUEST_TYPE', 'INAPPMESSAGE_IMAGE');
        formData.append('USER_ID', userId);

        setImageUri(doc[0].uri);
        setImageUploadData(formData);
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

  const chooseCamera = async () => {
    let isCameraPermitted = await requestCameraPermission();
    if (isCameraPermitted) {
      ImagePicker.openCamera({
        compressImageMaxWidth: 300,
        compressImageMaxHeight: 300,
        cropping: true,
        includeBase64: false,
        freeStyleCropEnabled: true,
      })
        .then(image => {
          const formData = new FormData();
          formData.append('pdf', {
            uri: image?.path,
            type: image?.mime,
            name: image?.modificationDate + '.jpg',
          });
          formData.append('REQUEST_TYPE', 'INAPPMESSAGE_IMAGE');
          formData.append('USER_ID', userId);

          setImageUri(image?.path);
          setImageUploadData(formData);
        })
        .catch(error => {});
    } else {
      let msg =
        Platform.OS == 'ios'
          ? "and ON the 'Camera'"
          : "then 'App Permissions' and then on 'Camera' to allow access.";
      Alert.alert(
        'Hold!',
        "Without camera access we will not be able to detect your camera.\n\nPlease tap on 'Settings' " +
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

  const requestCameraPermission = async () => {
    let permission;

    if (Platform.OS === 'ios') {
      permission = PERMISSIONS.IOS.CAMERA;
    } else {
      permission = PERMISSIONS.ANDROID.CAMERA;
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

  const uploadImages = () => {
    const data = imageUploadData;
    props.onUploadPDF(
      data,
      res => onUploadImageSuccessCallBack(res),
      error => onUploadImageFailureCallBack(error),
    );
  };

  const onUploadImageSuccessCallBack = async res => {
    let fullUrl = IMAGE_URL + userId + '/' + res?.filename;
    if (text.trim()) {
      onSend({text: text.trim(), image: fullUrl}, true);
    } else if (imageUri) {
      onSend({image: fullUrl}, true);
    }
  };

  const onUploadImageFailureCallBack = error => {
    let msg = error;
    if (error == undefined || error == null) {
      msg = 'Something went wrong';
    }
    props.showErrorModal(msg, true);
  };

  const handleReportSubmit = () => {
    if (reportReason.trim().length == 0) return;
    const data = {
      MOBILE_NUMBER: mobileNo,
      REQUEST_TYPE: 'INAPP',
      MESSAGE: reportReason,
      OTHER_USER_ID: receiverUserId,
      TYPE: 'i',
    };
    props.onHelpService(
      data,
      res => onReportSuccessCallBack(res),
      error => onReportFailureCallBack(error),
    );
  };

  const onReportSuccessCallBack = async res => {
    setReportSuccessModalVisible(true);
    setActionModalVisible(false);
    setReportReason('');
    setTimeout(() => {
      setReportSuccessModalVisible(false);
    }, 2000);
  };

  const onReportFailureCallBack = error => {
    let msg = error;
    if (error == undefined || error == null) {
      msg = 'Something went wrong';
    }
    props.showErrorModal(msg, true);
  };

  const handleBlockUnblock = () => {
    var data = {
      MOBILE_NUMBER: mobileNo,
      TYPE: blockUnblockStatus == 1 ? 'block' : 'unblock',
      ACTION_USER_ID: receiverUserId,
      INAPP_ID: inAppId,
    };
    props.onInAppMessage(
      data,
      res => onBlockUnblockSuccessCallBack(res),
      error => onBlockUnblockFailureCallBack(error),
    );
  };

  const onBlockUnblockSuccessCallBack = async res => {
    setActionModalVisible(false);
    setBlockUnblockStatus(!blockUnblockStatus);
    if (blockUnblockStatus == 0) {
      setShowInbuildMsg(0);
    }
  };

  const onBlockUnblockFailureCallBack = error => {
    let msg = error;
    if (error == undefined || error == null) {
      msg = 'Something went wrong';
    }
    props.showErrorModal(msg, true);
  };

  const handleMuteUnmute = () => {
    var data = {
      MOBILE_NUMBER: mobileNo,
      TYPE: muteUnmuteStatus == 1 ? 'mute' : 'unmute',
      INAPP_ID: inAppId,
    };
    props.onInAppMessage(
      data,
      res => onMuteUnmuteSuccessCallBack(res),
      error => onMuteUnmuteFailureCallBack(error),
    );
  };

  const onMuteUnmuteSuccessCallBack = async res => {
    setActionModalVisible(false);
    setMuteUnmuteStatus(!muteUnmuteStatus);
  };

  const onMuteUnmuteFailureCallBack = error => {
    let msg = error;
    if (error == undefined || error == null) {
      msg = 'Something went wrong';
    }
    props.showErrorModal(msg, true);
  };

  const handleClearChat = () => {
    var data = {
      MOBILE_NUMBER: mobileNo,
      TYPE: 'clearChat',
      INAPP_ID: inAppId,
    };
    props.onInAppMessage(
      data,
      res => onChatClearSuccessCallBack(res),
      error => onChatClearFailureCallBack(error),
    );
  };

  const onChatClearSuccessCallBack = async res => {
    setMessages([]);
    setActionModalVisible(false);
  };

  const onChatClearFailureCallBack = error => {
    let msg = error;
    if (error == undefined || error == null) {
      msg = 'Something went wrong';
    }
    props.showErrorModal(msg, true);
  };

  const renderInputToolbar = props => {
    return (
      <>
        {blockUnblockStatus == 0 ? (
          <View style={styles.blockedContainer}>
            <Text style={styles.blockedText}>This user is blocked</Text>
            <TouchableOpacity
              style={styles.unblockButton}
              onPress={handleBlockUnblock}>
              <Text style={styles.unblockButtonText}>Unblock</Text>
            </TouchableOpacity>
          </View>
        ) : reportNowStatus == 1 ? (
          <View style={styles.reportNowView}>
            <TouchableOpacity onPress={() => handleOptionSelect('Report')}>
              <Text style={styles.msg1}>
                You can’t send messages ,{' '}
                <Text style={styles.msg2}>Report now</Text>
              </Text>
            </TouchableOpacity>
          </View>
        ) : showInbuildMsg == 0 ? (
          <>
            <View style={styles.customInputToolbar}>
              <TouchableOpacity onPress={() => setIsEmojiModalVisible(true)}>
                <Ionicons name="happy-outline" size={24} color="#075E54" />
              </TouchableOpacity>
              <TextInput
                style={styles.customInput}
                placeholder="Write a message..."
                onChangeText={text => setText(text)}
                value={text}
                placeholderTextColor="#1B1A57"
                multiline
              />
              <TouchableOpacity onPress={chooseFile}>
                <Ionicons name="attach-outline" size={28} color="#1B1A57" />
              </TouchableOpacity>
              <TouchableOpacity onPress={chooseCamera}>
                <MaterialCommunityIcons
                  name="camera-outline"
                  size={28}
                  color="#1B1A57"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => onSendButtonClick()}
                style={styles.sendButton}>
                <Ionicons name="send" size={24} color="#FFFFFF" />
              </TouchableOpacity>
              {imageUri && (
                <View style={styles.selectedImgView}>
                  <Image source={{uri: imageUri}} style={styles.selectedImg} />
                  <TouchableOpacity
                    onPress={() => {
                      setImageUri(null);
                      setImageUploadData(null);
                    }}
                    style={styles.closeIconView}>
                    <Ionicons
                      name="close-circle"
                      size={30}
                      color={Color.colorBlack}
                    />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </>
        ) : null}
      </>
    );
  };

  const renderEmojiModal = () => {
    return (
      <Modal
        visible={isEmojiModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsEmojiModalVisible(false)}>
        <View style={styles.modalContainerEmoji}>
          <EmojiSelector
            onEmojiSelected={emoji => {
              setText(prev => prev + emoji);
              setIsEmojiModalVisible(false);
            }}
            showSearchBar={true}
            columns={8}
            searchBarStyle={styles.searchBarStyle}
            sectionHeaderStyle={styles.sectionHeaderStyle}
          />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setIsEmojiModalVisible(false)}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };

  const render3DotModal = () => {
    return (
      <Modal
        animationType="none"
        transparent={true}
        visible={optionModalVisible}
        onRequestClose={() => {
          setOptionModalVisible(!optionModalVisible);
        }}>
        <TouchableOpacity
          style={styles.modalContainer}
          onPress={() => setOptionModalVisible(false)}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => handleOptionSelect('Report')}>
              <Text style={styles.modalOptionText}>Report</Text>
            </TouchableOpacity>
            {blockUnblockStatus != 2 && (
              <TouchableOpacity
                style={styles.modalOption}
                onPress={() => handleOptionSelect('Block User')}>
                <Text style={styles.modalOptionText}>
                  {blockUnblockStatus == 1 ? 'Block User' : 'Unblock User'}
                </Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => handleOptionSelect('Mute Notification')}>
              <Text style={styles.modalOptionText}>
                {muteUnmuteStatus == 1
                  ? 'Mute Notification'
                  : 'Unmute Notification'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => handleOptionSelect('Clear Chat')}>
              <Text style={styles.modalOptionText}>Clear Chat</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  const handleOptionSelect = option => {
    setSelectedOption(option);
    setOptionModalVisible(false);
    setActionModalVisible(true);
  };

  const render3DotActionModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={actionModalVisible}
        onRequestClose={() => {
          setActionModalVisible(!actionModalVisible);
        }}>
        {selectedOption === 'Report' ? (
          <>
            <View style={styles.modalContainer4}>
              <View style={styles.modalContent4}>
                <View
                  style={{
                    borderTopWidth: 5,
                    borderTopColor: '#1F1F1F',
                    width: wp('15%'),
                    alignSelf: 'center',
                    margin: '4%',
                  }}
                />
                <Text style={styles.modalTitle4}>Report the user</Text>
                <View style={styles.middle4}>
                  <TextInput
                    style={styles.textInput4}
                    placeholder="Add your Comments..."
                    multiline
                    numberOfLines={4}
                    value={reportReason}
                    onChangeText={setReportReason}
                    placeholderTextColor={'rgba(0, 0, 0, 0.42)'}
                  />
                </View>
                <View style={{alignSelf: 'center'}}>
                  <Text style={styles.redtext}>
                    {
                      'Feel free to add your words, our technical team will help you as soon as possible.'
                    }
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.modalButtons4}
                  onPress={handleReportSubmit}>
                  <Text style={styles.modalActionButtonText4}>Report now</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        ) : selectedOption === 'Block User' ? (
          <>
            <View style={styles.modalContainer2}>
              <View style={styles.modalContent2}>
                <View style={styles.middle}>
                  <Text style={styles.modalTitle}>
                    {blockUnblockStatus == 1 ? 'Block ' : 'Unblock '}{' '}
                    {receiverName}
                  </Text>
                  <Text style={styles.modalText}>
                    {blockUnblockStatus == 1
                      ? `Block this contact.`
                      : `Unblock this contact.`}
                  </Text>
                </View>
                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    onPress={() => setActionModalVisible(false)}>
                    <Text style={styles.modalCancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleBlockUnblock}>
                    <Text style={styles.modalActionButtonText}>
                      {blockUnblockStatus == 1 ? 'Block' : 'Unblock'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </>
        ) : selectedOption === 'Mute Notification' ? (
          <>
            <View style={styles.modalContainer2}>
              <View style={styles.modalContent2}>
                <View style={styles.middle}>
                  <Text style={styles.modalTitle}>{`${
                    muteUnmuteStatus == 1 ? 'Mute' : 'Unmute'
                  } Notifications`}</Text>
                  <Text style={styles.modalText}>{`Turn ${
                    muteUnmuteStatus == 1 ? 'off' : 'on'
                  } the notifications.`}</Text>
                </View>
                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    onPress={() => setActionModalVisible(false)}>
                    <Text style={styles.modalCancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleMuteUnmute}>
                    <Text style={styles.modalActionButtonText}>
                      {muteUnmuteStatus == 1 ? 'Mute' : 'Unmute'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </>
        ) : selectedOption === 'Clear Chat' ? (
          <>
            <View style={styles.modalContainer2}>
              <View style={styles.modalContent2}>
                <View style={styles.middle}>
                  <Text style={styles.modalTitle}>Clear Chat</Text>
                  <Text style={styles.modalText2}>
                    Delete the chat permanently.
                  </Text>
                </View>
                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    onPress={() => setActionModalVisible(false)}>
                    <Text style={styles.modalCancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleClearChat}>
                    <Text style={styles.modalActionButtonText}>Clear now</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </>
        ) : null}
      </Modal>
    );
  };

  const renderReportSuccessModal = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={reportSuccessModalVisible}>
        <View style={styles.reportSuccessModalContainer}>
          <View style={styles.reportSuccessModalContent}>
            <Image source={Images.top_modal} style={styles.modaltop} />
            <Text style={styles.reportSuccessText}>Reported successfully</Text>
            <Text style={styles.reportSuccessText2}>Thanks for reporting!</Text>
          </View>
        </View>
      </Modal>
    );
  };

  const renderFullScreenImageModal = () => {
    return (
      <Modal
        visible={imageModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setImageModalVisible(false)}>
        <View style={styles.modalBackground}>
          <TouchableOpacity
            style={styles.closeButton1}
            onPress={() => setImageModalVisible(false)}>
            <Text style={styles.closeButtonText1}>Close</Text>
          </TouchableOpacity>
          {selectedImage && (
            <Image
              source={{uri: selectedImage}}
              style={styles.fullScreenImage}
            />
          )}
        </View>
      </Modal>
    );
  };

  const handleRandomMessageClick = message => {
    onSend({text: message.trim()}, true);
  };

  const renderRandomMessageItem = ({item}) => {
    const isSelected = selectedMessage === item;
    return (
      <TouchableOpacity
        onPress={() => handleRandomMessageClick(item)}
        style={[
          styles.randomMessageButton,
          {
            backgroundColor: isSelected ? '#E1E9FD' : '#FFFFFF',
          },
        ]}>
        <Text
          style={[
            styles.randomMessageText,
            {color: isSelected ? '#308FFF' : '#308FFF'},
          ]}
          ellipsizeMode="tail">
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderMessageImage = props => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedImage(props.currentMessage.image);
          setImageModalVisible(true);
        }}>
        <Image
          source={{uri: props.currentMessage.image}}
          style={styles.messageImage}
        />
      </TouchableOpacity>
    );
  };

  const onLoadEarlier = () => {
    if (load) {
      setIsLoadingEarlier(true);
      clearInterval(intervalRef.current);
      startInterval();
    }
  };

  return (
    <View style={styles.container}>
      <CustomStatusBar
        backgroundColor={Color.colorbackground}
        barStyle="dark-content"
      />
      {renderEmojiModal()}
      {render3DotModal()}
      {render3DotActionModal()}
      {renderReportSuccessModal()}
      {renderFullScreenImageModal()}

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => updateUserStatus(0)}
          style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#4F5E7B" />
        </TouchableOpacity>

        {profileImage != null &&
        profileImage != '' &&
        profileImage != undefined ? (
          <Image
            source={{uri: 'data:image/jpeg;base64,' + profileImage}}
            style={styles.contactImage}
          />
        ) : (
          <View style={styles.contactAvatarPlaceholder}>
            <Text style={styles.contactAvatarText}>{vehicleNumber}</Text>
          </View>
        )}

        <View style={styles.contactInfo}>
          <Text style={styles.headerTitle}>
            {vehicleNumber ? vehicleNumber : receiverName}
          </Text>
          <Text style={styles.onlineStatus}>
            {userStatus == 1 ? 'Online' : 'Offline'}
          </Text>
        </View>

        <TouchableOpacity onPress={() => setOptionModalVisible(true)}>
          <Ionicons name="ellipsis-vertical" size={24} color="#4F5E7B" />
        </TouchableOpacity>
      </View>

      {messages.length == 0 && (
        <>
          <View style={styles.startConversationContainer}>
            <Text style={styles.startConversationText}>
              Start a conversation with {receiverName}
            </Text>
          </View>
        </>
      )}

      {showInbuildMsg == 1 && (
        <View style={{paddingHorizontal: '4%'}}>
          <FlatList
            data={randomMessages}
            renderItem={renderRandomMessageItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3}
            columnWrapperStyle={styles.columnWrapper}
            contentContainerStyle={styles.randomMessagesContainer}
          />
        </View>
      )}

      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{_id: userId}}
        renderInputToolbar={props => renderInputToolbar(props)}
        loadEarlier={true}
        onLoadEarlier={onLoadEarlier}
        isLoadingEarlier={isLoadingEarlier}
        renderMessageImage={renderMessageImage}
      />
    </View>
  );
};

const mapStateToProps = state => {
  return {userData: state.user.userData};
};

const mapDispatchToProps = dispatch => {
  return {
    onInAppMessage: (data, successCallBack, failureCallBack) =>
      dispatch(
        userActions.onInAppMessage(data, successCallBack, failureCallBack),
      ),
    onUploadPDF: (data, successCallBack, failureCallBack) =>
      dispatch(userActions.onUploadPDF(data, successCallBack, failureCallBack)),
    onHelpService: (data, successCallBack, failureCallBack) =>
      dispatch(
        userActions.onHelpService(data, successCallBack, failureCallBack),
      ),
    showErrorModal: (message, isFromError) =>
      dispatch(commonActions.showErrorModal(message, isFromError)),
    hideErrorModal: () => dispatch(commonActions.hideErrorModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatMessages);
