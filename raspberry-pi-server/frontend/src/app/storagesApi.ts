import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Storage } from './types';

// Define a service using a base URL and expected endpoints
export const storagesApi = createApi({
    reducerPath: 'storagesApi',
    tagTypes: ['Storages'],
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_BACKEND_URL}/api`,
    }),
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
        getStorageById: builder.query<Storage, number>({
            query: (id) => `storage/${id}`,
            providesTags: (_, __, id) => [{ type: 'Storages', id }],
        }),
        addStorage: builder.mutation<Storage, Partial<Storage>>({
            query: ({ name, imageId }) => ({
                url: 'storage',
                method: 'POST',
                body: { name, imageId },
            }),
            invalidatesTags: [{ type: 'Storages', id: 'LIST' }],
        }),
        deleteStorage: builder.mutation<void, number>({
            query: (storageId) => ({
                url: `storage/${storageId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Storages'],
        }),
        updateStorage: builder.mutation<Storage, Partial<Storage>>({
            query: ({ id, ...body }) => ({
                url: `storage/${id}`,
                method: 'PATCH',
                body,
            }),
            invalidatesTags: (_, __, { id }) => [
                { type: 'Storages', id: 'LIST' },
                { type: 'Storages', id: id },
            ],
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useGetAllStoragesQuery,
    useGetStorageByIdQuery,
    useDeleteStorageMutation,
    useAddStorageMutation,
    useUpdateStorageMutation,
} = storagesApi;
