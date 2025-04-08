import React from 'react';
import { useTranslation } from 'react-i18next';

interface ProgressBarProps {
    progress: number;
    currentQuestion: number;
    totalQuestions: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
                                                     progress,
                                                     currentQuestion,
                                                     totalQuestions
                                                 }) => {
    const { t } = useTranslation();

    return (
        <div className="progress-container">
            <div className="progress-bar">
                <div
                    className="progress-fill"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
            <div className="progress-text">
                {t('question')} {currentQuestion} {t('of')} {totalQuestions}
            </div>
        </div>
    );
};

export default ProgressBar;