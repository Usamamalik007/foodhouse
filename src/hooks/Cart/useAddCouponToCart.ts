import {useMutation, UseMutationOptions} from 'react-query';
import {httpCustomer} from '../../utils/axiosConfig';

async function useAddCouponRequest(data: any) {
  console.log(`data`, data);
  try {
    const res = await httpCustomer.post<any>('cart/coupon/add', data);
    console.log(`res`, res);
    return res.data;
  } catch (err: any) {
    console.log(`err`, err);
    throw new Error(err.response.data.message);
  }
}

export function useAddCoupon(
  options: UseMutationOptions<any, Error, any, unknown>,
) {
  return useMutation(useAddCouponRequest, options);
}
