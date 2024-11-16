import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {StyleSheet} from 'react-native';
import {FontFamily, FontSize, Color} from '../../../global';

export const styles = StyleSheet.create({
  cartcard: {
    borderTopWidth: 2,
    borderColor: '#263238',
    width: wp('90%'),
    height: hp('17%'),
    backgroundColor: Color.colorWhite,
    borderTopLeftRadius: 25,
    borderRadius: 13,
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  container: {
    margin: wp('5%'),
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
  },
  imagecard: {
    width: wp('34%'),
    backgroundColor: '#263238',
    height: hp('8%'),
    borderTopLeftRadius: 25,
    borderBottomRightRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp('-0.25%'),
  },
  text: {
    fontFamily: FontFamily.montserratSemiBold,
    fontSize: 11,
    color: Color.colorBlack,
    margin: wp('3%'),
  },
  text1: {
    fontFamily: FontFamily.montserratRegular,
    fontSize: 7.43,
    color: Color.colorBlack,
    margin: wp('3%'),
  },
  textarea: {
    height: hp('9%'),
    width: wp('46%'),
  },
  cardtop: {
    flexDirection: 'row',
    columnGap: wp('1%'),
  },
  iconarea: {
    height: hp('9%'),
    width: wp('6%'),
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: '3%',
  },
  bottomtext: {
    color: '#ff0000',
    fontFamily: FontFamily.montserratSemiBold,
    fontSize: FontSize.size_17,
  },
  bottomarea: {
    height: hp('3%'),
    width: wp('20%'),
    margin: '5%',
    flexDirection: 'row',
    alignContent: '',
    justifyContent: 'space-evenly',
    borderRadius: 6,
  },
  topconatiner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cartimage: {
    height: wp('5%'),
    width: wp('5.7%'),
  },
  imagecontainer: {
    backgroundColor: Color.colorWhite,
    padding: wp('3%'),
    borderRadius: 100,
  },
  textmain: {
    fontFamily: FontFamily.montserratSemiBold,
    fontSize: FontSize.size_19,
    color: Color.colorBlack,
  },
  horizontalLine: {
    borderBottomColor: Color.colorGray,
    borderBottomWidth: 1,
    marginVertical: '8%',
  },
  verticalLine: {
    borderBottomColor: '#263238',
    borderRightWidth: 1,
    height: '80%',
  },
  couponcontainer: {
    borderWidth: 1,
    borderColor: '#263238',
    height: hp('5%'),
    borderRadius: 7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imagecoupon: {
    height: wp('7%'),
    width: '14%',
  },
  apply: {
    fontFamily: FontFamily.montserratSemiBold,
    fontSize: FontSize.size_8,
    color: '#263238',
  },
  inp: {
    fontFamily: FontFamily.montserratRegular,
    fontSize: 10,
    width: wp('50%'),
    color: Color.colorBlack,
  },
  bottomrupee: {
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginVertical: '8%',
  },
  rupeetext: {
    fontFamily: FontFamily.montserratMedium,
    fontSize: FontSize.size_13,
  },
  rupeeval: {
    flexDirection: 'row',
    columnGap: wp('30%'),
  },
  linearGradient: {
    height: hp('8%'),
    width: wp('90%'),
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttontxt: {
    fontFamily: FontFamily.montserratSemiBold,
    fontSize: 16.5,
    color: Color.colorWhite,
  },
});
