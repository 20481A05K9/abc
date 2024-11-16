import {Platform, StyleSheet} from 'react-native';
import {FontFamily, FontSize, Color} from '../../../global';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const ProfileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorWhite,
  },
  view2: [{
    elevation: 5,
    backgroundColor: Color.colorWhite,
    borderRadius: 20,
    marginLeft: '5%',
    marginRight: '5%',
    paddingVertical: '4%',
    marginTop: '-7%',
  },Platform.OS=='ios'&&{
    shadowOffset: {
      width: wp('0.1%'),
      height: hp('0.1%'),
    },
    shadowColor: Color.colorBlack,
    shadowOpacity: 0.30,
  }],
  View3: {
    flexDirection: 'row',
    alignItems:'center'
  },
  leftIconStyles:{
    width:wp('11%'),
    marginLeft: '5%'
  },
  txt: {
    fontFamily: FontFamily.montserratMedium,
    color: Color.colorBlack,
    fontSize: FontSize.size_17,
    marginLeft: '1%',
    width:wp('62%')
  },
  rightIconStyles:{
    position:'absolute',
    right:wp('5%'),
  },
  
  horizontalLine: {
    borderBottomColor: Color.colorGrey,
    borderBottomWidth: 1,
    marginVertical: '4%',
    marginLeft: '5%',
    marginRight: '5%',
  },
  secondchild: {
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('100%'),
    height: wp('67%'),
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  view4: [{
    elevation: 5,
    backgroundColor: Color.colorWhite,
    borderRadius: 20,
    marginLeft: '5%',
    marginRight: '5%',
    paddingVertical: '4%',
    marginTop: '4%',
  },Platform.OS=='ios'&&{
    shadowOffset: {
      width: wp('0.1%'),
      height: hp('0.1%'),
    },
    shadowColor: Color.colorBlack,
    shadowOpacity: 0.30,
  }],
  view5: [{
    elevation: 5,
    backgroundColor: Color.colorWhite,
    borderRadius: 20,
    marginLeft: '5%',
    marginRight: '5%',
    paddingVertical: '4%',
    marginTop: '4%',
    marginBottom: '24%',
  },Platform.OS=='ios'&&{
    shadowOffset: {
      width: wp('0.1%'),
      height: hp('0.1%'),
    },
    shadowColor: Color.colorBlack,
    shadowOpacity: 0.30
  }],
  profile: {
    alignSelf: 'center',
    marginTop: '15%',
    height: wp('20%'),
    width: wp('20%'),
    borderRadius: 999,
    resizeMode: 'contain',
    borderWidth: 1.5,
    borderColor: Color.colorWhite,
  },
  nametxt: {
    color: Color.colorWhite,
    fontFamily: FontFamily.montserratBold,
    fontSize: FontSize.size_20,
    textAlign: 'center',
    justifyContent: 'center',
  },
  mailtxt: {
    fontFamily: FontFamily.montserratMedium,
    color: Color.colorWhite,
    textAlign: 'center',
    fontSize: FontSize.size_16,
  },
  plusymbol: {
    marginTop: '-8%',
    marginLeft: '53%',
  },
  insertBtnTO: {
    backgroundColor: Color.colorOrange,
    paddingHorizontal: '10%',
    paddingVertical: '4%',
    width: wp('88%'),
    marginLeft: '6%',
    marginTop: '10%',
    borderRadius: 10,
  },
  insertBtnText: {
    fontSize: 18,
    color: Color.colorWhite,
    textAlign: 'center',
    fontFamily: FontFamily.montserratMedium,
  },
  insertBtnTO1: {
    backgroundColor: Color.colorWhite,
    paddingHorizontal: '10%',
    paddingVertical: '4%',
    width: wp('88%'),
    marginLeft: '6%',
    marginTop: '5%',
    borderRadius: 10,
    marginBottom: '10%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Color.colorBlack,
  },
  insertBtnText1: {
    fontSize: 18,
    color: Color.colorBlack,
    textAlign: 'center',
    fontFamily: FontFamily.montserratMedium,
  },
  logoutxt: {
    fontFamily: FontFamily.montserratMedium,
    fontSize: FontSize.size_22,
    color: Color.colorBlack,
    fontWeight: '600',
    marginTop: '10%',
    marginLeft: '5%',
  },
  belowtext: {
    fontFamily: FontFamily.montserratRegular,
    fontSize: FontSize.size_15,
    color: Color.colorBlack,
    fontWeight: '400',
    marginLeft: '5%',
    marginTop: '5%',
  },
  view6: {
    backgroundColor: '#f5fffa',
    top: '30%',
    width: wp('100%'),
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignSelf: 'center',
  },
  style1: {
    alignSelf: 'center',
    marginTop: '2%',
    backgroundColor:Color.Inputborder,
    height:4,
    width:'15%',
    borderRadius:5
  },
});
