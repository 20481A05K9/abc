import {StyleSheet} from 'react-native';
import {FontFamily, FontSize, Color} from '../../../global';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: wp('5%'),
    marginVertical: hp('5%'),
    rowGap: hp('3%'),
  },
  textcontainer: {
    rowGap: hp('1%'),
  },
  head: {
    fontFamily: FontFamily.montserratSemiBold,
    fontSize: 22,
    color: '#323232',
  },
  text: {
    fontFamily: FontFamily.montserratRegular,
    fontSize: 13,
    color: '#757575',
  },
  inpcontainer1: {
    borderWidth: 1,
    borderColor: '#F9A738',
    borderRadius: 9,
    width: wp('90%'),
    marginTop: hp('2%'),
  },
  t2: {
    backgroundColor: '#F5F5F5',
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
  inpstyle1: {
    fontSize: FontSize.size_9,
    fontFamily: FontFamily.montserratRegular,
    color: Color.colorBlack,
    paddingVertical: '4%',
    marginLeft: '2%',
  },
  linearGradient: {
    height: hp('8%'),
    width: wp('90%'),
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttontxt: {
    fontFamily: FontFamily.montserratSemiBold,
    fontSize: 16.5,
    color: '#ffffff',
  },
});
