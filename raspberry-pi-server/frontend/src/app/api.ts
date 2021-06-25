import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Section, Storage } from './types';

export const BASE_URL = 'http://localhost:3000';

// Define a service using a base URL and expected endpoints
export const storagesApi = createApi({
    reducerPath: 'storagesApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/api` }),
    endpoints: (builder) => ({
        getAllStorages: builder.query<Storage[], string>({
            query: () => `storage`,
        }),
        getStorageById: builder.query<Storage, string>({
            query: (id) => `storage/${id}`,
        }),
        getSectionsByStorageId: builder.query<Section, string>({
            query: (storageId) => `section?storageId=${storageId}`,
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllStoragesQuery } = storagesApi;
