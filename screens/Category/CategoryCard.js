import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {Image} from 'react-native';
import axios from 'axios';
import {base_url2} from '../../utils/baseUrl';

const CategoryCard = ({product}) => {
  const getCategoryId = async () => {
    const title1 = product.category.title;
    const title2 = product.items[0].title;
    const data = {title1, title2};

    const res = await axios.get(`${base_url2}categories/get/by-titles`, {
      title1: 'Warrior Featured',
      title2: 'Hoodie',
    });
    console.log(res.data);
  };
  return (
    <TouchableOpacity
      className="items-center gap-y-3 p-1"
      onPress={() => getCategoryId()}>
      <Image
        source={{uri: product.items[0].image}}
        className="w-[100px] h-[100px]"
        resizeMode="contain"
      />
      <Text className="text-black text-[10px]">{product.items[0].title}</Text>
    </TouchableOpacity>
  );
};

export default CategoryCard;
