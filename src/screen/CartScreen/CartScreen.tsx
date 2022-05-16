import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  AsyncStorage,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import { SnackbarSuccess, SnackbarError } from "../../utils/SnackBar";
import AppAddToCart from "../../component/AppAddToCart";
import AppCounterItem from "../../component/AppCounterItem";
import AppTextTitle from "../../component/AppTextTitle";
import { useGetCartRequest } from "../../hooks/Cart/useProductToCart";
import { ICartDataResponse } from "../../interfaces/ICartData";
import { userKey, loadUserFromStorage } from "../../store/userSlice";
import { useRoute } from '@react-navigation/native';
import { useAppSelector } from "../../store/hooks";
import Moment from "moment";


const orders: any = [];
export default function CartScreen() {
  // let cartItemList = useGetCartRequest<ICartDataResponse>().data;
  const router = useRoute();
  const { params } = router;
  const restaurant_id = params?.restaurant_id
  const navigation = useNavigation<any>();

  const [cartItemList, setCartItemList] = useState([]);
  const [orderList, setOrderList] = useState(orders);
  useEffect(()=>{
    getData()
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
    // Update the document title using the browser API
    getCartItemList();
  }, []);

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
      restaurant_id: restaurant_id,
    };

    console.log(form_data);
    console.log(restaurant_id);
    console.log(router.params);
    console.log(router);

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
        // navigation.navigate('HomeScreen');
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
              color: "black",
            }}
          >
            Orders
          </Text>
          {/* <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "black",
                fontSize: 18,
                fontWeight: "500",
              }}
            >
              Restaurant
            </Text>
            <Text
              style={{
                color: "black",
                fontSize: 18,
                fontWeight: "500",
              }}
            >
              Status
            </Text>
            <Text
              style={{
                color: "black",
                fontSize: 18,
                fontWeight: "500",
              }}
            >
              Time
            </Text>
          </View> */}
          {orderList.map((order: any) => {
            return (
              <View
                style={{
                  marginTop: 20,
                }}
              >
                <View
                  style={{
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <Text
                    style={{
                      color: "black",
                      fontSize: 18,
                      fontWeight: "500",
                    }}
                  >
                    {order.restaurant_name}
                  </Text>
                  <Text
                    style={{
                      color: "black",
                      fontSize: 18,
                      fontWeight: "500",
                    }}
                  >
                    {order.status}
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: 10,
                    justifyContent: "space-between",
                    flexDirection: "row",
                  }}
                >
                  <Text
                    style={{
                      color: "black",
                      fontSize: 14,
                      fontWeight: "500",
                    }}
                  >
                    {Moment(order.created_at).format(" hh:mm DD-MMM-YY")}
                  </Text>
                  {
                    order.status === "Pending" && <View>
                       <TouchableOpacity onPress={() => {
                      updateOrderStatus(order, true);
                      console.log("------------------------",order)
                    }}>
                      <Image
                        style={{
                          height: 24,
                          width: 24,
                          marginLeft: 90,
                        }}
                        source={require("../../assets/imgs/new_blue_tick_icon.png")}
                      />
                    </TouchableOpacity>
                     <TouchableOpacity onPress={() => {
                      updateOrderStatus(order, false);
                      console.log("------------------------",order)
                    }}>
                      <Image
                        style={{
                          height: 24,
                          width: 24,
                        }}
                        source={require("../../assets/imgs/new-blackish-cross.png")}
                      />
                    </TouchableOpacity>
                    </View>
                  }
                 
                </View>
              </View>
            );
          })}
        </ScrollView>
        {/* <View
          style={{
            bottom: 0,
            position: 'absolute',
            left: 0,
            right: 0,
            padding: 10,
          }}>
          <TouchableOpacity
            style={innerStyles.cartContainer}
            onPress={() => {
              navigation.navigate('CheckoutScreen', cartItemList?.response);
            }}>
            <Text style={innerStyles.addToCartText}>Check Out</Text>
          </TouchableOpacity>
        </View> */}
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
        <AppTextTitle title="Cart" />

        <TouchableOpacity
          onPress={() => {
            clearCart();
          }}
          style={{
            borderWidth: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>Clear Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={() => {
          addOrder(userState?.customer?.user_id);
        }}
          style={{
            borderWidth: 1,
            marginTop: 30,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>Confirm Order</Text>
        </TouchableOpacity>
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
      </ScrollView>
      {/* <View
        style={{
          bottom: 0,
          position: 'absolute',
          left: 0,
          right: 0,
          padding: 10,
        }}>
        <TouchableOpacity
          style={innerStyles.cartContainer}
          onPress={() => {
            navigation.navigate('CheckoutScreen', cartItemList?.response);
          }}>
          <Text style={innerStyles.addToCartText}>Check Out</Text>
        </TouchableOpacity>
      </View> */}
    </SafeAreaView>
  );
}
const innerStyles = StyleSheet.create({
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
});
