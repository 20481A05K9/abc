import {StyleSheet} from 'react-native';
import {FontFamily, FontSize, Color} from '../../../global';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addVehicleButton: {
    width: '90%',
    padding: 8,
    backgroundColor: Color.colorOrange,
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 20,
    marginTop: '5%',
  },
  addVehicleButtonText: {
    color: Color.colorWhite,
    fontSize: FontSize.size_lg_1,
    fontFamily: FontFamily.montserratSemiBold,
    padding: 12,

    alignSelf: 'center',
  },
  container1: {
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
  img: {
    marginTop: '10%',
    alignSelf: 'center',
  },
  secondView: {
    marginTop: '8%',
  },
  vechilenumtxt: {
    color: Color.colorBlack,
    fontFamily: FontFamily.montserratMedium,
    fontSize: FontSize.size_16,
    marginBottom: '4%',
  },
});
