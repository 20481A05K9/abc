import {Platform, StyleSheet} from 'react-native';
import {Color, FontFamily, FontSize} from '../../../global';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  saveTypo: {
    textAlign: 'left',
    fontFamily: FontFamily.montserratMedium,
    fontWeight: '500',
    position: 'absolute',
  },
  scrollView: {
    marginHorizontal: '3%',
    paddingHorizontal: '2%',
    paddingBottom: '5%',
  },
  titleView:{
    flexDirection:'row',
    marginTop: '15%',
    justifyContent:'space-between',
    alignItems:'center'
  },
  editProfile: {
    fontSize: 25,
    color: Color.colorBlack,
    fontFamily: FontFamily.montserratMedium,
  },
  mobileNo: {
    top: 250,
    left: 28,
    fontSize: 18,
  },
  dateOfBirth: {
    top: 586,
    left: 28,
    fontSize: 18,
  },
  gender: {
    left: 1,
    top: 0,
    fontFamily: FontFamily.montserratRegular,
    fontSize: 18,
    textAlign: 'left',
    color: Color.colorBlack,
    position: 'absolute',
  },
  male: {
    left: 49,
    width: 46,
    top: 10,
  },
  female: {
    top: 5,
    left: 44,
    width: 81,
  },
  vehicle: {
    backgroundColor: Color.colorWhitesmoke,
    flex: 1,
  },
  topView: {
    marginTop: '5%',
  },
  innerView: {
    flexDirection: 'row',
    marginTop: '3%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftView: {},
  label: {
    fontSize: FontSize.size_sm,
    color: Color.colorBlack,
    fontFamily: FontFamily.montserratSemiBold,
  },
  alertText: {
    color: 'red',
  },
  input: [
    {
      borderRadius: 5,
      elevation: 4,
      backgroundColor: Color.colorWhite,
      color: Color.colorBlack,
      width: wp('43%'),
      shadowColor: Color.colorGray_100,
      fontSize: FontSize.size_xs,
      fontFamily: FontFamily.montserratMedium,
      paddingHorizontal: '2%',
    },
    Platform.OS == 'ios' && {
      paddingVertical: '4%',
      shadowOffset: {
        width: wp('0.1%'),
        height: hp('0.1%'),
      },
      shadowColor: Color.colorBlack,
      shadowOpacity: 0.15,
    },
  ],
  dropdown: {
    width: wp('43%'),
    backgroundColor: Color.colorWhite,
    borderRadius: 5,
    paddingHorizontal: '5%',
    paddingVertical: 0,
    shadowColor: Color.colorGray_100,
    elevation: 4,
    paddingVertical: Platform.OS == 'ios' ? '3.3%' : '4%',
  },
  placeholderStyle: {
    color: Color.colorBlack,
    fontSize: FontSize.size_mini,
    fontFamily: FontFamily.montserratMedium,
  },
  selectedTextStyle: {
    color: Color.colorBlack,
    fontSize: FontSize.size_mini,
    fontFamily: FontFamily.montserratMedium,
  },
  iconStyle: {
    tintColor: Color.colorBlack,
  },
  itemTextStyle: {
    color: Color.colorBlack,
    fontSize: FontSize.size_xs,
    fontFamily: FontFamily.montserratMedium,
  },
  genderCard: {
    width: wp('43%'),
    borderRadius: 5,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    elevation: 2,
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingVertical: '1%',
  },
  genderImage: {
    width: wp('11%'),
    height: wp('11%'),
  },
  genderImage1: {
    width: wp('11%'),
    height: wp('11%'),
  },
  dateMainView: {
    flexDirection: 'row',
    marginHorizontal: '1%',
    justifyContent: 'space-between',
  },
  dateView: {
    width: wp('20%'),
    paddingVertical: '2%',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Color.colorGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateView1: {
    width: wp('30%'),
    paddingVertical: '2%',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Color.colorGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 18,
    color: Color.colorBlack,
    fontFamily: FontFamily.montserratRegular,
  },
  createAccountButton: {
    width: wp('90%'),
    backgroundColor: Color.colorPrimary,
    borderRadius: 8,
    paddingVertical: '4%',
    alignItems: 'center',
    shadowColor: Color.colorBlack,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    marginTop: '10%',
  },
  createAccountButtonText: {
    fontSize: FontSize.size_xl,
    color: Color.colorWhite,
    fontFamily: FontFamily.montserratMedium,
  },
  disabledContinue: {
    backgroundColor: '#e9d9c2',
  },
});
