import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import i18n from '../../i18n';

export type Language = 'en' | 'he' | 'ar';

interface LanguageState {
    currentLanguage: Language;
    direction: 'ltr' | 'rtl';
}

const initialState: LanguageState = {
    currentLanguage: (i18n.language as Language) || 'en',
    direction: i18n.language === 'he' || i18n.language === 'ar' ? 'rtl' : 'ltr',
};

export const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        setLanguage: (state, action: PayloadAction<Language>) => {
            state.currentLanguage = action.payload;
            // Update direction based on language
            state.direction = action.payload === 'he' || action.payload === 'ar' ? 'rtl' : 'ltr';

            // Update i18n language
            i18n.changeLanguage(action.payload);

            // Update document attributes
            document.documentElement.lang = action.payload;
            document.documentElement.dir = state.direction;
        },
    },
});

export const { setLanguage } = languageSlice.actions;

export default languageSlice.reducer;