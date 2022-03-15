import {useQuery, UseQueryOptions} from 'react-query';
import {httpCustomer} from '../../utils/axiosConfig';

async function useGetAllOrderRequest<T>(id: number) {
  try {
    const res = await httpCustomer.get<T>(`/profile/orders/${id}`);
    return res.data;
  } catch (err: any) {
    throw new Error(err.response.data.message);
  }
}

export function useGetAllOrder<T>(
  values: any,
  options?: UseQueryOptions<any, Error, any>,
) {
  return useQuery(['useGetAllOrder'], () => useGetAllOrderRequest<T>(values));
}
