import React, {useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  BackHandler,
  TouchableOpacity,
} from 'react-native';
import {Images} from '../../../assets';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Color, FontFamily, FontSize} from '../../../global';
import CustomStatusBar from '../CustomStatusBar';
import {useNavigation} from '@react-navigation/native';

const SuccessFail = props => {
  const {name, status, TripID} = props.route.params || {};
  const navigation = useNavigation();

  useEffect(() => {
    if (status == 1) {
      if (name === 'UPLOADSUCCESS' || name === 'PPIWALLETSUCCESS') {
        const timer = setTimeout(() => {
          navigation.goBack();
        }, 1000);
        return () => clearTimeout(timer);
      } else if (name === 'TRIPSUCCESS' || name === 'PPIPHYCARDSUCCESS') {
        const onGoBackHandler = () => {
          navigation.navigate('BottomTabNavigation');
          return true;
        };
        BackHandler.addEventListener('hardwareBackPress', onGoBackHandler);
        navigation.addListener('gestureEnd', onGoBackHandler);
        return () => {
          BackHandler.removeEventListener('hardwareBackPress', onGoBackHandler);
          navigation.removeListener('gestureEnd', onGoBackHandler);
        };
      }
    }
  }, []);

  const renderTitleMessage = (title, message) => {
    return (
      <View>
        <Text style={styles.uploadText}>{title}</Text>
        <Text style={styles.thankYouText}>{message}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <CustomStatusBar backgroundColor={'#efefef'} barStyle="dark-content" />
      <Image
        source={status == 1 ? Images.CircleCheck : Images.CircleCross}
        style={styles.CheckSymbol}
      />
      {status == 1 ? (
        name === 'UPLOADSUCCESS' ? (
          renderTitleMessage(
            'Uploaded Successfully',
            'Thank you! your upload is completed successfully.',
          )
        ) : name === 'PPIWALLETSUCCESS' ? (
          renderTitleMessage(
            'Transaction Successful',
            'Thank you! your transaction is completed successfully.',
          )
        ) : name === 'TRIPSUCCESS' || name === 'PPIPHYCARDSUCCESS' ? (
          <View>
            {renderTitleMessage(
              'Payment Successful',
              'Your purchase is successful, Thank you.',
            )}
            {TripID && (
              <TouchableOpacity
                style={styles.continueButton}
                onPress={() => {
                  navigation.navigate('TripList', {TripID});
                }}>
                <Text style={styles.continueButtonText}>Trip History</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : name === 'HELPCENTER' ? (
          <View>
            {renderTitleMessage('THANK YOU', `We will Touch in Shortly`)}
          </View>
        ) : null
      ) : name === 'UPLOADFAIL' ? (
        renderTitleMessage(
          'Upload Failed!',
          'Please check your Uploads and start again.',
        )
      ) : name === 'TRIPFAIL' ? (
        renderTitleMessage(
          'Payment Failed!',
          'Something went wrong. Please try again.',
        )
      ) : name === 'HELPCENTERFAIL' ? (
        renderTitleMessage('SORRY!', 'Something went wrong. Please try again.')
      ) : null}
      <Image
        source={status == 1 ? Images.SuccessBg : Images.FailureBg}
        style={styles.successBg}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  CheckSymbol: {
    alignSelf: 'center',
    width: wp('35%'),
    height: wp('35%'),
    marginTop: '40%',
  },
  uploadText: {
    fontFamily: FontFamily.montserratSemiBold,
    fontSize: FontSize.size_18,
    color: Color.colorBlack,
    textAlign: 'center',
    marginTop: '10%',
  },
  thankYouText: {
    fontFamily: FontFamily.montserratRegular,
    fontSize: FontSize.size_12,
    color: Color.colorBlack,
    textAlign: 'center',
    marginTop: '2%',
  },
  successBg: {
    position: 'absolute',
    bottom: 0,
    width: wp('100%'),
    resizeMode: 'cover',
    zIndex: -1,
  },
  continueButton: {
    backgroundColor: '#FF9300',
    borderRadius: 10,
    justifyContent: 'center',
    paddingVertical: '4%',
    marginTop: '15%',
    width: wp('80%'),
    alignItems: 'center',
    alignSelf: 'center',
    zIndex: 1,
  },
  continueButtonText: {
    fontSize: 20,
    color: '#FFFFFF',
    fontFamily: FontFamily.montserratMedium,
  },
});

export default SuccessFail;
