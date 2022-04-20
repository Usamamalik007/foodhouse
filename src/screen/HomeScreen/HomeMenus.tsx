import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, ScrollView} from 'react-native';

import styles from '../../assets/css/style';
import AppCaraosaul from '../../component/AppCaraosaul';
import AppOurFavoritesList from '../../component/AppOurFavoritesList';
import AppProductCard from '../../component/AppProductCard';
import {useGetRestaurantMenu} from '../../hooks/Menu/useGetRestaurantMenu';
import {useGetAllFeaturedProduct} from '../../hooks/Product/useGetFeaturedProduct';
import {IFeatureProductResponse} from '../../interfaces/IFeaturedProductData';
import {ILocalHeroDataResponse} from '../../interfaces/ILocalHerosData';

import {Product} from '../../interfaces/IProductData';
import {useAppSelector} from '../../store/hooks';

export default function HomeMenus(props: any) {
  const restaurantId = props.route.params.id;
  console.log('restaurantId', restaurantId)
  const userState: any = useAppSelector(state => state?.user?.user);
  let userData: any;
  if (userState?.customer) {
  } else {
    userData = JSON?.parse(userState);
  }

  const heroesList: any = useGetRestaurantMenu<IFeatureProductResponse[]>(
    restaurantId
  );
  console.log('===========menuList=========================');
  console.log(JSON.stringify(heroesList));
  console.log('===========menuList=========================');
  return (
    <SafeAreaView style={styles.root}>
      <ScrollView>
        {/* <AppCaraosaul /> */}
        <View style={{paddingRight: 16, paddingLeft: 16, paddingBottom: 16}}>
          {/* <View>
            <Text
              style={[
                styles.ffgt,
                styles.fs20,
                {color: '#34283E', fontWeight: '500'},
              ]}>
              Categories
            </Text>
            <AppOurFavoritesList />
          </View> */}
          {!heroesList.isLoading && heroesList?.data?.data && (
            <View style={styles.mt10}>
              <Text style={[styles.ffgt, styles.fs20, {color: '#34283E'}]}>
                Menu
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                }}>
                {heroesList?.data?.data.map(
                  (individualProduct: any, index: any) => {
                    console.log(`individualProduct`, individualProduct);
                    return (
                      <AppProductCard
                        key={index}
                        id={individualProduct.id}
                        name={individualProduct.name}
                        amount={individualProduct.price}
                        is_wishlist={individualProduct.is_favourite}
                        image={individualProduct.image}
                      />
                    );
                  },
                )}
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
