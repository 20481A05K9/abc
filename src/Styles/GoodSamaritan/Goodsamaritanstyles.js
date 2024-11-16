import {StyleSheet} from 'react-native';
import {FontFamily, Color} from '../../../global';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorbackground,
  },
  primarytext: {
    fontSize: 25,
    fontFamily: FontFamily.montserratMedium,
    color: Color.colorBlack,
    bottom: '10%',
    right: '2%',
  },
  firstchild: {
    flex: 1,
    top: '15%',
    left: '5%',
  },

  secondarytext: {
    fontSize: 18,
    fontFamily: FontFamily.montserratMedium,
    color: Color.colorBlack,
    top: '1%',
  },

  Reportbtn: {
    borderRadius: 10,
    boxShadow: '0px 1px 4px 0px rgba(0, 0, 0, 0.25)',
    width: wp('90%'),
    height: hp('9%'),
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: FontFamily.montserratMedium,
    elevation: 4,
    top: '4%',
   
  },
  btntext: {
    textAlign: 'center',
    top: '23%',
    fontFamily: FontFamily.montserratSemiBold,
    fontSize: 23,
    fontWeight: '600',
    color: Color.colorWhite,
  },
  gradient: {
    width: wp('90%'),
    height: hp('9%'),
    borderRadius: 10,
  },
 
  reportToggleText: {
    fontSize: 15,
    color: '#000',
    fontFamily:FontFamily.montserratMedium
  },
 
  reportItem: {
    fontSize: 12,
    color: '#000',
   marginLeft:"2%",
    fontFamily:FontFamily.montserratMedium
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  radioButton: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#3D80CF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonSelected: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#3D80CF',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
});

export const darkstyles=StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black', // Changed to black
  },
  primarytext: {
    fontSize: 25,
    fontFamily: FontFamily.montserratMedium,
    color: 'white', // Changed to white
    bottom: '10%',
    right: '2%',
  },
  firstchild: {
    flex: 1,
    top: '15%',
    left: '5%',
  },

  secondarytext: {
    fontSize: 18,
    fontFamily: FontFamily.montserratMedium,
    color: 'white', // Changed to white
    top: '1%',
  },

  Reportbtn: {
    borderRadius: 10,
    boxShadow: '0px 1px 4px 0px rgba(0, 0, 0, 0.25)',
    width: wp('90%'),
    height: hp('9%'),
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: FontFamily.montserratMedium,
    elevation: 4,
    top: '4%',
    backgroundColor: 'black', // Changed to black
  },
  btntext: {
    textAlign: 'center',
    top: '23%',
    fontFamily: FontFamily.montserratSemiBold,
    fontSize: 23,
    fontWeight: '600',
    color: 'white', // Changed to white
  },
  gradient: {
    width: wp('90%'),
    height: hp('9%'),
    borderRadius: 10,
  },
 
  reportToggleText: {
    fontSize: 15,
    color: 'white', // Changed to white
    fontFamily: FontFamily.montserratMedium
  },
 
  reportItem: {
    fontSize: 12,
    color: 'white', // Changed to white
    marginLeft: "2%",
    fontFamily: FontFamily.montserratMedium
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  radioButton: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#3D80CF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonSelected: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#3D80CF',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Keeps overlay as is
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'black', // Changed to black
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'blue', // Changed to blue as you previously had it
    borderRadius: 5,
  },

})