import {useMutation, UseMutationOptions} from 'react-query';
import {httpUser} from '../../utils/axiosConfig';

interface IPhoneNoRequest {
  phoneNumber: number;
  userId: number;
}

async function updatePhoneNoRequest(data: IPhoneNoRequest) {
  console.log(`data updatePhoneNoRequest`, data);
  try {
    const res = await httpUser.put<IPhoneNoRequest>(`/user/phone`, data);
    console.log(`res`, res);
    return res.data;
  } catch (err: any) {
    console.log(`err`, err);
    throw new Error(err.response.data.message);
  }
}

export function useUpdatePhoneNo(
  options: UseMutationOptions<IPhoneNoRequest, Error, IPhoneNoRequest, unknown>,
) {
  return useMutation(updatePhoneNoRequest, options);
}
