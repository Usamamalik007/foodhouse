import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, Text, StyleSheet, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';
import {previousThursday} from 'date-fns';
import {useUpdateProductFromCartRequest} from '../hooks/Cart/useProductToCart';

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
}: IAppCatalogue) {
  const navigation = useNavigation<any>();
  const [quantityCounter, setQuantityCounter] = useState(quantity);

  const updateCounter = useUpdateProductFromCartRequest({
    async onSuccess(res) {
      console.log('response is', res);
    },
    onError(err) {},
  });

  useEffect(() => {
    updateCounter.mutate({
      cartItemId: cartItemID.toString(),
      quantity: quantityCounter,
    });
  }, [quantityCounter]);
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
          <Text style={[innerStyles.text, {marginTop: 10}]}>
            ${productPrice}
          </Text>
        </View>

        <View style={{flexDirection: 'column', marginRight: 20, marginTop: 10}}>
          <TouchableOpacity
            onPress={async () => {
              await setQuantityCounter(pre => {
                return pre + 1;
              });
            }}>
            <Ionicons name={'add-circle-outline'} size={20} />
          </TouchableOpacity>
          <View style={{marginTop: 3, marginBottom: 3, marginLeft: 5}}>
            <Text>{quantityCounter}</Text>
          </View>

          <TouchableOpacity
            onPress={async () => {
              setQuantityCounter(prev => {
                return prev - 1 < 1 ? prev : prev - 1;
              });
            }}>
            <Ionicons name={'remove-circle-outline'} size={20} />
          </TouchableOpacity>
        </View>
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
