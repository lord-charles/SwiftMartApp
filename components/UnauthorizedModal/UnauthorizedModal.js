import React, {useEffect, useRef, useState} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {
  View,
  Text,
  Animated,
  TouchableWithoutFeedback,
  Modal,
  TouchableOpacity,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {icons} from '../../constants';

const UnauthorizedModal = ({isVisible, onClose, navigation, title}) => {
  const {height} = Dimensions.get('window');

  const [showFilterModal, setShowFilterModal] = useState(isVisible);

  //animation
  const modalAnimatedValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (showFilterModal) {
      Animated.timing(modalAnimatedValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(modalAnimatedValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => onClose());
    }
  }, [showFilterModal]);

  const modalY = modalAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [height + 100, height - 200],
  });

  return (
    <Modal transparent={true} visible={isVisible} animationType="fade">
      <View
        className="bg-white flex-1"
        style={{backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
        {/* transparent background */}
        <TouchableWithoutFeedback>
          <View className="absolute top-0 left-0 right-0 bottom-0 " />
        </TouchableWithoutFeedback>
        {/* animated pushup */}
        <Animated.View
          style={{
            position: 'absolute',
            left: 0,
            top: modalY,
            width: '100%',
            height: '80%',
            padding: 8,
            backgroundColor: 'white',
          }}>
          <View className="flex flex-row items-center px-3 relative top-[10px]">
            <TouchableOpacity
              className="bg-gray-100 relative p-1 rounded-full"
              onPress={() => {
                navigation.goBack(), setShowFilterModal(false);
              }}>
              <FastImage
                source={icons.backarrow}
                className="w-[28px] h-[28px]"
              />
            </TouchableOpacity>
            <Text className="text-[14px] text-black relative left-[65px]">
              Please SignIn to access {title}
            </Text>
          </View>

          <View className="space-y-2 relative top-[35px]">
            <TouchableOpacity
              className="bg-blue-900  p-3 mx-4 rounded-md"
              onPress={() => {
                navigation.navigate('SignIn'), setShowFilterModal(false);
              }}>
              <Text
                className="text-white font-bold text-[20px] text-center"
                style={styles.customFont}>
                SignIn
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-blue-900  p-3 mx-4 rounded-md"
              onPress={() => {
                navigation.navigate('SignUp'), setShowFilterModal(false);
              }}>
              <Text
                className="text-white font-bold text-[20px] text-center"
                style={styles.customFont}>
                SignUp
              </Text>
            </TouchableOpacity>
          </View>

          {/* apply filters button  */}
        </Animated.View>
      </View>
    </Modal>
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

export default UnauthorizedModal;
