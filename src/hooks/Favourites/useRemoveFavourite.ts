import {useMutation, UseMutationOptions} from 'react-query';
import {httpCustomer} from '../../utils/axiosConfig';
import {
  IRemoveFavouriteRequest,
  IRemoveFavouriteResponse,
} from '../../interfaces/IFavouriteData';



function useRemoveFavouriteRequest(data: any) {
  console.log(`data IRemoveFavouriteRequest`, data);
  return httpCustomer
    .post<any>('deleteFavouriteItem', data)
    .then((res: any) => {
      return res.data;
    })
    .catch((err: any) => {
      throw new Error(err.response.data.message);
    });
}

export function useRemoveFavourite(
  options: UseMutationOptions<
    IRemoveFavouriteResponse,
    Error,
    any,
    unknown
  >,
) {
  return useMutation(useRemoveFavouriteRequest, options);
}
