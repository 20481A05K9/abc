import {Platform, StyleSheet} from 'react-native';
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
  topView: [
    {
      elevation: 2,
      marginLeft: '5%',
      marginRight: '5%',
      marginTop: '10%',
      backgroundColor: Color.colorWhite,
      borderRadius: 10,
      paddingVertical: '5%',
      paddingHorizontal: '2%',
    },
    Platform.OS == 'ios' && {
      shadowOffset: {
        width: wp('0.1%'),
        height: hp('0.1%'),
      },
      shadowColor: Color.colorBlack,
      shadowOpacity: 0.15,
    },
  ],
  secondView: {
    marginTop: '10%',
    marginLeft: '5%',
    marginRight: '5%',
  },
  Rdate: {
    fontFamily: FontFamily.montserratMedium,
    fontSize: FontSize.size_15,
    color: Color.colorBlack,
    marginBottom: '5%',
  },
  innerView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txt: {
    fontFamily: FontFamily.montserratRegular,
    color: Color.colorBlack,
    fontSize: FontSize.size_18,
    textAlign: 'center',
  },
  txt1: {
    fontFamily: FontFamily.montserratRegular,
    color: Color.colorBlack,
    fontSize: FontSize.size_11,
  },
  imagetxt: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: wp('100%'),
    marginTop: '80%',
  },
  inputcontainer: {
    fontFamily: FontFamily.montserratMedium,
    color: Color.colorBlack,
    fontSize: FontSize.size_13,
    paddingVertical: '4%',
    padding: '2%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Color.colorOrange,
  },
});
