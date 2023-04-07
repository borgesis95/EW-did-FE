import { configureStore } from '@reduxjs/toolkit';
import { assetsSlice } from './slices/assets.slice';
import { middleware } from 'middleware';

// config the store
const store = configureStore({
  reducer: {
    assets: assetsSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});

// export default the store

export type AppDispatch = typeof store.dispatch;
export default store;
