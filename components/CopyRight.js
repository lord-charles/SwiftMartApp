import React from 'react';
import {View, Text} from 'react-native';

function CopyRight({color}) {
  return (
    <View className="w-screen">
      <Text
        className={`text-${color ? color : 'black'} text-center text-[13px]`}>
        &copy; {new Date().getFullYear()} Warrior, All rights Reserved
      </Text>
    </View>
  );
}

export default CopyRight;
