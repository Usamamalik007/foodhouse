import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
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
import { useGetAddress } from "../../hooks/User/Address/useGetAddress";
import { useGetProfile } from "../../hooks/User/Profile/useGetProfile";
import { useUpdateBillingAddress } from "../../hooks/User/Address/useUpdateBillingAddress";
import { useUpdateShippingAddress } from "../../hooks/User/Address/useUpdateShippingAddress";
import ImagePicker from "react-native-image-crop-picker";
const profileList = [
  {
    id: 1,
    name: "Address book",
    image: require("../../assets/imgs/locationMarker.png"),
  },
  {
    id: 2,
    name: "Payment Information",
    image: require("../../assets/imgs/paymentInformation.png"),
  },
  {
    id: 3,
    name: "Orders",
    image: require("../../assets/imgs/order.png"),
    value: "0",
  },
  {
    id: 4,
    name: "Favourites",
    image: require("../../assets/imgs/favourite.png"),
    value: "2",
  },
  {
    id: 5,
    name: "Edit Profile",
    image: require("../../assets/imgs/user.png"),
  },
  {
    id: 6,
    name: "Log Out",
    image: require("../../assets/imgs/logout.png"),
  },
];

const { width } = Dimensions.get("screen");
export default function ProfileScreen() {
  const userState: any = useAppSelector((state) => state?.user?.user);
  let userData: any;
  if (userState?.user) {
  } else {
    userData = JSON?.parse(userState);
  }
  const dispatch = useDispatch();
  const address: any = useGetAddress();
  let getProfile: any = useGetProfile(userData?.user?.id);

  console.log("getProfile", JSON.stringify(getProfile));
  useFocusEffect(
    React.useCallback(() => {
      getProfile.refetch();
      address.refetch();
    }, [])
  );

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
      phoneno: getProfile?.data?.customer?.user?.phone_number,
    },
  });

  const changeValue = (id: number) => {
    if (id == 1) {
      setOpenOrderModal(!openOrderModal);
    } else if (id == 2) {
      setOpenPaymentModal(!openPaymentModal);
    } else if (id == 4) {
      setOpenOrderModal(!openOrderModal);
      setOpenPaymentModal(!openPaymentModal);
      navigation.navigate("FavouritesScreen");
    } else if (id == 3) {
      setOpenOrderModal(!openOrderModal);
      setOpenPaymentModal(!openPaymentModal);
      navigation.navigate("OrderScreen");
    } else if (id == 5) {
      setOpenOrderModal(!openOrderModal);
      setOpenPaymentModal(!openPaymentModal);
      navigation.navigate(
        "AppUserBasicProfile",
        getProfile?.data?.customer?.user
      );
    } else if (id == 6) {
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

  const onSubmitShippingAddress = (id: number) => {
    updateShipAddress.mutate(id);
  };

  const updateShipAddress = useUpdateShippingAddress({
    onSuccess(res) {
      navigation.goBack();
      SnackbarSuccess("Shipping Address Updated.");
    },
    onError(err) {
      SnackbarError("Error in Updating");
      setEdit(false);
    },
  });

  const onSubmitBillingAddress = (id: number) => {
    updateBillAddress.mutate(id);
  };

  const updateBillAddress = useUpdateBillingAddress({
    onSuccess(res) {
      navigation.goBack();
      SnackbarSuccess("Shipping Address Updated.");
    },
    onError(err) {
      SnackbarError("Error in Updating");
      setEdit(false);
    },
  });
  const [imagePath, setImagePath] = useState<string>("");
  const imageLocation =
    imagePath && imagePath.length > 0
      ? imagePath
      : "../../assets/imgs/women.png";
  function openImagePicker() {
    ImagePicker.openPicker({
      width: 63,
      height: 63,
      cropping: true,
    }).then((image: { path: React.SetStateAction<string> }) => {
      //@ts-ignore
      setImagePath(image.path);
    });
  }
  const no_photo_url =
    "http://panionprodupdated-env.eba-4pmuehik.eu-central-1.elasticbeanstalk.com";
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
            {getProfile?.data?.customer?.user?.first_name}
            {""}
            {getProfile?.data?.customer?.user?.last_name}
          </Text>
          <Text style={(style.ffbl, { fontSize: 19, fontWeight: "500" })}>
            {getProfile?.data?.customer?.user?.phone_number}
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

      {/* <View>
        <Modal
          isVisible={openOrderModal}
          hasBackdrop={true}
          deviceWidth={width}
          backdropTransitionOutTiming={0}
          animationInTiming={400}
          style={{
            justifyContent: 'flex-end',
            bottom: 0,
            margin: 0,
            height: 450,
          }}
          onBackButtonPress={() => {
            setOpenOrderModal(!openOrderModal);
          }}
          onBackdropPress={() => {
            setOpenOrderModal(!openOrderModal);
          }}>
          <View style={innerStyles.container}>
            <View style={[innerStyles.modalContainer, ,]}>
              <View
                style={{
                  alignSelf: 'center',
                }}>
                <AppTextTitle title={'Address Book'} />
              </View>
              <ScrollView
                style={{
                  height: address?.data?.response?.length > 2 ? 250 : 210,
                }}>
                {address?.data?.response?.map((add: any, index: number) => {
                  return (
                    <View style={{}} key={index}>
                      <View
                        style={{
                          padding: 14,
                          borderTopWidth: index % 2 == 0 ? 1 : 0,
                          borderBottomWidth: index % 2 == 0 ? 1 : 0,
                          borderColor: '#000000',
                        }}>
                        <Text style={{color: '#070A0D'}}>
                          Address # {index + 1}
                        </Text>
                        <Text style={{color: '#070A0D', marginVertical: 5}}>
                          {add?.address_line1} {add?.address_line2} {add?.city}{' '}
                          {add?.country?.name}
                        </Text>
                        <View style={{flexDirection: 'row', marginVertical: 5}}>
                          <TouchableOpacity
                            onPress={() =>
                              navigation.navigate('AppUpdateAddress', add)
                            }>
                            <Text
                              style={{
                                fontWeight: '700',
                                color: '#070A0D',
                                fontSize: 12,
                              }}>
                              Update
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity>
                            <Text
                              style={{
                                fontWeight: '700',
                                color: '#070A0D',
                                fontSize: 12,
                                marginLeft: 7,
                              }}>
                              Remove
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => onSubmitBillingAddress(add.id)}>
                            <Text
                              style={{
                                fontWeight: '700',
                                color: '#070A0D',
                                fontSize: 12,
                                marginLeft: 7,
                              }}>
                              Set as billing Address
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => onSubmitShippingAddress(add.id)}>
                            <Text
                              style={{
                                fontWeight: '700',
                                color: '#070A0D',
                                fontSize: 12,
                                marginLeft: 7,
                              }}>
                              Set as shipping Address
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </ScrollView>

              <TouchableOpacity style={{width: '90%', alignSelf: 'center'}}>
                <AppAddToCart
                  title={'Add New Address'}
                  navigationScreen="AppAddAddress"
                />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View> */}

      {/* Payment Modal Open */}
      {/* <View>
        <Modal
          isVisible={openPaymentModal}
          hasBackdrop={true}
          deviceWidth={width}
          backdropTransitionOutTiming={0}
          animationInTiming={600}
          style={{justifyContent: 'flex-end', bottom: 0, margin: 0}}
          onBackButtonPress={() => {
            setOpenPaymentModal(!openPaymentModal);
          }}
          onBackdropPress={() => {
            setOpenPaymentModal(!openPaymentModal);
          }}>
          <View style={innerStyles.container}>
            <View style={innerStyles.modalContainer}>
              <View
                style={{
                  alignSelf: 'center',
                }}>
                <AppTextTitle title={'Payment Information'} />
              </View>
              <ScrollView>
                <View
                  style={{
                    padding: 16,
                    borderWidth: 1,
                    borderColor: '#000000',
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <View>
                      <Text>mastercard</Text>
                    </View>
                    <Text>*** *** **** 3409</Text>
                  </View>
                  <View style={{flexDirection: 'row', marginVertical: 5}}>
                    <TouchableOpacity
                      onPress={() => {
                        console.log('Pressed update');
                      }}>
                      <Text
                        style={{
                          fontWeight: '700',
                          color: '#070A0D',
                          fontSize: 12,
                        }}>
                        Update
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity>
                      <Text
                        style={{
                          fontWeight: '700',
                          color: '#070A0D',
                          fontSize: 12,
                          marginLeft: 7,
                        }}>
                        Remove
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={{padding: 16}}>
                  <View style={{flexDirection: 'row'}}>
                    <View>
                      <Text>mastercard</Text>
                    </View>
                    <Text>*** *** **** 3409</Text>
                  </View>
                  <View style={{flexDirection: 'row', marginVertical: 5}}>
                    <TouchableOpacity>
                      <Text
                        style={{
                          fontWeight: '700',
                          color: '#070A0D',
                          fontSize: 12,
                        }}>
                        Update
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity>
                      <Text
                        style={{
                          fontWeight: '700',
                          color: '#070A0D',
                          fontSize: 12,
                          marginLeft: 7,
                        }}>
                        Remove
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <AppAddToCart title={'Add New'} />
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View> */}
    </SafeAreaView>
  );
}

const innerStyles = StyleSheet.create({
  mainProfileCover: {
    flexDirection: "row",
    height: 110,
    backgroundColor: appColors.white,
    // justifyContent: 'space-between',
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
