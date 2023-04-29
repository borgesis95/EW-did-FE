import axios from '@/config/axios_instance';

export const getTransactionApi = () => {
  return axios.get(`grid/transactions`);
};
