import {Resource, ResourceType, Difficulty} from './index';

// Type for handling resource sorting
export type ResourceSortField = 'title' | 'type' | 'difficulty' | 'language';

// Extended resource interface with additional properties
export interface ResourceWithDetails extends Resource {
    author?: string;
    publicationDate?: string;
    publisher?: string;
    citation?: string;
    relatedTopics: string[];
    screenshots?: string[];
    rating?: number;
    reviewCount?: number;
    userNotes?: string;
}

export type ResourcesByField = {
    [key in ResourceSortField]: Resource[];
};

// Resource grouping by category
export interface ResourcesByCategory {
    [category: string]: Resource[];
}

// Interface for resource search results
export interface ResourceSearchResult {
    resource: Resource;
    relevanceScore: number;
    matchedTerms: string[];
}

// Interface for resource filters
export interface ResourceFilter {
    types: ResourceType[];
    categories: string[];
    tags: string[];
    difficulty: Difficulty | null;
    searchTerm: string;
}

// Resource card display options
export interface ResourceCardOptions {
    showTags: boolean;
    showType: boolean;
    showDifficulty: boolean;
    showDescription: boolean;
    compact: boolean;
}


// Interface for educational article content type
export interface EducationalArticle extends Resource {
    type: 'Academic';
    content: string;
    sections: {
        title: string;
        content: string;
    }[];
    references: string[];
}

// Interface for tutorial content type
export interface Tutorial extends Resource {
    type: 'Tutorial';
    steps: {
        title: string;
        content: string;
        code?: string;
        image?: string;
    }[];
    prerequisites: string[];
    estimatedTime: string;
}

// Interface for documentation content type
export interface Documentation extends Resource {
    type: 'Documentation';
    version: string;
    sections: {
        title: string;
        content: string;
    }[];
    examples: {
        title: string;
        code: string;
        description: string;
    }[];
}

// Union type of specific resource types
export type SpecificResource = EducationalArticle | Tutorial | Documentation | Resource;

// Resource recommendation interface
export interface ResourceRecommendation {
    resourceId: string;
    score: number;
    reason: string;
}