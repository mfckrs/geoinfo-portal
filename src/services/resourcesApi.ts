import { api } from './api';
import type { Resource, ResourceType } from '../types';

export const resourcesApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getResources: builder.query<Resource[], void>({
            query: () => 'resources',
            providesTags: ['Resources'],
        }),

        getResourceById: builder.query<Resource, string>({
            query: (id) => `resources/${id}`,
            providesTags: (result, error, id) => [{ type: 'Resources', id }],
        }),

        getResourcesByType: builder.query<Resource[], ResourceType>({
            query: (type) => `resources/type/${type}`,
            providesTags: ['Resources'],
        }),

        getResourcesByTopic: builder.query<Resource[], string>({
            query: (topicId) => `resources/topic/${topicId}`,
            providesTags: ['Resources'],
        }),

        getResourcesByCategory: builder.query<Resource[], string>({
            query: (category) => `resources/category/${category}`,
            providesTags: ['Resources'],
        }),

        // For search functionality
        searchResources: builder.query<Resource[], string>({
            query: (searchTerm) => `resources/search?q=${encodeURIComponent(searchTerm)}`,
            providesTags: ['Resources'],
        }),

        // Filter resources by multiple criteria
        filterResources: builder.query<
            Resource[],
            { types?: ResourceType[]; difficulty?: string; categories?: string[]; tags?: string[] }
        >({
            query: (filters) => {
                // Convert the filters object to query parameters
                const params = new URLSearchParams();

                if (filters.types && filters.types.length > 0) {
                    filters.types.forEach(type => params.append('type', type));
                }

                if (filters.difficulty) {
                    params.set('difficulty', filters.difficulty);
                }

                if (filters.categories && filters.categories.length > 0) {
                    filters.categories.forEach(category => params.append('category', category));
                }

                if (filters.tags && filters.tags.length > 0) {
                    filters.tags.forEach(tag => params.append('tag', tag));
                }

                return `resources/filter?${params.toString()}`;
            },
            providesTags: ['Resources'],
        }),
    }),
});

export const {
    useGetResourcesQuery,
    useGetResourceByIdQuery,
    useGetResourcesByTypeQuery,
    useGetResourcesByTopicQuery,
    useGetResourcesByCategoryQuery,
    useSearchResourcesQuery,
    useFilterResourcesQuery,
} = resourcesApi;