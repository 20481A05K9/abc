import {Platform, StyleSheet} from 'react-native';
import {Color, FontFamily, FontSize} from '../../../global';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
export const AddVechileStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: '5%',
    marginRight: '5%',
  },
  topview: {
    marginTop: '5%',
  },
  vechiletxt: {
    textAlign: 'center',
    fontFamily: FontFamily.montserratSemiBold,
    color: Color.colorBlack,
    fontSize: FontSize.size_16,
  },
  input: {
    borderWidth: 2,
    marginBottom: 16,
    padding: 10,
    borderRadius: 8,
    elevation: 2,
    backgroundColor: 'white',
    color: '#000',
    borderColor: Color.colorOrange,
    fontSize: FontSize.size_13,
    paddingVertical: Platform.OS == 'ios' ? '3%' : '4%',
  },
  img: {
    marginTop: '10%',
    alignSelf: 'center',
  },
  secondView: {
    marginTop: '8%',
  },
  secondView1: {
    marginTop: '2%',
  },
  vechilenumtxt: {
    color: Color.colorBlack,
    fontFamily: FontFamily.montserratMedium,
    fontSize: FontSize.size_16,
    marginTop: '5%',
    marginBottom: '5%',
  },
  input1: [
    {
      borderWidth: 2,
      padding: 10,
      borderRadius: 8,
      elevation: 2,
      backgroundColor: 'white',
      color: '#000',
      borderColor: Color.colorOrange,
      fontSize: FontSize.size_13,
    },
    Platform.OS == 'ios' && {paddingVertical: '3.5%'},
  ],
  insertBtnTO: {
    backgroundColor: Color.colorOrange,
    borderRadius: 10,
    paddingVertical: '4%',
    width: wp('90%'),
    marginTop: '5%',
    marginBottom: '5%',
  },
  insertBtnText: {
    color: Color.colorWhite,
    fontFamily: FontFamily.montserratMedium,
    fontSize: FontSize.size_20,
    textAlign: 'center',
  },
  placeholderStyle: {
    fontSize: 13,
    color: Color.colorBlack,
    fontFamily: FontFamily.montserratRegular,
  },
  selectedTextStyle: {
    fontSize: FontSize.size_13,
    color: Color.colorBlack,
    fontFamily: FontFamily.montserratRegular,
  },
  iconStyle: {
    tintColor: Color.colorBlack,
  },
  itemTextStyle: {
    color: Color.colorBlack,
    fontFamily: FontFamily.montserratRegular,
    fontSize: 13,
  },
  itemContainerStyle: {
    borderBottomWidth: 1,
    borderColor: Color.colorGray,
    borderRadius: 10,
  },
  containerStyle: {
    borderRadius: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 13,
    fontFamily: FontFamily.montserratRegular,
  }
});
