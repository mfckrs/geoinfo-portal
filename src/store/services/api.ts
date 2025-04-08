import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a base API with the common setup
export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api/',
        // For production, you would use something like:
        // baseUrl: 'https://your-api.com/api/',
    }),
    tagTypes: ['Topics', 'Resources', 'Datasets', 'Equipment'],
    endpoints: () => ({
        // The endpoints are empty here and will be injected
        // from the specific API slices
    }),
});