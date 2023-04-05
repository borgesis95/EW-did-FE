import axios from '@/config/axios_instance';

export enum SourceEnergyEnum {
  Solar = 1,
  Wind = 2
}

export interface CreateAssetsRequest {
  address: string;
  source: SourceEnergyEnum;
}

export const createAssetApi = (body: CreateAssetsRequest) => {
  return axios.post(`assets/new`, body);
};
