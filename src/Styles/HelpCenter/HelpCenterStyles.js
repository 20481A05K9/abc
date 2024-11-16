import {StatusBar, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {FontFamily, FontSize, Color} from '../../../global';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: '5%',
    marginRight: '5%',
  },
  helptext: {
    fontFamily: FontFamily.montserratMedium,
    fontSize: FontSize.size_25,
    color: Color.colorBlack,
    fontWeight: '500',
    marginTop: '8%',
    paddingTop:StatusBar.currentHeight
  },
  helpQ: {
    fontFamily: FontFamily.montserratSemiBold,
    fontWeight: '600',
    fontSize: FontSize.size_18,
    color: Color.colorBlack,
    marginBottom: '10%',
    marginTop: '10%',
  },
  topview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  billing: {
    fontFamily: FontFamily.montserratRegular,
    fontWeight: '400',
    fontSize: FontSize.size_11,
    color: Color.colorBlack,
    marginTop: '10%',
    textAlign: 'center',
  },
  billingImage: {
    alignSelf: 'center',
    width: wp('12%'),
    height: hp('6%'),
  },
  child: {
    borderWidth: 2,
    backgroundColor: Color.colorWhite,
    height: wp('35%'),
    textAlignVertical: 'top',
    borderColor: Color.colorOrange,
    borderRadius: 10,
  },
  innerView: {
    backgroundColor: '#DDEEF7',
    marginTop: '10%',
    borderRadius: 20,
    width: wp('90%'),
    height: wp('45%'),
    overflow: "hidden",
  },
  helpcenter: {
    fontFamily: FontFamily.montserratSemiBold,
    fontWeight: '600',
    fontSize: 10,
    color: Color.colorBlack,
  },
  innertext: {
    fontFamily: FontFamily.montserratSemiBold,
    fontSize: FontSize.size_18,
    fontWeight: '700',
    color: '#3DCF65',
    marginTop: '5%',
  },
  innertext1: {
    color: Color.colorBlack,
  },
  innertext3: {
    fontFamily: FontFamily.montserratSemiBold,
    fontSize: FontSize.size_18,
    fontWeight: '700',
    color: '#3DCF65',
  },
  innertext2: {
    fontFamily: FontFamily.montserratSemiBold,
    fontSize: FontSize.size_18,
    fontWeight: '700',
    color: Color.colorBlack,
  },
  image2: {
    borderBottomRightRadius: 20,
    width: wp('32%'),
    height: hp('15%'),
    alignSelf:'flex-end',
    position:'absolute',
    right:0,
    bottom:0
  },
  plantxt: {
    fontFamily: FontFamily.montserratBold,
    color: Color.colorWhite,
    fontSize: FontSize.size_11,
    textAlign: 'center',
  },
  opacitytxt: {
    borderRadius: 20,
    width: wp('25%'),
    paddingVertical:'3%'
  },
  balert: {
    fontFamily: FontFamily.montserratRegular,
    fontSize: 7,
    color: Color.colorBlack,
    fontWeight: '400',
    marginLeft: '2%',
    marginTop: '5%',
  },
  view6: {
    backgroundColor: '#FFFFFF',
    width: wp('100%'),
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignSelf: 'flex-end',
  },
  style1: {
    alignSelf: 'center',
    marginTop: '5%',
    backgroundColor:Color.Inputborder,
    height:4,
    width:'15%',
    borderRadius:5
  },
  insertBtnTO: {
    backgroundColor: Color.colorOrange,
    paddingHorizontal: '10%',
    paddingVertical: '4%',
    width: wp('88%'),
    marginLeft: '6%',
    marginTop: '5%',
    borderRadius: 10,
    marginBottom: '10%',
  },
  disabledContinue: {
    backgroundColor: '#e9d9c2',
  },
  insertBtnText: {
    fontSize: 18,
    color: Color.colorWhite,
    textAlign: 'center',
    fontFamily: FontFamily.montserratMedium,
  },
  logoutxt: {
    fontFamily: FontFamily.montserratSemiBold,
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
  child: {
    borderWidth: 1,
    height: wp('35%'),
    textAlignVertical: 'top',
    borderColor: Color.colorBlack,
    borderRadius: 10,
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: '5%',
    color:Color.colorBlack
  },
  cardRoundView:{
    width:wp('40%'),
    height:wp('40%'),
    borderWidth:15,
    borderColor:'#E9F4F4',
    borderRadius:99,
    alignSelf:'flex-end',
    marginEnd:'-7%',
    marginTop:'-7%'
  },
  cardRoundViewInn:{
    width:'100%',
    height:'100%',
    backgroundColor:'#fff',
    borderRadius:99,
  },
  cardRoundView1:{
    width:wp('40%'),
    height:wp('40%'),
    borderWidth:15,
    borderColor:'#E9F4F4',
    borderRadius:99,
    alignSelf:'flex-start',
     marginStart:'-6.5%',
    marginTop:'-6.5%'
  },
  cardRoundViewInn1:{
    width:'100%',
    height:'100%',
    backgroundColor:'#fff',
    borderRadius:99,
  },
  cardInnItem:{
    flexDirection:'row',
    position:'absolute',
    justifyContent:'space-between',
  },
  cardInnLeft:{
    marginTop:'10%',
    marginLeft:'8%'
  },
});
