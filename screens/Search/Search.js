import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import SearchHeader from './SearchHeader';
import axios from 'axios';
import {base_url} from '../../utils/baseUrl';
import {useFocusEffect} from '@react-navigation/native';
import {Searchbar} from 'react-native-paper';
import {icons} from '../../constants';
import FastImage from 'react-native-fast-image';

const Search = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const uniqueTitles = {};
  let timeoutId;

  const uniqueProducts = [];
  for (const product of products) {
    const titleLowerCase = product.title.toLowerCase(); // Convert title to lowercase
    if (!uniqueTitles[titleLowerCase]) {
      uniqueTitles[titleLowerCase] = true;
      uniqueProducts.push(product);
    }
  }
  function filterUniqueProducts(products) {
    // Initialize an object to track unique titles
    const uniqueTitles = {};

    // Filter out duplicate titles and store only the first occurrence
    const uniqueProducts = [];
    for (const product of products) {
      const titleLowerCase = product.title.toLowerCase(); // Convert title to lowercase
      if (!uniqueTitles[titleLowerCase]) {
        uniqueTitles[titleLowerCase] = true;
        uniqueProducts.push(product);
      }
    }

    setFilteredData(uniqueProducts);
  }

  const getallProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${base_url}products?fields=title,-brand,-colors`,
      );
      setProducts(res.data.data);
      filterUniqueProducts(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };
  const onChangeSearch = query => {
    setSearchQuery(query);
    if (query) {
      const filtered = uniqueProducts.filter(item => {
        return item.title.toLowerCase().includes(query.toLowerCase());
      });
      setFilteredData(filtered);
      setSearching(true);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setSearching(false);
      }, 4000);
    } else {
      setFilteredData(uniqueProducts);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getallProducts();

      return () => {};
    }, []),
  );
  return (
    <View>
      <View className="flex-row items-center bg-white p-2 justify-around">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FastImage
            source={icons.backarrow}
            className="w-[25px] h-[25px]"
            resizeMode="contain"
            tintColor="black"
            alt="image"
          />
        </TouchableOpacity>
        <View className="w-[84%] ">
          <Searchbar
            placeholder={`Search product...`}
            onChangeText={onChangeSearch}
            value={searchQuery}
            loading={searching}
            style={{height: 45}}
            inputStyle={{paddingTop: -8}}
            onFocus={() => setSearching(true)}
            onBlur={() => setSearching(false)}
          />
        </View>
      </View>

      <View>
        <FlatList
          data={filteredData}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => `${item._id}`}
          renderItem={({item}, props) => {
            return (
              <>
                <TouchableOpacity
                  className="bg-white mt-1 rounded-[5px] p-2"
                  onPress={() =>
                    navigation.navigate('CategoryFilter', {
                      id: item?.category[0]._id,
                      title: item.title,
                    })
                  }>
                  <Text className="text-black">{item.title}</Text>
                </TouchableOpacity>
              </>
            );
          }}
          ListHeaderComponent={
            <View className="pl-2 bg-white py-2">
              <Text className="text-black text-[18px] font-bold">
                Suggestions
              </Text>
            </View>
          }
          ListFooterComponent={<></>}
        />
      </View>
    </View>
  );
};

export default Search;
