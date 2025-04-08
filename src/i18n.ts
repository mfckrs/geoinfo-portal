import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from './locales/en/translation.json';
import heTranslation from './locales/he/translation.json';
import arTranslation from './locales/ar/translation.json';

// Resources containing the translations
const resources = {
    en: {
        translation: enTranslation
    },
    he: {
        translation: heTranslation
    },
    ar: {
        translation: arTranslation
    }
};

// Configure and initialize i18next
i18n
    // Detect user language
    .use(LanguageDetector)
    // Pass the i18n instance to react-i18next
    .use(initReactI18next)
    // Initialize i18next
    .init({
        resources,
        fallbackLng: 'en',

        // Debug mode in development
        debug: process.env.NODE_ENV === 'development',

        // Default namespace
        defaultNS: 'translation',

        // Interpolation configuration
        interpolation: {
            escapeValue: false, // Not needed for React as it escapes by default
        },

        // Detection options
        detection: {
            order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
            lookupQuerystring: 'lng',
            lookupCookie: 'i18next',
            lookupLocalStorage: 'i18nextLng',

            // Cache user language preference
            caches: ['localStorage', 'cookie'],

            // Optional expiration for cookies
            cookieExpirationDate: new Date(Date.now() + 2 * 365 * 24 * 60 * 60 * 1000), // 2 years
        },

        // Support for right-to-left languages
        react: {
            useSuspense: true,
        },
    });

// Function to set HTML attributes based on language
export const setLanguageAttributes = (language: string): void => {
    // Set the direction based on the language
    const direction = language === 'ar' || language === 'he' ? 'rtl' : 'ltr';
    document.documentElement.dir = direction;
    document.documentElement.lang = language;

    // Optional: Add a class to the html element for CSS targeting
    document.documentElement.classList.remove('rtl', 'ltr');
    document.documentElement.classList.add(direction);
};

// Set initial HTML attributes based on detected language
setLanguageAttributes(i18n.language);

// Listen for language changes
i18n.on('languageChanged', (lng) => {
    setLanguageAttributes(lng);
});

export default i18n;