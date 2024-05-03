import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Header from '../../checkout/Header';
import {FormControl, Input} from 'native-base';
import {icons} from '../../../constants';
import {Image} from 'react-native';
import {AppVersion, CopyRight} from '../../../components';

const EmailModification = ({navigation}) => {
  const [otpCode, setOtpCode] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleEmailChange = value => {
    setEmail(value);
    if (value.trim() === '') {
      setEmailError('Email is required');
    } else if (!/\S+@\S+\.\S+/.test(value)) {
      setEmailError('Email is invalid');
    } else {
      setEmailError('');
    }
  };

  const handleChangeCode = value => {
    setOtpCode(value);
  };

  return (
    <View className="flex-1 bg-white">
      <Header title="Modify Email" navigation={navigation} />
      <View className="bg-gray-100 px-2 py-3 gap-2">
        <Text className="text-gray-400 text-[12px]">Current Email</Text>
        <Text className="text-black font-semibold">
          mwanikicharles226@gmail.com
        </Text>
      </View>

      {/* phoneNumber  */}
      <View className="p-4">
        <FormControl isRequired isInvalid={emailError !== ''}>
          <FormControl.Label>
            <Text className="text-black font-bold" style={styles.customFont}>
              New Email
            </Text>
          </FormControl.Label>
          <Input
            placeholder="    Enter your email"
            onChangeText={handleEmailChange}
            value={email}
            keyboardType="numeric"
            returnKeyType="done"
            borderColor="blue.900"
            className="text-black text-[14px]"
            variant="underlined"
            InputLeftElement={
              <TouchableOpacity>
                <Image
                  source={icons.message}
                  className="w-[20px] h-[20px] ml-[10px]"
                  style={{tintColor: 'black'}}
                />
              </TouchableOpacity>
            }
          />

          <View className="flex flex-row items-center justify-between ">
            <View>
              {setEmail !== '' && (
                <FormControl.ErrorMessage>{setEmail}</FormControl.ErrorMessage>
              )}
            </View>
          </View>
        </FormControl>

        {/* code  */}

        <View className="mt-2">
          <FormControl isRequired>
            <FormControl.Label>
              <Text className="text-black font-bold" style={styles.customFont}>
                Code
              </Text>
            </FormControl.Label>
            <Input
              placeholder="     Enter Email code"
              onChangeText={handleChangeCode}
              value={otpCode}
              autoCapitalize="none"
              returnKeyType="done"
              borderColor="blue.900"
              className="text-black text-[14px]"
              variant="underlined"
              InputLeftElement={
                <TouchableOpacity>
                  <Image
                    source={icons.message}
                    className="w-[20px] h-[20px] ml-[10px]"
                    style={{tintColor: 'black'}}
                  />
                </TouchableOpacity>
              }
              InputRightElement={
                <TouchableOpacity className="rounded-full px-3 py-1.5 border border-blue-900">
                  <Text className="text-blue-900">Send</Text>
                </TouchableOpacity>
              }
            />
          </FormControl>
        </View>

        <TouchableOpacity className="bg-blue-900 p-4 mt-8 rounded-full">
          <Text className="text-white font-bold text-[17px] text-center">
            Submit
          </Text>
        </TouchableOpacity>
      </View>

      <View className="absolute bottom-2">
        <AppVersion />
        <CopyRight />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  customFont: {
    fontFamily: 'serif',
  },
});

export default EmailModification;
