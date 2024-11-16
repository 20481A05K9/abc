import {Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import OcticonsIcon from 'react-native-vector-icons/Octicons';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import {Color} from '../../../global';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {styles} from '../../Styles/Wallet/FetchTransactionStyles';
import {Images} from '../../../assets';
import {IMAGE_URL} from '../../services/config/index.url';
import CustomStatusBar from '../../Components/CustomStatusBar';

const SendMoneySuccess = props => {
  const {image, amount, name, trans, timestamp, status,message} =
    props.route.params || {};
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <CustomStatusBar backgroundColor={'#efefef'} barStyle="dark-content" />
      <View style={styles.topcontainer}>
        <Text style={styles.texthead}>Transaction details</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <EntypoIcon name="cross" color={Color.colorBlack} size={25} />
        </TouchableOpacity>
      </View>
      <View style={styles.imagecontainer}>
        <Image
          source={image ? {uri: IMAGE_URL + image} : Images.avatar}
          style={styles.image}
        />
        <Text style={styles.name}>{name}</Text>
      </View>
      <View
        style={{
          alignItems: 'flex-start',
          marginBottom: hp('5%'),
          marginHorizontal: wp('20%'),
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.inputtext}>₹{amount}</Text>
          {status === 'Failure' ? (
            <View style={styles.statuscontainer}>
              <FoundationIcon name="info" color="#ff4a4a" size={10} />
              <Text style={[styles.statustext, {color: '#ff4a4a'}]}>
                Failure
              </Text>
            </View>
          ) : (
            <View style={styles.statuscontainer}>
              <OcticonsIcon
                name="check-circle-fill"
                color="#0aa06e"
                size={10}
              />
              <Text style={[styles.statustext, {color: '#0aa06e'}]}>
                Success
              </Text>
            </View>
          )}
        </View>
        <Text style={styles.timestamp}>{timestamp}</Text>
      </View>
      <View style={styles.messagecontainer}>
        <Text style={styles.message}>
          {message}
        </Text>
      </View>
      <View style={{alignItems: 'flex-start', marginLeft: wp('10%')}}>
        <View style={styles.transactioncontainer}>
          <Text style={styles.transacthead}>Transaction ID:</Text>
          <Text style={styles.transacttext}>{trans}</Text>
        </View>
        <View style={styles.transactioncontainer}>
          <Text style={styles.transacthead}>Card balance:</Text>
          <Text style={styles.transacttext}>₹1000</Text>
        </View>
        <View style={styles.transactioncontainer}>
          <Text style={styles.transacthead}>Customer ID:</Text>
          <Text style={styles.transacttext}>5679139802</Text>
        </View>
      </View>
    </View>
  );
};

export default SendMoneySuccess;
