import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { ResourceType } from '../../types';

interface ResourcesState {
    selectedType: ResourceType | null;
    selectedCategory: string | null;
    selectedTags: string[];
    selectedResourceId: string | null;
    searchTerm: string;
    currentPage: number;
    itemsPerPage: number;
    viewMode: 'grid' | 'list';
    sortBy: 'title' | 'type' | 'difficulty';
    sortOrder: 'asc' | 'desc';
    recentlyViewed: string[]; // Array of resource IDs
}

const initialState: ResourcesState = {
    selectedType: null,
    selectedCategory: null,
    selectedTags: [],
    selectedResourceId: null,
    searchTerm: '',
    currentPage: 1,
    itemsPerPage: 12,
    viewMode: 'grid',
    sortBy: 'title',
    sortOrder: 'asc',
    recentlyViewed: [],
};

export const resourcesSlice = createSlice({
    name: 'resources',
    initialState,
    reducers: {
        setSelectedType: (state, action: PayloadAction<ResourceType | null>) => {
            state.selectedType = action.payload;
            // Reset to first page when changing filters
            state.currentPage = 1;
        },

        setSelectedCategory: (state, action: PayloadAction<string | null>) => {
            state.selectedCategory = action.payload;
            state.currentPage = 1;
        },

        addSelectedTag: (state, action: PayloadAction<string>) => {
            if (!state.selectedTags.includes(action.payload)) {
                state.selectedTags.push(action.payload);
                state.currentPage = 1;
            }
        },

        removeSelectedTag: (state, action: PayloadAction<string>) => {
            state.selectedTags = state.selectedTags.filter(tag => tag !== action.payload);
            state.currentPage = 1;
        },

        clearSelectedTags: (state) => {
            state.selectedTags = [];
            state.currentPage = 1;
        },

        setSelectedResourceId: (state, action: PayloadAction<string | null>) => {
            state.selectedResourceId = action.payload;

            // Add to recently viewed if it's a valid ID and not already at the front
            if (action.payload && state.selectedResourceId !== state.recentlyViewed[0]) {
                // Remove if it exists elsewhere in the array
                state.recentlyViewed = state.recentlyViewed.filter(id => id !== action.payload);

                // Add to the beginning
                state.recentlyViewed.unshift(action.payload);

                // Limit to 10 recent items
                if (state.recentlyViewed.length > 10) {
                    state.recentlyViewed = state.recentlyViewed.slice(0, 10);
                }
            }
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

        setSortBy: (state, action: PayloadAction<'title' | 'type' | 'difficulty'>) => {
            state.sortBy = action.payload;
            state.currentPage = 1;
        },

        setSortOrder: (state, action: PayloadAction<'asc' | 'desc'>) => {
            state.sortOrder = action.payload;
        },

        resetFilters: (state) => {
            state.selectedType = null;
            state.selectedCategory = null;
            state.selectedTags = [];
            state.searchTerm = '';
            state.currentPage = 1;
            state.sortBy = 'title';
            state.sortOrder = 'asc';
        },

        clearRecentlyViewed: (state) => {
            state.recentlyViewed = [];
        }
    },
});

export const {
    setSelectedType,
    setSelectedCategory,
    addSelectedTag,
    removeSelectedTag,
    clearSelectedTags,
    setSelectedResourceId,
    setSearchTerm,
    setCurrentPage,
    setItemsPerPage,
    setViewMode,
    setSortBy,
    setSortOrder,
    resetFilters,
    clearRecentlyViewed
} = resourcesSlice.actions;

export default resourcesSlice.reducer;