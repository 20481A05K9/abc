import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {FontFamily, FontSize, Color} from '../../../global';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: wp('5%'),
    marginVertical: hp('3%'),
    alignitems: 'flex-start',
  },
  texthead: {
    fontFamily: FontFamily.montserratSemiBold,
    fontSize: FontSize.size_20,
    color: Color.colorBlack,
    marginBottom: '5%',
  },
  mobinp: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Color.colorGray,
    width: wp('75%'),
    borderRadius: 14,
    alignItems: 'center',
    paddingHorizontal: '4%',
    marginBottom: '5%',
  },
  textinp: {
    fontFamily: FontFamily.montserratRegular,
    fontSize: FontSize.size_10,
    width: wp('50%'),
    paddingVertical: '6%',
  },
  horizontalLine: {
    borderBottomColor: Color.colorGray,
    borderBottomWidth: 1,
    marginVertical: '4%',
  },
  contactimage: {
    height: wp('15%'),
    width: wp('15%'),
    borderRadius: 100,
  },
  list: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textdeb1: {
    fontFamily: FontFamily.montserratMedium,
    fontSize: FontSize.size_15,
    color: Color.colorBlack,
  },
  textdeb2: {
    fontFamily: FontFamily.montserratRegular,
    fontSize: FontSize.size_9,
    color: Color.colorGray,
  },
  texthistory: {
    fontFamily: FontFamily.montserratSemiBold,
    fontSize: FontSize.Size_12,
  },
  statuscontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: wp('.5%'),
  },
  statustext: {
    fontFamily: FontFamily.montserratMedium,
    fontSize: FontSize.size_7,
  },
  colorcontainer: {
    marginRight: '3%',
    rowGap: hp('1%'),
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: wp('90%'),
    justifyContent: 'space-between',
    paddingVertical: hp('1%'),
    rowGap: hp('10%'),
  },
  modalcomponent: {
    paddingVertical: hp('1%'),
    height: hp('15%'),
    width: wp('40%'),
    alignItems: 'center',
  },
  modaltext: {
    fontSize: FontSize.size_10,
    color: Color.colorBlack,
    fontFamily: FontFamily.montserratMedium,
  },
  buttontxt: {
    fontFamily: FontFamily.montserratSemiBold,
    fontSize: 10,
    color: Color.colorWhite,
  },
  linearGradient: {
    height: hp('4%'),
    width: wp('30%'),
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
