import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import FastImage from 'react-native-fast-image';
import {icons} from '../../../constants';
import {AppVersion, CopyRight} from '../../../components';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../../../utils/axiosconfig';
import {base_url} from '../../../utils/baseUrl';
import axios from 'axios';
import {useFocusEffect} from '@react-navigation/native';

const DrawerItem = ({navigation}) => {
  return (
    <>
      <View>
        <Text>Inbox</Text>
      </View>
    </>
  );
};

const ProjectItem = () => {
  return <></>;
};

const ProfileItem = () => {
  return <></>;
};

const CustomDrawer1 = props => {
  const {state, description, navigation} = props;
  const [firstname, setFirstName] = useState(null);
  const [secondname, setSecondName] = useState(null);
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
      if (res.data.message === 'authorized') {
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);
  useFocusEffect(
    useCallback(() => {
      verifyToken();

      return () => {
        // Clean up any subscriptions or resources if needed
      };
    }, []),
  );

  const removeToken = async () => {
    try {
      await AsyncStorage.removeItem('token');
    } catch (error) {
      console.log('Error removing token:', error);
    }
  };

  const logout = () => {
    removeToken();
    navigation.navigate('SignIn');
    Toast.show({
      type: 'success',
      text1: 'Logged Out',
      text2: 'You have been successfully logged out.',
    });
  };

  return (
    <View style={styles.container}>
      <View className="items-center mt-[35px] flex space-y-2">
        <View>
          <FastImage
            source={icons.useravatar}
            className="w-[50px] h-[50px]"
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>

        <View>
          {firstname !== null ? (
            <View className="flex flex-row space-x-1">
              <Text
                className="text-white font-bold text-[15px]"
                style={styles.customFont}>
                {firstname}
              </Text>
              <Text
                className="text-white font-bold text-[15px]"
                style={styles.customFont}>
                {secondname}
              </Text>
            </View>
          ) : (
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
              <Text className="text-white font-bold text-[15px]">
                Login/Register
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <DrawerContentScrollView
        {...props}
        style={[styles.view, styles.marginvertical, styles.margintop]}>
        <DrawerItemList {...props} />
        <TouchableOpacity
          className="flex flex-row items-center space-x-7 relative left-[19px] mt-[10px] z-[999]"
          onPress={() => logout()}>
          <FastImage
            source={icons.logout}
            className="w-[22px] h-[22px]"
            resizeMode={FastImage.resizeMode.contain}
            tintColor={'white'}
          />
          <Text className="text-white font-semibold">LogOut</Text>
        </TouchableOpacity>
      </DrawerContentScrollView>

      {/* footer */}
      <View className="items-center relative top-[-5px] flex space-y-1">
        <View className="absolute bottom-2">
          <AppVersion color="white" />
          <CopyRight color="white" />
        </View>
      </View>
    </View>
  );
};

export default CustomDrawer1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  customFont: {
    fontFamily: 'serif',
  },
  view: {
    backgroundColor: 'transparent',
    borderRadius: 10,
    marginHorizontal: 8,
    padding: 10,
  },
  margintop: {
    marginTop: 0,
  },
  marginbottom: {
    marginBottom: 8,
  },
  marginvertical: {
    marginVertical: 8,
  },
});
