import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {FontFamily, FontSize, Color} from '../../../global';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: hp('3%'),
  },
  head: {
    fontFamily: FontFamily.montserratSemiBold,
    fontSize: FontSize.size_22,
    color: Color.colorBlack,
    marginLeft: wp('5%'),
  },
  imageback: {
    width: wp('100%'),
    height: hp('15%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: '25%',
  },
  image1: {
    width: wp('42%'),
    height: hp('20%'),
  },
  bottomcontainer: {
    width: wp('90%'),
    height: hp('20%'),
    backgroundColor: Color.colorWhite,
    marginHorizontal: wp('5%'),
    borderRadius: 16,
    flexDirection: 'row',
    columnGap: wp('10%'),
  },
  image2: {
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    height: hp('20%'),
    width: wp('10%'),
  },
  linearGradient: {
    height: hp('3%'),
    width: wp('27%'),
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttontxt: {
    fontFamily: FontFamily.montserratSemiBold,
    fontSize: 7,
    color: '#ffffff',
  },
  image3: {
    width: wp('10%'),
    height: hp('3%'),
  },
  bottomtxt1: {
    fontFamily: FontFamily.montserratMedium,
    fontSize: FontSize.size_16,
    color: Color.colorBlack,
  },
  bottomtxt2: {
    fontFamily: FontFamily.montserratMedium,
    fontSize: FontSize.size_10,
    color: Color.colorBlack,
  },
});
