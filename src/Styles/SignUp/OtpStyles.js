import {StyleSheet} from 'react-native';
import {FontFamily, FontSize, Color} from '../../../global';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  otpcontainer: {
    backgroundColor: Color.colorWhite,
    flex: 1,
  },
  innerView: {
    marginHorizontal: '5%',
  },
  headerTextView: {
    marginTop: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  primarytxt: {
    fontFamily: FontFamily.montserratMedium,
    fontSize: 35,
    color: Color.colorBlack,
  },
  editNoView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '5%',
  },
  secondarytxt: {
    fontSize: 14,
    color: Color.otpScreenno,
    fontFamily: FontFamily.montserratRegular,
  },
  editTO: {
    marginLeft: '1%',
    borderRadius:99,
    backgroundColor:"#F9A738",
    padding:'1%'
  },
  codeFieldRoot: {
    marginTop: '15%',
    width: wp('75%'),
  },
  cellRoot: {
    width: wp('13%'),
    height: wp('10%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: Color.Inputborder,
  },
  focusCell: {
    borderBottomWidth: 2,
  },
  cellText: {
    textAlign: 'center',
    fontSize: FontSize.size_mid,
    fontFamily: FontFamily.montserratRegular,
    color: Color.colorBlack,
  },
  resendOtpView: {
    flexDirection: 'row',
    marginTop: '10%',
  },
  otpdidnt: {
    color: Color.otpScreenno,
    fontSize: FontSize.size_mini,
    fontFamily: FontFamily.montserratRegular,
  },
  resendotpbtn: {
    marginLeft: '2%',
  },
  resenotp: {
    color: Color.colorDarkorange,
    fontSize: FontSize.size_xs,
    fontFamily: FontFamily.montserratRegular,
  },
  button: {
    width: wp('85%'),
    borderRadius: 10,
    backgroundColor: Color.colorOrange,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: '5%',
    marginTop: '15%',
  },
  buttontext: {
    color: Color.colorWhite,
    fontSize: FontSize.size_mid,
    fontFamily: FontFamily.montserratMedium,
  }
});
