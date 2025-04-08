import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DatasetsState {
    selectedSources: string[];
    selectedFormats: string[];
    selectedCategories: string[];
    selectedDatasetId: string | null;
    searchTerm: string;
    currentPage: number;
    itemsPerPage: number;
    viewMode: 'grid' | 'list';
    sortBy: 'name' | 'source' | 'lastUpdated' | 'size';
    sortOrder: 'asc' | 'desc';
    downloadHistory: {
        datasetId: string;
        timestamp: number;
    }[];
    expandedFilters: boolean;
}

const initialState: DatasetsState = {
    selectedSources: [],
    selectedFormats: [],
    selectedCategories: [],
    selectedDatasetId: null,
    searchTerm: '',
    currentPage: 1,
    itemsPerPage: 9,
    viewMode: 'grid',
    sortBy: 'lastUpdated',
    sortOrder: 'desc',
    downloadHistory: [],
    expandedFilters: false,
};

export const datasetsSlice = createSlice({
    name: 'datasets',
    initialState,
    reducers: {
        addSelectedSource: (state, action: PayloadAction<string>) => {
            if (!state.selectedSources.includes(action.payload)) {
                state.selectedSources.push(action.payload);
                state.currentPage = 1;
            }
        },

        removeSelectedSource: (state, action: PayloadAction<string>) => {
            state.selectedSources = state.selectedSources.filter(source => source !== action.payload);
            state.currentPage = 1;
        },

        clearSelectedSources: (state) => {
            state.selectedSources = [];
            state.currentPage = 1;
        },

        addSelectedFormat: (state, action: PayloadAction<string>) => {
            if (!state.selectedFormats.includes(action.payload)) {
                state.selectedFormats.push(action.payload);
                state.currentPage = 1;
            }
        },

        removeSelectedFormat: (state, action: PayloadAction<string>) => {
            state.selectedFormats = state.selectedFormats.filter(format => format !== action.payload);
            state.currentPage = 1;
        },

        clearSelectedFormats: (state) => {
            state.selectedFormats = [];
            state.currentPage = 1;
        },

        addSelectedCategory: (state, action: PayloadAction<string>) => {
            if (!state.selectedCategories.includes(action.payload)) {
                state.selectedCategories.push(action.payload);
                state.currentPage = 1;
            }
        },

        removeSelectedCategory: (state, action: PayloadAction<string>) => {
            state.selectedCategories = state.selectedCategories.filter(category => category !== action.payload);
            state.currentPage = 1;
        },

        clearSelectedCategories: (state) => {
            state.selectedCategories = [];
            state.currentPage = 1;
        },

        setSelectedDatasetId: (state, action: PayloadAction<string | null>) => {
            state.selectedDatasetId = action.payload;
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

        setSortBy: (state, action: PayloadAction<'name' | 'source' | 'lastUpdated' | 'size'>) => {
            state.sortBy = action.payload;
        },

        setSortOrder: (state, action: PayloadAction<'asc' | 'desc'>) => {
            state.sortOrder = action.payload;
        },

        addToDownloadHistory: (state, action: PayloadAction<string>) => {
            // Add dataset to download history with current timestamp
            state.downloadHistory.unshift({
                datasetId: action.payload,
                timestamp: Date.now()
            });

            // Keep only the last 20 downloads
            if (state.downloadHistory.length > 20) {
                state.downloadHistory = state.downloadHistory.slice(0, 20);
            }
        },

        clearDownloadHistory: (state) => {
            state.downloadHistory = [];
        },

        setExpandedFilters: (state, action: PayloadAction<boolean>) => {
            state.expandedFilters = action.payload;
        },

        resetFilters: (state) => {
            state.selectedSources = [];
            state.selectedFormats = [];
            state.selectedCategories = [];
            state.searchTerm = '';
            state.currentPage = 1;
            state.sortBy = 'lastUpdated';
            state.sortOrder = 'desc';
        },
    },
});

export const {
    addSelectedSource,
    removeSelectedSource,
    clearSelectedSources,
    addSelectedFormat,
    removeSelectedFormat,
    clearSelectedFormats,
    addSelectedCategory,
    removeSelectedCategory,
    clearSelectedCategories,
    setSelectedDatasetId,
    setSearchTerm,
    setCurrentPage,
    setItemsPerPage,
    setViewMode,
    setSortBy,
    setSortOrder,
    addToDownloadHistory,
    clearDownloadHistory,
    setExpandedFilters,
    resetFilters
} = datasetsSlice.actions;

export default datasetsSlice.reducer;