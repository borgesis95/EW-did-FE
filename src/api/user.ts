/** Request  */

import axios from '@/config/axios_instance';

export interface RegistrationUser {
  nickname: string;
  email: string;
  address: string;
}

export interface EnergyInfoDto {
  user_id: string;
  produced: number;
  consumed: number;
  diff: number;
  date: Date;
}

export interface EnergyTotalDto {
  key: string;
  value: number;
}

export const createUserApi = (body: RegistrationUser) => {
  return axios.post(`user/create`, body);
};

export const getRetrieveEnergyData = (): Promise<{
  data: { data: EnergyInfoDto[] };
}> => {
  return axios.get('user/energy/list');
};

export const getTotalEnergy = (): Promise<{
  data: { data: EnergyTotalDto[] };
}> => {
  return axios.get('user/energy/all');
};
