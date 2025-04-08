import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TopicsState {
    selectedCategory: string | null;
    selectedTopic: string | null;
    searchTerm: string;
    filters: {
        technicalDifficulty: string[];
        programmingRequired: string[];
        fieldWork: string[];
        careerRelevance: string[];
    };
    favoriteTopics: string[]; // Stores IDs of favorite topics
}

const initialState: TopicsState = {
    selectedCategory: null,
    selectedTopic: null,
    searchTerm: '',
    filters: {
        technicalDifficulty: [],
        programmingRequired: [],
        fieldWork: [],
        careerRelevance: [],
    },
    favoriteTopics: [],
};

export const topicsSlice = createSlice({
    name: 'topics',
    initialState,
    reducers: {
        setSelectedCategory: (state, action: PayloadAction<string | null>) => {
            state.selectedCategory = action.payload;
        },
        setSelectedTopic: (state, action: PayloadAction<string | null>) => {
            state.selectedTopic = action.payload;
        },
        setSearchTerm: (state, action: PayloadAction<string>) => {
            state.searchTerm = action.payload;
        },
        addTechnicalDifficultyFilter: (state, action: PayloadAction<string>) => {
            if (!state.filters.technicalDifficulty.includes(action.payload)) {
                state.filters.technicalDifficulty.push(action.payload);
            }
        },
        removeTechnicalDifficultyFilter: (state, action: PayloadAction<string>) => {
            state.filters.technicalDifficulty = state.filters.technicalDifficulty.filter(
                filter => filter !== action.payload
            );
        },
        addProgrammingRequiredFilter: (state, action: PayloadAction<string>) => {
            if (!state.filters.programmingRequired.includes(action.payload)) {
                state.filters.programmingRequired.push(action.payload);
            }
        },
        removeProgrammingRequiredFilter: (state, action: PayloadAction<string>) => {
            state.filters.programmingRequired = state.filters.programmingRequired.filter(
                filter => filter !== action.payload
            );
        },
        addFieldWorkFilter: (state, action: PayloadAction<string>) => {
            if (!state.filters.fieldWork.includes(action.payload)) {
                state.filters.fieldWork.push(action.payload);
            }
        },
        removeFieldWorkFilter: (state, action: PayloadAction<string>) => {
            state.filters.fieldWork = state.filters.fieldWork.filter(
                filter => filter !== action.payload
            );
        },
        addCareerRelevanceFilter: (state, action: PayloadAction<string>) => {
            if (!state.filters.careerRelevance.includes(action.payload)) {
                state.filters.careerRelevance.push(action.payload);
            }
        },
        removeCareerRelevanceFilter: (state, action: PayloadAction<string>) => {
            state.filters.careerRelevance = state.filters.careerRelevance.filter(
                filter => filter !== action.payload
            );
        },
        clearAllFilters: (state) => {
            state.filters = {
                technicalDifficulty: [],
                programmingRequired: [],
                fieldWork: [],
                careerRelevance: [],
            };
        },
        addFavoriteTopic: (state, action: PayloadAction<string>) => {
            if (!state.favoriteTopics.includes(action.payload)) {
                state.favoriteTopics.push(action.payload);
            }
        },
        removeFavoriteTopic: (state, action: PayloadAction<string>) => {
            state.favoriteTopics = state.favoriteTopics.filter(id => id !== action.payload);
        },
    },
});

export const {
    setSelectedCategory,
    setSelectedTopic,
    setSearchTerm,
    addTechnicalDifficultyFilter,
    removeTechnicalDifficultyFilter,
    addProgrammingRequiredFilter,
    removeProgrammingRequiredFilter,
    addFieldWorkFilter,
    removeFieldWorkFilter,
    addCareerRelevanceFilter,
    removeCareerRelevanceFilter,
    clearAllFilters,
    addFavoriteTopic,
    removeFavoriteTopic,
} = topicsSlice.actions;

export default topicsSlice.reducer;