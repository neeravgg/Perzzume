import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const colors: IColor = {
    _id: "default",
    backgroundColor: "white",
    primaryTextColor: "black",
    secondaryTextColor: "lightgrey",
};




export const jsonServerApi = createApi({
    reducerPath: 'jsonServerApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/' }),
    tagTypes: ['ThemeColor'],
    endpoints: (builder) => ({
        getThemeColor: builder.query({
            query: (page = 1) => `albums?_page=${page}&_limit=10`,
            transformResponse: (response: { data: string }) => {
                if (response.data === 'light') {
                    return {
                        _id: "default",
                        backgroundColor: "white",
                        primaryTextColor: "black",
                        secondaryTextColor: "lightgrey",
                    }
                }
                return {
                    _id: "default",
                    backgroundColor: "white",
                    primaryTextColor: "black",
                    secondaryTextColor: "lightgrey",
                }
            },
            providesTags: ['ThemeColor'],
        }),

        updateThemeColor: builder.mutation({
            query: ({ id, title }) => ({
                url: `albums/${id}`,
                method: 'PUT',
                body: { title },
            }),
            invalidatesTags: ['ThemeColor'],
        }),


    }),
});

export const {
    useGetThemeColorQuery,
    useUpdateThemeColorMutation
} = jsonServerApi;