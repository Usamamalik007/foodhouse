import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, ScrollView} from 'react-native';

import styles from '../../assets/css/style';
import AppCaraosaul from '../../component/AppCaraosaul';
import AppOurFavoritesList from '../../component/AppOurFavoritesList';
import AppProductCard from '../../component/AppProductCard';
import {useGetRestaurantMenu} from '../../hooks/Menu/useGetRestaurantMenu';
import {useGetAllFeaturedProduct} from '../../hooks/Product/useGetFeaturedProduct';
import {IFeatureProductResponse} from '../../interfaces/IFeaturedProductData';
import { SnackbarSuccess, SnackbarError } from "../../utils/SnackBar";
import {ILocalHeroDataResponse} from '../../interfaces/ILocalHerosData';

import {Product} from '../../interfaces/IProductData';
import {useAppSelector} from '../../store/hooks';

export default function HomeMenus(props: any) {
  let base_url = "http://ec2-44-201-171-84.compute-1.amazonaws.com:4005";
  const restaurantId = props.route.params.id;
  console.log('restaurantId==================================================', restaurantId)
  console.log('props==================================================', props.route.params)
  let userState: any = useAppSelector((state) => state?.user);

  if (typeof(userState.user) != 'object'){
    userState = JSON.parse(userState.user)
  }
  else {
    userState = userState.user
  }

  // const heroesList: any = useGetRestaurantMenu<IFeatureProductResponse[]>(
  //   restaurantId
  // );
  const [restaurantMenu, setRestaurantMenu] = useState<any>();
  
  async function selectFavourite(){
    getRestaurantMenu()
  }
  
async function getRestaurantMenu(){
  console.log("===========================userState",userState?.token)
  let response:any = await fetch(base_url + `/getRestaurantMenu?restaurant_id=${restaurantId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer " + userState?.token, 
    }
  })
  response = await response.json()
  if (response.statusCode === 200) {
    setRestaurantMenu(response)
    console.log("===========================restaurantMenu", restaurantMenu)  
    SnackbarSuccess(response.message);
  } else {
    console.log(JSON.stringify(response))
    SnackbarError(response.message);
  }
 }
 
 useEffect(() => {
  getRestaurantMenu()
}, []);

  console.log('===========menuList=========================');
  console.log(JSON.stringify(restaurantMenu));
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
          {!restaurantMenu?.isLoading && restaurantMenu?.data && (
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
                {restaurantMenu?.data.map(
                  (individualProduct: any, index: any) => {
                    console.log(`individualProduct`, individualProduct);
                    return (
                      <AppProductCard
                        key={index}
                        id={individualProduct.id}
                        name={individualProduct.name}
                        restaurantId={restaurantId}
                        amount={individualProduct.price}
                        is_wishlist={individualProduct.is_favourite}
                        bestSeller={individualProduct.bestSeller}
                        image={individualProduct.image}
                        selectFavourite = {selectFavourite}
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
