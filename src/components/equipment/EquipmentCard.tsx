import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Equipment } from '../../types';
import { useAppDispatch } from '../../store/hooks';
import { setSelectedEquipmentId, setShowReservationModal } from '../../features/equipment/equipmentSlice';
import AvailabilityIndicator from './AvailabilityIndicator';

interface EquipmentCardProps {
    equipment: Equipment;
    compact?: boolean;
}

/**
 * Component for displaying an equipment item as a card
 */
const EquipmentCard: React.FC<EquipmentCardProps> = ({
                                                         equipment,
                                                         compact = false
                                                     }) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    // Handle click on Reserve button
    const handleReserveClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        dispatch(setSelectedEquipmentId(equipment.id));
        dispatch(setShowReservationModal(true));
    };

    // Handle click on card (to navigate to details)
    const handleCardClick = () => {
        dispatch(setSelectedEquipmentId(equipment.id));
    };

    return (
        <div
            className="equipment-card bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-200 hover:shadow-lg hover:-translate-y-1"
            onClick={handleCardClick}
        >
            <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">{equipment.name}</h3>
                    <AvailabilityIndicator
                        status={equipment.availability}
                        showLabel={!compact}
                        size={compact ? 'small' : 'medium'}
                    />
                </div>

                <div className="equipment-type text-sm text-gray-600 mb-2">
                    {equipment.type}
                </div>

                {!compact && (
                    <>
                        <p className="text-gray-700 text-sm mb-3">
                            {equipment.description.length > 120
                                ? `${equipment.description.substring(0, 120)}...`
                                : equipment.description}
                        </p>

                        <div className="text-sm text-gray-600 mb-3">
                            <span className="font-medium">{t('location')}:</span> {equipment.location}
                        </div>

                        {equipment.restrictions && (
                            <div className="text-sm text-gray-600 mb-3">
                                <span className="font-medium">{t('restrictions')}:</span> {equipment.restrictions}
                            </div>
                        )}
                    </>
                )}

                <div className="flex justify-between items-center mt-3">
                    <Link
                        to={`/equipment/${equipment.id}`}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                        {t('view_details')}
                    </Link>

                    {equipment.availability !== 'Unavailable' && (
                        <button
                            onClick={handleReserveClick}
                            className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                            disabled={equipment.availability === 'Unavailable'}
                        >
                            {t('reserve')}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EquipmentCard;