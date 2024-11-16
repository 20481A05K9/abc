import {Platform, StatusBar, StyleSheet} from 'react-native';
import {Color, FontFamily} from '../../../global';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export const styles = StyleSheet.create({
  backgroundImage: [
    {
      flex: 1,
      width: '100%',
      height: '100%',
      resizeMode: 'stretch',
      paddingTop: StatusBar.currentHeight,
    },
    Platform.OS == 'ios' && {
      paddingTop: '10%',
    },
  ],
  container: {
    flex: 1,
  },
  spinsLeftContainer: {
    width: wp('13%'),
    height: wp('13%'),
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 50,
    alignItems: 'center',
    flexDirection: 'column',
    marginRight: '5%',
    justifyContent: 'center',
  },
  spinsLeftContainer2: {
    width: wp('13%'),
    height: wp('13%'),
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 50,
    alignItems: 'center',
    marginLeft: '5%',
  },
  goldBack: {
    width: wp('80%'),
    height: wp('80%'),
  },
  spinsLeftText: {
    height: wp('7.5%'),
    fontSize: 18,
    color: '#FFAA06',
    fontFamily: FontFamily.montserratBold,
    marginTop: '-5%',
  },
  spinsLeftText2: {
    fontSize: 6,
    color: '#F9A738',
    fontFamily: FontFamily.montserratBold,
    marginTop: '-5%',
  },
  competitionText: {
    fontSize: 14,
    color: '#000',
    fontFamily: FontFamily.montserratSemiBold,
    marginTop: '8%',
    marginLeft: '50%',
  },
  knowText: {
    fontSize: 8,
    color: '#FFFFFF',
    fontFamily: FontFamily.montserratRegular,
    textAlign: 'center',
    alignItems: 'center',

    padding: '8%',
  },
  descText: {
    fontSize: 16,
    color: '#000',
    fontFamily: FontFamily.montserratBold,
    textAlign: 'center',
    alignItems: 'center',
    marginTop: '2%',
  },
  discountText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontFamily: FontFamily.montserratBold,
    textAlign: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: '24%',
    width: wp('35%'),
  },
  noPrizeText: {
    fontSize: 12,
    color: '#000',
    fontFamily: FontFamily.montserratBold,
    textAlign: 'center',
    alignItems: 'center',
    marginTop: '32%',
  },
  discountText2: {
    fontSize: 18,
    color: '#FFFFFF',
    fontFamily: FontFamily.montserratBold,
    textAlign: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: '36%',
    width: wp('35%'),
    marginLeft: '-5%',
  },
  iconScan: {
    padding: '17%',
  },

  knowMore: {
    borderRadius: 15,
    width: wp('26%'),
    height: wp('8%'),
    backgroundColor: '#263238',
    marginTop: '-15%',
    marginLeft: '55%',
    flexDirection: 'row',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: wp('80%'),
    height: wp('90%'),
    borderRadius: 36,
    alignItems: 'center',
    borderWidth: 7,
    borderColor: '#D5CBCB',
  },
  continueButton: {
    marginTop: '10%',
    borderRadius: 21,
    width: wp('47%'),
    alignSelf: 'center',
    elevation: 20,
    shadowColor: '#000',
  },
  continueButtonGradient: {
    borderRadius: 21,
  },
  continueButtonText: {
    color: '#F1ED8A',
    fontSize: 16,
    fontFamily: FontFamily.montserratBold,
    textAlign: 'center',
    marginTop: '-1%',
    paddingVertical: '4%',
  },
  alexaImg: {
    width: wp('36%'),
    height: wp('20%'),
    alignSelf: 'center',
    marginTop: '4%',
  },
  airpodsImg: {
    width: wp('30%'),
    height: wp('32%'),
    alignSelf: 'center',
    marginTop: '-8%',
  },
  addMoreButton: {
    marginTop: '6%',
    flexDirection: 'row',
    marginLeft: '-40%',
  },
  tcView: {
    alignItems: 'center',
    marginEnd: '7%',
    marginTop: '3%',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginBottom:'3%'
  },
  tcText: {
    color: '#efefef',
    fontSize: 12,
    fontFamily: FontFamily.montserratRegular,
  },
  tcTextLink: {
    color: Color.colorInprogress,
    fontFamily: FontFamily.montserratSemiBold,
    fontSize: 12,
  },
  modalContainer2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent2: {
    width: wp('90%'),
    maxHeight: hp('90%'),
    backgroundColor: '#fff',
    borderRadius: 6,
    padding: '3%',
  },
  tcModalText: {
    color: Color.colorInprogress,
    fontFamily: FontFamily.montserratMedium,
    fontSize: 11,
  },
  button:{
    marginTop:'10%'
  }
});
