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
import {useGetCountry} from '../hooks/Country/useGetCountry';
import AppDropdown from './AppDropDown';
import {useUpdateProfile} from '../hooks/User/Profile/useUpdateProfile';
import {AppDatePicker} from './AppDatePicker';

const schema = yup.object().shape({
  firstName: yup
    .string()
    .required('Please enter your First Name')
    .min(3, 'First Name should be 3 character long'),
  lastName: yup
    .string()
    .required('Please enter your Last Name')
    .min(3, 'Last Name should be 3 character long'),
  dob: yup
    .string()
    // .required('Please select your Date of Birth')
    .min(3, 'State should be 3 character long')
    .nullable(true),
  phone_number: yup
    .number()
    // .required('Please enter your Phone Number')
    .min(5, 'Phone Number should be 10 character long'),
  gender: yup
    .string()
    // .required('Please select Gender')
    .nullable(true),
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
      firstName: props?.route?.params?.first_name,
      lastName: props?.route?.params?.last_name,
      dob: props?.route?.params?.dob,
      phone_number: props?.route?.params?.phone_number,
      gender: props?.route?.params?.gender,
    },
  });

  const userData = props?.route?.params;
  const countries: any = useGetCountry();
  const navigation = useNavigation();
  const countryList = countries?.data?.reponse?.map((country: any) => {
    return {
      label: country.name.toString(),
      value: country.id.toString(),
    };
  });

  const onSubmit = handleSubmit(values => {
    SnackbarSuccess('Successfully Updated');
    // updateProfileRequest.mutate({
    //   fisrt_name: values.firstName,
    //   last_name: values.lastName,
    //   phone_number: values.phone_number.toString(),
    //   gender:values.gender
    // });
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
            name="firstName"
            outerViewProps={{style: {height: 45}}}
            control={control}
            textInputProps={{
              placeholder: 'First Name',
              style: {fontSize: 14, color: 'black', backgroundColor: 'white'},
            }}
          />
          {errors.firstName && (
            <Text style={innerStyles.errorField}>
              {errors.firstName['message']}
            </Text>
          )}

          <AppTextInput
            name="lastName"
            outerViewProps={{style: {height: 45}}}
            control={control}
            textInputProps={{
              placeholder: 'Last Name',
              style: {fontSize: 14, color: 'black', backgroundColor: 'white'},
            }}
          />

          {errors.lastName && (
            <Text style={innerStyles.errorField}>
              {errors.lastName['message']}
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
            name="phone_number"
            outerViewProps={{style: {height: 45}}}
            control={control}
            textInputProps={{
              placeholder: 'Phone Number',
              keyboardType: 'numeric',
              style: {fontSize: 14, color: 'black', backgroundColor: 'white'},
            }}
          />

          {errors.phone_number && (
            <Text style={[innerStyles.errorField, {marginBottom: 5}]}>
              {errors.phone_number['message']}
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
