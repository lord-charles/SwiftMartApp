import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Header from '../../checkout/Header';
import FastImage from 'react-native-fast-image';
import {icons, images} from '../../../constants';
import {AppVersion, CopyRight} from '../../../components';

const About = ({navigation}) => {
  return (
    <View>
      <Header title="About Us" navigation={navigation} />
      <View className="bg-white h-screen w-screen mt-2 ">
        <View className="relative top-[-20px]">
          <FastImage
            source={icons.warriorlogo2}
            className="w-[100px h-[150px]"
            resizeMode="contain"
          />
          <Text
            className="text-black text-center relative top-[-40px]"
            style={styles.customFont}>
            Be The Brand, Be The Warrior
          </Text>

          <View className="relative top-[-15px]">
            <FastImage
              source={images.boss2}
              className="w-[400px] h-[400px]"
              resizeMode="contain"
            />
          </View>
          <View className="px-[41px]">
            <Text className="text-black text-[13px] font-semibold">
              Mr. Sammy Shollei
            </Text>
            <Text className="text-black text-[13px]">Co-Founder </Text>

            <Text className="text-black text-[10px]">
              With a visionary spirit and a profound commitment to excellence,
              Mr. Sammy Shollei has been an integral part of WarriorBrand since
              its inception in 2023. With a wealth of experience and a passion
              for innovation, he has played a pivotal role in shaping our brand
              into what it is today. A seasoned entrepreneur, Mr. Shollei brings
              a wealth of expertise to our team. His leadership has been
              instrumental in driving WarriorBrand's mission to deliver
              cutting-edge solutions that empower our users to conquer their
              goals. Under his guidance, WarriorBrand has thrived, embodying his
              dedication to quality, efficiency, and customer satisfaction. As a
              co-founder, Mr. Sammy Shollei continues to inspire our team to
              push boundaries, ensuring that WarriorBrand remains at the
              forefront of the industry.
            </Text>
          </View>
        </View>
      </View>
      <View className="absolute top-[95vh]">
        <AppVersion />
      </View>
      <View className="absolute top-[97vh]">
        <CopyRight />
      </View>
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

export default About;
