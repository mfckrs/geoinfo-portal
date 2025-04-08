import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../store/hooks';
import { setSelectedDatasetId, addToDownloadHistory } from '../../features/datasets/datasetsSlice';
import { formatDate, formatFileSize } from '../../utils/formatters';
import type { Dataset } from '../../types';

interface DatasetCardProps {
    dataset: Dataset;
    compact?: boolean;
}

const DatasetCard: React.FC<DatasetCardProps> = ({ dataset, compact = false }) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const handleCardClick = () => {
        dispatch(setSelectedDatasetId(dataset.id));
    };

    const handleDownload = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        // In a real app, you would trigger the actual download
        dispatch(addToDownloadHistory(dataset.id));
        window.open(dataset.url, '_blank');
    };

    // Format categories to display
    const formattedCategories = dataset.categories.slice(0, 3).join(', ') +
        (dataset.categories.length > 3 ? ` ${t('and')} ${dataset.categories.length - 3} ${t('more')}` : '');

    // Format the last updated date
    const formattedDate = formatDate(dataset.lastUpdated);

    return (
        <div className={`dataset-card ${compact ? 'compact' : ''}`} onClick={handleCardClick}>
            <div className="dataset-card-header">
                <span className={`dataset-format ${dataset.format.toLowerCase()}`}>
                    {dataset.format}
                </span>
                <span className={`dataset-auth ${dataset.requiresAuthentication ? 'required' : 'not-required'}`}>
                    {dataset.requiresAuthentication ? t('auth_required') : t('public')}
                </span>
            </div>

            <div className="dataset-card-body">
                <h3 className="dataset-title">{dataset.name}</h3>

                {!compact && (
                    <p className="dataset-description">{dataset.description}</p>
                )}

                <div className="dataset-metadata">
                    <div className="dataset-metadata-item">
                        <span className="metadata-label">{t('dataset_source')}:</span>
                        <span className="metadata-value">{dataset.source}</span>
                    </div>

                    <div className="dataset-metadata-item">
                        <span className="metadata-label">{t('dataset_size')}:</span>
                        <span className="metadata-value">{formatFileSize(parseInt(dataset.size))}</span>
                    </div>

                    {!compact && (
                        <div className="dataset-metadata-item">
                            <span className="metadata-label">{t('last_updated')}:</span>
                            <span className="metadata-value">{formattedDate}</span>
                        </div>
                    )}
                </div>

                {!compact && (
                    <div className="dataset-categories">
                        <span className="categories-label">{t('categories')}:</span>
                        <span className="categories-value">{formattedCategories}</span>
                    </div>
                )}
            </div>

            <div className="dataset-card-footer">
                <Link to={`/datasets/${dataset.id}`} className="dataset-details-button">
                    {t('view_details')}
                </Link>
                <button
                    className="dataset-download-button"
                    onClick={handleDownload}
                    title={t('download')}
                >
                    {t('download')}
                </button>
            </div>
        </div>
    );
};

export default DatasetCard;