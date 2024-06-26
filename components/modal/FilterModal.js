import React, {useEffect, useRef, useState} from 'react';
import {Dimensions} from 'react-native';
import {
  View,
  Text,
  Animated,
  TouchableWithoutFeedback,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {icons} from '../../constants';
import FastImage from 'react-native-fast-image';
import ColorComponent from '../Colors';
import {FlatList, Input, TextArea} from 'native-base';
import {useToast} from 'react-native-toast-notifications';
import axios from 'axios';
import {base_url} from '../../utils/baseUrl';
import config from '../../utils/axiosconfig';
import LottieView from 'lottie-react-native';

const FilterModal = ({
  isVisible,
  onClose,
  product,
  getCart,
  isOrder,
  navigation,
  token,
}) => {
  const {height} = Dimensions.get('window');
  const [selectedColor, setSelectedColor] = useState(null);
  const [showFilterModal, setShowFilterModal] = useState(isVisible);
  const [value, setValue] = useState(1);
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const [message, setMessage] = useState('');

  const handleMessageChange = text => {
    setMessage(text);
  };

  const cartData = {
    productId: product._id,
    quantity: value,
    color: 'null',
    message,
  };

  const addToCart = async () => {
    try {
      const api = axios.create({
        baseURL: base_url,
        headers: config(token).headers,
      });
      setLoading(true);

      const res = await api.post('/cart', cartData);
      if (res.data.message === 'Item added to cart successfully') {
        setLoading(false);
        toast.show(`${value} ${product.title} added to cart`, {
          type: 'success',
          placement: 'top',
          duration: 2000,
          offset: 30,
          animationType: 'zoom-in',
        });
        getCart();
        setTimeout(() => {
          onClose();
        }, 2000);
      }
      if (res.data.err === 'Not Authorized token expired, Please Login again') {
        setLoading(false);
        toast.show('Please login to continue', {
          type: 'danger',
          placement: 'top',
          duration: 3000,
          offset: 30,
          animationType: 'zoom-in',
        });
      }
    } catch (err) {
      if (err.response.data.message === 'Requested quantity not available') {
        setLoading(false);
        toast.show('Inventory shortage!', {
          type: 'danger',
          placement: 'top',
          duration: 2000,
          offset: 30,
          animationType: 'zoom-in',
        });
      }
      console.log(err);
    }
  };

  const orderNow = async () => {
    setLoading(true);
    try {
      const api = axios.create({
        baseURL: base_url,
        headers: config(token).headers,
      });

      const res = await api.post(
        'user/cart/addtocart/',
        {
          cart: [{id: product._id, count: value, color: selectedColor}],
        },
        config(token),
      );
      if (res.data.err === 'Not Authorized token expired, Please Login again') {
        return (
          setLoading(false),
          toast.show('Please login to continue', {
            type: 'danger',
            placement: 'top',
            duration: 3000,
            offset: 30,
            animationType: 'zoom-in',
          }),
          navigation.navigate('SignIn')
        );
      }

      toast.show('Sucess', {
        type: 'success',
        placement: 'top',
        duration: 2000,
        offset: 30,
        animationType: 'slide-in',
      }),
        onClose(),
        setLoading(false),
        navigation.navigate('Checkout');
    } catch (error) {
      setLoading(false);
      toast.show('Something went wrong, retry', {
        type: 'danger',
        placement: 'top',
        duration: 2000,
        offset: 30,
        animationType: 'slide-in',
      });
    }
  };

  const handleCartData = async () => {
    isOrder ? orderNow() : addToCart();
  };

  const handleMinusClick = () => {
    if (value > 1) {
      setValue(value - 1);
    }
  };

  const handlePlusClick = () => {
    setValue(value + 1);
  };

  //animation
  const modalAnimatedValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (showFilterModal) {
      Animated.timing(modalAnimatedValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(modalAnimatedValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => onClose());
    }
  }, [showFilterModal]);

  const modalY = modalAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [height + 100, height - 570],
  });

  return (
    <Modal transparent={true} visible={isVisible} animationType="fade">
      <View
        className="bg-white flex-1"
        style={{backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
        {/* transparent background */}
        <TouchableWithoutFeedback onPress={() => setShowFilterModal(false)}>
          <View className="absolute top-0 left-0 right-0 bottom-0 " />
        </TouchableWithoutFeedback>
        {/* animated pushup */}
        <Animated.View
          style={{
            position: 'absolute',
            left: 0,
            top: modalY,
            width: '100%',
            height: '80%',
            padding: 8,
            backgroundColor: 'white',
          }}>
          {/* loading animation  */}
          {loading ? (
            <View
              className={`absolute top-[38%] left-[38%]
          `}>
              <LottieView
                source={require('../../assets/loader1.json')}
                autoPlay
                loop
                width={100}
                height={100}
              />
            </View>
          ) : null}

          <View>
            <View className="px-1">
              <View className="flex flex-row justify-between">
                <View className="flex flex-row space-x-4 items-center relative">
                  <FastImage
                    source={{uri: product.images[0].url}}
                    className="w-[80px] h-[80px]"
                    resizeMode="contain"
                  />
                  {product.quantity < 1 ? (
                    <Text className="text-black absolute top-0 right-[0px] bg-gray-200 p-1 rounded-full text-[12px]">
                      out of stock
                    </Text>
                  ) : null}

                  <View className="">
                    <Text className="text-black text-[18px] font-bold">
                      KSh {product?.price.toLocaleString()}
                    </Text>
                    <Text className="text-black text-[12px]">
                      in Stock {product.quantity}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  className="border h-[25px] w-[25px] items-center justify-center rounded-full border-gray-400"
                  onPress={() => onClose()}>
                  <FastImage
                    source={icons.cross}
                    className="w-[20px] h-[20px]"
                    resizeMode="contain"
                    tintColor={'gray'}
                  />
                </TouchableOpacity>
              </View>

              {/* colors  */}
              <View className="mt-[15px]">
                <Text className="text-white text-[17px]">Colors</Text>
                <View className="mt-[10px]">
                  <FlatList
                    data={product.colors}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={<View className="w-2" />}
                    keyExtractor={item => `${item._id}`}
                    renderItem={({item}, props) => {
                      return (
                        <>
                          <View className=" rounded-md">
                            <ColorComponent
                              color={item}
                              setSelectedColor={setSelectedColor}
                              selectedColor={selectedColor}
                            />
                          </View>
                        </>
                      );
                    }}
                  />
                </View>
              </View>

              <View className="justify-center items-center px-5">
                <View className="w-full">
                  <Text className="font-bold text-black text-start py-1 text-[18px]">
                    Product specifications{' '}
                  </Text>
                  <TextArea
                    shadow={2}
                    h={20}
                    placeholder="Please describe your preferred product specifications or any specific features you desire."
                    value={message}
                    onChangeText={handleMessageChange}
                    _light={{
                      placeholderTextColor: 'trueGray.500',
                      bg: 'coolGray.100',
                      _hover: {
                        bg: 'coolGray.200',
                      },
                      _focus: {
                        bg: 'coolGray.200:alpha.70',
                      },
                    }}
                    _dark={{
                      bg: 'coolGray.800',
                      _hover: {
                        bg: 'coolGray.900',
                      },
                      _focus: {
                        bg: 'coolGray.900:alpha.70',
                      },
                    }}
                  />
                </View>
              </View>

              {/* quantity table */}
              <View className="mt-[10px] px-5">
                <View>
                  <Text className="font-bold text-black text-start py-1 text-[18px]">
                    Quantity
                  </Text>
                  <Input
                    w={{
                      base: '37%',
                      md: '25%',
                    }}
                    h={{
                      base: '35%',
                      md: '25%',
                    }}
                    className="text-black text-[14px]"
                    value={value.toString()} // convert the value to a string before passing it to the Input component
                    colorScheme={'gray'}
                    InputLeftElement={
                      <TouchableOpacity
                        className=" h-full w-[37px] items-center justify-center border-r border-gray-300"
                        onPress={handleMinusClick} // call the handleMinusClick function when the minus button is clicked
                      >
                        <FastImage
                          source={icons.minus}
                          resizeMode="contain"
                          className="w-[15px] h-[15px]"
                          tintColor={'black'}
                        />
                      </TouchableOpacity>
                    }
                    InputRightElement={
                      <TouchableOpacity
                        className="h-full w-[37px] items-center justify-center border-l border-gray-300"
                        onPress={handlePlusClick} // call the handlePlusClick function when the plus button is clicked
                      >
                        <FastImage
                          source={icons.plus}
                          resizeMode="contain"
                          className="w-[15px] h-[15px]"
                          tintColor={'black'}
                        />
                      </TouchableOpacity>
                    }
                  />
                </View>
              </View>
            </View>
            {product.quantity > 0 ? (
              <TouchableOpacity
                className="absolute top-[460px] w-full  h-[50px] rounded-full items-center justify-center"
                style={{backgroundColor: '#020a3b'}}
                onPress={() => handleCartData()}>
                <Text className="text-white text-[17px] font-bold">OK</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                className="absolute top-[460px] w-full  h-[50px] bg-green-500 rounded-full items-center justify-center"
                onPress={() => {
                  toast.show(`Sucess, we shall contact you soon!`, {
                    type: 'success',
                    placement: 'top',
                    duration: 4000,
                    offset: 30,
                    animationType: 'zoom-in',
                  });
                  setTimeout(() => {
                    onClose();
                  }, 2000);
                }}>
                <Text className="text-white text-[17px] font-bold">
                  Notify me on arrival
                </Text>
              </TouchableOpacity>
            )}
          </View>
          {/* apply filters button  */}
        </Animated.View>
      </View>
    </Modal>
  );
};

export default FilterModal;
