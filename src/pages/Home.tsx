import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import ProjectCategoryRadar from '../components/visualizations/ProjectCategoryRadar';

const Home: React.FC = () => {
    const { t } = useTranslation();

    // Sample data for the radar chart
    const categories = [
        'topic_difficulty',
        'topic_programming',
        'topic_field_work',
        'topic_equipment',
        'topic_career',
        'topic_time'
    ];

    const datasets = [
        {
            name: 'Photogrammetry & RS',
            color: '#e91e63',
            values: [70, 60, 50, 80, 90, 60]
        },
        {
            name: 'GIS',
            color: '#2196f3',
            values: [50, 70, 30, 20, 80, 40]
        },
        {
            name: 'AI in Surveying',
            color: '#ff9800',
            values: [90, 100, 30, 50, 80, 70]
        },
        {
            name: 'Surveying',
            color: '#4caf50',
            values: [60, 40, 100, 80, 70, 70]
        }
    ];

    return (
        <div className="home-container">
            <section className="welcome-section">
                <h1>{t('home_welcome')}</h1>
                <p className="lead-text">
                    {t('home_intro')}
                </p>

                <div className="features-overview">
                    <div className="feature-card">
                        <div className="feature-icon">📝</div>
                        <h3>{t('nav_questionnaire')}</h3>
                        <p>{t('questionnaire_description')}</p>
                        <Link to="/questionnaire" className="primary-button">{t('home_start_button')}</Link>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">🔍</div>
                        <h3>{t('nav_topics')}</h3>
                        <p>Browse through all available project topics and find detailed information.</p>
                        <Link to="/topics" className="secondary-button">{t('home_explore_button')}</Link>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">📊</div>
                        <h3>{t('nav_resources')}</h3>
                        <p>Access educational resources, tutorials, and academic papers for your project.</p>
                        <Link to="/resources" className="secondary-button">Browse Resources</Link>
                    </div>
                </div>
            </section>

            <section className="visualization-section">
                <h2>Project Categories Comparison</h2>
                <p>Compare different project categories across key dimensions</p>
                <div className="viz-container">
                    <ProjectCategoryRadar
                        categories={categories}
                        datasets={datasets}
                        width={800}
                        height={500}
                    />
                </div>
            </section>

            <section className="getting-started">
                <h2>How to Use This Portal</h2>
                <div className="steps-container">
                    <div className="step">
                        <div className="step-number">1</div>
                        <div className="step-content">
                            <h3>Take the Questionnaire</h3>
                            <p>Answer a few questions about your skills, interests, and career goals to find matching project topics.</p>
                        </div>
                    </div>

                    <div className="step">
                        <div className="step-number">2</div>
                        <div className="step-content">
                            <h3>Explore Topics</h3>
                            <p>Browse through the suggested topics or explore all available options to find what interests you.</p>
                        </div>
                    </div>

                    <div className="step">
                        <div className="step-number">3</div>
                        <div className="step-content">
                            <h3>Check Resources</h3>
                            <p>For each topic, you'll find related educational resources, datasets, and required equipment information.</p>
                        </div>
                    </div>

                    <div className="step">
                        <div className="step-number">4</div>
                        <div className="step-content">
                            <h3>Explore Career Pathways</h3>
                            <p>Learn about potential career paths in Israel related to your chosen project topic.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="cta-section">
                <h2>Ready to Find Your Perfect Project?</h2>
                <p>Start the guided questionnaire to discover the best project match for your skills and interests.</p>
                <Link to="/questionnaire" className="primary-button large">{t('home_start_button')}</Link>
            </section>
        </div>
    );
};

export default Home;