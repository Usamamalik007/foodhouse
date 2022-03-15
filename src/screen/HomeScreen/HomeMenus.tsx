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
  if (userState?.user) {
  } else {
    userData = JSON?.parse(userState);
  }

  const heroesList: any = useGetRestaurantMenu<IFeatureProductResponse[]>(
    restaurantId
  );
  // const heroesList:any ={
  //   "status": "success",
  //   "isLoading": false,
  //   "isSuccess": true,
  //   "isError": false,
  //   "isIdle": false,
  //   "data": {
  //       "statusCode": 200,
  //       "message": "FETCHED SUCCESSFULLY",
  //       "response": [
  //           {
  //               "id": 8,
  //               "product": {
  //                   "id": 15,
  //                   "name": "burger 1",
  //                   "amount": 150,
  //                   "quantity": 30,
  //                   "weight": "0.3",
  //                   "description": "description",
  //                   "stock_status": "in_stock",
  //                   "is_published": true,
  //                   "sku_code": "gfgfg",
  //                   "sh_code": "55444",
  //                   "is_local": true,
  //                   "is_refundable": "false",
  //                   "shipping_days": 4,
  //                   "tax": "0",
  //                   "badge_name": "sale",
  //                   "is_discount_active": false,
  //                   "stock_alert_quantity": 1,
  //                   "created_at": "2021-11-25T05:59:34.999Z",
  //                   "updated_at": "2021-11-25T05:59:34.999Z",
  //                   "default_image_id": {
  //                       "id": 8,
  //                       "key": "PROFILE_PICTURES/e2b5333c-8ae9-47ec-b183-a5c7a4a50d09.png",
  //                       "location": "https://bys-dev.s3.me-south-1.amazonaws.com/PROFILE_PICTURES/e2b5333c-8ae9-47ec-b183-a5c7a4a50d09.png",
  //                       "eTag": "\"1f135c76c14d9839c82f184c53fe674f\"",
  //                       "bucket": "bys-dev",
  //                       "created_at": "2021-11-19T11:54:25.395Z",
  //                       "updated_at": "2021-11-19T11:54:25.395Z"
  //                   },
  //                   "productDiscount": null,
  //                   "is_wishList": false,
  //                   "attachment": []
  //               },
  //               "country": {
  //                   "id": 2,
  //                   "name": "india"
  //               }
  //           },
  //           {
  //               "id": 7,
  //               "product": {
  //                   "id": 14,
  //                   "name": "burger 2",
  //                   "amount": 100,
  //                   "quantity": 20,
  //                   "weight": "0.2",
  //                   "description": "test",
  //                   "stock_status": "in_stock",
  //                   "is_published": true,
  //                   "sku_code": "sdghjgd",
  //                   "sh_code": "5556",
  //                   "is_local": true,
  //                   "is_refundable": "false",
  //                   "shipping_days": 4,
  //                   "tax": "0",
  //                   "badge_name": "sale",
  //                   "is_discount_active": false,
  //                   "stock_alert_quantity": 1,
  //                   "created_at": "2021-11-22T07:16:26.319Z",
  //                   "updated_at": "2021-11-22T07:16:26.319Z",
  //                   "default_image_id": {
  //                       "id": 8,
  //                       "key": "PROFILE_PICTURES/e2b5333c-8ae9-47ec-b183-a5c7a4a50d09.png",
  //                       "location": "https://bys-dev.s3.me-south-1.amazonaws.com/PROFILE_PICTURES/e2b5333c-8ae9-47ec-b183-a5c7a4a50d09.png",
  //                       "eTag": "\"1f135c76c14d9839c82f184c53fe674f\"",
  //                       "bucket": "bys-dev",
  //                       "created_at": "2021-11-19T11:54:25.395Z",
  //                       "updated_at": "2021-11-19T11:54:25.395Z"
  //                   },
  //                   "productDiscount": {
  //                       "id": 4,
  //                       "discount": {
  //                           "id": 4,
  //                           "name": "sale",
  //                           "expiry_date": null,
  //                           "value": "6",
  //                           "is_deleted": false,
  //                           "created_at": "2021-11-23T07:39:59.005Z",
  //                           "updated_at": "2021-11-23T07:39:59.005Z"
  //                       }
  //                   },
  //                   "is_wishList": true,
  //                   "attachment": []
  //               },
  //               "country": {
  //                   "id": 2,
  //                   "name": "india"
  //               }
  //           },
  //           {
  //               "id": 5,
  //               "product": {
  //                   "id": 13,
  //                   "name": "burger 3",
  //                   "amount": 200,
  //                   "quantity": 20,
  //                   "weight": "0.2",
  //                   "description": "test",
  //                   "stock_status": "in_stock",
  //                   "is_published": true,
  //                   "sku_code": "sdzf",
  //                   "sh_code": "5566",
  //                   "is_local": true,
  //                   "is_refundable": "false",
  //                   "shipping_days": 4,
  //                   "tax": "0",
  //                   "badge_name": "sale",
  //                   "is_discount_active": false,
  //                   "stock_alert_quantity": 1,
  //                   "created_at": "2021-11-22T07:09:52.941Z",
  //                   "updated_at": "2021-11-22T07:09:52.941Z",
  //                   "default_image_id": {
  //                       "id": 8,
  //                       "key": "PROFILE_PICTURES/e2b5333c-8ae9-47ec-b183-a5c7a4a50d09.png",
  //                       "location": "https://bys-dev.s3.me-south-1.amazonaws.com/PROFILE_PICTURES/e2b5333c-8ae9-47ec-b183-a5c7a4a50d09.png",
  //                       "eTag": "\"1f135c76c14d9839c82f184c53fe674f\"",
  //                       "bucket": "bys-dev",
  //                       "created_at": "2021-11-19T11:54:25.395Z",
  //                       "updated_at": "2021-11-19T11:54:25.395Z"
  //                   },
  //                   "productDiscount": {
  //                       "id": 2,
  //                       "discount": {
  //                           "id": 2,
  //                           "name": "sale",
  //                           "expiry_date": null,
  //                           "value": "5",
  //                           "is_deleted": false,
  //                           "created_at": "2021-11-17T09:41:27.217Z",
  //                           "updated_at": "2021-11-17T09:41:27.217Z"
  //                       }
  //                   },
  //                   "is_wishList": true,
  //                   "attachment": []
  //               },
  //               "country": {
  //                   "id": 1,
  //                   "name": "pakistan"
  //               }
  //           }
  //       ]
  //   },
  //   "dataUpdatedAt": 1638090028440,
  //   "error": null,
  //   "errorUpdatedAt": 0,
  //   "failureCount": 0,
  //   "isFetched": true,
  //   "isFetchedAfterMount": true,
  //   "isFetching": false,
  //   "isRefetching": false,
  //   "isLoadingError": false,
  //   "isPlaceholderData": false,
  //   "isPreviousData": false,
  //   "isRefetchError": false,
  //   "isStale": true
  // } 
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
                        // quantity={individualProduct.product.quantity}
                        // weight={individualProduct.product.weight}
                        // description={individualProduct.product.description}
                        // stock_status={individualProduct.product.stock_status}
                        // is_published={individualProduct.product.is_published}
                        // created_at={individualProduct.product.created_at}
                        // updated_at={individualProduct.product.updated_at}
                        is_wishlist={individualProduct.is_favourite}
                        image={individualProduct.image}
                        // productDiscount={
                        //   individualProduct.product.productDiscount
                        // }
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
