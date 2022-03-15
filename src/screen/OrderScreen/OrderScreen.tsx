import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import AppTextTitle from '../../component/AppTextTitle';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useGetAllOrder} from '../../hooks/Order/useGetOrder';
import {useAppSelector} from '../../store/hooks';

export default function OrderScreen() {
  const userState: any = useAppSelector(state => state?.user?.user);
  let userData: any;
  if (userState?.user) {
  } else {
    userData = JSON?.parse(userState);
  }

  const orderList: any = useGetAllOrder(userData?.user?.id);
  console.log(`orderList useGetAllOrder`, orderList?.data?.orders);
  return (
    <SafeAreaView>
      <View>
        <View style={innerStyles.titleContainer}>
          <AppTextTitle title={'Orders'} />
        </View>
        {orderList?.data?.orders?.length > 0 ? (
          orderList?.data?.orders.map(() => {
            return (
              <View style={innerStyles.orderDetailContainer}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={innerStyles.boldText}>Order Number:</Text>
                  <Text style={innerStyles.boldText}>123456789</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={innerStyles.normalText}>Order Date:</Text>
                  <Text style={innerStyles.normalText}> 1/1/2020</Text>
                </View>
                <Text style={innerStyles.boldText}>Product Details:</Text>
                <Text style={innerStyles.normalText}>Biker Jacket</Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={innerStyles.normalText}> Color:</Text>
                  <Text style={innerStyles.normalText}> Black</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={innerStyles.normalText}> Size:</Text>
                  <Text style={innerStyles.normalText}> M</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={innerStyles.normalText}> Quantity:</Text>
                  <Text style={innerStyles.normalText}> 1</Text>
                </View>
                <Text style={innerStyles.boldText}>$155.00</Text>
              </View>
            );
          })
        ) : (
          <Text style={innerStyles.trackText}>No Order in List</Text>
        )}

        {/* <TouchableOpacity>
          <Text style={innerStyles.trackText}>Track Order</Text>
        </TouchableOpacity> */}
      </View>
    </SafeAreaView>
  );
}

const innerStyles = StyleSheet.create({
  titleContainer: {
    marginLeft: 20,
  },
  orderDetailContainer: {
    flexDirection: 'column',
    padding: 17,
    elevation: 5,
    borderWidth: 2,
    backgroundColor: 'white',
    borderColor: '#FAF9F6',
    shadowColor: '#E2DFD2',
    shadowOpacity: 0.9,
    marginHorizontal: 15,
    borderRadius: 8,
  },
  boldText: {
    color: '#070A0D',
    fontSize: 14,
    fontWeight: '700',
    marginVertical: 3,
    marginRight: 3,
  },
  normalText: {
    color: '#070A0D',
    fontSize: 12,
    marginVertical: 3,
  },
  trackText: {
    color: '#070A0D',
    fontSize: 18,
    marginTop: 20,
    textAlign: 'center',
    fontWeight: '600',
  },
});
