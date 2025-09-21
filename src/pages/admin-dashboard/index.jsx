import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import KPICard from './components/KPICard';
import VerificationQueue from './components/VerificationQueue';
import AnalyticsChart from './components/AnalyticsChart';
import UserManagementTable from './components/UserManagementTable';
import SystemMonitoring from './components/SystemMonitoring';
import EmergencyBroadcast from './components/EmergencyBroadcast';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [dashboardData, setDashboardData] = useState({
    kpis: {
      pendingVerifications: 23,
      activeUsers: 1247,
      successfulMatches: 89,
      systemHealth: 98
    },
    recentActivity: [],
    emergencyAlerts: 3
  });
  const [isLoading, setIsLoading] = useState(true);

  // Mock admin user - in real app, this would come from auth context
  const adminUser = {
    id: 1,
    name: "Dr. Admin Kumar",
    email: "admin@bloodconnect.com",
    role: "admin",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'verification', label: 'Verification Queue', icon: 'UserCheck' },
    { id: 'analytics', label: 'Analytics', icon: 'BarChart3' },
    { id: 'users', label: 'User Management', icon: 'Users' },
    { id: 'system', label: 'System Health', icon: 'Activity' },
    { id: 'broadcast', label: 'Emergency Broadcast', icon: 'Radio' }
  ];

  const kpiData = [
    {
      title: 'Pending Verifications',
      value: dashboardData?.kpis?.pendingVerifications,
      change: '+12%',
      changeType: 'positive',
      icon: 'UserCheck',
      color: 'warning',
      trend: [15, 18, 12, 23, 19, 25, 23]
    },
    {
      title: 'Active Users',
      value: dashboardData?.kpis?.activeUsers?.toLocaleString('en-IN'),
      change: '+8%',
      changeType: 'positive',
      icon: 'Users',
      color: 'primary',
      trend: [1100, 1150, 1200, 1180, 1220, 1240, 1247]
    },
    {
      title: 'Successful Matches',
      value: dashboardData?.kpis?.successfulMatches,
      change: '+15%',
      changeType: 'positive',
      icon: 'Heart',
      color: 'success',
      trend: [65, 72, 68, 78, 82, 85, 89]
    },
    {
      title: 'System Health',
      value: `${dashboardData?.kpis?.systemHealth}%`,
      change: '+2%',
      changeType: 'positive',
      icon: 'Activity',
      color: 'success',
      trend: [95, 96, 97, 98, 97, 98, 98]
    }
  ];

  useEffect(() => {
    // Simulate loading dashboard data
    const loadDashboardData = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In real app, fetch from API
      setDashboardData({
        kpis: {
          pendingVerifications: 23,
          activeUsers: 1247,
          successfulMatches: 89,
          systemHealth: 98
        },
        recentActivity: [
          {
            id: 1,
            type: 'verification',
            message: 'New donor verification request from Rajesh Kumar',
            timestamp: new Date(Date.now() - 15 * 60 * 1000)
          },
          {
            id: 2,
            type: 'emergency',
            message: 'Emergency blood request for O- in Mumbai',
            timestamp: new Date(Date.now() - 30 * 60 * 1000)
          },
          {
            id: 3,
            type: 'match',
            message: 'Successful donor match for patient ID #12345',
            timestamp: new Date(Date.now() - 45 * 60 * 1000)
          }
        ],
        emergencyAlerts: 3
      });
      
      setIsLoading(false);
    };

    loadDashboardData();
  }, []);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const handleNavigateToSection = (path) => {
    navigate(path);
  };

  const handleBroadcastSent = (broadcast) => {
    console.log('Broadcast sent:', broadcast);
    // Handle broadcast success (show notification, update stats, etc.)
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'verification':
        return <VerificationQueue />;
      case 'analytics':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AnalyticsChart 
                title="Daily Donations" 
                type="line" 
              />
              <AnalyticsChart 
                title="Blood Type Distribution" 
                type="pie" 
              />
            </div>
            <AnalyticsChart 
              title="Regional Donor Activity" 
              type="bar" 
            />
          </div>
        );
      case 'users':
        return <UserManagementTable />;
      case 'system':
        return <SystemMonitoring />;
      case 'broadcast':
        return <EmergencyBroadcast onSendBroadcast={handleBroadcastSent} />;
      default:
        return (
          <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {kpiData?.map((kpi, index) => (
                <KPICard key={index} {...kpi} />
              ))}
            </div>
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-card border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button
                  variant="outline"
                  onClick={() => setActiveTab('verification')}
                  iconName="UserCheck"
                  className="h-20 flex-col space-y-2"
                >
                  <span className="text-sm">Review Verifications</span>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setActiveTab('broadcast')}
                  iconName="Radio"
                  className="h-20 flex-col space-y-2"
                >
                  <span className="text-sm">Send Broadcast</span>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setActiveTab('users')}
                  iconName="Users"
                  className="h-20 flex-col space-y-2"
                >
                  <span className="text-sm">Manage Users</span>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setActiveTab('system')}
                  iconName="Activity"
                  className="h-20 flex-col space-y-2"
                >
                  <span className="text-sm">System Health</span>
                </Button>
              </div>
            </div>
            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-card border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                  <Button variant="ghost" size="sm" iconName="RefreshCw">
                    Refresh
                  </Button>
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                {dashboardData?.recentActivity?.map((activity) => (
                  <div key={activity?.id} className="p-6 flex items-center space-x-4">
                    <div className={`p-2 rounded-lg ${
                      activity?.type === 'emergency' ? 'bg-error/10 text-error' :
                      activity?.type === 'verification'? 'bg-warning/10 text-warning' : 'bg-success/10 text-success'
                    }`}>
                      <Icon 
                        name={
                          activity?.type === 'emergency' ? 'AlertTriangle' :
                          activity?.type === 'verification'? 'UserCheck' : 'Heart'
                        } 
                        size={20} 
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity?.message}</p>
                      <p className="text-xs text-gray-500">
                        {activity?.timestamp?.toLocaleString('en-IN')}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm" iconName="ExternalLink">
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-card border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={24} className="text-secondary" />
                <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
              </div>
              {dashboardData?.emergencyAlerts > 0 && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-error text-white emergency-pulse">
                  {dashboardData?.emergencyAlerts} Emergency Alerts
                </span>
              )}
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/landing-page')}
                iconName="Home"
              >
                Back to Site
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} />
                </div>
                <div className="hidden sm:block">
                  <div className="text-sm font-medium text-gray-900">{adminUser?.name}</div>
                  <div className="text-xs text-gray-500 capitalize">{adminUser?.role}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8 overflow-x-auto">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => handleTabChange(tab?.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-200 ${
                  activeTab === tab?.id
                    ? 'border-primary text-primary' :'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon name={tab?.icon} size={18} />
                <span>{tab?.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderTabContent()}
      </div>
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              © {new Date()?.getFullYear()} BloodConnect Pro. All rights reserved.
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>System Status: <span className="text-success font-medium">Operational</span></span>
              <span>•</span>
              <span>Last Updated: {new Date()?.toLocaleTimeString('en-IN')}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AdminDashboard;