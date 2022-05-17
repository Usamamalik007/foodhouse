import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import { SnackbarSuccess, SnackbarError } from "../../utils/SnackBar";
import styles from '../../assets/css/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { appColors } from "../../../src/utils/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

import AppAddToCart from "../../component/AppAddToCart";
import AppCounterItem from "../../component/AppCounterItem";
import AppTextTitle from "../../component/AppTextTitle";
import { useGetCartRequest } from "../../hooks/Cart/useProductToCart";
import { ICartDataResponse } from "../../interfaces/ICartData";
import { userKey, loadUserFromStorage } from "../../store/userSlice";
import { useAppSelector } from "../../store/hooks";
import Moment from "moment";
import { white } from "react-native-paper/lib/typescript/styles/colors";


const orders: any = [];
export default function CartScreen() {
  // let cartItemList = useGetCartRequest<ICartDataResponse>().data;
  const navigation = useNavigation<any>();

  const [cartItemList, setCartItemList] = useState<any>([]);
  const [orderList, setOrderList] = useState(orders);
  useEffect(()=>{
    getData()
    getCartItemList();
  },[])
    
     function getData(){
      AsyncStorage.getItem(userKey, (err, result) => {
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
      const url = `http://ec2-44-201-171-84.compute-1.amazonaws.com:4005/getRestaurantOrders`;
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

  let userState: any = useAppSelector((state) => state?.user);

  if (typeof(userState.user) != 'object'){
    userState = JSON.parse(userState.user)
  }
  else {
    userState = userState.user
  }
  let isRestaurantOrderScreen = false;

  if (userState?.customer?.role == 1) {
    isRestaurantOrderScreen = true;
  }


  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getCartItemList();
      // The screen is focused
      // Call any action
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  async function updateOrderStatus(item: any, status: Boolean){
    try{
      const url = `http://ec2-44-201-171-84.compute-1.amazonaws.com:4005/setOrderStatus`;
      const request = {
        order_id: item.order_id,
        status: status
      }
      console.log("------------------------", item);
      console.log(url)
      console.log(request)
      let response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer " + userState?.token,
        },
        body: JSON.stringify(request)
      });
      await getData()
    } catch(error){
      console.log(error)
    }
  }

  async function getCartItemList() {
    try {
      let response: any = await fetch(
        "http://ec2-44-201-171-84.compute-1.amazonaws.com:4005/getCart",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization:
            "Bearer " + userState.token,
          },
        }
      );
      response = await response.json();
      console.log("response is", JSON.stringify(response));
      if (response.statusCode === 200) {
        console.log(JSON.stringify(response));
        setCartItemList(response);
        // SnackbarSuccess(response.message);
      } else {
        // SnackbarError(response.message);
      }
    } catch (e) {
      throw e;
    }
  }
  async function addOrder(user_id: number) {
    let form_data = {
      user_id: user_id,
    };

    console.log(form_data);

    try {
      let response: any = await fetch(
        "http://ec2-44-201-171-84.compute-1.amazonaws.com:4005/addOrder",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
            "Bearer " + userState.token,
          },
          body: JSON.stringify(form_data),
        }
      );
      response = await response.json();
      console.log("response is", JSON.stringify(response));
      if (response.statusCode === 200) {
        navigation.navigate('HomeScreen');
        SnackbarSuccess(response.message);
      } else {
        SnackbarError(response.message);
      }
    } catch (e) {
      throw e;
    }
  }

  async function removeItem(cart_id: number, food_item_id: number) {
    let form_data = {
      cart_id: cart_id,
      food_item_id: food_item_id,
    };

    console.log(form_data);

    try {
      let response: any = await fetch(
        "http://ec2-44-201-171-84.compute-1.amazonaws.com:4005/removeFromCart",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
            "Bearer " + userState.token,
          },
          body: JSON.stringify(form_data),
        }
      );
      response = await response.json();
      console.log("response is", JSON.stringify(response));
      if (response.statusCode === 200) {
        getCartItemList();
        // SnackbarSuccess(response.message);
      } else {
        // SnackbarError(response.message);
      }
    } catch (e) {
      throw e;
    }
  }
  async function clearCart() {
    let form_data = {};

    try {
      let response: any = await fetch(
        "http://ec2-44-201-171-84.compute-1.amazonaws.com:4005/deleteCart",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
            "Bearer " + userState.token,
          },
          body: JSON.stringify(form_data),
        }
      );
      response = await response.json();
      console.log("response is", JSON.stringify(response));
      if (response.statusCode === 200) {
        getCartItemList();
        // SnackbarSuccess(response.message);
      } else {
        // SnackbarError(response.message);
      }
    } catch (e) {
      throw e;
    }
  }
  if (isRestaurantOrderScreen) {
    return (
      <SafeAreaView
        style={{
          paddingLeft: 15,
          paddingRight: 15,
          flex: 1,
          position: "relative",
        }}
      >
        <ScrollView
          contentContainerStyle={{
            padding: 20,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "500",
            }}
          >
            Orders
          </Text>
          {orderList?.length > 0 ? (
          orderList?.map((order: any) => {
            return (
              <View  style={innerStyles.orderDetailContainer}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={innerStyles.boldText}>Order Numbers:</Text>
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
                  <Text style={innerStyles.boldText}>Customer Name:</Text>
                  <Text style={innerStyles.normalText}> {order.customer_name}</Text>
                </View>
                {order.status == "Pending" && <View style={{flexDirection: 'row', marginTop: 15}}>

                <TouchableOpacity style={{alignItems: "flex-start", width: 35, left: 80, borderRadius: 5, borderWidth: 1, borderColor: "lightgrey", backgroundColor: "#429b44"}} onPress={() => {
                      updateOrderStatus(order, true);
                      console.log("------------------------",order)
                    }}>
                    <Ionicons  name="checkmark-outline" size={30} color={appColors.white} />
                    </TouchableOpacity>
                     <TouchableOpacity style={{alignItems: "flex-end",width: 35, marginLeft: 120, borderRadius: 5, borderColor: "lightgrey", borderWidth: 1, backgroundColor: "#24a0ed"}}  onPress={() => {
                      updateOrderStatus(order, false);
                      console.log("------------------------",order)
                    }}>
                <Ionicons  name="close-outline" size={30} color={appColors.white} />
                    </TouchableOpacity>
                    </View>
          }
                
              </View>
            );
          })
        ) : (
          <Text style={innerStyles.trackText}>No Order in List</Text>
        )}
        </ScrollView>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView
      style={{
        paddingLeft: 15,
        paddingRight: 15,
        flex: 1,
        position: "relative",
      }}
    >
      <ScrollView>
        <View style={innerStyles.titleContainer}>
          <AppTextTitle title={'Cart'} />
        </View>
        {cartItemList &&
          cartItemList.data &&
          cartItemList.data.length > 0 &&
          cartItemList?.data.map((cartItem: any, index: any) => {
            return (
              <AppCounterItem
                key={index}
                productName={cartItem.name}
                productPrice={cartItem.price}
                productID={cartItem.food_item_id}
                quantity={cartItem.amount}
                productImage={
                  "http://ec2-44-201-171-84.compute-1.amazonaws.com:4005" +
                  cartItem.image
                }
                cartItemID={cartItem.cart_id}
                removeItem={removeItem}
              />
            );
          })}
          
        {cartItemList &&
          cartItemList.data &&
          cartItemList.data.length > 0 ? (
          <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            
          }}>
          <TouchableOpacity
          onPress={() => {
            clearCart();
          }}
          style={[
            styles.p10,
            styles.br10,
            styles.mt10,
            styles.shadow,
            {
              marginLeft: 5,
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              backgroundColor: '#f44336'
            },
          ]}
        >
          <Text style={{
            color: "white"
          }}>Clear Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={() => {
          addOrder(userState?.customer?.user_id);
        }}
          
        style={[
          styles.p10,
          styles.br10,
          styles.mt10,
          styles.shadow,
          {
            marginLeft: 5,
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            backgroundColor: '#429b44'
          },
        ]}
        >
          <Text style={{
            color: "white"
          }}>Confirm Order</Text>
        </TouchableOpacity>
        </View>
        ) : (
          <Text style={innerStyles.trackText}>No item in cart</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
const innerStyles = StyleSheet.create({
  titleContainer: {
    marginLeft: 20,
  },
  cartContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 14,
    marginBottom: 8,
  },
  addToCartText: {
    fontWeight: "400",
    fontSize: 17,
    width: "100%",
    paddingVertical: 13,
    backgroundColor: "#464447",
    borderRadius: 8,
    color: "white",
    textAlign: "center",
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
