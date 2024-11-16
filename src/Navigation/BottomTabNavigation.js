import {View, Text, Platform, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import WalletHome from '../Screens/Wallet/WalletHome';
import SpinWheel from '../Screens/SpinWheel/SpinWheel';
import HelpCenter from '../Screens/HelpCenter/HelpCenter';
import Profile from '../Screens/Profile/Profile';
import {Color, FontFamily} from '../../global';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import DashBoard from '../Screens/Dashboard/DashBoard';
import WalletRegistration from '../Screens/Wallet/WalletRegistration';
import {useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import {getData} from '../utils/helperFunctions';
import {useIsFocused} from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const DATA = [
  {
    id: 1,
    name: 'SpinWheel',
    component: SpinWheel,
    label: 'Spin Wheel',
    icon: 'ferris-wheel',
    iconType: 'MaterialCommunityIcons',
  },
  {
    id: 2,
    name: 'WalletRegistration',
    component: WalletRegistration,
    label: 'Wallet',
    icon: 'wallet',
    iconType: 'FontAwesome6',
  },
  {
    id: 3,
    name: 'DashBoard',
    component: DashBoard,
    label: 'Home',
    icon: 'home',
    iconType: 'Foundation',
  },
  {
    id: 4,
    name: 'Helpcenter',
    component: HelpCenter,
    label: 'Help Center',
    icon: 'info-circle',
    iconType: 'FontAwesome5',
  },
  {
    id: 5,
    name: 'Profile',
    component: Profile,
    label: 'Profile',
    icon: 'user-large',
    iconType: 'FontAwesome6',
  },
];

export default BottomTabNavigation = () => {
  const userData = useSelector(state => state.user.userData);
  const isFocused = useIsFocused();
  const [tabScreensData, setTabScreensData] = useState(DATA);

  useEffect(() => {
    if (userData) {
      onUserData(userData);
    } else {
      initData();
    }
  }, [isFocused]);

  const initData = async () => {
    try {
      let data = await getData('userData');
      data = JSON.parse(data);
      if (!!data) {
        onUserData(data);
      }
    } catch (error) {
    }
  };

  const onUserData = data => {
    const {userPPI} = data;
    let checkPpiStatus = false;
    if (userPPI) {
      if (userPPI != null && userPPI != undefined && userPPI != '') {
        checkPpiStatus = true;
      }
    }
    if (checkPpiStatus) {
      const updatedData = tabScreensData.map(item =>
        item.id === 2
          ? {...item, name: 'WalletHome', component: WalletHome}
          : item,
      );
      setTabScreensData(updatedData);
    }
  };

  return (
    <Tab.Navigator
      initialRouteName="DashBoard"
      backBehavior={'initialRoute'}
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: styles.tabBarLabelStyle,
        tabBarStyle: styles.tabBarStyle,
      }}>
      {tabScreensData.map((screen, index) => (
        <Tab.Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
          options={{
            tabBarLabel: ({focused, color}) => (
              <Text
                style={[
                  styles.tabBarLabel,
                  {
                    color: focused ? 'transparent' : 'rgba(0, 0, 0, 0.5)',
                  },
                ]}>
                {screen.label}
              </Text>
            ),
            tabBarIcon: ({focused}) => {
              return (
                <View style={focused && styles.tabBarIconMianView}>
                  <View style={focused && styles.tabBarIconInnerView}>
                    {screen.iconType === 'Foundation' ? (
                      <Foundation
                        name={screen.icon}
                        size={focused ? 27 : 24}
                        color={focused ? 'white' : '#9DB2CE'}
                      />
                    ) : screen.iconType === 'FontAwesome6' ? (
                      <FontAwesome6
                        name={screen.icon}
                        size={focused ? 25 : 21}
                        color={focused ? 'white' : '#9DB2CE'}
                      />
                    ) : screen.iconType === 'FontAwesome5' ? (
                      <FontAwesome5
                        name={screen.icon}
                        size={focused ? 25 : 21}
                        color={focused ? 'white' : '#9DB2CE'}
                      />
                    ) : (
                      <MaterialCommunityIcons
                        name={screen.icon}
                        size={focused ? 25 : 21}
                        color={focused ? 'white' : '#9DB2CE'}
                      />
                    )}
                  </View>
                </View>
              );
            },
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarLabelStyle: {
    fontSize: 8,
    color: 'black',
    fontFamily: FontFamily.montserratMedium,
  },
  tabBarStyle: {
    position: 'absolute',
    height: '7%',
    borderRadius: 99,
    backgroundColor: 'white',
    marginHorizontal: '3%',
    marginBottom: Platform.OS == 'android' ? '3%' : '5%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
  tabBarLabel: {
    fontSize: 8.5,
    fontFamily: FontFamily.montserratMedium,
    textAlign: 'center',
    marginBottom: Platform.OS == 'android' ? '10%' : '-20%',
    marginLeft: '2%',
  },
  tabBarIconMianView: {
    top: Platform.OS === 'android' ? '-40%' : '-40%',
    width: Platform.OS == 'android' ? wp('15%') : wp('15%'),
    height: Platform.OS == 'android' ? wp('15%') : wp('15%'),
    borderRadius: 99,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: Platform.OS == 'android' ? 10 : 1, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
  tabBarIconInnerView: {
    width: Platform.OS == 'android' ? wp('13%') : wp('13%'),
    height: Platform.OS == 'android' ? wp('13%') : wp('13%'),
    borderRadius: 99,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.colorOrange,
  },
});
