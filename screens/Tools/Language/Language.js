import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {icons} from '../../../constants';
import Header from '../../checkout/Header';

const Language = ({navigation}) => {
  return (
    <View>
      <Header navigation={navigation} title="Language" />
      <TouchableOpacity className="flex justify-between p-4 bg-white mt-1 flex-row items-center">
        <Text
          className="text-black font-semibold text-[16px]"
          style={styles.customFont}>
          English (US)
        </Text>
        <FastImage source={icons.correct} className="w-[25px] h-[25px]" />
      </TouchableOpacity>
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

export default Language;
