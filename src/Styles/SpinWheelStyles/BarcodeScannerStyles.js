import {Platform, StatusBar, StyleSheet} from 'react-native';
import {Color, FontFamily, FontSize} from '../../../global';
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
  centerText: {
    fontSize: 18,
    color: '#000',
    textAlign: 'left',
    fontFamily: FontFamily.montserratMedium,
    marginHorizontal: '5%',
    marginTop: '5%',
  },
  topText: {
    fontSize: 12,
    color: '#4D4E4E',
    textAlign: 'center',
    fontFamily: FontFamily.montserratMedium,
    padding: '3%',
  },
  bottomText: {
    fontSize: 9,
    color: '#4D4E4E',
    textAlign: 'left',
    fontFamily: FontFamily.montserratRegular,
  },
  barcodeContainer: {
    width: wp('80%'),
    height: wp('15%'),
    backgroundColor: 'rgba(255, 199, 39, 0.15)',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginTop: '48%',
    zIndex: 1,
  },
  barcodeContainer2: {
    width: wp('80%'),
    height: wp('15%'),
    backgroundColor: 'rgba(255, 199, 39, 0.15)',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    marginTop: '15%',
  },
  noteText: {
    fontSize: 9,
    color: 'red',
    textAlign: 'left',
    fontFamily: FontFamily.montserratSemiBold,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  descText: {
    fontFamily: FontFamily.montserratSemiBold,
    fontSize: 10,
    color: '#000',
    textAlign: 'center',
    marginTop: '10%',
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
    padding: '2%',
    borderRadius: 21,
    width: wp('45%'),
  },
  continueButtonText: {
    color: '#F1ED8A',
    fontSize: 20,
    fontFamily: FontFamily.montserratBold,
    textAlign: 'center',
  },
  discountText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontFamily: FontFamily.montserratBold,
    textAlign: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: '35%',
    marginLeft: '-4%',
    width: wp('35%'),
  },
  scanArea: {
    width: wp('50%'),
    height: wp('50%'),
    borderWidth: 3,
    borderColor: '#F9A738',
    overflow: 'hidden',
    alignSelf: 'center',
    backgroundColor: 'rgba(173, 216, 230, 0.35)',
    marginTop: '45%',
  },
  blurArea: {
    width: wp('40%'),
    height: wp('20%'),
    borderWidth: 3,
    borderColor: '#F9A738',
    alignSelf: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.81)',
    zIndex: 1,
    marginTop: '-26.5%',
  },
  animatedLine: {
    width: '100%',
    height: 4,
    backgroundColor: '#F9A738',
    opacity: 0.7,
  },
  barcodeImg: {
    alignSelf: 'center',
    width: wp('40%'),
    height: wp('20%'),
    marginTop: '10%',
  },
  cameraNotAllowView: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp('10%'),
    marginTop: wp('30%'),
  },
  cameraNotAllowImg: {
    width: wp('40%'),
    height: wp('40%'),
    resizeMode: 'stretch',
  },
  cameraNotAllowText: {
    fontFamily: FontFamily.montserratMedium,
    fontSize: 15,
    textAlign: 'center',
    color: Color.colorBlack,
    marginTop: '5%',
  },
});
