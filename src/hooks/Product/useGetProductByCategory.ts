import {useQuery, UseQueryOptions} from 'react-query';
import {IProductByCategoryRequest} from '../../interfaces/IProductData';
import {httpCustomer} from '../../utils/axiosConfig';

async function useGetProductByCategoryRequest<T>(
  value: IProductByCategoryRequest,
) {
  try {
    const res = await httpCustomer.get<T>(
      `/product/category?limit=${value.limit}&pageNo=${value.pageNo}&categoryId=${value.categoryId}`,
    );
    return res.data;
  } catch (err: any) {
    console.log(`err`, err);
    throw new Error(err.response.data.message);
  }
}

export function useGetProductByCategory<T>(
  value: IProductByCategoryRequest,
  options?: UseQueryOptions<T, Error, T>,
) {
  return useQuery(['/product/category'], () =>
    useGetProductByCategoryRequest<T>(value),
  );
}
