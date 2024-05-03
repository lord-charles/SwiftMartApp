import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  StyleSheet,
} from 'react-native';
import {icons, images} from '../../constants';
import Recommended from './Recommended';
import {Button} from 'native-base';
import axios from 'axios';
import {base_url} from '../../utils/baseUrl';
import config from '../../utils/axiosconfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';

const Account = ({navigation}) => {
  const [firstname, setFirstName] = useState(null);
  const [secondname, setSecondName] = useState(null);
  const [orders, setOrders] = useState(0);
  const [cart, setCart] = useState(0);
  const [wishlist, setWishlist] = useState(0);

  const verifyToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const api = axios.create({
        baseURL: base_url,
        headers: config(token).headers,
      });

      const res = await api.get('user/verifyToken/', config(token));

      if (res.data.message === 'authorized') {
        setFirstName(res.data.user?.firstname);
        setSecondName(res.data.user?.lastname);
        getOrders(token);
        getCart(token);
        getWishlistProducts(token);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  const getOrders = async token => {
    try {
      const api = axios.create({
        baseURL: base_url,
        headers: config(token).headers,
      });

      const response = await api.post('user/orders/', config(token));
      // console.log(response.data);
      setOrders(response.data.length);
    } catch (err) {
      // console.log(err);
      if (err.response.data.message === 'No orders found for user') {
        console.log(err.response.data.message);
      }
    }
  };

  const getCart = async currentToken => {
    try {
      const api = axios.create({
        baseURL: base_url,
        headers: config(currentToken).headers,
      });

      const res = await api.get('/cart');
      // console.log(res);
      setCart(res.data?.items.length);
    } catch (err) {
      console.log(err);
    }
  };

  const getWishlistProducts = async currentToken => {
    try {
      const api = axios.create({
        baseURL: base_url,
        headers: config(currentToken).headers,
      });
      const response = await api.get(
        `${base_url}user/wishlist/`,
        config(currentToken),
      );
      setWishlist(response.data.wishlist.length);
    } catch (err) {
      console.log(err);
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

  return (
    <View className="bg-gray-100">
      <FlatList
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            {/* part 1  */}
            <View
              className="py-4 m-2 rounded-md flex space-y-2"
              style={{backgroundColor: '#020a3b'}}>
              <ImageBackground
                source={images.background_03}
                tintColor="#020a4b"
                className="absolute w-full h-full"
              />

              {/* section 1  */}
              <View className="flex flex-row justify-between px-2 items-center">
                <TouchableOpacity
                  className="flex flex-row items-center  space-x-4"
                  onPress={() => navigation.navigate('SignIn')}>
                  <Image
                    source={icons.useravatar}
                    className="w-[55px] h-[55px]"
                    resizeMode="contain"
                    alt="image"
                  />
                  <View>
                    {firstname !== null ? (
                      <View className="flex flex-row space-x-1">
                        <Text className="text-white text-[15px]">
                          {firstname}
                        </Text>
                        <Text className="text-white text-[15px]">
                          {secondname}
                        </Text>
                      </View>
                    ) : (
                      <Text className="text-white text-[15px]">
                        Login/Register
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate('AccountSettings')}>
                  <Image
                    source={icons.setting}
                    className="w-[25px] h-[25px]"
                    resizeMode="contain"
                    alt="image"
                    style={{tintColor: 'white'}}
                  />
                </TouchableOpacity>
              </View>

              {/* section 2  */}
              <View className="items-end">
                <TouchableOpacity
                  onPress={() => alert('FashionWarrior Coin coming soon!')}
                  className="flex flex-row space-x-1 items-center bg-white w-[180px] rounded-l-full py-1 pl-0.5">
                  <Image
                    source={icons.coin}
                    className="w-[25px] h-[25px]"
                    resizeMode="contain"
                    alt="image"
                  />
                  <Text className="text-[12px] text-[#020a3b]">
                    FashionWarrior Coin Reward
                  </Text>
                  <Image
                    source={icons.leftchev}
                    className="w-[20px] h-[20px]"
                    resizeMode="contain"
                    alt="image"
                    style={{tintColor: 'orange'}}
                  />
                </TouchableOpacity>
              </View>

              {/* section 3  */}
              <View className="flex flex-row items-center justify-between px-6">
                <View className="items-center">
                  <Text className="text-[17px] font-bold text-white">
                    {wishlist}
                  </Text>
                  <Text className="text-[13px]  text-white">Wishlist </Text>
                </View>
                <View className="items-center">
                  <Text className="text-[17px] font-bold text-white">
                    {cart}
                  </Text>
                  <Text className="text-[13px]  text-white">Cart</Text>
                </View>
                <View className="items-center">
                  <Text className="text-[17px] font-bold text-white">
                    {orders}
                  </Text>
                  <Text className="text-[13px]  text-white">Orders</Text>
                </View>
              </View>
            </View>

            {/* part 2  */}
            <View className="m-2 px-2 py-4 rounded-md bg-white rounde-md">
              {/* section 1  */}
              <View className="items-center flex flex-row justify-between">
                <Text className="text-black text-[17px]">My Orders</Text>
                <Button
                  className="bg-[#020a3b]"
                  onPress={() => navigation.navigate('MyOrders')}>
                  <Text className="text-white text-[13px]">View All</Text>
                </Button>
              </View>

              {/* section 2  */}
              <View className="flex flex-row justify-between mt-[20px]">
                <TouchableOpacity
                  className="items-center flex space-y-1"
                  onPress={() => navigation.navigate('MyOrders')}>
                  <Image
                    source={icons.wallet}
                    className="w-[25px] h-[25px]"
                    style={{tintColor: '#020a3b'}}
                    resizeMode="contain"
                    alt="image"
                  />
                  <Text className="text-black text-[13px]">Unpaid</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="items-center flex space-y-1"
                  onPress={() => navigation.navigate('MyOrders')}>
                  <Image
                    source={icons.shipping3}
                    className="w-[25px] h-[25px]"
                    style={{tintColor: '#020a3b'}}
                    resizeMode="contain"
                    alt="image"
                  />
                  <View>
                    <Text className="text-black text-[13px] text-center">
                      To be
                    </Text>
                    <Text className="text-black text-[13px]">shipped</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  className="items-center flex space-y-1"
                  onPress={() => navigation.navigate('MyOrders')}>
                  <Image
                    source={icons.shipped}
                    className="w-[25px] h-[25px]"
                    style={{tintColor: '#020a3b'}}
                    resizeMode="contain"
                    alt="image"
                  />
                  <Text className="text-black text-[13px]">Shipped</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="items-center flex space-y-1"
                  onPress={() => navigation.navigate('MyOrders')}>
                  <Image
                    source={icons.review}
                    className="w-[25px] h-[25px]"
                    style={{tintColor: '#020a3b'}}
                    resizeMode="contain"
                    alt="image"
                  />
                  <View>
                    <Text className="text-black text-[13px] text-center">
                      To be{' '}
                    </Text>
                    <Text className="text-black text-[13px]"> Reviewed</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  className="items-center flex space-y-1"
                  onPress={() => alert('Refund/Aftersale coming soon!')}>
                  <Image
                    source={icons.refund}
                    className="w-[25px] h-[25px]"
                    style={{tintColor: '#020a3b'}}
                    resizeMode="contain"
                    alt="image"
                  />
                  <View>
                    <Text className="text-black text-[13px] text-center">
                      Refund/
                    </Text>
                    <Text className="text-black text-[13px]">Aftersale</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            {/* part 3  */}
            <View className="mx-2 px-2 py-4 rounded-md bg-white rounde-md">
              {/* section 1  */}
              <View>
                <Text className="text-black text-[17px]">My Assets</Text>
              </View>

              {/* section 2  */}
              <View className="flex flex-row justify-between mt-[20px]">
                <View className="items-center flex space-y-2">
                  <Text className="text-[#020a3b] text-[17px]">0</Text>
                  <Text className="text-black text-[13px]">Balance</Text>
                </View>
                <View className="items-center flex space-y-1">
                  <Text className="text-[#020a3b] text-[17px]">0</Text>

                  <Text className="text-black text-[13px]">Vouchers</Text>
                </View>
                <View className="items-center flex space-y-1">
                  <Text className="text-[#020a3b] text-[17px]">0</Text>

                  <Text className="text-black text-[13px]">Coins</Text>
                </View>
              </View>
            </View>

            {/* part 4  */}
            <View className="m-2 px-2 py-4 rounded-md bg-white rounde-md">
              {/* section 1  */}
              <View>
                <Text className="text-black text-[17px]">My Earnings</Text>
              </View>

              {/* section 2  */}
              <View className="flex flex-row justify-between mt-[20px]">
                <TouchableOpacity
                  className="items-center flex space-y-1"
                  onPress={() => alert('FashionWarrior invite coming soon!')}>
                  <Image
                    source={icons.code}
                    className="w-[25px] h-[25px]"
                    style={{tintColor: '#020a3b'}}
                    resizeMode="contain"
                    alt="image"
                  />
                  <Text className="text-black text-[13px]">
                    Enter invite Code
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="items-center flex space-y-1"
                  onPress={() =>
                    alert('FashionWarrior Invite & Earn coming soon!')
                  }>
                  <Image
                    source={icons.invite}
                    className="w-[25px] h-[25px]"
                    style={{tintColor: '#020a3b'}}
                    resizeMode="contain"
                    alt="image"
                  />
                  <View>
                    <Text className="text-black text-[13px]">
                      Invite & Earn
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  className="items-center flex space-y-1"
                  onPress={() =>
                    alert('FashionWarrior Withdraw to Balance coming soon!')
                  }>
                  <Image
                    source={icons.atm}
                    className="w-[25px] h-[25px]"
                    resizeMode="contain"
                    alt="image"
                  />
                  <View>
                    <Text className="text-black text-[13px]">
                      Withdraw to Balance
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            {/* part 5  */}
            <View className="mx-2 px-2 py-4 rounded-md bg-white rounde-md">
              {/* section 1  */}
              <View>
                <Text className="text-black text-[17px]">My Tools</Text>
              </View>

              {/* section 2  */}
              <View className="flex flex-row justify-between mt-[20px]">
                <TouchableOpacity
                  className="items-center flex space-y-1"
                  onPress={() => navigation.navigate('AddressBook')}>
                  <Image
                    source={icons.addressbook}
                    className="w-[25px] h-[25px]"
                    style={{tintColor: '#020a3b'}}
                    resizeMode="contain"
                    alt="image"
                  />
                  <View>
                    <Text className="text-black text-[13px]">Address</Text>
                    <Text className="text-black text-[13px] text-center">
                      Book
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  className="items-center flex space-y-1"
                  onPress={() => navigation.navigate('AccountSettings')}>
                  <Image
                    source={icons.setting2}
                    className="w-[25px] h-[25px]"
                    style={{tintColor: '#020a3b'}}
                    resizeMode="contain"
                    alt="image"
                  />
                  <View>
                    <Text className="text-black text-[13px]">Settings</Text>
                  </View>
                </TouchableOpacity>
                {/* <TouchableOpacity
                  className="items-center flex space-y-1"
                  onPress={() => navigation.navigate('Faqs')}>
                  <Image
                    source={icons.faq}
                    className="w-[25px] h-[25px]"
                    resizeMode="contain"
                    alt="image"
                  />
                  <View>
                    <Text className="text-black text-[13px]">FAQ's</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity className="items-center flex space-y-1">
                  <Image
                    source={icons.suggestion}
                    className="w-[25px] h-[25px]"
                    style={{tintColor: 'green'}}
                    resizeMode="contain"
                    alt="image"
                  />
                  <Text className="text-black text-[13px]">Suggestion</Text>
                </TouchableOpacity> */}
                <TouchableOpacity
                  className="items-center flex space-y-1"
                  onPress={() => navigation.navigate('Language')}>
                  <Image
                    source={icons.language}
                    className="w-[25px] h-[25px]"
                    style={{tintColor: '#020a3b'}}
                    resizeMode="contain"
                    alt="image"
                  />
                  <View>
                    <Text className="text-black text-[13px]">Language</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  className="items-center flex space-y-1"
                  onPress={() => navigation.navigate('Currency')}>
                  <Image
                    source={icons.currency}
                    className="w-[25px] h-[25px]"
                    style={{tintColor: '#020a3b'}}
                    resizeMode="contain"
                    alt="image"
                  />
                  <View>
                    <Text className="text-black text-[13px]">Currency</Text>
                  </View>
                </TouchableOpacity>
              </View>
              {/* section 3  */}
              {/* <View className="flex flex-row space-x-[60px] mt-[20px]">
                <TouchableOpacity
                  className="items-center flex space-y-1"
                  onPress={() => navigation.navigate('Notifications')}>
                  <Image
                    source={icons.notification}
                    className="w-[25px] h-[25px]"
                    style={{tintColor: '#020a3b'}}
                    resizeMode="contain"
                    alt="image"
                  />
                  <Text className="text-black text-[13px]">Notifications</Text>
                </TouchableOpacity>
              </View> */}
            </View>
          </>
        }
        ListFooterComponent={
          <>
            <View>
              <Text
                className="text-black text-[17px] text-center font-bold mt-1"
                style={styles.customFont}>
                Recommendations For You
              </Text>
              <Recommended navigation={navigation} />
            </View>
          </>
        }
      />
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

export default Account;
