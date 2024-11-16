import {Platform, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Color, FontFamily, FontSize} from '../../../global';

export const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  searchView: [
    {
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
    },
    Platform.OS == 'ios' && {top: '5%'},
  ],
  serachbarparentcontainer1: {
    backgroundColor: Color.colorWhite,
    elevation: 4,
    borderRadius: 20,
    fontFamily: FontFamily.montserratRegular,
    marginLeft: '3%',
    borderColor: Color.colorOrange,
    borderWidth: 2,
    marginTop: '15%',
    flexDirection: 'row',
    alignItems: 'center',
    width: wp('82%'),
    alignItems: 'flex-start',
  },
  icon2: {
    marginLeft: '4%',
    marginRight: '2%',
    marginTop: '4%',
  },
  autocomplete1: {
    width: wp('68%'),
    flexDirection: 'row',
    alignItems: 'center',
  },
  markerContainer: [
    {
      justifyContent: 'center',
      backgroundColor: '#fff',
      width: wp('100%'),
      paddingHorizontal: '3%',
    },
    Platform.OS == 'ios' && {marginBottom: '8%'},
  ],
  coordinatesContainer: {
    flexDirection: 'row',
    marginVertical: '3%',
  },
  img: {
    height: wp('6%'),
    width: wp('5%'),
    marginRight: '5%',
    marginLeft: '2%',
    marginTop: '1%',
  },
  coordinateText: {
    fontSize: 16,
    fontFamily: FontFamily.montserratRegular,
    color: Color.colorBlack,
  },
  contTO: {
    backgroundColor: Color.colorOrange,
    paddingHorizontal: '5%',
    paddingVertical: '4%',
    borderRadius: 10,
    width: wp('90%'),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  contText: {
    fontSize: 18,
    color: Color.colorWhite,
    fontFamily: FontFamily.montserratRegular,
  },
  noLatLngView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: '5%',
  },
  noLatLngText: {
    fontSize: 18,
    color: Color.colorGray,
    fontFamily: FontFamily.montserratRegular,
  },

  topView: {
    marginTop: '5%',
    marginLeft: '5%',
    marginRight: '5%',
  },
  locationtxt: {
    color: Color.colorBlack,
    fontFamily: FontFamily.montserratSemiBold,
    fontSize: 22,
    fontWeight: '300',
  },
  textinput: {
    color: Color.colorBlack,
    fontSize: FontSize.size_13,
    fontFamily: FontFamily.montserratMedium,
  },
  icon: {
    marginLeft: '4%',
    marginRight: '2%',
    marginTop: '4%',
  },
  icon1: {
    marginRight: '2%',
  },
  hometxt: {
    fontFamily: FontFamily.montserratMedium,
    fontSize: 19,
    color: Color.colorBlack,
  },
  serachbarparentcontainer: {
    backgroundColor: Color.colorWhite,
    elevation: 4,
    borderRadius: 30,
    fontFamily: FontFamily.montserratRegular,
    marginLeft: '5%',
    marginRight: '5%',
    borderColor: Color.colorOrange,
    borderWidth: 2,
    marginTop: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    alignItems: 'flex-start',
  },
  autocomplete: {
    width: wp('70%'),
    flexDirection: 'row',
    alignItems: 'center',
  },
  view4: [
    {
      elevation: 5,
      backgroundColor: Color.colorWhite,
      borderRadius: 20,
      marginLeft: '5%',
      marginRight: '5%',
      paddingVertical: '4%',
      marginTop: '4%',
    },
    Platform.OS == 'ios' && {
      shadowOffset: {
        width: wp('0.1%'),
        height: hp('0.1%'),
      },
      shadowColor: Color.colorBlack,
      shadowOpacity: 0.15,
    },
  ],
  View3: {
    flexDirection: 'row',
    marginLeft: '5%',
  },
  horizontalLine: {
    borderBottomColor: Color.colorGrey,
    borderBottomWidth: 1,
    marginVertical: '4%',
    marginLeft: '5%',
    marginRight: '5%',
  },
  insertBtnTO: {
    backgroundColor: Color.colorOrange,
    borderRadius: 10,
    paddingVertical: '4%',
    width: wp('90%'),
    marginTop: '5%',
    marginBottom: '5%',
    marginLeft: '5%',
    marginRight: '5%',
  },
  insertBtnText: {
    color: Color.colorWhite,
    fontFamily: FontFamily.montserratMedium,
    fontSize: 20,
    textAlign: 'center',
  },
  location: {
    width: wp('100%'),
    height: hp('70%'),
  },
  topView1: [
    {
      flexDirection: 'row',
      alignItems: 'flex-start',
      backgroundColor: Color.colorWhite,
      paddingHorizontal: '3%',
      paddingVertical: '3%',
    },
    Platform.OS == 'ios' && {zIndex: 1},
  ],
  locationtxt1: {
    fontSize: 18,
    fontFamily: FontFamily.montserratMedium,
    color: Color.colorBlack,
    marginLeft: '4%',
  },
  txt2: {
    fontFamily: FontFamily.montserratSemiBold,
    fontSize: 24,
    color: Color.colorBlack,
    marginTop: '5%',
    marginLeft: '5%',
  },
  horizontalLine1: {
    borderBottomColor: Color.colorGrey,
    borderBottomWidth: 1,
    marginVertical: '1%',
  },
  savetxt: {
    fontFamily: FontFamily.montserratMedium,
    fontSize: 18,
    color: Color.colorBlack,
    marginLeft: '5%',
    marginTop: '2%',
    marginBottom: '3%',
  },
  addressView: {
    paddingLeft: '4%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: '3%',
  },
  hometxt1: {
    fontFamily: FontFamily.montserratSemiBold,
    color: Color.colorBlack,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Color.colorGrey,
    padding: '2%',
    alignContent: 'center',
  },
  input4: [
    {
      borderWidth: 1,
      borderColor: Color.colorOrange,
      borderRadius: 10,
      fontFamily: FontFamily.montserratMedium,
      marginTop: '2%',
      marginLeft: '5%',
      marginRight: '5%',
      padding: '2%',
      color:Color.colorBlack
    },
    Platform.OS == 'ios' && {paddingVertical: '3%'},
  ],
  input5: {
    borderWidth: 1,
    borderColor: Color.colorOrange,
    borderRadius: 10,
    marginLeft: '5%',
    fontFamily: FontFamily.montserratMedium,
    marginRight: '5%',
    padding: '2%',
    color:Color.colorBlack
  },
  othertxtfield: {
    borderWidth: 1,
    width: '35%',
    borderColor: Color.colorOrange,
    borderRadius: 10,
    marginLeft: '5%',
    marginRight: '5%',
    padding: '2%',
    bottom: '1%',
    color:Color.colorBlack
  },
  viewStyle: {
    backgroundColor: Color.colorWhite,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignSelf: 'flex-end',
  },
  viewStyle1: {
    alignItems: 'center',
    marginTop: '60%',
    marginBottom: '2%',
    width: wp('15%'),
    alignSelf: 'center',
  },
  container3: {
    flex: 1,
    marginTop: '5%',
    marginLeft: '3%',
    marginRight: '3%',
  },
  text1: {
    color: Color.colorDimgray,
    textAlign: 'center',
    fontFamily: FontFamily.montserratMedium,
    fontSize: FontSize.size_20,
  },
  container1: {
    width: wp('90%'),
    elevation: 5,
    backgroundColor: Color.colorWhite,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Color.colorOrange,
    marginTop: '5%',
    marginHorizontal: '2%',
    flexDirection: 'row',
    paddingBottom: '2%',
  },
  container2: {
    marginLeft: '3%',
    marginTop: '3%',
    width: wp('65%'),
  },
  iconstyle: {
    marginTop: '4%',
    marginLeft: '4%',
  },
  text2: {
    fontFamily: FontFamily.montserratSemiBold,
    fontSize: 15,
    color: Color.colorBlack,
  },
  text3: {
    fontFamily: FontFamily.montserratRegular,
    fontSize: 15,
    color: Color.colorBlack,
    marginTop: '2%',
  },
  editView: {
    alignItems: 'center',
    marginTop: '4%',
    flex: 1,
  },
  noRecordFound: {
    width: wp('80%'),
    height: wp('70%'),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});
