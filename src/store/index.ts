import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import languageReducer from '../features/language/languageSlice';
import questionnaireReducer from '../features/questionnaire/questionnaireSlice';
import topicsReducer from '../features/topics/topicsSlice';
import datasetsReducer from '../features/datasets/datasetsSlice';
import {api} from '../services/api';

export const store = configureStore({
    reducer: {
        language: languageReducer,
        questionnaire: questionnaireReducer,
        topics: topicsReducer,
        datasets: datasetsReducer,
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
});

// Optional, but required for refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;