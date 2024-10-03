
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoNewsHeaders =  {
    'x-rapidapi-key': '454aa8497fmshe232420b9408512p14620bjsn5840531c15a7',
    'x-rapidapi-host': 'crypto-news51.p.rapidapi.com'
  };

const createRequest = (url: string) => ({ url, headers: cryptoNewsHeaders });
const baseUrl = "https://crypto-news51.p.rapidapi.com";

export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: builder => ({
    getCryptoNews: builder.query({
      query: () => createRequest(`/api/v1/crypto/articles`),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
