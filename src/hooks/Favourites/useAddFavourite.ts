import {useMutation, UseMutationOptions} from 'react-query';
import {httpCustomer} from '../../utils/axiosConfig';
import {
  IAddFavouriteRequest,
  IRemoveFavouriteResponse,
} from '../../interfaces/IFavouriteData';

function useAddFavouriteRequest(data: any) {
  console.log(`data useAddFavouriteRequest`, data);
  return httpCustomer
    .post<any>('addFavouriteItem', data)
    .then((res: any) => {
      return res.data;
    })
    .catch((err: any) => {
      throw new Error(err.response.data.message);
    });
}

export function useAddFavourite(
  options: UseMutationOptions<
    IRemoveFavouriteResponse,
    Error,
    any,
    unknown
  >,
) {
  return useMutation(useAddFavouriteRequest, options);
}
