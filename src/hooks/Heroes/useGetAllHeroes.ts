import {useQuery, UseQueryOptions} from 'react-query';
import {httpCustomer} from '../../utils/axiosConfig';
import {IFavouriteData} from '../../interfaces/IFavouriteData';

async function useGetAllHeroesRequest<T>(id:number) {
  try {
    const res = await httpCustomer.get<T>('getRestaurantsAndCategories');
    return res.data;
  } catch (err: any) {
    console.log('useGetAllHeroesRequest error', JSON.stringify(err))
    throw new Error(err.response.data.message);
  }
}

export function useGetAllHeroes<T>(
  values:number,
  options?: UseQueryOptions<any, Error, any>,
) {
  return useQuery(['useGetAllHeroes'],() => useGetAllHeroesRequest<T>(values));
}
