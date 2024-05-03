import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {ChevronDownIcon, Menu} from 'native-base';

const FilterMenu = () => {
  return (
    <View className="bg-white p-1">
      <Menu
        shadow={2}
        w="190"
        trigger={triggerProps => {
          return (
            <Pressable
              accessibilityLabel="More options menu"
              {...triggerProps}
              className="flex flex-row space-x-1">
              <Text
                className="text-blue-900 text-[15px]"
                style={styles.customFont}>
                Popular
              </Text>
              <ChevronDownIcon />
            </Pressable>
          );
        }}>
        <Menu.Item>Latest</Menu.Item>
        <Menu.Item>Price low to high</Menu.Item>
        <Menu.Item>Price to high to low</Menu.Item>
        <Menu.Item>Poppins</Menu.Item>
        <Menu.Item>Top Sales</Menu.Item>
      </Menu>
    </View>
  );
};

export default FilterMenu;
