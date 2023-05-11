import axios from '@/config/axios_instance';

export enum SourceEnergyEnum {
  Solar = 1,
  Wind = 2,
  Battery = 3
}

export interface AssetDto {
  address: string;
  source: SourceEnergyEnum;
  nickname: string;
  date: string;
  kw: number;
}

export const createAssetApi = (body: AssetDto) => {
  return axios.post(`assets/new`, body);
};

export const getAssetsApi = () => {
  return axios.get(`assets/list`);
};
