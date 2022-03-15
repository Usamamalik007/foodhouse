import {useQuery, UseQueryOptions} from 'react-query';
import {httpCustomer} from '../../../utils/axiosConfig';
import {IFavouriteData} from '../../../interfaces/IFavouriteData';

async function useGetProfileRequest<T>(id: number) {
  try {
    const res = await httpCustomer.get<T>('getUserData');
    console.log(`res.data useGetProfileRequest`, res.data);
    return res.data;
  } catch (err: any) {
    console.log('error user get profile', JSON.stringify(err))
    throw new Error(err.response.data.message);
  }
}

export function useGetProfile<T>(
  value: number,
  options?: UseQueryOptions<T, Error, T>,
) {
  return useQuery(['useGetProfile'], () => useGetProfileRequest<T>(value));
}
