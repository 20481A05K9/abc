import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Images} from '../../../assets/index';
import {Color, FontFamily, FontSize} from '../../../global';

export default function CardPopupModal(props) {
  const onOkPress = () => {
    props.onClose();
  };

  return (
    <Modal visible={props.visible} animationType="fade" transparent={true}>
      <View
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
        }}>
        <View style={styles.popupView}>
          <Image source={Images.TripImage3} style={{width:'auto',borderTopLeftRadius:20,borderTopRightRadius:20}}/>
          <Image source={props.img} style={styles.tripImage3} />
          <Text style={styles.triptxt1}>{props.title}</Text>
          <Text style={styles.triptxt2}>{props.message}</Text>
          <TouchableOpacity
            onPress={() => onOkPress()}
            style={styles.opacitytxt1}>
            <Text style={styles.closetxt}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  popupView: {
    backgroundColor: Color.colorWhite,
    borderRadius: 24,
    alignSelf: 'center',
    width: wp('80%'),
  },
  tripImage3: {
    alignSelf: 'center',
    marginTop: '-12%',
    width: wp('20%'),
    height: wp('17%'),
    resizeMode: 'contain',
  },
  triptxt1: {
    fontFamily: FontFamily.montserratSemiBold,
    color: Color.colorBlack,
    fontSize: FontSize.size_20,
    marginTop: '5%',
    textAlign: 'center',
  },
  triptxt2: {
    fontFamily: FontFamily.montserratMedium,
    color: '#606268',
    fontSize: FontSize.size_12,
    textAlign: 'center',
    marginTop: '10%',
    marginLeft: '2%',
    marginRight: '2%',
  },
  opacitytxt1: {
    backgroundColor: Color.colorOrange,
    borderRadius: 30,
    width: wp('40%'),
    paddingVertical: '4%',
    marginTop: '20%',
    alignSelf: 'center',
    marginBottom: '8%',
  },
  closetxt: {
    textAlign: 'center',
    color: Color.colorWhite,
    fontSize: FontSize.size_16,
    fontFamily: FontFamily.montserratMedium,
  },
});
