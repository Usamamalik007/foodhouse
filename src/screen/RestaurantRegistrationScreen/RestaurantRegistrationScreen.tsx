import React, { useState } from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

import {AppTextInput} from '../../component/AppTextInput';
import {AppButton} from '../../component/AppButton';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useRestaurantRegisterUser} from '../../hooks/Auth/useRestaurantRegisterUser';
import {SnackbarSuccess, SnackbarError} from '../../utils/SnackBar';
import { RadioButton } from 'react-native-paper';
import { validateFieldsNatively } from '@hookform/resolvers';


const schema = yup.object().shape({
  restaurant_name: yup
    .string()
    .required('*Please enter your first name')
    .min(3, '*Username must be at least 3 characters')
    .trim(),
owner: yup
    .string()
    .required('*Please enter your owner name')
    .min(3, '*Username must be at least 3 characters')
    .trim(),
  mobile_no: yup
  .number()
  .required('*Please enter your mobile number')
  .min(7, '*Please enter a valid number'),
  email: yup
    .string()
    .required('*Please enter your email')
    .email('*Please enter a valid email')
    .trim(),
  password: yup
    .string()
    .required('*Please enter your Password')
    .min(6, '*Password must be 6 digits')
    .matches(
      /^[^\s].+[^\s]$/,
      '*No spaces allowed at the beginning and the end',
    )
    .strict(),
});

function RestaurantRegistrationScreen() {
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigation = useNavigation<any>();


  const onSubmit = handleSubmit(values => {
      console.log('on sumbt')
      console.log(JSON.stringify(values))
   
    SnackbarSuccess('Successfully Registered');
    navigation.navigate('LoginScreen');
    registerUserRequest.mutate({
      name: values.restaurant_name,
      owner: values.owner,
      address: values.address,
      mobileno: values.mobile_no,
      email: values.email.toLowerCase(),
      password: values.password.trim()
    });
  });

  const registerUserRequest = useRestaurantRegisterUser({
    async onSuccess(res) {
      console.log(JSON.stringify(res))
      if (res.statusCode == 200){
      console.log("res.statusCode", res.statusCode)
      reset();
        SnackbarSuccess(res.message);
        navigation.navigate('LoginScreen');
      }
      else{
        console.log(res.message);
      }
      
    },
    onError(err) {
      console.log(JSON.stringify(err));
      // navigation.navigate('LoginScreen');
    },
  });

  return (
    <View style={innerStyles.main_container}>
      <Image
        source={require('../../assets/imgs/logo2.jpeg')}
        style={innerStyles.image}
        resizeMode={'contain'}
      />
      {/* <Image
        source={require('../../assets/imgs/logo1.png')}
        style={innerStyles.image}
        resizeMode={'contain'}
      /> */}
      <View style={innerStyles.registerContainer}>
        <Text style={innerStyles.mainHeading}>Restaurant Register</Text>
        <Text style={innerStyles.plainText}>
          Please fill in the information below:
        </Text>
        <View style={innerStyles.input_Container}>
          <AppTextInput
            name="restaurant_name"
            control={control}
            textInputProps={{
              placeholder: 'Restaurant Name',
              style: {fontSize: 12,},
            }}
          />
          {errors.restaurant_name && (
            <Text style={innerStyles.errorField}>
              {errors.restaurant_name['message']}
            </Text>
          )}
          <AppTextInput
            name="address"
            control={control}
            textInputProps={{
              placeholder: 'Address',
              style: {fontSize: 12,},
            }}
          />

         

          <AppTextInput
            name="mobile_no"
            control={control}
            textInputProps={{
              placeholder: 'Mobile Number',
              style: {fontSize: 12,},
            }}
          />
          {errors.mobile_no && (
            <Text style={innerStyles.errorField}>
              {errors.mobile_no['message']}
            </Text>
          )}
          <AppTextInput
            name="email"
            control={control}
            textInputProps={{
              placeholder: 'Email',
              style: {fontSize: 12,},
            }}
          />
          {errors.email && (
            <Text style={innerStyles.errorField}>
              {errors.email['message']}
            </Text>
          )}
          <AppTextInput
            name="password"
            control={control}
            textInputProps={{
              placeholder: 'Password',
              secureTextEntry: true,
              style: {fontSize: 12,},
            }}
          />
          <AppTextInput
            name="owner"
            control={control}
            textInputProps={{
              placeholder: 'Owner name',
              style: {fontSize: 12,},
            }}
          />
          
     
          {errors.password && (
            <Text style={innerStyles.errorField}>
              {errors.password['message']}
            </Text>
          )}
          
          <AppButton
            text="Register Restaurant"
            buttonProps={{
              onPress: onSubmit,
              style: {
                backgroundColor: '#429b44',
                marginVertical: 20,
                marginTop: 5,
                height: 40,
              },
            }}
            innerTextProps={{
              style: {
                fontWeight: '700',
                fontSize: 14,
                color: '#fff',
              },
            }}
          />
        </View>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('LoginScreen');
          }}
          style={{flexDirection: 'row', alignItems: 'center', marginBottom: 5}}>
          <Text style={innerStyles.plainText}>You have an account?</Text>
          <Text style={innerStyles.boldText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default RestaurantRegistrationScreen;

const innerStyles = StyleSheet.create({
  main_container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    justifyContent: 'center',
  },
  image: {
    height: 50,
    width: 190,
    alignSelf: 'center',
    // marginBottom: 65,
  },
  registerContainer: {
    alignItems: 'center',
    // marginTop: -45,
  },
  message: {
    width: 200,
    marginBottom: 10,
  },
  boldText: {
    fontWeight: '700',
    color: 'black',
    marginLeft: 5,
  },
  mainHeading: {
    color: 'black',
    fontSize: 22,
    marginVertical: 10,
  },
  plainText: {
    color: 'black',
    fontSize: 12,
    textAlign: 'center',
  },
  input_Container: {
    width: 320,
  },
  errorField: {
    fontSize: 10,
    color: 'red',
    fontFamily: 'OpenSans-Regular',
  },
});
