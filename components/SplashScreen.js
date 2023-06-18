import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import LottieView from 'lottie-react-native';
import {icons} from '../constants';
import SplashScreen from 'react-native-splash-screen';
import FastImage from 'react-native-fast-image';
import {orange100} from 'react-native-paper/lib/typescript/src/styles/themes/v2/colors';

const styles = StyleSheet.create({
  customFont: {
    fontFamily: 'serif',
  },
});

export default function Splash() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <View className="h-full w-screen bg-red-700">
      <View className="flex flex-col items-center mt-[50px]">
        <FastImage
          source={icons.SwiftMartlogo1}
          resizeMode="contain"
          className="w-[150px] h-[120px]"
          // tintColor={'gree'}
          alt="logo"
        />
        {/* <Text
          className="text-white text-[15px] font-extrabold text-center relative top-[10px] text-[15px]f"
          style={styles.customFont}>
          SwiftMart
        </Text> */}
      </View>

      <LottieView source={require('../assets/splash6.json')} autoPlay loop />
      <View className="absolute bottom-[20vh] left-[37vw] ">
        <LottieView
          source={require('../assets/loader1.json')}
          autoPlay
          loop
          width={100}
          height={100}
        />
      </View>

      <Text
        className="text-[12px] absolute bottom-3  text-black left-[35%]"
        style={styles.customFont}>
        &copy; {new Date().getFullYear()} SwiftMart Ltd
      </Text>
    </View>
  );
}
