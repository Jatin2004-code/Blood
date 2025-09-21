import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationCenter = ({ notifications = [] }) => {
  const [filter, setFilter] = useState('all');
  const [expandedNotification, setExpandedNotification] = useState(null);

  const filterOptions = [
    { value: 'all', label: 'All', count: notifications?.length },
    { value: 'unread', label: 'Unread', count: notifications?.filter(n => !n?.read)?.length },
    { value: 'urgent', label: 'Urgent', count: notifications?.filter(n => n?.priority === 'high')?.length },
    { value: 'requests', label: 'Requests', count: notifications?.filter(n => n?.type === 'request')?.length }
  ];

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'request':
        return 'Heart';
      case 'match':
        return 'Users';
      case 'appointment':
        return 'Calendar';
      case 'thank_you':
        return 'MessageCircle';
      case 'system':
        return 'Settings';
      case 'achievement':
        return 'Award';
      default:
        return 'Bell';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-error/10 border-error/20 text-error';
      case 'medium':
        return 'bg-warning/10 border-warning/20 text-warning';
      case 'low':
        return 'bg-success/10 border-success/20 text-success';
      default:
        return 'bg-gray-100 border-gray-200 text-gray-600';
    }
  };

  const filteredNotifications = notifications?.filter(notification => {
    switch (filter) {
      case 'unread':
        return !notification?.read;
      case 'urgent':
        return notification?.priority === 'high';
      case 'requests':
        return notification?.type === 'request';
      default:
        return true;
    }
  });

  const handleMarkAsRead = (notificationId) => {
    console.log('Mark as read:', notificationId);
  };

  const handleMarkAllAsRead = () => {
    console.log('Mark all as read');
  };

  const handleNotificationAction = (notification, action) => {
    console.log('Notification action:', notification?.id, action);
  };

  const toggleExpanded = (notificationId) => {
    setExpandedNotification(expandedNotification === notificationId ? null : notificationId);
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Notifications</h2>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleMarkAllAsRead}
            iconName="CheckCheck"
            iconPosition="left"
          >
            Mark All Read
          </Button>
        </div>
      </div>
      {/* Filter Tabs */}
      <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
        {filterOptions?.map((option) => (
          <button
            key={option?.value}
            onClick={() => setFilter(option?.value)}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
              filter === option?.value
                ? 'bg-white text-primary shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {option?.label}
            {option?.count > 0 && (
              <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                filter === option?.value
                  ? 'bg-primary/10 text-primary' :'bg-gray-200 text-gray-600'
              }`}>
                {option?.count}
              </span>
            )}
          </button>
        ))}
      </div>
      {/* Notifications List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredNotifications?.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Bell" size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
            <p className="text-gray-500">You're all caught up!</p>
          </div>
        ) : (
          <AnimatePresence>
            {filteredNotifications?.map((notification, index) => (
              <motion.div
                key={notification?.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
                className={`border rounded-lg p-4 transition-all duration-200 ${
                  notification?.read
                    ? 'border-gray-200 bg-white' :'border-primary/20 bg-primary/5'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    notification?.read ? 'bg-gray-100' : 'bg-primary/10'
                  }`}>
                    <Icon 
                      name={getNotificationIcon(notification?.type)} 
                      size={18} 
                      className={notification?.read ? 'text-gray-600' : 'text-primary'} 
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className={`text-sm font-medium ${
                            notification?.read ? 'text-gray-900' : 'text-gray-900'
                          }`}>
                            {notification?.title}
                          </h3>
                          {notification?.priority === 'high' && (
                            <span className="w-2 h-2 bg-error rounded-full"></span>
                          )}
                          {!notification?.read && (
                            <span className="w-2 h-2 bg-primary rounded-full"></span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{notification?.message}</p>
                        
                        {notification?.metadata && (
                          <div className="flex items-center space-x-4 text-xs text-gray-500 mb-2">
                            {notification?.metadata?.location && (
                              <div className="flex items-center space-x-1">
                                <Icon name="MapPin" size={12} />
                                <span>{notification?.metadata?.location}</span>
                              </div>
                            )}
                            {notification?.metadata?.bloodType && (
                              <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-full font-mono">
                                {notification?.metadata?.bloodType}
                              </span>
                            )}
                            {notification?.metadata?.urgency && (
                              <span className={`px-2 py-0.5 rounded-full ${getPriorityColor(notification?.metadata?.urgency)}`}>
                                {notification?.metadata?.urgency} priority
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-4">
                        <span className="text-xs text-gray-400">
                          {formatTimeAgo(notification?.timestamp)}
                        </span>
                        <button
                          onClick={() => toggleExpanded(notification?.id)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <Icon 
                            name="ChevronDown" 
                            size={16} 
                            className={`transition-transform duration-200 ${
                              expandedNotification === notification?.id ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    {/* Expanded Content */}
                    <AnimatePresence>
                      {expandedNotification === notification?.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="mt-3 pt-3 border-t border-gray-200"
                        >
                          {notification?.details && (
                            <p className="text-sm text-gray-700 mb-3">{notification?.details}</p>
                          )}
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              {notification?.actions?.map((action) => (
                                <Button
                                  key={action?.id}
                                  variant={action?.primary ? "default" : "outline"}
                                  size="sm"
                                  onClick={() => handleNotificationAction(notification, action)}
                                  iconName={action?.icon}
                                  iconPosition="left"
                                >
                                  {action?.label}
                                </Button>
                              ))}
                            </div>
                            
                            {!notification?.read && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleMarkAsRead(notification?.id)}
                                iconName="Check"
                                iconPosition="left"
                              >
                                Mark Read
                              </Button>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default NotificationCenter;