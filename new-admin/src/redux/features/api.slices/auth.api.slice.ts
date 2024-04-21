import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../../store';

export const apiSlice = createApi({
    reducerPath: 'authApi', // optional
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3500/admin',
        prepareHeaders: (headers, { getState }) => {
            const state = getState() as RootState;
            const token = state.auth.accessToken
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['auth'],
    endpoints: (builder) => ({
        adminLogin: builder.query({
            query: (data) => ({
                url: '/login',
                method: 'POST',
                body: data,
            }),
        }),
        adminRegister: builder.query({
            query: (data) => ({
                url: '/register',
                method: 'POST',
                body: data,
            }),
        }),
        adminRefreshToken: builder.query({
            query: () => ({
                url: '/refresh/auth',
                method: 'GET',
            }),
        }),
        adminLogout: builder.query({
            query: (data) => ({
                url: '/logout',
                method: 'GET',
                body: data,
            }),
        }),

    }),
});