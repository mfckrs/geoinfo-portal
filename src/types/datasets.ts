import { Dataset } from './index';

// Extended dataset interface with additional properties
export interface DatasetWithDetails extends Dataset {
    license?: string;
    sampleData?: string;
    dateCreated?: string;
    datePublished?: string;
    authors?: string[];
    citation?: string;
    version?: string;
    relatedProjects?: string[];
    usageExamples?: string[];
    dataSchema?: Record<string, string>; // Field name to data type mapping
    qualityMetrics?: {
        completeness?: number;
        accuracy?: number;
        consistency?: number;
    };
}

// Dataset grouping by format
export interface DatasetsByFormat {
    [key: string]: Dataset[];
}

// Dataset grouping by source
export interface DatasetsBySource {
    [key: string]: Dataset[];
}

// Interface for dataset search results
export interface DatasetSearchResult {
    dataset: Dataset;
    relevanceScore: number;
    matchedTerms: string[];
}

// Interface for dataset filters
export interface DatasetFilter {
    sources: string[];
    formats: string[];
    categories: string[];
    requiresAuthentication?: boolean;
    searchTerm: string;
}

// Dataset card display options
export interface DatasetCardOptions {
    showSource: boolean;
    showFormat: boolean;
    showSize: boolean;
    showLastUpdated: boolean;
    showDescription: boolean;
    compact: boolean;
}

// Type for handling dataset sorting
export type DatasetSortField = 'name' | 'source' | 'format' | 'size' | 'lastUpdated';

// Interface for dataset download information
export interface DatasetDownloadInfo {
    id: string;
    timestamp: number;
    downloadUrl: string;
    fileFormat: string;
    fileSize: string;
    status: 'pending' | 'completed' | 'failed';
}

// Interface for dataset statistics
export interface DatasetStatistics {
    totalCount: number;
    byFormat: Record<string, number>;
    bySource: Record<string, number>;
    byCategory: Record<string, number>;
    mostDownloaded: string[];
    recentlyUpdated: string[];
}

// Interface for dataset validation results
export interface DatasetValidationResult {
    isValid: boolean;
    errors: {
        field: string;
        message: string;
    }[];
    warnings: {
        field: string;
        message: string;
    }[];
}

// Interface for dataset preview
export interface DatasetPreview {
    headers: string[];
    rows: string[][];
    totalRows: number;
    previewSize: number;
}

// Interface for dataset recommendation
export interface DatasetRecommendation {
    datasetId: string;
    score: number;
    reason: string;
}