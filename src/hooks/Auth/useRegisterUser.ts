import {useMutation, UseMutationOptions} from 'react-query';
import {
  IRegisterUserRequest,
  IRegisterUserResponse,
} from '../../interfaces/IAuthData';

import {httpCustomer} from '../../utils/axiosConfig';

async function useRegisterUserRequest(registerRequest: IRegisterUserRequest) {
  console.log(JSON.stringify(registerRequest))
  try {
    const res = await httpCustomer.post<IRegisterUserResponse>(
      'userSignup',
      registerRequest,
    );
    console.log('response is',  JSON.stringify(res))
    if (res.data.statusCode == 200) {
      return res.data;
    } else {
      console.log('error')
      throw new Error('Something Went Wrong');
    }
  } catch (err: any) {
    console.log('error sign up', JSON.stringify(err))
    throw new Error(err.response.data.message);
  }
}

export function useRegisterUser(
  options: UseMutationOptions<
    IRegisterUserResponse,
    Error,
    IRegisterUserRequest,
    unknown
  >,
) {
  return useMutation(useRegisterUserRequest, options);
}
