import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import LanguageSelector from './LanguageSelector';

const Header = () => {
    const { t } = useTranslation();

    return (
        <header className="header">
            <div className="header-content">
                <div className="header-title">
                    <Link to="/">
                        <h1 className="app-title">{t('welcome')}</h1>
                        <p className="app-subtitle">{t('subtitle')}</p>
                    </Link>
                </div>
                <LanguageSelector />
            </div>
        </header>
    );
};

export default Header;