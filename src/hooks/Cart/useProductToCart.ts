import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from 'react-query';
import {ICartDataResponse} from '../../interfaces/ICartData';
import {httpCustomer} from '../../utils/axiosConfig';

interface IAddProductToCartRequest {
  restaurant_id: string,
  food_item_id: string;
  amount: number;
}

interface IRemoveProductToCartRequest {
  productId: string;
}


interface ICommonProductToCartResponse {
  statusCode: number;
  message: string;
}

//Add
async function useAddProductToCart(value: IAddProductToCartRequest) {
  try {
    const res = await httpCustomer.post<ICommonProductToCartResponse>(
      'addToCart',
      value,
    );
    console.log(`res`, res);
    return res.data;
  } catch (err: any) {
    console.log(`err`, err);
    throw new Error(err.response.data.message);
  }
}

//Delete
async function useRemoveProductFromCart(value: IRemoveProductToCartRequest) {
  try {
    const res = await httpCustomer.delete<ICommonProductToCartResponse>(
      `cart/remove/${value.productId}`,
    );
    console.log(`res`, res);
    return res.data;
  } catch (err: any) {
    console.log(`err`, err);
    throw new Error(err.response.data.message);
  }
}

export function useRemoveProductFromCartRequest(
  options: UseMutationOptions<
    ICommonProductToCartResponse,
    Error,
    IRemoveProductToCartRequest,
    unknown
  >,
) {
  return useMutation(useRemoveProductFromCart, options);
}

// Get Cart
async function useGetUserCart<T>() {
  try {
    const res = await httpCustomer.get<ICartDataResponse>(`getCart`);
    console.log(JSON.stringify(res))
    return res.data;
  } catch (err: any) {
    console.log(JSON.stringify(err))
    throw new Error(err.response.data.message);
  }
}

export function useAddProductToCartRequest(
  options: UseMutationOptions<
    ICommonProductToCartResponse,
    Error,
    IAddProductToCartRequest,
    unknown
  >,
) {
  return useMutation(useAddProductToCart, options);
}

export function useGetCartRequest<T>(
  options?: UseQueryOptions<ICartDataResponse, Error, T>,
) {
  return useQuery(['useGetUserCartRequest'], () => useGetUserCart<T>());
}
