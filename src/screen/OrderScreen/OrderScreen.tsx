import {View, Text, StyleSheet} from 'react-native';
import React, { useState, useEffect } from "react";
import {SafeAreaView} from 'react-native-safe-area-context';
import StarRating from 'react-native-star-rating';

import AppTextTitle from '../../component/AppTextTitle';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {useGetAllOrder} from '../../hooks/Order/useGetOrder';
import Moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useAppSelector} from '../../store/hooks';
import { SnackbarError, SnackbarSuccess } from '../../utils/SnackBar';

export default function OrderScreen() {
  let userState: any = useAppSelector((state) => state?.user);
  let userData: any;
  if (typeof userState.user != "object") {
    userState = JSON.parse(userState.user);
  } else {
    userState = userState.user;
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
        getDataFromBackend()
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
     
    async function onStarRatingPress(id: number, rating: number){
      try{
        console.log(userState?.token)
        const url = `http://ec2-44-201-171-84.compute-1.amazonaws.com:4005/setRating`;
        const requestBody = {
          order_id: id,
          rating: rating
        }
        console.log(requestBody)
        let response: any = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + userState?.token,
          },
          body: JSON.stringify(requestBody)
        });
        response = await response.json();
        if (response.statusCode === 200) {
          SnackbarSuccess(response.message);
          getData()
          return response;
        } else {
          SnackbarError(response.message);
          throw response;
        }
      } catch(error){
        console.log(error)
      }
     
    } 
     async function getDataFromBackend() {
      const url = `http://ec2-44-201-171-84.compute-1.amazonaws.com:4005/getOrders`;
      console.log("URL in getting groups is: ", url);
      console.log("userState: ", userState);
      try {
        let response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + userState?.token,
          },
        });
        // response = await response.json();
        console.log("responseiso", response);
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
                <View style={{flexDirection: 'row'}}>
                </View>
                {order.status === 'Accepted' ? (<StarRating
                  starSize = {30}
                  maxStars={5}
                  containerStyle={{width: 200, marginTop: 10, alignSelf: 'center'}}
                  rating={order.rating}
                  fullStarColor="#FF9529"
                  disabled={order.rating ? true : false}
                  selectedStar={(rating: any) => onStarRatingPress(order.order_id, rating)}
                />) : null}
                
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
