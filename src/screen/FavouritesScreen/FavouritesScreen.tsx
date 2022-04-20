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
  const userState: any = useAppSelector(state => state?.user?.user);
  let userData;
  if (userState?.customer) {
  } else {
    userData = JSON?.parse(userState);
  }

  useEffect(() => {
    
}, []);
  const allfavouriteList: any = useGetAllFavourites<WishListResponse>(
    userData?.user?.id,
  );
  // const allfavouriteList={
  //     "status": "success",
  //     "isLoading": false,
  //     "isSuccess": true,
  //     "isError": false,
  //     "isIdle": false,
  //     "data": {
  //         "statusCode": 200,
  //         "message": "FETCHED SUCCESSFULLY",
  //         "wishlist": [
  //             {
  //                 "id": 48,
  //                 "created_at": "2021-11-22T07:26:22.180Z",
  //                 "updated_at": "2021-11-22T07:26:22.180Z",
  //                 "product": {
  //                     "id": 14,
  //                     "name": "Burger 1",
  //                     "amount": 100,
  //                     "quantity": 20,
  //                     "weight": "0.2",
  //                     "description": "test",
  //                     "stock_status": "in_stock",
  //                     "is_published": true,
  //                     "sku_code": "sdghjgd",
  //                     "sh_code": "5556",
  //                     "is_local": true,
  //                     "is_refundable": "false",
  //                     "shipping_days": 4,
  //                     "tax": "0",
  //                     "badge_name": "sale",
  //                     "is_discount_active": false,
  //                     "stock_alert_quantity": 1,
  //                     "created_at": "2021-11-22T07:16:26.319Z",
  //                     "updated_at": "2021-11-22T07:16:26.319Z",
  //                     "default_image_id": {
  //                         "id": 8,
  //                         "key": "PROFILE_PICTURES/e2b5333c-8ae9-47ec-b183-a5c7a4a50d09.png",
  //                         "location": "https://bys-dev.s3.me-south-1.amazonaws.com/PROFILE_PICTURES/e2b5333c-8ae9-47ec-b183-a5c7a4a50d09.png",
  //                         "eTag": "\"1f135c76c14d9839c82f184c53fe674f\"",
  //                         "bucket": "bys-dev",
  //                         "created_at": "2021-11-19T11:54:25.395Z",
  //                         "updated_at": "2021-11-19T11:54:25.395Z"
  //                     },
  //                     "productDiscount": {
  //                         "id": 4,
  //                         "discount": {
  //                             "id": 4,
  //                             "name": "sale",
  //                             "expiry_date": null,
  //                             "value": "6",
  //                             "is_deleted": false,
  //                             "created_at": "2021-11-23T07:39:59.005Z",
  //                             "updated_at": "2021-11-23T07:39:59.005Z"
  //                         }
  //                     }
  //                 }
  //             },
  //             {
  //                 "id": 137,
  //                 "created_at": "2021-11-26T10:54:57.402Z",
  //                 "updated_at": "2021-11-26T10:54:57.402Z",
  //                 "product": {
  //                     "id": 13,
  //                     "name": "burger 2",
  //                     "amount": 200,
  //                     "quantity": 20,
  //                     "weight": "0.2",
  //                     "description": "test",
  //                     "stock_status": "in_stock",
  //                     "is_published": true,
  //                     "sku_code": "sdzf",
  //                     "sh_code": "5566",
  //                     "is_local": true,
  //                     "is_refundable": "false",
  //                     "shipping_days": 4,
  //                     "tax": "0",
  //                     "badge_name": "sale",
  //                     "is_discount_active": false,
  //                     "stock_alert_quantity": 1,
  //                     "created_at": "2021-11-22T07:09:52.941Z",
  //                     "updated_at": "2021-11-22T07:09:52.941Z",
  //                     "default_image_id": {
  //                         "id": 8,
  //                         "key": "PROFILE_PICTURES/e2b5333c-8ae9-47ec-b183-a5c7a4a50d09.png",
  //                         "location": "https://bys-dev.s3.me-south-1.amazonaws.com/PROFILE_PICTURES/e2b5333c-8ae9-47ec-b183-a5c7a4a50d09.png",
  //                         "eTag": "\"1f135c76c14d9839c82f184c53fe674f\"",
  //                         "bucket": "bys-dev",
  //                         "created_at": "2021-11-19T11:54:25.395Z",
  //                         "updated_at": "2021-11-19T11:54:25.395Z"
  //                     },
  //                     "productDiscount": {
  //                         "id": 2,
  //                         "discount": {
  //                             "id": 2,
  //                             "name": "sale",
  //                             "expiry_date": null,
  //                             "value": "5",
  //                             "is_deleted": false,
  //                             "created_at": "2021-11-17T09:41:27.217Z",
  //                             "updated_at": "2021-11-17T09:41:27.217Z"
  //                         }
  //                     }
  //                 }
  //             }
  //         ]
  //     },
  //     "dataUpdatedAt": 1638091180864,
  //     "error": null,
  //     "errorUpdatedAt": 0,
  //     "failureCount": 0,
  //     "isFetched": true,
  //     "isFetchedAfterMount": true,
  //     "isFetching": false,
  //     "isRefetching": false,
  //     "isLoadingError": false,
  //     "isPlaceholderData": false,
  //     "isPreviousData": false,
  //     "isRefetchError": false,
  //     "isStale": true
  // }
  console.log('==============allfavouriteList======================');
  console.log(JSON.stringify(allfavouriteList));
  console.log('==============allfavouriteList======================');
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
                    // quantity={individualProduct?.product?.quantity}
                    // weight={individualProduct?.product?.weight}
                    // description={individualProduct?.product?.description}
                    // stock_status={individualProduct?.product?.stock_status}
                    // is_published={individualProduct?.product?.is_published}
                    // created_at={individualProduct?.product?.created_at}
                    // updated_at={individualProduct?.product?.updated_at}
                    is_wishlist={true}
                    productDiscount={undefined}
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
