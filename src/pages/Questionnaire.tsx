import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import QuestionCard from '../components/questionnaire/QuestionCard';
import QuestionnaireResults from '../components/questionnaire/QuestionnaireResults';
import './Questionnaire.css';

const Questionnaire: React.FC = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const {
        questions,
        currentQuestionIndex,
        answers,
        results,
        isComplete,
        status
    } = useAppSelector(state => state.questionnaire);

    const currentQuestion = questions[currentQuestionIndex];

    // Get the current answer if it exists
    const currentAnswer = answers.find(a => a.questionId === currentQuestion?.id);

    // Reset questionnaire when the component is unmounted
    useEffect(() => {
        return () => {