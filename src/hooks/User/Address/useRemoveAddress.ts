import {useMutation, UseMutationOptions} from 'react-query';
import {httpCustomer} from '../../../utils/axiosConfig';

function useRemoveAddressRequest(id: number) {
  return httpCustomer
    .delete<any>(`/profile?address&id=${id}`)
    .then((res: any) => {
      return res.data;
    })
    .catch((err: any) => {
      throw new Error(err.response.data.message);
    });
}

export function useRemoveAddress(
  options: UseMutationOptions<any, Error, any, unknown>,
) {
  return useMutation(useRemoveAddressRequest, options);
}
