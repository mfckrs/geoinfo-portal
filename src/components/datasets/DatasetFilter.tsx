import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
    addSelectedSource,
    removeSelectedSource,
    addSelectedFormat,
    removeSelectedFormat,
    addSelectedCategory,
    removeSelectedCategory,
    setSearchTerm,
    resetFilters,
    setExpandedFilters
} from '../../features/datasets/datasetsSlice';
import { DATASET_SOURCES, DATASET_FORMATS } from '../../utils/constants';

interface DatasetFilterProps {
    availableCategories: string[];
}

const DatasetFilter: React.FC<DatasetFilterProps> = ({ availableCategories }) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const {
        selectedSources,
        selectedFormats,
        selectedCategories,
        searchTerm,
        expandedFilters
    } = useAppSelector(state => state.datasets);

    const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

    // Update local state when the global state changes
    useEffect(() => {
        setLocalSearchTerm(searchTerm);
    }, [searchTerm]);

    const handleSourceChange = (source: string) => {
        if (selectedSources.includes(source)) {
            dispatch(removeSelectedSource(source));
        } else {
            dispatch(addSelectedSource(source));
        }
    };

    const handleFormatChange = (format: string) => {
        if (selectedFormats.includes(format)) {
            dispatch(removeSelectedFormat(format));
        } else {
            dispatch(addSelectedFormat(format));
        }
    };

    const handleCategoryChange = (category: string) => {
        if (selectedCategories.includes(category)) {
            dispatch(removeSelectedCategory(category));
        } else {
            dispatch(addSelectedCategory(category));
        }
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLocalSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        dispatch(setSearchTerm(localSearchTerm));
    };

    const handleClearFilters = () => {
        dispatch(resetFilters());
        setLocalSearchTerm('');
    };

    const toggleExpandedFilters = () => {
        dispatch(setExpandedFilters(!expandedFilters));
    };

    // Count active filters
    const activeFilterCount = selectedSources.length + selectedFormats.length + selectedCategories.length + (searchTerm ? 1 : 0);

    return (
        <div className="dataset-filter">
            <div className="filter-header">
                <h2>{t('filter_datasets')}</h2>
                {activeFilterCount > 0 && (
                    <span className="active-filter-count">
                        {activeFilterCount} {t('active_filters')}
                    </span>
                )}
                <button
                    className="toggle-filters-button"
                    onClick={toggleExpandedFilters}
                    aria-expanded={expandedFilters}
                >
                    {expandedFilters ? t('collapse_filters') : t('expand_filters')}
                </button>
            </div>

            <form onSubmit={handleSearchSubmit} className="search-form">
                <div className="search-box">
                    <input
                        type="text"
                        placeholder={t('search_datasets')}
                        value={localSearchTerm}
                        onChange={handleSearchChange}
                        aria-label={t('search_datasets')}
                    />
                    <button type="submit" className="search-button">
                        {t('search')}
                    </button>
                </div>
            </form>

            {expandedFilters && (
                <div className="expanded-filters">
                    <div className="filter-section">
                        <h3>{t('dataset_source')}</h3>
                        <div className="filter-options">
                            {Object.entries(DATASET_SOURCES).map(([key, value]) => (
                                <label key={key} className="filter-option">
                                    <input
                                        type="checkbox"
                                        checked={selectedSources.includes(value)}
                                        onChange={() => handleSourceChange(value)}
                                    />
                                    <span>{t(`source_${key.toLowerCase()}`)}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="filter-section">
                        <h3>{t('dataset_format')}</h3>
                        <div className="filter-options">
                            {Object.entries(DATASET_FORMATS).map(([key, value]) => (
                                <label key={key} className="filter-option">
                                    <input
                                        type="checkbox"
                                        checked={selectedFormats.includes(value)}
                                        onChange={() => handleFormatChange(value)}
                                    />
                                    <span>{value}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="filter-section">
                        <h3>{t('categories')}</h3>
                        <div className="filter-options scrollable">
                            {availableCategories.map(category => (
                                <label key={category} className="filter-option">
                                    <input
                                        type="checkbox"
                                        checked={selectedCategories.includes(category)}
                                        onChange={() => handleCategoryChange(category)}
                                    />
                                    <span>{t(`category_${category.toLowerCase()}`, category)}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <div className="filter-actions">
                {activeFilterCount > 0 && (
                    <button
                        className="clear-filters-button"
                        onClick={handleClearFilters}
                    >
                        {t('clear_filters')}
                    </button>
                )}
            </div>
        </div>
    );
};

export default DatasetFilter;