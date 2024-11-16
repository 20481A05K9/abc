import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Color} from '../../../global';
import {useNavigation} from '@react-navigation/native';
import {styles} from '../../Styles/Wallet/OrderPhysicalCardStyles';
import CustomStatusBar from '../../Components/CustomStatusBar';

const OrderPhysicalCard = () => {
  const navigation = useNavigation();
  const [nameoncardError, setnameoncardError] = useState('');
  const [addressline1Error, setAddressline1Error] = useState('');
  const [addressline2Error, setAddressline2Error] = useState('');
  const [addressline3Error, setAddressline3Error] = useState('');
  const [cityError, setCityError] = useState('');
  const [stateError, setStateError] = useState('');
  const [pinCodeError, setPinCodeError] = useState('');
  const [addressline1, setAddressline1] = useState('');
  const [addressline2, setAddressline2] = useState('');
  const [addressline3, setAddressline3] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');

  const handleAddressLine1Change = value => {
    const regex = /^[A-Za-z0-9\s]{0,30}$/;
    if (regex.test(value)) {
      setAddressline1(value);
      setAddressline1Error('');
    } else {
      setAddressline1Error('Enter only alphabets and numbers');
    }
  };

  const handleAddressLine2Change = value => {
    const regex = /^[A-Za-z0-9\s]{1,30}$/;
    if (regex.test(value)) {
      setAddressline2(value);
      setAddressline2Error('');
    } else {
      setAddressline2Error('Enter only alphabets and numbers');
    }
  };

  const handleAddressLine3Change = value => {
    const regex = /^[A-Za-z0-9\s]{0,30}$/;
    if (regex.test(value)) {
      setAddressline3(value);
      setAddressline3Error('');
    } else {
      setAddressline3Error('Enter only alphabets and numbers');
    }
  };

  const handleCityChange = value => {
    const regex = /^[A-Za-z\s]{0,20}$/;
    if (regex.test(value)) {
      setCity(value);
      setCityError('');
    } else {
      setCityError('Enter alphabets only');
    }
  };

  const handleStateChange = value => {
    const regex = /^[A-Za-z\s]{0,20}$/;
    if (regex.test(value)) {
      setState(value);
      setStateError('');
    } else {
      setStateError('Enter alphabets only');
    }
  };

  const handlePinCodeChange = value => {
    const regex = /^[0-9]{0,6}$/;
    if (regex.test(value)) {
      setPincode(value);
      setPinCodeError('');
    } else {
      setPinCodeError('Pin Code must be exactly 6 digits.');
    }
  };

  const isFormValid = () => {
    return (
      !nameoncardError &&
      !addressline1Error &&
      !addressline2Error &&
      !addressline3Error &&
      !cityError &&
      !stateError &&
      !pinCodeError &&
      addressline1 !== '' &&
      city !== '' &&
      state !== '' &&
      pincode.length === 6
    );
  };

  return (
    <View style={styles.container}>
      <CustomStatusBar backgroundColor={'#efefef'} barStyle="dark-content" />
      <View style={styles.textcontainer}>
        <Text style={styles.head}>Physical Card</Text>
        <Text style={styles.text}>
          {' '}
          Fill the data to get your physical card
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.inpcontainer1}>
          <Text style={styles.t2}> Address Line 1 </Text>
          <TextInput
            style={styles.inpstyle1}
            onChangeText={handleAddressLine1Change}
            placeholder="Enter your house no."
            placeholderTextColor={Color.colorGray}
            value={addressline1}
          />
        </View>
        {addressline1Error ? (
          <Text style={styles.errorText}>{addressline1Error}</Text>
        ) : null}

        <View style={styles.inpcontainer1}>
          <Text style={styles.t2}> Address Line 2 </Text>
          <TextInput
            style={styles.inpstyle1}
            placeholder="Enter your street, area"
            placeholderTextColor={Color.colorGray}
            value={addressline2}
            onChangeText={handleAddressLine2Change}
          />
        </View>
        {addressline2Error ? (
          <Text style={styles.errorText}>{addressline2Error}</Text>
        ) : null}

        <View style={styles.inpcontainer1}>
          <Text style={styles.t2}> Address Line 3 </Text>
          <TextInput
            style={styles.inpstyle1}
            placeholder="Enter landmark"
            placeholderTextColor={Color.colorGray}
            value={addressline3}
            onChangeText={handleAddressLine3Change}
          />
        </View>
        {addressline3Error ? (
          <Text style={styles.errorText}>{addressline3Error}</Text>
        ) : null}

        <View style={styles.inpcontainer1}>
          <Text style={styles.t2}> City </Text>
          <TextInput
            style={styles.inpstyle1}
            placeholder="Enter your city"
            placeholderTextColor={Color.colorGray}
            value={city}
            onChangeText={handleCityChange}
          />
        </View>
        {cityError ? <Text style={styles.errorText}>{cityError}</Text> : null}
        <View style={styles.inpcontainer1}>
          <Text style={styles.t2}> State </Text>
          <TextInput
            style={styles.inpstyle1}
            placeholder="Enter your state"
            placeholderTextColor={Color.colorGray}
            value={state}
            onChangeText={handleStateChange}
          />
        </View>
        {stateError ? <Text style={styles.errorText}>{stateError}</Text> : null}
        <View style={styles.inpcontainer1}>
          <Text style={styles.t2}> Pincode </Text>
          <TextInput
            style={styles.inpstyle1}
            placeholder="Enter your pincode"
            placeholderTextColor={Color.colorGray}
            value={pincode}
            onChangeText={handlePinCodeChange}
            keyboardType="numeric"
            maxLength={6}
          />
        </View>
        {pinCodeError ? (
          <Text style={styles.errorText}>{pinCodeError}</Text>
        ) : null}
      </ScrollView>
      <TouchableOpacity
        onPress={() => navigation.navigate('PPCart')}
        disabled={!isFormValid()}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#F9A738', '#FEE62A']}
          style={styles.linearGradient}>
          <Text style={styles.buttontxt}>Add to cart</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default OrderPhysicalCard;
