import {
  PayloadAction,
  createAsyncThunk,
  createSelector,
  createSlice
} from '@reduxjs/toolkit';
import { AssetDto, getAssetsApi } from '@/api/assets';

export interface AssetsState {
  assets: AssetDto[];
  isLoading: boolean;
}

const initialState: AssetsState = {
  assets: [],
  isLoading: false
};

export const fetchAssetsList = createAsyncThunk(
  'assets/list',
  async (_, thunkAPI) => {
    const response = await getAssetsApi();
    return response.data.data;
  }
);

export const assetsSlice = createSlice({
  name: 'assets',
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAssetsList.pending, (state: AssetsState) => {
        state.isLoading = true;
      })
      .addCase(
        fetchAssetsList.fulfilled,
        (state: AssetsState, action: PayloadAction<AssetDto[]>) => {
          state.isLoading = true;
          console.log('action.payload', action.payload);
          state.assets = action.payload;
        }
      );
  }
});

export const assetsReducer = assetsSlice.reducer;
export const assetsActions = assetsSlice.actions;

export const getAssetsState = (rootState: any): AssetsState =>
  rootState['assets'];

export const selectAssets = createSelector(
  getAssetsState,
  (state: AssetsState) => state.assets
);
