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
  secondView: {
    marginTop: '15%',
    marginLeft: '8%',
    marginRight: '8%',
  },
  startxt: {
    fontFamily: FontFamily.montserratMedium,
    color: Color.colorBlack,
    fontSize: FontSize.size_20,
    marginBottom: '5%',
  },
  google: {
    marginBottom: '5%',
    width: wp('75%'),
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  view2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconstyle: {
    color: Color.colorBlack,
    marginTop: '3%',
  },
  textinput: {
    color: Color.colorBlack,
    fontFamily: FontFamily.montserratMedium,
    fontSize: FontSize.size_13,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Color.colorOrange,
    zIndex: 1,
  },
});
