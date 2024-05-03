import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {icons} from '../../constants';

const CategoryHeader = ({navigation, title, data}) => {
  return (
    <View className="bg-white h-[50px] justify-between items-center z-[999] flex flex-row px-2.5">
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <FastImage
          source={icons.backarrow}
          className="w-[25px] h-[25px]"
          resizeMode="contain"
          tintColor="black"
          alt="image"
        />
      </TouchableOpacity>
      <TouchableOpacity
        className="flex flex-row space-x-3 relative right-1 items-center bg-gray-100 mx-3 pl-4 py-2 rounded-full w-[80%]"
        onPress={() => navigation.navigate('Search')}>
        <FastImage
          source={icons.search}
          alt="image"
          className="w-[20px] h-[20px]"
          resizeMode="contain"
        />
        <Text className="text-black text-[14px]">{title}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="relative bg-white rounded-full right-1"
        onPress={() => navigation.navigate('Cart')}>
        <FastImage
          source={icons.cart}
          className="w-[20px] h-[20px]"
          tintColor="black"
        />

        {data?.length > 0 ? (
          <View className="absolute right-[1px] top-[-4px] bg-red-500 rounded-full  h-[17px] w-[17px] items-center flex justify-center">
            <Text className="text-[11px] text-center text-white">
              {data.length}
            </Text>
          </View>
        ) : null}
      </TouchableOpacity>
    </View>
  );
};

export default CategoryHeader;
