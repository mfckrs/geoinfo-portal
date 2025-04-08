import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import {
    setCurrentPage,
    setItemsPerPage,
    setViewMode,
    setSortBy,
    setSortOrder
} from '../../features/datasets/datasetsSlice';
import DatasetCard from './DatasetCard';
import LoadingSpinner from '../common/LoadingSpinner';
import type { Dataset } from '../../types';

interface DatasetListProps {
    datasets: Dataset[];
    loading: boolean;
    error: any;
}

const DatasetList: React.FC<DatasetListProps> = ({ datasets, loading, error }) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const {
        currentPage,
        itemsPerPage,
        viewMode,
        sortBy,
        sortOrder
    } = useAppSelector(state => state.datasets);

    const [sortedDatasets, setSortedDatasets] = useState<Dataset[]>([]);
    const [paginatedDatasets, setPaginatedDatasets] = useState<Dataset[]>([]);
    const [totalPages, setTotalPages] = useState(1);

    // Sort and paginate datasets when they change or sort/pagination settings change
    useEffect(() => {
        if (!datasets || datasets.length === 0) {
            setSortedDatasets([]);
            setPaginatedDatasets([]);
            setTotalPages(1);
            return;
        }

        // Sort datasets based on current sort settings
        const sorted = [...datasets].sort((a, b) => {
            let comparison = 0;

            switch (sortBy) {
                case 'name':
                    comparison = a.name.localeCompare(b.name);
                    break;
                case 'source':
                    comparison = a.source.localeCompare(b.source);
                    break;
                case 'format':
                    comparison = a.format.localeCompare(b.format);
                    break;
                case 'size':
                    comparison = parseInt(a.size) - parseInt(b.size);
                    break;
                case 'lastUpdated':
                    comparison = new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime();
                    break;
                default:
                    comparison = a.name.localeCompare(b.name);
            }

            return sortOrder === 'asc' ? comparison : -comparison;
        });

        setSortedDatasets(sorted);

        // Calculate total pages
        const calculatedTotalPages = Math.ceil(sorted.length / itemsPerPage);
        setTotalPages(calculatedTotalPages);

        // Adjust current page if it's out of bounds after sorting/filtering
        const adjustedCurrentPage = currentPage > calculatedTotalPages ? 1 : currentPage;
        if (adjustedCurrentPage !== currentPage) {
            dispatch(setCurrentPage(adjustedCurrentPage));
        }

        // Paginate the sorted datasets
        const startIndex = (adjustedCurrentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setPaginatedDatasets(sorted.slice(startIndex, endIndex));
    }, [datasets, sortBy, sortOrder, currentPage, itemsPerPage, dispatch]);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            dispatch(setCurrentPage(newPage));
        }
    };

    const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setItemsPerPage(parseInt(event.target.value)));
    };

    const handleViewModeChange = (mode: 'grid' | 'list') => {
        dispatch(setViewMode(mode));
    };

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setSortBy(event.target.value as any));
    };

    const handleSortOrderToggle = () => {
        dispatch(setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'));
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return (
            <div className="error-message">
                <p>{t('error_loading_datasets')}</p>
                <p>{error.message}</p>
            </div>
        );
    }

    if (!datasets || datasets.length === 0) {
        return (
            <div className="no-results">
                <p>{t('no_datasets_found')}</p>
            </div>
        );
    }

    // Generate pagination controls
    const paginationControls = [];
    const maxPagesToShow = 5;

    // Previous button
    paginationControls.push(
        <button
            key="prev"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="pagination-prev"
        >
            {t('previous')}
        </button>
    );

    // Page numbers
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow && startPage > 1) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        paginationControls.push(
            <button
                key={i}
                onClick={() => handlePageChange(i)}
                className={currentPage === i ? 'pagination-current' : 'pagination-page'}
            >
                {i}
            </button>
        );
    }

    // Next button
    paginationControls.push(
        <button
            key="next"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="pagination-next"
        >
            {t('next')}
        </button>
    );

    return (
        <div className="dataset-list-container">
            <div className="dataset-list-controls">
                <div className="view-controls">
                    <button
                        className={`view-mode-button ${viewMode === 'grid' ? 'active' : ''}`}
                        onClick={() => handleViewModeChange('grid')}
                        title={t('grid_view')}
                    >
                        <span className="icon grid-icon"></span>
                    </button>
                    <button
                        className={`view-mode-button ${viewMode === 'list' ? 'active' : ''}`}
                        onClick={() => handleViewModeChange('list')}
                        title={t('list_view')}
                    >
                        <span className="icon list-icon"></span>
                    </button>
                </div>

                <div className="sort-controls">
                    <label htmlFor="sort-select">{t('sort_by')}:</label>
                    <select
                        id="sort-select"
                        value={sortBy}
                        onChange={handleSortChange}
                    >
                        <option value="name">{t('name')}</option>
                        <option value="source">{t('source')}</option>
                        <option value="format">{t('format')}</option>
                        <option value="size">{t('size')}</option>
                        <option value="lastUpdated">{t('last_updated')}</option>
                    </select>

                    <button
                        className="sort-order-button"
                        onClick={handleSortOrderToggle}
                        title={sortOrder === 'asc' ? t('ascending') : t('descending')}
                    >
                        <span className={`icon ${sortOrder === 'asc' ? 'asc-icon' : 'desc-icon'}`}></span>
                    </button>
                </div>

                <div className="per-page-controls">
                    <label htmlFor="per-page-select">{t('items_per_page')}:</label>
                    <select
                        id="per-page-select"
                        value={itemsPerPage}
                        onChange={handleItemsPerPageChange}
                    >
                        <option value="9">9</option>
                        <option value="18">18</option>
                        <option value="36">36</option>
                    </select>
                </div>
            </div>

            <div className={`dataset-list ${viewMode}`}>
                {paginatedDatasets.map(dataset => (
                    <DatasetCard
                        key={dataset.id}
                        dataset={dataset}
                        compact={viewMode === 'list'}
                    />
                ))}
            </div>

            <div className="pagination">
                <div className="pagination-info">
                    {t('showing')} {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, datasets.length)} {t('of')} {datasets.length} {t('datasets')}
                </div>
                <div className="pagination-controls">
                    {paginationControls}
                </div>
            </div>
        </div>
    );
};

export default DatasetList;