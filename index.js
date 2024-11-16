import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import {onDisplayNotification} from './src/utils/notificationServices';
import i18n from "./src/Components/i18n/i18n"
messaging().setBackgroundMessageHandler(async remoteMessage => {
  onDisplayNotification(remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);
