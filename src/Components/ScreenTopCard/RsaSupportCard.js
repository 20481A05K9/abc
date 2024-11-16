import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {FontFamily, FontSize} from '../../../global';
import LinearGradient from 'react-native-linear-gradient';

export default function RsaSupportCard(props) {
  return (
    <LinearGradient
      style={styles.topView1}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      colors={[props.bg1, props.bg2]}>
      <View style={[styles.cardRoundView, {borderColor: props.round1}]}>
        <View style={[styles.cardRoundViewInn, {borderColor: props.round2}]} />
      </View>
      <View style={styles.cardInnItem}>
        <View style={styles.cardInnLeft}>
          <Text style={styles.journeytxt111}>
            {props.txt1}
            <Text style={styles.journeytxt222}>{props.txt2}</Text>
            {props.txt3}
          </Text>
          <LinearGradient
            style={styles.insertBtn2}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={[props.btn1, props.btn2]}>
            <TouchableOpacity
              onPress={() => props.onPress()}
              activeOpacity={0.5}>
              <Text style={styles.BtnText1}>{props.btnText}</Text>
            </TouchableOpacity>
          </LinearGradient>
          <Text style={styles.tctxt1}>*Extra charges may apple for HSBC credit card </Text>
        </View>
      </View>
      <Image source={props.img} style={styles.tripImage23} />
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
    height: wp('52%'),
    borderWidth: 18,
    borderRadius: 99,
    alignSelf: 'flex-end',
    marginEnd: '-9%',
  },
  cardRoundViewInn: {
    width: '100%',
    height: '100%',
    borderWidth: 18,
    borderRadius: 99,
  },
  cardInnItem: {
    flexDirection: 'row',
    position: 'absolute',
    justifyContent: 'space-between',
  },
  cardInnLeft: {
    marginTop: '8%',
    marginLeft: '8%',
  },
  journeytxt111: {
    fontFamily: FontFamily.montserratSemiBold,
    color: '#2F2F2F',
    fontSize: 15,
    marginTop:'-5%'
  },
  journeytxt222: {
    fontFamily: FontFamily.montserratBold,
    color: '#FF725E',
  },
  insertBtn2: {
    borderRadius: 20,
    marginVertical: '5%',
    paddingVertical: '3%',
    paddingHorizontal: '6%',
    alignSelf: 'flex-start',
  },
  BtnText1: {
    fontFamily: FontFamily.montserratSemiBold,
    fontSize: FontSize.size_10,
    color: '#fff',
    textAlign: 'center',
  },
  tctxt1: {
    color: '#000',
    fontSize: 5,
    fontFamily: FontFamily.montserratMedium,
    marginTop:'0%'
  },
  tripImage23: {
    width: wp('35%'),
    height: wp('25%'),
    position: 'absolute',
    right: 10,
    bottom: 0,
    resizeMode: 'contain',
  },
});
