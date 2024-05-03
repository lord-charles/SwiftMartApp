import React, {useCallback, useState} from 'react';
import {View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Header from '../checkout/Header';

import {
  Unpaid,
  Paid,
  Derivered,
  Cancelled,
  ToBeShipped,
  Shipped,
} from '../index';
import FastImage from 'react-native-fast-image';
import {icons} from '../../constants';
import axios from 'axios';
import config from '../../utils/axiosconfig';
import {base_url} from '../../utils/baseUrl';
import {useFocusEffect} from '@react-navigation/native';
import Badge from './Badge';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useToast} from 'react-native-toast-notifications';
import {UnauthorizedModal} from '../../components';
import StatusBarComponent from '../../components/StatusBar';

const MyOrders = ({navigation}) => {
  const Tab = createMaterialTopTabNavigator();
  const [paidCount, setPaidCount] = useState(null);
  const [unPaidCount, setUnPaidCount] = useState(null);
  const [ToBeShippedCount, setToBeShippedCount] = useState(null);
  const [DeliveredCount, setDeliveredCount] = useState(null);
  const [CancelledCount, setCancelledCount] = useState(null);
  const [DispactchedCount, setDispactchedCount] = useState(null);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  const toast = useToast();

  const badgeData = {
    paidCount,
    unPaidCount,
    ToBeShippedCount,
    DeliveredCount,
    CancelledCount,
    DispactchedCount,
  };

  // Retrieving token
  const getToken = async () => {
    try {
      const res = await AsyncStorage.getItem('token');
      verifyToken(res);
    } catch (error) {
      console.log('Error retrieving token:', error);
    }
  };

  const verifyToken = async currentToken => {
    try {
      const api = axios.create({
        baseURL: base_url,
        headers: config(currentToken).headers,
      });

      const res = await api.get('user/verifyToken/', config(currentToken));
      if (res.data.message === 'authorized') {
        getPaidOrders();
        getUnPaidOrders();
        getToBeShippedOrders();
        getShippedOrders();
        getDeliveredOrders();
        getCancelledOrders();
        setIsAuthorized(true);
      }
    } catch (error) {
      console.log(error);

      if (error.message === 'Request failed with status code 404') {
        toast.show('sign to access Orders', {
          type: 'warning',
          placement: 'top',
          duration: 2000,
          offset: 30,
          animationType: 'slide-in',
        }),
          setShowFilterModal(true);
      }
    }
  };

  const getPaidOrders = async () => {
    try {
      const tok = await AsyncStorage.getItem('token');

      const api = axios.create({
        baseURL: base_url,
        headers: config(tok).headers,
      });

      const response = await api.post(
        'user/orders/',
        {
          status: 'Not Processed',
        },
        config(tok),
      );
      // console.log(response.data);
      setPaidCount(response.data.length);
    } catch (err) {
      // console.log(err);
      if (err.response.data.message === 'No orders found for user') {
        console.log(err.response.data.message);
      }
    }
  };

  const getUnPaidOrders = async () => {
    try {
      const tok = await AsyncStorage.getItem('token');

      const api = axios.create({
        baseURL: base_url,
        headers: config(tok).headers,
      });

      const response = await api.post(
        'user/orders/',
        {
          status: 'Cash on Delivery',
        },
        config(tok),
      );
      // console.log(response.data);
      setUnPaidCount(response.data.length);
    } catch (err) {
      // console.log(err);
      if (err.response.data.message === 'No orders found for user') {
        console.log(err.response.data.message);
      }
    }
  };

  const getToBeShippedOrders = async () => {
    try {
      const tok = await AsyncStorage.getItem('token');

      const api = axios.create({
        baseURL: base_url,
        headers: config(tok).headers,
      });

      const response = await api.post(
        'user/orders/',
        {
          status: 'Processing',
        },
        config(tok),
      );
      setToBeShippedCount(response.data.length);
    } catch (err) {
      if (err.response.data.message === 'No orders found for user') {
        console.log(err.response.data.message);
      }
    }
  };

  const getShippedOrders = async () => {
    try {
      const tok = await AsyncStorage.getItem('token');

      const api = axios.create({
        baseURL: base_url,
        headers: config(tok).headers,
      });

      const response = await api.post(
        'user/orders/',
        {
          status: 'Dispatched',
        },
        config(tok),
      );
      setDispactchedCount(response.data.length);
    } catch (err) {
      if (err.response.data.message === 'No orders found for user') {
        console.log(err.response.data.message);
      }
    }
  };

  const getDeliveredOrders = async () => {
    try {
      const tok = await AsyncStorage.getItem('token');

      const api = axios.create({
        baseURL: base_url,
        headers: config(tok).headers,
      });

      const response = await api.post(
        'user/orders/',
        {
          status: 'Delivered',
        },
        config(tok),
      );
      setDeliveredCount(response.data.length);
    } catch (err) {
      if (err.response.data.message === 'No orders found for user') {
        console.log(err.response.data.message);
      }
    }
  };

  const getCancelledOrders = async () => {
    try {
      const tok = await AsyncStorage.getItem('token');

      const api = axios.create({
        baseURL: base_url,
        headers: config(tok).headers,
      });

      const response = await api.post(
        'user/orders/',
        {
          status: 'Cancelled',
        },
        config(tok),
      );
      setCancelledCount(response.data.length);
    } catch (err) {
      if (err.response.data.message === 'No orders found for user') {
        console.log(err.response.data.message);
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      getToken();
      return () => {};
    }, []),
  );

  return (
    <View className="flex-1">
      <StatusBarComponent backgroundColor="white" />

      <Header navigation={navigation} title="My Orders" />

      {showFilterModal && (
        <UnauthorizedModal
          isVisible={showFilterModal}
          onClose={() => setShowFilterModal(false)}
          navigation={navigation}
          title="Orders"
        />
      )}

      {isAuthorized && (
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarLabelStyle: {fontSize: 8},
            tabBarStyle: {backgroundColor: 'white'},
            tabBarActiveTintColor: '#020a3b',
            tabBarInactiveTintColor: 'gray',
            tabBarIndicatorStyle: {backgroundColor: '#020a3b'},
            tabBarBadge: () => {
              return <Badge badgeData={badgeData} route={route} />;
            },
            tabBarIcon: () => {
              let iconName;

              if (route.name === 'Unpaid') {
                iconName = icons.Unpaid;
              } else if (route.name === 'Paid') {
                iconName = icons.paid;
              } else if (route.name === 'To be Shipped') {
                iconName = icons.shipping3;
              } else if (route.name === 'Shipped') {
                iconName = icons.shipped;
              } else if (route.name === 'Delivered') {
                iconName = icons.cash_on_delivery;
              } else if (route.name === 'Cancelled') {
                iconName = icons.cancel;
              }

              // Return the desired icon component
              return (
                <FastImage source={iconName} className="w-[20px] h-[20px]" />
              );
            },
          })}>
          <Tab.Screen name="Unpaid" component={Unpaid} />
          <Tab.Screen name="Paid" component={Paid} />
          <Tab.Screen name="To be Shipped" component={ToBeShipped} />
          <Tab.Screen name="Shipped" component={Shipped} />
          <Tab.Screen name="Delivered" component={Derivered} />
          <Tab.Screen name="Cancelled" component={Cancelled} />
        </Tab.Navigator>
      )}
    </View>
  );
};

export default MyOrders;
