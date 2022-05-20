import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Modal from "react-native-modal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useForm } from "react-hook-form";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import style from "../../assets/css/style";
import AppOptionCard from "../../component/AppOptionCard";
import { appColors } from "../../utils/colors";
import AppAddToCart from "../../component/AppAddToCart";
import AppTextTitle from "../../component/AppTextTitle";
import { logOutUser } from "../../store/userSlice";
import { useLogoutUser } from "../../hooks/Auth/useLogoutUser";
import { AppTextInput } from "../../component/AppTextInput";
import { useUpdatePhoneNo } from "../../hooks/User/useUpdatePhoneNo";
import { useAppSelector } from "../../store/hooks";
import { SnackbarSuccess, SnackbarError } from "../../utils/SnackBar";
import { useGetProfile } from "../../hooks/User/Profile/useGetProfile";

import ImagePicker from "react-native-image-crop-picker";
import { sleep } from "react-query/types/core/utils";
let profileList = [
 
  {
    id: 2,
    name: "Orders",
    image: require("../../assets/imgs/order.png")
  },
  {
    id: 3,
    name: "Favourites",
    image: require("../../assets/imgs/favourite.png"),
  },
  {
    id: 4,
    name: "Edit Profile",
    image: require("../../assets/imgs/user.png"),
  },
  {
    id: 5,
    name: "Log Out",
    image: require("../../assets/imgs/logout.png"),
  },
];

const { width } = Dimensions.get("screen");
export default function ProfileScreen() {
  const [imagePath, setImagePath] = useState<string>("");

  //console.log("userData", userData);
  //console.log("userState", userState);

  let userState: any = useAppSelector((state) => state?.user);
  
  if (typeof(userState.user) != 'object'){
    userState = JSON.parse(userState.user)
  }
  else {
    userState = userState.user
  }

  let isRestaurantMenuScreen = false;

  if (userState?.customer?.role == 1) {
    isRestaurantMenuScreen = true;
    profileList=[
      {
        id: 4,
        name: "Edit Profile",
        image: require("../../assets/imgs/user.png"),
      },
      {
        id: 5,
        name: "Log Out",
        image: require("../../assets/imgs/logout.png"),
      },
    ]
  } else{
    profileList = [
 
      {
        id: 2,
        name: "Orders",
        image: require("../../assets/imgs/order.png")
      },
      {
        id: 3,
        name: "Favourites",
        image: require("../../assets/imgs/favourite.png"),
      },
      {
        id: 4,
        name: "Edit Profile",
        image: require("../../assets/imgs/user.png"),
      },
      {
        id: 5,
        name: "Log Out",
        image: require("../../assets/imgs/logout.png"),
      },
    ];
  }

  console.log("userState in profiles2", userState)
  console.log("profileList in profiles2", profileList)

  
  const dispatch = useDispatch();
  var getProfile: any = useGetProfile(userState?.user?.id);

  console.log('getProfile ', JSON.stringify(getProfile?.data?.data[0]))

  let base_url = "http://ec2-44-201-171-84.compute-1.amazonaws.com:4005";
  console.log("dataISNow", JSON.stringify(getProfile));
  useFocusEffect(

    React.useCallback(() => {

      console.log('focusss')
      getProfile.refetch();
      fetchData();
      // setTimeout(() => {
      //   setImagePath(base_url + getProfile?.data.data[0].image);
      // }, 100);
    }, [])
  );
  function sleep(ms: number | undefined) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  async function fetchData() {

    console.log(getProfile?.data?.data[0])
    setImagePath(getProfile?.data?.data[0]?.image);
  }



  const navigation = useNavigation<any>();
  const [openOrderModal, setOpenOrderModal] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phoneno: '03366720071'
    },
  });

  const changeValue = (id: number) => {
   if (id == 2) {
      // setOpenOrderModal(!openOrderModal);
      navigation.navigate("OrderScreen");
    } else if (id == 3) {
      // setOpenOrderModal(!openOrderModal);
      navigation.navigate("FavouritesScreen");
    } else if (id == 4) {
      // setOpenOrderModal(!openOrderModal);
      if(getProfile?.data?.data[0]?.role===0){
        navigation.navigate(
          "AppUserBasicProfile",
          getProfile?.data?.data[0]
        );
      } else{
        navigation.navigate(
          "AppRestaurantBasicProfile",
          getProfile?.data?.data[0]
        );
      }
    } else if (id == 5) {
      dispatch(logOutUser());
    }
  };

  const logoutUser = useLogoutUser({
    async onSuccess(res) {
      console.log("response", res);
      dispatch(logOutUser());
    },
  });

  const onSubmitSavePhoneNo = handleSubmit((values: any) => {
    console.log(`values handleSubmit`, values);
    changePhoneNumber.mutate({
      phoneNumber: values?.phoneno.toString(),
      userId: userState?.user?.id.toString(),
    });
  });
  const changePhoneNumber = useUpdatePhoneNo({
    onSuccess(res) {
      setEdit(false);
      SnackbarSuccess("Successfully Updated your Phone No");
      navigation.goBack();
    },
    onError() {
      SnackbarError("Error in Updating");
      setEdit(false);
    },
  });



  function openImagePicker() {
    try{
      ImagePicker.openPicker({
        cropping: true,
      }).then((image: { path: React.SetStateAction<string> }) => {
        //@ts-ignore
        setImagePath(image.path);
        postImage(image.path);
      }).catch((callBack)=>{ // you forgot to add catch to this promise.
        console.log(callBack); // Please handle the callBack here.
       });
    } catch(error){
      console.log(error); // Please handle the callBack here.

    }
   
  }
  console.log("image path is", imagePath);
  async function postImage(image_Path: any) {
    var form_data = new FormData();
    form_data.append("image", {
      uri: image_Path,
      name: "image.jpg",
      type: "image/jpg",
    });
    form_data.append("user_id", userState?.customer?.user_id)
    console.log("=u================================",userState)

    console.log("form_data", JSON.stringify(form_data));
    try {
      let response:any = await fetch(base_url + "/uploadImage", {
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
        setImagePath(response?.data);
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

  const no_photo_url =
    "http://panionprodupdated-env.eba-4pmuehik.eu-central-1.elasticbeanstalk.com";

  return (
    <SafeAreaView>
      <View style={innerStyles.mainContainer}>
        <TouchableOpacity
          style={{}}
          onPress={() => {
            openImagePicker();
          }}
        >
          <Image
            source={{
              uri:
                imagePath && imagePath.length > 0
                  ? base_url + imagePath
                  : "https://cdn1.vectorstock.com/i/thumb-large/22/05/male-profile-picture-vector-1862205.jpg",
            }}
            style={innerStyles.image}
            resizeMode={"cover"}
          />
          <Image
            style={{
              height: 24,
              width: 24,
              marginTop: -40,
              marginLeft: 40,
            }}
            source={require("../../assets/imgs/blue-edit-pen.png")}
          />
        </TouchableOpacity>
        <View style={{ marginTop: 5, marginRight: 60, width: "60%" }}>
          <Text style={(style.ffbl, { fontSize: 18, fontWeight: "500" })}>
            {getProfile?.data?.data[0]?.fname}
            {" "}
            {getProfile?.data?.data[0]?.lname}
          </Text>
          <Text style={(style.ffbl, { fontSize: 18, fontWeight: "500" })}>
           {getProfile?.data?.data[0]?.mobileno}
          </Text>
        </View>
      </View>

      {profileList?.map((profile: any, index: any) => {
        return (
          <AppOptionCard
            key={index}
            data={profile}
            // setCurrentSelected={setCurrentSelected}
            changeValue={changeValue}
          />
        );
      })}
    </SafeAreaView>
  );
}

const innerStyles = StyleSheet.create({
  mainProfileCover: {
    flexDirection: "row",
    height: 110,
    backgroundColor: appColors.white,
  },
  mainContainer: {
    width: '95%',
    backgroundColor: appColors.white,
    elevation: 5,
    marginVertical: 8,
    marginHorizontal: 8,
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 35,
    marginLeft: 10,
  },
  editImage: {
    height: 55,
    width: 55,
    borderRadius: 50,
    margin: 20,
  },
  container: {
    flex: 1,
    justifyContent: "flex-end",
    // height: 350,
  },
  modalContainer: {
    backgroundColor: "white",
    // height: 582,
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
