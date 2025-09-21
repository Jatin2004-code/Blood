import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const MobileBottomSheet = ({ 
  donors = [], 
  selectedDonor, 
  onDonorSelect, 
  isVisible, 
  onToggleVisibility,
  filters 
}) => {
  const [sheetHeight, setSheetHeight] = useState('partial'); // partial, half, full
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const heightClasses = {
    partial: 'h-32',
    half: 'h-1/2',
    full: 'h-5/6'
  };

  const handleTouchStart = (e) => {
    setStartY(e?.touches?.[0]?.clientY);
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    setCurrentY(e?.touches?.[0]?.clientY);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    
    const deltaY = currentY - startY;
    const threshold = 50;

    if (deltaY > threshold) {
      // Swipe down
      if (sheetHeight === 'full') setSheetHeight('half');
      else if (sheetHeight === 'half') setSheetHeight('partial');
      else onToggleVisibility();
    } else if (deltaY < -threshold) {
      // Swipe up
      if (sheetHeight === 'partial') setSheetHeight('half');
      else if (sheetHeight === 'half') setSheetHeight('full');
    }

    setIsDragging(false);
    setStartY(0);
    setCurrentY(0);
  };

  if (!isVisible) {
    return (
      <div className="lg:hidden fixed bottom-6 left-1/2 transform -translate-x-1/2 z-1020">
        <Button
          variant="default"
          onClick={onToggleVisibility}
          className="bg-primary hover:bg-primary/90 text-white shadow-modal px-6 py-3 rounded-full"
        >
          <Icon name="Users" size={16} className="mr-2" />
          View {donors?.length} Donors
        </Button>
      </div>
    );
  }

  return (
    <div className="lg:hidden fixed inset-x-0 bottom-0 z-1020">
      {/* Backdrop */}
      {sheetHeight !== 'partial' && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm"
          onClick={() => setSheetHeight('partial')}
        />
      )}
      {/* Bottom Sheet */}
      <div
        className={`bg-white rounded-t-2xl shadow-modal border-t border-gray-200 transition-all duration-300 ${heightClasses?.[sheetHeight]}`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Handle */}
        <div className="flex justify-center py-3 border-b border-gray-100">
          <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
        </div>

        {/* Header */}
        <div className="px-4 py-3 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900">Nearby Donors</h3>
              <p className="text-sm text-gray-500">{donors?.length} donors found</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSheetHeight(sheetHeight === 'full' ? 'partial' : 'full')}
              >
                <Icon name={sheetHeight === 'full' ? 'Minimize2' : 'Maximize2'} size={16} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggleVisibility}
              >
                <Icon name="X" size={16} />
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {sheetHeight === 'partial' ? (
            // Compact view for partial height
            (<div className="p-4">
              <div className="flex space-x-3 overflow-x-auto pb-2">
                {donors?.slice(0, 5)?.map((donor) => (
                  <div
                    key={donor?.id}
                    className={`flex-shrink-0 w-20 text-center cursor-pointer ${
                      selectedDonor?.id === donor?.id ? 'opacity-100' : 'opacity-70'
                    }`}
                    onClick={() => onDonorSelect(donor)}
                  >
                    <div className="relative mb-2">
                      <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 mx-auto">
                        <Image
                          src={donor?.avatar}
                          alt={donor?.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                        donor?.available ? 'bg-success' : 'bg-gray-400'
                      }`}></div>
                    </div>
                    <div className="text-xs font-medium text-gray-900 truncate">
                      {donor?.name?.split(' ')?.[0]}
                    </div>
                    <div className="text-xs text-primary font-mono">
                      {donor?.bloodType}
                    </div>
                    <div className="text-xs text-gray-500">
                      {donor?.distance}km
                    </div>
                  </div>
                ))}
                {donors?.length > 5 && (
                  <div
                    className="flex-shrink-0 w-20 text-center cursor-pointer opacity-70"
                    onClick={() => setSheetHeight('half')}
                  >
                    <div className="w-16 h-16 rounded-full bg-gray-100 mx-auto flex items-center justify-center mb-2">
                      <Icon name="Plus" size={20} className="text-gray-400" />
                    </div>
                    <div className="text-xs text-gray-500">
                      +{donors?.length - 5} more
                    </div>
                  </div>
                )}
              </div>
            </div>)
          ) : (
            // Full list view for half/full height
            (<div className="p-4 space-y-3">
              {donors?.map((donor) => (
                <div
                  key={donor?.id}
                  className={`p-3 rounded-lg border transition-all duration-200 cursor-pointer ${
                    selectedDonor?.id === donor?.id
                      ? 'border-primary bg-primary/5 shadow-md'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => onDonorSelect(donor)}
                >
                  <div className="flex items-center space-x-3">
                    {/* Donor Avatar */}
                    <div className="relative flex-shrink-0">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100">
                        <Image
                          src={donor?.avatar}
                          alt={donor?.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                        donor?.available ? 'bg-success' : 'bg-gray-400'
                      }`}></div>
                    </div>

                    {/* Donor Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-sm font-medium text-gray-900 truncate">
                          {donor?.name}
                        </h4>
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
                        <span className="text-xs text-gray-500">
                          Last donated {donor?.lastDonationAgo}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          donor?.available 
                            ? 'bg-success/10 text-success' :'bg-gray-100 text-gray-500'
                        }`}>
                          {donor?.available ? 'Available' : 'Unavailable'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex items-center space-x-2 mt-3">
                    <Button
                      variant="outline"
                      size="xs"
                      onClick={(e) => {
                        e?.stopPropagation();
                        // Handle contact
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
                        // Handle view profile
                      }}
                      className="flex-1"
                    >
                      <Icon name="User" size={12} className="mr-1" />
                      Profile
                    </Button>
                  </div>
                </div>
              ))}
            </div>)
          )}
        </div>

        {/* Footer Actions */}
        {sheetHeight !== 'partial' && (
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
        )}
      </div>
    </div>
  );
};

export default MobileBottomSheet;