import {useQuery, UseQueryOptions} from 'react-query';
import {httpCustomer} from '../../utils/axiosConfig';
import {IFavouriteData} from '../../interfaces/IFavouriteData';

async function useGetAllHeroesRequest<T>(id:number) {
  try {
    console.log("--------------------------------------------------------------------------")
    const res: any = await httpCustomer.get<T>('getRestaurantsAndCategories');
    console.log("-----------------------",res?.data)
    for(let item of res?.data?.data?.categories){
      item.selected = false;
    }
    console.log("--------------------------------------------------------------------",res?.data?.data?.categories)
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
