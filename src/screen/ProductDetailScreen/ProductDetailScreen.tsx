import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import AppProductDetailSwiper from '../../component/AppProductDetailSwiper';
import AppSize from '../../component/AppSize';
import AppColor from '../../component/AppColor';
import AppProductCard from '../../component/AppProductCard';
import AppFavourite from '../../component/AppFavourite';
import AppAddToCart from '../../component/AppAddToCart';

function ProductDetailScreen(props: any) {
  const product = props.route.params.productData;
  console.log('rpduct', product);

  return (
    <View style={[innerStyles.mainContainer]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          paddingBottom: 20,
        }}>
        <AppProductDetailSwiper />
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={innerStyles.productName}>{product.name}</Text>
          <AppFavourite />
        </View>
        <Text style={innerStyles.currentPrice}> ${product.amount}</Text>
        {/* <AppColor tittleSize={20} colorSize={23} fontWeight={'700'} />
        <AppSize
          tittleSize={20}
          verticalPadding={15}
          horizontalPadding={8}
          fontWeight={'700'}
        /> */}
        <View style={innerStyles.descriptionContainer}>
          <Text style={innerStyles.descriptionTittle}>Description</Text>
          <Text numberOfLines={2} style={innerStyles.description}>
            {product.description}
          </Text>
          {/* <MaterialIcons
            name="expand-more"
            size={25}
            style={innerStyles.expandMore}
          /> */}
        </View>
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
          navigationScreen={'CartScreen'}
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
  descriptionContainer: {
    marginVertical: 10,
    borderWidth: 2,
    backgroundColor: 'white',
    borderColor: '#FAF9F6',
    shadowColor: '#E2DFD2',
    shadowOpacity: 0.9,
    elevation: 5,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  descriptionTittle: {
    fontWeight: '500',
    fontSize: 19,
    color: '#34283E',
    paddingBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#605A65',
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
