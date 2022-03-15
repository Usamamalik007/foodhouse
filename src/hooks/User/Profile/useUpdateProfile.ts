import {useMutation, UseMutationOptions} from 'react-query';
import {httpCustomer} from '../../../utils/axiosConfig';

function useUpdateProfileRequest(data:any) {
    console.log(`data`, data)
  return httpCustomer
    .put<any>(`profile/update` , data)
    .then((res: any) => {
      return res.data;
    })
    .catch((err: any) => {
      throw new Error(err.response.data.message);
    });
}

export function useUpdateProfile(
  options: UseMutationOptions<any, Error, any, unknown>,
) {
  return useMutation(useUpdateProfileRequest, options);
}
