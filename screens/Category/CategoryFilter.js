import {
  View,
  Text,
  StyleSheet,
  RefreshControl,
  FlatList,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback, useState} from 'react';

import CategoryHeader from './CategoryHeader';
import axios from 'axios';
import {base_url, base_url2} from '../../utils/baseUrl';
import config from '../../utils/axiosconfig';
import {useFocusEffect} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import {ProductCard} from '../../components';
import {ChevronDownIcon, Menu, Spinner} from 'native-base';
import FilterMenu from './FIlterMenu';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CategoryFilter = ({navigation, route}) => {
  const {id, title} = route.params;
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);
  const [wishlistData, setWishlistData] = useState(null);
  const [limit, setLimit] = useState(1);
  const [loading, setLoading] = useState(false);
  const [end, setEnd] = useState(false);
  const [fastReflesh, setFastReflesh] = useState(1);
  const [currentFilter, setCurrentFilter] = useState('Popular');

  const [refreshing, setRefreshing] = useState(false);

  // Retrieving token
  const getToken = async () => {
    try {
      const res = await AsyncStorage.getItem('token');
      getCart(res);
    } catch (error) {
      console.log('Error retrieving token:', error);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setFastReflesh(fastReflesh + 1);
  }, []);

  const getCart = async token => {
    try {
      const api = axios.create({
        baseURL: base_url,
        headers: config(token).headers,
      });

      const res = await api.get('/cart');
      // console.log(res);
      setData(res.data?.items);
    } catch (err) {
      console.log(err);
    }
  };

  const getProducts = async CategoryId => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${base_url2}/products?category=${CategoryId}`,
      );
      setProducts(res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };
  const getWishlistProducts = async () => {
    try {
      const api = axios.create({
        baseURL: base_url,
        headers: config(token).headers,
      });
      const response = await api.get(
        `${base_url}user/wishlist/`,
        config(token),
      );
      setWishlistData(response.data.wishlist.length);
    } catch (err) {
      console.log(err);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getToken();
      id !== null ? getProducts(id) : null;
    }, [fastReflesh]),
  );

  return (
    <View className="flex-1">
      <CategoryHeader title={title} navigation={navigation} data={data} />

      {/* <View className="bg-white py-1 px-2 relative h-[35px]">
        <TouchableOpacity className="absolute bg-gray-100 p-2 rounded-md left-3">
          <Menu
            shadow={2}
            w="190"
            trigger={triggerProps => {
              return (
                <Pressable
                  accessibilityLabel="More options menu"
                  {...triggerProps}
                  className="flex flex-row space-x-1 items-center">
                  <Text
                    className="text-blue-900 text-[13px]"
                    style={styles.customFont}>
                    {currentFilter}
                  </Text>
                  <ChevronDownIcon />
                </Pressable>
              );
            }}>
            <Menu.Item onPress={() => setCurrentFilter('Popular')}>
              Popular
            </Menu.Item>
            <Menu.Item onPress={() => setCurrentFilter('Latest')}>
              Latest
            </Menu.Item>
            <Menu.Item onPress={() => setCurrentFilter('Price low to high')}>
              Price low to high
            </Menu.Item>
            <Menu.Item onPress={() => setCurrentFilter('Price to high to low')}>
              Price to high to low
            </Menu.Item>
            <Menu.Item onPress={() => setCurrentFilter('Top Sales')}>
              Top Sales
            </Menu.Item>
          </Menu>
        </TouchableOpacity>
      </View> */}

      {id !== null ? (
        <FlatList
          data={products}
          removeClippedSubviews={true}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            paddingHorizontal: 8,
            alignItems: 'center',
          }}
          keyExtractor={item => `${item._id}`}
          // showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['red', 'green', 'blue', 'orange']}
              style={{backgroundColor: 'transparent'}}
              tintColor="transparent" //iso
            />
          }
          renderItem={({item}, props) => {
            return (
              <>
                <View className="bg-white mt-1 rounded-[5px] w-[49.4%]">
                  <ProductCard
                    product={item}
                    navigation={navigation}
                    getWishlistProducts={getWishlistProducts}
                  />
                </View>
              </>
            );
          }}
        />
      ) : (
        <View
          className={`absolute top-[20%] left-[5%]
              `}>
          <LottieView
            source={require('../../assets/noData.json')}
            autoPlay
            loop
            width={350}
            height={350}
          />
          <Text
            className="text-black relative top-[33vh] left-[28vw] text-[12px] mx-3 text-center"
            style={styles.customFont}>
            No content here.
          </Text>
        </View>
      )}

      {loading && (
        <View
          className={`absolute top-[35%] left-[35%]
              `}>
          <LottieView
            source={require('../../assets/loader1.json')}
            autoPlay
            loop
            width={150}
            height={150}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  customFont: {
    fontFamily: 'serif',
  },
});

export default CategoryFilter;
