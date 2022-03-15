import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {useAddProductToCartRequest} from '../hooks/Cart/useProductToCart';
import {SnackbarError, SnackbarSuccess} from '../utils/SnackBar';

interface IAddProductToCartRequest {
  productId: string;
  quantity: number;
}

function AppAddToCart(props: any) {
  const navigation = useNavigation<any>();

  const onSubmit = (values: IAddProductToCartRequest) => {
    if (values.productId) {
      console.log('S', typeof values.productId.toString());
      addItemToCart.mutate({
        productId: values.productId,
        quantity: 1,
      });
    } else {
      if (props.navigationScreen) {
        navigation.navigate(props.navigationScreen);
      }
    }
  };

  const addItemToCart = useAddProductToCartRequest({
    async onSuccess(res) {
      console.log('response is', res);
      SnackbarSuccess(res.message);
      if (props.navigationScreen) {
        navigation.navigate(props.navigationScreen);
      }
    },
    onError(err) {
      SnackbarError(err.message);
    },
  });
  return (
    <TouchableOpacity
      style={innerStyles.cartContainer}
      onPress={() => {
        // onSubmit({productId: props.productID, quantity: 1});
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
