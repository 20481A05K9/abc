import React from 'react';
import {View, StyleSheet, Modal, Image, ActivityIndicator} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function CustomLoader(props) {
  return (
    <Modal visible={props.visible} animationType={'fade'} transparent={true}>
      <View style={styles.Loader_View_Style}>
        <ActivityIndicator size="large" color="#FF9300" />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  Loader_View_Style: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignSelf: 'center',
    marginTop: hp('46%'),
    borderRadius: 5,
    paddingVertical: '3%',
    paddingHorizontal: '3%',
  },
});
