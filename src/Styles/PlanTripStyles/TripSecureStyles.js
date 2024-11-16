import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {FontFamily, Color, FontSize} from '../../../global';

export const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: wp('100%'),
    height: hp('10%'),
    borderBottomLeftRadius: 30,
    backgroundColor: Color.colorOrange,
    borderBottomRightRadius: 30,
  },
  triptxt: {
    fontFamily: FontFamily.montserratSemiBold,
    color: Color.colorWhite,
    fontSize: FontSize.size_26,
    marginTop: '5%',
    marginLeft: '5%',
  },
  topView: {
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: '10%',
  },
  journeytxt: {
    fontFamily: FontFamily.montserratSemiBold,
    color: Color.colorBlack,
    fontSize: 14,
    marginLeft: '8%',
    marginTop: '3%',
  },
  journeytxt1: {
    fontFamily: FontFamily.montserratSemiBold,
    color: Color.colorBlack,
    fontSize: 14,
    marginLeft: '8%',
    color: '#1877F2',
  },
  plantxt: {
    fontFamily: FontFamily.montserratBold,
    color: Color.colorWhite,
    fontSize: FontSize.size_10,
    textAlign: 'center',
    margin: '7%',
  },
  opacitytxt: {
    borderRadius: 20,
    width: wp('25%'),
    marginTop: '2%',
    marginLeft: '8%',
  },
  tctxt: {
    marginTop: '2%',
    color: '#000',
    fontSize: 5,
    marginLeft: '9%',
    marginBottom: '4%',
  },
  secondView: {
    marginTop: '15%',
    marginLeft: '8%',
    marginRight: '8%',
  },
  startxt: {
    fontFamily: FontFamily.montserratMedium,
    color: Color.colorBlack,
    fontSize: FontSize.size_22,
    marginBottom: '5%',
  },
  insertBtnTO: {
    backgroundColor: Color.colorOrange,
    paddingVertical: '4%',
    width: wp('35%'),
    marginTop: '10%',
    borderRadius: 10,
  },
  insertBtnText: {
    fontSize: FontSize.size_18,
    color: Color.colorWhite,
    textAlign: 'center',
    fontFamily: FontFamily.montserratMedium,
  },
  insertBtnTO1: {
    backgroundColor: Color.colorWhite,
    paddingVertical: '4%',
    width: wp('35%'),
    marginTop: '10%',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Color.colorOrange,
  },
  insertBtnText1: {
    fontSize: FontSize.size_18,
    color: Color.colorBlack,
    textAlign: 'center',
    fontFamily: FontFamily.montserratMedium,
  },
  innerView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
