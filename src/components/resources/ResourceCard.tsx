import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { Resource, ResourceType } from '../../types';

interface ResourceCardProps {
    resource: Resource;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource }) => {
    const { t } = useTranslation();

    // Map resource type to color class
    const getTypeColorClass = (type: ResourceType): string => {
        switch (type) {
            case 'Academic':
                return 'resource-type-academic';
            case 'Tutorial':
                return 'resource-type-tutorial';
            case 'Documentation':
                return 'resource-type-documentation';
            case 'Community':
                return 'resource-type-community';
            case 'Tool':
                return 'resource-type-tool';
            default:
                return 'resource-type-default';
        }
    };

    // Map difficulty to className
    const getDifficultyClass = (difficulty: string): string => {
        switch (difficulty) {
            case 'Low':
                return 'difficulty-low';
            case 'Medium':
                return 'difficulty-medium';
            case 'High':
                return 'difficulty-high';
            default:
                return 'difficulty-medium';
        }
    };

    return (
        <div className="resource-card">
            <div className="resource-card-header">
        <span className={`resource-type-badge ${getTypeColorClass(resource.type)}`}>
          {t(`resource_type_${resource.type.toLowerCase()}`)}
        </span>
                <span className={`difficulty-badge ${getDifficultyClass(resource.difficulty)}`}>
          {t(resource.difficulty.toLowerCase())}
        </span>
            </div>

            <div className="resource-card-body">
                <h3 className="resource-title">{resource.title}</h3>
                <p className="resource-description">{resource.description}</p>

                <div className="resource-tags">
                    {resource.tags.map(tag => (
                        <span key={tag} className="resource-tag">
              {tag}
            </span>
                    ))}
                </div>
            </div>

            <div className="resource-card-footer">
                <Link to={`/resources/${resource.id}`} className="resource-details-button">
                    {t('view_details')}
                </Link>
                <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="resource-visit-button"
                >
                    {t('visit_website')}
                </a>
            </div>
        </div>
    );
};

export default ResourceCard;