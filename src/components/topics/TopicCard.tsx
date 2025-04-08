import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Topic } from '../../types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addFavoriteTopic, removeFavoriteTopic } from '../../features/topics/topicsSlice';

interface TopicCardProps {
    topic: Topic;
    showDetails?: boolean;
}

const TopicCard: React.FC<TopicCardProps> = ({ topic, showDetails = true }) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { favoriteTopics } = useAppSelector(state => state.topics);

    const isFavorite = favoriteTopics.includes(topic.id);

    const toggleFavorite = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (isFavorite) {
            dispatch(removeFavoriteTopic(topic.id));
        } else {
            dispatch(addFavoriteTopic(topic.id));
        }
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'High':
                return '#ea4335';
            case 'Medium':
                return '#fbbc04';
            case 'Low':
                return '#34a853';
            default:
                return '#ccc';
        }
    };

    return (
        <div className="topic-card">
            <div className="topic-card-header">
                <h3 className="topic-title">{topic.name}</h3>
                <button
                    className={`favorite-button ${isFavorite ? 'favorite' : ''}`}
                    onClick={toggleFavorite}
                    aria-label={isFavorite ? t('remove_from_favorites') : t('add_to_favorites')}
                >
                    <span className="favorite-icon">★</span>
                </button>
            </div>

            <div className="topic-card-body">
                <p className="topic-description">{topic.description}</p>

                {showDetails && (
                    <div className="topic-details">
                        <div className="topic-detail-item">
                            <span className="topic-detail-label">{t('topic_difficulty')}</span>
                            <span
                                className="topic-detail-value"
                                style={{ color: getDifficultyColor(topic.technicalDifficulty) }}
                            >
                {topic.technicalDifficulty}
              </span>
                        </div>

                        <div className="topic-detail-item">
                            <span className="topic-detail-label">{t('topic_programming')}</span>
                            <span
                                className="topic-detail-value"
                                style={{ color: getDifficultyColor(topic.programmingRequired) }}
                            >
                {topic.programmingRequired}
              </span>
                        </div>

                        <div className="topic-detail-item">
                            <span className="topic-detail-label">{t('topic_field_work')}</span>
                            <span
                                className="topic-detail-value"
                                style={{ color: getDifficultyColor(topic.fieldWork) }}
                            >
                {topic.fieldWork}
              </span>
                        </div>

                        <div className="topic-detail-item">
                            <span className="topic-detail-label">{t('topic_career')}</span>
                            <span
                                className="topic-detail-value"
                                style={{ color: getDifficultyColor(topic.careerRelevance) }}
                            >
                {topic.careerRelevance}
              </span>
                        </div>
                    </div>
                )}
            </div>

            <div className="topic-card-footer">
                <Link to={`/topics/${topic.id}`} className="view-details-button">
                    {t('view_details')}
                </Link>
            </div>
        </div>
    );
};

export default TopicCard;