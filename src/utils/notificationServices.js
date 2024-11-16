import messaging from '@react-native-firebase/messaging';
import NavigationService from '../Navigation/NavigationService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Linking, Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import notifee, {
  AndroidImportance,
  AndroidStyle,
  EventType,
} from '@notifee/react-native';

export async function requestUserPermission() {
  if (Platform.OS == 'android') {
    if (DeviceInfo.getSystemVersion() >= 13) {
      const granted = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
      getFcmToken();
    } else {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        getFcmToken();
      }
    }
  } else {
    const settings = await notifee.requestPermission();
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      getFcmToken();
    }
  }
}

const getFcmToken = async () => {
  try {
    await messaging().registerDeviceForRemoteMessages();

    let fcmToken = await AsyncStorage.getItem('fcm_token');
    if (!!fcmToken) {
    } else {
      const token = await messaging().getToken();
      await AsyncStorage.setItem('fcm_token', token);
    }
  } catch (error) {
  }
};

export async function notificationListeners() {
  const unsubscribe = messaging().onMessage(async remoteMessage => {
    onDisplayNotification(remoteMessage);
  });

  const unsubscribeForeground = notifee.onForegroundEvent(
    async ({type, detail}) => {
      if (type === EventType.PRESS) {
        const data = detail?.notification || {};
        const notificationId = data?.id;

        if (notificationId) {
          messageStore[notificationId] = [];
        }
        navigationBody(data);
      }
    },
  );

  return unsubscribe, unsubscribeForeground;
}

let messageStore = {};
export async function onDisplayNotification(data) {
  if (Platform.OS == 'ios') {
    await notifee.requestPermission();
  }

  const {title, body, inAppId} = data?.data;
  const messageText = String(body);
  const notificationId = inAppId;

  if (notificationId) {
    if (!messageStore[notificationId]) {
      messageStore[notificationId] = [];
    }

    var updatedMessages = [...messageStore[notificationId]];
    updatedMessages.push(messageText);

    if (updatedMessages.length > 3) {
      updatedMessages.shift();
    }

    messageStore[notificationId] = updatedMessages;
  }

  const channelId = await notifee.createChannel({
    id: notificationId || 'default',
    name: notificationId || 'default',
    sound: 'default',
    importance: AndroidImportance.HIGH,
  });

  let displayProps = {
    title: title,
    body: body,
    android: {
      channelId,
      style: {
        type: AndroidStyle.INBOX,
        lines: notificationId ? updatedMessages : [messageText],
      },
      timestamp: Date.now(),
      showTimestamp: true,

      showWhen: true,
      importance: AndroidImportance.HIGH,
      pressAction: {
        id: 'default',
        launchActivity: 'default',
      },
    },
    data: data?.data,
  };
  if (notificationId) {
    displayProps = {
      ...displayProps,
      id: notificationId,
    };
  }
  await notifee.displayNotification(displayProps);
}

notifee.onBackgroundEvent(async ({type, detail}) => {
  if (type === EventType.PRESS) {
    const data = detail?.notification || {};
    const notificationId = data?.id;

    if (notificationId) {
      messageStore[notificationId] = [];
    }
    navigationBody(data);
  }
});

const navigationBody = remoteMessage => {
  AsyncStorage.getItem('token', (error, result) => {
    if (result) {
      let Link = remoteMessage?.data?.redirect_to;
      if (Link.includes('balert://app')) {
        const route = Link.replace(/.*?:\/\//g, '');
        const routeName = route.split('/')[1];
        if (routeName === 'tripstart') {
          setTimeout(() => {
            NavigationService.navigate('TripStart');
          }, 1200);
        } else if (routeName === 'Spin') {
          setTimeout(() => {
            NavigationService.navigate('SpinWheel');
          }, 1200);
        } else if (routeName === 'addVehicle') {
          setTimeout(() => {
            NavigationService.navigate('Addvehicle');
          }, 1200);
        } else if (routeName === 'fastag') {
          setTimeout(() => {
            NavigationService.navigate('FasTag');
          }, 1200);
        } else if (routeName === 'inapp') {
          setTimeout(() => {
            NavigationService.navigate('ChatList', {
              inAppId: remoteMessage?.data?.inAppId,
            });
          }, 1200);
        }
      } else {
        Linking.openURL(Link);
      }
    }
  });
};
