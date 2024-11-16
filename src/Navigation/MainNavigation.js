import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Signup from '../Screens/Signup/Signup';
import CreateAccount from '../Screens/Signup/CreateAccount';
import OtpScreen from '../Screens/Signup/OtpScreen';
import Editprofile from '../Screens/Profile/Editprofile';
import AddContacts from '../Screens/EmergencyContact/AddContacts';
import Addvehicle from '../Screens/AddVehicle/Addvehicle';
import VehicleDetails from '../Screens/AddVehicle/VehicleDetails';
import SelectedContact from '../Screens/EmergencyContact/SelectedContact';
import GoodSamaritan from '../Screens/GoodSamaritan/GoodSamaritan';
import SplashScreen from '../Screens/Splash/SplashScreen';
import BottomTabNavigation from './BottomTabNavigation';
import Location from '../Screens/Location/Location';
import LocationHis from '../Screens/Location/LocationHis';
import TripStart from '../Screens/PlanTrip/TripStart';
import TripDest from '../Screens/PlanTrip/TripDest';
import TripReturn from '../Screens/PlanTrip/TripReturn';
import TripSecure from '../Screens/PlanTrip/TripSecure';
import TripTime from '../Screens/PlanTrip/TripTime';
import TripVehicle from '../Screens/PlanTrip/TripVehicle';
import Cart from '../Screens/Cart/Cart';
import CheckoutCart from '../Screens/Cart/CheckoutCart';
import TripList from '../Screens/History/Trip/TripList';
import TripDetails from '../Screens/History/Trip/TripDetails';
import EditTrip from '../Screens/Cart/EditTrip';
import StartAgainCart from '../Screens/Cart/StartAgainCart';
import LockScreen from '../Screens/Lock/LockScreen';
import FasTag from '../Screens/FasTag/FasTag';
import FasTagHistory from '../Screens/History/FasTag/FasTagHistory';
import HelpCenter from '../Screens/HelpCenter/HelpCenter';
import HistoryPage from '../Screens/Profile/HistoryPage';
import FastagCart from '../Screens/FasTag/FastagCart';
import DashBoard from '../Screens/Dashboard/DashBoard';
import BarcodeScanner from '../Screens/SpinWheel/BarcodeScanner';
import SpinCompetetionDetails from '../Screens/SpinWheel/SpinCompetetionDetails';
import GetFreeSpins from '../Screens/SpinWheel/GetFreeSpins';
import SpinWheel from '../Screens/SpinWheel/SpinWheel';
import ChatList from '../Screens/GoodSamaritan/ChatList';
import ChatMessages from '../Screens/GoodSamaritan/ChatMessages';
import SuccessFail from '../Components/SuccessFail/SuccessFail';
import VerificationCode from '../Screens/Wallet/VerificationCode';
import Addbalance from '../Screens/Wallet/Addbalance';
import Transactions from '../Screens/Wallet/Transactions';
import Sendmoney from '../Screens/Wallet/Sendmoney';
import PPCart from '../Screens/Wallet/PPCart';
import SendAddAmount from '../Screens/Wallet/SendAddAmount';
import SendMoneySuccess from '../Screens/Wallet/SendMoneySuccess';
import Notifications from '../Screens/Wallet/Notifications';
import RegistrationForm from '../Screens/Wallet/RegistrationForm';
import AddOnCard from '../Screens/Wallet/AddOnCard';
import SetPreferences from '../Screens/Wallet/SetPreferences';
import OrderPhysicalCard from '../Screens/Wallet/OrderPhysicalCard';
import FetchTransaction from '../Screens/Wallet/FetchTransaction';
import FetchPreferences from '../Screens/Wallet/FetchPreferences';
import SetPreferencesHome from '../Screens/Wallet/SetPreferencesHome';
import SetTransactionTypes from '../Screens/Wallet/SetTransactionTypes';

const Stack = createStackNavigator();

const MainNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OtpScreen"
        component={OtpScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CreateAccount"
        component={CreateAccount}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BottomTabNavigation"
        component={BottomTabNavigation}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HelpCenter"
        component={HelpCenter}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HistoryPage"
        component={HistoryPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Editprofile"
        component={Editprofile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Addvehicle"
        component={Addvehicle}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="VehicleDetails"
        component={VehicleDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddContacts"
        component={AddContacts}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SelectedContact"
        component={SelectedContact}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="GoodSamaritan"
        component={GoodSamaritan}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Location"
        component={Location}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LocationHis"
        component={LocationHis}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TripStart"
        component={TripStart}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TripDest"
        component={TripDest}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TripReturn"
        component={TripReturn}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TripSecure"
        component={TripSecure}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TripTime"
        component={TripTime}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TripVehicle"
        component={TripVehicle}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CheckoutCart"
        component={CheckoutCart}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="StartAgainCart"
        component={StartAgainCart}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TripList"
        component={TripList}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TripDetails"
        component={TripDetails}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EditTrip"
        component={EditTrip}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="LockScreen"
        component={LockScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="FasTag"
        component={FasTag}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="FasTagHistory"
        component={FasTagHistory}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="FastagCart"
        component={FastagCart}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DashBoard"
        component={DashBoard}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="BarcodeScanner"
        component={BarcodeScanner}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SpinCompetetionDetails"
        component={SpinCompetetionDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="GetFreeSpins"
        component={GetFreeSpins}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SpinWheel"
        component={SpinWheel}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ChatList"
        component={ChatList}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ChatMessages"
        component={ChatMessages}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SuccessFail"
        component={SuccessFail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="VerificationCode"
        component={VerificationCode}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Addbalance"
        component={Addbalance}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Transactions"
        component={Transactions}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Sendmoney"
        component={Sendmoney}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PPCart"
        component={PPCart}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SendAddAmount"
        component={SendAddAmount}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SendMoneySuccess"
        component={SendMoneySuccess}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Notifications"
        component={Notifications}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RegistrationForm"
        component={RegistrationForm}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddOnCard"
        component={AddOnCard}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SetPreferences"
        component={SetPreferences}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OrderPhysicalCard"
        component={OrderPhysicalCard}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="FetchTransaction"
        component={FetchTransaction}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="FetchPreferences"
        component={FetchPreferences}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SetPreferencesHome"
        component={SetPreferencesHome}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SetTransactionTypes"
        component={SetTransactionTypes}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
export default MainNavigation;
