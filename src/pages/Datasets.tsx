import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

// Redux hooks and actions
import { useAppSelector, useAppDispatch } from '../store/hooks';
import {
    addSelectedSource,
    removeSelectedSource,
    addSelectedFormat,
    removeSelectedFormat,
    addSelectedCategory,
    removeSelectedCategory,
    setSearchTerm,
    setCurrentPage,
    setItemsPerPage,
    setViewMode,
    setSortBy,
    setSortOrder,
    resetFilters,
    addToDownloadHistory,
    setExpandedFilters
} from '../features/datasets/datasetsSlice';

// API hooks
import { useGetDatasetsQuery } from '../services/datasetsApi';

// Constants
import { DATASET_SOURCES, DATASET_FORMATS, PROJECT_CATEGORIES } from '../utils/constants';

// Utils
import { formatFileSize, formatDate } from '../utils/formatters';

// Types
import { Dataset } from '../types';

const Datasets: React.FC = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    // Get states from Redux
    const {
        selectedSources,
        selectedFormats,
        selectedCategories,
        searchTerm,
        currentPage,
        itemsPerPage,
        viewMode,
        sortBy,
        sortOrder,
        expandedFilters
    } = useAppSelector(state => state.datasets);

    // Fetch datasets
    const { data: datasets, error, isLoading } = useGetDatasetsQuery();

    // Handle search input change
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchTerm(event.target.value));
        dispatch(setCurrentPage(1)); // Reset to first page when search changes
    };

    // Handle source filter changes
    const handleSourceChange = (source: string, checked: boolean) => {
        if (checked) {
            dispatch(addSelectedSource(source));
        } else {
            dispatch(removeSelectedSource(source));
        }
    };

    // Handle format filter changes
    const handleFormatChange = (format: string, checked: boolean) => {
        if (checked) {
            dispatch(addSelectedFormat(format));
        } else {
            dispatch(removeSelectedFormat(format));
        }
    };

    // Handle category filter changes
    const handleCategoryChange = (category: string, checked: boolean) => {
        if (checked) {
            dispatch(addSelectedCategory(category));
        } else {
            dispatch(removeSelectedCategory(category));
        }
    };

    // Handle sort changes
    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setSortBy(event.target.value as 'name' | 'source' | 'lastUpdated' | 'size'));
    };

    // Handle sort order change
    const handleSortOrderChange = () => {
        dispatch(setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'));
    };

    // Handle view mode change
    const handleViewModeChange = (mode: 'grid' | 'list') => {
        dispatch(setViewMode(mode));
    };

    // Handle download
    const handleDownload = (datasetId: string) => {
        // In a real app, this would trigger an actual download
        dispatch(addToDownloadHistory(datasetId));
        alert(t('download_started'));
    };

    // Handle page change
    const handlePageChange = (page: number) => {
        dispatch(setCurrentPage(page));
    };

    // Handle items per page change
    const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setItemsPerPage(Number(event.target.value)));
        dispatch(setCurrentPage(1)); // Reset to first page when changing items per page
    };

    // Handle reset filters
    const handleResetFilters = () => {
        dispatch(resetFilters());
    };

    // Handle toggle expanded filters
    const handleToggleExpandedFilters = () => {
        dispatch(setExpandedFilters(!expandedFilters));
    };

    // Filter and sort datasets
    const filteredAndSortedDatasets = React.useMemo(() => {
        if (!datasets) return [];

        // Apply filters
        let filtered = datasets.filter(dataset => {
            // Filter by search term
            if (searchTerm &&
                !dataset.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
                !dataset.description.toLowerCase().includes(searchTerm.toLowerCase())) {
                return false;
            }

            // Filter by sources
            if (selectedSources.length > 0 && !selectedSources.includes(dataset.source)) {
                return false;
            }

            // Filter by formats
            if (selectedFormats.length > 0 && !selectedFormats.includes(dataset.format)) {
                return false;
            }

            // Filter by categories
            if (selectedCategories.length > 0 &&
                !dataset.categories.some(category => selectedCategories.includes(category))) {
                return false;
            }

            return true;
        });

        // Apply sorting
        filtered.sort((a, b) => {
            let comparison = 0;

            switch (sortBy) {
                case 'name':
                    comparison = a.name.localeCompare(b.name);
                    break;
                case 'source':
                    comparison = a.source.localeCompare(b.source);
                    break;
                case 'lastUpdated':
                    comparison = new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime();
                    break;
                case 'size':
                    // Assuming size is stored as string like "10 MB", converting to bytes for comparison
                    const sizeA = parseInt(a.size.replace(/[^0-9]/g, ''));
                    const sizeB = parseInt(b.size.replace(/[^0-9]/g, ''));
                    comparison = sizeA - sizeB;
                    break;
                default:
                    comparison = 0;
            }

            return sortOrder === 'asc' ? comparison : -comparison;
        });

        return filtered;
    }, [datasets, searchTerm, selectedSources, selectedFormats, selectedCategories, sortBy, sortOrder]);

    // Pagination
    const paginatedDatasets = React.useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredAndSortedDatasets.slice(startIndex, endIndex);
    }, [filteredAndSortedDatasets, currentPage, itemsPerPage]);

    // Calculate total pages
    const totalPages = Math.ceil(filteredAndSortedDatasets.length / itemsPerPage);

    // Generate pagination links
    const paginationLinks = [];
    for (let i = 1; i <= totalPages; i++) {
        paginationLinks.push(
            <button
                key={i}
                onClick={() => handlePageChange(i)}
                className={`pagination-link ${currentPage === i ? 'active' : ''}`}
            >
                {i}
            </button>
        );
    }

    if (isLoading) {
        return <div className="loading-container">{t('loading')}</div>;
    }

    if (error) {
        return <div className="error-container">{t('error_loading')}</div>;
    }

    return (
        <div className="datasets-page">
            <div className="page-header">
                <h1>{t('datasets_title')}</h1>
                <p className="page-description">
                    {t('datasets_description')}
                </p>
            </div>

            <div className="datasets-controls">
                <div className="search-container">
                    <input
                        type="text"
                        placeholder={t('search_placeholder')}
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="search-input"
                    />
                </div>

                <div className="view-controls">
                    <div className="view-mode-buttons">
                        <button
                            className={`view-mode-button ${viewMode === 'grid' ? 'active' : ''}`}
                            onClick={() => handleViewModeChange('grid')}
                            aria-label={t('grid_view')}
                            title={t('grid_view')}
                        >
                            <span className="icon">□□</span>
                        </button>
                        <button
                            className={`view-mode-button ${viewMode === 'list' ? 'active' : ''}`}
                            onClick={() => handleViewModeChange('list')}
                            aria-label={t('list_view')}
                            title={t('list_view')}
                        >
                            <span className="icon">≡</span>
                        </button>
                    </div>

                    <div className="sort-controls">
                        <select
                            value={sortBy}
                            onChange={handleSortChange}
                            className="sort-select"
                            aria-label={t('sort_by')}
                        >
                            <option value="name">{t('name')}</option>
                            <option value="source">{t('dataset_source')}</option>
                            <option value="lastUpdated">{t('last_updated')}</option>
                            <option value="size">{t('dataset_size')}</option>
                        </select>
                        <button
                            onClick={handleSortOrderChange}
                            className="sort-order-button"
                            aria-label={sortOrder === 'asc' ? t('ascending') : t('descending')}
                            title={sortOrder === 'asc' ? t('ascending') : t('descending')}
                        >
                            {sortOrder === 'asc' ? '↑' : '↓'}
                        </button>
                    </div>
                </div>

                <button
                    onClick={handleToggleExpandedFilters}
                    className="filter-toggle-button"
                >
                    {expandedFilters ? t('hide_filters') : t('show_filters')}
                </button>
            </div>

            <div className="datasets-content">
                {expandedFilters && (
                    <div className="filters-sidebar">
                        <div className="filters-header">
                            <h3>{t('filter')}</h3>
                            <button onClick={handleResetFilters} className="clear-filters">
                                {t('clear_filters')}
                            </button>
                        </div>

                        <div className="filter-group">
                            <h4>{t('dataset_source')}</h4>
                            {Object.values(DATASET_SOURCES).map(source => (
                                <label key={source} className="filter-option">
                                    <input
                                        type="checkbox"
                                        checked={selectedSources.includes(source)}
                                        onChange={(e) => handleSourceChange(source, e.target.checked)}
                                    />
                                    {source}
                                </label>
                            ))}
                        </div>

                        <div className="filter-group">
                            <h4>{t('dataset_format')}</h4>
                            {Object.values(DATASET_FORMATS).map(format => (
                                <label key={format} className="filter-option">
                                    <input
                                        type="checkbox"
                                        checked={selectedFormats.includes(format)}
                                        onChange={(e) => handleFormatChange(format, e.target.checked)}
                                    />
                                    {format}
                                </label>
                            ))}
                        </div>

                        <div className="filter-group">
                            <h4>{t('dataset_categories')}</h4>
                            {Object.entries(PROJECT_CATEGORIES).map(([key, value]) => (
                                <label key={key} className="filter-option">
                                    <input
                                        type="checkbox"
                                        checked={selectedCategories.includes(key)}
                                        onChange={(e) => handleCategoryChange(key, e.target.checked)}
                                    />
                                    {t(`${value}_desc`) || value}
                                </label>
                            ))}
                        </div>
                    </div>
                )}

                <div className={`datasets-grid ${viewMode}`}>
                    {paginatedDatasets.length > 0 ? (
                        paginatedDatasets.map(dataset => (
                            <div key={dataset.id} className={`dataset-item ${viewMode}`}>
                                {renderDatasetItem(dataset, viewMode, handleDownload)}
                            </div>
                        ))
                    ) : (
                        <div className="no-results">{t('no_results')}</div>
                    )}
                </div>
            </div>

            <div className="pagination">
                <div className="pagination-controls">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="pagination-prev"
                    >
                        &laquo; {t('previous')}
                    </button>
                    <div className="pagination-links">
                        {paginationLinks}
                    </div>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="pagination-next"
                    >
                        {t('next')} &raquo;
                    </button>
                </div>
                <div className="items-per-page">
                    <label>
                        {t('items_per_page')}:
                        <select
                            value={itemsPerPage}
                            onChange={handleItemsPerPageChange}
                            className="items-per-page-select"
                        >
                            <option value="9">9</option>
                            <option value="18">18</option>
                            <option value="36">36</option>
                            <option value="72">72</option>
                        </select>
                    </label>
                </div>
            </div>
        </div>
    );
};

// Helper function to render dataset item based on view mode
function renderDatasetItem(dataset: Dataset, viewMode: 'grid' | 'list', handleDownload: (id: string) => void) {
    const { t } = useTranslation();

    if (viewMode === 'grid') {
        return (
            <div className="dataset-card">
                <div className="dataset-header">
                    <span className="dataset-format">{dataset.format}</span>
                    <h3 className="dataset-title">{dataset.name}</h3>
                </div>
                <div className="dataset-body">
                    <p className="dataset-description">{dataset.description}</p>
                    <div className="dataset-details">
                        <div className="dataset-detail">
                            <span className="detail-label">{t('dataset_source')}:</span>
                            <span className="detail-value">{dataset.source}</span>
                        </div>
                        <div className="dataset-detail">
                            <span className="detail-label">{t('dataset_size')}:</span>
                            <span className="detail-value">{dataset.size}</span>
                        </div>
                        <div className="dataset-detail">
                            <span className="detail-label">{t('last_updated')}:</span>
                            <span className="detail-value">{formatDate(dataset.lastUpdated)}</span>
                        </div>
                    </div>
                    <div className="dataset-categories">
                        {dataset.categories.map(category => (
                            <span key={category} className="dataset-category">
                                {category}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="dataset-footer">
                    <Link to={`/datasets/${dataset.id}`} className="view-details-button">
                        {t('view_details')}
                    </Link>
                    <button
                        onClick={() => handleDownload(dataset.id)}
                        className="download-button"
                    >
                        {t('download')}
                    </button>
                </div>
            </div>
        );
    } else {
        // List view
        return (
            <div className="dataset-list-item">
                <div className="dataset-info">
                    <h3 className="dataset-title">{dataset.name}</h3>
                    <span className="dataset-format">{dataset.format}</span>
                    <span className="dataset-source">{dataset.source}</span>
                    <span className="dataset-size">{dataset.size}</span>
                    <span className="dataset-date">{formatDate(dataset.lastUpdated)}</span>
                </div>
                <div className="dataset-actions">
                    <Link to={`/datasets/${dataset.id}`} className="view-details-button">
                        {t('view_details')}
                    </Link>
                    <button
                        onClick={() => handleDownload(dataset.id)}
                        className="download-button"
                    >
                        {t('download')}
                    </button>
                </div>
            </div>
        );
    }
}

export default Datasets;