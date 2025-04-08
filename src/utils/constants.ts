// Application-wide constants

// Project Categories
export const PROJECT_CATEGORIES = {
    PHOTOGRAMMETRY: 'photogrammetry',
    MAPPING_GNSS: 'mapping_gnss',
    SURVEYING: 'surveying',
    GIS: 'gis',
    CADASTRE: 'cadastre',
    AI_SURVEYING: 'ai_surveying',
    DIGITAL_TWIN: 'digital_twin',
    SCAN_TO_BIM: 'scan_to_bim',
    LASER_SCANNER: 'laser_scanner',
    ALGORITHM_IMPLEMENTATION: 'algorithm_implementation',
};

// Project Category Names (for display)
export const CATEGORY_NAMES = {
    [PROJECT_CATEGORIES.PHOTOGRAMMETRY]: 'Photogrammetry & Remote Sensing',
    [PROJECT_CATEGORIES.MAPPING_GNSS]: 'Mapping & GNSS',
    [PROJECT_CATEGORIES.SURVEYING]: 'Surveying',
    [PROJECT_CATEGORIES.GIS]: 'GIS Projects',
    [PROJECT_CATEGORIES.CADASTRE]: 'Cadastre Projects',
    [PROJECT_CATEGORIES.AI_SURVEYING]: 'AI in Surveying',
    [PROJECT_CATEGORIES.DIGITAL_TWIN]: 'Digital Twin',
    [PROJECT_CATEGORIES.SCAN_TO_BIM]: 'Scan to BIM',
    [PROJECT_CATEGORIES.LASER_SCANNER]: 'Laser Scanner Projects',
    [PROJECT_CATEGORIES.ALGORITHM_IMPLEMENTATION]: 'Algorithmic Implementation',
};

// Difficulty Levels
export const DIFFICULTY_LEVELS = {
    LOW: 'Low',
    MEDIUM: 'Medium',
    HIGH: 'High',
};

// Availability Status
export const AVAILABILITY_STATUS = {
    AVAILABLE: 'Available',
    LIMITED: 'Limited',
    UNAVAILABLE: 'Unavailable',
};

// Resource Types
export const RESOURCE_TYPES = {
    ACADEMIC: 'Academic',
    TUTORIAL: 'Tutorial',
    DOCUMENTATION: 'Documentation',
    COMMUNITY: 'Community',
    TOOL: 'Tool',
};

// Career Sectors
export const CAREER_SECTORS = {
    GOVERNMENT: 'Government',
    PRIVATE: 'Private',
    RESEARCH: 'Research',
    DEFENSE: 'Defense',
    ENVIRONMENTAL: 'Environmental',
    TECHNOLOGY: 'Technology',
};

// Skill Types
export const SKILL_TYPES = {
    TECHNICAL: 'Technical',
    SOFT: 'Soft',
};

// Equipment Types
export const EQUIPMENT_TYPES = {
    DRONE: 'Drone',
    TOTAL_STATION: 'Total Station',
    GNSS_RECEIVER: 'GNSS Receiver',
    LASER_SCANNER: 'Laser Scanner',
    CAMERA: 'Camera',
    SOFTWARE: 'Software',
};

// Dataset Sources
export const DATASET_SOURCES = {
    KAGGLE: 'Kaggle',
    SURVEY_OF_ISRAEL: 'Survey of Israel (MAPI)',
    ISRAEL_LAND_AUTHORITY: 'Israel Land Authority',
    OPEN_SATELLITE: 'Open Satellite Imagery',
    OPEN_STREET_MAP: 'OpenStreetMap',
    UNIVERSITY_ARCHIVES: 'University Archives',
};

// Dataset Formats
export const DATASET_FORMATS = {
    CSV: 'CSV',
    GEOTIFF: 'GeoTIFF',
    SHAPEFILE: 'Shapefile',
    GEOPACKAGE: 'GeoPackage',
    LAS: 'LAS/LAZ',
    GEOJSON: 'GeoJSON',
};

// Resource Categories (tags)
export const RESOURCE_CATEGORIES = [
    'photogrammetry',
    'remote-sensing',
    'gnss',
    'mapping',
    'surveying',
    'gis',
    'cadastre',
    'ai',
    'machine-learning',
    'digital-twin',
    'bim',
    'laser-scanning',
    'algorithms',
    'programming',
    'data-analysis',
    'field-work',
    'research',
    'open-source',
    'software',
    'hardware',
];

// Paths for navigation
export const PATHS = {
    HOME: '/',
    QUESTIONNAIRE: '/questionnaire',
    TOPICS: '/topics',
    TOPIC_DETAIL: (id: string) => `/topics/${id}`,
    RESOURCES: '/resources',
    RESOURCE_DETAIL: (id: string) => `/resources/${id}`,
    DATASETS: '/datasets',
    DATASET_DETAIL: (id: string) => `/datasets/${id}`,
    CAREERS: '/careers',
    EQUIPMENT: '/equipment',
};

// API Endpoints (for reference)
export const API_ENDPOINTS = {
    TOPICS: 'topics',
    RESOURCES: 'resources',
    DATASETS: 'datasets',
    EQUIPMENT: 'equipment',
    CAREERS: 'careers',
};

// Colors for visualizations (matching your style)
export const CHART_COLORS = {
    PRIMARY: '#4285f4',
    SECONDARY: '#34a853',
    WARNING: '#fbbc04',
    ERROR: '#ea4335',
    NEUTRAL: '#5f6368',
    // Category colors
    PHOTOGRAMMETRY: '#e91e63',
    MAPPING_GNSS: '#9c27b0',
    SURVEYING: '#673ab7',
    GIS: '#3f51b5',
    CADASTRE: '#2196f3',
    AI_SURVEYING: '#00bcd4',
    DIGITAL_TWIN: '#009688',
    SCAN_TO_BIM: '#4caf50',
    LASER_SCANNER: '#8bc34a',
    ALGORITHM_IMPLEMENTATION: '#ffc107',
};

// Default pagination settings
export const PAGINATION = {
    DEFAULT_PAGE_SIZE: 10,
    DEFAULT_PAGE: 1,
};