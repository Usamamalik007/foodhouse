import {useMutation, UseMutationOptions} from 'react-query';
import {
  IForgotPasswordRequest,
  IForgotPasswordResponse,
} from '../../interfaces/IAuthData';
import {httpUser} from '../../utils/axiosConfig';

async function useFPasswordRequest(fPassRequest: IForgotPasswordRequest) {
  try {
    const res = await httpUser.post<IForgotPasswordResponse>(
      'forgotPassword',
      fPassRequest,
    );
    console.log('Response', res);

    if (res.data.statusCode == 200) {
      return res.data;
    } else {
      throw new Error('Something Went Wrong');
    }
  } catch (err: any) {
    throw new Error(err.response.data.message);
  }
}

export function useFPassword(
  options: UseMutationOptions<
    IForgotPasswordResponse,
    Error,
    IForgotPasswordRequest,
    unknown
  >,
) {
  return useMutation(useFPasswordRequest, options);
}
