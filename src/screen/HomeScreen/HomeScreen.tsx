import { getDate } from "date-fns";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  AsyncStorage,
  Image,
  TouchableOpacity,
  TouchableOpacityBase,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import { string } from "yup";
import {userKey, loadUserFromStorage} from '../../store/userSlice';

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

type addedItemType = {
  name: any;
  image: any;
  price: any;
};
const addedItem = {
  name: "name1",
  image: "image1",
  price: "price1",
};
const items = [
  {
    id: "id1",
    name: "name1",
    image: "image1",
    price: "price1",
  },
  {
    id: "id2",
    name: "name2",
    image: "image2",
    price: "price2",
  },
];
export default function HomeScreen() {

  let userState: any = useAppSelector((state) => state?.user);

  if (typeof(userState.user) != 'object'){
    userState = JSON.parse(userState.user)
  }
  else {
    userState = userState.user
  }

  console.log('myyyyuserstate, ', JSON.stringify(userState))
  
 
  console.log('loadUserFromStorage', JSON.stringify(loadUserFromStorage))

  let isRestaurantMenuScreen = false;
  console.log("userState for adeed", userState?.customer)
  console.log('ussssser key', JSON.stringify(userKey))
  
  if (userState?.customer?.role == 1) {
    isRestaurantMenuScreen = true;
  }


  const [foodItemList, setFoodItemList] = useState(items);
  const [addedFoodItem, setAddedFootItem] = useState<addedItemType[]>([]);
  const [itemName, setItemName] = useState<string>("");
  const [itemPrice, setItemPrice] = useState<string>();
  const [showAddItemModal, setShowAddItemModal] = useState<boolean>(false);
  const heroesList: any = useGetAllHeroes<IFeatureProductResponse[]>(
    userState?.customer?.id
  );
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
      })
      .catch((callBack) => {
        // you forgot to add catch to this promise.
        console.log(callBack); // Please handle the callBack here.
      });
  }
  async function getDataFromBackend(tempData: any) {
    const url = `http://ec2-44-201-171-84.compute-1.amazonaws.com:4005/getRestaurantMenu?restaurant_id=${userState?.customer?.restaurant_id}`;
    console.log("URL in getting groups is: ", url);
    console.log("tempData: ", tempData);
    tempData = JSON.parse(tempData)
    console.log("token: ", tempData.token);
    console.log("userState: ", userState);
    try {
      let response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer " + tempData.token,
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
useEffect(()=>{
getData()
},[])

 function getData(){
  AsyncStorage.getItem(userKey, (err, result) => {
    console.log("User key", result)
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

  //console.log("===========heroesList=========================");
  //console.log(JSON.stringify(heroesList));
  //console.log("===========heroesList=========================");
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
                fontSize: 20,
                fontWeight: "500",
                color: "black",
              }}
            >
              Enter the following data to add item
            </Text>
            <View
              style={{
                marginTop: 30,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "500",
                  color: "black",
                }}
              >
                Item name
              </Text>
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
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "500",
                  color: "black",
                  marginTop: 30,
                }}
              >
                Item Price
              </Text>
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
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "500",
                  color: "black",
                  marginTop: 30,
                }}
              >
                Pick Image
              </Text>
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
                    marginTop: 20,
                    borderColor: "grey",
                  }}
                >
                  <Image
                    source={{
                      uri:
                        imagePath && imagePath.length > 0
                          ? imagePath
                          : "https://cdn1.vectorstock.com/i/thumb-large/22/05/male-profile-picture-vector-1862205.jpg",
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
                    source={require("../../assets/imgs/blue-edit-pen.png")}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={{
                justifyContent: "center",
                alignItems: "center",
                height: 48,
                marginTop: 30,
                borderRadius: 12,
                backgroundColor: "blue",
              }}
              onPress={() => {
                let newObj = {
                  name: itemName,
                  price: itemPrice,
                };
                console.log("newobj", newObj);
              }}
            >
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "700",
                  color: "white",
                }}
              >
                Add item
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )
    );
  }
  async function removeFromList(item){
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
      let tempList = foodItemList.filter((foodItem) => {
        return foodItem.id !== item.id;
      });
      setFoodItemList(tempList);
      console.log("list", tempList);
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
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              Menu
            </Text>
            <TouchableOpacity
              onPress={() => {
                setShowAddItemModal(true);
              }}
            >
              <Image
                style={{
                  width: 24,
                  height: 24,
                }}
                source={require("../../assets/imgs/new_plus_icon.png")}
              />
            </TouchableOpacity>
          </View>

          {foodItemList && foodItemList.length > 0 && foodItemList.map((item) => {
            return (
              <View
                style={{
                  marginTop: 30,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Image
                  source={{
                    uri: "http://ec2-44-201-171-84.compute-1.amazonaws.com:4005" + item.image
                  }}
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                  }}
                />
                <Text
                  style={{
                    color: "black",
                    fontSize: 18,
                    fontWeight: "500",
                  }}
                >
                  {item.name}
                </Text>
                <Text
                  style={{
                    color: "black",
                    fontSize: 18,
                    fontWeight: "500",
                  }}
                >
                  PKR {item.price}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    removeFromList(item)
                    
                  }}
                >
                  <Image
                    style={{
                      width: 24,
                      height: 24,
                    }}
                    source={require("../../assets/imgs/new-blackish-cross.png")}
                  />
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    );
  }
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
            {!heroesList.isLoading && heroesList.data?.data?.categories ? (
              <AppOurFavoritesList
                categoryList={heroesList.data.data.categories}
              />
            ) : null}
          </View>
          {!heroesList.isLoading && heroesList?.data?.data && (
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
                {heroesList?.data.data.restaurants?.map(
                  (individualProduct: any, index: any) => {
                    console.log(`individualProduct`, individualProduct);
                    return (
                      <AppResturantsCard
                        key={index}
                        id={individualProduct.id}
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
