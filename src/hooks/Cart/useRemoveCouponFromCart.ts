import {useMutation, UseMutationOptions} from 'react-query';
import {httpCustomer} from '../../utils/axiosConfig';

function useRemoveCouponRequest(id: number) {
  return httpCustomer
    .delete<any>(`cart/coupon/${id}`)
    .then((res: any) => {
      return res.data;
    })
    .catch((err: any) => {
      throw new Error(err.response.data.message);
    });
}

export function useRemoveCoupon(
  options: UseMutationOptions<any, Error, any, unknown>,
) {
  return useMutation(useRemoveCouponRequest, options);
}
