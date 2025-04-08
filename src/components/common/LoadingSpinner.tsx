import React from 'react';
import { useTranslation } from 'react-i18next';

interface LoadingSpinnerProps {
    size?: 'small' | 'medium' | 'large';
    message?: string;
    fullScreen?: boolean;
    overlay?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
                                                           size = 'medium',
                                                           message,
                                                           fullScreen = false,
                                                           overlay = false
                                                       }) => {
    const { t } = useTranslation();
    const defaultMessage = t('loading');

    // Determine spinner size classes
    const sizeClass = {
        small: 'spinner-small',
        medium: 'spinner-medium',
        large: 'spinner-large'
    }[size];

    // Determine container classes
    const containerClasses = [
        'loading-spinner-container',
        fullScreen ? 'full-screen' : '',
        overlay ? 'overlay' : ''
    ].filter(Boolean).join(' ');

    return (
        <div className={containerClasses}>
            <div className="spinner-content">
                <div className={`spinner ${sizeClass}`}>
                    <div className="spinner-circle"></div>
                    <div className="spinner-circle"></div>
                    <div className="spinner-circle"></div>
                    <div className="spinner-circle"></div>
                </div>
                {(message || defaultMessage) && (
                    <p className="spinner-message">{message || defaultMessage}</p>
                )}
            </div>
        </div>
    );
};

export default LoadingSpinner;