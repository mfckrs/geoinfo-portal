import { api } from './api';
import type { CareerPathway, Difficulty } from '../types';

export const careersApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getCareerPathways: builder.query<CareerPathway[], void>({
            query: () => 'careers',
            providesTags: ['Careers'],
        }),

        getCareerPathwayById: builder.query<CareerPathway, string>({
            query: (id) => `careers/${id}`,
            providesTags: (result, error, id) => [{ type: 'Careers', id }],
        }),

        getCareerPathwaysBySector: builder.query<CareerPathway[], string>({
            query: (sector) => `careers/sector/${encodeURIComponent(sector)}`,
            providesTags: ['Careers'],
        }),

        getCareerPathwaysByDemand: builder.query<CareerPathway[], Difficulty>({
            query: (demand) => `careers/demand/${demand}`,
            providesTags: ['Careers'],
        }),

        getCareerPathwaysByTopic: builder.query<CareerPathway[], string>({
            query: (topicId) => `careers/topic/${topicId}`,
            providesTags: ['Careers'],
        }),

        getCareerPathwaysBySkill: builder.query<CareerPathway[], string>({
            query: (skill) => `careers/skill/${encodeURIComponent(skill)}`,
            providesTags: ['Careers'],
        }),

        // For search functionality
        searchCareerPathways: builder.query<CareerPathway[], string>({
            query: (searchTerm) => `careers/search?q=${encodeURIComponent(searchTerm)}`,
            providesTags: ['Careers'],
        }),

        // Filter career pathways by multiple criteria
        filterCareerPathways: builder.query<
            CareerPathway[],
            { sectors?: string[]; demand?: Difficulty; skills?: string[] }
        >({
            query: (filters) => {
                // Convert the filters object to query parameters
                const params = new URLSearchParams();

                if (filters.sectors && filters.sectors.length > 0) {
                    filters.sectors.forEach(sector => params.append('sector', sector));
                }

                if (filters.demand) {
                    params.set('demand', filters.demand);
                }

                if (filters.skills && filters.skills.length > 0) {
                    filters.skills.forEach(skill => params.append('skill', skill));
                }

                return `careers/filter?${params.toString()}`;
            },
            providesTags: ['Careers'],
        }),
    }),
});

export const {
    useGetCareerPathwaysQuery,
    useGetCareerPathwayByIdQuery,
    useGetCareerPathwaysBySectorQuery,
    useGetCareerPathwaysByDemandQuery,
    useGetCareerPathwaysByTopicQuery,
    useGetCareerPathwaysBySkillQuery,
    useSearchCareerPathwaysQuery,
    useFilterCareerPathwaysQuery,
} = careersApi;