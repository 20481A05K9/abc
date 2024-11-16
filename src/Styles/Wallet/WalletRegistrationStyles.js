import {StyleSheet} from 'react-native';
import {Color, FontFamily, FontSize} from '../../../global';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    rowGap: hp('7%'),
    backgroundColor: '#f5f5f5',
  },
  buttontxt: {
    fontFamily: FontFamily.montserratSemiBold,
    fontSize: 16.5,
    color: Color.colorWhite,
  },
  linearGradient: {
    height: hp('8%'),
    width: wp('90%'),
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: wp('5%'),
  },
  texthead: {
    color: Color.colorBlack,
    fontFamily: FontFamily.montserratSemiBold,
    fontSize: 22,
  },
  textsub: {
    fontFamily: FontFamily.montserratRegular,
    fontSize: 12,
    color: Color.colorDidntText,
  },
  imageback: {
    width: wp('100%'),
    height: hp('25%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: hp('20%'),
    width: wp('40%'),
  },
});
