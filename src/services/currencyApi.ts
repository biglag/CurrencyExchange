import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './customAxiosBaseQuery';

const API_KEY = 'cur_live_nIMSMjmfY9BaeAh2vTW8HDOEKEPo2e1LufYdVi2i';
interface ApiResponse {
  data: {
    [currency: string]: {
      value: number;
    };
  };
}

export const currencyRateApi = createApi({
  reducerPath: 'currencyApi',
  baseQuery: axiosBaseQuery({
    baseUrl: 'https://api.currencyapi.com/v3/'
  }),
  endpoints: (builder) => ({
    getConversionRate: builder.query({
      query: ({ currencies }: { currencies: string }) => ({
        url: 'latest',
        method: 'GET',
        params: {
          apikey: API_KEY,
          currencies
        }
      }),
      transformResponse: (response: ApiResponse) => response.data
    })
  })
});

export const { useGetConversionRateQuery } = currencyRateApi;
