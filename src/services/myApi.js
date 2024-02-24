import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const getJwtToken = () => localStorage.getItem('feathers-jwt');

export const myApi = createApi({
  reducerPath: 'myApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3030/',
    prepareHeaders: (headers) => {
      const token = getJwtToken();
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getFangraphsHitterSeasonStats: builder.query({
      query: () => `fangraphs-hitter-season-stats`,
    }),
  }),
});

export const { useGetFangraphsHitterSeasonStatsQuery } = myApi;
