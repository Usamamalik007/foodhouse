import React, { useState} from 'react';

import {StyleSheet, Text, View, Image, TextInput} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


import AppProductDetailSwiper from '../../component/AppProductDetailSwiper';
import AppSize from '../../component/AppSize';
import AppColor from '../../component/AppColor';
import AppProductCard from '../../component/AppProductCard';
import AppFavourite from '../../component/AppFavourite';
import {appColors} from '../../utils/colors';
import AppAddToCart from '../../component/AppAddToCart';

function ProductDetailScreen(props: any) {
  console.log(props)
  let base_url = "http://ec2-44-201-171-84.compute-1.amazonaws.com:4005";
  const product = props.route.params.props;
  const imagePath: any = base_url+ product.image;
  console.log(imagePath)
 
  const [quantity, setQuantity]= useState(0);


  console.log('rpduct', product);
  console.log(quantity)


  return (
    <View style={[innerStyles.mainContainer]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          paddingBottom: 20,
        }}>
          <Image
            source={{
              uri:
                imagePath && imagePath.length > 0
                  ? imagePath
                  : "https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg",
            }}
            style={innerStyles.image}
            resizeMode={"cover"}
          />
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={innerStyles.productName}>{product.name}</Text>
          <AppFavourite />
        </View>
        <Text style={innerStyles.currentPrice}>PKR {product.amount}</Text>
        <Text style={innerStyles.productName}>Select amount</Text>
        <View
      style={[
        {
          flexDirection: 'row',
          height: 40,
          borderWidth: 1,
          marginVertical: 8,
          borderColor: appColors.inputBorder,
          alignItems: 'center',
          borderRadius:5
        },
      ]}>
      <TextInput
        placeholderTextColor="#B9B9B9"
        keyboardType="numeric"
        onChangeText={(text: any)=> {setQuantity(text)}}
        style={[
          {
            fontSize: 18,
            padding: 10,
            flex: 1,
            fontFamily: 'OpenSans-Regular',
            color: '#000000',
          }
        ]}
      />
    </View>
        <TextInput 
   style={[
    {
      fontSize: 18,
      padding: 10,
      flex: 1,
      fontFamily: 'OpenSans-Regular',
      color: '#000000',
    }
  ]}
   keyboardType='numeric'
   onChangeText={(text: any)=> {setQuantity(text)}}
   maxLength={10}  //setting limit of input
/>
        {/* <AppColor tittleSize={20} colorSize={23} fontWeight={'700'} />
        <AppSize
          tittleSize={20}
          verticalPadding={15}
          horizontalPadding={8}
          fontWeight={'700'}
        /> */}
        {/* <View>
          <Text style={innerStyles.relatedProducts}>Related Products</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <AppProductCard />
              <AppProductCard />
            </View>
          </ScrollView>
        </View> */}
        <AppAddToCart
          title={'Add to cart'}
          productID={product.id.toString()}
          restaurantId={product.restaurantId}
          navigationScreen={'HomeMenus'}
          quantity={quantity}
        />
      </ScrollView>
    </View>
  );
}

export default ProductDetailScreen;

const innerStyles = StyleSheet.create({
  mainContainer: {
    marginHorizontal: 10,
    borderRadius: 8,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
    width: '100%',
  },
  image: {
    height: 230,
    width: '100%',
    alignSelf: 'center',
    marginBottom: 65,
  },
  submainContainer: {
    position: 'relative',
  },
  productDetailContainer: {
    marginLeft: 10,
    marginTop: -50,
  },
  productName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#34283E',
    marginVertical: 5,
  },
  priceContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  currentPrice: {
    fontWeight: '700',
    color: '#514C7B',
    marginRight: 10,
    lineHeight: 19,
    fontSize: 18,
  },
  previousPrice: {
    color: 'black',
    lineHeight: 19,
    fontSize: 16,
    textDecorationLine: 'line-through',
  },
  expandMore: {
    alignSelf: 'center',
    // marginVertical: 5,
  },
  relatedProducts: {
    fontSize: 19,
    fontWeight: '500',
    color: '#34283E',
    marginBottom: 10,
  },
});
