import {Platform, StatusBar, StyleSheet} from 'react-native';
import {FontFamily} from '../../../global';
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
  competitionText: {
    fontSize: 18,
    color: '#000',
    textAlign: 'left',
    fontFamily: FontFamily.montserratMedium,
    marginHorizontal: '8%',
    marginTop: '5%',
  },
  Winnername: {
    fontSize: 15,
    color: '#000',
    fontFamily: FontFamily.montserratSemiBold,
    marginTop: '9%',
    width: wp('30%'),
  },
  textunder: {
    fontSize: 15,
    color: '#F9A738',
    fontFamily: FontFamily.montserratSemiBold,
    marginTop: '4%',
    textAlign: 'center',
  },
  winnerGift: {
    fontSize: 15,
    color: '#fff',
    fontFamily: FontFamily.montserratSemiBold,
    textAlign: 'center',
    marginTop: '6%',
  },
  WindateText: {
    fontSize: 8,
    color: '#5AD894',
    fontFamily: FontFamily.montserratMedium,
    textAlign: 'center',
    marginTop: '4%',
  },
  winningDate: {
    fontSize: 8,
    color: '#FF2022',
    fontFamily: FontFamily.montserratRegular,
    marginTop: '2%',
  },
  prizeImageStyle: {
    width: wp('10%'),
    height: '8%',
    marginTop: '8%',
    marginLeft: '20%',
  },
  prizeImageStyle2: {
    width: wp('100%'),
    height: wp('50%'),
    marginTop: '4%',
    resizeMode: 'stretch',
  },
  noRecordFound: {
    width: wp('80%'),
    height: wp('70%'),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  winnerback: {
    flex: 1,
    width: wp('90%'),
    height: wp('130%'),
    resizeMode: 'stretch',
    alignSelf: 'center',
    margin: '15%',
    borderRadius: 28,
  },

  winnerItemBackground: {
    width: wp('23%'),
    height: wp('5%'),
    alignItems: 'center',
    marginTop: '5%',
    alignSelf: 'center',
  },
  winnerNameText: {
    width: wp('15%'),
    height: wp('4%'),
    fontSize: 8,
    color: '#FFFFFF',
    fontFamily: FontFamily.montserratSemiBold,
    padding: '2%',
    textAlign: 'center',
  },
  monthText2: {
    fontSize: 8,
    color: '#F9A738',
    fontFamily: FontFamily.montserratSemiBold,
    marginLeft: '50%',
    marginTop: '10%',
    width: wp('40%'),
  },
  winnercontainer1: {
    width: wp('21%'),
    height: wp('20%'),
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginTop: '10%',
  },
  winnercontainer2: {
    width: wp('21%'),
    height: wp('32%'),
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginTop: '10%',
  },
  winnercontainer3: {
    width: wp('21%'),
    height: wp('16%'),
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginTop: '10%',
  },
  airpods2: {
    width: wp('13%'),
    height: wp('13%'),
    resizeMode: 'stretch',
    alignSelf: 'center',
  },
  alexa2: {
    width: wp('15%'),
    height: wp('8%'),
    resizeMode: 'stretch',
    alignSelf: 'center',
  },
  prizebox2: {
    width: wp('10%'),
    height: wp('10%'),
    resizeMode: 'stretch',
    alignSelf: 'center',
  },
  idtoken: {
    padding: '3.5%',
    width: wp('15%'),
    height: wp('4%'),
    resizeMode: 'stretch',
    alignSelf: 'center',
    marginTop: '10%',
  },
  idtoken2: {
    padding: '3.5%',
    width: wp('15%'),
    height: wp('4%'),
    resizeMode: 'stretch',
    alignSelf: 'center',
    marginTop: '1%',
  },
  prize: {
    width: wp('12%'),
    height: wp('10%'),
    resizeMode: 'stretch',
    alignSelf: 'center',
    marginTop: '10%',
  },
  prizetext1: {
    fontSize: 10,
    color: '#FFF',
    fontFamily: FontFamily.montserratSemiBold,
    textAlign: 'center',
    width: wp('21%'),
    marginTop: '15%',
  },
  prizetext2: {
    fontSize: 8,
    color: '#FFF',
    fontFamily: FontFamily.montserratMedium,
    textAlign: 'center',
    width: wp('21%'),
  },
  prizetext3: {
    fontSize: 5,
    color: '#FFF',
    fontFamily: FontFamily.montserratSemiBold,
    textAlign: 'center',
  },
  appreciationtext: {
    fontSize: 16,
    color: '#712F00',
    fontFamily: FontFamily.montserratBold,
  },
  itemNotShow: {
    width: wp('10%'),
    marginHorizontal: '4%',
  },
  top3WinnerView: {
    height: wp('30%'),
    marginTop: '28%',
  },
});
