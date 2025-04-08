import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useGetTopicByIdQuery } from '../../services/topicsApi';
import { useGetResourcesByTopicQuery } from '../../services/resourcesApi';
import type { QuestionnaireResult } from '../../types';

interface QuestionnaireResultsProps {
    results: QuestionnaireResult;
    onRestart: () => void;
}

const QuestionnaireResults: React.FC<QuestionnaireResultsProps> = ({
                                                                       results,
                                                                       onRestart
                                                                   }) => {
    const { t } = useTranslation();

    // Get topic data for the top matches
    const topMatches = Object.entries(results.topicMatches)
        .sort((a, b) => b[1] - a[1]) // Sort by match percentage descending
        .slice(0, 3); // Get top 3

    return (
        <div className="results-container">
            <h2>{t('matches')}</h2>

            <div className="results-description">
                <p>
                    Based on your answers, we've identified the following project topics that best match your profile.
                    Each match is rated by its relevance to your skills, interests, and career goals.
                </p>
            </div>

            <div className="match-cards">
                {topMatches.map(([topicId, matchPercentage]) => (
                    <TopicMatchCard
                        key={topicId}
                        topicId={topicId}
                        matchPercentage={matchPercentage}
                    />
                ))}
            </div>

            <div className="results-actions">
                <button onClick={onRestart} className="secondary-button">
                    {t('take_again')}
                </button>

                <Link to="/topics" className="primary-button">
                    {t('browse_all_topics')}
                </Link>
            </div>
        </div>
    );
};

// Helper component to display a single topic match
const TopicMatchCard: React.FC<{ topicId: string; matchPercentage: number }> = ({
                                                                                    topicId,
                                                                                    matchPercentage
                                                                                }) => {
    // Fetch topic details
    const { data: topic, isLoading, error } = useGetTopicByIdQuery(topicId);

    // Fetch related resources
    const { data: resources } = useGetResourcesByTopicQuery(topicId, {
        skip: !topicId
    });

    if (isLoading) {
        return <div className="topic-match-card loading">Loading topic data...</div>;
    }

    if (error || !topic) {
        return (
            <div className="topic-match-card error">
                <h3>Topic Information Unavailable</h3>
                <p>There was an error loading the topic details.</p>
            </div>
        );
    }

    // Determine the match level for styling
    let matchLevel = 'low';
    if (matchPercentage >= 80) {
        matchLevel = 'high';
    } else if (matchPercentage >= 50) {
        matchLevel = 'medium';
    }

    return (
        <div className={`topic-match-card match-${matchLevel}`}>
            <div className="match-percentage">
                <span className="match-number">{matchPercentage}%</span>
                <span className="match-text">Match</span>
            </div>

            <div className="topic-info">
                <h3>{topic.name}</h3>
                <p>{topic.description}</p>

                <div className="topic-stats">
                    <div className="stat">
                        <span className="stat-label">Difficulty:</span>
                        <span className={`stat-value difficulty-${topic.technicalDifficulty.toLowerCase()}`}>
              {topic.technicalDifficulty}
            </span>
                    </div>

                    <div className="stat">
                        <span className="stat-label">Career Relevance:</span>
                        <span className={`stat-value relevance-${topic.careerRelevance.toLowerCase()}`}>
              {topic.careerRelevance}
            </span>
                    </div>
                </div>

                {resources && resources.length > 0 && (
                    <div className="related-resources">
                        <h4>Suggested Resources:</h4>
                        <ul>
                            {resources.slice(0, 2).map(resource => (
                                <li key={resource.id}>
                                    <Link to={`/resources/${resource.id}`}>{resource.title}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <Link to={`/topics/${topicId}`} className="view-details-link">
                    View Details →
                </Link>
            </div>
        </div>
    );
};

export default QuestionnaireResults;