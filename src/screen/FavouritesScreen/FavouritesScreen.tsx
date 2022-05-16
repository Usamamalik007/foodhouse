import React, { useEffect } from 'react';
import {View, Text, SafeAreaView, ScrollView, Alert} from 'react-native';

import AppProductCard from '../../component/AppProductCard';
import AppTextTitle from '../../component/AppTextTitle';
import {useGetAllFavourites} from '../../hooks/Favourites/UseGetFavourites';
import {
  Wishlist,
  Wishlist4,
  WishListResponse,
} from '../../interfaces/IWishListData';
import {useAppSelector} from '../../store/hooks';

export default function FavouritesScreen() {


  let userState: any = useAppSelector((state) => state?.user);

  if (typeof(userState.user) != 'object'){
    userState = JSON.parse(userState.user)
  }
  else {
    userState = userState.user
  }
  let userData;
  if (userState?.customer) {
  } else {
    userData = userState
  }


  let isScreenNotAvailable = false;

  if (userState?.customer?.role == 1){
    isScreenNotAvailable = true
    
  }

  useEffect(() => {
    
}, []);
  const allfavouriteList: any = useGetAllFavourites<WishListResponse>(
    userData?.user?.id,
  );
 
  console.log('==============allfavouriteList======================');
  console.log(JSON.stringify(allfavouriteList));
  console.log('==============allfavouriteList======================');
  if (isScreenNotAvailable){
    return(
      <SafeAreaView style={{flex: 1, paddingLeft: 15, paddingRight: 15}}>
      <ScrollView>
        <Text>This Screen is not available for this user</Text>
      </ScrollView>
    </SafeAreaView>
      
    )
  }
  return (
    <SafeAreaView style={{flex: 1, paddingLeft: 15, paddingRight: 15}}>
      <ScrollView>
        <AppTextTitle title="Favourites" />
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}>
          {allfavouriteList?.data?.data?.length > 0 ? (
            allfavouriteList?.data?.data &&
            allfavouriteList?.data?.data?.map(
              (individualProduct: any, index: any) => {
                return (
                  <AppProductCard
                    key={index}
                    id={individualProduct?.id}
                    name={individualProduct?.name}
                    amount={individualProduct?.price}
                    image={individualProduct?.image}
                    is_wishlist={true}
                  />
                );
              },
            )
          ) : (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: 'black', fontSize: 18, fontWeight: '600'}}>
                No data in Wishlist
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
