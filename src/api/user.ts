/** Request  */

import axios from '@/config/axios_instance';

export interface RegistrationUser {
  username: string;
  email: string;
}

export const createUserApi = (address: string, body: RegistrationUser) => {
  return axios.post(`user/create/${address}`, body);
};
