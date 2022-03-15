import {useMutation, UseMutationOptions} from 'react-query';
import {httpCustomer} from '../../../utils/axiosConfig';

async function useUpdateAddressRequest(data: any) {
  const {address_line1, address_line2, city, state, postal_code, id} = data;
  let backendData;
  if (address_line2)
    backendData = {
      address_line1: address_line1,
      address_line2: address_line2,
      city: city.toString(),
      state: state,
      postal_code: postal_code.toString(),
    };
  else {
    backendData = {
      address_line1: address_line1,
      city: city.toString(),
      state: state,
      postal_code: postal_code.toString(),
    };
  }
  try {
    const res = await httpCustomer.put<any>(
      `profile/address/${id}`,
      backendData,
    );
    console.log(`res`, res);
    return res.data;
  } catch (err: any) {
    console.log(`err`, err);
    throw new Error(err.response.data.message);
  }
}

export function useUpdateAddress(
  options: UseMutationOptions<any, Error, any, unknown>,
) {
  return useMutation(useUpdateAddressRequest, options);
}
