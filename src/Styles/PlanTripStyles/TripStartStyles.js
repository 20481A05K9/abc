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
  addressTitleView: {
    marginTop: '10%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  saveAddresstxt: {
    fontFamily: FontFamily.montserratSemiBold,
    color: Color.colorBlack,
    fontSize: FontSize.size_16,
  },
  insertBtnTO: {
    borderRadius: 10,
    paddingVertical: '3%',
    width: wp('84%'),
    marginTop: '5%',
  },
  innerView: {
    flexDirection: 'row',
    marginLeft: '10%',
  },
  txt1: {
    color: Color.colorWhite,
    fontFamily: FontFamily.montserratMedium,
    fontSize: FontSize.size_15,
    marginLeft: '7%',
  },
  txt2: {
    color: Color.colorBlack,
    fontFamily: FontFamily.montserratRegular,
    fontSize: FontSize.size_11,
    marginLeft: '25%',
  },
  textinput: {
    color: Color.colorBlack,
    fontSize: FontSize.size_13,
    fontFamily: FontFamily.montserratMedium,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: Color.colorOrange,
  },
  google: {
    width: wp('84%'),
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  noRecordFound: {
    width: wp('80%'),
    height: wp('70%'),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});
