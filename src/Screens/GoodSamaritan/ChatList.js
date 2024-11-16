import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
} from 'react-native';
import {Searchbar} from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {styles} from '../../Styles/GoodSamaritan/ChatListStyles';
import {Images} from '../../../assets';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import * as commonActions from '../../redux/actions/commonActions';
import * as userActions from '../../redux/actions/userActions';
import CustomStatusBar from '../../Components/CustomStatusBar';
import {Color} from '../../../global';
import moment from 'moment';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  VALID_VEHICLE_NO,
  VEHICLE_NUMBER_PATTERN,
  VEHICLE_NUMBER_PATTERN1,
} from '../../utils/Constants';

const ChatList = props => {
  const {inAppId} = props.route.params || {};
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [activeTab, setActiveTab] = useState('allChats');
  const [mobileNo, setMobileNo] = useState(null);
  const [userId, setUserId] = useState('');
  const [searchListData, setSearchListData] = useState([]);
  const [allChatListData, setAllChatListData] = useState([]);
  const [unreadChatListData, setUnreadChatListData] = useState([]);
  var firstTimeCall = true;
  const [showItemCheckBox, setShowItemCheckBox] = useState(false);
  const [itemSelected, setItemSelected] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [dataCheckStatus, setDataCheckStatus] = useState(false);
  const [error, setError] = useState('');
  const limit = 10;
  const [load, setLoad] = useState(false);
  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
    const willFocusSubscription = navigation.addListener('focus', () => {
      getData();
    });
    return willFocusSubscription;
  }, []);

  const getData = async () => {
    try {
      const {user} = props.userData;
      setMobileNo(user?.MOBILE_NUMBER);
      setUserId(user?._id);
      getSearchList(user?.MOBILE_NUMBER);
      getChatList(user?.MOBILE_NUMBER, user?._id);
    } catch (error) {}
  };

  const getSearchList = async contact => {
    const data = {
      MOBILE_NUMBER: mobileNo == null ? contact : mobileNo,
      TYPE: 'VEHICLE_LIST',
    };
    props.onInAppMessage(
      data,
      res => onSearchListSuccessCallBack(res),
      error => onSearchListFailureCallBack(error),
    );
  };

  const onSearchListSuccessCallBack = async res => {
    setSearchListData(res?.data);
  };

  const onSearchListFailureCallBack = error => {
    let msg = error;
    if (error == undefined || error == null) {
      msg = 'Something went wrong';
    }
    props.showErrorModal(msg, true);
  };

  const getChatList = async (contact, userid) => {
    const data = {
      MOBILE_NUMBER: mobileNo == null ? contact : mobileNo,
      TYPE: 'l',
      page: pageCount,
      limit: limit,
    };
    props.onInAppMessage(
      data,
      res => onChatListSuccessCallBack(res, contact, userid),
      error => onChatListFailureCallBack(error),
    );
  };

  const onChatListSuccessCallBack = async (res, contact, userid) => {
    if (res?.message == 'Success') {
      let loadData = [...allChatListData, ...res?.data];
      var sortedData = loadData
        .filter(item => item != null && item != undefined && item != '')
        .sort(
          (a, b) =>
            new Date(b?.Last_Message_Time) - new Date(a?.Last_Message_Time),
        );
      setAllChatListData(sortedData);
      let loadDataUnread = [...unreadChatListData, ...res?.data];
      var unReadData = loadDataUnread.filter(
        item => item?.No_Of_Unread_Message_Count > 0,
      );
      unReadData = unReadData.sort(
        (a, b) =>
          new Date(b?.Last_Message_Time) - new Date(a?.Last_Message_Time),
      );
      setUnreadChatListData(unReadData);
      setDataCheckStatus(true);
      setPageCount(prev => prev + 1);
      if (res?.data.length < limit) {
        setLoad(false);
      } else {
        setLoad(true);
      }
      if (inAppId && firstTimeCall) {
        firstTimeCall = false;
        var findItem = res?.data.find(item => item?.INAPP_ID == inAppId);
        if (findItem) {
          findItem = {
            ...findItem,
            LOCAL_MOBILE_NO: contact,
            LOCAL_USER_ID: userid,
          };
          handleContactPress(findItem, '2');
        }
      }
    }
  };

  const onChatListFailureCallBack = error => {
    let msg = error;
    if (error == undefined || error == null) {
      msg = 'Something went wrong';
    }
    props.showErrorModal(msg, true);
  };

  const handleSearch = text => {
    setSearchQuery(text);
    if (text.trim().length == 10) {
      if (
        !VEHICLE_NUMBER_PATTERN.test(text) &&
        !VEHICLE_NUMBER_PATTERN1.test(text)
      ) {
        setError(VALID_VEHICLE_NO);
        setFilteredContacts([]);
        return;
      }

      setError('');
      const filteredData = searchListData.filter(item => {
        const vehicleNo = item?.VEHICLE_NUMBER;
        const text_data = text;
        if (vehicleNo) {
          if (vehicleNo?.toUpperCase().includes(text_data?.toUpperCase()))
            return -1;
        }
      });

      if (filteredData.length == 0) {
        setError('No record found');
      }

      setFilteredContacts(filteredData);
    }
    if (text === '') {
      setFilteredContacts([]);
      setError('');
    }
  };

  const createChat = contact => {
    const data = {
      MOBILE_NUMBER: mobileNo,
      TYPE: 'i',
      RECEIVER_USER_ID: contact?.USER_ID,
      VEHICLE_ID: contact?._id,
    };
    props.onInAppMessage(
      data,
      res => onChatCreateSuccessCallBack(res),
      error => onChatCreateFailureCallBack(error),
    );
  };

  const onChatCreateSuccessCallBack = async res => {
    if (res?.message == 'Success') {
      handleContactPress(res, '1');
    }
  };

  const onChatCreateFailureCallBack = error => {
    let msg = error;
    if (error == undefined || error == null) {
      msg = 'Something went wrong';
    }
    props.showErrorModal(msg, true);
  };

  const handleContactPress = (item, type) => {
    setSearchQuery('');
    setFilteredContacts([]);
    setError('');
    navigation.navigate('ChatMessages', {
      inAppId: type == '1' ? item?.INAPP_ID : item?.INAPP_ID,
      vehicleNumber:
        type == '1' ? item?.Vechicle_Number : item?.Vechicle_Number,
      profileImage: type == '1' ? item?.Profile_Image : item?.Profile_Image,
      receiverName: type == '1' ? item?.Receiver_Name : item?.Receiver_Name,
      receiverUserId:
        type == '1' ? item?.RECEIVER_USER_ID : item?.userStatusData?.USER_ID,
      blockUnblock: type == '1' ? 1 : item?.userStatusData?.BLOCK_STATUS,
      mobileNo: item?.LOCAL_MOBILE_NO ? item?.LOCAL_MOBILE_NO : mobileNo,
      userId: item?.LOCAL_USER_ID ? item?.LOCAL_USER_ID : userId,
    });
  };

  const renderContact = ({item}) => {
    const unreadBackgroundColor =
      item?.No_Of_Unread_Message_Count > 0
        ? 'rgba(47, 128, 237, 0.18)'
        : 'transparent';

    return (
      <>
        <TouchableOpacity
          style={[styles.contactItem, {backgroundColor: unreadBackgroundColor}]}
          onPress={() => handleContactPress(item, '2')}
          onLongPress={() => handleLongPress(item?.userStatusData)}>
          {item?.Profile_Image != null &&
          item?.Profile_Image != '' &&
          item?.Profile_Image != undefined ? (
            <Image
              source={{uri: 'data:image/jpeg;base64,' + item?.Profile_Image}}
              style={styles.contactAvatar}
            />
          ) : (
            <View style={styles.contactAvatarPlaceholder}>
              <Text style={[styles.contactAvatarText, {fontSize: 13}]}>
                {item?.Vechicle_Number}
              </Text>
            </View>
          )}
          <View style={styles.contactInfo}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.contactName}>
                {item?.Vechicle_Number
                  ? item?.Vechicle_Number
                  : item?.Receiver_Name}
                {item?.NOTIFICATION_STATUS == 0 && (
                  <FontAwesome5 name="volume-mute" size={18} color="#5DA7FE" />
                )}
              </Text>

              <View style={styles.messageInfo}>
                <Text style={styles.lastMessageTime}>
                  {formatChatTimestamp(item?.Last_Message_Time)}
                </Text>
              </View>
            </View>

            <Text style={styles.lastMessage} numberOfLines={1}>
              {item?.Last_Message}
            </Text>
          </View>

          {item?.No_Of_Unread_Message_Count > 0 && (
            <View style={styles.unreadBubble}>
              <Text style={styles.unreadCount}>
                {item?.No_Of_Unread_Message_Count}
              </Text>
            </View>
          )}
          {showItemCheckBox && (
            <TouchableOpacity
              style={styles.checkBoxStyle}
              onPress={() => onCheckBoxClick(item?.userStatusData)}
              activeOpacity={0.5}>
              {item?.userStatusData?.INAPP_ID == itemSelected?.INAPP_ID ? (
                <MaterialCommunityIcons
                  size={20}
                  s
                  name="checkbox-marked"
                  color={'#5DA7FE'}
                  style={styles.icon}
                />
              ) : (
                <MaterialCommunityIcons
                  size={20}
                  name="checkbox-blank-outline"
                  color={'#000'}
                  style={styles.icon}
                />
              )}
            </TouchableOpacity>
          )}
        </TouchableOpacity>
        <View style={styles.horizontal_line} />
      </>
    );
  };

  const formatChatTimestamp = timestamp => {
    const messageDate = moment(timestamp);
    const today = moment();

    if (messageDate.isSame(today, 'day')) {
      return messageDate.format('h:mm A');
    } else if (messageDate.isSame(today.clone().subtract(1, 'days'), 'day')) {
      return 'Yesterday';
    } else {
      return messageDate.format('DD/MM/YYYY');
    }
  };

  const onCheckBoxClick = item => {
    if (itemSelected?.INAPP_ID == item?.INAPP_ID) {
      setItemSelected(null);
    } else {
      setItemSelected(item);
    }
  };

  const onDeleteClick = () => {
    if (showItemCheckBox) {
      if (itemSelected) {
        setDeleteModalVisible(true);
      } else {
        setShowItemCheckBox(false);
      }
    } else {
      setShowItemCheckBox(true);
    }
  };
  const handleLongPress = item => {
    setShowItemCheckBox(true);
    setItemSelected(item);
    setDeleteModalVisible(true);
  };

  const renderDeleteModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={deleteModalVisible}
        onRequestClose={() => {
          setDeleteModalVisible(!deleteModalVisible);
        }}>
        <View style={styles.modalContainer2}>
          <View style={styles.modalContent2}>
            <View style={styles.middle}>
              <Text style={styles.modalTitle}>{'Delete '}</Text>
              <Text style={styles.modalText}>{`Delete this chat.`}</Text>
            </View>
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => closeDeleteOption()}>
                <Text style={styles.modalCancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete()}>
                <Text style={styles.modalActionButtonText}>{'Delete'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const closeDeleteOption = () => {
    setDeleteModalVisible(false);
    setShowItemCheckBox(false);
    setItemSelected(null);
  };

  const handleDelete = () => {
    var data = {
      MOBILE_NUMBER: mobileNo,
      TYPE: 'deleteInApp',
      INAPP_ID: itemSelected?.INAPP_ID,
      ACTION_USER_ID: itemSelected?.USER_ID,
    };
    props.onInAppMessage(
      data,
      res => onDeleteChatSuccessCallBack(res),
      error => onDeleteChatFailureCallBack(error),
    );
  };

  const onDeleteChatSuccessCallBack = async res => {
    closeDeleteOption();
    setAllChatListData(item =>
      item.filter(iItem => iItem.INAPP_ID != itemSelected?.INAPP_ID),
    );
    setUnreadChatListData(item =>
      item.filter(iItem => iItem.INAPP_ID != itemSelected?.INAPP_ID),
    );
  };

  const onDeleteChatFailureCallBack = error => {
    let msg = error;
    if (error == undefined || error == null) {
      msg = 'Something went wrong';
    }
    props.showErrorModal(msg, true);
  };

  const onEndReached = () => {
    if (load) {
      getChatList();
    }
  };

  return (
    <View style={styles.container}>
      <CustomStatusBar
        backgroundColor={Color.colorbackground}
        barStyle="dark-content"
      />

      {renderDeleteModal()}
      <View style={styles.header}>
        <Text style={styles.headerText}>Messages</Text>
        <TouchableOpacity onPress={() => onDeleteClick()} activeOpacity={0.5}>
          <MaterialCommunityIcons
            name="delete"
            color={itemSelected ? '#5DA7FE' : Color.colorBlack}
            size={25}
          />
        </TouchableOpacity>
      </View>

      <Searchbar
        placeholder="Search with vehicle number"
        placeholderTextColor={'#8D8CAB'}
        value={searchQuery}
        onChangeText={text => handleSearch(text)}
        style={styles.searchBarStyle}
        clearIcon="close"
        inputStyle={styles.input}
        iconColor="#308FFF"
        maxLength={10}
        autoCapitalize="characters"
      />

      {searchQuery && (
        <View style={styles.searchModalView}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contactsList}>
            {error && <Text style={styles.searchResultError}>{error}</Text>}
            {filteredContacts.map(contact => (
              <TouchableOpacity
                key={contact._id}
                style={styles.contactItem}
                onPress={() => createChat(contact)}>
                {contact.thumbnailPath ? (
                  <View style={{flexDirection: 'column'}}>
                    <Image
                      source={{uri: contact.thumbnailPath}}
                      style={styles.contactAvatar}
                    />
                    <Image
                      source={Images.small_logo}
                      style={styles.smalllogo}
                    />
                  </View>
                ) : (
                  <View style={{flexDirection: 'column'}}>
                    <View style={styles.contactAvatarPlaceholder}>
                      <Text style={styles.contactAvatarText}>
                        {contact.VEHICLE_NUMBER}
                      </Text>
                    </View>
                    <Image
                      source={Images.small_logo}
                      style={styles.smalllogo}
                    />
                  </View>
                )}
                <View
                  style={{
                    flexDirection: 'column',
                    marginLeft: '7%',
                  }}>
                  <Text style={styles.contactName}>
                    {contact.VEHICLE_NUMBER}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      <View style={styles.containers}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'allChats' ? styles.activeTab : styles.inactiveTab,
          ]}
          onPress={() => setActiveTab('allChats')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'allChats'
                ? styles.activeText
                : styles.inactiveText,
            ]}>
            All Chats
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'unread' ? styles.activeTab : styles.inactiveTab,
          ]}
          onPress={() => setActiveTab('unread')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'unread' ? styles.activeText : styles.inactiveText,
            ]}>
            Unread
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={activeTab === 'unread' ? unreadChatListData : allChatListData}
        renderItem={renderContact}
        keyExtractor={item => item?._id}
        contentContainerStyle={styles.flatList}
        onEndReachedThreshold={0.01}
        onEndReached={() => onEndReached()}
      />

      {dataCheckStatus &&
      activeTab === 'unread' &&
      unreadChatListData.length == 0 ? (
        <Image source={Images.noRecordFound} style={styles.noRecordFound} />
      ) : null}

      {dataCheckStatus &&
      activeTab === 'allChats' &&
      allChatListData.length == 0 ? (
        <Image source={Images.noRecordFound} style={styles.noRecordFound} />
      ) : null}
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
    showErrorModal: (message, isFromError) =>
      dispatch(commonActions.showErrorModal(message, isFromError)),
    hideErrorModal: () => dispatch(commonActions.hideErrorModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);
