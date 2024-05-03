import React from 'react';
import {View, Text} from 'react-native';

function AppVersion({color}) {
  return (
    <View className="w-screen">
      <Text
        className={`text-${color ? color : 'black'} text-center text-[13px]`}>
        App Version: 1.05
      </Text>
    </View>
  );
}

export default AppVersion;
