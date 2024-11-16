import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {StyleSheet} from 'react-native';
import {FontSize, FontFamily, Color} from '../../../global';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('5%'),
  },
  topcontainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: '10%',
  },
  texthead: {
    color: Color.colorBlack,
    fontFamily: FontFamily.montserratSemiBold,
    fontSize: FontSize.size_20,
  },
  image: {
    height: wp('20%'),
    width: wp('20%'),
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#df89be',
  },
  imagecontainer: {
    alignItems: 'center',
    marginBottom: '10%',
  },
  name: {
    fontFamily: FontFamily.montserratSemiBold,
    fontSize: FontSize.size_15,
    color: Color.colorBlack,
  },
  inputtext: {
    width: wp('40%'),
    fontSize: FontSize.size_34,
    fontFamily: FontFamily.montserratSemiBold,
    color: Color.colorBlack,
    borderBottomWidth: 1,
    borderColor: Color.colorGray,
    marginBottom: '1%',
  },
  messagecontainer: {
    alignItems: 'flex-start',
    rowGap: hp('2%'),
    marginBottom: '10%',
  },
  message: {
    backgroundColor: Color.colorWhite,
    width: wp('90%'),
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#DAE0E2',
    padding: '3%',
    color: '#374151',
    fontFamily: FontFamily.montserratRegular,
    fontSize: FontSize.size_12,
  },
  transactioncontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: wp('5%'),
    marginBottom: '10%',
  },
  transacthead: {
    fontFamily: FontFamily.montserratSemiBold,
    fontSize: FontSize.size_12,
    color: Color.colorBlack,
  },
  transacttext: {
    fontFamily: FontFamily.montserratRegular,
    fontSize: FontSize.size_13,
    color: Color.colorGray,
  },
  timestamp: {
    fontFamily: FontFamily.montserratRegular,
    fontSize: FontSize.size_10,
    color: Color.colorGray,
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
});
