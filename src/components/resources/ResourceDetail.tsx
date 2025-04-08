import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { setSelectedResourceId } from '../../features/resources/resourcesSlice';
import { useGetResourceByIdQuery, useGetResourcesByTopicQuery } from '../../services/resourcesApi';
import { Resource, ResourceType } from '../../types';
import EducationalContentViewer from './EducationalContentViewer';
import LoadingSpinner from '../common/LoadingSpinner';
import { formatURL } from '../../utils/formatters';
import { educationalContent } from '../../educationalContentData';

interface ResourceDetailProps {
    resourceId: string;
}

const ResourceDetail: React.FC<ResourceDetailProps> = ({ resourceId }) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const [content, setContent] = useState<string | null>(null);

    // Fetch resource data using RTK Query
    const { data: resource, isLoading, error } = useGetResourceByIdQuery(resourceId);

    // Get related resources (by first category)
    const firstCategory = resource?.categories[0];
    const { data: relatedResources } = useGetResourcesByTopicQuery(
        firstCategory || '',
        { skip: !firstCategory }
    );

    // Add to recently viewed
    useEffect(() => {
        if (resourceId) {
            dispatch(setSelectedResourceId(resourceId));
        }

        // Load educational content if available
        if (resource) {
            const foundContent = educationalContent[resourceId];
            setContent(foundContent || null);
        }
    }, [resourceId, resource, dispatch]);

    // Helper function to get resource type color
    const getResourceTypeColor = (type: ResourceType): string => {
        switch (type) {
            case 'Academic':
                return '#ea4335'; // Red
            case 'Tutorial':
                return '#34a853'; // Green
            case 'Documentation':
                return '#4285f4'; // Blue
            case 'Community':
                return '#fbbc04'; // Yellow
            case 'Tool':
                return '#9c27b0'; // Purple
            default:
                return '#5f6368'; // Gray
        }
    };

    // Helper function to get resource type icon
    const getResourceTypeIcon = (type: ResourceType): string => {
        switch (type) {
            case 'Academic':
                return '📄'; // Document
            case 'Tutorial':
                return '📚'; // Books
            case 'Documentation':
                return '📋'; // Clipboard
            case 'Community':
                return '👥'; // People
            case 'Tool':
                return '🔧'; // Wrench
            default:
                return '📎'; // Clip
        }
    };

    if (isLoading) {
        return <div className="loading-container"><LoadingSpinner /></div>;
    }

    if (error || !resource) {
        return (
            <div className="error-container">
                <h2>{t('error_loading')}</h2>
                <p>{t('resource_not_found')}</p>
                <Link to="/resources" className="back-button">
                    {t('back_to_resources')}
                </Link>
            </div>
        );
    }

    // Filter out the current resource from related resources
    const filteredRelatedResources = relatedResources?.filter(r => r.id !== resourceId) || [];

    return (
        <div className="resource-detail-container">
            <div className="resource-detail-header">
                <Link to="/resources" className="back-link">
                    &larr; {t('back_to_resources')}
                </Link>

                <div className="resource-type-badge" style={{ backgroundColor: getResourceTypeColor(resource.type) }}>
                    {getResourceTypeIcon(resource.type)} {t(`resource_type_${resource.type.toLowerCase()}`)}
                </div>
            </div>

            <div className="resource-detail-content">
                <div className="resource-main-info">
                    <h1 className="resource-title">{resource.title}</h1>
                    <p className="resource-description">{resource.description}</p>

                    <div className="resource-details">
                        <div className="detail-item">
                            <span className="detail-label">{t('difficulty')}:</span>
                            <span className={`detail-value difficulty-${resource.difficulty.toLowerCase()}`}>
                                {t(resource.difficulty.toLowerCase())}
                            </span>
                        </div>

                        <div className="detail-item">
                            <span className="detail-label">{t('language')}:</span>
                            <span className="detail-value">{resource.language}</span>
                        </div>

                        <div className="detail-item">
                            <span className="detail-label">{t('categories')}:</span>
                            <div className="categories-list">
                                {resource.categories.map(category => (
                                    <Link
                                        key={category}
                                        to={`/resources?category=${category}`}
                                        className="category-tag"
                                    >
                                        {t(category)}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="detail-item">
                            <span className="detail-label">{t('tags')}:</span>
                            <div className="tags-list">
                                {resource.tags.map(tag => (
                                    <span key={tag} className="tag-item">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="resource-actions">
                        <a
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="primary-button"
                        >
                            {t('visit_website')} - {formatURL(resource.url)}
                        </a>
                    </div>
                </div>

                {content && (
                    <div className="resource-content-section">
                        <EducationalContentViewer
                            resource={resource}
                            content={content}
                        />
                    </div>
                )}

                {filteredRelatedResources.length > 0 && (
                    <div className="related-resources-section">
                        <h3>{t('related_resources')}</h3>
                        <div className="related-resources-list">
                            {filteredRelatedResources.slice(0, 4).map(relatedResource => (
                                <div key={relatedResource.id} className="related-resource-card">
                                    <div
                                        className="related-resource-type"
                                        style={{ backgroundColor: getResourceTypeColor(relatedResource.type) }}
                                    >
                                        {t(`resource_type_${relatedResource.type.toLowerCase()}`)}
                                    </div>
                                    <h4>{relatedResource.title}</h4>
                                    <p>{relatedResource.description.substring(0, 120)}...</p>
                                    <Link to={`/resources/${relatedResource.id}`} className="resource-link">
                                        {t('view_resource')} &rarr;
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResourceDetail;