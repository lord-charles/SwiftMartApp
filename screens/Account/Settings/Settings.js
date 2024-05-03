import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Header from '../../checkout/Header';
import {ChevronRightIcon, Divider} from 'native-base';
import {AppVersion} from '../../../components';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AccountSettings = ({navigation}) => {
  const removeToken = async () => {
    try {
      await AsyncStorage.removeItem('token');
    } catch (error) {
      console.log('Error removing token:', error);
    }
  };

  const logout = () => {
    removeToken();
    navigation.replace('SignIn');
    Toast.show({
      type: 'success',
      text1: 'Logged Out',
      text2: 'You have been successfully logged out.',
    });
  };

  return (
    <View className="flex-1">
      <Header title="Settings" navigation={navigation} />

      <View>
        <TouchableOpacity
          className="flex flex-row items-center px-2 py-3 justify-between bg-white mt-2"
          onPress={() => navigation.navigate('Profile')}>
          <Text className="text-black text-[15px]">Profile</Text>
          <ChevronRightIcon />
        </TouchableOpacity>
        <Divider />

        <TouchableOpacity
          className="flex flex-row items-center px-2 py-3 justify-between bg-white"
          onPress={() => navigation.navigate('AccountSecurity')}>
          <Text className="text-black text-[15px]">Account & Security</Text>
          <ChevronRightIcon />
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity
          className="flex flex-row items-center px-2 py-3 justify-between bg-white"
          onPress={() =>
            Toast.show({
              type: 'success',
              text1: 'Success',
              text2: 'App cookies cleared successfully',
            })
          }>
          <Text className="text-black text-[15px]">Clear Cookies</Text>
          <ChevronRightIcon />
        </TouchableOpacity>
        <Divider />

        <TouchableOpacity
          className="flex flex-row items-center px-2 py-3 justify-between bg-white"
          onPress={() =>
            Toast.show({
              type: 'success',
              text1: 'Success',
              text2: 'Your application is up to date',
            })
          }>
          <Text className="text-black text-[15px]">Check for Updates</Text>
          <ChevronRightIcon />
        </TouchableOpacity>
        <Divider />

        <TouchableOpacity
          className="flex flex-row items-center px-2 py-3 justify-between bg-white"
          onPress={() => navigation.navigate('About')}>
          <Text className="text-black text-[15px]">About us</Text>
          <ChevronRightIcon />
        </TouchableOpacity>
        <Divider />

        <TouchableOpacity
          className="m-6 bg-white p-3 rounded-sm"
          onPress={() => logout()}>
          <Text className="text-red-500 text-center text-[15px]">Logout</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity className="absolute bottom-2">
        <AppVersion />
      </TouchableOpacity>
    </View>
  );
};

export default AccountSettings;
