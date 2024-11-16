import 'react-native-gesture-handler';
import {Modal, View} from 'react-native';
import React, {useEffect} from 'react';
import MainNavigation from './src/Navigation/MainNavigation';
import NoConnection from './src/Components/NoConnection';
import CheckConnection from './src/Components/NoConnection/CheckConnection';
import {
  notificationListeners,
  requestUserPermission,
} from './src/utils/notificationServices';
import NavigationService from './src/Navigation/NavigationService';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import configureStore from './src/redux/config/store/index';
import AppLoader from './src/Components/AppLoader/AppLoader';
import CustomErrorModal from './src/Components/CustomErrorModal/CustomErrorModal';
import {FontFamily} from './global';
import FlashMessage from 'react-native-flash-message';
const App = () => {
  const connectionInfo = CheckConnection();
  const store = configureStore(() => {}).store;

  useEffect(() => {
    requestUserPermission();
    notificationListeners();
  }, []);

  return (
    <>
      <Provider store={store}>
        <NavigationContainer
          ref={ref => NavigationService.setTopLevelNavigator(ref)}>
          <AppLoader />
          <CustomErrorModal />
          <MainNavigation />
          <FlashMessage
            position={'top'}
            titleStyle={{
              fontFamily: FontFamily.montserratMedium,
              fontSize: 14,
            }}
          />
        </NavigationContainer>
      </Provider>
      <Modal
        visible={connectionInfo === false}
        animationType={'fade'}
        transparent={true}>
        <View
          style={{
            flex: 1,
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.28)',
          }}>
          <NoConnection />
        </View>
      </Modal>
    </>
  );
};

export default App;
