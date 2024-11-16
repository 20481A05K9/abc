import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {FontFamily, Color} from '../../../global';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: wp('5%'),
    marginTop: hp('3%'),
    rowGap: hp('5%'),
  },
  head: {
    color: Color.colorBlack,
    fontFamily: FontFamily.montserratSemiBold,
    fontSize: 22,
  },
  buttontxt: {
    fontFamily: FontFamily.montserratSemiBold,
    fontSize: 16.5,
    color: Color.colorWhite,
  },
  linearGradient: {
    height: hp('6%'),
    width: wp('80%'),
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: wp('5%'),
  },
  textsub: {
    fontFamily: FontFamily.montserratRegular,
    fontSize: 12,
    color: Color.colorBlack,
  },
  buttoncaontainer: {
    alignItems: 'flex-start',
    rowGap: hp('2%'),
  },
});
