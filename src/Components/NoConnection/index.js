import React from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
import {Images} from '../../../assets';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Color, FontFamily} from '../../../global';

const NoConnection = () => {
  return (
    <View style={styles.background}>
      <Image source={Images.noInternet} style={styles.noIntImg} />
      <Text style={styles.ooopsTextText}>Ooops!</Text>
      <Text
        style={
          styles.noConnectionText
        }>{`No Internet Connection Found\nPlease check your Internet settings.`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: Color.colorWhite,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: '30%',
  },
  noIntImg: {
    width: wp('20%'),
    height: wp('20%'),
    resizeMode: 'stretch',
    tintColor: Color.colorDimgray,
  },
  ooopsTextText: {
    fontFamily: FontFamily.montserratBold,
    fontSize: 25,
    color: Color.colorUpcoming,
    textAlign: 'center',
    marginTop: '5%',
    marginBottom: '2%',
  },
  noConnectionText: {
    fontSize: 15,
    color: Color.colorBlack,
    textAlign: 'center',
    fontFamily: FontFamily.montserratRegular,
  },
});

export default NoConnection;
