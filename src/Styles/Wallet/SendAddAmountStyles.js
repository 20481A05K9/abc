import {Platform, StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {FontFamily, FontSize, Color} from '../../../global';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('5%'),
  },
  topcontainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: '10%',
  },
  texthead: {
    color: Color.colorBlack,
    fontFamily: FontFamily.montserratSemiBold,
    fontSize: FontSize.size_20,
  },
  image: {
    height: wp('20%'),
    width: wp('20%'),
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#df89be',
  },
  imagecontainer: {
    alignItems: 'center',
    marginBottom: '10%',
  },
  name: {
    fontFamily: FontFamily.montserratSemiBold,
    fontSize: FontSize.size_15,
    color: Color.colorBlack,
  },
  amountinpcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    width: wp('40%'),
    borderColor: Color.colorGray,
  },
  inputtext: {
    fontSize: FontSize.size_34,
    fontFamily: FontFamily.montserratSemiBold,
    color: Color.colorBlack,
  },
  input: {
    fontSize: FontSize.size_34,
    fontFamily: FontFamily.montserratSemiBold,
    color: Color.colorBlack,
    width: wp('35%'),
  },
  amountcontainer: {
    alignItems: 'center',
    marginBottom: '10%',
  },
  texthelp: {
    color: '#FB923C',
    fontFamily: FontFamily.montserratMedium,
    fontSize: FontSize.size_12,
    paddingTop: '5%',
  },
  messagecontainer: {
    alignItems: 'flex-start',
    rowGap: hp('2%'),
    marginBottom: '10%',
  },
  messagetext: {
    fontFamily: FontFamily.montserratMedium,
    fontSize: FontSize.size_16,
    color: Color.colorBlack,
  },
  message: [
    {
      backgroundColor: Color.colorWhite,
      width: wp('90%'),
      borderWidth: 1,
      borderRadius: 15,
      borderColor: '#DAE0E2',
      padding: '3%',
      color: '#374151',
      fontFamily: FontFamily.montserratRegular,
      fontSize: FontSize.size_12,
    },
    Platform.OS == 'ios' && {height: hp('15%')},
  ],
  linearGradient: {
    height: hp('8%'),
    width: wp('90%'),
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttontxt: {
    fontFamily: FontFamily.montserratSemiBold,
    fontSize: 16.5,
    color: Color.colorWhite,
  },
});
