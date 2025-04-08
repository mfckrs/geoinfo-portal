import type { QuestionnaireQuestion } from '../../types';

// Sample questionnaire data
export const questions: QuestionnaireQuestion[] = [
    {
        id: 'skills',
        text: 'question_skills',
        options: [
            {
                id: 'programming',
                text: 'Programming and Data Analysis',
                topicMatches: {
                    'photogrammetry': 30,
                    'mapping_gnss': 20,
                    'surveying': 10,
                    'gis': 60,
                    'cadastre': 30,
                    'ai_surveying': 90,
                    'digital_twin': 60,
                    'scan_to_bim': 40,
                    'laser_scanner': 30,
                    'algorithm_implementation': 100
                }
            },
            {
                id: 'fieldwork',
                text: 'Field Work and Surveying Equipment',
                topicMatches: {
                    'photogrammetry': 50,
                    'mapping_gnss': 90,
                    'surveying': 100,
                    'gis': 30,
                    'cadastre': 50,
                    'ai_surveying': 20,
                    'digital_twin': 30,
                    'scan_to_bim': 40,
                    'laser_scanner': 80,
                    'algorithm_implementation': 10
                }
            },
            {
                id: 'gis',
                text: 'GIS and Mapping',
                topicMatches: {
                    'photogrammetry': 40,
                    'mapping_gnss': 70,
                    'surveying': 50,
                    'gis': 100,
                    'cadastre': 90,
                    'ai_surveying': 40,
                    'digital_twin': 60,
                    'scan_to_bim': 30,
                    'laser_scanner': 40,
                    'algorithm_implementation': 30
                }
            },
            {
                id: 'remote_sensing',
                text: 'Remote Sensing and Image Processing',
                topicMatches: {
                    'photogrammetry': 100,
                    'mapping_gnss': 50,
                    'surveying': 30,
                    'gis': 70,
                    'cadastre': 20,
                    'ai_surveying': 80,
                    'digital_twin': 40,
                    'scan_to_bim': 50,
                    'laser_scanner': 60,
                    'algorithm_implementation': 40
                }
            }
        ]
    },
    {
        id: 'interests',
        text: 'question_interests',
        options: [
            {
                id: 'technology',
                text: 'Modern Technology and Innovation',
                topicMatches: {
                    'photogrammetry': 50,
                    'mapping_gnss': 60,
                    'surveying': 30,
                    'gis': 70,
                    'cadastre': 20,
                    'ai_surveying': 100,
                    'digital_twin': 90,
                    'scan_to_bim': 80,
                    'laser_scanner': 70,
                    'algorithm_implementation': 60
                }
            },
            {
                id: 'environment',
                text: 'Environmental Monitoring and Conservation',
                topicMatches: {
                    'photogrammetry': 90,
                    'mapping_gnss': 60,
                    'surveying': 50,
                    'gis': 100,
                    'cadastre': 30,
                    'ai_surveying': 70,
                    'digital_twin': 40,
                    'scan_to_bim': 20,
                    'laser_scanner': 80,
                    'algorithm_implementation': 30
                }
            },
            {
                id: 'urban',
                text: 'Urban Planning and Development',
                topicMatches: {
                    'photogrammetry': 60,
                    'mapping_gnss': 50,
                    'surveying': 70,
                    'gis': 90,
                    'cadastre': 100,
                    'ai_surveying': 40,
                    'digital_twin': 80,
                    'scan_to_bim': 70,
                    'laser_scanner': 60,
                    'algorithm_implementation': 20
                }
            },
            {
                id: 'data',
                text: 'Data Science and Analytics',
                topicMatches: {
                    'photogrammetry': 40,
                    'mapping_gnss': 30,
                    'surveying': 20,
                    'gis': 80,
                    'cadastre': 40,
                    'ai_surveying': 100,
                    'digital_twin': 70,
                    'scan_to_bim': 30,
                    'laser_scanner': 50,
                    'algorithm_implementation': 90
                }
            }
        ]
    },
    {
        id: 'environment',
        text: 'question_environment',
        options: [
            {
                id: 'field',
                text: 'Field Work and Outdoor Data Collection',
                topicMatches: {
                    'photogrammetry': 80,
                    'mapping_gnss': 100,
                    'surveying': 90,
                    'gis': 40,
                    'cadastre': 60,
                    'ai_surveying': 30,
                    'digital_twin': 20,
                    'scan_to_bim': 50,
                    'laser_scanner': 80,
                    'algorithm_implementation': 10
                }
            },
            {
                id: 'office',
                text: 'Office or Lab Setting with Computers',
                topicMatches: {
                    'photogrammetry': 40,
                    'mapping_gnss': 30,
                    'surveying': 20,
                    'gis': 90,
                    'cadastre': 70,
                    'ai_surveying': 100,
                    'digital_twin': 80,
                    'scan_to_bim': 60,
                    'laser_scanner': 50,
                    'algorithm_implementation': 100
                }
            },
            {
                id: 'mixed',
                text: 'Mix of Field and Office Work',
                topicMatches: {
                    'photogrammetry': 100,
                    'mapping_gnss': 90,
                    'surveying': 80,
                    'gis': 70,
                    'cadastre': 90,
                    'ai_surveying': 60,
                    'digital_twin': 100,
                    'scan_to_bim': 100,
                    'laser_scanner': 100,
                    'algorithm_implementation': 50
                }
            }
        ]
    },
    {
        id: 'career',
        text: 'question_career',
        options: [
            {
                id: 'government',
                text: 'Government Agencies (Survey of Israel, Israel Land Authority)',
                topicMatches: {
                    'photogrammetry': 70,
                    'mapping_gnss': 90,
                    'surveying': 100,
                    'gis': 80,
                    'cadastre': 100,
                    'ai_surveying': 40,
                    'digital_twin': 60,
                    'scan_to_bim': 30,
                    'laser_scanner': 70,
                    'algorithm_implementation': 20
                }
            },
            {
                id: 'private',
                text: 'Private Surveying and Mapping Companies',
                topicMatches: {
                    'photogrammetry': 90,
                    'mapping_gnss': 100,
                    'surveying': 100,
                    'gis': 70,
                    'cadastre': 80,
                    'ai_surveying': 50,
                    'digital_twin': 40,
                    'scan_to_bim': 80,
                    'laser_scanner': 90,
                    'algorithm_implementation': 30
                }
            },
            {
                id: 'tech',
                text: 'Technology Companies',
                topicMatches: {
                    'photogrammetry': 50,
                    'mapping_gnss': 40,
                    'surveying': 30,
                    'gis': 80,
                    'cadastre': 30,
                    'ai_surveying': 100,
                    'digital_twin': 90,
                    'scan_to_bim': 70,
                    'laser_scanner': 60,
                    'algorithm_implementation': 90
                }
            },
            {
                id: 'environmental',
                text: 'Environmental Consulting',
                topicMatches: {
                    'photogrammetry': 100,
                    'mapping_gnss': 60,
                    'surveying': 50,
                    'gis': 100,
                    'cadastre': 30,
                    'ai_surveying': 70,
                    'digital_twin': 50,
                    'scan_to_bim': 20,
                    'laser_scanner': 80,
                    'algorithm_implementation': 30
                }
            },
            {
                id: 'research',
                text: 'Research and Academia',
                topicMatches: {
                    'photogrammetry': 80,
                    'mapping_gnss': 70,
                    'surveying': 60,
                    'gis': 80,
                    'cadastre': 50,
                    'ai_surveying': 90,
                    'digital_twin': 70,
                    'scan_to_bim': 60,
                    'laser_scanner': 70,
                    'algorithm_implementation': 100
                }
            }
        ]
    }
];