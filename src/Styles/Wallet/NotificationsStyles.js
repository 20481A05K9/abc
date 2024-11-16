import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {FontFamily, FontSize, Color} from '../../../global';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('3%'),
  },
  headtext: {
    fontFamily: FontFamily.montserratSemiBold,
    fontSize: FontSize.size_20,
    color: Color.colorBlack,
    marginBottom: '5%',
  },
  notificationcontainer: {
    width: wp('90%'),
    backgroundColor: Color.colorWhite,
    height: hp('10%'),
    marginBottom: '5%',
    flexDirection: 'row',
    borderRadius: 19,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  t1: {
    fontFamily: FontFamily.montserratMedium,
    fontSize: FontSize.size_13,
    color: Color.colorBlack,
  },
  t2: {
    fontFamily: FontFamily.montserratRegular,
    fontSize: FontSize.size_7,
    color: Color.colorBlack,
  },
  t3: {
    fontFamily: FontFamily.montserratMedium,
    fontSize: FontSize.size_5,
    color: Color.colorDimgray,
  },
  tcontainer: {
    rowGap: hp('.5%'),
    width: wp('60%'),
  },
});
