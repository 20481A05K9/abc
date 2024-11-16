import React, {useState, useEffect} from 'react';
import {
  Text,
  TouchableHighlight,
  View,
  TextInput,
  SectionList,
  Platform,
  Alert,
  Linking,
} from 'react-native';
import Contacts from 'react-native-contacts';
import {styles} from '../../Styles/EmergencyContact/Addcontactstyles';
import {useNavigation} from '@react-navigation/native';
import RNExitApp from 'react-native-kill-app';
import {connect, useDispatch} from 'react-redux';
import Validation from '../../Components/Validation';
import CustomLoader from '../../Components/CustomLoader';
import * as commonActions from '../../redux/actions/commonActions';
import * as userActions from '../../redux/actions/userActions';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import CustomStatusBar from '../../Components/CustomStatusBar';

const AddContacts = props => {
  const navigation = useNavigation();
  const [contacts, setContacts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [mobileNo, setMobileNo] = useState(null);
  const [loadingVisibility, setLoadingVisibility] = useState(false);
  const [validationVisible, setValidationVisible] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');

  useEffect(() => {
    getData();
    checkPermission();
  }, []);

  const getData = async () => {
    try {
      const {user} = props.userData;
      setMobileNo(user?.MOBILE_NUMBER);
    } catch (error) {
    }
  };

  const checkPermission = async () => {
    let isContactPermitted = await requestContactPermission();
    if (isContactPermitted) {
      setLoadingVisibility(true);
      fetchContacts();
    } else {
      let msg =
        Platform.OS == 'ios'
          ? "Click on 'Contacts' then check Full Access"
          : "'App Permissions' and then on 'Contacts' to allow access.";
      Alert.alert(
        'Hold!',
        "Without contact access we will not be able to detect your contact list.\n\nPlease tap on 'Settings' then " +
          msg,
        [
          {
            text: 'Cancel',
            onPress: () => navigation.goBack(),
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

  const requestContactPermission = async () => {
    let permission;

    if (Platform.OS === 'ios') {
      permission = PERMISSIONS.IOS.CONTACTS;
    } else {
      permission = PERMISSIONS.ANDROID.READ_CONTACTS;
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

  const fetchContacts = async () => {
    try {
      var allContacts = await Contacts.getAll();
      if (Platform.OS == 'ios') {
        allContacts = allContacts.map(item => {
          let mergeName = mergeNames(item);
          return {...item, displayName: mergeName};
        });
      }
      const sortedContacts = allContacts.sort((a, b) =>
        a.displayName?.localeCompare(b.displayName),
      );
      setContacts(sortedContacts);
      setLoadingVisibility(false);
    } catch (error) {
      setLoadingVisibility(false);
    }
  };

  const mergeNames = person => {
    let firstName = person?.givenName || '';
    let middleName = person?.middleName || '';
    let lastName = person?.familyName || '';

    const fullName = [firstName, middleName, lastName]
      .filter(name => name !== '')
      .join(' ');

    return fullName || '';
  };

  const selectContact = async contact => {
    const data = {
      MOBILE_NUMBER: mobileNo,
      E_MOBILE_NUMBER: contact.phoneNumbers[0]?.number,
      NAME: contact?.displayName,
      TYPE: 'i',
    };
    props.onAddContact(
      data,
      res => onAddContactSuccessCallBack(res),
      error => onAddContactFailureCallBack(error),
    );
  };

  const onAddContactSuccessCallBack = async res => {
    navigation.replace('SelectedContact');
  };

  const onAddContactFailureCallBack = error => {
    let msg = error;
    if (error == undefined || error == null) {
      msg = 'Something went wrong';
    }
    props.showErrorModal(msg, true);
  };

  const renderContactItem = ({item}) => (
    <TouchableHighlight
      underlayColor="transparent"
      onPress={() => selectContact(item)}>
      <View
        style={[
          styles.contactItem,
          selectedContacts.some(c => c.recordID === item.recordID) &&
            styles.selectedContact,
        ]}>
        <View style={styles.contactDetails}>
          <Text style={styles.contactName}>{item.displayName}</Text>
          <Text style={styles.contactNumber}>
            {item.phoneNumbers && item.phoneNumbers[0]?.number}
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  );

  const renderSectionHeader = ({section}) => (
    <Text style={styles.sectionHeader}>{section.title}</Text>
  );

  const groupContacts = contacts => {
    const groupedContacts = contacts.reduce((acc, contact) => {
      const firstLetter = contact.displayName[0].toUpperCase();
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      acc[firstLetter].push(contact);
      return acc;
    }, {});
    const sections = Object.keys(groupedContacts).map(key => ({
      title: key,
      data: groupedContacts[key],
    }));
    sections.sort((a, b) => a.title.localeCompare(b.title));
    return sections;
  };

  const filteredContacts = contacts.filter(
    contact =>
      contact.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.phoneNumbers[0]?.number.includes(searchTerm),
  );

  return (
    <View style={styles.contact}>
      <CustomStatusBar backgroundColor={'#efefef'} barStyle="dark-content" />
      <CustomLoader visible={loadingVisibility} />
      <Validation
        visible={validationVisible}
        message={validationMessage}
        onRetry={() => {
          setValidationVisible(false);
        }}
      />
      <Text style={styles.title}>Contacts</Text>
      <View style={styles.searchBar}>
        <TextInput
          style={[
            styles.searchInput,
            Platform.OS == 'ios' && {marginTop: '3%'},
          ]}
          placeholder="Search for contacts"
          onChangeText={text => setSearchTerm(text)}
          placeholderTextColor={'rgba(0, 0, 0, 0.65)'}
        />
      </View>
      <SectionList
        sections={groupContacts(filteredContacts)}
        keyExtractor={item => item.recordID}
        renderItem={renderContactItem}
        renderSectionHeader={renderSectionHeader}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
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
    showErrorModal: (message, isFromError) =>
      dispatch(commonActions.showErrorModal(message, isFromError)),
    hideErrorModal: () => dispatch(commonActions.hideErrorModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddContacts);
