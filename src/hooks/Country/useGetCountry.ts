import {useQuery, UseQueryOptions} from 'react-query';
import {httpAdmin} from '../../utils/axiosConfig';
import {IFavouriteData} from '../../interfaces/IFavouriteData';

async function useGetCountryRequest<T>() {
  try {
    const res = await httpAdmin.get<T>(`/countries`);
    console.log(`res.data useGetCountryRequest`, res.data )
    return res.data;
  } catch (err: any) {
    throw new Error(err.response.data.message);
  }
}

export function useGetCountry<T>(
  options?: UseQueryOptions<T, Error, T>,
) {
  return useQuery(['useGetCountry'], () => useGetCountryRequest<T>());
}
