import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Color, FontFamily, FontSize} from '../../../global';
import {useNavigation} from '@react-navigation/native';
import NavigationService from '../../Navigation/NavigationService';
import RNExitApp from 'react-native-kill-app';
import AntDesign from 'react-native-vector-icons/AntDesign';
import RNBiometrics from 'react-native-simple-biometrics';

export default LockScreen = props => {
  const navigation = useNavigation();
  const {messageRes} = props.route.params || {};
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    checkLockAvailability();
  }, []);

  const checkLockAvailability = async () => {
    try {
      await RNBiometrics.requestBioAuth(
        'Unlock B-Alert',
        'Enter phone screen lock pattern, PIN, password or fingerprint',
      );
      setVisible(false);
      navigateToScreen();
    } catch (error) {
    }
  };

  const navigateToScreen = () => {
    if (messageRes != null) {
      const data = messageRes?.notification?.data;
      let Link = data?.redirect_to;
      if (Link.includes('balert://app')) {
        const route = Link.replace(/.*?:\/\//g, '');
        const routeName = route.split('/')[1];

        if (routeName === 'tripstart') {
          navigation.replace('BottomTabNavigation'),
            setTimeout(() => {
              NavigationService.navigate('TripStart');
            }, 1200);
        } else if (routeName === 'Spin') {
          navigation.replace('BottomTabNavigation'),
            setTimeout(() => {
              NavigationService.navigate('SpinWheel');
            }, 1200);
        } else if (routeName === 'addVehicle') {
          navigation.replace('BottomTabNavigation'),
            setTimeout(() => {
              NavigationService.navigate('Addvehicle');
            }, 1200);
        } else if (routeName === 'fastag') {
          navigation.replace('BottomTabNavigation'),
            setTimeout(() => {
              NavigationService.navigate('FasTag');
            }, 1200);
        } else if (routeName === 'inapp') {
          navigation.replace('BottomTabNavigation'),
            setTimeout(() => {
              NavigationService.navigate('ChatList', {
                inAppId: data?.inAppId,
              });
            }, 1200);
        } else {
          navigation.replace('BottomTabNavigation');
        }
      } else {
        navigation.replace('BottomTabNavigation'), Linking.openURL(Link);
      }
    } else {
      navigation.replace('BottomTabNavigation');
    }
  };

  return (
    <>
      <Modal
        visible={visible}
        animationType={'slide'}
        transparent={false}
        onRequestClose={() => RNExitApp.exitApp()}>
        <ScrollView contentContainerStyle={{flex: 1}}>
          <View style={styles.MSGAlert_Main_View_Style}>
            <AntDesign size={35} color={Color.colorOrange} name={'lock'} />
            <Text style={styles.titleText}>Authentication Required</Text>
            <Text
              style={
                styles.titleText1
              }>{`authentication required to\naccess B-Alert`}</Text>
            <View style={styles.bottomView}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => checkLockAvailability()}
                style={styles.useFingerTO}>
                <Text style={styles.useFingerText}>Unlock now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  MSGAlert_Main_View_Style: {
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.colorWhite,
  },
  titleText: {
    color: Color.colorGray,
    fontSize: 17,
    fontFamily: FontFamily.montserratSemiBold,
    marginTop: '10%',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  titleText1: {
    color: Color.colorBlack,
    fontSize: 17,
    fontFamily: FontFamily.montserratSemiBold,
    marginTop: '3%',
    marginHorizontal: '5%',
    textAlign: 'center',
  },
  codeFieldRoot: {
    marginTop: '10%',
    width: wp('65%'),
  },
  cellRoot: {
    width: wp('13%'),
    height: wp('13%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Color.Inputborder,
    borderRadius: 8,
  },
  focusCell: {
    borderWidth: 2,
    borderColor: Color.colorWhite,
  },
  cellText: {
    textAlign: 'center',
    fontSize: FontSize.size_25,
    fontFamily: FontFamily.montserratMedium,
    color: Color.colorBlack,
  },
  wrongPinText: {
    color: Color.colorCancelled,
    fontSize: 15,
    fontFamily: FontFamily.montserratSemiBold,
    marginTop: '5%',
  },
  forgatText: {
    color: Color.colorDimgray,
    fontSize: 15,
    fontFamily: FontFamily.montserratSemiBold,
    marginTop: '5%',
  },
  bottomView: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: '5%',
  },
  useFingerTO: {
    marginVertical: '5%',
    backgroundColor: Color.colorOrange,
    paddingHorizontal: '5%',
    paddingVertical: '4%',
    width: wp('80%'),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  useFingerText: {
    color: Color.colorWhite,
    fontSize: 15,
    fontFamily: FontFamily.montserratSemiBold,
  },
});
