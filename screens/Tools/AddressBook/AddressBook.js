import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useCallback, useState} from 'react';
import Header from '../../checkout/Header';
import FastImage from 'react-native-fast-image';
import {icons} from '../../../constants';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {base_url} from '../../../utils/baseUrl';
import config from '../../../utils/axiosconfig';
import {useFocusEffect} from '@react-navigation/native';

const AddressBook = ({navigation}) => {
  const [SignedIn, setSignedIn] = useState(false);
  const [userAdress, setUserAdress] = useState([]);
  const [token, setToken] = useState('');

  // Retrieving token
  const getToken = async () => {
    try {
      const res = await AsyncStorage.getItem('token');
      verifyToken(res);
      setToken(res);
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
        Toast.show({
          type: 'success',
          text1: `Greetings, ${res.data.user?.firstname}!`,
          text2: 'Please review your shipping address for accuracy.',
        });
        setSignedIn(true);
        setUserAdress(res.data.user?.address);
      }
    } catch (error) {
      console.log(error);
      Toast.show({
        type: 'info',
        text1: 'Access shipping address',
        text2: 'Sign in to view, edit, or remove',
      });
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
      <Header title="Shipping Address" navigation={navigation} />
      {userAdress.firstName?.length > 0 && (
        <TouchableOpacity className="bg-white p-4 mt-2 space-y-1">
          <View className="flex flex-row justify-between">
            <View className="flex  flex-row space-x-1">
              <Text className="text-black font-semibold">
                {userAdress?.firstName}
              </Text>
              <Text className="text-black font-semibold">
                {userAdress?.secondName}
              </Text>
            </View>
            <Text className="text-black font-bold">
              0{userAdress?.phoneNumber}
            </Text>
          </View>
          <Text className="text-black font-bold">
            {userAdress?.County} county
          </Text>
          <Text className="text-black">{userAdress?.message}</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        className="absolute bottom-0 bg-white items-center flex flex-row p-4 w-full justify-center space-x-3"
        onPress={() => {
          SignedIn
            ? navigation.replace('AddShippingAddress', {userAdress, token})
            : Toast.show({
                type: 'info',
                text1: 'Add Shipping Address',
                text2: 'Please sign in to add a new shipping address.',
              });
        }}>
        <FastImage
          source={icons.pluscircled}
          className="w-[28px] h-[28px]"
          resizeMode="contain"
        />
        <Text className="text-black text-[17px]">
          {userAdress.firstName?.length > 0 ? 'Edit Address' : 'Add New Adress'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  customFont: {
    fontFamily: 'serif',
  },
  customColor: {
    color: '#020a3b',
  },
});

export default AddressBook;
