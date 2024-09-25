import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { currencyRateApi } from './services/currencyApi';
import { currencyListApi } from './services/listApi';

export const store = configureStore({
  reducer: {
    [currencyRateApi.reducerPath]: currencyRateApi.reducer,
    [currencyListApi.reducerPath]: currencyListApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(currencyRateApi.middleware).concat(currencyListApi.middleware)
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
