import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Animated,
  Image,
  Platform,
  Alert,
  Linking,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {Images} from '../../../assets';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import {SpinCongrats} from '../../Components/Svg/SpinWheelSvg/SpinIndexSvg';
import FastImage from 'react-native-fast-image';
import {
  SpinDiscount,
  BarcodeTopSvg,
} from '../../Components/Svg/SpinWheelSvg/SpinIndexSvg';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {styles} from '../../Styles/SpinWheelStyles/BarcodeScannerStyles';
import {connect} from 'react-redux';
import * as commonActions from '../../redux/actions/commonActions';
import * as userActions from '../../redux/actions/userActions';
import CustomStatusBar from '../../Components/CustomStatusBar';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import RNExitApp from 'react-native-kill-app';

const BarcodeScanner = props => {
  const [scannedCode, setScannedCode] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const [mobileNo, setMobileNo] = useState(null);
  const [granted, setGranted] = useState('');

  useEffect(() => {
    requestCameraPermission();
    getData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      startAnimation();
    }, []),
  );

  useEffect(() => {
    startAnimation();
  }, []);

  const getData = async () => {
    try {
      const {user} = props.userData;
      setMobileNo(user?.MOBILE_NUMBER);
    } catch (error) {
    }
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await Permission();
      if (granted === 'granted') {
        setGranted(granted);
      } else {
        let msg =
          Platform.OS == 'ios'
            ? "and ON the 'Camera'"
            : "then 'App Permissions' and then on 'Camera' to allow access.";
        Alert.alert(
          'Hold!',
          "Without camera access we will not be able to detect your camera.\n\nPlease tap on 'Settings' " +
            msg,
          [
            {
              text: 'Cancel',
              onPress: () => {},
            },
            {
              text: 'Settings',
              onPress: () => {
                Platform.OS == 'android'
                  ? (Linking.openSettings(), RNExitApp.exitApp())
                  : Linking.openSettings();
              },
            },
          ],
        );
      }
    } catch (err) {
    }
  };

  const Permission = async () => {
    let permission;

    if (Platform.OS === 'ios') {
      permission = PERMISSIONS.IOS.CAMERA;
    } else {
      permission = PERMISSIONS.ANDROID.CAMERA;
    }

    try {
      const result = await request(permission);
      if (result === RESULTS.GRANTED) {
        return RESULTS.GRANTED;
      } else {
        return RESULTS.DENIED;
      }
    } catch (error) {
      return RESULTS.DENIED;
    }
  };

  const startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(animation, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  };

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, wp('50%') - 4],
  });

  const onSuccess = async e => {
    const code = e.data;
    const data = {
      MOBILE_NUMBER: mobileNo,
      QR_CODE_NUMBER: code,
      TYPE: 'QR_CODE',
    };
    props.onSpin(
      data,
      res => onSpinBarCodeScanSuccessCallBack(res),
      error => onSpinBarCodeScanFailureCallBack(error),
    );
  };

  const onSpinBarCodeScanSuccessCallBack = async res => {
    setModalVisible(true);
    if (res?.message == 'success') {
      setScannedCode('spinAdded');
    } else {
      setScannedCode('reuse');
    }
  };

  const onSpinBarCodeScanFailureCallBack = error => {
    let msg = error;
    if (error == undefined || error == null) {
      msg = 'Something went wrong';
    }
    props.showErrorModal(msg, true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setScannedCode(null);
    if (scannedCode == 'spinAdded') {
      navigation.goBack();
    }
  };

  const renderModalContent = () => {
    return scannedCode == 'reuse' ? (
      <>
        <BarcodeTopSvg style={{marginTop: '-10%', marginLeft: '-5%'}} />
        <FastImage
          source={Images.sampBarcode}
          style={styles.barcodeImg}
          resizeMode={FastImage.resizeMode.stretch}
        />
        <View style={styles.blurArea} />
        <Text style={styles.descText}>
          {'You can’t reuse the same bar code twice in a day to claim spins.'}
        </Text>
        <TouchableOpacity onPress={handleModalClose}>
          <LinearGradient
            colors={['#C8F170', '#55D349']}
            style={[styles.continueButton, {marginTop: '3%'}]}>
            <Text style={styles.continueButtonText}>Continue</Text>
          </LinearGradient>
        </TouchableOpacity>
      </>
    ) : (
      <>
        <SpinCongrats style={{marginTop: '-6%', marginLeft: '-19%'}} />
        <SpinDiscount>
          <Text style={styles.discountText}>{'1 Spin'}</Text>
        </SpinDiscount>
        <TouchableOpacity onPress={handleModalClose}>
          <LinearGradient
            colors={['#C8F170', '#55D349']}
            style={[styles.continueButton, {marginTop: '6%'}]}>
            <Text style={styles.continueButtonText}>Claim now</Text>
          </LinearGradient>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <View style={{flex: 1}}>
      {Platform.OS == 'android' && (
        <CustomStatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />
      )}
      <FastImage
        source={Images.BarcodeBack}
        style={styles.backgroundImage}
        resizeMode={FastImage.resizeMode.stretch}>
        <View style={styles.container}>
          <Text style={styles.centerText}>Claim your spins</Text>
          {granted === 'granted' ? (
            <View>
              <QRCodeScanner
                onRead={onSuccess}
                flashMode={RNCamera.Constants.FlashMode.auto}
                reactivate={true}
                reactivateTimeout={5000}
                cameraContainerStyle={{
                  width: wp('90%'),
                  height: wp('110%'),
                  overflow: 'hidden',
                }}
                cameraStyle={{
                  width: wp('80%'),
                  height: wp('70%'),
                  marginLeft: '11.5%',
                  marginTop: '55%',
                }}
                topContent={
                  <View style={styles.barcodeContainer}>
                    <Text style={styles.topText}>
                      {'Place a Barcode at the center of your\ncamera.'}
                    </Text>
                  </View>
                }
                bottomContent={
                  <>
                    <View style={styles.barcodeContainer2} />
                  </>
                }
              />
              <View style={styles.scanArea}>
                <Animated.View
                  style={[
                    styles.animatedLine,
                    {
                      transform: [{translateY}],
                    },
                  ]}
                />
              </View>
              <View style={{alignItems: 'center', marginTop: '40%'}}>
                <Text style={styles.bottomText}>
                  <Text style={styles.noteText}>{'Note :  '}</Text>
                  {
                    'You can’t reuse the same bar code twice in a day\nto claim spins. '
                  }
                </Text>
              </View>
            </View>
          ) : (
            <View style={styles.cameraNotAllowView}>
              <Image
                source={Images.cameraNotAllow}
                style={styles.cameraNotAllowImg}
              />
              <Text style={styles.cameraNotAllowText}>
                {'Sorry, we do not have permission to access the Camera'}
              </Text>
            </View>
          )}
          <Modal
            transparent={true}
            visible={modalVisible}
            animationType="slide"
            onRequestClose={handleModalClose}>
            <View style={styles.modalContainer}>
              <LinearGradient
                colors={['#E1C3FF', '#FFFFFF']}
                style={styles.modalContent}>
                {renderModalContent()}
              </LinearGradient>
            </View>
          </Modal>
        </View>
      </FastImage>
    </View>
  );
};

const mapStateToProps = state => {
  return {userData: state.user.userData};
};

const mapDispatchToProps = dispatch => {
  return {
    onSpin: (data, successCallBack, failureCallBack) =>
      dispatch(userActions.onSpin(data, successCallBack, failureCallBack)),
    showErrorModal: (message, isFromError) =>
      dispatch(commonActions.showErrorModal(message, isFromError)),
    hideErrorModal: () => dispatch(commonActions.hideErrorModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BarcodeScanner);
