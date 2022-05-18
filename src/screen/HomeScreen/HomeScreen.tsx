import { getDate } from "date-fns";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  TouchableOpacityBase,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { string } from "yup";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { appColors } from "../../../src/utils/colors";
import { SnackbarSuccess, SnackbarError } from "../../utils/SnackBar";
import { userKey, loadUserFromStorage } from "../../store/userSlice";

import styles from "../../assets/css/style";
import AppCaraosaul from "../../component/AppCaraosaul";
import AppOurFavoritesList from "../../component/AppOurFavoritesList";
import AppProductCard from "../../component/AppProductCard";
import AppResturantsCard from "../../component/AppResturantsCard";
import { useGetAllHeroes } from "../../hooks/Heroes/useGetAllHeroes";
import { useGetAllFeaturedProduct } from "../../hooks/Product/useGetFeaturedProduct";
import { IFeatureProductResponse } from "../../interfaces/IFeaturedProductData";
import { ILocalHeroDataResponse } from "../../interfaces/ILocalHerosData";
import ImagePicker from "react-native-image-crop-picker";
import { Product } from "../../interfaces/IProductData";
import { useAppSelector } from "../../store/hooks";
let base_url = "http://ec2-44-201-171-84.compute-1.amazonaws.com:4005";

type addedItemType = {
  name: any;
  image: any;
  price: any;
};
const addedItem = {};
const items: any = [];
type categoryType = {
  id?: any;
  name?: any;
};
export default function HomeScreen() {
  let userState: any = useAppSelector((state) => state?.user);

  if (typeof userState.user != "object") {
    userState = JSON.parse(userState.user);
  } else {
    userState = userState.user;
  }

  console.log('myyyyuserstate, ', JSON.stringify(userState))
  
 
  console.log('loadUserFromStorage', JSON.stringify(loadUserFromStorage))

  let isRestaurantMenuScreen = false;
  console.log("userState for adeed", userState?.customer);
  console.log("ussssser key", JSON.stringify(userKey));

  if (userState?.customer?.role == 1) {
    isRestaurantMenuScreen = true;
  }


  const [foodItemList, setFoodItemList] = useState(items);
  const [addedFoodItem, setAddedFootItem] = useState<addedItemType[]>([]);
  const [itemName, setItemName] = useState<string>("");
  const [itemPrice, setItemPrice] = useState<string>();
  const [showAddItemModal, setShowAddItemModal] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<categoryType>();
  // const heroesList: any = ;


    
  const [imagePath, setImagePath] = useState<string>("");

  function openImagePicker() {
    ImagePicker.openPicker({
      width: 63,
      height: 63,
      cropping: true,
    })
      .then((image: { path: React.SetStateAction<string> }) => {
        //@ts-ignore
        setImagePath(image.path);
        postImage(image.path);
      })
      .catch((callBack) => {
        // you forgot to add catch to this promise.
        console.log(callBack); // Please handle the callBack here.
      });
  }

  async function selectCategory(index: number) {
    let tempList = JSON.parse(JSON.stringify(categoriesAndRestaurants));
    console.log("====================================tempList?.data?.categories",tempList?.data?.categories)
    if(tempList?.data?.categories){
      tempList.data.categories[index].selected = !tempList.data?.categories[index].selected
      console.log("-----------------------------------categoriesAndRestaurants?.data?.categories",categoriesAndRestaurants?.data?.categories)
      console.log("-----------------------------------tempList",tempList.data?.categories)
      let dataToSend:any = {
        categories  : []
      }
      for(let item of tempList.data?.categories){
        console.log(item)
        if(item.selected){
          dataToSend.categories.push(item.id)
        }
      }
      let response:any = await fetch(base_url + "/getRestaurantsByCategories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer " + userState?.token, 
        },
        body: JSON.stringify(dataToSend)
      })
      console.log("dataToSend is", JSON.stringify(dataToSend));

      response = await response.json();
      console.log("response is", JSON.stringify(response));
      if (response.statusCode === 200) {
        // tempList = JSON.parse(JSON.stringify(categoriesAndRestaurants))
        console.log("--------------------------------------------------------------response",response)
        tempList.data.restaurants = response?.data;
        setCategoriesAndRestaurants(tempList)  
        SnackbarSuccess(response.message);
      } else {
        setCategoriesAndRestaurants(tempList)
        console.log(JSON.stringify(response))
        SnackbarError(response.message);
      }
    }
  }
  async function getDataFromBackend(tempData: any) {
    const url = `http://ec2-44-201-171-84.compute-1.amazonaws.com:4005/getRestaurantMenu?restaurant_id=${userState?.customer?.restaurant_id}`;
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
  const [categoriesAndRestaurants, setCategoriesAndRestaurants] = useState<any>();
useEffect(()=>{
  if(isRestaurantMenuScreen){
    getData()
    getRestaurantsAndCategoriesFunc()
  } else{
    getRestaurantsAndCategoriesFunc()
  }
},[])
async function getRestaurantsAndCategoriesFunc(){
  let response:any = await fetch(base_url + "/getRestaurantsAndCategories", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer " + userState.token, 
    }
  })
  response = await response.json()
  if (response.statusCode === 200) {
    setCategoriesAndRestaurants(response)  
    SnackbarSuccess(response.message);
  } else {
    console.log(JSON.stringify(response))
    SnackbarError(response.message);
  }
 }

 function getData(){
  AsyncStorage.getItem(userKey, (err, result) => {
    console.log("User key", result);
    getDataFromBackend(result)
      .then(function (data) {
        // if(foodItemList &&  foodItemList.length > 0){
          setFoodItemList(data.data)
        // }
        console.log("data is", data.data);
        console.log("data is", data);
        console.log("isRestaurantMenuScreen", isRestaurantMenuScreen);
      })
      .catch((error) => {
        console.log("error in fetching data is", error);
      });
  });
 }
  function renderModal() {
    return (
      showAddItemModal && (
        <Modal
          style={{
            backgroundColor: "red",
            position: "absolute",
            bottom: 0,
          }}
          visible={showAddItemModal}
          onRequestClose={() => {
            setShowAddItemModal(false);
          }}
        >
          <View
            style={{
              justifyContent: "center",
              marginTop: 30,
              padding: 20,
            }}
          >
            <Text
              style={{
                
                fontSize: 16,
                fontWeight: "600",
                color: "black",
              }}
            >
              Add Item
            </Text>
            <View
              style={{
                marginTop: 10,
              }}
            >
              {/* <Text
                style={{
                  fontSize: 16,
                  fontWeight: "500",
                  color: "black",
                }}
              >
                Item name
              </Text> */}
              
              <TouchableOpacity
                onPress={() => {
                  openImagePicker();
                }}
              >
                <View
                  style={{
                    borderWidth: 1,
                    height: 70,
                    width: 70,
                    borderRadius: 35,
                    marginBottom: 20,
                    marginTop: 20,
                    borderColor: imagePath && imagePath.length > 0 ? "white" : "lightgrey",
                  }}
                >
                  <Image
                    source={{
                      uri:
                        imagePath && imagePath.length > 0
                          ? base_url+ imagePath
                          : "https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg",
                    }}
                    style={{
                      height: 70,
                      width: 70,
                      borderRadius: 35,
                    }}
                    resizeMode={"cover"}
                  />

                  <Image
                    style={{
                      height: 24,
                      width: 24,
                      marginTop: -50,
                      marginLeft: 23,
                    }}
                    source={require("../../assets/imgs/Camera-add-black.png")}
                  />
                </View>
              </TouchableOpacity>
              <TextInput
                onChangeText={(value) => {
                  setItemName(value);
                }}
                placeholder={"Item name"}
                style={{
                  paddingHorizontal: 20,
                  width: "100%",
                  height: 40,
                  borderWidth: 1,
                  borderRadius: 12,
                  marginTop: 12,
                  borderColor: "grey",
                }}
              />
              {/* <Text
                style={{
                  fontSize: 16,
                  fontWeight: "500",
                  color: "black",
                  marginTop: 30,
                }}
              >
                Item Price
              </Text> */}
              <TextInput
                onChangeText={(value) => {
                  setItemPrice(value);
                }}
                placeholder={"Item price"}
                style={{
                  paddingHorizontal: 20,
                  width: "100%",
                  height: 40,
                  borderWidth: 1,
                  borderRadius: 12,
                  marginTop: 12,
                  borderColor: "grey",
                }}
              />
              <View>
                {/* <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "500",
                    color: "black",
                    marginTop: 30,
                  }}
                >
                  Category
                </Text> */}
                <View style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap'
                }}>
                  {categoriesAndRestaurants?.data?.categories.map((category: any) => {
                    return (
                      <View
                    
                      >
                        <TouchableOpacity
                          onPress={() => {
                            setSelectedCategory(category);
                          }}
                          style={{
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: 10,
                            width: 150,
                            height: 40,
                            marginLeft: 5,
                            backgroundColor:
                              //@ts-ignore
                              selectedCategory?.id == category.id
                                ? "#429b44"
                                : "#24a0ed",
                          
                            borderRadius: 20,
                            
                          }}
                        >
                          <Text
                            style={{
                              color: "white",
                              fontWeight: "500",
                              lineHeight: 26
                            }}
                          >
                            {category.name}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    );
                  })}
                </View>
              </View>
              {/* <Text
                style={{
                  fontSize: 16,
                  fontWeight: "500",
                  color: "black",
                  marginTop: 30,
                }}
              >
               Image
              </Text> */}
            </View>
            <TouchableOpacity
              style={{
                justifyContent: "center",
                alignItems: "center",
                height: 48,
                marginTop: 30,
                borderRadius: 12,
                backgroundColor: "#429b44",
              }}
              onPress={() => {
                addItemToMenu({
                  name: itemName,
                  price: itemPrice,
                  category_id: selectedCategory?.id,
                  image: imagePath
                })
                setShowAddItemModal(false)
                setImagePath("")
              }}
            >
              <Text
                style={{
                  
                  fontSize: 16,
                  fontWeight: "600",
                  color: "white",
                }}
              >
                Add to menu
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )
    );
  }

  async function postImage(image_Path: any) {

   
    try {
      var form_data = new FormData();
      form_data.append("image", {
        uri: image_Path,
        name: "image.jpg",
        type: "image/jpg",
        user_id: userState?.customer?.id
      });
      console.log("userState", JSON.stringify(userState));
  
      console.log("form_data", JSON.stringify(form_data));
      let response:any = await fetch(base_url + "/uploadImageItem", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization:
            "Bearer " + userState.token, 
        },
        body: form_data,
      })
      response = await response.json();
      console.log("response is", JSON.stringify(response));
      if (response.statusCode === 200) {
        setImagePath(response?.data)  
        SnackbarSuccess(response.message);
      } else {
        console.log(JSON.stringify(response))
        SnackbarError(response.message);
      }
    } catch (e) {
      console.log(JSON.stringify(e))
      throw e;
    }
  }

  async function addItemToMenu(item:any){
    try{
      const url = `http://ec2-44-201-171-84.compute-1.amazonaws.com:4005/addItemToMenu`;
      const request = {
        restaurant_id: userState?.customer?.restaurant_id,
        item: item
      }
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
      let tempList = foodItemList
      tempList.push(item)
      setFoodItemList(tempList)
      console.log("list", tempList)
      getData()
    } catch(error){
      console.log(error)
    }
  }
  async function removeFromList(item:any){
    try{
      const url = `http://ec2-44-201-171-84.compute-1.amazonaws.com:4005/removeItemFromMenu`;
      const request = {
        restaurant_id: userState?.customer?.restaurant_id,
        item: item
      }
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
      let tempList = foodItemList.filter((foodItem:any) => {
        return foodItem.id !== item.id;
      });
      setFoodItemList(tempList);
      console.log("list", tempList);
      getData()
    } catch(error){
      console.log(error)
    }
    
  }
  if (isRestaurantMenuScreen) {
    return (
      <SafeAreaView style={styles.root}>
        {renderModal()}
        <ScrollView
          contentContainerStyle={{
            padding: 20,
          }}
        >
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                color: "black",
                fontSize: 16,
                fontWeight: "600",
              }}
            >
              Menu
            </Text>
            <View style={{alignItems: 'flex-end', marginRight: 7}}>
            <TouchableOpacity
              onPress={() => {
                setShowAddItemModal(true);
              }}
            > 
              <Ionicons name="add-outline" size={30} color={appColors.darkGrey} />
              {/* <Image
                style={{
                  width: 24,
                  height: 24,
                }}
                source={require("../../assets/imgs/new_plus_icon.png")}
              /> */}
            </TouchableOpacity>
            </View>
          </View>

          {foodItemList && foodItemList.length > 0 && foodItemList.map((item:any) => {
            return (
              <View
                style={{
                  borderWidth: 2,
                  borderRadius: 8,
                  borderColor: '#FAF9F6',
                  shadowColor: '#E2DFD2',
    elevation: 5,
    shadowOpacity: 0.9,
                }}
              >
                
                <View style={{flexDirection: 'row',alignItems: 'flex-end', marginRight: 5,  marginTop: 10, 
    justifyContent: 'flex-end'}}>
                <TouchableOpacity
                  onPress={() => {
                    removeFromList(item)
                    
                  }}
                >
                <Ionicons  onPress={()=>{
  removeFromList(item)
}}  name="close-outline" size={30} color={appColors.darkGrey} />
                  </TouchableOpacity>
</View>

                  <View style={{flexDirection: "row",alignItems: "center", justifyContent: 'space-between', marginLeft: 20, marginBottom: 35}}>
                <Image
                  source={{
                    uri: "http://ec2-44-201-171-84.compute-1.amazonaws.com:4005" + item.image
                  }}
                  style={{
                    width: 120,
                    height: 100,
                  }}
                />
                <View style={{alignItems: "center", justifyContent: 'center'}}>
                <Text
                  style={{
                    color: "black",
                    fontSize: 16,
                    fontWeight: "600",
                    width: 100
                  }}
                >
                  {item.name}
                </Text>
                </View>
                <View style={{alignItems: "center", justifyContent: 'center'}}>
                <Text
                  style={{
                    color: "black",
                    fontSize: 16,
                    fontWeight: "600",marginRight: 20
                    
                  }}
                >
                  PKR {item.price}
                </Text>
                </View>
                </View>
                </View>
              );
            })}
        </ScrollView>
      </SafeAreaView>
    );
  }
  console.log("=====================================categoriesAndRestaurants", categoriesAndRestaurants)
  console.log("=====================================categoriesAndRestaurants", categoriesAndRestaurants?.data?.categories)
  console.log("=====================================categoriesAndRestaurants", categoriesAndRestaurants?.data?.restaurants)
  return (
    <SafeAreaView style={styles.root}>
      <ScrollView>
        {/* <AppCaraosaul /> */}
        <View style={{ paddingRight: 16, paddingLeft: 16, paddingBottom: 16 }}>
          <View>
            <Text
              style={[
                styles.ffgt,
                styles.fs20,
                { color: "#34283E", fontWeight: "500" },
              ]}
            >
              Categories
            </Text>
            {!categoriesAndRestaurants?.isLoading && categoriesAndRestaurants?.data?.categories ? (
              <AppOurFavoritesList
                categoryList={categoriesAndRestaurants?.data?.categories}
                selectCategory = {selectCategory}
              />
            ) : null}
          </View>
          {!categoriesAndRestaurants?.isLoading && categoriesAndRestaurants?.data && (
            <View style={styles.mt10}>
              <Text style={[styles.ffgt, styles.fs20, { color: "#34283E" }]}>
                Restaurants
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                }}
              >
                {categoriesAndRestaurants?.data?.restaurants?.map(
                  (individualProduct: any, index: any) => {
                    console.log(`individualProduct`, individualProduct);
                    return (
                      <AppResturantsCard
                        key={index}
                        id={individualProduct.restaurant_id}
                        name={individualProduct.name}
                        image={individualProduct.image}
                        // amount={individualProduct.product.amount}
                        // quantity={individualProduct.product.quantity}
                        // weight={individualProduct.product.weight}
                        // description={individualProduct.product.description}
                        // stock_status={individualProduct.product.stock_status}
                        // is_published={individualProduct.product.is_published}
                        // created_at={individualProduct.product.created_at}
                        // updated_at={individualProduct.product.updated_at}
                        is_wishlist={false}
                      />
                    );
                  }
                )}
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
