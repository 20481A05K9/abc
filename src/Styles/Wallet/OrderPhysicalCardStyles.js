import {Platform, StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {FontFamily, FontSize, Color} from '../../../global';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: wp('5%'),
    rowGap: hp('3%'),
    backgroundColor: '#f5f5f5',
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
  linearGradient: {
    height: hp('8%'),
    width: wp('90%'),
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp('5%'),
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
    marginTop: hp('2%'),
  },
  inpstyle1: [
    {
      fontSize: FontSize.size_9,
      fontFamily: FontFamily.montserratRegular,
      color: Color.colorBlack,
    },
    Platform.OS == 'ios' && {paddingVertical: '4%', marginLeft: '2%'},
  ],
  t2: {
    backgroundColor: '#F5F5F5',
    marginTop: '-3%',
    marginLeft: '10%',
    marginRight: 'auto',
    color: '#F9A738',
    fontSize: FontSize.size_10,
    fontFamily: FontFamily.montserratMedium,
  },
  errorText: {
    color: '#FF362E',
    fontSize: FontSize.size_9,
    fontFamily: FontFamily.montserratRegular,
    paddingLeft: 3,
  },
});
