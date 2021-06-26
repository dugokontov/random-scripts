import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ImageIds } from './types';

// Define a service using a base URL and expected endpoints
export const imagesApi = createApi({
    reducerPath: 'imagesApi',
    tagTypes: ['Images'],
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_BACKEND_URL}/api`,
    }),
    endpoints: (builder) => ({
        addImage: builder.mutation<{ imageIds: ImageIds }, FileList>({
            query: (fileList) => {
                const formData = new FormData();
                for (let i = 0; i < fileList.length; i++) {
                    const file = fileList[i];
                    formData.append('uploadImage', file);
                }
                return {
                    url: `image`,
                    method: 'POST',
                    body: formData,
                };
            },
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useAddImageMutation } = imagesApi;
