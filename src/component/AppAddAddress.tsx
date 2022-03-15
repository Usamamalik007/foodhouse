import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useDispatch} from 'react-redux';

import {AppTextInput} from './AppTextInput';
import {AppButton} from './AppButton';
import {useAddAddress} from '../hooks/User/Address/useAddAddress';
import {SnackbarError, SnackbarSuccess} from '../utils/SnackBar';
import {useGetCountry} from '../hooks/Country/useGetCountry';
import AppDropdown from './AppDropDown';
import {useAppSelector} from '../store/hooks';

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
  country: yup.string().required('Please select country').nullable(true),
});

function AppAddAddress() {
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigation = useNavigation();
  const countries: any = useGetCountry();

  const countryList = countries?.data?.response?.map((country: any) => {
    return {
      label: country.name.toString(),
      value: country.id,
    };
  });

  const userState: any = useAppSelector(state => state?.user?.user);
  let userData: any;
  if (userState?.user) {
  } else {
    userData = JSON?.parse(userState);
  }

  const onSubmit = handleSubmit(values => {
    if (values != undefined) {
      if (values.secondLine) {
        addAddressRequest.mutate({
          address_line1: values.firstLine,
          address_line2: values.secondLine,
          city: values.city.toString(),
          state: values.state,
          postal_code: values.postalCode,
          country:parseInt(values.country)
        });
      } else {
        addAddressRequest.mutate({
          address_line1: values.firstLine,
          city: values.city.toString(),
          state: values.state,
          postal_code: values.postalCode,
          country:parseInt(values.country)
        });
      }
    }
  });

  const addAddressRequest = useAddAddress({
    async onSuccess(res) {
      SnackbarSuccess('Successfully Added Address');
      navigation.goBack();
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
              placeholder: 'Second Line',
              style: {fontSize: 12, color: 'black', backgroundColor: 'white'},
            }}
          />
          <AppTextInput
            name="city"
            control={control}
            outerViewProps={{style: {height: 45}}}
            textInputProps={{
              placeholder: 'City',
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

          <AppDropdown
            name="country"
            control={control}
            dropdownInputProps={{
              placeholder: 'Select Country',
            }}
            data={countryList ?? []}
            isLoading={countries.isLoading}
            outerViewProps={{
              style: {
                backgroundColor: '',
                borderColor: 'lightgray',
                borderWidth: 1,
                borderRadius: 0,
                marginTop: 5,
              },
            }}
          />
          {errors.country && (
            <Text style={innerStyles.errorField}>
              {errors.country['message']}
            </Text>
          )}

          <AppButton
            text="Add Address"
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

export default AppAddAddress;

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
