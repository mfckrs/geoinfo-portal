import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AvailabilityStatus } from '../../types';

interface EquipmentState {
    selectedTypes: string[];
    selectedLocations: string[];
    selectedAvailability: AvailabilityStatus | null;
    selectedEquipmentId: string | null;
    searchTerm: string;
    currentPage: number;
    itemsPerPage: number;
    viewMode: 'grid' | 'list';
    sortBy: 'name' | 'type' | 'availability';
    sortOrder: 'asc' | 'desc';
    reservationHistory: {
        equipmentId: string;
        startDate: string;
        endDate: string;
        status: 'pending' | 'approved' | 'rejected' | 'completed';
        timestamp: number;
    }[];
    showReservationModal: boolean;
    reservationDates: {
        startDate: string | null;
        endDate: string | null;
    };
}

const initialState: EquipmentState = {
    selectedTypes: [],
    selectedLocations: [],
    selectedAvailability: null,
    selectedEquipmentId: null,
    searchTerm: '',
    currentPage: 1,
    itemsPerPage: 8,
    viewMode: 'grid',
    sortBy: 'availability',
    sortOrder: 'asc',
    reservationHistory: [],
    showReservationModal: false,
    reservationDates: {
        startDate: null,
        endDate: null
    }
};

export const equipmentSlice = createSlice({
    name: 'equipment',
    initialState,
    reducers: {
        addSelectedType: (state, action: PayloadAction<string>) => {
            if (!state.selectedTypes.includes(action.payload)) {
                state.selectedTypes.push(action.payload);
                state.currentPage = 1;
            }
        },

        removeSelectedType: (state, action: PayloadAction<string>) => {
            state.selectedTypes = state.selectedTypes.filter(type => type !== action.payload);
            state.currentPage = 1;
        },

        clearSelectedTypes: (state) => {
            state.selectedTypes = [];
            state.currentPage = 1;
        },

        addSelectedLocation: (state, action: PayloadAction<string>) => {
            if (!state.selectedLocations.includes(action.payload)) {
                state.selectedLocations.push(action.payload);
                state.currentPage = 1;
            }
        },

        removeSelectedLocation: (state, action: PayloadAction<string>) => {
            state.selectedLocations = state.selectedLocations.filter(location => location !== action.payload);
            state.currentPage = 1;
        },

        clearSelectedLocations: (state) => {
            state.selectedLocations = [];
            state.currentPage = 1;
        },

        setSelectedAvailability: (state, action: PayloadAction<AvailabilityStatus | null>) => {
            state.selectedAvailability = action.payload;
            state.currentPage = 1;
        },

        setSelectedEquipmentId: (state, action: PayloadAction<string | null>) => {
            state.selectedEquipmentId = action.payload;
        },

        setSearchTerm: (state, action: PayloadAction<string>) => {
            state.searchTerm = action.payload;
            state.currentPage = 1;
        },

        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },

        setItemsPerPage: (state, action: PayloadAction<number>) => {
            state.itemsPerPage = action.payload;
            state.currentPage = 1;
        },

        setViewMode: (state, action: PayloadAction<'grid' | 'list'>) => {
            state.viewMode = action.payload;
        },

        setSortBy: (state, action: PayloadAction<'name' | 'type' | 'availability'>) => {
            state.sortBy = action.payload;
        },

        setSortOrder: (state, action: PayloadAction<'asc' | 'desc'>) => {
            state.sortOrder = action.payload;
        },

        // Reservation-related actions
        addReservation: (state, action: PayloadAction<{
            equipmentId: string;
            startDate: string;
            endDate: string;
            status: 'pending' | 'approved' | 'rejected' | 'completed';
        }>) => {
            const { equipmentId, startDate, endDate, status } = action.payload;

            state.reservationHistory.unshift({
                equipmentId,
                startDate,
                endDate,
                status,
                timestamp: Date.now()
            });

            // Reset reservation modal state
            state.showReservationModal = false;
            state.reservationDates = {
                startDate: null,
                endDate: null
            };
        },

        updateReservationStatus: (state, action: PayloadAction<{
            index: number;
            status: 'pending' | 'approved' | 'rejected' | 'completed';
        }>) => {
            const { index, status } = action.payload;

            if (index >= 0 && index < state.reservationHistory.length) {
                state.reservationHistory[index].status = status;
            }
        },

        clearReservationHistory: (state) => {
            state.reservationHistory = [];
        },

        setShowReservationModal: (state, action: PayloadAction<boolean>) => {
            state.showReservationModal = action.payload;

            // Reset dates if closing modal
            if (!action.payload) {
                state.reservationDates = {
                    startDate: null,
                    endDate: null
                };
            }
        },

        setReservationDates: (state, action: PayloadAction<{
            startDate: string | null;
            endDate: string | null;
        }>) => {
            state.reservationDates = action.payload;
        },

        resetFilters: (state) => {
            state.selectedTypes = [];
            state.selectedLocations = [];
            state.selectedAvailability = null;
            state.searchTerm = '';
            state.currentPage = 1;
            state.sortBy = 'availability';
            state.sortOrder = 'asc';
        },
    },
});

export const {
    addSelectedType,
    removeSelectedType,
    clearSelectedTypes,
    addSelectedLocation,
    removeSelectedLocation,
    clearSelectedLocations,
    setSelectedAvailability,
    setSelectedEquipmentId,
    setSearchTerm,
    setCurrentPage,
    setItemsPerPage,
    setViewMode,
    setSortBy,
    setSortOrder,
    addReservation,
    updateReservationStatus,
    clearReservationHistory,
    setShowReservationModal,
    setReservationDates,
    resetFilters
} = equipmentSlice.actions;

export default equipmentSlice.reducer;