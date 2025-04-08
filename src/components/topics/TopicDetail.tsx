import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setSelectedTopic, addFavoriteTopic, removeFavoriteTopic } from '../../features/topics/topicsSlice';
import { useGetTopicByIdQuery } from '../../services/topicsApi';
import { useGetResourcesByTopicQuery } from '../../services/resourcesApi';
import { useGetDatasetsByCategoryQuery } from '../../services/datasetsApi';
import { useGetEquipmentByTopicQuery } from '../../services/equipmentApi';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorBoundary from '../common/ErrorBoundary';
import EducationalContent from '../resources/EducationalContent';
import ResourceCard from '../resources/ResourceCard';
import DatasetCard from '../datasets/DatasetCard';
import ProjectCategoryRadar from '../visualizations/ProjectCategoryRadar';
import SkillsBarChart from '../visualizations/SkillsBarChart';
import { CATEGORY_NAMES, PROJECT_CATEGORIES } from '../../utils/constants';
import { formatDifficulty } from '../../utils/formatters';
import type { Topic, Skill } from '../../types';
import './TopicDetail.css';

const TopicDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    // Get favorite topics from Redux store
    const { favoriteTopics } = useAppSelector(state => state.topics);
    const isFavorite = id ? favoriteTopics.includes(id) : false;

    // Fetch topic data
    const {
        data: topic,
        isLoading: isLoadingTopic,
        error: topicError
    } = useGetTopicByIdQuery(id || '');

    // Fetch related resources
    const {
        data: resources = [],
        isLoading: isLoadingResources
    } = useGetResourcesByTopicQuery(id || '', {
        skip: !id
    });

    // Fetch related datasets
    const {
        data: datasets = [],
        isLoading: isLoadingDatasets
    } = useGetDatasetsByCategoryQuery(topic?.categories?.[0] || '', {
        skip: !topic?.categories?.length
    });

    // Fetch related equipment
    const {
        data: equipment = [],
        isLoading: isLoadingEquipment
    } = useGetEquipmentByTopicQuery(id || '', {
        skip: !id
    });

    // Update selected topic in Redux store
    useEffect(() => {
        if (id) {
            dispatch(setSelectedTopic(id));
        }

        // Cleanup on unmount
        return () => {
            dispatch(setSelectedTopic(null));
        };
    }, [id, dispatch]);

    // Handle favorite toggle
    const handleToggleFavorite = () => {
        if (!id) return;

        if (isFavorite) {
            dispatch(removeFavoriteTopic(id));
        } else {
            dispatch(addFavoriteTopic(id));
        }
    };

    // Extract the primary category from topic
    const getPrimaryCategory = (topic?: Topic): string => {
        if (!topic?.categories?.length) return '';

        return topic.categories[0];
    };

    // Format category name for display
    const formatCategoryName = (categoryId: string): string => {
        return CATEGORY_NAMES[categoryId as keyof typeof CATEGORY_NAMES] || categoryId;
    };

    // Create skills array for visualization
    const createSkillsArray = (topic?: Topic): Skill[] => {
        if (!topic) return [];

        return [
            { name: t('topic_programming'), level: topic.programmingRequired, type: 'Technical' },
            { name: t('topic_difficulty'), level: topic.technicalDifficulty, type: 'Technical' },
            { name: t('topic_equipment'), level: topic.equipmentNeeds, type: 'Technical' },
            { name: t('topic_field_work'), level: topic.fieldWork, type: 'Technical' },
            { name: t('topic_career'), level: topic.careerRelevance, type: 'Soft' },
            { name: t('topic_time'), level: topic.timeInvestment, type: 'Soft' }
        ];
    };

    // Create data for radar chart
    const createRadarData = (topic?: Topic) => {
        if (!topic) return { categories: [], datasets: [] };

        const categories = [
            'topic_difficulty',
            'topic_programming',
            'topic_field_work',
            'topic_equipment',
            'topic_career',
            'topic_time'
        ];

        const difficultyToValue = (difficulty: string) => {
            switch (difficulty) {
                case 'High': return 90;
                case 'Medium': return 60;
                case 'Low': return 30;
                default: return 50;
            }
        };

        const datasets = [
            {
                name: topic.name,
                color: '#4285f4',
                values: [
                    difficultyToValue(topic.technicalDifficulty),
                    difficultyToValue(topic.programmingRequired),
                    difficultyToValue(topic.fieldWork),
                    difficultyToValue(topic.equipmentNeeds),
                    difficultyToValue(topic.careerRelevance),
                    difficultyToValue(topic.timeInvestment)
                ]
            }
        ];

        return { categories, datasets };
    };

    if (isLoadingTopic) {
        return <LoadingSpinner />;
    }

    if (topicError || !topic) {
        return <div className="error-message">{t('error_loading')}</div>;
    }

    const { categories, datasets } = createRadarData(topic);
    const skills = createSkillsArray(topic);
    const primaryCategory = getPrimaryCategory(topic);

    return (
        <ErrorBoundary>
            <div className="topic-detail-container">
                <div className="topic-header">
                    <div className="topic-header-content">
                        <div className="topic-breadcrumb">
                            <Link to="/topics">{t('topics_title')}</Link>
                            {primaryCategory && (
                                <>
                                    <span className="breadcrumb-separator">›</span>
                                    <span>{formatCategoryName(primaryCategory)}</span>
                                </>
                            )}
                        </div>

                        <h1 className="topic-title">{topic.name}</h1>

                        <div className="topic-actions">
                            <button
                                className={`favorite-button ${isFavorite ? 'favorite' : ''}`}
                                onClick={handleToggleFavorite}
                                aria-label={isFavorite ? t('remove_from_favorites') : t('add_to_favorites')}
                            >
                                <span className="favorite-icon">★</span>
                                <span>{isFavorite ? t('favorited') : t('add_to_favorites')}</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="topic-content">
                    <div className="topic-main">
                        <section className="topic-description">
                            <h2>{t('description')}</h2>
                            <p>{topic.description}</p>
                        </section>

                        <section className="topic-metrics">
                            <h2>{t('topic_metrics')}</h2>
                            <div className="metrics-container">
                                <div className="metrics-radar">
                                    <ProjectCategoryRadar
                                        categories={categories}
                                        datasets={datasets}
                                        width={400}
                                        height={400}
                                    />
                                </div>
                                <div className="metrics-bar">
                                    <SkillsBarChart
                                        skills={skills}
                                        width={500}
                                        height={300}
                                    />
                                </div>
                            </div>
                        </section>

                        <section className="topic-prerequisites">
                            <h2>{t('topic_prerequisites')}</h2>
                            {topic.prerequisites && topic.prerequisites.length > 0 ? (
                                <ul className="prerequisites-list">
                                    {topic.prerequisites.map((prereq, index) => (
                                        <li key={index}>{prereq}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p>{t('no_prerequisites')}</p>
                            )}
                        </section>

                        {resources.length > 0 && (
                            <section className="topic-resources">
                                <h2>{t('resources_title')}</h2>
                                <EducationalContent
                                    category={primaryCategory}
                                    title={t('educational_resources')}
                                    description={t('resources_description')}
                                    resources={resources}
                                />

                                <div className="resources-grid">
                                    {resources.slice(0, 4).map(resource => (
                                        <ResourceCard key={resource.id} resource={resource} />
                                    ))}
                                </div>

                                {resources.length > 4 && (
                                    <div className="view-all-container">
                                        <Link to={`/resources?topic=${id}`} className="view-all-button">
                                            {t('view_all_resources')}
                                        </Link>
                                    </div>
                                )}
                            </section>
                        )}

                        {datasets.length > 0 && (
                            <section className="topic-datasets">
                                <h2>{t('datasets_title')}</h2>
                                <p>{t('datasets_description')}</p>

                                <div className="datasets-grid">
                                    {datasets.slice(0, 4).map(dataset => (
                                        <DatasetCard key={dataset.id} dataset={dataset} />
                                    ))}
                                </div>

                                {datasets.length > 4 && (
                                    <div className="view-all-container">
                                        <Link to={`/datasets?category=${primaryCategory}`} className="view-all-button">
                                            {t('view_all_datasets')}
                                        </Link>
                                    </div>
                                )}
                            </section>
                        )}
                    </div>

                    <div className="topic-sidebar">
                        <div className="topic-info-card">
                            <h3>{t('topic_info')}</h3>

                            <div className="info-item">
                                <span className="info-label">{t('topic_difficulty')}</span>
                                <span className="info-value difficulty">
                                    {formatDifficulty(topic.technicalDifficulty)}
                                </span>
                            </div>

                            <div className="info-item">
                                <span className="info-label">{t('topic_programming')}</span>
                                <span className="info-value">
                                    {formatDifficulty(topic.programmingRequired)}
                                </span>
                            </div>

                            <div className="info-item">
                                <span className="info-label">{t('topic_field_work')}</span>
                                <span className="info-value">
                                    {formatDifficulty(topic.fieldWork)}
                                </span>
                            </div>

                            <div className="info-item">
                                <span className="info-label">{t('topic_equipment')}</span>
                                <span className="info-value">
                                    {formatDifficulty(topic.equipmentNeeds)}
                                </span>
                            </div>

                            <div className="info-item">
                                <span className="info-label">{t('topic_career')}</span>
                                <span className="info-value">
                                    {formatDifficulty(topic.careerRelevance)}
                                </span>
                            </div>

                            <div className="info-item">
                                <span className="info-label">{t('topic_time')}</span>
                                <span className="info-value">
                                    {formatDifficulty(topic.timeInvestment)}
                                </span>
                            </div>

                            {topic.categories &