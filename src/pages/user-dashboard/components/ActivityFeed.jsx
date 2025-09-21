import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ActivityFeed = ({ activities = [] }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'donation':
        return 'Heart';
      case 'thank_you':
        return 'MessageCircle';
      case 'badge_earned':
        return 'Award';
      case 'milestone':
        return 'Trophy';
      case 'appointment':
        return 'Calendar';
      case 'community':
        return 'Users';
      default:
        return 'Bell';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'donation':
        return 'text-primary bg-primary/10';
      case 'thank_you':
        return 'text-success bg-success/10';
      case 'badge_earned':
        return 'text-warning bg-warning/10';
      case 'milestone':
        return 'text-secondary bg-secondary/10';
      case 'appointment':
        return 'text-gray-600 bg-gray-100';
      case 'community':
        return 'text-purple-600 bg-purple-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
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
        <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
        <div className="flex items-center space-x-2">
          <Icon name="Activity" size={20} className="text-gray-400" />
          <span className="text-sm text-gray-500">Last 7 days</span>
        </div>
      </div>
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {activities?.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Activity" size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No recent activity</h3>
            <p className="text-gray-500">Your donation activities will appear here</p>
          </div>
        ) : (
          activities?.map((activity, index) => (
            <motion.div
              key={activity?.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getActivityColor(activity?.type)}`}>
                <Icon name={getActivityIcon(activity?.type)} size={18} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity?.title}</p>
                    <p className="text-sm text-gray-500 mt-1">{activity?.description}</p>
                    
                    {activity?.metadata && (
                      <div className="mt-2">
                        {activity?.metadata?.bloodType && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mr-2">
                            {activity?.metadata?.bloodType}
                          </span>
                        )}
                        {activity?.metadata?.hospital && (
                          <span className="text-xs text-gray-500">
                            at {activity?.metadata?.hospital}
                          </span>
                        )}
                      </div>
                    )}

                    {activity?.thankYouMessage && (
                      <div className="mt-3 p-3 bg-success/5 border border-success/20 rounded-md">
                        <div className="flex items-start space-x-2">
                          <Icon name="Quote" size={14} className="text-success mt-0.5" />
                          <div>
                            <p className="text-sm text-gray-700 italic">"{activity?.thankYouMessage}"</p>
                            {activity?.sender && (
                              <div className="flex items-center space-x-2 mt-2">
                                <Image
                                  src={activity?.sender?.avatar}
                                  alt={activity?.sender?.name}
                                  className="w-6 h-6 rounded-full object-cover"
                                />
                                <span className="text-xs text-gray-500">- {activity?.sender?.name}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="text-xs text-gray-400 ml-4 flex-shrink-0">
                    {formatTimeAgo(activity?.timestamp)}
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
      {activities?.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <button className="w-full text-center text-sm text-primary hover:text-primary/80 font-medium">
            View All Activity
          </button>
        </div>
      )}
    </div>
  );
};

export default ActivityFeed;