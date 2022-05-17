import React, { useEffect, useState } from "react";
import {View, Text, SafeAreaView, ScrollView, Alert} from 'react-native';

import AppProductCard from '../../component/AppProductCard';
import AppTextTitle from '../../component/AppTextTitle';
import { SnackbarSuccess, SnackbarError } from "../../utils/SnackBar";
import {useGetAllFavourites} from '../../hooks/Favourites/UseGetFavourites';
import {
  Wishlist,
  Wishlist4,
  WishListResponse,
} from '../../interfaces/IWishListData';
import {useAppSelector} from '../../store/hooks';

export default function FavouritesScreen() {
  let base_url = "http://ec2-44-201-171-84.compute-1.amazonaws.com:4005";


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
  const [allFavouriteList, setAllFavouriteList] = useState<any>();

  useEffect(() => {
    getAllFavourites()
}, []);
async function getAllFavourites(){
  let response:any = await fetch(base_url + "/getFavourites", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer " + userState.token, 
    }
  })
  response = await response.json()
  if (response.statusCode === 200) {
    setAllFavouriteList(response)
    console.log("===========================", allFavouriteList)  
    SnackbarSuccess(response.message);
  } else {
    console.log(JSON.stringify(response))
    SnackbarError(response.message);
  }
 }

  // const allfavouriteList: any = useGetAllFavourites<WishListResponse>(
  //   userData?.user?.id,
  // );
  async function selectFavourite(){
    getAllFavourites()
  }
  console.log('==============allfavouriteList======================');
  console.log(JSON.stringify(allFavouriteList));
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
    <ScrollView>
    <SafeAreaView style={{flex: 1, paddingLeft: 15, paddingRight: 15}}>
        <AppTextTitle title="Favourites" />
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}>
          {allFavouriteList?.data?.length > 0 ? (
            allFavouriteList?.data &&
            allFavouriteList?.data?.map(
              (individualProduct: any, index: any) => {
                return (
                  <AppProductCard
                    key={index}
                    id={individualProduct?.id}
                    name={individualProduct?.name}
                    amount={individualProduct?.price}
                    image={individualProduct?.image}
                    is_wishlist={true}
                    selectFavourite = {selectFavourite}
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
    </SafeAreaView>
    </ScrollView>
  );
}
