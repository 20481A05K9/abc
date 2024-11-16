import {StyleSheet} from 'react-native';
import {Color, FontFamily, FontSize} from '../../../../global';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorbackground,
  },
  tripImage21: {
    width: wp('15%'),
    height: wp('5%'),
  },
  History:{
    fontFamily:FontFamily.montserratMedium,
    fontSize:FontSize.size_25,
    color:Color.colorBlack,
    marginLeft:'5%',
     marginTop:'3%',
    marginBottom:'3%'
  },
  bg:{
    width:wp('90%'),
    height:'auto',
    marginLeft:'5%',
    marginRight:'5%',
    backgroundColor:Color.colorWhite,
    borderRadius:10,
    elevation: 5,
    padding:'4%',
    marginBottom:'3%',
    shadowColor: 'skyblue',
    shadowOpacity: 0.5,
    shadowOffset: { width: 10, height: 10 },
    shadowRadius: 5,
  },
  view1:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignContent:'space-between'
  },
  recharge:{
    fontFamily:FontFamily.montserratMedium,
    fontSize:FontSize.size_13,
    color:Color.colorBlack
  },
  view2:{
    marginTop:'10%',
    marginBottom:'3%'
  },
  vehicle:{
    fontFamily:FontFamily.montserratSemiBold,
    fontSize:FontSize.size_11,
    color:Color.colorBlack,
    marginTop:'2%'
  },
  num:{
    fontFamily:FontFamily.montserratRegular
  },
  payment:{
    color:'red',
    fontFamily:FontFamily.montserratMedium,
    fontSize:6,
    marginTop:'4%'
  },
  again:{
    fontFamily:FontFamily.montserratRegular,
    fontSize:8,
    color:Color.colorBlack
  },
  again1:{
    borderWidth:1,
    borderColor: '#3DCF65',
    padding:'1%',
    borderRadius:20,
    flexDirection:'row',
    marginTop:'2%',
    alignItems:'center'
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
