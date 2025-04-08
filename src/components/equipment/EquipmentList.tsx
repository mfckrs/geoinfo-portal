import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import {
    setCurrentPage,
    resetFilters,
    setSearchTerm
} from '../../features/equipment/equipmentSlice';
import { useGetEquipmentQuery, useFilterEquipmentQuery } from '../../services/equipmentApi';
import EquipmentCard from './EquipmentCard';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorBoundary from '../common/ErrorBoundary';

interface EquipmentListProps {
    title?: string;
    showFilters?: boolean;
    relatedTopicId?: string;
    maxItems?: number;
}

/**
 * Component that displays a list of equipment with filtering and pagination
 */
const EquipmentList: React.FC<EquipmentListProps> = ({
                                                         title,
                                                         showFilters = true,
                                                         relatedTopicId,
                                                         maxItems
                                                     }) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    // Get equipment state from Redux
    const {
        selectedTypes,
        selectedLocations,
        selectedAvailability,
        searchTerm,
        currentPage,
        itemsPerPage,
        viewMode
    } = useAppSelector(state => state.equipment);

    // Fetch equipment based on filters or get all equipment
    const filters = {
        types: selectedTypes,
        locations: selectedLocations,
        availability: selectedAvailability
    };

    const { data: filteredEquipment, isLoading: isFilterLoading, error: filterError } =
        useFilterEquipmentQuery(filters, { skip: (!selectedTypes.length && !selectedLocations.length && !selectedAvailability) });

    const { data: allEquipment, isLoading: isAllLoading, error: allError } =
        useGetEquipmentQuery(undefined, { skip: !!(selectedTypes.length || selectedLocations.length || selectedAvailability) });

    const equipment = filteredEquipment || allEquipment || [];
    const isLoading = isFilterLoading || isAllLoading;
    const error = filterError || allError;

    // Reset to first page when filters change
    useEffect(() => {
        dispatch(setCurrentPage(1));
    }, [selectedTypes, selectedLocations, selectedAvailability, searchTerm, dispatch]);

    // Filter by search term (client-side)
    const filteredBySearch = searchTerm
        ? equipment.filter(item =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.type.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : equipment;

    // Filter by related topic if provided
    const filteredByTopic = relatedTopicId
        ? filteredBySearch.filter(item => item.relatedTopics.includes(relatedTopicId))
        : filteredBySearch;

    // Apply pagination
    const totalItems = filteredByTopic.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const paginatedItems = maxItems
        ? filteredByTopic.slice(0, maxItems)
        : filteredByTopic.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    // Handle page change
    const handlePageChange = (page: number) => {
        dispatch(setCurrentPage(page));
        // Scroll to top of list
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Handle search
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchTerm(e.target.value));
    };

    // Handle reset filters
    const handleResetFilters = () => {
        dispatch(resetFilters());
    };

    // Render pagination controls
    const renderPagination = () => {
        if (totalPages <= 1) return null;

        return (
            <div className="pagination flex justify-center mt-6">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 mx-1 rounded bg-gray-200 disabled:opacity-50"
                >
                    &laquo;
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-1 mx-1 rounded ${
                            currentPage === page ? 'bg-blue-600 text-white' : 'bg-gray-200'
                        }`}
                    >
                        {page}
                    </button>
                ))}

                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 mx-1 rounded bg-gray-200 disabled:opacity-50"
                >
                    &raquo;
                </button>
            </div>
        );
    };

    if (isLoading) return <LoadingSpinner />;

    if (error) {
        return (
            <div className="error-container p-4 bg-red-100 text-red-700 rounded">
                <h3 className="font-bold">{t('error_loading')}</h3>
                <p>{t('please_try_again')}</p>
            </div>
        );
    }

    return (
        <ErrorBoundary>
            <div className="equipment-list">
                {title && <h2 className="text-2xl font-bold mb-4">{title}</h2>}

                {showFilters && (
                    <div className="filters mb-6">
                        <div className="search-box mb-4">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={handleSearch}
                                placeholder={t('search_placeholder')}
                                className="w-full p-2 border rounded"
                            />
                        </div>

                        {(selectedTypes.length > 0 || selectedLocations.length > 0 || selectedAvailability) && (
                            <div className="active-filters flex flex-wrap gap-2 mb-4">
                                <span className="text-sm text-gray-600">{t('active_filters')}:</span>
                                <button
                                    onClick={handleResetFilters}
                                    className="text-sm text-blue-600 hover:text-blue-800"
                                >
                                    {t('clear_filters')}
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {paginatedItems.length === 0 ? (
                    <div className="no-results p-4 bg-gray-100 rounded text-center">
                        <p>{t('no_results')}</p>
                    </div>
                ) : (
                    <>
                        <div className={`equipment-grid ${
                            viewMode === 'grid'
                                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
                                : 'space-y-4'
                        }`}>
                            {paginatedItems.map(item => (
                                <EquipmentCard
                                    key={item.id}
                                    equipment={item}
                                    compact={viewMode === 'grid'}
                                />
                            ))}
                        </div>

                        {!maxItems && totalPages > 1 && renderPagination()}
                    </>
                )}
            </div>
        </ErrorBoundary>
    );
};

export default EquipmentList;