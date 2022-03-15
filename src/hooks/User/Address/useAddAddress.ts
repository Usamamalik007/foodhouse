import {useMutation, UseMutationOptions} from 'react-query';
import {httpCustomer} from '../../../utils/axiosConfig';

interface IPhoneNoRequest {
  phoneNumber: number;
  id: number;
}

async function useAddAddressRequest(data: any) {
  console.log(`data jghjg useAddAddressRequest`, data);
  try {
    const res = await httpCustomer.post<any>(`/profile/address`, data);
    console.log(`res`, res);
    return res.data;
  } catch (err: any) {
    console.log(`err`, err);
    throw new Error(err.response.data.message);
  }
}

export function useAddAddress(
  options: UseMutationOptions<any, Error, any, unknown>,
) {
  return useMutation(useAddAddressRequest, options);
}
