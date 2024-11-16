import React from 'react';
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
import {Color} from '../../../global';
import {Images} from '../../../assets';

export default function PermissionAllow(props) {
  let Visible = props.visible;
  let Message = props.message;

  const onCancelPress = () => {
    props.onCancel();
  };

  const onOkPress = () => {
    props.onSetting();
  };

  return (
    <Modal visible={Visible} animationType={'fade'} transparent={true}>
      <View style={styles.MSGAlertBGViewStyle}>
        <View style={styles.MSGAlert_Main_View_Style}>
          <Image source={Images.logofig} style={styles.MSGAlertImageStyle} />
          <Text style={styles.Message_TextStyle} ellipsizeMode="tail">
            {Message}
          </Text>
          <View style={styles.Exit_MSG_Btn_ViewStyle}>
            <TouchableOpacity
              style={styles.BtnMSGTouchStyle}
              onPress={() => onCancelPress()}
              activeOpacity={0.2}>
              <Text style={styles.BtnOkTextStyle}> {'Cancel'} </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.BtnMSGTouchStyle}
              onPress={() => onOkPress()}
              activeOpacity={0.2}>
              <Text style={styles.BtnOkTextStyle}> {'Settings'} </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  MSGAlertBGViewStyle: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  Exit_MSG_Btn_ViewStyle: {
    width: wp('80%'),
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: '5%',
  },
  MSGAlert_Main_View_Style: {
    width: wp('90%'),
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: Color.colorWhite,
    borderRadius: 10,
  },
  MSGAlertImageStyle: {
    width: wp('30%'),
    height: wp('20%'),
    resizeMode: 'contain',
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
  BtnMSGTouchStyle: {
    width: wp('26%'),
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: Color.colorPrimary,
    paddingHorizontal: '2%',
    paddingVertical: '4%',
    marginTop: '2%',
    alignSelf: 'flex-end',
    marginBottom: '4%',
    marginRight: '4%',
  },
  BtnOkTextStyle: {
    color: Color.colorWhite,
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Montserrat-Regular',
  },
});
