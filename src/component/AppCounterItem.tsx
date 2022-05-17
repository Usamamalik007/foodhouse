import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, Text, StyleSheet, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';
import {previousThursday} from 'date-fns';
import { appColors } from "../../src/utils/colors";

interface IAppCatalogue {
  cartItemID: number;
  productID: number;
  quantity: number;
  productName: string;
  productPrice: number;
  productImage: string;
  removeItem: (cart_id: number, food_item_id: number) => Promise<void>;
}

export default function AppCounterItem({
  cartItemID,
  productName,
  productPrice,
  productImage,
  productID,
  quantity,
  removeItem
}: IAppCatalogue) {
  const navigation = useNavigation<any>();
  const [quantityCounter, setQuantityCounter] = useState(quantity);
  return (
    
    <View>
      <View style={innerStyles.catalogueCard}>
      <View style={{flexDirection: 'row',alignItems: 'flex-end',
    justifyContent: 'flex-end'}}>
      <Ionicons  onPress={()=>{
  removeItem(cartItemID, productID)
}}  name="close-outline" size={30} color={appColors.darkGrey} />
</View>
      <View style={{flexDirection: 'row',alignItems: 'center',
    justifyContent: 'flex-start'}}>
        <FastImage
          source={{uri: productImage}}
          style={innerStyles.image}
          resizeMode={'contain'}
        />
          <Text style={[innerStyles.normalText, {padding: 15}]} >{productName} x {quantity}</Text>
          <Text style={[innerStyles.normalText, {padding: 15}]} >
           PKR {productPrice*quantity}
          </Text>
          </View>
      </View>

    </View>
  );
}

const innerStyles = StyleSheet.create({
  catalogueCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 8,
  },
  image: {
    height: 88,
    width: 88,
  },
  imageCounter: {
    height: 18,
    width: 8,
  },
  text: {
    fontFamily: 'Gotham',
    fontSize: 18,
    fontWeight: '500',
  },
  textPrice: {
    fontFamily: 'Gotham',
    fontSize: 16,
    fontWeight: '500',
  },
  normalText: {
    color: '#070A0D',
    fontSize: 15,
    marginVertical: 3,
  },
});
