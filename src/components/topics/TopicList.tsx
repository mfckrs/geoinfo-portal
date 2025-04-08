import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
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
    removeCareerRelevanceFilter,
} from '../../features/topics/topicsSlice';
import { useGetTopicsQuery } from '../../services/topicsApi';
import TopicCard from './TopicCard';
import LoadingSpinner from '../common/LoadingSpinner';
import { PROJECT_CATEGORIES, DIFFICULTY_LEVELS } from '../../utils/constants';

const TopicList: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    // Get topics state from Redux
    const {
        selectedCategory,
        searchTerm,
        filters,
    } = useAppSelector(state => state.topics);

    // RTK Query hook to fetch topics
    const { data: topics, isLoading, error } = useGetTopicsQuery();

    // Local state for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [topicsPerPage] = useState(9);

    // Reset page when search or filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedCategory, filters]);

    // Handle category selection
    const handleCategoryChange = (category: string | null) => {
        dispatch(setSelectedCategory(category));
    };

    // Handle search
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchTerm(e.target.value));
    };

    // Handle difficulty filter
    const handleDifficultyFilter = (difficulty: string, filterType: 'technical' | 'programming' | 'fieldWork' | 'career') => {
        const filterActions = {
            technical: {
                add: addTechnicalDifficultyFilter,
                remove: removeTechnicalDifficultyFilter,
            },
            programming: {
                add: addProgrammingRequiredFilter,
                remove: removeProgrammingRequiredFilter,
            },
            fieldWork: {
                add: addFieldWorkFilter,
                remove: removeFieldWorkFilter,
            },
            career: {
                add: addCareerRelevanceFilter,
                remove: removeCareerRelevanceFilter,
            },
        };

        const isActive = (() => {
            switch (filterType) {
                case 'technical':
                    return filters.technicalDifficulty.includes(difficulty);
                case 'programming':
                    return filters.programmingRequired.includes(difficulty);
                case 'fieldWork':
                    return filters.fieldWork.includes(difficulty);
                case 'career':
                    return filters.careerRelevance.includes(difficulty);
                default:
                    return false;
            }
        })();

        if (isActive) {
            dispatch(filterActions[filterType].remove(difficulty));
        } else {
            dispatch(filterActions[filterType].add(difficulty));
        }
    };

    // Clear all filters
    const handleClearFilters = () => {
        dispatch(clearAllFilters());
    };

    // Filter topics based on current filters
    const filteredTopics = React.useMemo(() => {
        if (!topics) return [];

        return topics.filter(topic => {
            // Filter by category
            if (selectedCategory && !topic.relatedResources.some(id => id.includes(selectedCategory))) {
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

    // Pagination logic
    const indexOfLastTopic = currentPage * topicsPerPage;
    const indexOfFirstTopic = indexOfLastTopic - topicsPerPage;
    const currentTopics = filteredTopics.slice(indexOfFirstTopic, indexOfLastTopic);
    const totalPages = Math.ceil(filteredTopics.length / topicsPerPage);

    // Handle page change
    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    // Handle topic selection
    const handleTopicSelect = (topicId: string) => {
        navigate(`/topics/${topicId}`);
    };

    if (isLoading) {
        return <div className="loading-container"><LoadingSpinner /></div>;
    }

    if (error) {
        return <div className="error-container">{t('error_loading')}</div>;
    }

    return (
        <div className="topics-list-container">
            <div className="topics-filters">
                <div className="search-box">
                    <input
                        type="text"
                        placeholder={t('search_placeholder')}
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>

                <div className="category-filters">
                    <h3>{t('category')}</h3>
                    <div className="category-buttons">
                        <button
                            className={`category-button ${!selectedCategory ? 'active' : ''}`}
                            onClick={() => handleCategoryChange(null)}
                        >
                            {t('all_categories')}
                        </button>

                        {Object.entries(PROJECT_CATEGORIES).map(([key, value]) => (
                            <button
                                key={key}
                                className={`category-button ${selectedCategory === value ? 'active' : ''}`}
                                onClick={() => handleCategoryChange(value)}
                            >
                                {t(`${key.toLowerCase()}`)}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="difficulty-filters">
                    <h3>{t('topic_difficulty')}</h3>
                    <div className="difficulty-options">
                        {Object.values(DIFFICULTY_LEVELS).map(difficulty => (
                            <div
                                key={`technical-${difficulty}`}
                                className={`difficulty-chip ${filters.technicalDifficulty.includes(difficulty) ? 'active' : ''}`}
                                onClick={() => handleDifficultyFilter(difficulty, 'technical')}
                            >
                                {t(difficulty.toLowerCase())}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="programming-filters">
                    <h3>{t('topic_programming')}</h3>
                    <div className="difficulty-options">
                        {Object.values(DIFFICULTY_LEVELS).map(difficulty => (
                            <div
                                key={`programming-${difficulty}`}
                                className={`difficulty-chip ${filters.programmingRequired.includes(difficulty) ? 'active' : ''}`}
                                onClick={() => handleDifficultyFilter(difficulty, 'programming')}
                            >
                                {t(difficulty.toLowerCase())}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="fieldwork-filters">
                    <h3>{t('topic_field_work')}</h3>
                    <div className="difficulty-options">
                        {Object.values(DIFFICULTY_LEVELS).map(difficulty => (
                            <div
                                key={`fieldwork-${difficulty}`}
                                className={`difficulty-chip ${filters.fieldWork.includes(difficulty) ? 'active' : ''}`}
                                onClick={() => handleDifficultyFilter(difficulty, 'fieldWork')}
                            >
                                {t(difficulty.toLowerCase())}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="career-filters">
                    <h3>{t('topic_career')}</h3>
                    <div className="difficulty-options">
                        {Object.values(DIFFICULTY_LEVELS).map(difficulty => (
                            <div
                                key={`career-${difficulty}`}
                                className={`difficulty-chip ${filters.careerRelevance.includes(difficulty) ? 'active' : ''}`}
                                onClick={() => handleDifficultyFilter(difficulty, 'career')}
                            >
                                {t(difficulty.toLowerCase())}
                            </div>
                        ))}
                    </div>
                </div>

                <button className="clear-filters-button" onClick={handleClearFilters}>
                    {t('clear_filters')}
                </button>
            </div>

            <div className="topics-content">
                <div className="topics-header">
                    <h2>{t('topics_title')}</h2>
                    <span className="topic-count">
                        {filteredTopics.length} {t('topics_found')}
                    </span>
                </div>

                {filteredTopics.length === 0 ? (
                    <div className="no-results">{t('no_results')}</div>
                ) : (
                    <>
                        <div className="topics-grid">
                            {currentTopics.map(topic => (
                                <TopicCard
                                    key={topic.id}
                                    topic={topic}
                                    onClick={() => handleTopicSelect(topic.id)}
                                />
                            ))}
                        </div>

                        {totalPages > 1 && (
                            <div className="pagination">
                                <button
                                    className="pagination-button"
                                    disabled={currentPage === 1}
                                    onClick={() => handlePageChange(currentPage - 1)}
                                >
                                    &laquo; {t('previous')}
                                </button>

                                {Array.from({ length: totalPages }, (_, i) => (
                                    <button
                                        key={i + 1}
                                        className={`pagination-number ${currentPage === i + 1 ? 'active' : ''}`}
                                        onClick={() => handlePageChange(i + 1)}
                                    >
                                        {i + 1}
                                    </button>
                                ))}

                                <button
                                    className="pagination-button"
                                    disabled={currentPage === totalPages}
                                    onClick={() => handlePageChange(currentPage + 1)}
                                >
                                    {t('next')} &raquo;
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default TopicList;