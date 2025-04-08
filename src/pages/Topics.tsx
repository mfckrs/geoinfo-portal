import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

// Redux hooks and actions
import { useAppSelector, useAppDispatch } from '../store/hooks';
import {
    setSelectedCategory,
    setSearchTerm,
    clearAllFilters,
    addTechnicalDifficultyFilter,
    removeTechnicalDifficultyFilter,
    addProgrammingRequiredFilter,
    removeProgrammingRequiredFilter,
    addFieldWorkFilter,
    removeFieldWorkFilter,
    addCareerRelevanceFilter,
    removeCareerRelevanceFilter
} from '../features/topics/topicsSlice';

// API hooks
import { useGetTopicsQuery } from '../services/topicsApi';

// Components
import TopicCard from '../components/topics/TopicCard';
import QuadrantMatrix from '../components/visualizations/QuadrantMatrix';
import { PROJECT_CATEGORIES, CHART_COLORS, DIFFICULTY_LEVELS } from '../utils/constants';

// Types
import { Difficulty } from '../types';

const Topics: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    // Get states from Redux
    const {
        selectedCategory,
        searchTerm,
        filters
    } = useAppSelector(state => state.topics);

    // Fetch topics data
    const { data: topics, error, isLoading } = useGetTopicsQuery();

    // Local state for visualization
    const [showVisualization, setShowVisualization] = useState(false);

    // Handle category selection
    const handleCategoryChange = (category: string | null) => {
        dispatch(setSelectedCategory(category));
    };

    // Handle search input change
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchTerm(event.target.value));
    };

    // Handle filter changes
    const handleFilterChange = (filterType: string, value: string, isChecked: boolean) => {
        switch (filterType) {
            case 'technicalDifficulty':
                isChecked
                    ? dispatch(addTechnicalDifficultyFilter(value))
                    : dispatch(removeTechnicalDifficultyFilter(value));
                break;
            case 'programmingRequired':
                isChecked
                    ? dispatch(addProgrammingRequiredFilter(value))
                    : dispatch(removeProgrammingRequiredFilter(value));
                break;
            case 'fieldWork':
                isChecked
                    ? dispatch(addFieldWorkFilter(value))
                    : dispatch(removeFieldWorkFilter(value));
                break;
            case 'careerRelevance':
                isChecked
                    ? dispatch(addCareerRelevanceFilter(value))
                    : dispatch(removeCareerRelevanceFilter(value));
                break;
            default:
                break;
        }
    };

    // Handle clear all filters
    const handleClearFilters = () => {
        dispatch(clearAllFilters());
    };

    // Handle topic selection
    const handleTopicSelect = (topicId: string) => {
        navigate(`/topics/${topicId}`);
    };

    // Filter topics based on selected filters and search term
    const filteredTopics = React.useMemo(() => {
        if (!topics) return [];

        return topics.filter(topic => {
            // Filter by category
            if (selectedCategory && !topic.id.includes(selectedCategory)) {
                return false;
            }

            // Filter by search term
            if (searchTerm && !topic.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
                !topic.description.toLowerCase().includes(searchTerm.toLowerCase())) {
                return false;
            }

            // Filter by technical difficulty
            if (filters.technicalDifficulty.length > 0 &&
                !filters.technicalDifficulty.includes(topic.technicalDifficulty)) {
                return false;
            }

            // Filter by programming required
            if (filters.programmingRequired.length > 0 &&
                !filters.programmingRequired.includes(topic.programmingRequired)) {
                return false;
            }

            // Filter by field work
            if (filters.fieldWork.length > 0 &&
                !filters.fieldWork.includes(topic.fieldWork)) {
                return false;
            }

            // Filter by career relevance
            if (filters.careerRelevance.length > 0 &&
                !filters.careerRelevance.includes(topic.careerRelevance)) {
                return false;
            }

            return true;
        });
    }, [topics, selectedCategory, searchTerm, filters]);

    // Prepare data for quadrant matrix visualization
    const quadrantData = React.useMemo(() => {
        if (!topics) return [];

        return topics.map(topic => {
            // Determine which category this topic belongs to
            const categoryId = Object.keys(PROJECT_CATEGORIES).find(
                cat => topic.id.includes(cat)
            ) || 'ALGORITHM_IMPLEMENTATION';

            // Get the category color
            const color = CHART_COLORS[categoryId as keyof typeof CHART_COLORS] || CHART_COLORS.NEUTRAL;

            // Convert difficulty levels to numeric values for the chart
            const difficultyToValue = (difficulty: Difficulty): number => {
                switch (difficulty) {
                    case DIFFICULTY_LEVELS.HIGH:
                        return 80;
                    case DIFFICULTY_LEVELS.MEDIUM:
                        return 50;
                    case DIFFICULTY_LEVELS.LOW:
                        return 20;
                    default:
                        return 50;
                }
            };

            return {
                id: topic.id,
                name: topic.name,
                x: difficultyToValue(topic.technicalDifficulty), // Technical Difficulty as X-axis
                y: difficultyToValue(topic.careerRelevance), // Career Relevance as Y-axis
                radius: 10, // Consistent size for all topics
                color,
                category: CATEGORY_NAMES[categoryId as keyof typeof CATEGORY_NAMES] || categoryId
            };
        });
    }, [topics]);

    // Get category names from constants
    const CATEGORY_NAMES: Record<string, string> = Object.entries(PROJECT_CATEGORIES).reduce(
        (acc, [key, value]) => ({
            ...acc,
            [key]: t(`${value}_desc`) || value
        }),
        {}
    );

    if (isLoading) {
        return <div className="loading-container">{t('loading')}</div>;
    }

    if (error) {
        return <div className="error-container">{t('error_loading')}</div>;
    }

    return (
        <div className="topics-page">
            <div className="page-header">
                <h1>{t('topics_title')}</h1>
                <p className="page-description">
                    {t('topics_description')}
                </p>
            </div>

            <div className="topics-controls">
                <div className="search-container">
                    <input
                        type="text"
                        placeholder={t('search_placeholder')}
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="search-input"
                    />
                </div>

                <div className="category-filter">
                    <label>{t('category')}</label>
                    <select
                        value={selectedCategory || ''}
                        onChange={(e) => handleCategoryChange(e.target.value || null)}
                    >
                        <option value="">{t('all_categories')}</option>
                        {Object.entries(PROJECT_CATEGORIES).map(([key, value]) => (
                            <option key={key} value={key}>
                                {t(`${value}_desc`) || value}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    className="visualization-toggle"
                    onClick={() => setShowVisualization(!showVisualization)}
                >
                    {showVisualization ? t('hide_visualization') : t('show_visualization')}
                </button>
            </div>

            {showVisualization && (
                <div className="visualization-container">
                    <h2>{t('topic_comparison')}</h2>
                    <p>{t('topic_comparison_description')}</p>
                    <QuadrantMatrix
                        data={quadrantData}
                        width={800}
                        height={500}
                        onClick={handleTopicSelect}
                    />
                </div>
            )}

            <div className="topics-content">
                <div className="filters-sidebar">
                    <div className="filters-header">
                        <h3>{t('filter')}</h3>
                        <button onClick={handleClearFilters} className="clear-filters">
                            {t('clear_filters')}
                        </button>
                    </div>

                    <div className="filter-group">
                        <h4>{t('topic_difficulty')}</h4>
                        {Object.values(DIFFICULTY_LEVELS).map(difficulty => (
                            <label key={difficulty} className="filter-option">
                                <input
                                    type="checkbox"
                                    checked={filters.technicalDifficulty.includes(difficulty)}
                                    onChange={(e) => handleFilterChange('technicalDifficulty', difficulty, e.target.checked)}
                                />
                                {t(difficulty.toLowerCase())}
                            </label>
                        ))}
                    </div>

                    <div className="filter-group">
                        <h4>{t('topic_programming')}</h4>
                        {Object.values(DIFFICULTY_LEVELS).map(difficulty => (
                            <label key={difficulty} className="filter-option">
                                <input
                                    type="checkbox"
                                    checked={filters.programmingRequired.includes(difficulty)}
                                    onChange={(e) => handleFilterChange('programmingRequired', difficulty, e.target.checked)}
                                />
                                {t(difficulty.toLowerCase())}
                            </label>
                        ))}
                    </div>

                    <div className="filter-group">
                        <h4>{t('topic_field_work')}</h4>
                        {Object.values(DIFFICULTY_LEVELS).map(difficulty => (
                            <label key={difficulty} className="filter-option">
                                <input
                                    type="checkbox"
                                    checked={filters.fieldWork.includes(difficulty)}
                                    onChange={(e) => handleFilterChange('fieldWork', difficulty, e.target.checked)}
                                />
                                {t(difficulty.toLowerCase())}
                            </label>
                        ))}
                    </div>

                    <div className="filter-group">
                        <h4>{t('topic_career')}</h4>
                        {Object.values(DIFFICULTY_LEVELS).map(difficulty => (
                            <label key={difficulty} className="filter-option">
                                <input
                                    type="checkbox"
                                    checked={filters.careerRelevance.includes(difficulty)}
                                    onChange={(e) => handleFilterChange('careerRelevance', difficulty, e.target.checked)}
                                />
                                {t(difficulty.toLowerCase())}
                            </label>
                        ))}
                    </div>
                </div>

                <div className="topics-grid">
                    {filteredTopics.length > 0 ? (
                        filteredTopics.map(topic => (
                            <TopicCard
                                key={topic.id}
                                topic={topic}
                                showDetails={true}
                            />
                        ))
                    ) : (
                        <div className="no-results">{t('no_results')}</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Topics;