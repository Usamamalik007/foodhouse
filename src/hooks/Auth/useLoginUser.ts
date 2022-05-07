import {useMutation, UseMutationOptions} from 'react-query';
import {
  ILoginRequest,
  IUserSessionData as ILoginResponse,
} from '../../interfaces/IAuthData';
import {SnackbarError} from '../../utils/SnackBar';
import {httpUser} from '../../utils/axiosConfig';

async function useLoginUserRequest(loginRequest: ILoginRequest) {
  console.log(JSON.stringify(loginRequest))
  try {
    const res = await httpUser.post<ILoginResponse>('customerLogin', loginRequest);
    console.log('here')
    console.log(JSON.stringify(res))
    if (res.data.statusCode == 200) {
      return res.data;
    } else {
      console.log("error", JSON.stringify(res))
      SnackbarError(res.data.message);
    }
  } catch (err: any) {
    console.log(JSON.stringify(err))
    SnackbarError(err);
  }
}

export function useLoginUser(
  options: UseMutationOptions<ILoginResponse, Error, ILoginRequest, unknown>,
) {
  return useMutation(useLoginUserRequest, options);
}
