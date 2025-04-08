import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setLanguage, Language } from '../../features/language/languageSlice';

const LanguageSelector: React.FC = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { currentLanguage } = useAppSelector(state => state.language);

    const handleLanguageChange = (language: Language) => {
        dispatch(setLanguage(language));
    };

    return (
        <div className="language-selector">
            <button
                onClick={() => handleLanguageChange('en')}
                className={currentLanguage === 'en' ? 'active' : ''}
                disabled={currentLanguage === 'en'}
                title={t('english')}
                aria-label={t('english')}
            >
                EN
            </button>
            <button
                onClick={() => handleLanguageChange('he')}
                className={currentLanguage === 'he' ? 'active' : ''}
                disabled={currentLanguage === 'he'}
                title={t('hebrew')}
                aria-label={t('hebrew')}
            >
                עב
            </button>
            <button
                onClick={() => handleLanguageChange('ar')}
                className={currentLanguage === 'ar' ? 'active' : ''}
                disabled={currentLanguage === 'ar'}
                title={t('arabic')}
                aria-label={t('arabic')}
            >
                عر
            </button>
        </div>
    );
};

export default LanguageSelector;