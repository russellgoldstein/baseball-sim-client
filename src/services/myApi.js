// src/services/myApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const myApi = createApi({
  reducerPath: 'myApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3030/' }),
  endpoints: (builder) => ({
    getItems: builder.query({
      query: () => `users`,
    }),
    // Define more endpoints here
  }),
});

export const { useGetItemsQuery } = myApi;
