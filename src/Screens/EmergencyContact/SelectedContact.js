import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import Validation from '../../Components/Validation';
import CustomLoader from '../../Components/CustomLoader';
import {styles} from '../../Styles/EmergencyContact/SelectedContactStyles';
import * as commonActions from '../../redux/actions/commonActions';
import * as userActions from '../../redux/actions/userActions';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import CustomStatusBar from '../../Components/CustomStatusBar';
import {storeData} from '../../utils/helperFunctions';

const SelectedContacts = props => {
  const navigation = useNavigation();
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [loadingVisibility, setLoadingVisibility] = useState(false);
  const [validationVisible, setValidationVisible] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');
  const [mobileNo, setMobileNo] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      let {user} = props.userData;
      setMobileNo(user?.MOBILE_NUMBER);
      getContactList(user?.MOBILE_NUMBER);
    } catch (error) {
    }
  };

  const getContactList = async contact => {
    const data = {
      MOBILE_NUMBER: mobileNo == null ? contact : mobileNo,
      TYPE: 'l',
    };
    props.onAddContact(
      data,
      res => onContactListSuccessCallBack(res),
      error => onContactListFailureCallBack(error),
    );
  };

  const onContactListSuccessCallBack = async res => {
    setSelectedContacts(res?.data);
    const data = {...props.userData, eContact: res?.data};
    storeData('userData', data)
      .then(value => {
        props.saveProfileData(data);
      })
      .catch(error => {
      });
  };

  const onContactListFailureCallBack = error => {
    let msg = error;
    if (error == undefined || error == null) {
      msg = 'Something went wrong';
    }
    props.showErrorModal(msg, true);
  };

  const removeContact = contactToRemove => {
    const data = {
      ID: contactToRemove?._id,
      MOBILE_NUMBER: mobileNo,
      TYPE: 'd',
    };
    props.onAddContact(
      data,
      res => onContactDelSuccessCallBack(res),
      error => onContactDelFailureCallBack(error),
    );
  };

  const onContactDelSuccessCallBack = async res => {
    getContactList();
  };

  const onContactDelFailureCallBack = error => {
    let msg = error;
    if (error == undefined || error == null) {
      msg = 'Something went wrong';
    }
    props.showErrorModal(msg, true);
  };

  return (
    <View style={styles.container}>
      <CustomStatusBar backgroundColor={'#efefef'} barStyle="dark-content" />
      <CustomLoader visible={loadingVisibility} />
      <Validation
        visible={validationVisible}
        message={validationMessage}
        onRetry={() => {
          setValidationVisible(false);
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.addYourVehicleTypo}>Add Emergency Contact</Text>
        <Text style={styles.addYourVehicleTypo1}>Emergency Contacts</Text>
        <View style={{marginTop: '5%'}}>
          {selectedContacts.length != 0 ? (
            selectedContacts.map((item, index) => {
              return (
                <View key={index} style={styles.itemView}>
                  <FontAwesome5
                    name="user"
                    size={30}
                    color="black"
                    style={{marginRight: '5%'}}
                  />
                  <View style={styles.itemMiddleView}>
                    <Text style={styles.itemNameText}>{item.NAME}</Text>
                    <Text style={styles.itemNoText}>
                      {item.E_MOBILE_NUMBER}
                    </Text>
                  </View>
                  <TouchableOpacity onPress={() => removeContact(item)}>
                    <FontAwesome6
                      name="x"
                      size={15}
                      color="black"
                      style={{marginLeft: '5%'}}
                    />
                  </TouchableOpacity>
                </View>
              );
            })
          ) : (
            <View style={styles.noContactView}>
              <Text style={styles.noContactText}>No contact added</Text>
            </View>
          )}
        </View>
        {selectedContacts.length < 2 ? (
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: '3%',
            }}
            onPress={() => navigation.replace('AddContacts')}>
            <FontAwesome6
              name="plus"
              size={20}
              color="grey"
              style={{marginLeft: '5%'}}
            />
            <Text style={styles.addText}>
              {selectedContacts.length == 0
                ? 'Add Contact'
                : 'Add Another Contact'}
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.limitView}>
            <Text style={styles.limitText}>{'Contact limit reached'}</Text>
            <Entypo name="dot-single" color="red" size={40} />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const mapStateToProps = state => {
  return {userData: state.user.userData};
};

const mapDispatchToProps = dispatch => {
  return {
    onAddContact: (data, successCallBack, failureCallBack) =>
      dispatch(
        userActions.onAddContact(data, successCallBack, failureCallBack),
      ),
    saveProfileData: data => dispatch(userActions.saveProfileData(data)),
    showErrorModal: (message, isFromError) =>
      dispatch(commonActions.showErrorModal(message, isFromError)),
    hideErrorModal: () => dispatch(commonActions.hideErrorModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectedContacts);
