import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

const ColorComponent = ({color, setSelectedColor, selectedColor}) => {
  return (
    <View>
      <TouchableOpacity
        className={`w-[74px]  h-[50px] rounded-md border-2 items-center justify-center`}
        style={{
          borderColor: color.code,
          backgroundColor: selectedColor == color.name ? 'orange' : 'white',
        }}
        onPress={() => {
          setSelectedColor(color.name);
        }}>
        <Text className="text-black capitalize"> {color.name}</Text>
        <Text className="text-[11px] text-black">
          in Stock:{color.availability}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ColorComponent;
