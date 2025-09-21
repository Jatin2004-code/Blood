import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const AdminSidebar = ({ isCollapsed = false, onToggleCollapse }) => {
  const [expandedSections, setExpandedSections] = useState(['dashboard']);
  const location = useLocation();

  const sidebarSections = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'LayoutDashboard',
      items: [
        {
          label: 'Overview',
          path: '/admin-dashboard',
          icon: 'Home',
          description: 'System overview and metrics'
        },
        {
          label: 'Analytics',
          path: '/admin-dashboard/analytics',
          icon: 'BarChart3',
          description: 'Detailed platform analytics'
        },
        {
          label: 'Reports',
          path: '/admin-dashboard/reports',
          icon: 'FileText',
          description: 'Generate system reports'
        }
      ]
    },
    {
      id: 'users',
      label: 'User Management',
      icon: 'Users',
      items: [
        {
          label: 'All Users',
          path: '/admin-dashboard/users',
          icon: 'Users',
          description: 'Manage platform users'
        },
        {
          label: 'Donors',
          path: '/admin-dashboard/donors',
          icon: 'Heart',
          description: 'Donor profiles and status'
        },
        {
          label: 'Administrators',
          path: '/admin-dashboard/admins',
          icon: 'Shield',
          description: 'Admin user management'
        },
        {
          label: 'Verification',
          path: '/admin-dashboard/verification',
          icon: 'CheckCircle',
          description: 'User verification queue'
        }
      ]
    },
    {
      id: 'requests',
      label: 'Blood Requests',
      icon: 'Heart',
      items: [
        {
          label: 'Active Requests',
          path: '/admin-dashboard/requests/active',
          icon: 'AlertCircle',
          description: 'Current emergency requests',
          badge: 'urgent'
        },
        {
          label: 'Request History',
          path: '/admin-dashboard/requests/history',
          icon: 'History',
          description: 'Completed and archived requests'
        },
        {
          label: 'Matching System',
          path: '/admin-dashboard/requests/matching',
          icon: 'GitBranch',
          description: 'AI matching configuration'
        }
      ]
    },
    {
      id: 'inventory',
      label: 'Blood Inventory',
      icon: 'Package',
      items: [
        {
          label: 'Stock Levels',
          path: '/admin-dashboard/inventory/stock',
          icon: 'BarChart2',
          description: 'Current blood type inventory'
        },
        {
          label: 'Donations',
          path: '/admin-dashboard/inventory/donations',
          icon: 'Plus',
          description: 'Track donation collections'
        },
        {
          label: 'Expiry Management',
          path: '/admin-dashboard/inventory/expiry',
          icon: 'Clock',
          description: 'Monitor expiration dates'
        }
      ]
    },
    {
      id: 'locations',
      label: 'Locations',
      icon: 'MapPin',
      items: [
        {
          label: 'Blood Banks',
          path: '/admin-dashboard/locations/banks',
          icon: 'Building',
          description: 'Manage blood bank locations'
        },
        {
          label: 'Hospitals',
          path: '/admin-dashboard/locations/hospitals',
          icon: 'Cross',
          description: 'Hospital network management'
        },
        {
          label: 'Mobile Units',
          path: '/admin-dashboard/locations/mobile',
          icon: 'Truck',
          description: 'Mobile collection units'
        }
      ]
    },
    {
      id: 'system',
      label: 'System',
      icon: 'Settings',
      items: [
        {
          label: 'Configuration',
          path: '/admin-dashboard/system/config',
          icon: 'Sliders',
          description: 'System settings and parameters'
        },
        {
          label: 'Notifications',
          path: '/admin-dashboard/system/notifications',
          icon: 'Bell',
          description: 'Notification templates and settings'
        },
        {
          label: 'Audit Logs',
          path: '/admin-dashboard/system/logs',
          icon: 'FileSearch',
          description: 'System activity and audit trails'
        },
        {
          label: 'Backup & Security',
          path: '/admin-dashboard/system/security',
          icon: 'Lock',
          description: 'Data backup and security settings'
        }
      ]
    }
  ];

  const isActiveRoute = (path) => {
    return location?.pathname === path || location?.pathname?.startsWith(path + '/');
  };

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => 
      prev?.includes(sectionId) 
        ? prev?.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const isSectionExpanded = (sectionId) => {
    return expandedSections?.includes(sectionId);
  };

  const hasActiveItem = (section) => {
    return section?.items?.some(item => isActiveRoute(item?.path));
  };

  return (
    <div className={`fixed left-0 top-16 bottom-0 bg-white border-r border-gray-200 shadow-card transition-all duration-300 z-1000 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <Icon name="Shield" size={20} className="text-secondary" />
            <span className="font-semibold text-gray-900">Admin Panel</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCollapse}
          className="hover:bg-gray-100"
        >
          <Icon name={isCollapsed ? "ChevronRight" : "ChevronLeft"} size={16} />
        </Button>
      </div>
      {/* Sidebar Content */}
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-2">
          {sidebarSections?.map((section) => (
            <div key={section?.id} className="space-y-1">
              {/* Section Header */}
              <button
                onClick={() => toggleSection(section?.id)}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                  hasActiveItem(section) || isSectionExpanded(section?.id)
                    ? 'text-secondary bg-secondary/10' :'text-gray-700 hover:text-secondary hover:bg-gray-50'
                }`}
                title={isCollapsed ? section?.label : ''}
              >
                <div className="flex items-center space-x-3">
                  <Icon name={section?.icon} size={18} />
                  {!isCollapsed && <span>{section?.label}</span>}
                </div>
                {!isCollapsed && (
                  <Icon 
                    name="ChevronDown" 
                    size={16} 
                    className={`transition-transform duration-200 ${
                      isSectionExpanded(section?.id) ? 'rotate-180' : ''
                    }`}
                  />
                )}
              </button>

              {/* Section Items */}
              {(!isCollapsed && isSectionExpanded(section?.id)) && (
                <div className="ml-4 space-y-1">
                  {section?.items?.map((item) => (
                    <Link
                      key={item?.path}
                      to={item?.path}
                      className={`flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors duration-200 ${
                        isActiveRoute(item?.path)
                          ? 'text-primary bg-primary/10 border-r-2 border-primary' :'text-gray-600 hover:text-primary hover:bg-gray-50'
                      }`}
                      title={item?.description}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon name={item?.icon} size={16} />
                        <span>{item?.label}</span>
                      </div>
                      {item?.badge && (
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          item?.badge === 'urgent' ?'bg-error text-white' :'bg-gray-100 text-gray-600'
                        }`}>
                          {item?.badge === 'urgent' ? '!' : item?.badge}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              )}

              {/* Collapsed Section Items (Tooltip) */}
              {isCollapsed && isSectionExpanded(section?.id) && (
                <div className="absolute left-16 top-0 w-64 bg-white border border-gray-200 rounded-md shadow-modal py-2 z-1010">
                  <div className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide border-b border-gray-100">
                    {section?.label}
                  </div>
                  {section?.items?.map((item) => (
                    <Link
                      key={item?.path}
                      to={item?.path}
                      className={`flex items-center justify-between px-3 py-2 text-sm transition-colors duration-200 ${
                        isActiveRoute(item?.path)
                          ? 'text-primary bg-primary/10' :'text-gray-600 hover:text-primary hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon name={item?.icon} size={16} />
                        <div>
                          <div className="font-medium">{item?.label}</div>
                          <div className="text-xs text-gray-500">{item?.description}</div>
                        </div>
                      </div>
                      {item?.badge && (
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          item?.badge === 'urgent' ?'bg-error text-white' :'bg-gray-100 text-gray-600'
                        }`}>
                          {item?.badge === 'urgent' ? '!' : item?.badge}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
      {/* Sidebar Footer */}
      <div className="border-t border-gray-200 p-4">
        {!isCollapsed ? (
          <div className="space-y-2">
            <div className="text-xs text-gray-500">
              System Status: <span className="text-success font-medium">Online</span>
            </div>
            <div className="text-xs text-gray-500">
              Last Updated: {new Date()?.toLocaleTimeString()}
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-2 h-2 bg-success rounded-full" title="System Online"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSidebar;