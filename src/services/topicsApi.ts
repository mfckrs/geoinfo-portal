import { api } from './api';
import type { Topic } from '../types';

export const topicsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getTopics: builder.query<Topic[], void>({
            query: () => 'topics',
            providesTags: ['Topics'],
        }),

        getTopicById: builder.query<Topic, string>({
            query: (id) => `topics/${id}`,
            providesTags: (result, error, id) => [{ type: 'Topics', id }],
        }),

        getTopicsByCategory: builder.query<Topic[], string>({
            query: (category) => `topics/category/${category}`,
            providesTags: ['Topics'],
        }),

        // For search functionality
        searchTopics: builder.query<Topic[], string>({
            query: (searchTerm) => `topics/search?q=${encodeURIComponent(searchTerm)}`,
            providesTags: ['Topics'],
        }),
    }),
});

export const {
    useGetTopicsQuery,
    useGetTopicByIdQuery,
    useGetTopicsByCategoryQuery,
    useSearchTopicsQuery,
} = topicsApi;