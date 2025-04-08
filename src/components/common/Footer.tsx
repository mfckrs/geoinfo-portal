import { useTranslation } from 'react-i18next';
import React from "react";

const Footer: React.FC = () => {
    const { t } = useTranslation();
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-content">
                <p>
                    &copy; {currentYear} {t('footer_copyright')} - {t('subtitle')}
                </p>
            </div>
        </footer>
    );
};

export default Footer;