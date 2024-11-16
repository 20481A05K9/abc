import {StyleSheet} from 'react-native';
import {Color, FontSize, FontFamily} from '../../../global';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  addYourVehicleTypo: {
    textAlign: 'center',
    fontFamily: FontFamily.montserratSemiBold,
    color: Color.colorBlack,
    fontSize: FontSize.size_16,
    marginHorizontal: '5%',
    marginTop: '8%',
  },
  addYourVehicleTypo1: {
    color: Color.colorBlack,
    fontFamily: FontFamily.montserratMedium,
    fontSize: FontSize.size_16,
    marginTop: '10%',
    marginHorizontal: '5%',
  },
  itemView: {
    backgroundColor: '#FFFFFF',
    marginVertical: '2%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: '5%',
    paddingHorizontal: '8%',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Color.colorOrange,
  },
  itemLeftImg: {
    width: wp('10%'),
    height: wp('10%'),
    resizeMode: 'stretch',
    borderRadius: 999,
    marginRight: '5%',
    backgroundColor: Color.background,
  },
  itemMiddleView: {flex: 1, flexDirection: 'column'},
  itemNameText: {
    fontSize: 16,
    color: 'black',
    fontFamily: FontFamily.montserratSemiBold,
  },
  itemNoText: {
    fontSize: 14,
    color: 'black',
    fontFamily: FontFamily.montserratMedium,
    marginTop: '1%',
  },
  noContactView: {
    backgroundColor: '#fff',
    paddingVertical: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Color.colorOrange,
  },
  noContactText: {
    fontSize: 17,
    fontFamily: FontFamily.montserratMedium,
    color: Color.colorBlack,
  },
  addText: {
    fontSize: 16,
    color: Color.colorBlack,
    marginLeft: '3%',
    fontFamily: FontFamily.montserratMedium,
  },
  limitView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginHorizontal: '5%',
  },
  limitText: {
    fontSize: 13,
    color: Color.colorBlack,
    fontFamily: FontFamily.montserratMedium,
  },
});
