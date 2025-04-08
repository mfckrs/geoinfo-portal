import {Equipment, AvailabilityStatus} from './index';

// Extended equipment interface with additional properties
export interface EquipmentWithDetails extends Equipment {
    model: string;
    manufacturer: string;
    serialNumber?: string;
    purchaseDate?: string;
    lastMaintenanceDate?: string;
    nextMaintenanceDate?: string;
    technicalSpecifications?: Record<string, string>;
    manualUrl?: string;
    calibrationStatus?: 'calibrated' | 'needs-calibration' | 'not-applicable';
    calibrationDate?: string;
    nextCalibrationDate?: string;
    images?: string[];
    notes?: string;
    responsiblePerson?: string;
    replacementCost?: number;
    rentCost?: number; // Cost per day
    accessories?: {
        id: string;
        name: string;
        count: number;
        available: number;
    }[];
}

// Equipment grouping by type
export interface EquipmentByType {
    [key: string]: Equipment[];
}

// Equipment grouping by location
export interface EquipmentByLocation {
    [key: string]: Equipment[];
}

// Equipment grouping by availability
export type EquipmentByAvailability = {
    [key in AvailabilityStatus]: Equipment[];
};

// Interface for equipment search results
export interface EquipmentSearchResult {
    equipment: Equipment;
    relevanceScore: number;
    matchedTerms: string[];
}

// Interface for equipment filters
export interface EquipmentFilter {
    types: string[];
    locations: string[];
    availability: AvailabilityStatus | null;
    searchTerm: string;
}

// Equipment card display options
export interface EquipmentCardOptions {
    showType: boolean;
    showLocation: boolean;
    showAvailability: boolean;
    showDescription: boolean;
    compact: boolean;
}

// Type for handling equipment sorting
export type EquipmentSortField = 'name' | 'type' | 'location' | 'availability';

// Interface for equipment reservation request
export interface EquipmentReservationRequest {
    equipmentId: string;
    userId: string;
    startDate: string;
    endDate: string;
    purpose: string;
    location: string;
    returnLocation?: string;
    accessories?: {
        id: string;
        count: number;
    }[];
}

// Interface for equipment reservation
export interface EquipmentReservation extends EquipmentReservationRequest {
    id: string;
    status: 'pending' | 'approved' | 'rejected' | 'active' | 'completed' | 'cancelled';
    requestDate: string;
    approvedBy?: string;
    approvalDate?: string;
    comments?: string;
    actualReturnDate?: string;
    condition?: 'good' | 'damaged' | 'missing-parts' | 'not-returned';
}

// Interface for equipment usage statistics
export interface EquipmentUsageStatistics {
    equipmentId: string;
    totalReservations: number;
    totalDaysReserved: number;
    averageDurationPerReservation: number;
    reservationsByMonth: Record<string, number>;
    mostPopularMonths: string[];
    utilization: number; // Percentage of time the equipment is in use
}

// Interface for equipment maintenance record
export interface EquipmentMaintenanceRecord {
    id: string;
    equipmentId: string;
    date: string;
    type: 'regular' | 'repair' | 'calibration' | 'inspection';
    description: string;
    performedBy: string;
    cost?: number;
    nextScheduledDate?: string;
    issues?: string[];
    resolvedIssues?: string[];
    partsReplaced?: string[];
}

// Interface for equipment availability schedule
export interface EquipmentAvailabilitySchedule {
    equipmentId: string;
    availableDates: {
        startDate: string;
        endDate: string;
    }[];
    reservedDates: {
        startDate: string;
        endDate: string;
        reservationId: string;
    }[];
    maintenanceDates: {
        startDate: string;
        endDate: string;
        maintenanceId: string;
        type: string;
    }[];
}