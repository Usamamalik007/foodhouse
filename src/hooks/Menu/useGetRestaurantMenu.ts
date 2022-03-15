import {useQuery, UseQueryOptions} from 'react-query';
import {httpCustomer} from '../../utils/axiosConfig';
import {IFavouriteData} from '../../interfaces/IFavouriteData';

async function useGetRestaurantMenuRequest<T>(id:number) {
  try {
    const res = await httpCustomer.get<T>(`getRestaurantMenu?restaurant_id=${id}`);
    return res.data;
  } catch (err: any) {
    console.log('useGetAllHeroesRequest error', JSON.stringify(err))
    throw new Error(err.response.data.message);
  }
}

export function useGetRestaurantMenu<T>(
  values:number,
  options?: UseQueryOptions<any, Error, any>,
) {
  return useQuery(['useGetRestaurantMenu'],() => useGetRestaurantMenuRequest<T>(values));
}
