import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  Text,
  Linking,
} from 'react-native';
import {Images} from '../../../assets';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Color, FontFamily, FontSize} from '../../../global';
import NavigationService from '../../Navigation/NavigationService';
import RNBiometrics from 'react-native-simple-biometrics';
import CustomStatusBar from '../../Components/CustomStatusBar';
import notifee from '@notifee/react-native';
import {getData} from '../../utils/helperFunctions';

const SplashScreen = props => {
  const navigation = useNavigation();

  useEffect(() => {
    initUser();
  }, []);

  const initUser = async () => {
    try {
      let data = await getData('userData');
      data = JSON.parse(data);
      if (!!data) {
        checkNotification(data);
      } else {
        setTimeout(() => {
          navigation.replace('Signup');
        }, 3000);
      }
    } catch (error) {
    }
  };

  const checkNotification = async uData => {
    const initialNotification = await notifee.getInitialNotification();
    navigationBody(initialNotification, uData);
  };

  const navigationBody = async (messageRes, uData) => {
    let checkLockEnable = uData?.user?.LOCK_PIN;
    checkLockEnable = checkLockEnable == '0' ? false : true;
    let checkPhoneLock = await RNBiometrics.canAuthenticate();
    setTimeout(() => {
      AsyncStorage.getItem('token', (error, result) => {
        if (result) {
          if (checkLockEnable && checkPhoneLock) {
            navigation.replace('LockScreen', {messageRes});
          } else {
            navigateToScreen(messageRes);
          }
        } else {
          navigation.replace('Signup');
        }
      });
    }, 3000);
  };

  const navigateToScreen = messageRes => {
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
    <View style={styles.container}>
      <CustomStatusBar
        backgroundColor={Color.colorbackground}
        barStyle="dark-content"
      />
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.topView}>
          <Image source={Images.logofig} style={styles.logoImage} />
          <Text style={styles.primarytxt}>Stay safe, wherever you go</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topView: {
    marginTop: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    alignContent: 'center',
  },
  logoImage: {
    width: wp('50%'),
    height: wp('18%'),
    resizeMode: 'stretch',
  },
  primarytxt: {
    fontFamily: FontFamily.montserratMedium,
    fontSize: FontSize.size_18,
    color: Color.colorBlack,
    marginTop: '80%',
  },
});

export default SplashScreen;
