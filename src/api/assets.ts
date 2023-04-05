import axios from '@/config/axios_instance';

export enum SourceEnergyEnum {
  Solar = 1,
  Wind = 2
}

export interface AssetDto {
  //TODO: Aggiungere DID
  address: string;
  source: SourceEnergyEnum;
  nickname: string;
}

export const createAssetApi = (body: AssetDto) => {
  return axios.post(`assets/new`, body);
};

export const getAssetsApi = () => {
  return axios.get(`assets/list`);
};
