import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import type { QuestionnaireQuestion, UserAnswer, QuestionnaireResult } from '../../types';
import { questions } from './questionnaireData';

interface QuestionnaireState {
    questions: QuestionnaireQuestion[];
    currentQuestionIndex: number;
    answers: UserAnswer[];
    results: QuestionnaireResult | null;
    isComplete: boolean;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: QuestionnaireState = {
    questions,
    currentQuestionIndex: 0,
    answers: [],
    results: null,
    isComplete: false,
    status: 'idle',
    error: null,
};

// Async thunk for calculating results
export const calculateResults = createAsyncThunk(
    'questionnaire/calculateResults',
    async (answers: UserAnswer[], { rejectWithValue }) => {
        try {
            // In a real application, this would be an API call
            // For now, we're simulating the calculation logic here

            // Initialize all topics with a score of 0
            const topicMatches: Record<string, number> = {
                'photogrammetry': 0,
                'mapping_gnss': 0,
                'surveying': 0,
                'gis': 0,
                'cadastre': 0,
                'ai_surveying': 0,
                'digital_twin': 0,
                'scan_to_bim': 0,
                'laser_scanner': 0,
                'algorithm_implementation': 0
            };

            // Calculate topic matches based on answers
            answers.forEach(answer => {
                // Find the question
                const question = questions.find(q => q.id === answer.questionId);
                if (!question) return;

                // Find the selected option
                const option = question.options.find(o => o.id === answer.selectedOptionId);
                if (!option) return;

                // Add the option's topic matches to the total
                Object.entries(option.topicMatches).forEach(([topicId, value]) => {
                    if (topicId in topicMatches) {
                        topicMatches[topicId] += value;
                    }
                });
            });

            // Normalize scores to percentages (0-100)
            const maxPossibleScore = answers.length * 100; // Assuming each question can contribute up to 100 points
            Object.keys(topicMatches).forEach(topicId => {
                topicMatches[topicId] = Math.round((topicMatches[topicId] / maxPossibleScore) * 100);
            });

            // Get top 3 recommended topics
            const recommendedTopics = Object.entries(topicMatches)
                .sort((a, b) => b[1] - a[1]) // Sort by score descending
                .slice(0, 3) // Take top 3
                .map(([topicId]) => topicId); // Keep only topic IDs

            // In a real app, we'd also get recommended resources based on these topics
            const recommendedResources: string[] = [];

            // Return the results
            return {
                topicMatches,
                recommendedTopics,
                recommendedResources
            } as QuestionnaireResult;
        } catch (error) {
            return rejectWithValue('Error calculating results' + (error));
        }
    }
);

export const questionnaireSlice = createSlice({
    name: 'questionnaire',
    initialState,
    reducers: {
        nextQuestion: (state) => {
            if (state.currentQuestionIndex < state.questions.length - 1) {
                state.currentQuestionIndex += 1;
            }
        },
        previousQuestion: (state) => {
            if (state.currentQuestionIndex > 0) {
                state.currentQuestionIndex -= 1;
            }
        },
        answerQuestion: (state, action: PayloadAction<UserAnswer>) => {
            // Find if this question has already been answered
            const existingAnswerIndex = state.answers.findIndex(
                a => a.questionId === action.payload.questionId
            );

            // Update or add the answer
            if (existingAnswerIndex >= 0) {
                state.answers[existingAnswerIndex] = action.payload;
            } else {
                state.answers.push(action.payload);
            }
        },
        resetQuestionnaire: (state) => {
            state.currentQuestionIndex = 0;
            state.answers = [];
            state.results = null;
            state.isComplete = false;
            state.status = 'idle';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(calculateResults.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(calculateResults.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.results = action.payload;
                state.isComplete = true;
            })
            .addCase(calculateResults.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });
    },
});

export const { nextQuestion, previousQuestion, answerQuestion, resetQuestionnaire } = questionnaireSlice.actions;

export default questionnaireSlice.reducer;