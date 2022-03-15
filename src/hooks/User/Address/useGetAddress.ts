import {useQuery, UseQueryOptions} from 'react-query';
import {httpCustomer} from '../../../utils/axiosConfig';
import {IFavouriteData} from '../../../interfaces/IFavouriteData';

async function useGetAddressRequest<T>() {
  try {
    const res = await httpCustomer.get<T>(`/profile/address`);
    return res.data;
  } catch (err: any) {
    throw new Error(err.response.data.message);
  }
}

export function useGetAddress<T>(options?: UseQueryOptions<T, Error, T>) {
  return useQuery(['useGetAddress'], () => useGetAddressRequest<T>());
}
