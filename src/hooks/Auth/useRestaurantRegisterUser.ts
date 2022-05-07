import {useMutation, UseMutationOptions} from 'react-query';
import {
    IRegisterRestaurantRequest,
    IRegisterRestaurantResponse,
} from '../../interfaces/IAuthData';
import {SnackbarError} from '../../utils/SnackBar';

import {httpCustomer} from '../../utils/axiosConfig';

async function useRestaurantRegisterUserRequest(registerRequest: IRegisterRestaurantRequest) {
  console.log(JSON.stringify(registerRequest))
  try {
    const res = await httpCustomer.post<IRegisterRestaurantResponse>(
      'restaurantSignup',
      registerRequest,
    );

    console.log('response is',  JSON.stringify(res))
    if (res.data.statusCode == 200) {
      return res.data;
    } else {
      console.log('error')
      SnackbarError(res.data.message);
    }
  } catch (err: any) {
    console.log('error sign up', JSON.stringify(err))
    SnackbarError(err);
  }
}

export function useRestaurantRegisterUser(
  options: UseMutationOptions<
  IRegisterRestaurantResponse,
    Error,
    IRegisterRestaurantRequest,
    unknown
  >,
) {
  return useMutation(useRestaurantRegisterUserRequest, options);
}
