import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {icons} from '../../constants';

import FastImage from 'react-native-fast-image';

const Header = ({navigation, title}) => {
  return (
    <View className="h-[55px] bg-white flex flex-row px-2">
      <View className="flex flex-row space-x-3 items-center ">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="absolute left-2 z-[999]">
          <FastImage
            source={icons.backarrow}
            className="w-[25px] h-[25px]"
            resizeMode="contain"
            tintColor="black"
            alt="image"
          />
        </TouchableOpacity>
        <View className="w-full relative right-5">
          <Text
            className="text-black font-bold text-[20px] text-center"
            style={styles.customFont}>
            {title}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  customFont: {
    fontFamily: 'serif',
  },
});

export default Header;
