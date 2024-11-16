import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {StyleSheet} from 'react-native';
import {FontFamily, Color} from '../../../global';

export const styles = StyleSheet.create({
  texthead: {
    fontFamily: FontFamily.montserratSemiBold,
    color: Color.colorBlack,
    fontSize: 22,
  },
  text: {
    fontFamily: FontFamily.montserratRegular,
    color: Color.colorGray,
    fontSize: 12,
  },
  container: {
    flex: 1,
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('5%'),
  },
  description: {
    flexDirection: 'row',
    columnGap: wp('2%'),
  },
  buttontxt: {
    fontFamily: FontFamily.montserratSemiBold,
    fontSize: 16.5,
    color: Color.colorWhite,
  },
  resend: {
    color: '#DF8B9E',
    fontFamily: FontFamily.montserratMedium,
    fontSize: 12,
  },
  text1: {
    fontSize: 13,
    fontFamily: FontFamily.montserratRegular,
    color: Color.colorGray,
    marginLeft: wp('10%'),
  },
  cell: {
    width: wp('13%'),
    height: wp('13%'),
    fontSize: 24,
    borderWidth: 2,
    borderColor: '#dddddd',
    textAlign: 'center',
    borderRadius: 15.43,
    color: '#757575',
    fontFamily: FontFamily.montserratMedium,
    fontSize: 18.52,
    justifyContent: 'center',
    alignItems: 'center',
    color: Color.colorBlack,
    paddingTop: '3%',
  },
  focusCell: {
    borderColor: '#DF8B9E',
  },
  linearGradient: {
    height: hp('8%'),
    width: wp('90%'),
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '15%',
  },
  inputContainer: {
    marginVertical: '15%',
  },
});
