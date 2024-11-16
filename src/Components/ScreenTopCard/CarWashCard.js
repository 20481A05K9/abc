import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {FontFamily, FontSize} from '../../../global';
import LinearGradient from 'react-native-linear-gradient';

export default function CarWashCard(props) {
  return (
    <LinearGradient
      style={styles.topView1}
      start={{x: 0, y: 0}}
      end={{x: 0, y: 1}}
      colors={[props.bg1, props.bg2]}>
      {props.roundShow && (
        <View style={[styles.cardRoundView, {borderColor: props.round1}]}>
          <View
            style={[styles.cardRoundViewInn, {borderColor: props.round2}]}
          />
        </View>
      )}
      <Image
        source={props.img}
        style={props.imgStyle ? styles.tripImage22 : styles.tripImage23}
      />
      {props.img1? <Image source={props.img1} style={styles.tripImage}/> : null}
      <View style={styles.cardInnItem}>
        <View style={styles.cardInnLeft}>
          <Text
            style={[styles.journeytxt111, props.titleColor && {color: '#fff'}]}>
            {props.txt1}
            <Text
              style={[
                styles.journeytxt222,
                props.imgStyle && {color: '#27C4F4'},
              ]}>
              {props.txt2}
            </Text>
          </Text>
          <LinearGradient
            style={styles.insertBtn2}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={[props.btn1, props.btn2]}>
            <TouchableOpacity
              onPress={() => props.onPress()}
              activeOpacity={0.5}>
              <Text
                style={[styles.BtnText1, props.titleColor && {color: '#000'}]}>
                {props.btnText}
              </Text>
            </TouchableOpacity>
          </LinearGradient>
          <Text style={[styles.tctxt1, props.titleColor && {color: '#fff'}]}>
            T&C Apply
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  topView1: {
    marginLeft: '8%',
    marginRight: '8%',
    marginTop: '10%',
    borderRadius: 15,
    width: wp('84%'),
    height: hp('18%'),
    elevation: 1,
    justifyContent: 'center',
    overflow: 'hidden',
    elevation: 5,
  },
  cardRoundView: {
    width: wp('50%'),
    height: wp('50%'),
    borderWidth: 14,
    borderRadius: 99,
    alignSelf: 'flex-end',
    marginEnd: '-9%',
  },
  cardRoundViewInn: {
    width: '100%',
    height: '100%',
    borderWidth: 14,
    borderRadius: 99,
  },
  cardInnItem: {
    flexDirection: 'row',
    position: 'absolute',
    justifyContent: 'space-between',
  },
  cardInnLeft: {
    marginTop: '2%',
    marginLeft: '6%',
  },
  journeytxt111: {
    fontFamily: FontFamily.montserratSemiBold,
    color: '#2F2F2F',
    fontSize: 15,
  },
  journeytxt222: {
    fontFamily: FontFamily.montserratSemiBold,
    color: '#1877F2',
  },
  insertBtn2: {
    borderRadius: 20,
    width: wp('25%'),
    marginVertical: '8%',
  },
  BtnText1: {
    fontFamily: FontFamily.montserratSemiBold,
    fontSize: FontSize.size_10,
    color: '#fff',
    textAlign: 'center',
    margin: '7%',
  },
  tctxt1: {
    color: '#000',
    fontSize: 5,
    marginLeft: '5%',
    fontFamily: FontFamily.montserratMedium,
  },
  tripImage23: {
    width: wp('45%'),
    height: wp('38%'),
    position: 'absolute',
    right: '1%',
    bottom: '5%',
  },
  tripImage22: {
    width: wp('22%'),
    height: wp('22%'),
    position: 'absolute',
    right: '7%',
    bottom: '10%',
  },
  tripImage:{
    width: wp('44%'),
    height: wp('32%'),
    position: 'absolute',
    right: '1%',
    bottom: '3%',
  }
});
