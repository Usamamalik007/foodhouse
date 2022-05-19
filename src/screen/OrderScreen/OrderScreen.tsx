import {View, Text, StyleSheet} from 'react-native';
import React, { useState, useEffect } from "react";
import {SafeAreaView} from 'react-native-safe-area-context';

import AppTextTitle from '../../component/AppTextTitle';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {useGetAllOrder} from '../../hooks/Order/useGetOrder';
import Moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useAppSelector} from '../../store/hooks';

export default function OrderScreen() {
  const userState: any = useAppSelector(state => state?.user?.user);
  let userData: any;
  if (userState?.customer) {
  } else {
    userData = JSON?.parse(userState);
  }

  const orders: any = [];
  const [orderList, setOrderList] = useState(orders);

  console.log(`orderList useGetAllOrder`, orderList?.data?.orders);
  useEffect(()=>{
    getData()
  },[])
    
     function getData(){
      AsyncStorage.getItem("userKey", (err, result) => {
        console.log("User key", result);
        getDataFromBackend(result)
          .then(function (data) {
            // if(foodItemList &&  foodItemList.length > 0){
              setOrderList(data.data)
            // }
            console.log("data is", data.data);
            console.log("data is", data);
          })
          .catch((error) => {
            console.log("error in fetching data is", error);
          });
      });
     }
     async function getDataFromBackend(tempData: any) {
      const url = `http://ec2-44-201-171-84.compute-1.amazonaws.com:4005/getOrders`;
      console.log("URL in getting groups is: ", url);
      console.log("tempData: ", tempData);
      tempData = JSON.parse(tempData);
      console.log("token: ", tempData.token);
      console.log("userState: ", userState);
      try {
        let response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + tempData.token,
          },
        });
        // response = await response.json();
        console.log("responseiso", response);
        console.log("token", tempData);
        if (response.status === 200) {
          let data = await response.json();
          return data;
        } else {
          let data = await response.json();
          throw data;
        }
      } catch (e) {
        console.log("responseiso", e);
        throw e;
      }
    }
  return (
    <ScrollView>
    <SafeAreaView>
      <View>
        <View style={innerStyles.titleContainer}>
          <AppTextTitle title={'Orders'} />
        </View>
        {orderList?.length > 0 ? (
          orderList?.map((order: any, index: number) => {
            return (
              <View 
              key={index} style={innerStyles.orderDetailContainer}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={innerStyles.boldText}>Order Number:</Text>
                  <Text style={innerStyles.normalText}>{order.order_id}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={innerStyles.boldText}>Order Date:</Text>
                  <Text style={innerStyles.normalText}> {Moment(order.created_at).format("DD-MM-YYYY hh:mm:ss")}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                <Text style={innerStyles.boldText}>Order Status:</Text>
                <Text style={[innerStyles.normalText, {
                color: order.status == "Rejected" ? "#d12d36" : order.status == "Pending" ? "#24a0ed" : "#429b44"
                }]}>{order.status}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={innerStyles.boldText}>Restaurant Name:</Text>
                  <Text style={innerStyles.normalText}> {order.restaurant_name}</Text>
                </View>
                
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
    </ScrollView>
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
    borderColor: '#FAF9F6',
    shadowColor: '#E2DFD2',
    shadowOpacity: 0.9,
    marginHorizontal: 15,
    borderRadius: 8,
  },
  boldText: {
    fontSize: 14,
    fontWeight: '400',
    marginVertical: 3,
    marginRight: 3,
  },
  normalText: {
    fontSize: 14,
    marginVertical: 3,
  },
  trackText: {
    fontSize: 18,
    marginTop: 20,
    textAlign: 'center',
    fontWeight: '600',
  }
});
