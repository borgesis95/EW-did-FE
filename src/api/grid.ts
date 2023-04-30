import axios from '@/config/axios_instance';
import { MarketDto } from './response.types';

export const getTransactionApi = () => {
  return axios.get(`grid/transactions`);
};

export const getAverage = () => {
  return axios.get(`grid/average`);
};

export const createOffer = (body: MarketDto) => {
  return axios.post(`grid/offer`, body);
};

export const createBid = (body: MarketDto) => {
  return axios.post(`grid/bid`, body);
};
