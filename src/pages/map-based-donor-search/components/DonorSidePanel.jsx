import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const DonorSidePanel = ({ 
  donors = [], 
  selectedDonor, 
  onDonorSelect, 
  isCollapsed, 
  onToggleCollapse,
  filters,
  onFiltersChange 
}) => {
  const [sortBy, setSortBy] = useState('distance');

  const sortedDonors = React.useMemo(() => {
    return [...donors]?.sort((a, b) => {
      switch (sortBy) {
        case 'distance':
          return parseFloat(a?.distance) - parseFloat(b?.distance);
        case 'availability':
          return b?.available - a?.available;
        case 'lastDonation':
          return new Date(b.lastDonation) - new Date(a.lastDonation);
        case 'rating':
          return b?.rating - a?.rating;
        default:
          return 0;
      }
    });
  }, [donors, sortBy]);

  const handleContactDonor = (donor) => {
    // Handle contact action
    console.log('Contacting donor:', donor?.id);
  };

  const handleViewProfile = (donor) => {
    // Handle view profile action
    console.log('Viewing profile:', donor?.id);
  };

  if (isCollapsed) {
    return (
      <div className="w-12 bg-white border-r border-gray-200 shadow-card flex flex-col items-center py-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCollapse}
          className="mb-4"
        >
          <Icon name="ChevronRight" size={16} />
        </Button>
        <div className="text-xs text-gray-500 transform -rotate-90 whitespace-nowrap">
          {donors?.length} donors
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 bg-white border-r border-gray-200 shadow-card flex flex-col h-full">
      {/* Panel Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-gray-900">
            Nearby Donors
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleCollapse}
          >
            <Icon name="ChevronLeft" size={16} />
          </Button>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>{donors?.length} donors found</span>
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={14} />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e?.target?.value)}
              className="text-xs border border-gray-200 rounded px-2 py-1"
            >
              <option value="distance">Distance</option>
              <option value="availability">Availability</option>
              <option value="lastDonation">Last Donation</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>
      </div>
      {/* Donors List */}
      <div className="flex-1 overflow-y-auto">
        {sortedDonors?.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <Icon name="MapPin" size={48} className="text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No donors found</h3>
            <p className="text-sm text-gray-500 mb-4">
              Try adjusting your filters or expanding the search radius
            </p>
            <Button variant="outline" size="sm">
              Expand Search
            </Button>
          </div>
        ) : (
          <div className="p-2 space-y-2">
            {sortedDonors?.map((donor) => (
              <div
                key={donor?.id}
                className={`p-3 rounded-lg border transition-all duration-200 cursor-pointer ${
                  selectedDonor?.id === donor?.id
                    ? 'border-primary bg-primary/5 shadow-md'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                }`}
                onClick={() => onDonorSelect(donor)}
              >
                <div className="flex items-start space-x-3">
                  {/* Donor Avatar */}
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100">
                      <Image
                        src={donor?.avatar}
                        alt={donor?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Availability Indicator */}
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                      donor?.available ? 'bg-success' : 'bg-gray-400'
                    }`}></div>
                  </div>

                  {/* Donor Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {donor?.name}
                      </h3>
                      <span className="text-lg font-mono text-primary font-bold">
                        {donor?.bloodType}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="MapPin" size={12} className="text-gray-400" />
                      <span className="text-xs text-gray-500">
                        {donor?.distance}km away
                      </span>
                      <span className="text-xs text-gray-400">•</span>
                      <div className="flex items-center space-x-1">
                        <Icon name="Star" size={12} className="text-yellow-400 fill-current" />
                        <span className="text-xs text-gray-500">{donor?.rating}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <Icon name="Clock" size={12} className="text-gray-400" />
                        <span className="text-xs text-gray-500">
                          Last donated {donor?.lastDonationAgo}
                        </span>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        donor?.available 
                          ? 'bg-success/10 text-success' :'bg-gray-100 text-gray-500'
                      }`}>
                        {donor?.available ? 'Available' : 'Unavailable'}
                      </span>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex items-center space-x-2 mt-3">
                      <Button
                        variant="outline"
                        size="xs"
                        onClick={(e) => {
                          e?.stopPropagation();
                          handleContactDonor(donor);
                        }}
                        disabled={!donor?.available}
                        className="flex-1"
                      >
                        <Icon name="Phone" size={12} className="mr-1" />
                        Contact
                      </Button>
                      <Button
                        variant="ghost"
                        size="xs"
                        onClick={(e) => {
                          e?.stopPropagation();
                          handleViewProfile(donor);
                        }}
                        className="flex-1"
                      >
                        <Icon name="User" size={12} className="mr-1" />
                        Profile
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Compatibility Indicators */}
                {donor?.compatibility && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">Compatibility</span>
                      <div className="flex items-center space-x-1">
                        {donor?.compatibility?.map((indicator, index) => (
                          <div
                            key={index}
                            className={`w-2 h-2 rounded-full ${
                              indicator === 'high' ? 'bg-success' :
                              indicator === 'medium' ? 'bg-warning' : 'bg-gray-300'
                            }`}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Panel Footer */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <Button
          variant="default"
          fullWidth
          iconName="Plus"
          iconPosition="left"
        >
          Request Blood Donation
        </Button>
      </div>
    </div>
  );
};

export default DonorSidePanel;