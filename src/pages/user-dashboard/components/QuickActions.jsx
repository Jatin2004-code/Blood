import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = ({ user, onStatusUpdate }) => {
  const [isAvailable, setIsAvailable] = useState(user?.available || false);
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();

  const quickActionItems = [
    {
      id: 'schedule-donation',
      title: 'Schedule Donation',
      description: 'Book your next donation appointment',
      icon: 'Calendar',
      color: 'primary',
      action: () => navigate('/schedule-donation')
    },
    {
      id: 'emergency-request',
      title: 'Emergency Request',
      description: 'Submit urgent blood request',
      icon: 'AlertTriangle',
      color: 'error',
      action: () => navigate('/emergency-blood-request')
    },
    {
      id: 'find-donors',
      title: 'Find Donors',
      description: 'Search for nearby donors',
      icon: 'MapPin',
      color: 'secondary',
      action: () => navigate('/map-based-donor-search')
    },
    {
      id: 'update-profile',
      title: 'Update Profile',
      description: 'Manage your information',
      icon: 'User',
      color: 'success',
      action: () => navigate('/profile')
    }
  ];

  const handleAvailabilityToggle = async () => {
    setIsUpdating(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const newStatus = !isAvailable;
      setIsAvailable(newStatus);
      
      if (onStatusUpdate) {
        onStatusUpdate({ ...user, available: newStatus });
      }
    } catch (error) {
      console.error('Failed to update availability:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const getColorClasses = (color) => {
    const colorMap = {
      primary: 'bg-primary/10 text-primary hover:bg-primary/20 border-primary/20',
      secondary: 'bg-secondary/10 text-secondary hover:bg-secondary/20 border-secondary/20',
      success: 'bg-success/10 text-success hover:bg-success/20 border-success/20',
      error: 'bg-error/10 text-error hover:bg-error/20 border-error/20',
      warning: 'bg-warning/10 text-warning hover:bg-warning/20 border-warning/20'
    };
    return colorMap?.[color] || colorMap?.primary;
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
        <div className="flex items-center space-x-2">
          <Icon name="Zap" size={20} className="text-warning" />
          <span className="text-sm text-gray-500">Shortcuts</span>
        </div>
      </div>
      {/* Availability Toggle */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${isAvailable ? 'bg-success' : 'bg-gray-400'}`}></div>
            <div>
              <h3 className="text-sm font-medium text-gray-900">Donation Availability</h3>
              <p className="text-xs text-gray-500">
                {isAvailable ? 'Available for donations' : 'Currently unavailable'}
              </p>
            </div>
          </div>
          <Button
            variant={isAvailable ? "default" : "outline"}
            size="sm"
            loading={isUpdating}
            onClick={handleAvailabilityToggle}
            iconName={isAvailable ? "Check" : "X"}
            iconPosition="left"
          >
            {isAvailable ? 'Available' : 'Unavailable'}
          </Button>
        </div>
      </div>
      {/* Quick Action Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {quickActionItems?.map((item, index) => (
          <motion.button
            key={item?.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={item?.action}
            className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${getColorClasses(item?.color)}`}
          >
            <div className="flex items-start space-x-3">
              <div className={`w-10 h-10 rounded-lg bg-white/50 flex items-center justify-center`}>
                <Icon name={item?.icon} size={20} />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-sm mb-1">{item?.title}</h3>
                <p className="text-xs opacity-75">{item?.description}</p>
              </div>
              <Icon name="ChevronRight" size={16} className="opacity-50" />
            </div>
          </motion.button>
        ))}
      </div>
      {/* Emergency Contact */}
      <div className="mt-6 p-4 bg-error/5 border border-error/20 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center">
              <Icon name="Phone" size={20} className="text-error" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900">Emergency Hotline</h3>
              <p className="text-xs text-gray-500">24/7 blood emergency support</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open('tel:+911234567890')}
            iconName="Phone"
            iconPosition="left"
            className="border-error text-error hover:bg-error hover:text-white"
          >
            Call Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;