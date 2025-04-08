import { Difficulty } from './index';

// Base topic interface is in the main types/index.ts file
// This file contains extended types specific to the topics feature

export interface TopicCategory {
    id: string;
    name: string;
    description: string;
    color: string;
    iconName?: string;
}

export interface TopicPrerequisite {
    id: string;
    name: string;
    importance: 'required' | 'recommended' | 'helpful';
}

export interface TopicDetailSection {
    id: string;
    title: string;
    content: string;
    order: number;
}

export interface ProjectExample {
    id: string;
    title: string;
    description: string;
    complexity: Difficulty;
    timeEstimate: string; // e.g., "4-6 weeks"
    requiredSkills: string[];
    suggestedOutputs: string[];
    relatedTopicIds: string[];
}

export interface TopicStat {
    name: string;
    value: number;
    maxValue: number;
    color?: string;
}

export interface TopicVisualizationData {
    radarChartData: {
        labels: string[];
        datasets: {
            label: string;
            data: number[];
            backgroundColor: string;
            borderColor: string;
            borderWidth: number;
        }[];
    };
    barChartData: {
        labels: string[];
        datasets: {
            label: string;
            data: number[];
            backgroundColor: string[];
        }[];
    };
}

// Type for topic comparison view
export interface TopicComparisonItem {
    topicId: string;
    name: string;
    stats: TopicStat[];
}

// For the topic selection questionnaire results
export interface TopicMatchResult {
    topicId: string;
    matchPercentage: number;
    strengths: string[];
    weaknesses: string[];
}

// For topic search and filtering
export interface TopicFilterCriteria {
    categories?: string[];
    difficulties?: Difficulty[];
    programmingRequired?: Difficulty[];
    fieldWork?: Difficulty[];
    careerRelevance?: Difficulty[];
    searchTerm?: string;
}

// For recommended learning paths
export interface TopicLearningPath {
    id: string;
    name: string;
    description: string;
    topicIds: string[]; // Ordered list of topic IDs to study
    estimatedCompletionTime: string;
    difficulty: Difficulty;
}