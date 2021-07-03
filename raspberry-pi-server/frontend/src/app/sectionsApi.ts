import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Section, UpdateSectionPayload } from './types';

// Define a service using a base URL and expected endpoints
export const sectionsApi = createApi({
    reducerPath: 'sectionsApi',
    tagTypes: ['Sections'],
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_BACKEND_URL}/api`,
    }),
    endpoints: (builder) => ({
        getSectionsByStorageId: builder.query<Section[], number>({
            query: (storageId) => `section?storageId=${storageId}`,
            providesTags: (result, _, storageId) =>
                result
                    ? [
                          ...result.map(({ id }) => ({
                              type: 'Sections' as const,
                              id: id,
                          })),
                          { type: 'Sections', id: `storage${storageId}` },
                      ]
                    : [{ type: 'Sections', id: `storage${storageId}` }],
        }),
        addSection: builder.mutation<Section, Partial<Section>>({
            query: (body) => ({
                url: 'section',
                method: 'POST',
                body,
            }),
            invalidatesTags: (_, __, { storageId }) => [
                { type: 'Sections', id: `storage${storageId}` },
            ],
        }),
        deleteSection: builder.mutation<
            void,
            { storageId: number; sectionId: number }
        >({
            query: ({ sectionId }) => ({
                url: `section/${sectionId}`,
                method: 'DELETE',
            }),
            invalidatesTags: (_, __, { storageId, sectionId }) => [
                { type: 'Sections', id: sectionId },
                { type: 'Sections', id: `storage${storageId}` },
            ],
        }),
        updateSection: builder.mutation<Section, UpdateSectionPayload>({
            query: ({ id, name, position }) => {
                const body: Partial<Section> = {};
                if (name) {
                    body.name = name.trim();
                }
                if (position) {
                    body.position = position;
                }
                return {
                    url: `section/${id}`,
                    method: 'PATCH',
                    body,
                };
            },
            invalidatesTags: (_, __, { id, storageId }) => [
                { type: 'Sections', id },
                { type: 'Sections', id: `storage${storageId}` },
            ],
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useGetSectionsByStorageIdQuery,
    useAddSectionMutation,
    useDeleteSectionMutation,
    useUpdateSectionMutation,
} = sectionsApi;
