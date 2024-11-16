import {FontSize, FontFamily, Color} from '../../../global';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: wp('5%'),
    marginTop: hp('3%'),
    rowGap: hp('5%'),
    backgroundColor: '#f5f5f5',
  },
  inpcontainer1: {
    borderWidth: 1,
    borderColor: '#F9A738',
    borderRadius: 9,
    width: wp('90%'),
  },
  inpstyle1: {
    fontSize: FontSize.size_9,
    fontFamily: FontFamily.montserratRegular,
    color: Color.colorBlack,
  },
  t2: {
    backgroundColor: '#f5f5f5',
    marginTop: '-3%',
    marginLeft: '10%',
    marginRight: 'auto',
    color: '#F9A738',
    fontSize: FontSize.size_10,
    fontFamily: FontFamily.montserratMedium,
  },
  pickerContainer: {
    justifyContent: 'center',
  },
  picker: {
    color: '#000',
    fontSize: FontSize.size_9,
    fontFamily: FontFamily.montserratRegular,
    height: hp('5%'),
    padding: 4,
  },
  pickerItem: {
    fontSize: 9,
    fontFamily: FontFamily.montserratRegular,
    color: Color.colorBlack,
  },
  placeholderItem: {
    color: Color.colorGray,
    fontFamily: FontFamily.montserratRegular,
    fontSize: 9,
  },
  textsub: {
    fontFamily: FontFamily.montserratRegular,
    fontSize: 12,
    color: Color.colorDidntText,
  },
  texthead: {
    color: Color.colorBlack,
    fontFamily: FontFamily.montserratSemiBold,
    fontSize: 22,
  },
  topcontainer: {
    rowGap: hp('1%'),
  },
  buttontxt: {
    fontFamily: FontFamily.montserratSemiBold,
    fontSize: 16.5,
    color: Color.colorWhite,
  },
  linearGradient: {
    height: hp('7%'),
    width: wp('90%'),
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
