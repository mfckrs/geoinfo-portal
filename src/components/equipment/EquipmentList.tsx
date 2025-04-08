import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import {
    setCurrentPage,
    setSortBy,
    setSortOrder,
    setViewMode
} from '../../features/equipment/equipmentSlice';
import {
    useGetEquipmentQuery,
    useFilterEquipmentQuery
} from '../../services/equipmentApi';
import EquipmentCard from './EquipmentCard';
import LoadingSpinner from '../common/LoadingSpinner';
import { Equipment } from '../../types';

const EquipmentList: React.FC = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    // Get equipment-related state from Redux
    const {
        selectedTypes,
        selectedLocations,
        selectedAvailability,
        searchTerm,
        currentPage,
        itemsPerPage,
        viewMode,
        sortBy,
        sortOrder
    } = useAppSelector(state => state.equipment);

    // Fetch all equipment for initial load or when no filters are applied
    const { data: allEquipment, isLoading: isLoadingAll, error: errorAll } =
        useGetEquipmentQuery();

    // Fetch filtered equipment when filters are applied
    const filters = {
        types: selectedTypes.length > 0 ? selectedTypes : undefined,
        availability: selectedAvailability || undefined,
        location: selectedLocations.length > 0 ? undefined : undefined // API needs adjustment to handle array
    };

    const hasFilters = selectedTypes.length > 0 || selectedLocations.length > 0 || selectedAvailability !== null;

    const {
        data: filteredEquipment,
        isLoading: isLoadingFiltered,
        error: errorFiltered
    } = useFilterEquipmentQuery(filters, {
        skip: !hasFilters
    });

    // Determine which data to use
    const equipment = hasFilters ? filteredEquipment : allEquipment;
    const isLoading = hasFilters ? isLoadingFiltered : isLoadingAll;
    const error = hasFilters ? errorFiltered : errorAll;

    // Reset page when filters change
    useEffect(() => {
        dispatch(setCurrentPage(1));
    }, [selectedTypes, selectedLocations, selectedAvailability, searchTerm, dispatch]);

    // Apply client-side filtering for search term
    const filteredBySearch = equipment ? equipment.filter(item =>
        searchTerm.trim() === '' ||
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.type.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];

    // Apply client-side sorting
    const sortedEquipment = [...filteredBySearch].sort((a, b) => {
        let comparison = 0;

        switch (sortBy) {
            case 'name':
                comparison = a.name.localeCompare(b.name);
                break;
            case 'type':
                comparison = a.type.localeCompare(b.type);
                break;
            case 'availability':
                // Custom sort order for availability
                { const availabilityOrder = { 'Available': 0, 'Limited': 1, 'Unavailable': 2 };
                comparison = availabilityOrder[a.availability] - availabilityOrder[b.availability];
                break; }
            default:
                comparison = a.name.localeCompare(b.name);
        }

        return sortOrder === 'asc' ? comparison : -comparison;
    });

    // Pagination
    const totalItems = sortedEquipment.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedEquipment = sortedEquipment.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (page: number) => {
        dispatch(setCurrentPage(page));
        // Scroll to top of list
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSortChange = (newSortBy: 'name' | 'type' | 'availability') => {
        if (sortBy === newSortBy) {
            // Toggle sort order if clicking the same column
            dispatch(setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'));
        } else {
            dispatch(setSortBy(newSortBy));
            dispatch(setSortOrder('asc'));
        }
    };

    const handleViewModeChange = (mode: 'grid' | 'list') => {
        dispatch(setViewMode(mode));
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <div className="error-message">{t('error_loading')}</div>;
    }

    if (!equipment || equipment.length === 0) {
        return <div className="no-results">{t('no_results')}</div>;
    }

    return (
        <div className="equipment-list-container">
            <div className="list-header">
                <div className="results-count">
                    {t('showing_results', { count: totalItems })}
                </div>

                <div className="list-controls">
                    <div className="sort-controls">
                        <label htmlFor="sort-by">{t('sort_by')}:</label>
                        <select
                            id="sort-by"
                            value={sortBy}
                            onChange={(e) => handleSortChange(e.target.value as never)}
                            className="sort-select"
                        >
                            <option value="name">{t('name')}</option>
                            <option value="type">{t('type')}</option>
                            <option value="availability">{t('availability')}</option>
                        </select>

                        <button
                            className="sort-direction-button"
                            onClick={() => dispatch(setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'))}
                            aria-label={sortOrder === 'asc' ? t('ascending') : t('descending')}
                        >
                            {sortOrder === 'asc' ? '↑' : '↓'}
                        </button>
                    </div>

                    <div className="view-mode-controls">
                        <button
                            className={`view-mode-button ${viewMode === 'grid' ? 'active' : ''}`}
                            onClick={() => handleViewModeChange('grid')}
                            aria-label={t('grid_view')}
                        >
                            <span className="icon">□□</span>
                        </button>
                        <button
                            className={`view-mode-button ${viewMode === 'list' ? 'active' : ''}`}
                            onClick={() => handleViewModeChange('list')}
                            aria-label={t('list_view')}
                        >
                            <span className="icon">≡</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className={`equipment-items ${viewMode}`}>
                {paginatedEquipment.map((item: Equipment) => (
                    <EquipmentCard
                        key={item.id}
                        equipment={item}
                        compact={viewMode === 'list'}
                    />
                ))}
            </div>

            {totalPages > 1 && (
                <div className="pagination">
                    <button
                        className="pagination-button"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        {t('previous')}
                    </button>

                    <div className="page-numbers">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                            <button
                                key={page}
                                className={`page-number ${page === currentPage ? 'active' : ''}`}
                                onClick={() => handlePageChange(page)}
                            >
                                {page}
                            </button>
                        ))}
                    </div>

                    <button
                        className="pagination-button"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        {t('next')}
                    </button>
                </div>
            )}
        </div>
    );
};

export default EquipmentList;