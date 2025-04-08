// Common Types

export type Difficulty = 'Low' | 'Medium' | 'High';
export type AvailabilityStatus = 'Available' | 'Limited' | 'Unavailable';
export type ResourceType = 'Academic' | 'Tutorial' | 'Documentation' | 'Community' | 'Tool';

export interface Resource {
    id: string;
    title: string;
    description: string;
    type: ResourceType;
    url: string;
    categories: string[];
    language: string;
    difficulty: Difficulty;
    tags: string[];
}

export interface Topic {
    id: string;
    name: string;
    description: string;
    technicalDifficulty: Difficulty;
    programmingRequired: Difficulty;
    fieldWork: Difficulty;
    dataAvailability: Difficulty;
    equipmentNeeds: Difficulty;
    careerRelevance: Difficulty;
    timeInvestment: Difficulty;
    prerequisites: string[];
    relatedResources: string[]; // IDs of related resources
    relatedDatasets: string[]; // IDs of related datasets
}

export interface Dataset {
    id: string;
    name: string;
    description: string;
    source: string;
    format: string;
    size: string;
    categories: string[];
    url: string;
    lastUpdated: string;
    requiresAuthentication: boolean;
}

export interface Equipment {
    id: string;
    name: string;
    type: string;
    description: string;
    availability: AvailabilityStatus;
    location: string;
    checkoutProcedure: string;
    restrictions: string;
    relatedTopics: string[]; // IDs of related topics
}

export interface CareerPathway {
    id: string;
    sector: string;
    role: string;
    description: string;
    requiredSkills: Skill[];
    salaryRange: string;
    demandLevel: Difficulty;
    relatedTopics: string[]; // IDs of related topics
}

export interface Skill {
    name: string;
    level: Difficulty;
    type: 'Technical' | 'Soft';
}

export interface QuestionnaireQuestion {
    id: string;
    text: string;
    options: QuestionOption[];
}

export interface QuestionOption {
    id: string;
    text: string;
    topicMatches: Record<string, number>; // Topic ID: match percentage
}

export interface UserAnswer {
    questionId: string;
    selectedOptionId: string;
}

export interface QuestionnaireResult {
    topicMatches: Record<string, number>; // Topic ID: match percentage
    recommendedTopics: string[]; // IDs of recommended topics
    recommendedResources: string[]; // IDs of recommended resources
}