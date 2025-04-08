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

const EquipmentCard: React.FC<EquipmentCardProps> = ({
                                                         equipment,
                                                         compact = false
                                                     }) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const handleReserveClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(setSelectedEquipmentId(equipment.id));
        dispatch(setShowReservationModal(true));
    };

    const handleCardClick = () => {
        dispatch(setSelectedEquipmentId(equipment.id));
    };

    return (
        <div
            className={`equipment-card ${compact ? 'compact' : ''}`}
            onClick={handleCardClick}
        >
            <div className="equipment-card-header">
                <h3 className="equipment-name">{equipment.name}</h3>
                <div className="equipment-type-badge">{equipment.type}</div>
            </div>

            <div className="equipment-card-content">
                {!compact && (
                    <p className="equipment-description">{equipment.description}</p>
                )}

                <div className="equipment-details">
                    <div className="equipment-detail">
                        <span className="detail-label">{t('location')}:</span>
                        <span className="detail-value">{equipment.location}</span>
                    </div>

                    <div className="equipment-detail">
                        <span className="detail-label">{t('availability')}:</span>
                        <AvailabilityIndicator
                            status={equipment.availability}
                            size={compact ? 'small' : 'medium'}
                        />
                    </div>
                </div>

                {!compact && equipment.restrictions && (
                    <div className="equipment-restrictions">
                        <h4>{t('restrictions')}:</h4>
                        <p>{equipment.restrictions}</p>
                    </div>
                )}

                {!compact && equipment.relatedTopics && equipment.relatedTopics.length > 0 && (
                    <div className="related-topics">
                        <h4>{t('related_topics')}:</h4>
                        <div className="topic-tags">
                            {equipment.relatedTopics.map(topicId => (
                                <Link
                                    key={topicId}
                                    to={`/topics/${topicId}`}
                                    className="topic-tag"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {topicId}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="equipment-card-footer">
                <Link
                    to={`/equipment/${equipment.id}`}
                    className="view-details-button"
                    onClick={(e) => e.stopPropagation()}
                >
                    {t('view_details')}
                </Link>

                <button
                    className={`reserve-button ${equipment.availability === 'Unavailable' ? 'disabled' : ''}`}
                    onClick={handleReserveClick}
                    disabled={equipment.availability === 'Unavailable'}
                >
                    {t('reserve')}
                </button>
            </div>
        </div>
    );
};

export default EquipmentCard;