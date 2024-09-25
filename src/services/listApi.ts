import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './customAxiosBaseQuery';

const API_KEY = '93b587ff62514c4645cf7e3d85bcefe7';

interface SymbolsResponse {
  symbols: { [key: string]: string };
}

export const currencyListApi = createApi({
  reducerPath: 'currencyListApi',
  baseQuery: axiosBaseQuery({
    baseUrl: 'https://api.exchangeratesapi.io/v1/'
  }),
  endpoints: (builder) => ({
    getSupportedCurrencies: builder.query({
      query: () => ({
        url: `symbols`,
        method: 'GET',
        params: {
          access_key: API_KEY
        }
      }),
      transformResponse: (response: SymbolsResponse) => {
        return Object.keys(response.symbols);
      }
    })
  })
});

export const { useGetSupportedCurrenciesQuery } = currencyListApi;
