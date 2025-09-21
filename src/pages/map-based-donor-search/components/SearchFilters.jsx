import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const SearchFilters = ({ 
  filters, 
  onFiltersChange, 
  isVisible, 
  onToggleVisibility,
  onClearFilters 
}) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const bloodTypeOptions = [
    { value: 'all', label: 'All Blood Types' },
    { value: 'A+', label: 'A+' },
    { value: 'A-', label: 'A-' },
    { value: 'B+', label: 'B+' },
    { value: 'B-', label: 'B-' },
    { value: 'AB+', label: 'AB+' },
    { value: 'AB-', label: 'AB-' },
    { value: 'O+', label: 'O+' },
    { value: 'O-', label: 'O-' }
  ];

  const radiusOptions = [
    { value: '5', label: '5 km' },
    { value: '10', label: '10 km' },
    { value: '25', label: '25 km' },
    { value: '50', label: '50 km' },
    { value: '100', label: '100 km' }
  ];

  const urgencyOptions = [
    { value: 'any', label: 'Any Urgency' },
    { value: 'low', label: 'Low Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'high', label: 'High Priority' },
    { value: 'critical', label: 'Critical' }
  ];

  const handleFilterChange = (key, value) => {
    const updatedFilters = { ...localFilters, [key]: value };
    setLocalFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const handleClearAll = () => {
    const clearedFilters = {
      bloodType: 'all',
      radius: '25',
      availableOnly: false,
      urgency: 'any',
      lastDonation: '',
      minRating: 0,
      location: ''
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
    onClearFilters();
  };

  const activeFiltersCount = Object.values(localFilters)?.filter(value => 
    value && value !== 'all' && value !== 'any' && value !== '' && value !== 0 && value !== false
  )?.length;

  if (!isVisible) {
    return (
      <div className="absolute top-4 left-4 z-1010">
        <Button
          variant="outline"
          onClick={onToggleVisibility}
          className="bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg"
        >
          <Icon name="Filter" size={16} className="mr-2" />
          Filters
          {activeFiltersCount > 0 && (
            <span className="ml-2 bg-primary text-white text-xs rounded-full px-2 py-0.5">
              {activeFiltersCount}
            </span>
          )}
        </Button>
      </div>
    );
  }

  return (
    <div className="absolute top-4 left-4 z-1010 w-80">
      <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-modal border border-gray-200 p-4">
        {/* Filter Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={18} className="text-primary" />
            <h3 className="font-semibold text-gray-900">Search Filters</h3>
            {activeFiltersCount > 0 && (
              <span className="bg-primary text-white text-xs rounded-full px-2 py-0.5">
                {activeFiltersCount}
              </span>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleVisibility}
          >
            <Icon name="X" size={16} />
          </Button>
        </div>

        {/* Location Search */}
        <div className="mb-4">
          <Input
            label="Search Location"
            type="text"
            placeholder="Enter address or landmark"
            value={localFilters?.location || ''}
            onChange={(e) => handleFilterChange('location', e?.target?.value)}
            className="mb-2"
          />
        </div>

        {/* Blood Type Filter */}
        <div className="mb-4">
          <Select
            label="Blood Type"
            options={bloodTypeOptions}
            value={localFilters?.bloodType || 'all'}
            onChange={(value) => handleFilterChange('bloodType', value)}
            className="mb-2"
          />
        </div>

        {/* Search Radius */}
        <div className="mb-4">
          <Select
            label="Search Radius"
            options={radiusOptions}
            value={localFilters?.radius || '25'}
            onChange={(value) => handleFilterChange('radius', value)}
            className="mb-2"
          />
        </div>

        {/* Urgency Level */}
        <div className="mb-4">
          <Select
            label="Urgency Level"
            options={urgencyOptions}
            value={localFilters?.urgency || 'any'}
            onChange={(value) => handleFilterChange('urgency', value)}
            className="mb-2"
          />
        </div>

        {/* Availability Filter */}
        <div className="mb-4">
          <Checkbox
            label="Show only available donors"
            checked={localFilters?.availableOnly || false}
            onChange={(e) => handleFilterChange('availableOnly', e?.target?.checked)}
          />
        </div>

        {/* Last Donation Filter */}
        <div className="mb-4">
          <Input
            label="Last Donation (months ago)"
            type="number"
            placeholder="e.g., 3"
            value={localFilters?.lastDonation || ''}
            onChange={(e) => handleFilterChange('lastDonation', e?.target?.value)}
            className="mb-2"
          />
        </div>

        {/* Minimum Rating */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Minimum Rating
          </label>
          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4, 5]?.map((rating) => (
              <button
                key={rating}
                onClick={() => handleFilterChange('minRating', rating)}
                className={`p-1 rounded ${
                  (localFilters?.minRating || 0) >= rating
                    ? 'text-yellow-400' :'text-gray-300'
                }`}
              >
                <Icon name="Star" size={16} className="fill-current" />
              </button>
            ))}
            <span className="text-sm text-gray-500 ml-2">
              {localFilters?.minRating || 0}+ stars
            </span>
          </div>
        </div>

        {/* Advanced Options */}
        <div className="mb-4">
          <details className="group">
            <summary className="flex items-center justify-between cursor-pointer text-sm font-medium text-gray-700 mb-2">
              <span>Advanced Options</span>
              <Icon name="ChevronDown" size={16} className="group-open:rotate-180 transition-transform" />
            </summary>
            <div className="space-y-3 mt-3 pl-4 border-l-2 border-gray-100">
              <Checkbox
                label="Verified donors only"
                checked={localFilters?.verifiedOnly || false}
                onChange={(e) => handleFilterChange('verifiedOnly', e?.target?.checked)}
              />
              <Checkbox
                label="Regular donors (3+ donations)"
                checked={localFilters?.regularDonors || false}
                onChange={(e) => handleFilterChange('regularDonors', e?.target?.checked)}
              />
              <Checkbox
                label="Show emergency requests"
                checked={localFilters?.showEmergencyRequests !== false}
                onChange={(e) => handleFilterChange('showEmergencyRequests', e?.target?.checked)}
              />
              <Checkbox
                label="Show hospitals"
                checked={localFilters?.showHospitals !== false}
                onChange={(e) => handleFilterChange('showHospitals', e?.target?.checked)}
              />
            </div>
          </details>
        </div>

        {/* Filter Actions */}
        <div className="flex items-center space-x-2 pt-4 border-t border-gray-200">
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearAll}
            className="flex-1"
          >
            Clear All
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={onToggleVisibility}
            className="flex-1"
          >
            Apply Filters
          </Button>
        </div>

        {/* Quick Filter Chips */}
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="text-xs font-medium text-gray-500 mb-2">Quick Filters</div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleFilterChange('bloodType', 'O-')}
              className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors"
            >
              Universal Donor (O-)
            </button>
            <button
              onClick={() => {
                handleFilterChange('availableOnly', true);
                handleFilterChange('radius', '10');
              }}
              className="text-xs px-2 py-1 bg-success/10 text-success rounded-full hover:bg-success/20 transition-colors"
            >
              Available Nearby
            </button>
            <button
              onClick={() => handleFilterChange('urgency', 'critical')}
              className="text-xs px-2 py-1 bg-error/10 text-error rounded-full hover:bg-error/20 transition-colors"
            >
              Critical Only
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;