import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Header from '../../checkout/Header';
import {ChevronRightIcon, Divider} from 'native-base';
import {AppVersion, CopyRight} from '../../../components';

const AccountSecurity = ({navigation}) => {
  return (
    <View className="h-screen">
      <Header title="Account & Security" navigation={navigation} />

      <View className="bg-white mt-2 p-1">
        <TouchableOpacity
          className="flex flex-row items-center px-2 py-3 justify-between bg-white mt-2"
          onPress={() => navigation.navigate('PhoneModification')}>
          <Text className="text-black text-[15px]">Phone</Text>
          <View className="flex flex-row items-center space-x-2">
            <Text className="text-black">0740315545</Text>
            <ChevronRightIcon />
          </View>
        </TouchableOpacity>
        <Divider />

        <TouchableOpacity
          className="flex flex-row items-center px-2 py-3 justify-between bg-white "
          onPress={() => navigation.navigate('EmailModification')}>
          <Text className="text-black text-[15px]">Email</Text>
          <View className="flex flex-row items-center space-x-2">
            <Text className="text-black">mwanikicharles@gmail.com</Text>
            <ChevronRightIcon />
          </View>
        </TouchableOpacity>
        <Divider />

        <TouchableOpacity
          className="flex flex-row items-center px-2 py-3 justify-between bg-white "
          onPress={() => navigation.navigate('PasswordModification')}>
          <Text className="text-black text-[15px]">Modify Password</Text>
          <View className="flex flex-row items-center space-x-2">
            <ChevronRightIcon />
          </View>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        className="flex flex-row items-center px-2 py-3 justify-between bg-white mt-2"
        // onPress={() => navigation.navigate('AccountClosure')}
        onPress={() => alert('Coming soon!')}>
        <Text className="text-red-500 text-[15px]">Closure Account</Text>
        <View className="flex flex-row items-center space-x-2">
          <ChevronRightIcon />
        </View>
      </TouchableOpacity>
      <View className="absolute bottom-2">
        <AppVersion />
        <CopyRight />
      </View>
    </View>
  );
};

export default AccountSecurity;
