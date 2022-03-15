import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import AppAddToCart from '../../component/AppAddToCart';
import AppCounterItem from '../../component/AppCounterItem';
import AppTextTitle from '../../component/AppTextTitle';
import {useGetCartRequest} from '../../hooks/Cart/useProductToCart';
import {ICartDataResponse} from '../../interfaces/ICartData';

export default function CartScreen() {
  const cartItemList = useGetCartRequest<ICartDataResponse>().data;
  const navigation = useNavigation<any>();
  console.log('cartItems', cartItemList);
  return (
    <SafeAreaView
      style={{
        paddingLeft: 15,
        paddingRight: 15,
        flex: 1,
        position: 'relative',
      }}>
      <ScrollView>
        <AppTextTitle title="Cart" />

        {/* {cartItemList?.response.cartItems.map((cartItem, index) => {
          return (
            <AppCounterItem
              key={index}
              productName={cartItem.product.name}
              productPrice={cartItem.price}
              productID={cartItem.product.id}
              quantity={cartItem.quantity}
              productImage={cartItem.product.default_image_id.location}
              cartItemID={cartItem.id}
            />
          );
        })} */}
      </ScrollView>
      {/* <View
        style={{
          bottom: 0,
          position: 'absolute',
          left: 0,
          right: 0,
          padding: 10,
        }}>
        <TouchableOpacity
          style={innerStyles.cartContainer}
          onPress={() => {
            navigation.navigate('CheckoutScreen', cartItemList?.response);
          }}>
          <Text style={innerStyles.addToCartText}>Check Out</Text>
        </TouchableOpacity>
      </View> */}
    </SafeAreaView>
  );
}
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
    backgroundColor: '#464447',
    borderRadius: 8,
    color: 'white',
    textAlign: 'center',
  },
});
