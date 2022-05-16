import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  AsyncStorage,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Modal from "react-native-modal";
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
const profileList = [
  {
    id: 1,
    name: "Payment Information",
    image: require("../../assets/imgs/paymentInformation.png"),
  },
  {
    id: 2,
    name: "Orders",
    image: require("../../assets/imgs/order.png"),
    value: "0",
  },
  {
    id: 3,
    name: "Favourites",
    image: require("../../assets/imgs/favourite.png"),
    value: "2",
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
  }

  console.log("userState in profiles2", userState)

  
  let userData: any;
  if (userState?.customer) {
  } else {
    userData = JSON?.parse(userState);
  }
  const dispatch = useDispatch();
  var getProfile: any = useGetProfile(userData?.user?.id);

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
    setImagePath(base_url + getProfile?.data?.data[0]?.image);
  }



  const navigation = useNavigation<any>();
  const [openOrderModal, setOpenOrderModal] = useState<boolean>(false);
  const [openPaymentModal, setOpenPaymentModal] = useState<boolean>(false);
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
    if (id == 1) {
      // setOpenPaymentModal(!openPaymentModal);
    } else if (id == 2) {
      // setOpenOrderModal(!openOrderModal);
      setOpenPaymentModal(!openPaymentModal);
      navigation.navigate("OrderScreen");
    } else if (id == 3) {
      // setOpenOrderModal(!openOrderModal);
      setOpenPaymentModal(!openPaymentModal);
      navigation.navigate("FavouritesScreen");
    } else if (id == 4) {
      // setOpenOrderModal(!openOrderModal);
      setOpenPaymentModal(!openPaymentModal);
      navigation.navigate(
        "AppUserBasicProfile",
        getProfile?.data?.data[0]
      );
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
      userId: userData?.user?.id.toString(),
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
    ImagePicker.openPicker({
      width: 63,
      height: 63,
      cropping: true,
    }).then((image: { path: React.SetStateAction<string> }) => {
      //@ts-ignore
      setImagePath(image.path);
      postImage(image.path);
    }).catch((callBack)=>{ // you forgot to add catch to this promise.
      console.log(callBack); // Please handle the callBack here.
     });
  }
  console.log("image path is", imagePath);
  async function postImage(image_Path: any) {
    var form_data = new FormData();
    form_data.append("image", {
      uri: image_Path,
      name: "image.jpg",
      type: "image/jpg",
      user_id: userState?.customer?.id
    });

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

    if (isRestaurantMenuScreen){
    return (
      <SafeAreaView>
 <Text>Profile Menu for restaurant mananger</Text>
 <View style={innerStyles.mainProfileCover}>
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
                  ? imagePath
                  : "https://cdn1.vectorstock.com/i/thumb-large/22/05/male-profile-picture-vector-1862205.jpg",
            }}
            style={innerStyles.image}
            resizeMode={"cover"}
          />
          <Image
            style={{
              height: 24,
              width: 24,
              marginTop: -50,
              marginLeft: 60,
            }}
            source={require("../../assets/imgs/blue-edit-pen.png")}
          />
        </TouchableOpacity>
        <View style={{ marginTop: 30, marginRight: 30, width: "35%" }}>
          <Text style={(style.ffbl, { fontSize: 19, fontWeight: "500" })}>
            {getProfile?.data?.data[0]?.fname}
            {" "}
            {getProfile?.data?.data[0]?.lname}
          </Text>
          <Text style={(style.ffbl, { fontSize: 19, fontWeight: "500" })}>
           {getProfile?.data?.data[0]?.mobileno}
          </Text>
        </View>
      </View>

 <TouchableOpacity>
   <Text onPress={()=>{
      dispatch(logOutUser());
   }}>Log out</Text>
 </TouchableOpacity>
    </SafeAreaView>

    )
    }
  return (
    <SafeAreaView>
      <View style={innerStyles.mainProfileCover}>
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
                  ? imagePath
                  : "https://cdn1.vectorstock.com/i/thumb-large/22/05/male-profile-picture-vector-1862205.jpg",
            }}
            style={innerStyles.image}
            resizeMode={"cover"}
          />
          <Image
            style={{
              height: 24,
              width: 24,
              marginTop: -50,
              marginLeft: 60,
            }}
            source={require("../../assets/imgs/blue-edit-pen.png")}
          />
        </TouchableOpacity>
        <View style={{ marginTop: 30, marginRight: 30, width: "35%" }}>
          <Text style={(style.ffbl, { fontSize: 19, fontWeight: "500" })}>
            {getProfile?.data?.data[0]?.fname}
            {" "}
            {getProfile?.data?.data[0]?.lname}
          </Text>
          <Text style={(style.ffbl, { fontSize: 19, fontWeight: "500" })}>
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
  image: {
    height: 70,
    width: 70,
    borderRadius: 35,
    margin: 20,
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
