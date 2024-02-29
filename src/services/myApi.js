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
      // This is where you could set headers common to all requests
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getFangraphsHitterSeasonStats: builder.query({
      query: () => `fangraphs-hitter-season-stats`,
    }),
    // Adding a mutation to call a custom method
    findUniqueMLBTeams: builder.mutation({
      query: (body) => ({
        url: `fangraphs-hitter-season-stats`, // Adjust the URL to your specific service
        method: 'POST',
        body,
        headers: {
          'X-Service-Method': 'findUniqueMLBTeams', // Custom header to specify the method
        },
      }),
    }),
    findHittersByMLBTeamAndSeason: builder.mutation({
      query: (body) => ({
        url: `fangraphs-hitter-season-stats`, // Adjust the URL to your specific service
        method: 'POST',
        body,
        headers: {
          'X-Service-Method': 'findHittersByMLBTeamAndSeason', // Custom header to specify the method
        },
      }),
    }),
    findPitchersByMLBTeamAndSeason: builder.mutation({
      query: (body) => ({
        url: `fangraphs-pitcher-season-stats`, // Adjust the URL to your specific service
        method: 'POST',
        body,
        headers: {
          'X-Service-Method': 'findPitchersByMLBTeamAndSeason', // Custom header to specify the method
        },
      }),
    }),
  }),
});

// Export hooks for your endpoints here
export const {
  useGetFangraphsHitterSeasonStatsQuery,
  useFindUniqueMLBTeamsMutation,
  useFindHittersByMLBTeamAndSeasonMutation,
  useFindPitchersByMLBTeamAndSeasonMutation,
} = myApi;
