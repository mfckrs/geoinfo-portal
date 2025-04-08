import { api } from './api';
import type { Dataset } from '../types';

export const datasetsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getDatasets: builder.query<Dataset[], void>({
            query: () => 'datasets',
            providesTags: ['Datasets'],
        }),

        getDatasetById: builder.query<Dataset, string>({
            query: (id) => `datasets/${id}`,
            providesTags: (result, error, id) => [{ type: 'Datasets', id }],
        }),

        getDatasetsByCategory: builder.query<Dataset[], string>({
            query: (category) => `datasets/category/${category}`,
            providesTags: ['Datasets'],
        }),

        getDatasetsBySource: builder.query<Dataset[], string>({
            query: (source) => `datasets/source/${encodeURIComponent(source)}`,
            providesTags: ['Datasets'],
        }),

        getDatasetsByFormat: builder.query<Dataset[], string>({
            query: (format) => `datasets/format/${encodeURIComponent(format)}`,
            providesTags: ['Datasets'],
        }),

        // For search functionality
        searchDatasets: builder.query<Dataset[], string>({
            query: (searchTerm) => `datasets/search?q=${encodeURIComponent(searchTerm)}`,
            providesTags: ['Datasets'],
        }),

        // Filter datasets by multiple criteria
        filterDatasets: builder.query<
            Dataset[],
            { sources?: string[]; formats?: string[]; categories?: string[] }
        >({
            query: (filters) => {
                // Convert the filters object to query parameters
                const params = new URLSearchParams();

                if (filters.sources && filters.sources.length > 0) {
                    filters.sources.forEach(source => params.append('source', source));
                }

                if (filters.formats && filters.formats.length > 0) {
                    filters.formats.forEach(format => params.append('format', format));
                }

                if (filters.categories && filters.categories.length > 0) {
                    filters.categories.forEach(category => params.append('category', category));
                }

                return `datasets/filter?${params.toString()}`;
            },
            providesTags: ['Datasets'],
        }),
    }),
});

export const {
    useGetDatasetsQuery,
    useGetDatasetByIdQuery,
    useGetDatasetsByCategoryQuery,
    useGetDatasetsBySourceQuery,
    useGetDatasetsByFormatQuery,
    useSearchDatasetsQuery,
    useFilterDatasetsQuery,
} = datasetsApi;