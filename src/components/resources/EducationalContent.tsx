import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Resource } from '../../types';

interface EducationalContentProps {
    category: string;
    title: string;
    description: string;
    resources: Resource[];
}

const EducationalContent: React.FC<EducationalContentProps> = ({
                                                                   category,
                                                                   title,
                                                                   description,
                                                                   resources
                                                               }) => {
    const { t } = useTranslation();
    const [expanded, setExpanded] = useState(false);

    const toggleExpanded = () => {
        setExpanded(!expanded);
    };

    // Group resources by type
    const officialDocs = resources.filter(r => r.type === 'Documentation');
    const tutorials = resources.filter(r => r.type === 'Tutorial');
    const theory = resources.filter(r => ['Academic', 'Documentation'].includes(r.type));
    const community = resources.filter(r => r.type === 'Community');

    return (
        <div className="educational-content">
            <div
                className="educational-header"
                onClick={toggleExpanded}
                role="button"
                aria-expanded={expanded}
            >
                <h2>{title}</h2>
                <span className={`expand-icon ${expanded ? 'expanded' : ''}`}>
          {expanded ? '−' : '+'}
        </span>
            </div>

            {expanded && (
                <div className="educational-body">
                    <p className="educational-description">{description}</p>

                    <div className="resource-sections">
                        {officialDocs.length > 0 && (
                            <div className="resource-section">
                                <h3>{t('official_documentation')}</h3>
                                <ul className="resource-list">
                                    {officialDocs.map(doc => (
                                        <li key={doc.id} className="resource-item">
                                            <a
                                                href={doc.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="resource-link"
                                            >
                                                {doc.title}
                                            </a>
                                            <span className="resource-description">{doc.description}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {tutorials.length > 0 && (
                            <div className="resource-section">
                                <h3>{t('tutorials')}</h3>
                                <ul className="resource-list">
                                    {tutorials.map(tutorial => (
                                        <li key={tutorial.id} className="resource-item">
                                            <a
                                                href={tutorial.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="resource-link"
                                            >
                                                {tutorial.title}
                                            </a>
                                            <span className="resource-description">{tutorial.description}</span>
                                            <div className="resource-tags">
                                                {tutorial.tags.map(tag => (
                                                    <span key={tag} className="resource-tag">{tag}</span>
                                                ))}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {theory.length > 0 && (
                            <div className="resource-section">
                                <h3>{t('theoretical_resources')}</h3>
                                <ul className="resource-list">
                                    {theory.map(resource => (
                                        <li key={resource.id} className="resource-item">
                                            <a
                                                href={resource.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="resource-link"
                                            >
                                                {resource.title}
                                            </a>
                                            <span className="resource-description">{resource.description}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {community.length > 0 && (
                            <div className="resource-section">
                                <h3>{t('community_resources')}</h3>
                                <ul className="resource-list">
                                    {community.map(resource => (
                                        <li key={resource.id} className="resource-item">
                                            <a
                                                href={resource.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="resource-link"
                                            >
                                                {resource.title}
                                            </a>
                                            <span className="resource-description">{resource.description}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    <div className="show-all-button-container">
                        <button
                            className="show-all-button"
                            onClick={() => window.open(`/resources?category=${category}`, '_blank')}
                        >
                            {t('show_all_resources')}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EducationalContent;