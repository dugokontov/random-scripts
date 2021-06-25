import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Storage } from './types';

export const BASE_URL = 'http://localhost:3000';

// Define a service using a base URL and expected endpoints
export const storagesApi = createApi({
    reducerPath: 'storagesApi',
    tagTypes: ['Storages'],
    baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/api` }),
    endpoints: (builder) => ({
        getAllStorages: builder.query<Storage[], void>({
            query: () => `storage`,
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ id }) => ({
                              type: 'Storages' as const,
                              id,
                          })),
                          { type: 'Storages', id: 'LIST' },
                      ]
                    : [{ type: 'Storages', id: 'LIST' }],
        }),
        getStorageById: builder.query<Storage, string>({
            query: (id) => `storage/${id}`,
            providesTags: (result, error, id) => [{ type: 'Storages', id }],
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllStoragesQuery, useGetStorageByIdQuery } = storagesApi;
