import React from 'react';
import { useTranslation } from 'react-i18next';
import type { QuestionnaireQuestion } from '../../types';

interface QuestionCardProps {
    question: QuestionnaireQuestion;
    selectedOptionId?: string;
    onOptionSelect: (optionId: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
                                                       question,
                                                       selectedOptionId,
                                                       onOptionSelect
                                                   }) => {
    const { t } = useTranslation();

    return (
        <div className="question-card">
            <h2 className="question-title">{t(question.text)}</h2>

            <div className="answer-options">
                {question.options.map(option => (
                    <div
                        key={option.id}
                        className={`option-card ${selectedOptionId === option.id ? 'selected' : ''}`}
                        onClick={() => onOptionSelect(option.id)}
                    >
                        {option.text}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QuestionCard;