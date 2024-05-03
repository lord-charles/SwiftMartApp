import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Header from '../../checkout/Header';
import CountryPicker, {FlagButton} from 'react-native-country-picker-modal';
import FastImage from 'react-native-fast-image';
import {FormControl, Input} from 'native-base';
import {icons} from '../../../constants';
import {Image} from 'react-native';
import {AppVersion, CopyRight} from '../../../components';

const PhoneModification = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [countryCode, setCountryCode] = useState('US');
  const [otpCode, setOtpCode] = useState('');

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

  const handleChangeCode = value => {
    setOtpCode(value);
  };

  return (
    <View className="flex-1 bg-white">
      <Header title="Modify Phone Number" navigation={navigation} />
      <View className="bg-gray-100 px-2 py-3 gap-2">
        <Text className="text-gray-400 text-[12px]">Current Phone Number</Text>
        <Text className="text-black font-semibold">0740315545</Text>
      </View>

      {/* phoneNumber  */}
      <View className="p-4">
        <FormControl isRequired isInvalid={phoneNumberError !== ''}>
          <FormControl.Label>
            <Text className="text-black font-bold" style={styles.customFont}>
              New Phone Number
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

        {/* code  */}

        <View className="mt-2">
          <FormControl isRequired>
            <FormControl.Label>
              <Text className="text-black font-bold" style={styles.customFont}>
                Code
              </Text>
            </FormControl.Label>
            <Input
              placeholder="     Enter SMS code"
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

export default PhoneModification;
