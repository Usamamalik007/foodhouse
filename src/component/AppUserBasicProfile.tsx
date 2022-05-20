import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

// import CalendarIcon from '../assets/imgs/calender.svg';
import {AppTextInput} from './AppTextInput';
import {AppButton} from './AppButton';
import {useAddAddress} from '../hooks/User/Address/useAddAddress';
import {SnackbarError, SnackbarSuccess} from '../utils/SnackBar';
import {useDispatch} from 'react-redux';
import {useUpdateProfile} from '../hooks/User/Profile/useUpdateProfile';
import { useAppSelector } from "../store/hooks";
let base_url = "http://ec2-44-201-171-84.compute-1.amazonaws.com:4005";

const schema = yup.object().shape({
  fname: yup
    .string()
    .required('Please enter your First Name')
    .min(3, 'First Name should be 3 character long'),
  lname: yup
    .string()
    .required('Please enter your Last Name')
    .min(3, 'Last Name should be 3 character long'),
    address: yup
    .string()
    .required('Please enter your address')
    .min(8, 'Address should be at least 8 characters long'),
  mobileno: yup
    .string()
    .required('Please enter your Phone Number')
    .min(8, 'Phone Number should be 8 character long')
});

function AppUserBasicProfile(props: any) {
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      fname: props?.route?.params?.fname,
      address: props?.route?.params?.address,
      lname: props?.route?.params?.lname,
      mobileno: props?.route?.params?.mobileno,
    },
  });

  const userData = props?.route?.params;
  console.log("=======================================AppUserBasicProfile", userData)
  console.log("=======================================props", props?.route?.params)
  const navigation = useNavigation<any>();
  let userState: any = useAppSelector((state) => state?.user);

  if (typeof userState.user != "object") {
    userState = JSON.parse(userState.user);
  } else {
    userState = userState.user;
  }

 
  const onSubmit = handleSubmit( async (values) =>{
    console.log("Hello world")
    try {
        let requestBody = {
            fname: values.fname,
            lname: values.lname,
            address: values.address,
            mobileno: values.mobileno,
            password: props?.route?.params?.password
        }
        console.log("requestBody", requestBody);
        // let response: any  = {};
        let response: any = await fetch(base_url + "/updateUser",{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + userState?.token,
          },body: JSON.stringify(requestBody)
        });
        response = await response.json();
        console.log("responseiso", response);
        if (response.statusCode === 200) {
        // tempList = JSON.parse(JSON.stringify(categoriesAndRestaurants))
        console.log("--------------------------------------------------------------response",response)
        SnackbarSuccess(response?.message);
        navigation.navigate("ProfileScreen");
      } else {
        console.log(JSON.stringify(response))
        SnackbarError(response?.message);
      }
      } catch (e) {
        console.log("responseiso", e);
        throw e;
      }
  });

  const updateProfileRequest = useUpdateProfile({
    async onSuccess(res) {
      // navigation.navigate('ProfileScreen');
      SnackbarSuccess('Successfully Updated');
      reset();
    },
    onError(err) {
      SnackbarError(err.message);
    },
  });

  return (
    <View style={innerStyles.main_container}>
      <View style={innerStyles.loginContainer}>
        <View style={innerStyles.input_Container}>
          <AppTextInput
            name="fname"
            outerViewProps={{style: {height: 45}}}
            control={control}
            textInputProps={{
              placeholder: 'First Name',
              style: {fontSize: 14, color: 'black', backgroundColor: 'white'},
            }}
          />
          {errors.fname && (
            <Text style={innerStyles.errorField}>
              {errors.fname['message']}
            </Text>
          )}

          <AppTextInput
            name="lname"
            outerViewProps={{style: {height: 45}}}
            control={control}
            textInputProps={{
              placeholder: 'Last Name',
              style: {fontSize: 14, color: 'black', backgroundColor: 'white'},
            }}
          />

          <AppTextInput
            name="address"
            outerViewProps={{style: {height: 45}}}
            control={control}
            textInputProps={{
              placeholder: 'Address',
              style: {fontSize: 14, color: 'black', backgroundColor: 'white'},
            }}
          />

          {errors.address && (
            <Text style={[innerStyles.errorField, {marginBottom: 5}]}>
              {errors.address['message']}
            </Text>
          )}
          {errors.lname && (
            <Text style={innerStyles.errorField}>
              {errors.lname['message']}
            </Text>
          )}

          {/* <AppDatePicker
            name="dob"
            control={control}
            minimumDate={new Date(new Date().getTime() + 86400000)}
            outerViewProps={{style: {marginBottom: 5}}}
            textInputProps={{
              placeholder: 'Job Start Date',
              style: {fontSize: 14, color: 'black', borderRadius: 0},
            }}
            // icon={CalendarIcon}
          /> */}

          {/* {errors.dob && (
            <Text style={[innerStyles.errorField]}>
              {errors.dob['message']}
            </Text>
          )} */}

          <AppTextInput
            name="mobileno"
            outerViewProps={{style: {height: 45}}}
            control={control}
            textInputProps={{
              placeholder: 'Phone Number',
              keyboardType: 'numeric',
              style: {fontSize: 14, color: 'black', backgroundColor: 'white'},
            }}
          />

          {errors.mobileno && (
            <Text style={[innerStyles.errorField, {marginBottom: 5}]}>
              {errors.mobileno['message']}
            </Text>
          )}

          {/* <AppDropdown
            name="gender"
            control={control}
            outerViewProps={{style: {borderRadius: 0}}}
            dropdownInputProps={{placeholder: 'Gender'}}
            data={[
              {label: 'Male', value: 'Male'},
              {label: 'Female', value: 'Female'},
            ]}
          />
          {errors.gender && (
            <Text style={[innerStyles.errorField, {marginVertical: 5}]}>
              {errors.gender['message']}
            </Text>
          )} */}

          <AppButton
            text="Update Profile"
            buttonProps={{
              onPress: onSubmit,
              style: {
                marginTop: 10,
                backgroundColor: '#429b44',
                marginVertical: 20,
                height: 45,
                borderRadius: 5,
              },
            }}
            innerTextProps={{
              style: {
                fontWeight: '700',
                fontSize: 14,
                color: 'white',
              },
            }}
          />
        </View>
      </View>
    </View>
  );
}

export default AppUserBasicProfile;

const innerStyles = StyleSheet.create({
  main_container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    // justifyContent: 'center',
  },
  loginContainer: {
    alignItems: 'center',
    // marginTop: -45,
  },
  message: {
    width: 200,
    marginBottom: 10,
  },
  boldText: {
    fontWeight: '700',
    color: 'white',
    marginLeft: 5,
  },
  mainHeading: {
    color: 'black',
    fontSize: 22,
    marginVertical: 10,
  },
  plainText: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
  },
  input_Container: {
    width: 350,
    marginTop: 20,
    // height: 70,
  },
  forgetPassword: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  errorField: {
    fontSize: 12,
    color: 'red',
    fontFamily: 'OpenSans-Regular',
  },
});
