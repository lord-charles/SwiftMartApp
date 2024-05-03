import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useCallback, useState} from 'react';
import Header from '../../checkout/Header';
import FastImage from 'react-native-fast-image';
import {icons} from '../../../constants';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import {base_url} from '../../../utils/baseUrl';
import config from '../../../utils/axiosconfig';
import CountryPicker, {FlagButton} from 'react-native-country-picker-modal';
import LottieView from 'lottie-react-native';

import {
  CheckIcon,
  FormControl,
  Input,
  Select,
  TextArea,
  VStack,
} from 'native-base';
import {useFocusEffect} from '@react-navigation/native';
import StatusBarComponent from '../../../components/StatusBar';

const AddShippingAddress = ({navigation, route}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [countryCode, setCountryCode] = useState('US');
  const [message, setMessage] = useState('');
  const [County, setCounty] = useState('');
  const [firstName, setFirstName] = useState('');
  const [secondName, setSecondName] = useState('');
  const [loading, setLoading] = useState(false);

  const {userAdress, token} = route.params;

  const handleFirstNameChange = value => {
    setFirstName(value);
  };
  const handleSecondNameChange = value => {
    setSecondName(value);
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

  const addressData = {
    phoneNumber,
    message,
    firstName,
    secondName,
    County,
  };

  const updateUseraddress = async () => {
    if (
      phoneNumber.length === 0 ||
      message.length === 0 ||
      firstName.length === 0 ||
      secondName.length === 0 ||
      County.length === 0 ||
      phoneNumberError !== ''
    ) {
      return Toast.show({
        type: 'error',
        text1: 'Validation error',
        text2: 'Please fill all fields!',
      });
    }
    setLoading(true);

    try {
      const api = axios.create({
        baseURL: base_url,
        headers: config(token).headers,
      });
      await api.patch('user/address', addressData);
      setLoading(false);
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Shipping address updated successfully',
      });
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setPhoneNumber(userAdress.phoneNumber);
      setMessage(userAdress.message);
      setCounty(userAdress.County);
      setFirstName(userAdress.firstName);
      setSecondName(userAdress.secondName);
      return () => {};
    }, []),
  );

  return (
    <View className="flex-1">
      <Header title="Add Address" navigation={navigation} />
      <StatusBarComponent backgroundColor="white" />

      <View className="bg-white mt-1 h-screen">
        <VStack space={3} marginTop={5} marginX={7} className="bg-white">
          <FormControl isRequired>
            <FormControl.Label>
              <Text className="text-black font-bold" style={styles.customFont}>
                First Name
              </Text>
            </FormControl.Label>
            <Input
              placeholder="Enter your First name"
              value={firstName}
              onChangeText={handleFirstNameChange}
              className="text-black text-[14px]"
              borderColor="blue.900"
              variant="underlined"
            />
          </FormControl>

          <FormControl isRequired>
            <FormControl.Label>
              <Text className="text-black font-bold" style={styles.customFont}>
                Second Name
              </Text>
            </FormControl.Label>
            <Input
              placeholder="Enter your Second name"
              value={secondName}
              onChangeText={handleSecondNameChange}
              className="text-black text-[14px]"
              borderColor="blue.900"
              variant="underlined"
            />
          </FormControl>

          <FormControl isRequired isInvalid={phoneNumberError !== ''}>
            <FormControl.Label>
              <Text className="text-black font-bold" style={styles.customFont}>
                Phone Number
              </Text>
            </FormControl.Label>
            <Input
              placeholder="   eg. 791033018"
              onChangeText={handlePhoneNumberChange}
              value={phoneNumber}
              keyboardType="numeric"
              returnKeyType="done"
              borderColor="blue.900"
              className="text-black text-[14px]"
              variant="underlined"
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
                        <Text className="text-black font-semibold">+254</Text>
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
              <Text className="text-black font-bold" style={styles.customFont}>
                County
              </Text>
            </FormControl.Label>
            <Select
              selectedValue={County}
              accessibilityLabel="Choose county"
              placeholder="Choose county"
              variant="underlined"
              className="text-[14px]"
              borderColor="blue.900"
              _selectedItem={{
                bg: 'teal.600',
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={itemValue => setCounty(itemValue)}>
              {kenyaCounties.map((item, index) => {
                return <Select.Item key={index} label={item} value={item} />;
              })}
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormControl.Label>
              <Text className="text-black font-bold" style={styles.customFont}>
                Town/city/area
              </Text>
            </FormControl.Label>
            <TextArea
              value={message}
              onChangeText={text => setMessage(text)}
              placeholder="For precise information regarding a specific geographical area within the chosen county, please feel free to provide further details."
              borderColor={'blue.900'}
            />
          </FormControl>
        </VStack>
        <View className="w-full  rounded-md absolute bottom-[80px]">
          <TouchableOpacity
            className="bg-blue-900  p-2 mx-6 rounded-md"
            onPress={() => updateUseraddress()}>
            {loading ? (
              <View className=" h-[30px] relative items-center justify-center    left-[118px] top-[-10px] ">
                <LottieView
                  source={require('../../../assets/Evabamar.json')}
                  autoPlay
                  loop
                  width={100}
                  height={50}
                />
              </View>
            ) : (
              <View className="flex flex-row space-x-3 items-center justify-center  ">
                <Text
                  className="text-white font-bold text-[20px]"
                  style={styles.customFont}>
                  Submit
                </Text>
                <FastImage
                  source={icons.submit}
                  className="w-[30px] h-[30px]"
                  resizeMode="contain"
                  tintColor={'white'}
                />
              </View>
            )}
          </TouchableOpacity>
        </View>
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
const kenyaCounties = [
  'Nairobi',
  'Mombasa',
  'Kwale',
  'Kilifi',
  'Tana River',
  'Lamu',
  'Taita Taveta',
  'Garissa',
  'Wajir',
  'Mandera',
  'Marsabit',
  'Isiolo',
  'Meru',
  'Tharaka Nithi',
  'Embu',
  'Kitui',
  'Machakos',
  'Makueni',
  'Nyandarua',
  'Nyeri',
  'Kirinyaga',
  "Murang'a",
  'Kiambu',
  'Turkana',
  'West Pokot',
  'Samburu',
  'Trans Nzoia',
  'Uasin Gishu',
  'Elgeyo-Marakwet',
  'Nandi',
  'Bomet',
  'Kericho',
  'Kakamega',
  'Vihiga',
  'Bungoma',
  'Busia',
  'Siaya',
  'Kisumu',
  'Homa Bay',
  'Migori',
  'Kisii',
  'Nyamira',
  'Nakuru',
  'Narok',
  'Kajiado',
  'Kericho',
  'Laikipia',
];

export default AddShippingAddress;
