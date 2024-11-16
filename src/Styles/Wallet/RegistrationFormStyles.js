import {Platform, StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Color, FontFamily, FontSize} from '../../../global';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('5%'),
    backgroundColor: '#f5f5f5',
  },
  head: {
    fontFamily: FontFamily.montserratSemiBold,
    fontSize: 22,
    color: '#323232',
  },
  text: {
    fontFamily: FontFamily.montserratRegular,
    fontSize: 12,
    color: '#757575',
  },
  linearGradient: {
    height: hp('8%'),
    width: wp('90%'),
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '8%',
  },
  buttontxt: {
    fontFamily: FontFamily.montserratSemiBold,
    fontSize: 16.5,
    color: '#ffffff',
  },
  inpcontainer1: {
    borderWidth: 1,
    borderColor: '#F9A738',
    borderRadius: 9,
    width: wp('90%'),
  },
  inpstyle1: [
    {
      fontSize: FontSize.size_9,
      fontFamily: FontFamily.montserratRegular,
      color: Color.colorBlack,
    },
    Platform.OS == 'ios' && {paddingVertical: '4%', paddingLeft: '2%'},
  ],
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
  errorText: {
    color: '#FF362E',
    fontSize: FontSize.size_9,
    fontFamily: FontFamily.montserratRegular,
    paddingLeft: 3,
  },
});
