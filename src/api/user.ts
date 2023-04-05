/** Request  */

import axios from '@/config/axios_instance';

export interface RegistrationUser {
  nickname: string;
  email: string;
}

export const createUserApi = (address: string, body: RegistrationUser) => {
  return axios.post(`user/create/${address}`, body);
};
