import {useMutation, UseMutationOptions} from 'react-query';
import {httpCustomer} from '../../utils/axiosConfig';

async function useCheckoutRequest(data: any) {
  console.log(`data`, data);
  try {
    const res = await httpCustomer.post<any>('checkout');
    console.log(`res`, res);
    return res.data;
  } catch (err: any) {
    console.log(`err`, err);
    throw new Error(err.response.data.message);
  }
}

export function useCheckout(
  options: UseMutationOptions<any, Error, any, unknown>,
) {
  return useMutation(useCheckoutRequest, options);
}
