import {FlatList, Text, View} from 'react-native';
import React from 'react';
import {Color} from '../../../global';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import SimpleLineIconsIcon from 'react-native-vector-icons/SimpleLineIcons';
import {styles} from '../../Styles/Wallet/NotificationsStyles';
import CustomStatusBar from '../../Components/CustomStatusBar';

const data = [
  {
    name: 'Pay Electricity Bill',
    description:
      'Pay Electricity Bill using our app and get ultimate discounts.',
    timestamp: '1hr ago',
  },
  {
    name: 'Pay Gas Bill',
    description: 'Pay Gas Bill using our app and get ultimate discounts.',
    timestamp: '5hr ago',
  },
  {
    name: 'Pay Insurance Premium',
    description:
      'Pay Insurance Premium using our app and get ultimate discounts.',
    timestamp: '10hr ago',
  },
];

const Notifications = () => {
  return (
    <View style={styles.container}>
      <CustomStatusBar backgroundColor={'#efefef'} barStyle="dark-content" />
      <Text style={styles.headtext}>Notifications</Text>
      <FlatList
        data={data}
        keyExtractor={item => item.name}
        renderItem={({item}) => (
          <View style={styles.notificationcontainer}>
            <FoundationIcon
              name="credit-card"
              color="#DF8B9E"
              size={30}
              style={{marginLeft: '4%', marginRight: '2%'}}
            />
            <View style={styles.tcontainer}>
              <Text style={styles.t1}>{item.name}</Text>
              <Text style={styles.t2}>{item.description}</Text>
              <Text style={styles.t3}>{item.timestamp}</Text>
            </View>
            <SimpleLineIconsIcon
              name="options-vertical"
              size={20}
              color={Color.colorGray_300}
              style={{marginHorizontal: '4%'}}
            />
          </View>
        )}
      />
    </View>
  );
};

export default Notifications;
