
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const cryptoApiHeaders = {
        "x-rapidapi-key": "454aa8497fmshe232420b9408512p14620bjsn5840531c15a7",
        "x-rapidapi-host": "coinranking1.p.rapidapi.com",
};

const createRequest = (url:string)=> ({ url, headers: cryptoApiHeaders });
const baseUrl = "https://coinranking1.p.rapidapi.com";

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: builder => ({
    getCrypto: builder.query({
      query: count => createRequest(`/coins?limit=${count}`),
    }),
    getCryptoDetails: builder.query({
      query: coinId => createRequest(`/coin/${coinId}`),
    }),
    getCryptoHistory: builder.query({
      query: ({ coinId, timePeriod }) =>
        createRequest(`/coin/${coinId}/history?timePeriod=${timePeriod}`),
    }),
  }),
});

export const { useGetCryptoQuery, useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } =
  cryptoApi;