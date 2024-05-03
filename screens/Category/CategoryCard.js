import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {Image} from 'react-native';
import axios from 'axios';
import {base_url} from '../../utils/baseUrl';

const CategoryCard = ({product, navigation, setLoading}) => {
  const getCategoryId = async () => {
    const title1 = product.category.title;
    const title2 = product.items[0].title;
    const data = {title1, title2};

    try {
      setLoading(true);
      const res = await axios.post(`${base_url}categories/get/by-titles`, data);
      console.log(res.data);

      navigation.navigate('CategoryFilter', {
        id: res.data.category._id,
        title: title2,
      });
    } catch (err) {
      console.log(err.message);
      if (err.message === 'Request failed with status code 404') {
        navigation.navigate('CategoryFilter', {id: null, title: title2});
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <TouchableOpacity
      className="items-center gap-y-1 p-1"
      onPress={() => getCategoryId()}>
      <Image
        source={{uri: product.items[0].image}}
        className="w-[80px] h-[80px]"
        resizeMode="cover"
      />
      <Text className="text-black text-[10px]">{product.items[0].title}</Text>
    </TouchableOpacity>
  );
};

export default CategoryCard;
