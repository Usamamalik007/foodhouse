import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {useAddProductToCartRequest} from '../hooks/Cart/useProductToCart';
import {SnackbarError, SnackbarSuccess} from '../utils/SnackBar';
import { configureStore } from '@reduxjs/toolkit';

interface IAddProductToCartRequest {
  productId: string;
  quantity: number;
  restaurantId: string
}

function AppAddToCart(props: any) {
  const navigation = useNavigation<any>();

  const onSubmit = (values: IAddProductToCartRequest) => {
    console.log(JSON.stringify(values))
    if (values.productId) {
      console.log('S', typeof values.productId.toString());
      addItemToCart.mutate({
        // cart_id: 
        restaurant_id: values.restaurantId,
        food_item_id: values.productId,
        amount: values.quantity,
      });
    } else {
      if (props.navigationScreen) {
        navigation.navigate(props.navigationScreen);
      }
    }
  };

  const addItemToCart = useAddProductToCartRequest({
    async onSuccess(res) {
      if (res.statusCode == 200){
        SnackbarSuccess(res.message);
        if (props.navigationScreen) {
          navigation.navigate(props.navigationScreen);
        }
      }
      else{
        SnackbarError(res.message);
        if (props.navigationScreen) {
          navigation.navigate(props.navigationScreen);
        }

      }
      console.log('response is', res);

    },
    onError(err) {
      SnackbarError(err.message);
    },
  });
  return (
    <TouchableOpacity
      style={innerStyles.cartContainer}
      onPress={() => {
        onSubmit({productId: props.productID, quantity: props.quantity, restaurantId: props.restaurantId});
      }}>
      <Text style={innerStyles.addToCartText}>{props.title}</Text>
    </TouchableOpacity>
  );
}

export default AppAddToCart;

const innerStyles = StyleSheet.create({
  cartContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 14,
    marginBottom: 8,
  },
  addToCartText: {
    fontWeight: '400',
    fontSize: 17,
    width: '100%',
    paddingVertical: 13,
    backgroundColor: '#429b44',
    borderRadius: 8,
    color: 'white',
    textAlign: 'center',
  },
});
