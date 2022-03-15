import {useMutation, UseMutationOptions} from 'react-query';
import {httpCustomer} from '../../../utils/axiosConfig';

function useUpdateShippingRequest(id: number) {
  return httpCustomer
    .put<any>(`/profile/address/billing/${id}`)
    .then((res: any) => {
      return res.data;
    })
    .catch((err: any) => {
      throw new Error(err.response.data.message);
    });
}

export function useUpdateShippingAddress(
  options: UseMutationOptions<any, Error, any, unknown>,
) {
  return useMutation(useUpdateShippingRequest, options);
}
