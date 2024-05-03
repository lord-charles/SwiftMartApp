import React, {useState, useEffect} from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NativeBaseProvider} from 'native-base';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Splash from './components/SplashScreen';

const Stack = createNativeStackNavigator();
import {
  OnBoarding,
  SignIn,
  SignUp,
  Otp,
  ForgotPassword,
  NewPassword,
  ProductDetails,
  Account,
  Message,
  Cart,
  Checkout,
  Payment,
  OrderSuccess,
  Orders,
  MyOrders,
  Paid,
  Unpaid,
  Derivered,
  Cancelled,
  ToBeShipped,
  Shipped,
  TrackOrder,
  WishList,
  Category,
  CategoryFilter,
  AccountSettings,
  Profile,
  About,
  AccountSecurity,
  PhoneModification,
  EmailModification,
  PasswordModification,
  AccountClosure,
  Search,
  Coupons,
  Suggestions,
  Notifications,
  Language,
  Faqs,
  Currency,
  AddressBook,
  AddShippingAddress,
} from './screens';
import DrawerNav from './navigation/drawer/drawer1/DrawerNav1';
import {ToastProvider} from 'react-native-toast-notifications';
import config from './utils/axiosconfig';
import {base_url} from './utils/baseUrl';
import axios from 'axios';
import StatusBarComponent from './components/StatusBar';

export default function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstLaunch, setIsFirstLaunch] = useState(false);

  // Retrieving token
  const getToken = async () => {
    try {
      const res = await AsyncStorage.getItem('token');
      verifyToken(res);
    } catch (error) {
      console.log('Error retrieving token:', error);
    }
  };

  const verifyToken = async token => {
    try {
      const api = axios.create({
        baseURL: base_url,
        headers: config(token).headers,
      });

      const res = await api.get('user/verifyToken/', config(token));
      if (res.data.message === 'authorized') {
        Toast.show({
          type: 'success',
          text1: `Welcome Back ${res.data.user?.firstname}!`,
          text2: 'You have successfully logged in.',
        });
      }
    } catch (error) {
      console.log(error);
      Toast.show({
        type: 'info',
        text1: 'Enhance Your Shopping Experience',
        text2:
          'Sign in to access all features and enjoy personalized shopping.',
      });
    }
  };

  useEffect(() => {
    async function prepare() {
      try {
        // Load resources and data in the background
        await Promise.all([]);

        // Check if this is the app's first launch
        const FirstLaunch = await AsyncStorage.getItem('isFirstLaunch');
        if (FirstLaunch === null) {
          setIsFirstLaunch(true);
          await AsyncStorage.setItem('isFirstLaunch', 'false');
        }

        // Set isLoading to false
        setTimeout(() => {
          getToken();
          setIsLoading(false);
        }, 1000);
      } catch (e) {
        console.warn(e);
      }
    }

    prepare();
  }, []);

  if (isLoading) {
    return <Splash />;
  }

  return (
    <>
      <NativeBaseProvider>
        <ToastProvider>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}>
              {isFirstLaunch ? (
                <Stack.Screen
                  name="onBoardingScreen"
                  component={OnBoarding}
                  options={{headerShown: false}}
                />
              ) : null}

              <Stack.Screen
                name="DrawerNav"
                component={DrawerNav}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="SignIn"
                component={SignIn}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="SignUp"
                component={SignUp}
                options={{headerShown: false}}
              />

              <Stack.Screen
                name="Otp"
                component={Otp}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="ForgotPassword"
                component={ForgotPassword}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="NewPassword"
                component={NewPassword}
                options={{headerShown: false}}
              />

              <Stack.Screen
                name="ProductDetails"
                component={ProductDetails}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Account"
                component={Account}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Cart"
                component={Cart}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Message"
                component={Message}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Checkout"
                component={Checkout}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Payment"
                component={Payment}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="OrderSuccess"
                component={OrderSuccess}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Orders"
                component={Orders}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="MyOrders"
                component={MyOrders}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Paid"
                component={Paid}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Unpaid"
                component={Unpaid}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Derivered"
                component={Derivered}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Cancelled"
                component={Cancelled}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="ToBeShipped"
                component={ToBeShipped}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Shipped"
                component={Shipped}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="TrackOrder"
                component={TrackOrder}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="WishList"
                component={WishList}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Category"
                component={Category}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="CategoryFilter"
                component={CategoryFilter}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="AccountSettings"
                component={AccountSettings}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Profile"
                component={Profile}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="About"
                component={About}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="AccountSecurity"
                component={AccountSecurity}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="PhoneModification"
                component={PhoneModification}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="EmailModification"
                component={EmailModification}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="PasswordModification"
                component={PasswordModification}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="AccountClosure"
                component={AccountClosure}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Search"
                component={Search}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Coupons"
                component={Coupons}
                options={{headerShown: false}}
              />

              <Stack.Screen
                name="Suggestions"
                component={Suggestions}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Notifications"
                component={Notifications}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Language"
                component={Language}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Faqs"
                component={Faqs}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Currency"
                component={Currency}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="AddressBook"
                component={AddressBook}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="AddShippingAddress"
                component={AddShippingAddress}
                options={{headerShown: false}}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </ToastProvider>
      </NativeBaseProvider>
      <Toast />
    </>
  );
}
