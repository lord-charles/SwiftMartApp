import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {icons} from '../../constants';
import axios from 'axios';
import {base_url2} from '../../utils/baseUrl';
import config from '../../utils/axiosconfig';
import {useToast} from 'native-base';
import {useFocusEffect} from '@react-navigation/native';
import {Slider, Slider2} from '../../components';
import CategoryCard from './CategoryCard';
import {Categories} from '../../utils/data';
import LottieView from 'lottie-react-native';

const Category = ({navigation}) => {
  const toast = useToast();
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('');
  const [activeSubCategory, setActiveSubCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const getCategories = async () => {
    setLoading2(true);
    try {
      const res = await axios.get(`${base_url2}/advancedCategory`);
      console.log(res.data);
      setCategories(res.data.advancedCategories);
      getFeaturedSubCategories(res.data.advancedCategories[0]._id);
      setActiveCategory(res.data.advancedCategories[0]._id);
      setLoading2(false);

      if (res.data.err == 'Not Authorized token expired, Please Login again') {
        toast.show(`Please login to continue`, {
          type: 'danger',
          placement: 'top',
          duration: 3000,
          offset: 30,
          animationType: 'zoom-in',
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getFeaturedSubCategories = async id => {
    setLoading(true);
    try {
      const res = await axios.get(`${base_url2}/advancedCategory/sub/${id}`);
      setActiveSubCategory(res.data.advancedCategory);
      setLoading(false);

      if (res.data.err == 'Not Authorized token expired, Please Login again') {
        toast.show(`Please login to continue`, {
          type: 'danger',
          placement: 'top',
          duration: 3000,
          offset: 30,
          animationType: 'zoom-in',
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getCategories();
    }, []),
  );
  return (
    <>
      {loading2 ? (
        <View className="bg-gray-100 h-full w-screen relative">
          <View
            className={`absolute top-[28%] left-[34%]
          `}>
            <LottieView
              source={require('../../assets/loader1.json')}
              autoPlay
              loop
              width={150}
              height={150}
            />
          </View>
        </View>
      ) : (
        <View className="bg-gray-100 flex-1">
          <View className="bg-white h-[45px] justify-center z-[999]">
            <TouchableOpacity
              className="flex flex-row space-x-3 items-center bg-gray-100 mx-3 pl-4 py-2 rounded-full"
              onPress={() => navigation.navigate('Search')}>
              <FastImage
                source={icons.search}
                alt="image"
                className="w-[20px] h-[20px]"
                resizeMode="contain"
              />
              <Text className="text-black">Search...</Text>
            </TouchableOpacity>
          </View>

          <View className="flex flex-row h-screen bg-gray-100 ">
            {/* section 1 */}
            <ScrollView
              showsVerticalScrollIndicator={false}
              className="w-[18%] flex flex-col space-y-2 py-2 bg-white relative top-[-7.8px]">
              {categories.map((category, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    className={`items-center py-[5px] ${
                      category._id === activeCategory ? 'bg-gray-100' : null
                    }`}
                    onPress={() => {
                      setActiveCategory(category._id),
                        getFeaturedSubCategories(category._id);
                    }}>
                    <FastImage
                      source={{uri: category.icon}}
                      alt="image"
                      className="w-[40px] h-[40px]"
                      resizeMode="contain"
                    />
                    <Text
                      className="text-black text-[10px] mx-4 text-center"
                      style={styles.customFont}>
                      {category.title}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {/* section 2 */}
            <View className="w-[82%] bg-gray-100">
              <Slider2 />

              {activeSubCategory.length === 0 ? (
                <View className=" justify-center items-center">
                  <LottieView
                    source={require('../../assets/emptycart.json')}
                    autoPlay
                    loop
                    width={250}
                    height={250}
                    className="relative top-[0vh]"
                  />
                  <Text
                    className="text-black relative top-[-1vh] text-[12px] mx-3 text-center"
                    style={styles.customFont}>
                    No content here.
                  </Text>
                </View>
              ) : (
                <View className="mt-3">
                  <FlatList
                    data={activeSubCategory}
                    removeClippedSubviews={true}
                    numColumns={3}
                    showsVerticalScrollIndicator={false}
                    columnWrapperStyle={{
                      paddingVertical: 2,
                      paddingHorizontal: 4,
                      justifyContent: 'space-between',
                    }}
                    keyExtractor={item => `${item._id}`}
                    renderItem={({item}, props) => {
                      return (
                        <>
                          <View className="bg-white mt-1 rounded-[5px] w-[32%]">
                            <CategoryCard
                              product={item}
                              navigation={navigation}
                              setLoading={setLoading}
                            />
                          </View>
                        </>
                      );
                    }}
                  />
                </View>
              )}
            </View>
          </View>

          {loading ? (
            <View
              className={`absolute top-[38%] left-[34%]
          `}>
              <LottieView
                source={require('../../assets/loader1.json')}
                autoPlay
                loop
                width={150}
                height={150}
              />
            </View>
          ) : null}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  customFont: {
    fontFamily: 'serif',
  },
});

export default Category;
