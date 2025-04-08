import { Difficulty, AvailabilityStatus } from '../types';
import { CATEGORY_NAMES, DIFFICULTY_LEVELS } from './constants';

/**
 * Formats a date string to a localized format
 * @param dateString - The date string to format
 * @param locale - The locale to use for formatting (defaults to browser locale)
 * @param options - DateTimeFormat options
 * @returns Formatted date string
 */
export const formatDate = (
    dateString: string,
    locale?: string,
    options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    }
): string => {
    try {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat(locale, options).format(date);
    } catch (error) {
        console.error('Error formatting date:', error);
        return dateString; // Return original string if parsing fails
    }
};

/**
 * Formats a number as a file size (KB, MB, GB)
 * @param bytes - The size in bytes
 * @returns Formatted file size string
 */
export const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Formats a category ID to a display name
 * @param categoryId - The category ID
 * @returns The display name for the category
 */
export const formatCategoryName = (categoryId: string): string => {
    return CATEGORY_NAMES[categoryId as keyof typeof CATEGORY_NAMES] || categoryId;
};

/**
 * Formats a difficulty level to include a visual indicator
 * @param difficulty - The difficulty level
 * @returns The difficulty string with a visual indicator
 */
export const formatDifficulty = (difficulty: Difficulty): string => {
    switch (difficulty) {
        case DIFFICULTY_LEVELS.HIGH:
            return '⬤⬤⬤ High';
        case DIFFICULTY_LEVELS.MEDIUM:
            return '⬤⬤○ Medium';
        case DIFFICULTY_LEVELS.LOW:
            return '⬤○○ Low';
        default:
            return difficulty;
    }
};

/**
 * Formats an availability status with a colored indicator
 * @param status - The availability status
 * @returns HTML string with a colored indicator
 */
export const formatAvailabilityStatus = (status: AvailabilityStatus): string => {
    switch (status) {
        case 'Available':
            return '<span class="status-available">●</span> Available';
        case 'Limited':
            return '<span class="status-limited">●</span> Limited';
        case 'Unavailable':
            return '<span class="status-unavailable">●</span> Unavailable';
        default:
            return status;
    }
};

/**
 * Formats a match percentage for questionnaire results
 * @param percentage - The match percentage (0-100)
 * @returns Formatted percentage string
 */
export const formatMatchPercentage = (percentage: number): string => {
    return `${Math.round(percentage)}% Match`;
};

/**
 * Truncates text to a specified length with ellipsis
 * @param text - The text to truncate
 * @param maxLength - Maximum length before truncation
 * @returns Truncated text with ellipsis if needed
 */
export const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
};

/**
 * Formats a list of string items into a comma-separated string
 * @param items - Array of items
 * @param maxItems - Maximum number of items to show before adding "and X more"
 * @returns Formatted string
 */
export const formatList = (items: string[], maxItems = 3): string => {
    if (!items || items.length === 0) return '';

    if (items.length <= maxItems) {
        return items.join(', ');
    }

    const visibleItems = items.slice(0, maxItems);
    const remainingCount = items.length - maxItems;

    return `${visibleItems.join(', ')} and ${remainingCount} more`;
};

/**
 * Formats a URL for display by removing protocol and trailing slashes
 * @param url - The URL to format
 * @returns Formatted URL string
 */
export const formatURL = (url: string): string => {
    return url
        .replace(/^https?:\/\//, '')
        .replace(/\/$/, '');
};

/**
 * Formats a salary range for display
 * @param min - Minimum salary
 * @param max - Maximum salary
 * @param currency - Currency symbol (defaults to ₪)
 * @returns Formatted salary range
 */
export const formatSalaryRange = (
    min: number,
    max: number,
    currency = '₪'
): string => {
    return `${currency}${min.toLocaleString()}-${currency}${max.toLocaleString()}/month`;
};

/**
 * Converts a camelCase or snake_case string to Title Case
 * @param str - The string to convert
 * @returns Title Case string
 */
export const toTitleCase = (str: string): string => {
    // Handle camelCase
    const spacedString = str
        .replace(/([A-Z])/g, ' $1')
        // Handle snake_case
        .replace(/_/g, ' ');

    return spacedString
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ')
        .trim();
};