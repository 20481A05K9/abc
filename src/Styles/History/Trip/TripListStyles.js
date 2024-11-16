import {StyleSheet} from 'react-native';
import {FontFamily, Color, FontSize} from '../../../../global';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: '5%',
    marginRight: '5%',
  },
  HisText: {
    fontFamily: FontFamily.montserratSemiBold,
    fontSize: FontSize.size_23,
    color: Color.colorBlack,
    marginTop: '5%',
  },
  History: {
    fontFamily: FontFamily.montserratSemiBold,
    fontSize: FontSize.size_16,
    color: Color.colorBlack,
    marginBottom: '5%',
  },
  view1: {
    width: wp('90%'),
    minHeight: 'auto',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Color.colorOrange,
    marginBottom: '5%',
  },
  errortext: {
    fontFamily: FontFamily.montserratSemiBold,
    fontSize: FontSize.size_25,
    color: 'red',
    textAlign: 'right',
    marginRight: '5%',
  },
  live: {
    color: Color.colorBlack,
    fontSize: FontSize.size_13,
  },
  hyd: {
    fontFamily: FontFamily.montserratMedium,
    fontSize: FontSize.size_13,
    color: Color.colorBlack,
    width: wp('40%'),
  },
  Bang: {
    fontFamily: FontFamily.montserratMedium,
    fontSize: FontSize.size_13,
    color: Color.colorBlack,
    width: wp('40%'),
  },
  innerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: '5%',
    marginTop: '5%',
    marginBottom: '3%',
  },
  date: {
    fontFamily: FontFamily.montserratMedium,
    fontSize: FontSize.size_13,
    color: Color.colorBlack,
    marginLeft: '5%',
  },
  tripID: {
    fontFamily: FontFamily.montserratSemiBold,
    fontSize: FontSize.size_15,
    color: Color.colorBlack,
    marginRight: '5%',
    textAlign: 'right',
    marginBottom: '5%',
  },
  num: {
    fontFamily: FontFamily.montserratRegular,
    fontSize: FontSize.size_13,
    color: Color.colorBlack,
  },
  errortext1: {
    fontFamily: FontFamily.montserratSemiBold,
    fontSize: FontSize.size_25,
    color: Color.colorGreen,
    textAlign: 'right',
    marginRight: '5%',
  },
  past: {
    color: Color.colorBlack,
    fontFamily: FontFamily.montserratSemiBold,
    fontSize: FontSize.size_13,
    color: '#F92A38',
    textAlign: 'right',
    marginRight: '5%',
    marginTop: '3%',
  },
  start: {
    color: Color.colorBlack,
    fontFamily: FontFamily.montserratSemiBold,
    fontSize: 8,
    textAlign: 'right',
    marginLeft: '3%',
    marginRight: '2%',
  },
  opacitytxt2: {
    backgroundColor: Color.colorWhite,
    borderRadius: 20,
    width: wp('20%'),
    marginLeft: '5%',
    flexDirection: 'row',
    elevation: 5,
    alignItems: 'center',
  },
  iconStyle: {
    backgroundColor: '#43B671',
    borderRadius: 99,
    paddingVertical: '5%',
    paddingHorizontal: '5%',
  },
  noRecordFound:{
    width:wp('80%'),
    height:wp('70%'),
    resizeMode:'contain',
    alignSelf:'center'
  },
  searchBarStyle: {
    width: wp('90%'),
    alignSelf: 'center',
    backgroundColor: 'transparent',
    borderColor: Color.colorGrey,
    borderWidth: 1.5,
    borderBlockColor: Color.colorGrey,
    marginBottom: '5%',
    marginTop: '5%',
  },
  input: {
    fontFamily: FontFamily.montserratMedium,
    fontSize: FontSize.size_12,
    color: Color.colorBlack,
  },
});
