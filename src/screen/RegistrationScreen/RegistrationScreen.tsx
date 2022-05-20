import React, { useState } from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

import {AppTextInput} from '../../component/AppTextInput';
import {AppButton} from '../../component/AppButton';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useRegisterUser} from '../../hooks/Auth/useRegisterUser';
import {SnackbarSuccess, SnackbarError} from '../../utils/SnackBar';
import { RadioButton } from 'react-native-paper';


const schema = yup.object().shape({
  first_name: yup
    .string()
    .required('*Please enter your first name')
    .matches(/^(\S+$)/, '*No spaces allowed')
    .min(3, '*Username must be at least 3 characters')
    .trim(),
  last_name: yup
    .string()
    .required('*Please enter your last name')
    .matches(/^(\S+$)/, '*No spaces allowed')
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

function RegistrationScreen() {
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigation = useNavigation<any>();

  const [gender, setGender] = React.useState('male');

  const onSubmit = handleSubmit(values => {
    let updatedGender = 0
    if (gender == 'female') {
      updatedGender = 1
    }
    // SnackbarSuccess('Successfully Registered');
    // navigation.navigate('LoginScreen');
    registerUserRequest.mutate({
      fname: values.first_name,
      lname: values.last_name,
      address: values.address,
      mobileno: values.mobile_no,
      email: values.email.toLowerCase(),
      password: values.password.trim(),
      gender: updatedGender,
      role: 2
    });
  });

  const registerUserRequest: any = useRegisterUser({
    async onSuccess(res) {
      console.log(res)
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
      console.log(err.message);
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
        <Text style={innerStyles.mainHeading}>Register</Text>
        <Text style={innerStyles.plainText}>
          Please fill in the information below:
        </Text>
        <View style={innerStyles.input_Container}>
          <AppTextInput
            name="first_name"
            control={control}
            textInputProps={{
              placeholder: 'First Name',
              style: {fontSize: 12,},
            }}
          />
          {errors.first_name && (
            <Text style={innerStyles.errorField}>
              {errors.first_name['message']}
            </Text>
          )}
          <AppTextInput
            name="last_name"
            control={control}
            textInputProps={{
              placeholder: 'Last Name',
              style: {fontSize: 12,},
            }}
          />
          {errors.last_name && (
            <Text style={innerStyles.errorField}>
              {errors.last_name['message']}
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
          
          <View style={{flexDirection: 'row', flexWrap: "nowrap", alignItems: 'center'}}>
            <RadioButton
              value="0"
              status={gender === 'male' ? 'checked' : 'unchecked'}
              onPress={() => setGender('male')}
            />
            <Text>Male</Text>
            <RadioButton
              value="1"
              status={gender === 'female' ? 'checked' : 'unchecked'}
              onPress={() => setGender('female')}
            />
            <Text>Female</Text>
            </View>
          {errors.password && (
            <Text style={innerStyles.errorField}>
              {errors.password['message']}
            </Text>
          )}
          
          <AppButton
            text="Create my account"
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
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('RestaurantRegistrationScreen');
          }}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
          }}>
          <Text style={innerStyles.boldText}>Register Restaurant?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default RegistrationScreen;

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
