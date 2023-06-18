import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  StyleSheet,
} from 'react-native';
import {icons, images} from '../../constants';
import Recommended from './Recommended';
import {Button} from 'native-base';

const Account = ({navigation}) => {
  return (
    <View className="bg-gray-100">
      <FlatList
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            {/* part 1  */}
            <View
              className="py-4 m-2 rounded-md flex space-y-2"
              style={{backgroundColor: '#e52e04'}}>
              <ImageBackground
                source={images.background_01}
                className="absolute w-full h-full"
              />

              {/* section 1  */}
              <View className="flex flex-row justify-between px-2 items-center">
                <View className="flex flex-row items-center  space-x-4">
                  <Image
                    source={icons.profilePlaceholder}
                    className="w-[55px] h-[55px]"
                    resizeMode="contain"
                    alt="image"
                  />
                  <Text className="text-white">Login/Register</Text>
                </View>
                <TouchableOpacity>
                  <Image
                    source={icons.setting}
                    className="w-[25px] h-[25px]"
                    resizeMode="contain"
                    alt="image"
                    style={{tintColor: 'white'}}
                  />
                </TouchableOpacity>
              </View>

              {/* section 2  */}
              <View className="items-end">
                <TouchableOpacity
                  onPress={() => alert('SwiftMart Coin coming soon!')}
                  className="flex flex-row space-x-1 items-center bg-white w-[180px] rounded-l-full py-1 pl-0.5">
                  <Image
                    source={icons.coin}
                    className="w-[25px] h-[25px]"
                    resizeMode="contain"
                    alt="image"
                  />
                  <Text className="text-[12px] text-red-500">
                    SwiftMart Coin Reward
                  </Text>
                  <Image
                    source={icons.leftchev}
                    className="w-[20px] h-[20px]"
                    resizeMode="contain"
                    alt="image"
                    style={{tintColor: 'orange'}}
                  />
                </TouchableOpacity>
              </View>

              {/* section 3  */}
              <View className="flex flex-row items-center justify-between px-6">
                <View className="items-center">
                  <Text className="text-[17px] font-bold text-white">1</Text>
                  <Text className="text-[13px]  text-white">Wishlist </Text>
                </View>
                <View className="items-center">
                  <Text className="text-[17px] font-bold text-white">5</Text>
                  <Text className="text-[13px]  text-white">Cart</Text>
                </View>
                <View className="items-center">
                  <Text className="text-[17px] font-bold text-white">12</Text>
                  <Text className="text-[13px]  text-white">Orders</Text>
                </View>
              </View>
            </View>

            {/* part 2  */}
            <View className="m-2 px-2 py-4 rounded-md bg-white rounde-md">
              {/* section 1  */}
              <View className="items-center flex flex-row justify-between">
                <Text className="text-black text-[17px]">My Orders</Text>
                <Button
                  colorScheme={'red'}
                  onPress={() => navigation.navigate('MyOrders')}>
                  <Text className="text-white text-[13px]">View All</Text>
                </Button>
              </View>

              {/* section 2  */}
              <View className="flex flex-row justify-between mt-[20px]">
                <TouchableOpacity className="items-center flex space-y-1">
                  <Image
                    source={icons.wallet}
                    className="w-[25px] h-[25px]"
                    style={{tintColor: '#e52e04'}}
                    resizeMode="contain"
                    alt="image"
                  />
                  <Text className="text-black text-[13px]">Unpaid</Text>
                </TouchableOpacity>
                <TouchableOpacity className="items-center flex space-y-1">
                  <Image
                    source={icons.shipping3}
                    className="w-[25px] h-[25px]"
                    style={{tintColor: '#e52e04'}}
                    resizeMode="contain"
                    alt="image"
                  />
                  <View>
                    <Text className="text-black text-[13px] text-center">
                      To be
                    </Text>
                    <Text className="text-black text-[13px]">shipped</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity className="items-center flex space-y-1">
                  <Image
                    source={icons.shipped}
                    className="w-[25px] h-[25px]"
                    style={{tintColor: '#e52e04'}}
                    resizeMode="contain"
                    alt="image"
                  />
                  <Text className="text-black text-[13px]">Shipped</Text>
                </TouchableOpacity>
                <TouchableOpacity className="items-center flex space-y-1">
                  <Image
                    source={icons.review}
                    className="w-[25px] h-[25px]"
                    style={{tintColor: '#e52e04'}}
                    resizeMode="contain"
                    alt="image"
                  />
                  <View>
                    <Text className="text-black text-[13px] text-center">
                      To be{' '}
                    </Text>
                    <Text className="text-black text-[13px]"> Reviewed</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity className="items-center flex space-y-1">
                  <Image
                    source={icons.refund}
                    className="w-[25px] h-[25px]"
                    style={{tintColor: '#e52e04'}}
                    resizeMode="contain"
                    alt="image"
                  />
                  <View>
                    <Text className="text-black text-[13px] text-center">
                      Refund/
                    </Text>
                    <Text className="text-black text-[13px]">Aftersale</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            {/* part 3  */}
            <View className="mx-2 px-2 py-4 rounded-md bg-white rounde-md">
              {/* section 1  */}
              <View>
                <Text className="text-black text-[17px]">My Assets</Text>
              </View>

              {/* section 2  */}
              <View className="flex flex-row justify-between mt-[20px]">
                <View className="items-center flex space-y-2">
                  <Text className="text-red-500 text-[17px]">0</Text>
                  <Text className="text-black text-[13px]">Balance</Text>
                </View>
                <View className="items-center flex space-y-1">
                  <Text className="text-red-500 text-[17px]">0</Text>

                  <Text className="text-black text-[13px]">Vouchers</Text>
                </View>
                <View className="items-center flex space-y-1">
                  <Text className="text-red-500 text-[17px]">0</Text>

                  <Text className="text-black text-[13px]">Coins</Text>
                </View>
              </View>
            </View>

            {/* part 4  */}
            <View className="m-2 px-2 py-4 rounded-md bg-white rounde-md">
              {/* section 1  */}
              <View>
                <Text className="text-black text-[17px]">My Earnings</Text>
              </View>

              {/* section 2  */}
              <View className="flex flex-row justify-between mt-[20px]">
                <TouchableOpacity className="items-center flex space-y-1">
                  <Image
                    source={icons.code}
                    className="w-[25px] h-[25px]"
                    style={{tintColor: '#e52e04'}}
                    resizeMode="contain"
                    alt="image"
                  />
                  <Text className="text-black text-[13px]">
                    Enter invite Code
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity className="items-center flex space-y-1">
                  <Image
                    source={icons.invite}
                    className="w-[25px] h-[25px]"
                    style={{tintColor: '#e52e04'}}
                    resizeMode="contain"
                    alt="image"
                  />
                  <View>
                    <Text className="text-black text-[13px]">
                      Invite & Earn
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity className="items-center flex space-y-1">
                  <Image
                    source={icons.atm}
                    className="w-[25px] h-[25px]"
                    resizeMode="contain"
                    alt="image"
                  />
                  <View>
                    <Text className="text-black text-[13px]">
                      Withdraw to Balance
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            {/* part 5  */}
            <View className="mx-2 px-2 py-4 rounded-md bg-white rounde-md">
              {/* section 1  */}
              <View>
                <Text className="text-black text-[17px]">My Tools</Text>
              </View>

              {/* section 2  */}
              <View className="flex flex-row justify-between mt-[20px]">
                <TouchableOpacity className="items-center flex space-y-1">
                  <Image
                    source={icons.addressbook}
                    className="w-[25px] h-[25px]"
                    style={{tintColor: '#e52e04'}}
                    resizeMode="contain"
                    alt="image"
                  />
                  <View>
                    <Text className="text-black text-[13px]">Address</Text>
                    <Text className="text-black text-[13px] text-center">
                      Book
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity className="items-center flex space-y-1">
                  <Image
                    source={icons.customerservice}
                    className="w-[25px] h-[25px]"
                    style={{tintColor: 'green'}}
                    resizeMode="contain"
                    alt="image"
                  />
                  <View>
                    <Text className="text-black text-[13px]">Customer</Text>
                    <Text className="text-black text-[13px] text-center">
                      Service
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity className="items-center flex space-y-1">
                  <Image
                    source={icons.faq}
                    className="w-[25px] h-[25px]"
                    resizeMode="contain"
                    alt="image"
                  />
                  <View>
                    <Text className="text-black text-[13px]">FAQ's</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity className="items-center flex space-y-1">
                  <Image
                    source={icons.suggestion}
                    className="w-[25px] h-[25px]"
                    style={{tintColor: 'green'}}
                    resizeMode="contain"
                    alt="image"
                  />
                  <Text className="text-black text-[13px]">Suggestion</Text>
                </TouchableOpacity>
              </View>
              {/* section 3  */}
              <View className="flex flex-row justify-between mt-[20px]">
                <TouchableOpacity className="items-center flex space-y-1">
                  <Image
                    source={icons.setting2}
                    className="w-[25px] h-[25px]"
                    style={{tintColor: '#e52e04'}}
                    resizeMode="contain"
                    alt="image"
                  />
                  <View>
                    <Text className="text-black text-[13px]">Settings</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity className="items-center flex space-y-1">
                  <Image
                    source={icons.language}
                    className="w-[25px] h-[25px]"
                    style={{tintColor: '#e52e04'}}
                    resizeMode="contain"
                    alt="image"
                  />
                  <View>
                    <Text className="text-black text-[13px]">Language</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity className="items-center flex space-y-1">
                  <Image
                    source={icons.currency}
                    className="w-[25px] h-[25px]"
                    style={{tintColor: '#e52e04'}}
                    resizeMode="contain"
                    alt="image"
                  />
                  <View>
                    <Text className="text-black text-[13px]">Currency</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity className="items-center flex space-y-1">
                  <Image
                    source={icons.notification}
                    className="w-[25px] h-[25px]"
                    style={{tintColor: '#e52e04'}}
                    resizeMode="contain"
                    alt="image"
                  />
                  <Text className="text-black text-[13px]">Notifications</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        }
        ListFooterComponent={
          <>
            <View>
              <Text
                className="text-black text-[17px] text-center font-bold mt-1"
                style={styles.customFont}>
                Recommendations For You
              </Text>
              <Recommended navigation={navigation} />
            </View>
          </>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  customFont: {
    fontFamily: 'serif',
  },
  customColor: {
    color: '#e52e04',
  },
});

export default Account;
