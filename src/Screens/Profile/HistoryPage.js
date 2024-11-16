import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import {Color, FontFamily, FontSize} from '../../../global';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {Images} from '../../../assets';
import Entypo from 'react-native-vector-icons/Entypo';
import CarPoolCard from '../../Components/ScreenTopCard/CarPoolCard';
import CustomStatusBar from '../../Components/CustomStatusBar';

const HistoryPage = () => {
  const navigation = useNavigation();

  return (
    <View style={Styles.container}>
      <CustomStatusBar backgroundColor={'#efefef'} barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <CarPoolCard
          bg1={'#F4FEE6'}
          bg2={'#fff'}
          round1={'#F5FFE8'}
          round2={'#ECF9DD'}
          txt1={'Use Balert as a personal\nAuthentication tool'}
          txt2={''}
          btn1={'#1F735C'}
          btn2={'#1CBF73'}
          btnText={'Learn More >'}
          img={Images.secure1}
          onPress={() => {}}
        />
        <Text style={Styles.hisText}>History</Text>
        <View style={Styles.view4}>
          <View activeOpacity={0.7}>
            <TouchableOpacity
              activeOpacity={0.2}
              style={Styles.View3}
              onPress={() => navigation.navigate('TripList')}>
              <Text style={Styles.txt3}>Trip history</Text>
              <Text style={{marginLeft: '51%'}}>
                <Entypo
                  name="chevron-right"
                  size={20}
                  color={Color.colorGrey}
                />
              </Text>
            </TouchableOpacity>
          </View>
          <View style={Styles.horizontalLine}></View>
          <View activeOpacity={0.7}>
            <TouchableOpacity
              activeOpacity={0.2}
              style={Styles.View3}
              onPress={() => navigation.navigate('FasTagHistory')}>
              <Text style={Styles.txt3}>FasTag history</Text>
              <Text style={{marginLeft: '43%'}}>
                <Entypo
                  name="chevron-right"
                  size={20}
                  color={Color.colorGrey}
                />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorWhite,
  },
  view4: [
    {
      width: wp('90%'),
      height: 'auto',
      marginLeft: '5%',
      marginRight: '5%',
      backgroundColor: Color.colorWhite,
      borderRadius: 10,
      elevation: 5,
      paddingVertical: '4%',
      marginBottom: '3%',
      shadowColor: 'skyblue',
      shadowOpacity: 0.5,
      shadowOffset: {width: 10, height: 10},
      shadowRadius: 5,
    },
    Platform.OS == 'ios' && {
      shadowOffset: {
        width: wp('0.1%'),
        height: hp('0.1%'),
      },
      shadowColor: Color.colorBlack,
      shadowOpacity: 0.25,
    },
  ],
  unknow: {
    fontFamily: FontFamily.montserratMedium,
    fontSize: 9,
    color: Color.colorGray,
    marginLeft: '5%',
  },
  View3: {
    flexDirection: 'row',
  },
  hisText: {
    fontFamily: FontFamily.montserratMedium,
    fontSize: FontSize.size_26,
    color: Color.colorBlack,
    marginLeft: '5%',
    marginTop: '10%',
    marginBottom: '10%',
  },
  identity: {
    fontFamily: FontFamily.montserratSemiBold,
    fontSize: FontSize.size_16,
    color: Color.colorBlack,
    marginLeft: '8%',
    marginTop: '3%',
  },
  txt3: {
    fontFamily: FontFamily.montserratMedium,
    color: Color.colorDimgray,
    fontSize: FontSize.size_17,
    marginLeft: '7%',
  },
  horizontalLine: {
    borderBottomColor: Color.colorGrey,
    borderBottomWidth: 1,
    marginVertical: '4%',
    marginLeft: '5%',
    marginRight: '5%',
  },
  topView: {
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: '10%',
    borderRadius: 30,
    width: wp('90%'),
    height: 'auto',
    padding: '2%',
  },
  bg: {
    width: wp('90%'),
    height: 'auto',
    marginLeft: '5%',
    marginRight: '5%',
    backgroundColor: Color.colorWhite,
    borderRadius: 10,
    elevation: 5,
    padding: '4%',
    marginBottom: '3%',
    shadowColor: 'skyblue',
    shadowOpacity: 0.5,
    shadowOffset: {width: 10, height: 10},
    shadowRadius: 5,
  },
  topView1: {
    marginLeft: '8%',
    marginRight: '8%',
    marginTop: '10%',
    // backgroundColor: '#F4FEE6',
    borderRadius: 10,
    width: wp('84%'),
    height: hp('18%'),
    elevation: 1,
  },
  tripImage: {
    alignSelf: 'flex-end',
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  journeytxt11: {
    fontFamily: FontFamily.montserratBold,
    color: Color.colorBlack,
    fontSize: FontSize.size_13,
    marginLeft: '5%',
    marginTop: '-34%',
  },
  insertBtn1: {
    backgroundColor: '#27C4F4',
    borderRadius: 20,
    width: wp('25%'),
    marginLeft: '5%',
    marginTop: '3%',
    marginBottom: '3%',
  },
  BtnText: {
    fontFamily: FontFamily.montserratSemiBold,
    fontSize: FontSize.size_10,
    color: Color.colorWhite,
    textAlign: 'center',
    margin: '7%',
  },
  tctxt: {
    color: '#134795',
    fontSize: 5,
    marginLeft: '5%',
  },
  tripImage2: {
    alignSelf: 'flex-end',
    marginTop: '-30%',
    width: wp('38%'),
    height: wp('25%'),
    // marginRight: '5%',
  },
});

export default HistoryPage;
