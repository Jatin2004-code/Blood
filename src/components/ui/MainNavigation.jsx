import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const MainNavigation = ({ user = null, onNavigate, emergencyAlerts = [] }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    {
      label: 'Home',
      path: '/landing-page',
      icon: 'Home',
      authRequired: false,
      roles: ['all']
    },
    {
      label: 'Find Donors',
      path: '/map-based-donor-search',
      icon: 'MapPin',
      authRequired: false,
      roles: ['all'],
      priority: true
    },
    {
      label: 'Request Blood',
      path: '/emergency-blood-request',
      icon: 'Heart',
      authRequired: false,
      roles: ['all'],
      priority: true,
      emergency: true
    },
    {
      label: 'Dashboard',
      path: '/user-dashboard',
      icon: 'LayoutDashboard',
      authRequired: true,
      roles: ['donor', 'user']
    },
    {
      label: 'Register',
      path: '/donor-registration',
      icon: 'UserPlus',
      authRequired: false,
      roles: ['anonymous'],
      hideWhenAuthenticated: true
    }
  ];

  const adminItems = [
    {
      label: 'Admin',
      path: '/admin-dashboard',
      icon: 'Shield',
      authRequired: true,
      roles: ['admin']
    }
  ];

  const isActiveRoute = (path) => {
    return location?.pathname === path;
  };

  const shouldShowItem = (item) => {
    if (item?.hideWhenAuthenticated && user) return false;
    if (item?.authRequired && !user) return false;
    if (item?.roles?.includes('all')) return true;
    if (!user && item?.roles?.includes('anonymous')) return true;
    if (user && item?.roles?.includes(user?.role)) return true;
    return false;
  };

  const handleNavigation = (path) => {
    setIsMobileMenuOpen(false);
    if (onNavigate) onNavigate(path);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isUserMenuOpen && !event?.target?.closest('.user-menu-container')) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isUserMenuOpen]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-1000 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link 
              to="/landing-page" 
              className="flex items-center space-x-2 text-primary font-bold text-xl"
              onClick={() => handleNavigation('/landing-page')}
            >
              <div className="relative">
                <Icon name="Heart" size={32} className="text-primary heartbeat" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full blood-drop"></div>
              </div>
              <span className="hidden sm:block">BloodConnect Pro</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems?.filter(shouldShowItem)?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  isActiveRoute(item?.path)
                    ? 'text-primary bg-primary/10 border-b-2 border-primary' :'text-gray-700 hover:text-primary hover:bg-gray-50'
                } ${item?.emergency ? 'emergency-pulse' : ''}`}
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.label}</span>
                {item?.emergency && emergencyAlerts?.length > 0 && (
                  <span className="ml-1 bg-error text-white text-xs rounded-full px-2 py-0.5">
                    {emergencyAlerts?.length}
                  </span>
                )}
              </Link>
            ))}

            {/* Admin Items */}
            {adminItems?.filter(shouldShowItem)?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  isActiveRoute(item?.path)
                    ? 'text-secondary bg-secondary/10 border-b-2 border-secondary' :'text-gray-700 hover:text-secondary hover:bg-gray-50'
                }`}
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.label}</span>
              </Link>
            ))}
          </div>

          {/* User Menu / Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="relative user-menu-container">
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center">
                    <Icon name="User" size={16} />
                  </div>
                  <span className="max-w-24 truncate">{user?.name || 'User'}</span>
                  <Icon name="ChevronDown" size={16} />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-modal border border-gray-200 py-1 z-1010">
                    <Link
                      to="/user-dashboard"
                      onClick={() => {
                        handleNavigation('/user-dashboard');
                        setIsUserMenuOpen(false);
                      }}
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <Icon name="LayoutDashboard" size={16} />
                      <span>Dashboard</span>
                    </Link>
                    <Link
                      to="/profile"
                      onClick={() => {
                        handleNavigation('/profile');
                        setIsUserMenuOpen(false);
                      }}
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <Icon name="Settings" size={16} />
                      <span>Settings</span>
                    </Link>
                    <hr className="my-1" />
                    <button
                      onClick={() => {
                        // Handle logout
                        setIsUserMenuOpen(false);
                      }}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <Icon name="LogOut" size={16} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleNavigation('/login')}
                >
                  Sign In
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => handleNavigation('/donor-registration')}
                >
                  Register
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors duration-200"
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-modal">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigationItems?.filter(shouldShowItem)?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                  isActiveRoute(item?.path)
                    ? 'text-primary bg-primary/10' :'text-gray-700 hover:text-primary hover:bg-gray-50'
                } ${item?.emergency ? 'emergency-pulse' : ''}`}
              >
                <Icon name={item?.icon} size={20} />
                <span>{item?.label}</span>
                {item?.emergency && emergencyAlerts?.length > 0 && (
                  <span className="ml-auto bg-error text-white text-xs rounded-full px-2 py-0.5">
                    {emergencyAlerts?.length}
                  </span>
                )}
              </Link>
            ))}

            {/* Admin Items */}
            {adminItems?.filter(shouldShowItem)?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                  isActiveRoute(item?.path)
                    ? 'text-secondary bg-secondary/10' :'text-gray-700 hover:text-secondary hover:bg-gray-50'
                }`}
              >
                <Icon name={item?.icon} size={20} />
                <span>{item?.label}</span>
              </Link>
            ))}

            {/* Mobile Auth Section */}
            <div className="pt-4 border-t border-gray-200">
              {user ? (
                <div className="space-y-1">
                  <div className="flex items-center space-x-3 px-3 py-2">
                    <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center">
                      <Icon name="User" size={16} />
                    </div>
                    <span className="text-sm font-medium text-gray-900">{user?.name || 'User'}</span>
                  </div>
                  <Link
                    to="/user-dashboard"
                    onClick={() => handleNavigation('/user-dashboard')}
                    className="flex items-center space-x-3 px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
                  >
                    <Icon name="LayoutDashboard" size={20} />
                    <span>Dashboard</span>
                  </Link>
                  <button
                    onClick={() => {
                      // Handle logout
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center space-x-3 w-full px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
                  >
                    <Icon name="LogOut" size={20} />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-2 px-3">
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={() => handleNavigation('/login')}
                  >
                    Sign In
                  </Button>
                  <Button
                    variant="default"
                    fullWidth
                    onClick={() => handleNavigation('/donor-registration')}
                  >
                    Register as Donor
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default MainNavigation;