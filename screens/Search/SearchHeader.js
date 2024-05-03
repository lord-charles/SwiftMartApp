import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import FastImage from 'react-native-fast-image';
import {icons} from '../../constants';
import {Input} from 'native-base';

const SearchHeader = ({navigation}) => {
  const [Search, setSearch] = useState('');

  const handleSearchChange = value => {
    setSearch(value);
  };
  return (
    <View className="flex flex-row items-center bg-white p-2 space-x-2">
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <FastImage
          source={icons.backarrow}
          className="w-[25px] h-[25px]"
          resizeMode="contain"
          tintColor="black"
          alt="image"
        />
      </TouchableOpacity>

      <View className="w-[80%] bg-gray-100 rounded-full">
        <Input
          placeholder="Warrior hoodie"
          onChangeText={handleSearchChange}
          value={Search}
          autoCapitalize="none"
          variant="unstyled"
          returnKeyType="done"
          className="text-black text-[14px] "
        />
      </View>
      <FastImage
        source={icons.search}
        className="w-[20px] h-[20px]"
        resizeMode="contain"
        tintColor="black"
        alt="image"
      />
    </View>
  );
};

export default SearchHeader;
