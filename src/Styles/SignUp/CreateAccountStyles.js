import {Platform, StyleSheet} from 'react-native';
import {Color, FontSize, FontFamily} from '../../../global';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.Inputback,
  },
  scrollView: {
    marginHorizontal: '3%',
    paddingHorizontal: '2%',
    paddingBottom: '5%',
  },
  title: {
    fontSize: FontSize.size_27,
    color: Color.colorBlack,
    fontFamily: FontFamily.montserratMedium,
    marginTop: '10%',
    marginBottom: '3%',
  },
  topView: {
    marginTop: '5%',
  },
  innerView: {
    flexDirection: 'row',
    marginTop: Platform.OS == 'ios' ? '3%' : '2%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftView: {},
  label: {
    fontSize: 15,
    color: Color.colorBlack,
    fontFamily: FontFamily.montserratSemiBold,
  },
  alertText: {
    color: 'red',
  },
  input: [
    {
      color: Color.colorBlack,
      width: wp('43%'),
      fontSize: FontSize.size_mini,
      fontFamily: FontFamily.montserratMedium,
      paddingHorizontal: '2%',
      borderBottomWidth: 0.5,
      borderColor: Color.colorBlack,
      paddingVertical: '2%',
    },
    Platform.OS == 'ios' && {paddingVertical: '4%'},
  ],
  innerView1: {
    flexDirection: 'row',
    backgroundColor: Color.colorOrange,
    paddingVertical: '5%',
    paddingHorizontal: '2%',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  autoFillText: {
    fontFamily: FontFamily.montserratSemiBold,
    color: Color.colorWhite,
    fontSize: 9,
    marginLeft: '5%',
  },
  genderCard: {
    width: wp('43%'),
    borderRadius: 5,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: '2%',
    paddingHorizontal: '2%',
  },
  genderImage: {
    width: wp('10%'),
    height: wp('10%'),
  },
  genderTitle: {
    fontSize: 15,
    color: Color.colorBlack,
    fontFamily: FontFamily.montserratMedium,
    marginLeft: '10%',
  },
  acceptView: {
    flex: 1,
    flexDirection: 'row',
    marginTop: '2%',
    alignItems: 'center',
  },
  checkbox: {
    marginRight: '2%',
  },
  checkboxStyle: {
    marginLeft: '1%',
    marginRight: '2%',
    marginTop: '1%',
  },
  acceptTermsView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  acceptTermsText: {
    fontSize: FontSize.size_11,
    color: Color.colorBlack,
    fontFamily: FontFamily.montserratMedium,
  },
  createAccountButton: {
    width: wp('90%'),
    backgroundColor: Color.colorOrange,
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
  dropdown: {
    width: wp('43%'),
    paddingHorizontal: '5%',
    paddingVertical: 0,
    borderBottomWidth: 0.5,
    borderColor: Color.colorBlack,
    paddingVertical: Platform.OS == 'ios' ? '3.7%' : '3%',
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
  errorMsgText: {
    color: 'red',
    padding: '2%',
    fontFamily: FontFamily.montserratSemiBold,
    fontSize: 10,
  },
});
