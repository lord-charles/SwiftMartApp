import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {Rating} from 'react-native-ratings';
import {icons} from '../../constants';
import axios from 'axios';
import {base_url} from '../../utils/baseUrl';
import config from '../../utils/axiosconfig';
import {useToast} from 'react-native-toast-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductCard = ({
  product,
  navigation,
  getWishlistProducts,
  authorized,
}) => {
  const toast = useToast();

  const [token, setToken] = useState('');

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
        addToWishlist(currentToken);
      }
    } catch (error) {
      console.log(error);

      if (error.message === 'Request failed with status code 404') {
        toast.show('sign to access wishlist', {
          type: 'warning',
          placement: 'top',
          duration: 2000,
          offset: 30,
          animationType: 'slide-in',
        });
      }
    }
  };

  const addToWishlist = async currentToken => {
    try {
      const api = axios.create({
        baseURL: base_url,
        headers: config(currentToken).headers,
      });

      const res = await api.put(
        'products/wishlist/',
        {
          prodId: product._id,
        },
        config(currentToken),
      );
      if (res.data.added) {
        return (
          toast.show(`${product.title} added to wishlist`, {
            type: 'success',
            placement: 'top',
            duration: 2000,
            offset: 30,
            animationType: 'slide-in',
          }),
          getWishlistProducts ? getWishlistProducts() : null
        );
      } else {
        toast.show(`${product.title} removed from wishlist`, {
          type: 'danger',
          placement: 'top',
          duration: 2000,
          offset: 30,
          animationType: 'slide-in',
        }),
          getWishlistProducts();
      }
    } catch (error) {
      console.error(error);
      toast.show('retry', {
        type: 'danger',
        placement: 'top',
        duration: 2000,
        offset: 30,
        animationType: 'slide-in',
      });
    }
  };

  return (
    <View className="flex items-center p-1">
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ProductDetails', {
            id: product._id,
            authorized,
            token,
          })
        }>
        <Image
          source={{uri: product?.images[0]?.url}}
          className="w-[120px] h-[120px]"
          resizeMode="contain"
        />
      </TouchableOpacity>

      <Text className="text-black text-[13px] mt-3">
        {product?.description?.slice(0, 24)}
        {product?.description?.length > 24 ? '...' : ''}
      </Text>
      <Text className="text-black text-[15px] font-bold text-center mt-[5px]">
        Ksh {Math.floor(product?.price)?.toLocaleString()}
      </Text>

      <View className="flex flex-row space-x-9 items-center">
        <Rating
          type="custom"
          ratingColor="#020a3b"
          ratingBackgroundColor="#c8c7c8"
          ratingCount={5}
          imageSize={15}
          readonly
          style={{paddingVertical: 5}}
          startingValue={3}
        />
        <TouchableOpacity onPress={() => getToken()}>
          <Image
            source={icons.addtofav}
            className="w-[20px] h-[20px]"
            resizeMode="contain"
            alt="rating icon"
            style={{tintColor: 'black'}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductCard;
