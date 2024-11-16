import {Platform, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {FontFamily, Color, FontSize} from '../../../global';

export const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    marginTop: '5%',
  },
  triptxt: {
    fontFamily: FontFamily.montserratSemiBold,
    color: Color.colorBlack,
    fontSize: FontSize.size_23,
    marginTop: '5%',
    marginLeft: '5%',
  },
  editTripImage: {
    width: wp('70%'),
    height: wp('50%'),
    resizeMode: 'stretch',
    alignSelf: 'center',
    marginTop: '5%',
  },
  secondView: {
    marginTop: '8%',
    marginLeft: '8%',
    marginRight: '8%',
  },
  txt1: {
    marginTop: '5%',
    fontFamily: FontFamily.montserratMedium,
    fontSize: FontSize.size_15,
    color: Color.colorBlack,
    marginBottom: '5%',
  },
  addFamilyTO: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '8%',
  },
  addFamilyText: {
    marginTop: '5%',
    fontFamily: FontFamily.montserratMedium,
    fontSize: 12,
    color: Color.colorOrange,
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
    fontSize: 16,
  },
  disabledContinue: {
    backgroundColor: '#e9d9c2',
  },
  insertBtnTO: {
    backgroundColor: Color.colorOrange,
    paddingHorizontal: '10%',
    paddingVertical: '4%',
    width: wp('88%'),
    marginLeft: '6%',
    marginTop: '15%',
    borderRadius: 10,
  },
  insertBtnText: {
    fontSize: 18,
    color: Color.colorWhite,
    // fontWeight:'bold',
    textAlign: 'center',
    fontFamily: FontFamily.montserratMedium,
  },
});
