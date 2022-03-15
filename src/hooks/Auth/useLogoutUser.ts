import {useMutation, UseMutationOptions} from 'react-query';
import {httpUser} from '../../utils/axiosConfig';

function useLogoutUserRequest() {
  return httpUser
    .get('/user/logout')
    .then(res => {
      console.log('Response is ', res);

      return res.data;
    })
    .catch(err => {
      throw new Error(err.response.data.message);
    });
}

export function useLogoutUser(
  options: UseMutationOptions<any, Error, any, unknown>,
) {
  return useMutation(useLogoutUserRequest);
}
