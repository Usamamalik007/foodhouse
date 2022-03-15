import {useMutation, UseMutationOptions} from 'react-query';
import {httpCustomer} from '../../../utils/axiosConfig';

function useUpdateBillingRequest(id: number) {
  return httpCustomer
    .put<any>(`/profile/address/shipping/${id}`)
    .then((res: any) => {
      return res.data;
    })
    .catch((err: any) => {
      throw new Error(err.response.data.message);
    });
}

export function useUpdateBillingAddress(
  options: UseMutationOptions<any, Error, any, unknown>,
) {
  return useMutation(useUpdateBillingRequest, options);
}
