import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Images} from '../../../assets/index';
import {Color} from '../../../global';

export default function Validation(props) {
  let Visible = props.visible;
  let Message = props.message;

  const onOkPress = () => {
    props.onRetry();
  };

  return (
    <Modal visible={Visible} animationType={'fade'} transparent={true}>
      <View style={styles.MSGAlertBGViewStyle}>
        <View style={styles.MSGAlert_Main_View_Style}>
          <Image
            source={Images.logofig}
            style={{...styles.MSGAlertImageStyle, resizeMode: 'contain'}}
          />
          <Text
            style={styles.Message_TextStyle}
            numberOfLines={4}
            ellipsizeMode="tail">
            {Message}
          </Text>
          <TouchableOpacity
            style={styles.BtnMSGTouchStyle}
            onPress={() => onOkPress()}
            activeOpacity={0.2}>
            <Text style={styles.BtnOkTextStyle}> Ok </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  BtnMSGTouchStyle: {
    width: wp('17%'),
    height: wp('10%'),
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: Color.colorPrimary,
    paddingHorizontal: '2%',
    paddingVertical: '1%',
    marginTop: '2%',
    alignSelf: 'flex-end',
    marginBottom: '4%',
    marginRight: '4%',
  },
  BtnOkTextStyle: {
    color: Color.colorWhite,
    textAlign: 'center',
    fontSize: 17,
    fontFamily: 'Montserrat-Regular',
  },
  MSGAlertBGViewStyle: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  MSGAlert_Main_View_Style: {
    width: wp('80%'),
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: Color.colorWhite,
    borderRadius: 10,
  },
  Message_TextStyle: {
    color: Color.colorBlack,
    width: '95%',
    textAlignVertical: 'center',
    textAlign: 'center',
    fontSize: 15,
    fontFamily: 'Montserrat-Regular',
    marginVertical: '2%',
  },
  MSGAlertImageStyle: {
    width: wp('30%'),
    height: wp('20%'),
    marginTop: '1%',
  },
});
