import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, Text, StyleSheet, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';
import {previousThursday} from 'date-fns';

interface IAppCatalogue {
  cartItemID: number;
  productID: number;
  quantity: number;
  productName: string;
  productPrice: number;
  productImage: string;
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
        <FastImage
          source={{uri: productImage}}
          style={innerStyles.image}
          resizeMode={'contain'}
        />

        <View style={{flexDirection: 'column', marginRight: 150}}>
          <Text style={[innerStyles.text, {marginTop: 10}]}>{productName}</Text>
          <Text style={[innerStyles.text, {marginTop: 10}]}>Quantity: {quantity}</Text>
          <Text style={[innerStyles.text, {marginTop: 10}]}>
           Price per item: PKR {productPrice}
          </Text>
        </View>

<TouchableOpacity onPress={()=>{
  removeItem(cartItemID, productID)
}} style={{marginTop: 30}}><Text>Remove</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const innerStyles = StyleSheet.create({
  catalogueCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 8,
    justifyContent: 'space-between',
    flexWrap: 'wrap',
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
});
