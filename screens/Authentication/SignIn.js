import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {icons, images} from '../../constants';
import {VStack, Box, Center, FormControl, Input, Button} from 'native-base';
import CountryPicker, {FlagButton} from 'react-native-country-picker-modal';
import FastImage from 'react-native-fast-image';
import Toast from 'react-native-toast-message';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {base_url} from '../../utils/baseUrl';
import axios from 'axios';
import StatusBarComponent from '../../components/StatusBar';

const SignIn = ({navigation}) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [countryCode, setCountryCode] = useState('US'); // Set the default country code
  const [loading, setLoading] = useState(false);

  const onSelect = country => {
    setCountryCode(country.cca2);
  };

  const handlePhoneNumberChange = value => {
    setPhoneNumber(value);
    if (value.trim() === '') {
      setPhoneNumberError('Phone number is required');
    } else if (!/^(0|7)[0-9]{8}$/.test(value)) {
      setPhoneNumberError('Phone number is invalid');
    } else {
      setPhoneNumberError('');
    }
  };

  const handlePasswordChange = value => {
    setPassword(value);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Storing token
  const storeToken = async token => {
    try {
      await AsyncStorage.setItem('token', token);
      console.log('Token stored successfully.');
    } catch (error) {
      console.log('Error storing token:', error);
    }
  };

  // Retrieving token
  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log(token);
    } catch (error) {
      console.log('Error retrieving token:', error);
    }
  };

  const loginUser = async () => {
    setLoading(true);
    if (phoneNumber !== '' && password !== '' && phoneNumberError === '') {
      try {
        const res = await axios.post(`${base_url}user/login`, {
          password,
          mobile: phoneNumber,
        });
        console.log(res.data);

        if (
          res.data.message ===
          'Operation `users.findOne()` buffering timed out after 10000ms'
        ) {
          return (
            Toast.show({
              type: 'error',
              text1: 'Error connecting to database!',
              text2: 'Please enter the correct login credentials.',
            }),
            setLoading(false)
          );
        }

        if (res.status === 200) {
          const {token} = res.data;
          storeToken(token);
          getToken();
          setLoading(false);
          Toast.show({
            type: 'info',
            text1: 'Welcome Back!',
            text2: 'You have successfully logged in.',
          });
          navigation.navigate('DrawerNav');
        }
      } catch (err) {
        console.log(err.message);
        if (err.response.data === 'Wrong mobile!') {
          Toast.show({
            type: 'info',
            text1: 'Incorrect Phone Number',
            text2: 'Please enter the correct login credentials.',
          });
          setLoading(false);
        }
        if (err.response.data === 'Wrong password!') {
          Toast.show({
            type: 'info',
            text1: 'Incorrect Password',
            text2: 'Please enter the correct login credentials.',
          });
          setLoading(false);
        }
      }
    } else {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please fill all fields correctly',
      });
      setLoading(false);
    }
  };

  const styles = StyleSheet.create({
    customFont: {
      fontFamily: 'serif',
    },
  });

  return (
    <View style={{backgroundColor: '#FFFFFF', height: '100%'}}>
      <StatusBarComponent backgroundColor="white" />

      <View>
        <Center style={{backgroundColor: '#FFFFFF'}} className="relative">
          <View className="absolute top-[40px] ">
            <View className="flex items-center space-y-2 relative top-[-8vh]">
              <FastImage
                source={icons.warriorlogo}
                className="w-[250px] h-[270px]"
                resizeMode="stretch"
                tintColor="#020a3b"
                alt="logo"
              />
              <Text
                className="text-black font-sans font-bold text-[16px] relative top-[-8.9vh] right-2"
                style={styles.customFont}>
                Welcome back
              </Text>
            </View>
          </View>
          <Box
            border="1"
            borderRadius="2xl"
            className="h-[60vh] w-[90%] bg-white relative top-[25vh] shadow-lg shadow-slate-500">
            <VStack space={3} marginTop={5} marginX={7}>
              <FormControl isRequired isInvalid={phoneNumberError !== ''}>
                <FormControl.Label>
                  <Text
                    className="text-black font-bold"
                    style={styles.customFont}>
                    Phone Number
                  </Text>
                </FormControl.Label>
                <Input
                  placeholder="Enter your phone number"
                  onChangeText={handlePhoneNumberChange}
                  value={phoneNumber}
                  keyboardType="numeric"
                  returnKeyType="done"
                  borderColor="blue.900"
                  className="text-black text-[14px]"
                  InputLeftElement={
                    <View>
                      <CountryPicker
                        countryCode={countryCode}
                        withFilter
                        withFlag
                        withCountryNameButton={false} // Set withCountryNameButton to false
                        withAlphaFilter
                        withCallingCode={true}
                        withEmoji
                        onSelect={onSelect}
                        visible={false}
                        renderFlagButton={() => (
                          <View className="flex flex-row items-center ml-[5px]">
                            <FlagButton countryCode="KE" withEmoji />
                            <Text className="text-black font-semibold">
                              +254
                            </Text>
                          </View>
                        )}
                      />
                    </View>
                  }
                />

                <View className="flex flex-row items-center justify-between ">
                  <View>
                    {phoneNumberError !== '' && (
                      <FormControl.ErrorMessage>
                        {phoneNumberError}
                      </FormControl.ErrorMessage>
                    )}
                  </View>
                </View>
              </FormControl>

              <FormControl isRequired>
                <FormControl.Label>
                  <Text
                    className="text-black font-bold"
                    style={styles.customFont}>
                    Password
                  </Text>
                </FormControl.Label>
                <Input
                  placeholder="Enter your password"
                  onChangeText={handlePasswordChange}
                  value={password}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  returnKeyType="done"
                  borderColor="blue.900"
                  className="text-black text-[14px]"
                  InputRightElement={
                    <View>
                      {!showPassword ? (
                        <TouchableOpacity onPress={handleShowPassword}>
                          <Image
                            source={icons.eye}
                            onPress={handleShowPassword}
                            className="w-[20px] h-[20px] mr-[10px]"
                            style={{tintColor: 'black'}}
                          />
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity onPress={handleShowPassword}>
                          <Image
                            source={icons.eye_close}
                            onPress={handleShowPassword}
                            className="w-[20px] h-[20px] mr-[10px]"
                            style={{tintColor: 'black'}}
                          />
                        </TouchableOpacity>
                      )}
                    </View>
                  }
                />
                {/* <TouchableOpacity
                  onPress={() => navigation.navigate('ForgotPassword')}
                  className="relative  top-[3px]">
                  <Text
                    className="text-black italic text-[13px] mt-1 underline text-right"
                    style={styles.customFont}>
                    Forgot Password?
                  </Text>
                </TouchableOpacity> */}
              </FormControl>
              <TouchableOpacity className="mt-2">
                <Button
                  mt={2}
                  className="bg-blue-900 text-white font-bold"
                  onPress={() => loginUser()}
                  style={styles.customFont}>
                  <View>
                    {loading ? (
                      <View className="bg-red-600 h-[20px] relative left-[-50px] top-[-14px] ">
                        <LottieView
                          source={require('../../assets/Evabamar.json')}
                          autoPlay
                          loop
                          width={100}
                          height={50}
                        />
                      </View>
                    ) : (
                      <Text
                        style={styles.customFont}
                        className="text-white font-bold text-[16px]">
                        Log in
                      </Text>
                    )}
                  </View>
                </Button>
              </TouchableOpacity>

              <Text
                className="text-center text-gray-600 text-[13px] "
                style={styles.customFont}>
                or, create a new account ?
              </Text>
              <TouchableOpacity>
                <Button
                  mt={2}
                  className="bg-blue-900 text-white font-bold"
                  onPress={() => navigation.navigate('SignUp')}
                  style={styles.customFont}>
                  <Text
                    style={styles.customFont}
                    className="text-white font-bold text-[16px]">
                    Sign up
                  </Text>
                </Button>
              </TouchableOpacity>
              <Text
                className="text-center text-gray-600 text-[13px]"
                style={styles.customFont}>
                Log in with
              </Text>
              <View className="flex flex-row space-x-3 justify-center items-center mt-[5px]">
                <TouchableOpacity>
                  <Image
                    source={images.google}
                    className="w-[30px] h-[30px]"
                    alt="image"
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image
                    source={images.facebook}
                    className="w-[30px] h-[30px]"
                    alt="image"
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image
                    source={images.twitter}
                    className="w-[32px] h-[32px]"
                    alt="image"
                  />
                </TouchableOpacity>
              </View>
            </VStack>
          </Box>
        </Center>
      </View>
    </View>
  );
};

export default SignIn;
