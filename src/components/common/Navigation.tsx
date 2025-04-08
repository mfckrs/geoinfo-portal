import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

const Navigation: React.FC = () => {
    const { t } = useTranslation();

    return (
        <nav className="nav">
            <div className="nav-container">
                <NavLink
                    to="/"
                    className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                    end
                >
                    {t('nav_home')}
                </NavLink>
                <NavLink
                    to="/questionnaire"
                    className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                >
                    {t('nav_questionnaire')}
                </NavLink>
                <NavLink
                    to="/topics"
                    className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                >
                    {t('nav_topics')}
                </NavLink>
                <NavLink
                    to="/datasets"
                    className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                >
                    {t('nav_datasets')}
                </NavLink>
                <NavLink
                    to="/resources"
                    className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                >
                    {t('nav_resources')}
                </NavLink>
                <NavLink
                    to="/careers"
                    className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                >
                    {t('nav_careers')}
                </NavLink>
                <NavLink
                    to="/equipment"
                    className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                >
                    {t('nav_availability')}
                </NavLink>
            </div>
        </nav>
    );
};

export default Navigation;