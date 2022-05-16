import React, {useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../assets/css/style';
import FastImage from 'react-native-fast-image';
import {useForm} from 'react-hook-form';

import {Product} from '../interfaces/IProductData';
import {useAddFavourite} from '../hooks/Favourites/useAddFavourite';
import {IAddFavouriteRequest} from '../interfaces/IFavouriteData';
import {useAppSelector} from '../store/hooks';
import {useRemoveFavourite} from '../hooks/Favourites/useRemoveFavourite';
import {SnackbarSuccess} from '../utils/SnackBar';
import {CalculatePercentage} from '../utils/CalculatePercentage';

function AppProductCard(productData: Product) {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();
  console.log(
    `productData?.is_wishlist onSubmitFavourite`,
    productData?.is_wishlist, productData.image
  );
  const navigation = useNavigation<any>();
  const [favourite, setFavourite] = useState<boolean>(true);

  const onSubmitFavourite = handleSubmit(() => {
    console.log(`productData?.is_wishlist`, productData?.is_wishlist);
    if (productData?.is_wishlist == false) {
      addFavourite.mutate({
        food_item_id: productData?.id.toString(),
      });
    } else if (productData?.is_wishlist == true) {
      removeFavourite.mutate({
        food_item_id: productData?.id,
      });
    }
  });
  const addFavourite = useAddFavourite({
    onSuccess() {
      setFavourite(!favourite);
      SnackbarSuccess('Successfully Added');
    },
    onError() {},
  });

  const removeFavourite = useRemoveFavourite({
    onSuccess() {
      setFavourite(!favourite);
    },
    onError() {},
  });

  return (
    <View style={innerStyles.mainContainer}>
      <View>
        <View style={innerStyles.submainContainer}>
          
          <FastImage
            source={{uri: "http://ec2-44-201-171-84.compute-1.amazonaws.com:4005" + productData.image}}
            style={innerStyles.image}
            resizeMode={'cover'}
          />
          <View style={styles.favourite}>
 
            <TouchableOpacity
            onPress={onSubmitFavourite}
            >
              <Ionicons
                name={
                  productData.is_wishlist == true ? 'heart' : 'heart-outline'
                }
                size={25}
                color={productData.is_wishlist == true ? '#CE3E3E' : '#373737' }
              />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={innerStyles.productDetailContainer}
          onPress={() =>
            navigation.navigate('ProductDetailScreen', {
              productData: productData,
            })
          }>
          <Text style={innerStyles.productName}>{productData.name}</Text>


        </TouchableOpacity>
      </View>
    </View>
  );
}

export default AppProductCard;

const innerStyles = StyleSheet.create({
  mainContainer: {
    margin: 5,
    width: Dimensions.get('screen').width/2-30,
    paddingBottom: 8,
    borderWidth: 2,
    backgroundColor: 'white',
    borderColor: '#FAF9F6',
    shadowColor: '#E2DFD2',
    shadowOpacity: 0.9,
    elevation: 5,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    borderRadius: 8,
  },
  image: {
    height: 150,
    width: '100%',
    alignSelf: 'center',
    marginBottom: 65,
  },
  submainContainer: {
    position: 'relative',
  },
  productDetailContainer: {
    marginHorizontal: 7,
    marginTop: -50,
  },
  productName: {
    fontWeight: '600',
    fontSize: 13,
    color: 'black',
    letterSpacing: 0.25,
  },
  priceContainer: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  currentPrice: {
    color: 'red',
    marginRight: 10,
    lineHeight: 19,
    fontSize: 16,
  },
  currentPriceWithoutDiscount: {
    color: 'red',
    marginRight: 10,
    lineHeight: 19,
    fontSize: 16,
  },
  previousPrice: {
    color: 'black',
    lineHeight: 19,
    fontSize: 16,
    textDecorationLine: 'line-through',
  },
});
