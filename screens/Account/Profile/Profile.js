import {View, Text, TouchableOpacity} from 'react-native';
import React, {useCallback, useState} from 'react';
import Header from '../../checkout/Header';
import FastImage from 'react-native-fast-image';
import {icons} from '../../../constants';
import {ChevronRightIcon, Divider} from 'native-base';
import {AppVersion} from '../../../components';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {base_url} from '../../../utils/baseUrl';
import config from '../../../utils/axiosconfig';
import {useFocusEffect} from '@react-navigation/native';

const Profile = ({navigation}) => {
  const [firstname, setFirstName] = useState(null);
  const [secondname, setSecondName] = useState(null);
  const [email, setemail] = useState(null);
  const [id, setid] = useState(null);
  const [mobile, setmobile] = useState(null);

  const verifyToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const api = axios.create({
        baseURL: base_url,
        headers: config(token).headers,
      });

      const res = await api.get('user/verifyToken/', config(token));
      setFirstName(res.data.user?.firstname);
      setSecondName(res.data.user?.lastname);
      setemail(res.data.user?.email);
      setid(res.data.user?._id);
      setmobile(res.data.user?.mobile);
      if (res.data.message === 'authorized') {
      }
    } catch (error) {
      console.log(error);
    }
  };
  useFocusEffect(
    useCallback(() => {
      verifyToken();

      return () => {
        // Clean up any subscriptions or resources if needed
      };
    }, []),
  );

  return (
    <View className="h-screen">
      <Header title="My Profile" navigation={navigation} />
      <View className="bg-white mt-2 p-1">
        <TouchableOpacity className="items-center p-8">
          <FastImage
            source={icons.useravatar}
            className="w-[150px] h-[100px]"
            resizeMode="contain"
          />
        </TouchableOpacity>

        {firstname !== null ? (
          <View>
            <TouchableOpacity
              className="flex flex-row items-center px-2 py-3 justify-between bg-white mt-2"
              onPress={() => navigation.navigate('Profile')}>
              <Text className="text-black text-[15px]">Name</Text>
              <View className="flex flex-row items-center space-x-1">
                <Text className="text-black">{firstname}</Text>
                <Text className="text-black">{secondname}</Text>
                <ChevronRightIcon />
              </View>
            </TouchableOpacity>
            <Divider />

            <TouchableOpacity
              className="flex flex-row items-center px-2 py-3 justify-between bg-white mt-2"
              onPress={() => navigation.navigate('Profile')}>
              <Text className="text-black text-[15px]">Email</Text>
              <View className="flex flex-row items-center space-x-2">
                <Text className="text-black">{email}</Text>
                <ChevronRightIcon />
              </View>
            </TouchableOpacity>
            <Divider />

            <TouchableOpacity
              className="flex flex-row items-center px-2 py-3 justify-between bg-white mt-2"
              onPress={() => navigation.navigate('Profile')}>
              <Text className="text-black text-[15px]">Phone</Text>
              <View className="flex flex-row items-center space-x-2">
                <Text className="text-black">{mobile}</Text>
                <ChevronRightIcon />
              </View>
            </TouchableOpacity>
            <Divider />

            <TouchableOpacity
              className="flex flex-row items-center px-2 py-3 justify-between bg-white mt-2"
              onPress={() => navigation.navigate('Profile')}>
              <Text className="text-black text-[15px]">UserId</Text>
              <View className="flex flex-row items-center space-x-2">
                <Text className="text-black">{id}</Text>
                <ChevronRightIcon />
              </View>
            </TouchableOpacity>
            <Divider />
          </View>
        ) : (
          <View>
            <TouchableOpacity className="bg-blue-900 p-2 mx-4  m rounded-sm">
              <Text className="text-white text-[15px] font-bold text-center">
                Sign/Register
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <TouchableOpacity
        className="m-5 bg-white p-2 rounded-sm"
        onPress={() => navigation.navigate('AccountSecurity')}>
        <Text className="text-red-500 text-center text-[15px]">Edit</Text>
      </TouchableOpacity>

      <TouchableOpacity className="absolute bottom-2">
        <AppVersion />
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
