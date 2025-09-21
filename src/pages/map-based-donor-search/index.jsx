import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import MainNavigation from '../../components/ui/MainNavigation';
import EmergencyActionBar from '../../components/ui/EmergencyActionBar';
import MapContainer from './components/MapContainer';
import DonorSidePanel from './components/DonorSidePanel';
import SearchFilters from './components/SearchFilters';
import MobileBottomSheet from './components/MobileBottomSheet';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const MapBasedDonorSearch = () => {
  const navigate = useNavigate();
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 19.0760, lng: 72.8777 }); // Mumbai
  const [isSidePanelCollapsed, setIsSidePanelCollapsed] = useState(false);
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [isMobileSheetVisible, setIsMobileSheetVisible] = useState(false);
  const [currentUser] = useState(null); // Mock user state

  const [filters, setFilters] = useState({
    bloodType: 'all',
    radius: '25',
    availableOnly: false,
    urgency: 'any',
    lastDonation: '',
    minRating: 0,
    location: '',
    verifiedOnly: false,
    regularDonors: false,
    showEmergencyRequests: true,
    showHospitals: true
  });

  // Mock data for donors
  const mockDonors = [
    {
      id: 1,
      name: "Rajesh Kumar",
      bloodType: "O+",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      lat: 19.0760,
      lng: 72.8777,
      distance: "2.3",
      available: true,
      rating: 4.8,
      lastDonation: "2024-06-15",
      lastDonationAgo: "3 months ago",
      phone: "+91 98765 43210",
      verified: true,
      donationCount: 12,
      compatibility: ['high', 'high', 'medium']
    },
    {
      id: 2,
      name: "Priya Sharma",
      bloodType: "A+",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      lat: 19.0820,
      lng: 72.8820,
      distance: "4.1",
      available: true,
      rating: 4.9,
      lastDonation: "2024-07-20",
      lastDonationAgo: "2 months ago",
      phone: "+91 87654 32109",
      verified: true,
      donationCount: 8,
      compatibility: ['high', 'medium', 'high']
    },
    {
      id: 3,
      name: "Mohammed Ali",
      bloodType: "B-",
      avatar: "https://randomuser.me/api/portraits/men/56.jpg",
      lat: 19.0700,
      lng: 72.8700,
      distance: "1.8",
      available: false,
      rating: 4.6,
      lastDonation: "2024-08-10",
      lastDonationAgo: "1 month ago",
      phone: "+91 76543 21098",
      verified: true,
      donationCount: 15,
      compatibility: ['medium', 'high', 'high']
    },
    {
      id: 4,
      name: "Sneha Patel",
      bloodType: "AB+",
      avatar: "https://randomuser.me/api/portraits/women/28.jpg",
      lat: 19.0900,
      lng: 72.8900,
      distance: "6.2",
      available: true,
      rating: 4.7,
      lastDonation: "2024-05-30",
      lastDonationAgo: "4 months ago",
      phone: "+91 65432 10987",
      verified: false,
      donationCount: 5,
      compatibility: ['high', 'high', 'high']
    },
    {
      id: 5,
      name: "Vikram Singh",
      bloodType: "O-",
      avatar: "https://randomuser.me/api/portraits/men/72.jpg",
      lat: 19.0650,
      lng: 72.8650,
      distance: "3.7",
      available: true,
      rating: 5.0,
      lastDonation: "2024-08-25",
      lastDonationAgo: "3 weeks ago",
      phone: "+91 54321 09876",
      verified: true,
      donationCount: 20,
      compatibility: ['high', 'high', 'high']
    }
  ];

  // Mock emergency requests
  const mockEmergencyRequests = [
    {
      id: 1,
      bloodType: "O+",
      urgency: "critical",
      hospital: "KEM Hospital",
      lat: 19.0800,
      lng: 72.8800,
      timeAgo: "15 minutes ago",
      requester: "Dr. Amit Desai"
    },
    {
      id: 2,
      bloodType: "A-",
      urgency: "high",
      hospital: "Lilavati Hospital",
      lat: 19.0650,
      lng: 72.8650,
      timeAgo: "1 hour ago",
      requester: "Nurse Kavita"
    }
  ];

  // Mock hospitals
  const mockHospitals = [
    {
      id: 1,
      name: "KEM Hospital",
      address: "Parel, Mumbai",
      lat: 19.0800,
      lng: 72.8800,
      distance: "3.2",
      bloodBank: true
    },
    {
      id: 2,
      name: "Lilavati Hospital",
      address: "Bandra West, Mumbai",
      lat: 19.0650,
      lng: 72.8650,
      distance: "2.8",
      bloodBank: true
    },
    {
      id: 3,
      name: "Hinduja Hospital",
      address: "Mahim, Mumbai",
      lat: 19.0450,
      lng: 72.8450,
      distance: "4.5",
      bloodBank: false
    }
  ];

  // Filter donors based on current filters
  const filteredDonors = React.useMemo(() => {
    return mockDonors?.filter(donor => {
      if (filters?.bloodType !== 'all' && donor?.bloodType !== filters?.bloodType) return false;
      if (filters?.availableOnly && !donor?.available) return false;
      if (filters?.verifiedOnly && !donor?.verified) return false;
      if (filters?.regularDonors && donor?.donationCount < 3) return false;
      if (filters?.minRating > 0 && donor?.rating < filters?.minRating) return false;
      if (parseFloat(donor?.distance) > parseFloat(filters?.radius)) return false;
      
      return true;
    });
  }, [filters]);

  const handleDonorSelect = (donor) => {
    setSelectedDonor(donor);
  };

  const handleMapCenterChange = (newCenter) => {
    setMapCenter(newCenter);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setSelectedDonor(null);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleEmergencyAction = (actionId) => {
    console.log('Emergency action:', actionId);
  };

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 1024;
      if (isMobile) {
        setIsSidePanelCollapsed(true);
      } else {
        setIsMobileSheetVisible(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <MainNavigation
        user={currentUser}
        onNavigate={handleNavigation}
        emergencyAlerts={mockEmergencyRequests}
      />
      {/* Emergency Action Bar */}
      <EmergencyActionBar
        emergencyAlerts={mockEmergencyRequests}
        onEmergencyAction={handleEmergencyAction}
      />
      {/* Main Content */}
      <div className="pt-16 h-screen flex">
        {/* Desktop Side Panel */}
        <div className="hidden lg:block">
          <DonorSidePanel
            donors={filteredDonors}
            selectedDonor={selectedDonor}
            onDonorSelect={handleDonorSelect}
            isCollapsed={isSidePanelCollapsed}
            onToggleCollapse={() => setIsSidePanelCollapsed(!isSidePanelCollapsed)}
            filters={filters}
            onFiltersChange={handleFiltersChange}
          />
        </div>

        {/* Map Container */}
        <div className="flex-1 relative">
          <MapContainer
            donors={filteredDonors}
            emergencyRequests={mockEmergencyRequests}
            hospitals={mockHospitals}
            selectedDonor={selectedDonor}
            onDonorSelect={handleDonorSelect}
            mapCenter={mapCenter}
            onMapCenterChange={handleMapCenterChange}
            filters={filters}
            showEmergencyRequests={filters?.showEmergencyRequests}
            showHospitals={filters?.showHospitals}
            showDonors={true}
          />

          {/* Search Filters Overlay */}
          <SearchFilters
            filters={filters}
            onFiltersChange={handleFiltersChange}
            isVisible={isFiltersVisible}
            onToggleVisibility={() => setIsFiltersVisible(!isFiltersVisible)}
            onClearFilters={handleClearFilters}
          />

          {/* Mobile Toggle Button */}
          <div className="lg:hidden absolute bottom-20 right-4 z-1010">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsMobileSheetVisible(!isMobileSheetVisible)}
              className="bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg"
            >
              <Icon name="List" size={16} />
            </Button>
          </div>
        </div>
      </div>
      {/* Mobile Bottom Sheet */}
      <MobileBottomSheet
        donors={filteredDonors}
        selectedDonor={selectedDonor}
        onDonorSelect={handleDonorSelect}
        isVisible={isMobileSheetVisible}
        onToggleVisibility={() => setIsMobileSheetVisible(!isMobileSheetVisible)}
        filters={filters}
      />
      {/* Quick Stats Overlay */}
      <div className="hidden lg:block absolute bottom-4 left-4 z-1010">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-card border border-gray-200 p-3">
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="text-gray-600">
                {filteredDonors?.filter(d => d?.available)?.length} Available
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-error rounded-full emergency-pulse"></div>
              <span className="text-gray-600">
                {mockEmergencyRequests?.length} Emergency
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              <span className="text-gray-600">
                {mockHospitals?.length} Hospitals
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapBasedDonorSearch;