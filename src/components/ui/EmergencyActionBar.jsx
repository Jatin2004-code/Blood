import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const EmergencyActionBar = ({ emergencyAlerts = [], onEmergencyAction }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const emergencyActions = [
    {
      id: 'request-blood',
      label: 'Request Blood',
      path: '/emergency-blood-request',
      icon: 'Heart',
      color: 'bg-primary hover:bg-primary/90',
      description: 'Submit urgent blood request'
    },
    {
      id: 'find-donors',
      label: 'Find Donors',
      path: '/map-based-donor-search',
      icon: 'MapPin',
      color: 'bg-secondary hover:bg-secondary/90',
      description: 'Locate nearby donors'
    },
    {
      id: 'call-emergency',
      label: 'Call 911',
      action: () => window.open('tel:911'),
      icon: 'Phone',
      color: 'bg-error hover:bg-error/90',
      description: 'Emergency services'
    }
  ];

  const handleEmergencyAction = (action) => {
    if (action?.path) {
      navigate(action?.path);
    } else if (action?.action) {
      action?.action();
    }
    
    if (onEmergencyAction) {
      onEmergencyAction(action?.id);
    }
    
    setIsExpanded(false);
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      {/* Desktop Emergency Actions - Integrated in Main Navigation */}
      <div className="hidden lg:flex items-center space-x-2">
        {emergencyActions?.slice(0, 2)?.map((action) => (
          <Button
            key={action?.id}
            variant="default"
            size="sm"
            onClick={() => handleEmergencyAction(action)}
            className={`${action?.color} text-white border-0 emergency-pulse`}
            iconName={action?.icon}
            iconPosition="left"
          >
            {action?.label}
            {action?.id === 'request-blood' && emergencyAlerts?.length > 0 && (
              <span className="ml-2 bg-white text-primary text-xs rounded-full px-2 py-0.5 font-medium">
                {emergencyAlerts?.length}
              </span>
            )}
          </Button>
        ))}
      </div>
      {/* Mobile Floating Action Button */}
      <div className="lg:hidden fixed bottom-6 right-6 z-1020">
        <div className="relative">
          {/* Expanded Actions */}
          {isExpanded && (
            <div className="absolute bottom-16 right-0 space-y-3 mb-2">
              {emergencyActions?.map((action, index) => (
                <div
                  key={action?.id}
                  className="flex items-center space-x-3 animate-in slide-in-from-bottom-2 duration-200"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="bg-white text-gray-700 text-sm px-3 py-2 rounded-lg shadow-modal border whitespace-nowrap">
                    {action?.description}
                  </span>
                  <button
                    onClick={() => handleEmergencyAction(action)}
                    className={`w-12 h-12 rounded-full ${action?.color} text-white shadow-modal flex items-center justify-center transition-transform duration-200 hover:scale-110`}
                  >
                    <Icon name={action?.icon} size={20} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Main FAB */}
          <button
            onClick={toggleExpanded}
            className="w-14 h-14 bg-primary hover:bg-primary/90 text-white rounded-full shadow-modal flex items-center justify-center transition-all duration-300 emergency-pulse"
            aria-label="Emergency Actions"
          >
            <Icon 
              name={isExpanded ? "X" : "Zap"} 
              size={24} 
              className={`transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}
            />
            {emergencyAlerts?.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-error text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-medium">
                {emergencyAlerts?.length}
              </span>
            )}
          </button>
        </div>

        {/* Backdrop */}
        {isExpanded && (
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
            onClick={() => setIsExpanded(false)}
          />
        )}
      </div>
      {/* Emergency Alert Banner */}
      {emergencyAlerts?.length > 0 && (
        <div className="fixed top-16 left-0 right-0 z-1010 bg-error text-white px-4 py-2 shadow-modal">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="AlertTriangle" size={20} className="heartbeat" />
              <span className="text-sm font-medium">
                {emergencyAlerts?.length} urgent blood request{emergencyAlerts?.length > 1 ? 's' : ''} in your area
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/emergency-blood-request')}
              className="text-white hover:bg-white/20 border-white/30"
            >
              View Requests
            </Button>
          </div>
        </div>
      )}
      {/* Pull-to-refresh indicator for mobile */}
      <div className="lg:hidden fixed top-20 left-1/2 transform -translate-x-1/2 z-1000 pointer-events-none">
        <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-card border border-gray-200 opacity-0 transition-opacity duration-200" id="pull-refresh-indicator">
          <div className="flex items-center space-x-2">
            <Icon name="RefreshCw" size={16} className="text-primary" />
            <span className="text-sm text-gray-700">Pull to refresh</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmergencyActionBar;