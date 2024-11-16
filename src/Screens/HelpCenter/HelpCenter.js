import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {Images} from '../../../assets';
import {styles} from '../../Styles/HelpCenter/HelpCenterStyles';
import CustomLoader from '../../Components/CustomLoader';
import Validation from '../../Components/Validation';
import {connect} from 'react-redux';
import * as commonActions from '../../redux/actions/commonActions';
import * as userActions from '../../redux/actions/userActions';
import CustomStatusBar from '../../Components/CustomStatusBar';
import { showError } from '../../utils/helperFunctions';

const HelpCenter = props => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [loadingVisibility, setLoadingVisibility] = useState(false);
  const [validationVisible, setValidationVisible] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');
  const [helpServiceListData, setHelpServiceListData] = useState([]);
  const [mobileNo, setMobileNo] = useState(null);
  var mobileNoLocal = null;
  const [isModalVisible, setModalVisible] = useState(false);
  const [requestType, setRequestType] = useState('');
  const [messageText, setMessageText] = useState('');

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const {user} = props.userData;
      setMobileNo(user?.MOBILE_NUMBER);
      mobileNoLocal = user?.MOBILE_NUMBER;
      getHelpServiceList();
    } catch (error) {
    }
  };

  const getHelpServiceList = () => {
    props.onHelpServiceList(
      res => onHelpServiceListSuccessCallBack(res),
      error => onHelpServiceListFailureCallBack(error),
    );
  };

  const onHelpServiceListSuccessCallBack = async res => {
    setHelpServiceListData(res?.data);
  };

  const onHelpServiceListFailureCallBack = error => {
    let msg = error;
    if (error == undefined || error == null) {
      msg = 'Something went wrong';
    }
    props.showErrorModal(msg, true);
  };

  const onPressSubmit = () => {
    if (messageText == '' || messageText.trim().length == 0) {
      showError('Please type your queries')
      return;
    }
    const data = {
      MOBILE_NUMBER: mobileNo,
      REQUEST_TYPE: requestType,
      MESSAGE: messageText,
      TYPE: 'i',
    };
    props.onHelpService(
      data,
      res => onHelpServiceSuccessCallBack(res),
      error => onHelpServiceFailureCallBack(error),
    );
  };

  const onHelpServiceSuccessCallBack = async res => {
    setModalVisible(false);
    setMessageText('');
    navigation.navigate('SuccessFail', {name: 'HELPCENTER', status: 1});
  };

  const onHelpServiceFailureCallBack = error => {
    navigation.navigate('SuccessFail', {name: 'HELPCENTERFAIL', status: 0});
  };

  const isSubmitEnabled = () => {
    return messageText.trim().length != 0;
  };

  const renderEnquiryModal = () => {
    return (
      <Modal
        visible={isModalVisible}
        animationIn="fadeInLeft"
        animationOut="fadeInRight"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}>
        <View
          style={{
            flex: 1,
            width: '100%',
            height: '100%',
            justifyContent: 'flex-end',
            backgroundColor: 'transparent',
          }}>
          <View style={styles.view6}>
            <View style={styles.style1} />
            <Text style={styles.logoutxt}>Enquiry</Text>
            <Text style={styles.belowtext}>
              Write a comment, to get in touch.
            </Text>
            <TextInput
              style={[styles.child]}
              placeholder="Comments.."
              multiline={true}
              value={messageText}
              onChangeText={text => setMessageText(text)}
              placeholderTextColor={'rgba(0, 0, 0, 0.65)'}
            />
            <TouchableOpacity
              style={[
                styles.insertBtnTO,
                !isSubmitEnabled() && styles.disabledContinue,
              ]}
              activeOpacity={0.7}
              onPress={isSubmitEnabled() ? onPressSubmit : undefined}
              disabled={!isSubmitEnabled()}>
              <Text style={styles.insertBtnText}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
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
      <CustomLoader visible={loadingVisibility} />
      <Validation
        visible={validationVisible}
        message={validationMessage}
        onRetry={() => {
          setValidationVisible(false);
        }}
      />
      {renderEnquiryModal()}
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.helptext}>Help Center</Text>
        <View style={styles.innerView}>
          <View style={styles.cardRoundView}>
            <View style={styles.cardRoundViewInn} />
          </View>
          <View style={styles.cardRoundView1}>
            <View style={styles.cardRoundViewInn1} />
          </View>
          <View style={styles.cardInnItem}>
            <View style={styles.cardInnLeft}>
              <Text style={styles.helpcenter}>Help Center</Text>
              <Text style={styles.innertext}>Have questions? or</Text>
              <Text style={styles.innertext3}>
                Enquiries<Text style={styles.innertext1}>. We love to</Text>
              </Text>
              <Text style={styles.innertext2}>Answer.</Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setRequestType('Others');
                  setModalVisible(true);
                }}
                style={{marginTop: '5%'}}>
                <LinearGradient
                  style={styles.opacitytxt}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={['#1F735C', '#1CBF73']}>
                  <Text style={styles.plantxt}>{`Fill the form >`}</Text>
                </LinearGradient>
              </TouchableOpacity>
              <Text style={styles.balert}>www.Balert.in</Text>
            </View>
          </View>
          <Image source={Images.helpimage} style={styles.image2} />
        </View>
        <Text style={styles.helpQ}>Help?</Text>
        <View style={styles.topview}>
          {helpServiceListData.map(item => (
            <View key={item._id}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  setRequestType(item.NAME);
                  setModalVisible(true);
                }}>
                <Image
                  source={
                    item.NAME == 'Billing'
                      ? Images.billing
                      : item.NAME == 'Services'
                      ? Images.services
                      : item.NAME == 'Others'
                      ? Images.others
                      : Images.saftey
                  }
                  style={styles.billingImage}
                />
                <Text style={styles.billing}>{item.NAME}</Text>
              </TouchableOpacity>
            </View>
          ))}
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
    onHelpServiceList: (successCallBack, failureCallBack) =>
      dispatch(userActions.onHelpServiceList(successCallBack, failureCallBack)),
    onTripList: (data, successCallBack, failureCallBack) =>
      dispatch(userActions.onTripList(data, successCallBack, failureCallBack)),
    onHelpService: (data, successCallBack, failureCallBack) =>
      dispatch(
        userActions.onHelpService(data, successCallBack, failureCallBack),
      ),
    showErrorModal: (message, isFromError) =>
      dispatch(commonActions.showErrorModal(message, isFromError)),
    hideErrorModal: () => dispatch(commonActions.hideErrorModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HelpCenter);
