import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Images} from '../../../assets';
import LinearGradient from 'react-native-linear-gradient';
import {styles} from '../../Styles/Wallet/WalletRegistrationStyles';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import CustomStatusBar from '../../Components/CustomStatusBar';

const WalletRegistration = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <CustomStatusBar backgroundColor={'#f5f5f5'} barStyle="dark-content" />
      <View style={{marginHorizontal: wp('5%')}}>
        <Text style={styles.texthead}>Wallet</Text>
        <Text style={styles.textsub}>Prepaid Cards or Wallet Service</Text>
      </View>
      <ImageBackground source={Images.colorpink} style={styles.imageback}>
        <Image source={Images.walletregister} style={styles.image} />
      </ImageBackground>
      <TouchableOpacity onPress={() => navigation.navigate('RegistrationForm')}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#F9A738', '#FEE62A']}
          style={styles.linearGradient}>
          <Text style={styles.buttontxt}>Register Now</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default WalletRegistration;
