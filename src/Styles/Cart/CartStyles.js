import {Platform, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {FontFamily, Color, FontSize} from '../../../global';

export const Styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: '3%',
  },
  carttxtView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '5%',
  },
  carttxt: {
    fontFamily: FontFamily.montserratMedium,
    fontSize: FontSize.size_25,
    color: Color.colorBlack,
    fontWeight: '500',
  },
  addtxtTO: {
    paddingHorizontal: '5%',
    paddingVertical: '2%',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  addtxt: {
    fontSize: FontSize.size_12,
    fontFamily: FontFamily.montserratSemiBold,
    fontWeight: '600',
    color: Color.colorBlack,
  },
  view1: {
    elevation: Platform.OS == 'ios' ? 2 : 5,
    backgroundColor: Color.colorWhite,
    borderRadius: 10,
    width: wp('25%'),
    height: wp('25'),
    shadowColor: Color.colorBlack,
    shadowOffset:
      Platform.OS == 'ios'
        ? {
            width: wp('0.1%'),
            height: hp('0.1%'),
          }
        : {
            width: wp('3%'),
            height: hp('0.3%'),
          },
    shadowRadius: Platform.OS == 'ios' ? 1 : 10,
    shadowOpacity: Platform.OS == 'ios' ? 0.5 : 1,
  },
  view2: {
    flexDirection: 'row',
    marginTop: '10%',
  },
  insuranceImage: {
    width: wp('16%'),
    height: hp('8%'),
    alignSelf: 'center',
    marginTop: '14%',
  },
  insuranceImage5: {
    width: wp('18%'),
    height: wp('6%'),
    alignSelf: 'center',
    marginTop: '40%',
  },
  dropdown: {
    width: wp('28%'),
    marginLeft: '10%',
    marginTop: '-5%',
  },
  get: {
    fontFamily: FontFamily.montserratSemiBold,
    fontSize: FontSize.size_11,
    color: Color.colorBlack,
    textAlign: 'center',
  },
  rsaValue: {
    fontFamily: FontFamily.montserratSemiBold,
    fontSize: FontSize.size_11,
    color: Color.colorBlack,
    textAlign: 'center',
    marginTop: '3%',
  },
  insuranceNote: {
    fontFamily: FontFamily.montserratMedium,
    fontSize: FontSize.size_10,
    color: Color.colorBlack,
    textAlign: 'center',
    marginTop: '3%',
    width: wp('60%'),
  },
  opacity: {
    backgroundColor: Color.colorWhite,
    borderWidth: 1,
    borderColor: Color.colorBlack,
    borderRadius: 20,
    padding: '1%',
    width: wp('25%'),
    height: wp('6%'),
    marginTop: '18%',
  },
  horizontalLine: {
    borderBottomColor: Color.colorBlack,
    borderBottomWidth: 1,
    marginTop: '4%',
  },
  insuranceImage1: {
    width: wp('20%'),
    height: wp('11%'),
    alignSelf: 'center',
    marginTop: '30%',
  },
  rsatext: {
    fontSize: FontSize.size_13,
    fontFamily: FontFamily.montserratSemiBold,
    color: Color.colorBlack,
  },
  opacity1: {
    backgroundColor: Color.colorWhite,
    borderWidth: 1,
    borderColor: Color.colorBlack,
    borderRadius: 20,
    padding: '1%',
    width: wp('25%'),
    height: wp('6%'),
    marginTop: '18%',
    marginLeft: '-40%',
  },
  iconStyle1: {
    alignSelf: 'flex-end',
    marginEnd: '5%',
  },
  insertBtnTO: {
    backgroundColor: Color.colorOrange,
    paddingVertical: '4%',
    width: wp('90%'),
    marginTop: '2%',
    borderRadius: 10,
    marginBottom: '10%',
  },
  insertBtnText: {
    fontSize: FontSize.size_18,
    color: Color.colorWhite,
    textAlign: 'center',
    fontFamily: FontFamily.montserratMedium,
  },
  view3: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '2%',
  },
  couponCode: {
    fontFamily: FontFamily.montserratMedium,
    fontSize: FontSize.size_10,
    color: Color.colorOrange,
    marginTop: '2%',
    marginBottom: '4%',
  },
  input1: [
    {
      borderWidth: 1,
      width: wp('90%'),
      borderRadius: 8,
      backgroundColor: 'white',
      color: '#000',
      borderColor: Color.colorOrange,
      fontSize: FontSize.size_10,
      marginTop: '2%',
      fontFamily: FontFamily.montserratMedium,
    },
    Platform.OS == 'ios' && {paddingVertical: '4%', paddingLeft: '1%'},
  ],
  selectxt: {
    fontSize: FontSize.size_11,
    fontFamily: FontFamily.montserratSemiBold,
    color: Color.colorBlack,
  },
  totaltext: {
    fontFamily: FontFamily.montserratSemiBold,
    fontSize: FontSize.size_15,
    color: Color.colorDimgray,
    fontWeight: '600',
  },
  rupee: {
    fontFamily: FontFamily.montserratSemiBold,
    fontSize: FontSize.size_11,
    fontWeight: '600',
    color: Color.colorBlack,
    marginTop: '10%',
  },
  errortxt4: {
    color: '#E84040',
    fontSize: 8,
    fontFamily: FontFamily.montserratMedium,
    fontWeight: '600',
  },
  errortxt5: {
    color: '#E84040',
    fontSize: 8,
    fontFamily: FontFamily.montserratMedium,
    fontWeight: '600',
  },
  topview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '5%',
  },
  vehicletxt: {
    fontFamily: FontFamily.montserratSemiBold,
    fontSize: FontSize.size_15,
    color: Color.colorBlack,
    fontWeight: '400',
  },
  txt1: {
    fontFamily: FontFamily.montserratMedium,
    fontSize: FontSize.size_15,
    color: Color.colorBlack,
    fontWeight: '400',
  },
  topview1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Color.colorGrey,
    padding: '1%',
    borderRadius: 5,
  },
  MSGAlertBGViewStyle: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  MSGAlert_Main_View_Style: {
    width: wp('90%'),
    flexDirection: 'column',
    backgroundColor: Color.colorWhite,
    borderRadius: 10,
    marginTop: hp('18%'),
    elevation: 5,
    shadowColor: Color.colorBlack,
    paddingHorizontal: '5%',
    paddingVertical: '2%',
    shadowOffset:
      Platform.OS == 'ios'
        ? {
            width: wp('0.1%'),
            height: hp('0.1%'),
          }
        : {
            width: wp('3%'),
            height: hp('0.3%'),
          },
    shadowRadius: Platform.OS == 'ios' ? 1 : 10,
    shadowOpacity: Platform.OS == 'ios' ? 0.5 : 1,
  },
  Message_TextStyle: {
    color: Color.colorBlack,
    textAlignVertical: 'center',
    fontSize: 15,
    fontFamily: FontFamily.montserratMedium,
    marginVertical: '2%',
  },
  Coupon: {
    fontFamily: FontFamily.montserratMedium,
    fontSize: 9,
    color: Color.colorOrange,
  },
  insertBtnTO1: {
    backgroundColor: Color.colorOrange,
    paddingVertical: '4%',
    width: wp('52%'),
    marginTop: '2%',
    borderRadius: 10,
    marginBottom: '10%',
  },
  insertBtnText1: {
    fontSize: FontSize.size_13,
    color: Color.colorWhite,
    textAlign: 'center',
    fontFamily: FontFamily.montserratMedium,
  },
  insertBtnTO2: {
    backgroundColor: Color.colorWhite,
    paddingVertical: '4%',
    width: wp('33%'),
    marginTop: '2%',
    borderRadius: 10,
    marginBottom: '10%',
  },
  insertBtnText2: {
    fontSize: FontSize.size_13,
    color: Color.colorBlack,
    textAlign: 'center',
    fontFamily: FontFamily.montserratMedium,
  },
});
