import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

import styles from '../../assets/css/style';
import AppProductCard from '../../component/AppProductCard';
import {useGetProductByCategory} from '../../hooks/Product/useGetProductByCategory';
import {Product} from '../../interfaces/IProductData';
import {useAppSelector} from '../../store/hooks';
import {appColors} from '../../utils/colors';

const sampleCategory = [
  'Shop All',
  'Max Dresses',
  'Blazer Dresses',
  'Shirt Dresses',
  'Shirt Dresses',
  'Shirt Dresses',
];
export default function ItemScreen(props: any) {
  console.log('props are', props.route.params);
  const userState: any = useAppSelector(state => state?.user?.user);
  let userData: any;
  if (userState?.user) {
  } else {
    userData = JSON?.parse(userState);
  }

  const navigation = useNavigation<any>();
  // const [profileSubCategory, setProfileSubCategory] = useState<any>('Shop All');
  const getProductByCategoryList: any = useGetProductByCategory({
    limit: 1,
    pageNo: 0,
    categoryId: props.route.params,
  });
  return (
    <SafeAreaView style={{padding: 16}}>
      {/* <View style={{height: 50}}>
        <ScrollView
          contentContainerStyle={[{flexDirection: 'row'}, styles.pb5]}
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
          {sampleCategory.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setProfileSubCategory('TopAndShirts');
                }}
                style={{
                  width: 90,
                  height: 25,
                  marginRight: 3,
                  marginLeft: 3,
                  backgroundColor: appColors.lightDarkGrey,

                  alignItems: 'center',
                }}>
                <Text
                  style={[
                    styles.fs12,
                    styles.ffm,
                    styles.colorWhite,
                    {marginTop: 2},
                  ]}>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View> */}
      <TouchableOpacity
        onPress={() => navigation.navigate('ProductFilterScreen')}
        style={{
          alignItems: 'center',
          marginRight: 5,
          flexDirection: 'row',
          alignSelf: 'flex-end',
          marginVertical: 5,
        }}>
        <Text style={{color: '#9B9B9B', marginRight: 3}}>Filter</Text>
        <Ionicons name="chevron-down" size={15} color="#34283E" />
      </TouchableOpacity>
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}>
          {!getProductByCategoryList.isLoading &&
            getProductByCategoryList?.data?.product?.map(
              (individualProduct: Product, index: number) => {
                return (
                  <AppProductCard
                    key={index}
                    id={individualProduct.id}
                    name={individualProduct.name}
                    amount={individualProduct.amount}
                    quantity={individualProduct.quantity}
                    weight={individualProduct.weight}
                    description={individualProduct.description}
                    stock_status={individualProduct.stock_status}
                    is_published={individualProduct.is_published}
                    created_at={individualProduct.created_at}
                    updated_at={individualProduct.updated_at}
                  />
                );
              },
            )}

          {/* If no Data is pressetn */}
          {!getProductByCategoryList.isLoading &&
            getProductByCategoryList?.data?.product.length == 0 && (
              <Text>No Categories Avalible</Text>
            )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
