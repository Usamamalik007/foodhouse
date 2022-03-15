import {useQuery, UseQueryOptions} from 'react-query';
import {httpCustomer} from '../../utils/axiosConfig';

async function useGetAllFeaturedProductRequest<T>(id: number) {
  try {
    const res = await httpCustomer.get<T>(`/product/featured?user_id=${id}`);
    console.log(`res.data useGetAllFeaturedProductRequest`, res.data);
    return res.data;
  } catch (err: any) {
    console.log(`err`, err);
    throw new Error(err.response.data.message);
  }
}

export function useGetAllFeaturedProduct<T>(
  values: number,
  options?: UseQueryOptions<T, Error, T>,
) {
  return useQuery(['/product/featured'], () =>
    useGetAllFeaturedProductRequest<T>(values),
  );
}
