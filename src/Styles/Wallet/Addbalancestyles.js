import {Platform, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {FontFamily, Color, FontSize} from '../../../global';

export const styles = StyleSheet.create({
  text: {
    color: Color.colorBlack,
    fontFamily: FontFamily.montserratSemiBold,
    fontSize: 22,
    marginBottom: hp('3%'),
  },
  container: {
    flex: 1,
    marginLeft: wp('5%'),
    marginRight: wp('5%'),
    marginTop: hp('4%'),
  },
  imageback: {
    width: wp('90%'),
    height: hp('26%'),
    rowGap: hp('0.5%'),
    marginBottom: hp('3%'),
    marginTop: hp('5%'),
  },
  balance: {
    margin: wp('3%'),
  },
  amount: {
    fontFamily: FontFamily.montserratMedium,
    fontSize: 35,
    color: Color.colorWhite,
  },
  linearGradient: {
    height: hp('8%'),
    width: wp('90%'),
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: wp('40%'),
    marginTop: hp('5%'),
  },
  buttontxt: {
    fontFamily: FontFamily.montserratSemiBold,
    fontSize: 16.5,
    color: Color.colorWhite,
  },
  listtext: {
    color: '#757575',
    fontFamily: FontFamily.montserratMedium,
  },
  rupeebutton: {
    height: hp('4%'),
    width: wp('20%'),
    backgroundColor: Color.colorWhite,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatlistContainer: {
    marginTop: hp('5%'),
    marginBottom: hp('3%'),
  },
  preftext: {
    fontFamily: FontFamily.montserratRegular,
    fontSize: 6,
    color: Color.colorBlack,
  },
  preficon: {
    height: hp('4%'),
    width: hp('4%'),
  },
  prefcontainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: hp('5%'),
    backgroundColor: Color.colorWhite,
    width: hp('5%'),
    borderRadius: 100,
  },
  imageback: {
    width: wp('80%'),
    height: hp('23%'),
    borderradius: 14,
    marginHorizontal: wp('5%'),
    marginTop: hp('3%'),
  },
  cardname: {
    fontFamily: FontFamily.montserratSemiBold,
    fontSize: 8,
    color: Color.colorWhite,
    letterSpacing: 3,
  },
  baltext: {
    color: Color.colorWhite,
    fontFamily: FontFamily.montserratRegular,
    fontSize: 8,
  },
  balamount: {
    fontSize: 19,
    fontFamily: FontFamily.montserratMedium,
    color: Color.colorWhite,
  },
  input: {
    borderWidth: 1,
    borderColor: '#F9A738',
    borderRadius: 16,
    marginTop: hp('5%'),
  },
  inphead: {
    marginTop: '-4%',
    backgroundColor: '#f5f5f5',
    marginLeft: wp('10%'),
    marginRight: 'auto',
    color: '#F9A738',
  },
  textinp: [
    {
      color: '#757575',
      height: 'auto',
      width: wp('80%'),
      fontFamily: FontFamily.montserratRegular,
      fontSize: 9,
    },
    Platform.OS == 'ios' && {paddingVertical: '4%', marginLeft: '2%'},
  ],
  rupeetext: {
    color: '#757575',
    fontFamily: FontFamily.montserratRegular,
    fontSize: 9,
  },
  errorText: {
    color: Color.colorBlack,
    fontFamily: FontFamily.montserratRegular,
    fontSize: FontSize.size_10,
    marginTop: '2%',
  },
});
