import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Item, ItemSearch } from './types';

// Define a service using a base URL and expected endpoints
export const itemsApi = createApi({
    reducerPath: 'itemsApi',
    tagTypes: ['Items'],
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_BACKEND_URL}/api`,
    }),
    endpoints: (builder) => ({
        getItemsByStorageIdSectionId: builder.query<Item[], string>({
            query: (storageIdSectionId) => {
                const [storageId, sectionId] = storageIdSectionId.split('.');
                const searchParams = new URLSearchParams();
                searchParams.append('storageId', storageId);
                // handles values such as 'null', 'undefined' and ''
                if (!Number.isNaN(parseInt(sectionId, 10))) {
                    searchParams.append('sectionId', sectionId);
                }
                return `item?${searchParams.toString()}`;
            },
            providesTags: (result, error, storageIdSectionId) =>
                result
                    ? [
                          ...result.map(({ id }) => ({
                              type: 'Items' as const,
                              id,
                          })),
                          { type: 'Items', id: storageIdSectionId },
                      ]
                    : [{ type: 'Items', id: storageIdSectionId }],
        }),
        searchItem: builder.query<ItemSearch[], string>({
            query: (search) => `item/search?q=${search}`,
        }),
        addItem: builder.mutation<Item, Partial<Item> & { storageId: number }>({
            query: (payload) => ({
                url: `item`,
                method: 'POST',
                body: {
                    sectionId: payload.sectionId,
                    name: payload.name,
                    description: payload.description,
                    imageIds: payload.imageIds?.join(',') ?? '',
                },
            }),
            invalidatesTags: (_, __, { storageId, sectionId }) => [
                {
                    type: 'Items',
                    id: `${storageId}.${sectionId}`,
                },
                {
                    type: 'Items',
                    id: `${storageId}.${undefined}`,
                },
            ],
        }),
        deleteItem: builder.mutation<
            void,
            { storageId: number; sectionId: number; itemId: number }
        >({
            query: ({ itemId }) => ({
                url: `item/${itemId}`,
                method: 'DELETE',
            }),
            invalidatesTags: (_, __, { storageId, sectionId, itemId }) => [
                { type: 'Items', id: itemId },
                {
                    type: 'Items',
                    id: `${storageId}.${sectionId}`,
                },
                {
                    type: 'Items',
                    id: `${storageId}.${undefined}`,
                },
            ],
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useGetItemsByStorageIdSectionIdQuery,
    useAddItemMutation,
    useDeleteItemMutation,
    useSearchItemQuery,
} = itemsApi;
