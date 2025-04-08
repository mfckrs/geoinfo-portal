import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { ResourceType, Difficulty } from '../../types';

interface ResourceFilterProps {
    onFilterChange: (filters: {
        types: ResourceType[];
        difficulty: Difficulty | '';
        categories: string[];
        searchTerm: string;
    }) => void;
    categories: string[];
}

const ResourceFilter: React.FC<ResourceFilterProps> = ({ onFilterChange, categories }) => {
    const { t } = useTranslation();

    const [selectedTypes, setSelectedTypes] = useState<ResourceType[]>([]);
    const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | ''>('');
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    const resourceTypes: ResourceType[] = ['Academic', 'Tutorial', 'Documentation', 'Community', 'Tool'];
    const difficultyLevels: (Difficulty | '')[] = ['', 'Low', 'Medium', 'High'];

    const handleTypeChange = (type: ResourceType) => {
        if (selectedTypes.includes(type)) {
            setSelectedTypes(selectedTypes.filter(t => t !== type));
        } else {
            setSelectedTypes([...selectedTypes, type]);
        }
    };

    const handleCategoryChange = (category: string) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter(c => c !== category));
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    const handleDifficultyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedDifficulty(event.target.value as Difficulty | '');
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleApplyFilters = () => {
        onFilterChange({
            types: selectedTypes,
            difficulty: selectedDifficulty,
            categories: selectedCategories,
            searchTerm
        });
    };

    const handleClearFilters = () => {
        setSelectedTypes([]);
        setSelectedDifficulty('');
        setSelectedCategories([]);
        setSearchTerm('');
        onFilterChange({ types: [], difficulty: '', categories: [], searchTerm: '' });
    };

    return (
        <div className="resource-filter">
            <h2 className="filter-title">{t('filter_resources')}</h2>

            <div className="filter-section">
                <div className="search-box">
                    <input
                        type="text"
                        placeholder={t('search_placeholder')}
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>

            <div className="filter-section">
                <h3 className="filter-section-title">{t('resource_type')}</h3>
                <div className="filter-checkboxes">
                    {resourceTypes.map(type => (
                        <label key={type} className="filter-checkbox">
                            <input
                                type="checkbox"
                                checked={selectedTypes.includes(type)}
                                onChange={() => handleTypeChange(type)}
                            />
                            {t(`resource_type_${type.toLowerCase()}`)}
                        </label>
                    ))}
                </div>
            </div>

            <div className="filter-section">
                <h3 className="filter-section-title">{t('difficulty')}</h3>
                <select value={selectedDifficulty} onChange={handleDifficultyChange}>
                    <option value="">{t('all_difficulties')}</option>
                    {difficultyLevels.filter(d => d !== '').map(level => (
                        <option key={level} value={level}>
                            {t(level.toLowerCase())}
                        </option>
                    ))}
                </select>
            </div>

            <div className="filter-section">
                <h3 className="filter-section-title">{t('categories')}</h3>
                <div className="filter-checkboxes scrollable">
                    {categories.map(category => (
                        <label key={category} className="filter-checkbox">
                            <input
                                type="checkbox"
                                checked={selectedCategories.includes(category)}
                                onChange={() => handleCategoryChange(category)}
                            />
                            {category}
                        </label>
                    ))}
                </div>
            </div>

            <div className="filter-actions">
                <button
                    className="filter-apply-button"
                    onClick={handleApplyFilters}
                >
                    {t('apply_filters')}
                </button>
                <button
                    className="filter-clear-button"
                    onClick={handleClearFilters}
                >
                    {t('clear_filters')}
                </button>
            </div>
        </div>
    );
};

export default ResourceFilter;