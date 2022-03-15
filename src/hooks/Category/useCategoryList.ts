import {useQuery} from 'react-query';
import {ICatagoryResponse} from '../../interfaces/ICategoryData';
import {httpAdmin} from '../../utils/axiosConfig';

async function useGetCategoryListRequest<T>() {
  try {
    const res = await httpAdmin.get<ICatagoryResponse>(`/category/landing`);
    return res.data;
  } catch (err: any) {
    throw new Error(err.response.data.message);
  }
}

export function useGetCategoryList<T>() {
  return useQuery(['useGetAddress'], () => useGetCategoryListRequest<T>());
}
