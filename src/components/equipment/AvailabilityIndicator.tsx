import React from 'react';
import { useTranslation } from 'react-i18next';
import { AvailabilityStatus } from '../../types';

interface AvailabilityIndicatorProps {
    status: AvailabilityStatus;
    showLabel?: boolean;
    size?: 'small' | 'medium' | 'large';
    className?: string;
}

/**
 * Component for displaying equipment availability status with a color-coded indicator
 */
const AvailabilityIndicator: React.FC<AvailabilityIndicatorProps> = ({
                                                                         status,
                                                                         showLabel = true,
                                                                         size = 'medium',
                                                                         className = '',
                                                                     }) => {
    const { t } = useTranslation();

    // Determine indicator styles based on status and size
    const getIndicatorStyles = () => {
        const baseClasses = 'availability-indicator-dot rounded-full inline-block';
        const sizeClasses = {
            small: 'w-2 h-2',
            medium: 'w-3 h-3',
            large: 'w-4 h-4'
        };

        const statusClasses = {
            Available: 'bg-green-500',
            Limited: 'bg-yellow-500',
            Unavailable: 'bg-red-500'
        };

        return `${baseClasses} ${sizeClasses[size]} ${statusClasses[status]}`;
    };

    // Get translated status text
    const getStatusText = () => {
        switch (status) {
            case 'Available':
                return t('equipment_available');
            case 'Limited':
                return t('equipment_limited');
            case 'Unavailable':
                return t('equipment_unavailable');
            default:
                return status;
        }
    };

    return (
        <div className={`availability-indicator flex items-center ${className}`}>
            <span className={getIndicatorStyles()} aria-hidden="true"></span>
            {showLabel && (
                <span className="ml-2 text-sm whitespace-nowrap">
                    {getStatusText()}
                </span>
            )}
        </div>
    );
};

export default AvailabilityIndicator;