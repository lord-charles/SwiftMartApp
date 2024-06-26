import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import {icons, images} from '../../constants';
import {
  VStack,
  Box,
  Center,
  FormControl,
  Input,
  Button,
  Checkbox,
} from 'native-base';
import CountryPicker, {FlagButton} from 'react-native-country-picker-modal';
import FastImage from 'react-native-fast-image';
import axios from 'axios';
import {base_url} from '../../utils/baseUrl';
import Toast from 'react-native-toast-message';
import LottieView from 'lottie-react-native';

const SignUp = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [secondName, setSecondName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [countryCode, setCountryCode] = useState('US'); // Set the default country code

  const handleFirstNameChange = value => {
    setFirstName(value);
  };
  const handleSecondNameChange = value => {
    setSecondName(value);
  };

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

  const handleSignUp = async () => {
    setLoading(true);
    if (
      firstName !== '' &&
      secondName !== '' &&
      email !== '' &&
      emailError === '' &&
      phoneNumber !== '' &&
      phoneNumberError === '' &&
      password !== ''
    ) {
      try {
        const res = await axios.post(`${base_url}user/register`, {
          firstname: firstName,
          lastname: secondName,
          email,
          mobile: phoneNumber,
          password,
        });

        if (res.data.message === 'User created') {
          Toast.show({
            type: 'info',
            text1: 'Registration Successful',
            text2: `Welcome, ${firstName}, we are delighted to have you on board.`,
          });
          navigation.navigate('SignIn');
        }

        if (res.data.err?.code === 11000) {
          Toast.show({
            type: 'info',
            text1: 'A user with this Phone number is already registered.',
            text2: 'Please proceed to log in using your existing credentials.',
          });
        }
        setLoading(false);
      } catch (error) {
        if (error.message === 'Request failed with status code 400') {
          Toast.show({
            type: 'info',
            text1: 'A user with this email is already registered.',
            text2: 'Please proceed to log in using your existing credentials.',
          });
        }

        setLoading(false);
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
      <View>
        <View style={{height: '35%'}}>
          <ImageBackground
            source={images.background_01}
            style={{width: '100%', height: '100%', resizeMode: 'cover'}}
          />
        </View>

        <Center style={{backgroundColor: '#FFFFFF'}} className="relative">
          <View className="relative top-[-270px] ">
            <View className="absolute w-[90vw] top-[0px] ">
              <View className="flex items-center space-y-2 justify-center relative top-[-10vh]">
                <FastImage
                  source={icons.warriorlogo}
                  className="w-[250px] h-[270px]"
                  resizeMode="stretch"
                  tintColor="#020a3b"
                  alt="logo"
                />
                <Text
                  className="text-black font-sans font-bold text-[16px] relative top-[-8vh] right-2"
                  style={styles.customFont}>
                  Join FashionWarrior
                </Text>
              </View>
            </View>
            <Box
              className="h-[70vh] w-[90vw] bg-white relative top-[20vh] shadow-lg shadow-slate-500"
              border="1"
              borderRadius="2xl">
              <VStack space={3} marginTop={5} marginX={7}>
                <FormControl isRequired>
                  <FormControl.Label>
                    <Text
                      className="text-black font-bold"
                      style={styles.customFont}>
                      First Name
                    </Text>
                  </FormControl.Label>
                  <Input
                    placeholder="Enter your First name"
                    value={firstName}
                    onChangeText={handleFirstNameChange}
                    className="text-black text-[14px]"
                    borderColor="blue.900"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormControl.Label>
                    <Text
                      className="text-black font-bold"
                      style={styles.customFont}>
                      Second Name
                    </Text>
                  </FormControl.Label>
                  <Input
                    placeholder="Enter your Second name"
                    value={secondName}
                    onChangeText={handleSecondNameChange}
                    className="text-black text-[14px]"
                    borderColor="blue.900"
                  />
                </FormControl>

                <FormControl isRequired isInvalid={emailError !== ''}>
                  <FormControl.Label>
                    <Text
                      className="text-black font-bold"
                      style={styles.customFont}>
                      Email
                    </Text>
                  </FormControl.Label>
                  <Input
                    placeholder={'Enter your email'}
                    onChangeText={handleEmailChange}
                    value={email}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    returnKeyType="next"
                    className="text-black text-[14px]"
                    borderColor="blue.900"
                  />
                  <View className="flex flex-row items-center justify-between ">
                    <View>
                      {emailError !== '' && (
                        <FormControl.ErrorMessage>
                          <Text className="">{emailError}</Text>
                        </FormControl.ErrorMessage>
                      )}
                    </View>
                  </View>
                </FormControl>

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
                </FormControl>

                <View>
                  <View className="pb-1">
                    <Checkbox
                      colorScheme="success"
                      shadow={2}
                      value="danger"
                      defaultIsChecked>
                      <View className="flex-row items-center">
                        <Text
                          className="text-black font-serif text-[12px]"
                          style={styles.customFont}>
                          I agree to{' '}
                        </Text>
                        <TouchableOpacity
                          onPress={() =>
                            console.log('Terms and Conditions pressed')
                          }>
                          <Text
                            className="text-black underline font-serif text-[12px]"
                            style={styles.customFont}>
                            Terms and Conditions
                          </Text>
                        </TouchableOpacity>
                        <Text className="text-black text-[12px]"> & </Text>
                        <TouchableOpacity
                          onPress={() => console.log('Privacy Policy pressed')}>
                          <Text
                            className="text-black underline font-serif text-[12px]"
                            style={styles.customFont}>
                            Privacy Policy
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </Checkbox>
                  </View>

                  <TouchableOpacity>
                    <Button
                      mt={2}
                      className="bg-blue-900"
                      onPress={handleSignUp}
                      disabled={false}>
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
                            Sign up
                          </Text>
                        )}
                      </View>
                    </Button>
                  </TouchableOpacity>

                  <View className="flex space-x-2 flex-row justify-center items-center mt-[15px]">
                    <Text
                      className="text-black text-[13px]"
                      style={styles.customFont}>
                      Already have an account?
                    </Text>
                    <TouchableOpacity
                      onPress={() => navigation.replace('SignIn')}>
                      <Text
                        className="text-black font-bold"
                        style={styles.customFont}>
                        Login
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </VStack>
            </Box>
          </View>
        </Center>
      </View>
    </View>
  );
};
export default SignUp;
