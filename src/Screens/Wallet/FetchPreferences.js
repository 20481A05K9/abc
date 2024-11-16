import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Images} from '../../../assets';
import {styles} from '../../Styles/Wallet/FetchPreferencesStyles';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import * as commonActions from '../../redux/actions/commonActions';
import * as userActions from '../../redux/actions/userActions';
import CustomStatusBar from '../../Components/CustomStatusBar';

const FetchPreferences = props => {
  const navigation = useNavigation();
  const [preferenceData, setPreferenceData] = useState([]);

  useEffect(() => {
    onFetchPreData();
  }, []);

  const onFetchPreData = () => {
    const {user} = props.userData;
    const data = {
      MOBILE_NUMBER: user?.MOBILE_NUMBER,
      TYPE: 'FETCH_PREFERENCES',
    };
    props.onPpi(
      data,
      res => onPpiPreferencesSuccessCallBack(res),
      error => onPpiPreferencesFailureCallBack(error),
    );
  };

  const onPpiPreferencesSuccessCallBack = async res => {
    setPreferenceData(res?.data);
  };

  const onPpiPreferencesFailureCallBack = error => {
    let msg = error;
    if (error == undefined || error == null) {
      msg = 'Something went wrong';
    }
    props.showErrorModal(msg, true);
  };

  return (
    <View style={styles.container}>
      <CustomStatusBar backgroundColor={'#efefef'} barStyle="dark-content" />
      <Text style={styles.head}>My Preferences</Text>
      <ImageBackground source={Images.blueback} style={styles.imageback}>
        <Image source={Images.fetchpref} style={styles.image1} />
      </ImageBackground>
      <View style={styles.bottomcontainer}>
        <Image source={Images.bluebackvertical} style={styles.image2} />
        <View style={{alignItems: 'center', justifyContent: 'space-evenly'}}>
          <Text style={styles.bottomtxt1}>Transaction type</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}>
            <Image source={Images.ppcartcard} style={styles.image3} />
            <Text numberOfLines={2} style={styles.bottomtxt2}>
              {preferenceData.map(item=>'1')}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('SetPreferences')}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#F9A738', '#FEE62A']}
              style={styles.linearGradient}>
              <Text style={styles.buttontxt}>Change preferences</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(FetchPreferences);
