import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import LoginScreen from "./src/screen/LoginScreen/LoginScreen";
import RestaurantRegistrationScreen from "./src/screen/RestaurantRegistrationScreen/RestaurantRegistrationScreen";
import HomeScreen from "./src/screen/HomeScreen/HomeScreen";
import CatalogueScreen from "./src/screen/CatalogueScreen/CatalogueScreen";
import FavouritesScreen from "./src/screen/FavouritesScreen/FavouritesScreen";
import { useAppSelector } from "./src/store/hooks";
import ProfileScreen from "./src/screen/ProfileScreen/ProfileScreen";
import CartScreen from "./src/screen/CartScreen/CartScreen";
import { appColors } from "./src/utils/colors";
import AppHamburgerMenu from "./src/component/AppHamburgerMenu";
import RegistrationScreen from "./src/screen/RegistrationScreen/RegistrationScreen";
import ForgetScreen from "./src/screen/ForgetScreen/ForgetScreen";
import CatalogueScreenLvlTwo from "./src/screen/CatalogueScreen/CatalogueScreenLvlTwo";
import AppHeaderBackButton from "./src/component/AppHeaderBackButton";
import ItemScreen from "./src/screen/ItemScreen/ItemScreen";
import ProductDetailScreen from "./src/screen/ProductDetailScreen/ProductDetailScreen";
import ProductFilterScreen from "./src/screen/ProductFilterScreen/ProductFilterScreen";
import CheckoutScreen from "./src/screen/CheckoutScreen/CheckoutScreen";
import OrderScreen from "./src/screen/OrderScreen/OrderScreen";
import MapScreen from "./src/screen/MapScreen/MapScreen";
import AppAddAddress from "./src/component/AppAddAddress";
import AppUpdateAddress from "./src/component/AppUpdateAddress";
import AppUserBasicProfile from "./src/component/AppUserBasicProfile";
import AppRestaurantBasicProfile from "./src/component/AppRestaurantBasicProfile";
import CatalogueScreenLvlThree from "./src/screen/CatalogueScreen/CatalogueScreenLvlThree";
import CatalogueScreenLvlFour from "./src/screen/CatalogueScreen/CatalogueScreenLvlFour";
import HomeMenus from "./src/screen/HomeScreen/HomeMenus";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
const MainStack = createStackNavigator();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
// export const userKey = "userKey";

const tempData = AsyncStorage.getItem("user_data");

const LogoTitle260 = () => {
  return (
    <Image
      style={{ width: 140, height: 40 }}
      source={require("./src/assets/imgs/logo2.jpeg")}
      resizeMode={"contain"}
    />
  );
};

const LogoTitle340 = () => {
  return (
    <Image
      style={{ width: 140, height: 40 }}
      source={require("./src/assets/imgs/logo2.jpeg")}
      resizeMode={"contain"}
    />
  );
};
export function MainFlow() {
  const isRole = tempData.toString().includes("role");
  console.log("dataisNowOuui", JSON.stringify(tempData));
  let isRestaurantMenuScreen = false;
  let userState: any = useAppSelector((state) => state?.user);

  if (typeof userState.user != "object") {
    userState = JSON.parse(userState.user);
  } else {
    userState = userState.user;
  }
  if (userState?.customer?.role == 1) {
    isRestaurantMenuScreen = true;
  }
  console.log("======================================isRestaurantMenuScreen", isRestaurantMenuScreen)
  if(!isRestaurantMenuScreen){
  console.log("======================================BottomTabNavigator")
  return (
      <MainStack.Navigator
        initialRouteName="AppAddAddress"
        screenOptions={{
          headerTintColor: "black",
          cardStyle: { backgroundColor: "#fff" },
        }}
      >
        <MainStack.Screen
          options={{
            headerShown: false,
          }}
          // const AppUserBasicProfile={AppUserBasicProfile}
          name="BottomTabNavigator"
          component={BottomTabNavigator}
        />
        {/* <MainStack.Screen
          options={{
            headerShown: false,
          }}
          // const AppUserBasicProfile={AppUserBasicProfile}
          name="SecondBottomTabNavigator"
          component={SecondBottomTabNavigator}
        /> */}
      </MainStack.Navigator>
    );
  } else{
    console.log("======================================SecondBottomTabNavigator")
    return (
      <MainStack.Navigator
        initialRouteName="AppAddAddress"
        screenOptions={{
          headerTintColor: "black",
          cardStyle: { backgroundColor: "#fff" },
        }}
      >
        <MainStack.Screen
          options={{
            headerShown: false,
          }}
          // const AppUserBasicProfile={AppUserBasicProfile}
          name="SecondBottomTabNavigator"
          component={SecondBottomTabNavigator}
        />
        {/* <MainStack.Screen
          options={{
            headerShown: false,
          }}
          // const AppUserBasicProfile={AppUserBasicProfile}
          name="SecondBottomTabNavigator"
          component={SecondBottomTabNavigator}
        /> */}
      </MainStack.Navigator>
    );
  }
 
}

export function AuthFlow() {
  return (
    <MainStack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{
        headerTintColor: "black",
        cardStyle: { backgroundColor: "#fff" },
      }}
    >
      <MainStack.Screen
        options={{
          headerShown: false,
        }}
        name="LoginScreen"
        component={LoginScreen}
      />
      <MainStack.Screen
        options={{
          headerShown: false,
        }}
        name="RegistrationScreen"
        component={RegistrationScreen}
      />
      <MainStack.Screen
        options={{
          headerShown: false,
        }}
        name="RestaurantRegistrationScreen"
        component={RestaurantRegistrationScreen}
      />
      <MainStack.Screen
        options={{
          headerShown: false,
        }}
        name="ForgetScreen"
        component={ForgetScreen}
      />
    </MainStack.Navigator>
  );
}
function SecondBottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = "home";
          if (route.name === "MainScreenStack") {
            iconName = focused ? "restaurant" : "restaurant-outline";
          } else if (route.name === "CartScreenStack") {
            iconName = focused ? "list" : "list-outline";
          } else if (route.name === "ProfileScreenStack") {
            iconName = focused ? "person" : "person-outline";
          }
          return (
            <Ionicons name={iconName} size={size} color={appColors.darkGrey} />
          );
        },
      })}
    >
      <Tab.Screen
        name="MainScreenStack"
        options={{
          tabBarShowLabel: false,
          headerShown: false,
        }}
        component={MainScreenStack}
      />
      <Tab.Screen
        name="CartScreenStack"
        options={{
          tabBarShowLabel: false,
          headerShown: false,
        }}
        component={CartScreenStack}
      />
      <Tab.Screen
        name="ProfileScreenStack"
        options={{
          tabBarShowLabel: false,
          headerShown: false,
        }}
        component={ProfileScreenStack}
      />
    </Tab.Navigator>
  );
}
function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = "home";
          if (route.name === "MainScreenStack") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "CartScreenStack") {
            iconName = focused ? "cart" : "cart-outline";
          } else if (route.name === "FavouritesScreenStack") {
            iconName = focused ? "heart" : "heart-outline";
          } else if (route.name === "ProfileScreenStack") {
            iconName = focused ? "person" : "person-outline";
          }
          return (
            <Ionicons name={iconName} size={size} color={appColors.darkGrey} />
          );
        },
      })}
    >
      <Tab.Screen
        name="MainScreenStack"
        options={{
          tabBarShowLabel: false,
          headerShown: false,
        }}
        component={MainScreenStack}
      />
      <Tab.Screen
        name="CartScreenStack"
        options={{
          tabBarShowLabel: false,
          headerShown: false,
        }}
        component={CartScreenStack}
      />
      <Tab.Screen
        name="FavouritesScreenStack"
        options={{
          tabBarShowLabel: false,
          headerShown: false,
        }}
        component={FavouritesScreenStack}
      />
      <Tab.Screen
        name="ProfileScreenStack"
        options={{
          tabBarShowLabel: false,
          headerShown: false,
        }}
        component={ProfileScreenStack}
      />
    </Tab.Navigator>
  );
}
function MainScreenStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        // headerLeft: () => <AppHamburgerMenu />,
        headerLeft: () => <></>,
        headerTitle: () => <LogoTitle340 />,
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen
        name="ItemScreen"
        component={ItemScreen}
        options={{
          headerTitle: () => <LogoTitle260 />,
          headerLeft: () => <AppHeaderBackButton />,
        }}
      />
      <Stack.Screen
        name="ProductFilterScreen"
        component={ProductFilterScreen}
        options={{
          headerLeft: () => <AppHeaderBackButton />,
        }}
      />

      <Stack.Screen
        name="ProductDetailScreen"
        component={ProductDetailScreen}
      />
      <Stack.Screen name="HomeMenus" component={HomeMenus} />
      <Stack.Screen
        name="AppAddAddress"
        component={AppAddAddress}
        options={{
          headerLeft: () => <AppHeaderBackButton />,
          title: "Add Address",
        }}
      />
      <Stack.Screen
        name="AppUpdateAddress"
        component={AppUpdateAddress}
        options={{
          headerLeft: () => <AppHeaderBackButton />,
          title: "Update Address",
        }}
      />
    </Stack.Navigator>
  );
}

function CartScreenStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        // headerLeft: () => <AppHamburgerMenu />,
        headerLeft: () => <></>,
        headerTitle: () => <LogoTitle340 />,
      }}
    >
      <Stack.Screen name="CartScreen" component={CartScreen} />
      <Stack.Screen
        name="CheckoutScreen"
        component={CheckoutScreen}
        options={{
          headerTitle: () => <LogoTitle260 />,
          headerLeft: () => <AppHeaderBackButton />,
        }}
      />

      <Stack.Screen
        name="ItemScreen"
        component={ItemScreen}
        options={{
          headerTitle: () => <LogoTitle260 />,
          headerLeft: () => <AppHeaderBackButton />,
        }}
      />
      <Stack.Screen
        name="ProductFilterScreen"
        component={ProductFilterScreen}
        options={{
          headerLeft: () => <AppHeaderBackButton />,
        }}
      />
      <Stack.Screen
        name="ProductDetailScreen"
        component={ProductDetailScreen}
      />
      <Stack.Screen
        name="MapScreen"
        component={MapScreen}
        options={{ headerLeft: () => <AppHeaderBackButton /> }}
      />
      <Stack.Screen name="OrderScreen" component={OrderScreen} />
      <Stack.Screen
        name="AppAddAddress"
        component={AppAddAddress}
        options={{
          headerLeft: () => <AppHeaderBackButton />,
          title: "Add Address",
        }}
      />
      <Stack.Screen
        name="AppUpdateAddress"
        component={AppUpdateAddress}
        options={{
          headerLeft: () => <AppHeaderBackButton />,
          title: "Update Address",
        }}
      />
    </Stack.Navigator>
  );
}

function FavouritesScreenStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        // headerLeft: () => <AppHamburgerMenu />,
        headerLeft: () => <></>,
        headerTitle: () => <LogoTitle340 />,
      }}
    >
      <Stack.Screen name="FavouritesScreen" component={FavouritesScreen} />
      <Stack.Screen
        name="ItemScreen"
        component={ItemScreen}
        options={{
          headerTitle: () => <LogoTitle260 />,
          headerLeft: () => <AppHeaderBackButton />,
        }}
      />
      <Stack.Screen
        name="ProductFilterScreen"
        component={ProductFilterScreen}
        options={{
          headerLeft: () => <AppHeaderBackButton />,
        }}
      />
      <Stack.Screen
        name="ProductDetailScreen"
        component={ProductDetailScreen}
      />
      <Stack.Screen
        name="AppAddAddress"
        component={AppAddAddress}
        options={{
          headerLeft: () => <AppHeaderBackButton />,
          title: "Add Address",
        }}
      />
      <Stack.Screen
        name="AppUpdateAddress"
        component={AppUpdateAddress}
        options={{
          headerLeft: () => <AppHeaderBackButton />,
          title: "Update Address",
        }}
      />
    </Stack.Navigator>
  );
}

function ProfileScreenStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        // headerLeft: () => <AppHamburgerMenu />,
        headerLeft: () => <></>,
        headerTitle: () => <LogoTitle340 />,
      }}
    >
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen
        name="ItemScreen"
        component={ItemScreen}
        options={{
          headerTitle: () => <LogoTitle260 />,
          headerLeft: () => <AppHeaderBackButton />,
        }}
      />
      <Stack.Screen
        name="ProductDetailScreen"
        component={ProductDetailScreen}
      />
      <Stack.Screen
        name="ProductFilterScreen"
        component={ProductFilterScreen}
        options={{
          headerLeft: () => <AppHeaderBackButton />,
        }}
      />
      <Stack.Screen name="FavouritesScreen" component={FavouritesScreen} />
      <Stack.Screen name="OrderScreen" component={OrderScreen} />
      <Stack.Screen
        name="AppAddAddress"
        component={AppAddAddress}
        options={{
          headerLeft: () => <AppHeaderBackButton />,
          title: "Add Address",
        }}
      />
      <Stack.Screen
        name="AppUpdateAddress"
        component={AppUpdateAddress}
        options={{
          headerLeft: () => <AppHeaderBackButton />,
          title: "Update Address",
        }}
      />

      <Stack.Screen
        options={{
          headerLeft: () => <AppHeaderBackButton />,
          title: "Update Profile",
        }}
        name="AppUserBasicProfile"
        component={AppUserBasicProfile}
      />
     
     <Stack.Screen
        options={{
          headerLeft: () => <AppHeaderBackButton />,
          title: "Update Profile",
        }}
        name="AppRestaurantBasicProfile"
        component={AppRestaurantBasicProfile}
      />
    </Stack.Navigator>
  );
}
