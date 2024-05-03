import {View, Text} from 'react-native';
import React from 'react';
import Header from '../../checkout/Header';
import LottieView from 'lottie-react-native';

const Coupons = ({navigation}) => {
  return (
    <View className="">
      <Header navigation={navigation} title="My Coupons" />
      <View className="">
        <View className="relative top-[16vh] left-[5vw]">
          <LottieView
            source={require('../../../assets/noData.json')}
            autoPlay
            loop
            width={350}
            height={350}
          />
        </View>
        <Text className="text-gray-500 text-[12px] relative top-[50vh] text-center">
          Coupons not available at the moment
        </Text>
      </View>
    </View>
  );
};

export default Coupons;
