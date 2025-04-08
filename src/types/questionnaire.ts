import { QuestionnaireQuestion, QuestionOption, UserAnswer, QuestionnaireResult } from './index';

// Extended question option with additional properties
export interface QuestionOptionWithDetails extends QuestionOption {
    description?: string;
    icon?: string;
    imageUrl?: string;
    tooltip?: string;
    recommended?: boolean;
    skillLevel?: 'beginner' | 'intermediate' | 'advanced';
}

// Extended question with additional properties
export interface QuestionnaireQuestionWithDetails extends QuestionnaireQuestion {
    category: string;
    importance: number; // 1-5 scale of how important this question is for matching
    skipCondition?: {
        questionId: string;
        optionIds: string[];
    }; // If this question should be skipped based on a previous answer
    multiSelect?: boolean; // If multiple options can be selected
    minSelectCount?: number; // Minimum number of options to select
    maxSelectCount?: number; // Maximum number of options to select
    options: QuestionOptionWithDetails[];
}

// Interface for multi-step questionnaire
export interface QuestionnaireSection {
    id: string;
    title: string;
    description?: string;
    icon?: string;
    questions: string[]; // Array of question IDs
    requiredForResults?: boolean; // If this section must be completed for results
}

// Extended user answer with additional properties
export interface UserAnswerWithDetails extends UserAnswer {
    confidence: number; // 1-5 scale of how confident the user is in this answer
    selectedOptionIds?: string[]; // For multi-select questions
    freeTextResponse?: string; // For questions that allow free text input
    timestamp: number; // When this answer was provided
}

// Questionnaire progress type
export interface QuestionnaireProgress {
    totalQuestions: number;
    answeredQuestions: number;
    currentSectionId: string;
    completedSections: string[];
    skippedQuestions: string[];
    percentComplete: number;
    timeSpent: number; // In seconds
}

// Detailed result interface
export interface QuestionnaireResultWithDetails extends QuestionnaireResult {
    matchDetailsByTopic: {
        [topicId: string]: {
            overallMatch: number;
            matchesByCategory: {
                skills: number;
                interests: number;
                workEnvironment: number;
                career: number;
            };
            strengths: string[];
            weaknesses: string[];
            suggestedPrerequisites: string[];
        }
    };
    timestamp: number;
    surveyCompleteTime: number; // In seconds
    analysisVersion: string; // Algorithm version that generated these results
}

// Interface for topic match visualization data
export interface TopicMatchVisualizationData {
    topicId: string;
    topicName: string;
    userProfile: {
        skills: number;
        interests: number;
        workEnvironment: number;
        career: number;
    };
    topicRequirements: {
        skills: number;
        interests: number;
        workEnvironment: number;
        career: number;
    };
    matchPercentage: number;
}

// Interface for questionnaire analytics
export interface QuestionnaireAnalytics {
    averageCompletionTime: number; // In seconds
    completionRate: number; // Percentage of users who complete the questionnaire
    mostSkippedQuestions: {
        questionId: string;
        skipRate: number;
    }[];
    mostCommonAnswers: {
        questionId: string;
        optionId: string;
        percentage: number;
    }[];
    topMatchedTopics: {
        topicId: string;
        matchCount: number;
    }[];
}

// Interface for user questionnaire history
export interface UserQuestionnaireHistory {
    id: string;
    timestamp: number;
    answers: UserAnswerWithDetails[];
    results: QuestionnaireResultWithDetails;
    selectedTopic?: string;
}

// Interface for topic recommendation based on partial answers
export interface PartialTopicRecommendation {
    topicId: string;
    confidence: number; // How confident we are in this recommendation based on partial data
    matchPercentage: number;
    requiredQuestionsToImprove: string[]; // Questions that would help refine this recommendation
}

// Interface for personalized learning path based on questionnaire results
export interface PersonalizedLearningPath {
    userId: string;
    topicId: string;
    prerequisites: {
        resourceId: string;
        completed: boolean;
    }[];
    coreResources: {
        resourceId: string;
        completed: boolean;
    }[];
    advancedResources: {
        resourceId: string;
        completed: boolean;
    }[];
    projects: {
        id: string;
        name: string;
        completed: boolean;
    }[];
    progress: number; // 0-100%
}