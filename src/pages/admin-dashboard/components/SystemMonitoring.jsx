import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SystemMonitoring = ({ realTimeData = {} }) => {
  const [systemStats, setSystemStats] = useState({
    serverHealth: 98,
    responseTime: 245,
    activeUsers: 1247,
    errorRate: 0.02,
    uptime: 99.9,
    lastUpdated: new Date()
  });

  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'warning',
      message: 'High memory usage detected on server-02',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      resolved: false
    },
    {
      id: 2,
      type: 'info',
      message: 'Scheduled maintenance completed successfully',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      resolved: true
    },
    {
      id: 3,
      type: 'error',
      message: 'Failed to send 3 notification emails',
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      resolved: false
    }
  ]);

  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time updates
      setSystemStats(prev => ({
        ...prev,
        serverHealth: Math.max(95, Math.min(100, prev?.serverHealth + (Math.random() - 0.5) * 2)),
        responseTime: Math.max(200, Math.min(500, prev?.responseTime + (Math.random() - 0.5) * 50)),
        activeUsers: Math.max(1000, Math.min(2000, prev?.activeUsers + Math.floor((Math.random() - 0.5) * 100))),
        errorRate: Math.max(0, Math.min(1, prev?.errorRate + (Math.random() - 0.5) * 0.01)),
        lastUpdated: new Date()
      }));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSystemStats(prev => ({ ...prev, lastUpdated: new Date() }));
    setIsRefreshing(false);
  };

  const handleResolveAlert = (alertId) => {
    setAlerts(prev => prev?.map(alert => 
      alert?.id === alertId ? { ...alert, resolved: true } : alert
    ));
  };

  const getHealthColor = (health) => {
    if (health >= 95) return 'text-success';
    if (health >= 85) return 'text-warning';
    return 'text-error';
  };

  const getHealthBgColor = (health) => {
    if (health >= 95) return 'bg-success';
    if (health >= 85) return 'bg-warning';
    return 'bg-error';
  };

  const getAlertIcon = (type) => {
    const icons = {
      error: 'AlertCircle',
      warning: 'AlertTriangle',
      info: 'Info'
    };
    return icons?.[type] || 'Info';
  };

  const getAlertColor = (type) => {
    const colors = {
      error: 'text-error bg-error/10',
      warning: 'text-warning bg-warning/10',
      info: 'text-secondary bg-secondary/10'
    };
    return colors?.[type] || colors?.info;
  };

  const formatUptime = (uptime) => {
    return `${uptime?.toFixed(2)}%`;
  };

  const formatResponseTime = (time) => {
    return `${time}ms`;
  };

  const formatErrorRate = (rate) => {
    return `${(rate * 100)?.toFixed(2)}%`;
  };

  return (
    <div className="space-y-6">
      {/* System Health Overview */}
      <div className="bg-white rounded-xl shadow-card border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">System Health</h3>
              <p className="text-sm text-gray-600">
                Last updated: {systemStats?.lastUpdated?.toLocaleTimeString('en-IN')}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              loading={isRefreshing}
              iconName="RefreshCw"
            >
              Refresh
            </Button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Server Health */}
            <div className="text-center">
              <div className="relative w-20 h-20 mx-auto mb-3">
                <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#E5E7EB"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${systemStats?.serverHealth * 2.51} 251`}
                    className={getHealthColor(systemStats?.serverHealth)}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className={`text-lg font-bold ${getHealthColor(systemStats?.serverHealth)}`}>
                    {Math.round(systemStats?.serverHealth)}%
                  </span>
                </div>
              </div>
              <div className="text-sm font-medium text-gray-900">Server Health</div>
              <div className="text-xs text-gray-500">Overall system status</div>
            </div>

            {/* Response Time */}
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-3 flex items-center justify-center bg-secondary/10 rounded-full">
                <Icon name="Zap" size={32} className="text-secondary" />
              </div>
              <div className="text-lg font-bold text-gray-900">{formatResponseTime(systemStats?.responseTime)}</div>
              <div className="text-sm font-medium text-gray-600">Response Time</div>
              <div className="text-xs text-gray-500">Average API response</div>
            </div>

            {/* Active Users */}
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-3 flex items-center justify-center bg-primary/10 rounded-full">
                <Icon name="Users" size={32} className="text-primary" />
              </div>
              <div className="text-lg font-bold text-gray-900">{systemStats?.activeUsers?.toLocaleString('en-IN')}</div>
              <div className="text-sm font-medium text-gray-600">Active Users</div>
              <div className="text-xs text-gray-500">Currently online</div>
            </div>

            {/* Error Rate */}
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-3 flex items-center justify-center bg-error/10 rounded-full">
                <Icon name="AlertTriangle" size={32} className="text-error" />
              </div>
              <div className="text-lg font-bold text-gray-900">{formatErrorRate(systemStats?.errorRate)}</div>
              <div className="text-sm font-medium text-gray-600">Error Rate</div>
              <div className="text-xs text-gray-500">Last 24 hours</div>
            </div>
          </div>

          {/* Uptime Bar */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-900">System Uptime</span>
              <span className="text-sm font-bold text-success">{formatUptime(systemStats?.uptime)}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-success h-2 rounded-full transition-all duration-500"
                style={{ width: `${systemStats?.uptime}%` }}
              />
            </div>
            <div className="text-xs text-gray-500 mt-1">30-day average</div>
          </div>
        </div>
      </div>
      {/* System Alerts */}
      <div className="bg-white rounded-xl shadow-card border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">System Alerts</h3>
              <p className="text-sm text-gray-600">
                {alerts?.filter(alert => !alert?.resolved)?.length} active alerts
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              iconName="Settings"
            >
              Configure
            </Button>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {alerts?.map((alert) => (
            <div key={alert?.id} className={`p-6 ${alert?.resolved ? 'opacity-60' : ''}`}>
              <div className="flex items-start space-x-4">
                <div className={`p-2 rounded-lg ${getAlertColor(alert?.type)}`}>
                  <Icon name={getAlertIcon(alert?.type)} size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-gray-900">{alert?.message}</p>
                    {alert?.resolved && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success/10 text-success">
                        <Icon name="Check" size={12} className="mr-1" />
                        Resolved
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">
                    {alert?.timestamp?.toLocaleString('en-IN')}
                  </p>
                </div>
                {!alert?.resolved && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleResolveAlert(alert?.id)}
                    iconName="Check"
                  >
                    Resolve
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        {alerts?.length === 0 && (
          <div className="p-12 text-center">
            <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">All Systems Operational</h4>
            <p className="text-gray-600">No active alerts or issues detected.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SystemMonitoring;