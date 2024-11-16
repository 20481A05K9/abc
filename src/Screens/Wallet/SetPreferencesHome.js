import { Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {styles} from '../../Styles/Wallet/SetPreferencesHomeStyles';
import CustomStatusBar from '../../Components/CustomStatusBar';

const SetPreferencesHome = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <CustomStatusBar backgroundColor={'#efefef'} barStyle="dark-content" />
      <Text style={styles.head}>Set Prefernces</Text>
      <View style={styles.buttoncaontainer}>
        <Text style={styles.textsub}>
          Want to enable or disable different types of transactions. Click below
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('SetTransactionTypes')}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#F9A738', '#FEE62A']}
            style={styles.linearGradient}>
            <Text style={styles.buttontxt}>Set Preference</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <View style={styles.buttoncaontainer}>
        <Text style={styles.textsub}>
          Want to set limits for a specific transaction type. Click below
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('SetPreferences')}
          style={{alignItems: 'center'}}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#F9A738', '#FEE62A']}
            style={styles.linearGradient}>
            <Text style={styles.buttontxt}>Set Preference limit</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SetPreferencesHome;
