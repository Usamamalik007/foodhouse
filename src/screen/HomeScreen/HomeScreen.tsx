import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, ScrollView} from 'react-native';

import styles from '../../assets/css/style';
import AppCaraosaul from '../../component/AppCaraosaul';
import AppOurFavoritesList from '../../component/AppOurFavoritesList';
import AppProductCard from '../../component/AppProductCard';
import AppResturantsCard from '../../component/AppResturantsCard';
import {useGetAllHeroes} from '../../hooks/Heroes/useGetAllHeroes';
import {useGetAllFeaturedProduct} from '../../hooks/Product/useGetFeaturedProduct';
import {IFeatureProductResponse} from '../../interfaces/IFeaturedProductData';
import {ILocalHeroDataResponse} from '../../interfaces/ILocalHerosData';

import {Product} from '../../interfaces/IProductData';
import {useAppSelector} from '../../store/hooks';

export default function HomeScreen() {
  
  const userState: any = useAppSelector(state => state?.user?.user);
  let userData: any;
  console.log("userData", userData)
  console.log("userState", userState)

  let isRestaurantMenuScreen = false;

  if (userState?.customer?.role == 1){
    isRestaurantMenuScreen = true
    
  }

  console.log('user___data_in_categories', JSON.stringify(userState))
  if (userState?.customer) {
  } else {
    userData = JSON?.parse(userState);
  }
  console.log("userData", userData)

  const heroesList: any = useGetAllHeroes<IFeatureProductResponse[]>(
    userData?.customer?.id,
  );
  console.log('===========heroesList=========================');
  console.log(JSON.stringify(heroesList));
  console.log('===========heroesList=========================');
  if (isRestaurantMenuScreen){
    return (
      <SafeAreaView style={styles.root}>
        <ScrollView>
          {/* <AppCaraosaul /> */}
          <View style={{paddingRight: 16, paddingLeft: 16, paddingBottom: 16}}>
         <Text>
           Restaurant Menu Screen for Adeed
         </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.root}>
      <ScrollView>
        {/* <AppCaraosaul /> */}
        <View style={{paddingRight: 16, paddingLeft: 16, paddingBottom: 16}}>
          <View>
            <Text
              style={[
                styles.ffgt,
                styles.fs20,
                {color: '#34283E', fontWeight: '500'},
              ]}>
              Categories
            </Text>
            {
              !heroesList.isLoading &&  heroesList.data?.data?.categories ?
              <AppOurFavoritesList categoryList={heroesList.data.data.categories} />
              :
              null

            }

          </View>
          {!heroesList.isLoading && heroesList?.data?.data && (
            <View style={styles.mt10}>
              <Text style={[styles.ffgt, styles.fs20, {color: '#34283E'}]}>
              Restaurants
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                }}>
                {heroesList?.data.data.restaurants?.map(
                  (individualProduct: any, index: any) => {
                    console.log(`individualProduct`, individualProduct);
                    return (
                      <AppResturantsCard
                        key={index}
                        id={individualProduct.id}
                        name={individualProduct.name}
                        image={individualProduct.image}
                        // amount={individualProduct.product.amount}
                        // quantity={individualProduct.product.quantity}
                        // weight={individualProduct.product.weight}
                        // description={individualProduct.product.description}
                        // stock_status={individualProduct.product.stock_status}
                        // is_published={individualProduct.product.is_published}
                        // created_at={individualProduct.product.created_at}
                        // updated_at={individualProduct.product.updated_at}
                        is_wishlist={false}
                       
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
