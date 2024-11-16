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
    marginTop: hp('3%'),
  },
  texthead: {
    color: Color.colorBlack,
    fontFamily: FontFamily.montserratSemiBold,
    fontSize: FontSize.size_20,
  },
  mobinp: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Color.colorGray,
    width: wp('70%'),
    borderRadius: 14,
    alignItems: 'center',
    paddingHorizontal: '4%',
  },
  mobileconatiner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: '7%',
  },
  contactcontainer: {
    alignItems: 'flex-start',
    rowGap: hp('2%'),
  },
  contactimage: {
    height: wp('13%'),
    width: wp('13%'),
    borderRadius: 100,
  },
  contacttext: {
    fontFamily: FontFamily.montserratMedium,
    color: Color.colorBlack,
    fontSize: FontSize.size_8,
  },
  texttransact: {
    fontSize: FontSize.size_12,
    fontFamily: FontFamily.montserratMedium,
    color: Color.colorBlack,
  },
  texttransact1: {
    fontSize: FontSize.size_12,
    fontFamily: FontFamily.montserratMedium,
    color: '#df89be',
  },
  trancontainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: '7%',
  },
  list: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  horizontalLine: {
    borderBottomColor: Color.colorGray,
    borderBottomWidth: 1,
    marginVertical: '4%',
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
  textinp: {
    fontFamily: FontFamily.montserratRegular,
    fontSize: FontSize.size_10,
    width: wp('50%'),
    paddingVertical: '5%',
    marginLeft: '2%',
    color: Color.colorBlack,
  },
});
