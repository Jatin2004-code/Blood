import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const UserContextMenu = ({ user, onLogout, onProfileUpdate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const userMenuItems = [
    {
      label: 'Dashboard',
      path: '/user-dashboard',
      icon: 'LayoutDashboard',
      description: 'View your donation history'
    },
    {
      label: 'Profile',
      path: '/profile',
      icon: 'User',
      description: 'Manage your information'
    },
    {
      label: 'Donation History',
      path: '/donation-history',
      icon: 'History',
      description: 'Track your contributions'
    },
    {
      label: 'Notifications',
      path: '/notifications',
      icon: 'Bell',
      description: 'Manage alerts and updates'
    },
    {
      label: 'Settings',
      path: '/settings',
      icon: 'Settings',
      description: 'Privacy and preferences'
    }
  ];

  const adminMenuItems = [
    {
      label: 'Admin Dashboard',
      path: '/admin-dashboard',
      icon: 'Shield',
      description: 'Administrative overview'
    },
    {
      label: 'User Management',
      path: '/admin/users',
      icon: 'Users',
      description: 'Manage platform users'
    },
    {
      label: 'Blood Requests',
      path: '/admin/requests',
      icon: 'Heart',
      description: 'Monitor emergency requests'
    },
    {
      label: 'Analytics',
      path: '/admin/analytics',
      icon: 'BarChart3',
      description: 'Platform statistics'
    }
  ];

  const quickActions = [
    {
      label: 'Update Availability',
      action: () => handleQuickAction('availability'),
      icon: 'Calendar',
      color: 'text-success'
    },
    {
      label: 'Emergency Mode',
      action: () => handleQuickAction('emergency'),
      icon: 'Zap',
      color: 'text-error'
    }
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
    closeMenu();
  };

  const handleQuickAction = (actionType) => {
    switch (actionType) {
      case 'availability':
        // Toggle user availability status
        if (onProfileUpdate) {
          onProfileUpdate({ ...user, available: !user?.available });
        }
        break;
      case 'emergency': navigate('/emergency-blood-request');
        break;
      default:
        break;
    }
    closeMenu();
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    closeMenu();
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef?.current && !menuRef?.current?.contains(event?.target)) {
        closeMenu();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event?.key === 'Escape') {
        closeMenu();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      return () => document.removeEventListener('keydown', handleEscapeKey);
    }
  }, [isOpen]);

  if (!user) return null;

  const isAdmin = user?.role === 'admin';
  const menuItems = isAdmin ? [...userMenuItems, ...adminMenuItems] : userMenuItems;

  return (
    <div className="relative" ref={menuRef}>
      {/* User Avatar Button */}
      <button
        onClick={toggleMenu}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-primary hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="relative">
          <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-medium">
            {user?.avatar ? (
              <img 
                src={user?.avatar} 
                alt={user?.name} 
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <span className="text-sm">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </span>
            )}
          </div>
          {/* Availability Status Indicator */}
          {user?.available && (
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-success rounded-full border-2 border-white"></div>
          )}
        </div>
        <div className="hidden sm:block text-left">
          <div className="text-sm font-medium text-gray-900 max-w-24 truncate">
            {user?.name || 'User'}
          </div>
          <div className="text-xs text-gray-500 capitalize">
            {user?.role || 'donor'}
          </div>
        </div>
        <Icon 
          name="ChevronDown" 
          size={16} 
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-modal border border-gray-200 py-2 z-1010 animate-in slide-in-from-top-2 duration-200">
          {/* User Info Header */}
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-medium">
                  {user?.avatar ? (
                    <img 
                      src={user?.avatar} 
                      alt={user?.name} 
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-lg">
                      {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </span>
                  )}
                </div>
                {user?.available && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-white"></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-900 truncate">
                  {user?.name || 'User'}
                </div>
                <div className="text-sm text-gray-500 truncate">
                  {user?.email}
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs text-gray-500 capitalize">
                    {user?.role || 'donor'}
                  </span>
                  {user?.bloodType && (
                    <>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs font-mono text-primary font-medium">
                        {user?.bloodType}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="px-2 py-2 border-b border-gray-100">
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide px-2 mb-2">
              Quick Actions
            </div>
            <div className="grid grid-cols-2 gap-1">
              {quickActions?.map((action) => (
                <button
                  key={action?.label}
                  onClick={action?.action}
                  className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors duration-200"
                >
                  <Icon name={action?.icon} size={16} className={action?.color} />
                  <span className="text-xs">{action?.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            {menuItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                <Icon name={item?.icon} size={16} />
                <div className="flex-1">
                  <div className="font-medium">{item?.label}</div>
                  <div className="text-xs text-gray-500">{item?.description}</div>
                </div>
              </Link>
            ))}
          </div>

          {/* Logout */}
          <div className="border-t border-gray-100 pt-1">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              <Icon name="LogOut" size={16} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserContextMenu;