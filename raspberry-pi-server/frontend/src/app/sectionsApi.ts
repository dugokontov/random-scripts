import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Section } from './types';

export const BASE_URL = 'http://localhost:3000';

// Define a service using a base URL and expected endpoints
export const sectionsApi = createApi({
    reducerPath: 'sectionsApi',
    tagTypes: ['Sections'],
    baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/api` }),
    endpoints: (builder) => ({
        getSectionsByStorageId: builder.query<Section[], string>({
            query: (storageId) => `section?storageId=${storageId}`,
            providesTags: (result, error, storageId) =>
                result
                    ? [
                          ...result.map(({ id, storageId }) => ({
                              type: 'Sections' as const,
                              id: `${storageId}.${id}`,
                          })),
                          { type: 'Sections', id: storageId },
                      ]
                    : [{ type: 'Sections', id: storageId }],
        }),
        addSection: builder.mutation<Section, Partial<Section>>({
            query(body) {
                return {
                    url: 'section',
                    method: 'POST',
                    body,
                };
            },
            invalidatesTags: (result, error, section) => [
                {
                    type: 'Sections',
                    id: section.storageId,
                },
            ],
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetSectionsByStorageIdQuery, useAddSectionMutation } =
    sectionsApi;
