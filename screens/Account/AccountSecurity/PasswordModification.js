import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {FormControl, Input} from 'native-base';
import Header from '../../checkout/Header';
import {AppVersion, CopyRight} from '../../../components';

const PasswordModification = ({navigation}) => {
  const [oldPassword, newOldPassword] = useState('');

  const handleNameOldPassword = value => {
    newOldPassword(value);
  };

  return (
    <View className="flex-1">
      <Header title="Modify Password" navigation={navigation} />

      <View className="mt-2 p-10">
        <FormControl isRequired>
          <FormControl.Label>
            <Text className="text-black font-bold" style={styles.customFont}>
              Old Password
            </Text>
          </FormControl.Label>
          <Input
            placeholder="     password"
            onChangeText={handleNameOldPassword}
            value={oldPassword}
            autoCapitalize="none"
            returnKeyType="done"
            borderColor="blue.900"
            className="text-black text-[14px]"
            variant="underlined"
          />
        </FormControl>

        <FormControl isRequired>
          <FormControl.Label>
            <Text className="text-black font-bold" style={styles.customFont}>
              New Password
            </Text>
          </FormControl.Label>
          <Input
            placeholder="     password"
            onChangeText={handleNameOldPassword}
            value={oldPassword}
            autoCapitalize="none"
            returnKeyType="done"
            borderColor="blue.900"
            className="text-black text-[14px]"
            variant="underlined"
          />
        </FormControl>

        <FormControl isRequired>
          <FormControl.Label>
            <Text className="text-black font-bold" style={styles.customFont}>
              Confirm New Password
            </Text>
          </FormControl.Label>
          <Input
            placeholder="     password"
            onChangeText={handleNameOldPassword}
            value={oldPassword}
            autoCapitalize="none"
            returnKeyType="done"
            borderColor="blue.900"
            className="text-black text-[14px]"
            variant="underlined"
          />
        </FormControl>

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

export default PasswordModification;
