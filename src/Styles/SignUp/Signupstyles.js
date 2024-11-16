import {StyleSheet} from 'react-native';
import {FontFamily, FontSize, Color} from '../../../global';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  primarytxt: {
    fontSize: 35,
    marginLeft: '6%',
    color: Color.colorBlack,
    marginTop: '6%',
    fontFamily: FontFamily.montserratMedium,
  },
  inputtxt: {
    marginLeft: '6%',
    marginRight: '6%',
    marginTop: '8%',
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  inputtxt1: {
    fontSize: 16,
    width: wp('90%'),
    fontFamily: FontFamily.montserratRegular,
    color: Color.colorBlack,
    paddingVertical: 0,
  },
  insertBtnTO: {
    backgroundColor: Color.colorOrange,
    paddingHorizontal: '10%',
    paddingVertical: '4%',
    width: wp('88%'),
    marginLeft: '6%',
    marginTop: '10%',
    borderRadius: 10,
  },
  insertBtnText: {
    fontSize: 18,
    color: Color.colorWhite,
    textAlign: 'center',
    fontFamily: FontFamily.montserratMedium,
  },
  svgContainer:{
    marginTop:'-19%'
  }
});
