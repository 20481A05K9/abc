import {StyleSheet} from 'react-native';
import {FontFamily, FontSize, Color} from '../../../../global';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: '5%',
    marginRight: '5%',
  },
  tripdetailtext: {
    color: 'black',
    fontWeight: '600',
    fontSize: 23,
    fontFamily: FontFamily.montserratSemiBold,
    marginTop: '5%',
  },
  view1: {
    borderRadius: 10,
    elevation: 2,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: Color.colorOrange,
  },
  livetxtView:{
    backgroundColor: 'black',
    borderTopRightRadius: 10,
    paddingVertical: '2%',
    paddingHorizontal: '8%',
    alignSelf: 'flex-end',
  },
  livetxt: {
    color: 'white',
    fontFamily: FontFamily.montserratMedium,
    textAlign: 'center',
    fontSize: 13,
  },
  leftcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: '4%',
  },
  from: {
    color: '#FF9300',
    fontSize: 20,
    fontFamily: FontFamily.montserratSemiBold,
    marginTop: '4%',
    width: wp('30%'),
  },
  banglore: {
    color: 'black',
    fontSize: 15,
    fontFamily: FontFamily.montserratMedium,
  },
  id: {
    color: 'black',
    fontSize: 15,
    fontFamily: FontFamily.montserratMedium,
    marginTop: '4%',
    marginHorizontal: '4%',
  },
  flag: {
    width: wp('10%'),
    height: hp('10%'),
  },
  to: {
    color: '#FF9300',
    fontSize: 20,
    fontFamily: FontFamily.montserratSemiBold,
    marginTop: '4%',
    width: wp('40%'),
    marginLeft: '5%',
  },
  hyd: {
    color: 'black',
    fontSize: 15,
    fontFamily: FontFamily.montserratMedium,
  },
  date: {
    color: '#D83A20',
    fontFamily: FontFamily.montserratMedium,
    fontSize: 13,
    marginTop: '5%',
    textAlign: 'right',
    marginRight: '5%',
    marginBottom: '3%',
  },
  view2: {
    borderRadius: 10,
    elevation: 2,
    paddingHorizontal: '5%',
    backgroundColor: 'white',
    marginTop: '5%',
    paddingBottom: '3%',
    borderWidth: 1,
    borderColor: Color.colorOrange,
  },
  bottomBtnView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  download: {
    borderColor: '#FF9300',
    borderWidth: 1,
    borderRadius: 30,
    width: wp('40%'),
    marginTop: '5%',
    marginBottom: '10%',
  },
  downloadtext: {
    color: '#FF9300',
    textAlign: 'center',
    padding: '5%',
    fontSize: 14,
    fontFamily: FontFamily.montserratSemiBold,
  },
  fastaglogo: {
    width: wp('30%'),
    height: wp('10%'),
    marginTop: '3%',
  },
  fastagvehicle: {
    color: '#FF9300',
    marginLeft: '5%',
    fontSize: 15,
    fontFamily: FontFamily.montserratMedium,
    marginTop: '4%',
  },
  fastagvehno: {
    fontSize: 13,
    color: 'black',
    fontFamily: FontFamily.montserratMedium,
  },
  fastagID: {
    marginLeft: '5%',
    fontSize: 15,
    color: 'black',
    marginBottom: '5%',
    fontFamily: FontFamily.montserratMedium,
  },
  insurance: {
    color: '#FF9300',
    fontWeight: '500',
    fontSize: 20,
    fontFamily: FontFamily.montserratSemiBold,
  },
  familyperson1: {
    color: 'black',
    fontSize: 15,
    fontFamily: FontFamily.montserratMedium,
    marginVertical: '1%',
  },
  familyImgView: {
    flex: 1 / 2,
    alignSelf: 'flex-end',
  },
  familyimg: {
    width: wp('45%'),
    height: wp('29%'),
  },
  refno: {
    color: 'black',
    fontSize: 13,
    fontFamily: FontFamily.montserratMedium,
  },
  rsavehicleno: {
    color: '#FF9300',
    fontSize: 15,
    fontFamily: FontFamily.montserratSemiBold,
    marginTop: '3%',
  },
  rsanoplate: {
    color: 'black',
    fontSize: 13,
    fontFamily: FontFamily.montserratMedium,
  },
  rsaBottomView: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: '5%',
  },
  rsadate: {
    color: '#D83A20',
    fontSize: 15,
    fontFamily: FontFamily.montserratMedium,
  },
  starthealth: {
    width: wp('30%'),
    height: wp('10%'),
    marginTop: '3%',
  },
  familymembers: {
    fontSize: 15,
    fontFamily: FontFamily.montserratSemiBold,
    color: '#FF9300',
  },
  frameInner: {
    width: wp('30%'),
    height: wp('15%'),
    resizeMode: 'contain',
  },
  insuranceHorizontalLine: {
    width: '100%',
    height: 1,
    backgroundColor: Color.Inputborder,
    marginTop: '4%',
  },
  insuranceBottomView: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: '5%',
  },
  downloadBtnTO: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: '1%',
    paddingRight: '5%',
    backgroundColor: Color.colorWhite,
    elevation: 5,
    borderRadius: 30,
    paddingVertical: '1%',
  },
  downloadBtnText: {
    fontSize: 15,
    color: Color.colorBlack,
    fontFamily: FontFamily.montserratMedium,
    marginLeft: '5%',
  },
  nov20233: {
    fontSize: 13,
    color: '#D83A20',
    fontFamily: FontFamily.montserratMedium,
  },
  insuranceNoteText: {
    fontSize: 10,
    color: '#D83A20',
    fontFamily: FontFamily.montserratMedium,
    marginTop: '10%',
    marginBottom: '5%',
  },
  familyMView: {
    marginTop: '4%',
  },
  familyMName: {
    fontSize: 13,
    fontFamily: FontFamily.montserratMedium,
    color: '#000',
  },
  familyMId: {
    fontSize: 13,
    fontFamily: FontFamily.montserratRegular,
    color: '#000',
  },
  familyMView1: {
    borderRadius: 10,
    elevation: 2,
    paddingHorizontal: '5%',
    backgroundColor: 'white',
    marginTop: '5%',
  },
  MSGAlertBGViewStyle: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  MSGAlert_Main_View_Style: {
    width: wp('90%'),
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: Color.colorWhite,
    borderRadius: 10,
    paddingBottom: '3%',
  },
  BtnMSGTouchStyle: {
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: Color.Inputback,
    paddingHorizontal: '2%',
    paddingVertical: '1%',
    marginTop: '2%',
    alignSelf: 'flex-end',
    marginBottom: '4%',
    marginRight: '4%',
  },
  urlView: {
    marginHorizontal: '5%',
  },
  urlText: {
    color: Color.colorInprogress,
    fontSize: FontSize.size_15,
    fontFamily: FontFamily.montserratRegular,
  },
  horizontalLine: {
    width: '95%',
    height: 1,
    backgroundColor: Color.colorGray,
    alignSelf: 'center',
    marginVertical: '2%',
  },
  comingSoonText: {
    color: Color.colorDarkorange,
    fontSize: FontSize.size_18,
    fontFamily: FontFamily.montserratRegular,
  },
});
