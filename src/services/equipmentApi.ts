import { api } from './api';
import type { Equipment, AvailabilityStatus } from '../types';

export const equipmentApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getEquipment: builder.query<Equipment[], void>({
            query: () => 'equipment',
            providesTags: ['Equipment'],
        }),

        getEquipmentById: builder.query<Equipment, string>({
            query: (id) => `equipment/${id}`,
            providesTags: (result, error, id) => [{ type: 'Equipment', id }],
        }),

        getEquipmentByType: builder.query<Equipment[], string>({
            query: (type) => `equipment/type/${encodeURIComponent(type)}`,
            providesTags: ['Equipment'],
        }),

        getEquipmentByTopic: builder.query<Equipment[], string>({
            query: (topicId) => `equipment/topic/${topicId}`,
            providesTags: ['Equipment'],
        }),

        getEquipmentByAvailability: builder.query<Equipment[], AvailabilityStatus>({
            query: (status) => `equipment/availability/${status}`,
            providesTags: ['Equipment'],
        }),

        // For search functionality
        searchEquipment: builder.query<Equipment[], string>({
            query: (searchTerm) => `equipment/search?q=${encodeURIComponent(searchTerm)}`,
            providesTags: ['Equipment'],
        }),

        // Reserve equipment (example for a mutation)
        reserveEquipment: builder.mutation<
            { success: boolean; message: string },
            { equipmentId: string; startDate: string; endDate: string; userId: string }
        >({
            query: (reservationData) => ({
                url: 'equipment/reserve',
                method: 'POST',
                body: reservationData,
            }),
            invalidatesTags: ['Equipment'],
        }),

        // Filter equipment by multiple criteria
        filterEquipment: builder.query<
            Equipment[],
            { types?: string[]; availability?: AvailabilityStatus; location?: string }
        >({
            query: (filters) => {
                // Convert the filters object to query parameters
                const params = new URLSearchParams();

                if (filters.types && filters.types.length > 0) {
                    filters.types.forEach(type => params.append('type', type));
                }

                if (filters.availability) {
                    params.set('availability', filters.availability);
                }

                if (filters.location) {
                    params.set('location', filters.location);
                }

                return `equipment/filter?${params.toString()}`;
            },
            providesTags: ['Equipment'],
        }),
    }),
});

export const {
    useGetEquipmentQuery,
    useGetEquipmentByIdQuery,
    useGetEquipmentByTypeQuery,
    useGetEquipmentByTopicQuery,
    useGetEquipmentByAvailabilityQuery,
    useSearchEquipmentQuery,
    useReserveEquipmentMutation,
    useFilterEquipmentQuery,
} = equipmentApi;