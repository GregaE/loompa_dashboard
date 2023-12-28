import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import DetailedWorker from 'interfaces/DetailedWorker'
import GetWorkersReturn from 'interfaces/GetWorkersReturn';

const baseUrl = "https://2q2woep105.execute-api.eu-west-1.amazonaws.com/napptilus/oompa-loompas"

export const workerApi = createApi({
  reducerPath: 'workerApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  keepUnusedDataFor: 86400,
  endpoints: (builder) => ({
    getWorker: builder.query<DetailedWorker, string>({
      query: (workerId) => `/${workerId}`,
    }),
    getWorkers: builder.query<GetWorkersReturn, number>({
      query: (page) => `?page=${page}`,
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName
      },
      merge: (currentCache, newItems) => {
        if (newItems.current <= newItems.total) {
          currentCache.results.push(...newItems.results);
        }
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg
      },
    }),
  }),
});

export const { useGetWorkerQuery, useGetWorkersQuery } = workerApi;