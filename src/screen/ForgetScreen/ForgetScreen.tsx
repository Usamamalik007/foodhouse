import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

import {AppTextInput} from '../../component/AppTextInput';
import {AppButton} from '../../component/AppButton';
import {useFPassword} from '../../hooks/Auth/useForgotPassword';
import {SnackbarError, SnackbarSuccess} from '../../utils/SnackBar';

const schema = yup.object().shape({
  email: yup
    .string()
    .required('Please enter your email')
    .email('Please enter valid email')
    .trim(),
});

function ForgetScreen() {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigation = useNavigation<any>();

  const onSubmit = handleSubmit(values => {
    forgotPasswordRequest.mutate({email: values.email});
    SnackbarSuccess('Forgot Password code sent to your email');
    // navigation.navigate('LoginScreen');
  });

  const forgotPasswordRequest = useFPassword({
    async onSuccess(res) {
      SnackbarSuccess(res.message);
      navigation.navigate('LoginScreen');
    },
    onError(err) {
      SnackbarError(err.message);
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
      <View style={innerStyles.forgetContainer}>
        <Text style={innerStyles.mainHeading}>Recover password</Text>
        <View style={innerStyles.message}>
          <Text style={innerStyles.plainText}>Please enter your e-mail</Text>
        </View>
        <View style={innerStyles.input_Container}>
          <AppTextInput
            name="email"
            control={control}
            textInputProps={{
              placeholder: 'Email',
              style: {fontSize: 12},
            }}
          />
          {errors.email && (
            <Text style={innerStyles.errorField}>
              {errors.email['message']}
            </Text>
          )}
          <AppButton
            text="Submit"
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
        <View style={innerStyles.message}>
          <Text style={innerStyles.plainText}>Remember your password?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('LoginScreen');
            }}
            style={{marginTop: 5}}>
            <Text style={innerStyles.boldText}> Back to Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default ForgetScreen;

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
  forgetContainer: {
    alignItems: 'center',
    // marginTop: -45,
  },
  boldText: {
    fontWeight: '700',
    color: 'black',
    fontSize: 12,
    textAlign: 'center',
    marginLeft: 5,
  },
  message: {
    width: 200,
    marginBottom: 10,
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
