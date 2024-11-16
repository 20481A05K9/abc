import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {FontFamily, FontSize} from '../../../global';
import LinearGradient from 'react-native-linear-gradient';

export default function FastagCard(props) {
  return (
    <View style={[styles.topView1, {backgroundColor: props.bg}]}>
      <View style={[styles.cardRoundView, {borderColor: props.round1}]}>
        <View style={[styles.cardRoundViewInn, {borderColor: props.round2}]} />
      </View>
      <View style={styles.cardInnItem}>
        <View style={styles.cardInnLeft}>
          <Text style={styles.journeytxt111}>
            {props.txt1}
            <Text style={styles.journeytxt222}>{props.txt2}</Text>
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
          <Text style={styles.tctxt1}>T&C Apply</Text>
        </View>
      </View>
      {props.img1 && <Image source={props.img1} style={styles.tripImage22} />}
      <Image
        source={props.img}
        style={
          props.img1
            ? styles.tripImage23
            : props.walletImg
            ? styles.walletImage23
            : styles.homeImage23
        }
      />
    </View>
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
    borderWidth: 18,
    borderRadius: 99,
    alignSelf: 'flex-end',
    marginEnd: 0,
    marginTop: '-5%',
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
    marginTop: '2%',
    marginLeft: '8%',
  },
  journeytxt111: {
    fontFamily: FontFamily.montserratBold,
    color: '#2F2F2F',
    fontSize: 13,
  },
  journeytxt222: {
    fontFamily: FontFamily.montserratBold,
    color: '#F9A738',
  },
  insertBtn2: {
    borderRadius: 20,
    marginVertical: '8%',
    alignSelf:'flex-start',
    paddingVertical:'5%',
    paddingHorizontal:'5%'
  },
  BtnText1: {
    fontFamily: FontFamily.montserratBold,
    fontSize: FontSize.size_10,
    color: '#fff',
    textAlign: 'center',
  },
  tctxt1: {
    color: '#134795',
    fontSize: 5,
    marginLeft: '5%',
    fontFamily: FontFamily.montserratMedium,
  },
  tripImage22: {
    width: wp('25%'),
    height: wp('25%'),
    resizeMode: 'contain',
    position: 'absolute',
    right: '10%',
    top: '-10%',
  },
  tripImage23: {
    width: wp('40%'),
    height: wp('30%'),
    resizeMode: 'contain',
    position: 'absolute',
    right: '2%',
    bottom: '-15%',
  },
  homeImage23: {
    width: wp('30%'),
    height: wp('30%'),
    resizeMode: 'contain',
    position: 'absolute',
    right: '12%',
    bottom: '10%',
  },
  walletImage23:{
    width: wp('10%'),
    height: wp('10%'),
    resizeMode: 'contain',
    position: 'absolute',
    right: '20%',
    bottom: '25%',
  }
});
