import { UserAnswer } from '../types';

/**
 * Validates if a string is a valid URL
 * @param url - The URL to validate
 * @returns Boolean indicating if the URL is valid
 */
export const isValidUrl = (url: string): boolean => {
    try {
        new URL(url);
        return true;
    } catch (error) {
        return false;
    }
};

/**
 * Validates if a date string is valid and not in the future
 * @param dateString - The date string to validate
 * @returns Boolean indicating if the date is valid
 */
export const isValidPastDate = (dateString: string): boolean => {
    try {
        const date = new Date(dateString);
        const now = new Date();

        return !isNaN(date.getTime()) && date <= now;
    } catch (error) {
        return false;
    }
};

/**
 * Validates if a string is a valid email address
 * @param email - The email address to validate
 * @returns Boolean indicating if the email is valid
 */
export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Validates if a phone number is in a valid format (Israeli format)
 * @param phone - The phone number to validate
 * @returns Boolean indicating if the phone number is valid
 */
export const isValidPhoneNumber = (phone: string): boolean => {
    // Israeli phone number format
    const phoneRegex = /^((\+972|0)([23489]|5[0248]|77)[1-9]\d{6})$/;
    return phoneRegex.test(phone);
};

/**
 * Validates if all required fields are filled
 * @param data - Object containing form data
 * @param requiredFields - Array of field names that are required
 * @returns Boolean indicating if all required fields are filled
 */
export const hasRequiredFields = (
    data: Record<string, unknown>,
    requiredFields: string[]
): boolean => {
    return requiredFields.every(field => {
        const value = data[field];

        // Check for empty strings, null, or undefined
        if (value === '' || value === null || value === undefined) {
            return false;
        }

        // Check for empty arrays
        if (Array.isArray(value) && value.length === 0) {
            return false;
        }

        return true;
    });
};

/**
 * Validates if a file size is within allowed limits
 * @param fileSize - The file size in bytes
 * @param maxSizeInMB - Maximum allowed size in MB
 * @returns Boolean indicating if the file size is valid
 */
export const isValidFileSize = (
    fileSize: number,
    maxSizeInMB: number
): boolean => {
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
    return fileSize <= maxSizeInBytes;
};

/**
 * Validates if a file type is allowed
 * @param fileName - The file name
 * @param allowedExtensions - Array of allowed file extensions
 * @returns Boolean indicating if the file type is allowed
 */
export const isAllowedFileType = (
    fileName: string,
    allowedExtensions: string[]
): boolean => {
    const extension = fileName.split('.').pop()?.toLowerCase() || '';
    return allowedExtensions.includes(extension);
};

/**
 * Validates if a password meets complexity requirements
 * @param password - The password to validate
 * @returns Boolean indicating if the password is valid
 */
export const isStrongPassword = (password: string): boolean => {
    // At least 8 characters, with at least one uppercase, one lowercase, one number, and one special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;
    return passwordRegex.test(password);
};

/**
 * Validates if a questionnaire is complete (all questions answered)
 * @param answers - Array of user answers
 * @param totalQuestions - Total number of questions
 * @returns Boolean indicating if the questionnaire is complete
 */
export const isQuestionnaireComplete = (
    answers: UserAnswer[],
    totalQuestions: number
): boolean => {
    // Check that we have the right number of answers
    if (answers.length !== totalQuestions) {
        return false;
    }

    // Check that all answers have a selected option
    return answers.every(answer =>
        answer.questionId && answer.selectedOptionId
    );
};

/**
 * Validates if a user's input string is within the allowed length
 * @param input - The input string
 * @param maxLength - Maximum allowed length
 * @returns Boolean indicating if the input is valid
 */
export const isWithinMaxLength = (
    input: string,
    maxLength: number
): boolean => {
    return input.length <= maxLength;
};

/**
 * Validates if a number is within a specific range
 * @param value - The number to validate
 * @param min - Minimum allowed value
 * @param max - Maximum allowed value
 * @returns Boolean indicating if the number is within range
 */
export const isInRange = (
    value: number,
    min: number,
    max: number
): boolean => {
    return value >= min && value <= max;
};