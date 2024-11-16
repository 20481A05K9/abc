import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {FontFamily, Color, FontSize} from '../../../global';

export const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:Color.colorbackground
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
  secondView: {
    marginTop: '7%',
    marginLeft: '8%',
    marginRight: '8%',
  },
  startxt: {
    fontFamily: FontFamily.montserratMedium,
    color: Color.colorBlack,
    fontSize: FontSize.size_22,
    marginBottom: '5%',
  },
  startxt1: {
    fontFamily: FontFamily.montserratMedium,
    color: Color.colorBlack,
    fontSize: FontSize.size_15,
    marginBottom: '5%',
    marginTop: '5%',
  },
  txt1: {
    color: Color.colorWhite,
    fontFamily: FontFamily.montserratSemiBold,
    fontSize: FontSize.size_20,
    textAlign: 'center',
    marginBottom: '10%',
  },
  inputcontainer: {
    fontFamily: FontFamily.montserratMedium,
    color: Color.colorBlack,
    fontSize: FontSize.size_13,
    backgroundColor: Color.colorWhite,
    borderWidth: 1,
    borderColor: Color.colorOrange,
    paddingVertical: '4%',
    padding: '2%',
    borderRadius: 10,
  },
});
