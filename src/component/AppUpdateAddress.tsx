import React, {useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

import {AppTextInput} from './AppTextInput';
import {AppButton} from './AppButton';
import {useAddAddress} from '../hooks/User/Address/useAddAddress';
import {SnackbarError} from '../utils/SnackBar';
import {useGetCountry} from '../hooks/Country/useGetCountry';
import {useGetAddress} from '../hooks/User/Address/useGetAddress';
import {useAppSelector} from '../store/hooks';
import {useUpdateAddress} from '../hooks/User/Address/useUpdateAddress';

const schema = yup.object().shape({
  firstLine: yup.string().required('Please enter your Address'),
  city: yup
    .string()
    .required('Please enter your City')
    .min(3, 'City should be 3 character long'),
  state: yup
    .string()
    .required('Please enter your State')
    .min(3, 'State should be 3 character long'),
  postalCode: yup
    .number()
    .required('Please enter your Postal Code')
    .min(5, 'Postal Code should be 5 character long'),
});

function AppUpdateAddress(props: any) {
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      city: props?.route?.params?.city,
      firstLine: props?.route?.params?.address_line1,
      secondLine: props?.route?.params?.address_line2,
      state: props?.route?.params?.state,
      postalCode: props?.route?.params?.postal_code,
    },
  });

  console.log(`route.params nvhvv`, props.route.params.id);

  const userState: any = useAppSelector(state => state?.user?.user);
  let userData: any;
  if (userState?.user) {
  } else {
    userData = JSON?.parse(userState);
  }

  const address = useGetAddress();
  const data: any = props.route.params;
  const countries = useGetCountry();
  const onSubmit = handleSubmit(values => {
    console.log('Values being handleSubmit', values);
    if (values != undefined) {
      updateAddressRequest.mutate({
        address_line1: values.firstLine,
        address_line2: values.secondLine,
        city: values.city.toString(),
        state: values.state,
        postal_code: parseInt(values.postalCode),
        id: props.route.params.id,
      });
    }
  });

  const updateAddressRequest = useUpdateAddress({
    async onSuccess(res) {
      console.log('response is', res);
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
            name="firstLine"
            outerViewProps={{style: {height: 45}}}
            control={control}
            textInputProps={{
              value: data?.address_line1,
              defaultValue: data?.address_line1,
              placeholder: 'First Line',
              style: {fontSize: 12, color: 'black', backgroundColor: 'white'},
            }}
          />
          {errors.firstLine && (
            <Text style={innerStyles.errorField}>
              {errors.firstLine['message']}
            </Text>
          )}
          <AppTextInput
            name="secondLine"
            outerViewProps={{style: {height: 45}}}
            control={control}
            textInputProps={{
              value: data?.address_line2,
              defaultValue: data?.address_line2,
              placeholder: 'Second Line',
              style: {fontSize: 12, color: 'black', backgroundColor: 'white'},
            }}
          />
          <AppTextInput
            name="city"
            control={control}
            outerViewProps={{style: {height: 45}}}
            textInputProps={{
              // value: data?.city,
              placeholder: 'City',
              // defaultValue: data?.city,
              style: {fontSize: 12, color: 'black', backgroundColor: 'white'},
            }}
          />
          {errors.city && (
            <Text style={innerStyles.errorField}>{errors.city['message']}</Text>
          )}

          <AppTextInput
            name="state"
            control={control}
            outerViewProps={{style: {height: 45}}}
            textInputProps={{
              placeholder: 'State',
              value: data?.state,
              defaultValue: data?.state,
              style: {
                fontSize: 12,
                color: 'black',
                backgroundColor: 'white',
              },
            }}
          />
          {errors.state && (
            <Text style={innerStyles.errorField}>
              {errors.state['message']}
            </Text>
          )}

          <AppTextInput
            name="postalCode"
            outerViewProps={{style: {height: 45}}}
            control={control}
            textInputProps={{
              defaultValue: data?.postal_code.toString(),
              value: data?.postal_code.toString(),
              placeholder: 'Postal Code',
              keyboardType: 'numeric',
              style: {fontSize: 12, color: 'black', backgroundColor: 'white'},
            }}
          />
          {errors.postalCode && (
            <Text style={innerStyles.errorField}>
              {errors.postalCode['message']}
            </Text>
          )}
          <AppButton
            text="Update Address"
            buttonProps={{
              onPress: onSubmit,
              style: {
                marginTop: 50,
                backgroundColor: 'black',
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

export default AppUpdateAddress;

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
