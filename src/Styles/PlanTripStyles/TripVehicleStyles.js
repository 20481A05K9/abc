import {Platform, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {FontFamily, Color, FontSize} from '../../../global';

export const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:Color.colorbackground
  },
  image: {
    width: wp('100%'),
    height: hp('10%'),
    borderBottomLeftRadius: 30,
    backgroundColor: Color.colorOrange,
    borderBottomRightRadius: 30,
  },
  triptxt: {
    fontFamily: FontFamily.montserratSemiBold,
    color: Color.colorWhite,
    fontSize: FontSize.size_26,
    marginTop: '5%',
    marginLeft: '5%',
  },
  secondView: {
    marginTop: '15%',
    marginLeft: '8%',
    marginRight: '8%',
  },
  startxt: {
    fontFamily: FontFamily.montserratMedium,
    color: Color.colorBlack,
    fontSize: FontSize.size_22,
    marginBottom: '10%',
  },
  startxt1: {
    fontFamily: FontFamily.montserratMedium,
    color: Color.colorBlack,
    fontSize: FontSize.size_15,
    marginBottom: '5%',
  },
  addFamilyTO: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '14%',
    marginBottom: '10%',
  },
  google: {
    borderRadius: 10,
    borderColor: Color.colorOrange,
    borderWidth: 1,
    marginBottom: '5%',
  },
  dropdown: {
    width: wp('84%'),
    backgroundColor: Color.colorWhite,
    borderRadius: 8,
    paddingHorizontal: '5%',
    paddingVertical: Platform.OS == 'ios' ? '3.5%' : '4.5%',
    shadowColor: Color.colorBlack,
    shadowOpacity: 0.5,
    elevation: 3,
    borderWidth: 1,
    borderColor: Color.colorOrange,
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
    shadowRadius: Platform.OS == 'ios' ? 1 : 8,
  },
  dropdown1: {
    width: wp('84%'),
    backgroundColor: Color.colorWhite,
    borderRadius: 8,
    paddingHorizontal: '5%',
    paddingVertical:Platform.OS=='ios'? '3%':'4.5%',
    shadowColor: Color.colorBlack,
    shadowOpacity: 0.5,
    elevation: 3,
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
    shadowRadius: Platform.OS == 'ios' ? 1 : 8,
  },
  placeholderStyle: {
    fontSize: 14,
    color: Color.colorBlack,
    fontFamily: 'Montserrat-Regular',
  },
  selectedTextStyle: {
    fontSize: 14,
    color: Color.colorBlack,
    fontFamily: 'Montserrat-Regular',
  },
  iconStyle: {
    tintColor: Color.colorBlack,
  },
  itemTextStyle: {
    color: Color.colorBlack,
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
  },
  fastag:{
    fontFamily:FontFamily.montserratMedium,
    fontSize:FontSize.size_25,
    color:Color.colorBlack,
    marginTop:'5%',
    marginLeft:'5%',
  },
  insertBtnTO: {
    backgroundColor: Color.colorOrange,
    borderRadius: 10,
    paddingVertical: '4%',
    width: wp('84%'),
    marginTop: '15%',
    marginBottom: '8%',
    marginLeft:'8%'
  },
  insertBtnText: {
    color: Color.colorWhite,
    fontFamily: FontFamily.montserratSemiBold,
    fontSize: FontSize.size_17,
    textAlign: 'center',
  },
  text1:{
    fontFamily:FontFamily.montserratSemiBold,
    color:Color.colorBlack,
    fontSize:FontSize.size_16,
    alignSelf:'center',
    marginTop:'10%'
  },
  view1:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignContent:'space-between',
    marginLeft:'20%',
    marginRight:'20%',
    marginTop:'10%'
  },
  rs:{
    fontFamily:FontFamily.montserratMedium,
    color:Color.colorOrange,
    fontSize:FontSize.size_15,
    marginTop:'1%'
  },
  image:{
    width:wp('8%'),
    height:hp('4%')
  }
});