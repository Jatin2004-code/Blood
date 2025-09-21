import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const MetricsCard = ({ title, value, subtitle, icon, color, trend, isLoading = false }) => {
  const colorClasses = {
    primary: 'bg-primary/10 text-primary border-primary/20',
    success: 'bg-success/10 text-success border-success/20',
    warning: 'bg-warning/10 text-warning border-warning/20',
    secondary: 'bg-secondary/10 text-secondary border-secondary/20'
  };

  const iconBgClasses = {
    primary: 'bg-primary/20',
    success: 'bg-success/20',
    warning: 'bg-warning/20',
    secondary: 'bg-secondary/20'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl border border-gray-200 p-6 shadow-card hover:shadow-modal transition-all duration-300"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-4">
            <div className={`w-12 h-12 rounded-lg ${iconBgClasses?.[color]} flex items-center justify-center`}>
              <Icon name={icon} size={24} className={colorClasses?.[color]?.split(' ')?.[1]} />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600">{title}</h3>
              {trend && (
                <div className="flex items-center space-x-1 mt-1">
                  <Icon 
                    name={trend?.direction === 'up' ? 'TrendingUp' : 'TrendingDown'} 
                    size={14} 
                    className={trend?.direction === 'up' ? 'text-success' : 'text-error'} 
                  />
                  <span className={`text-xs font-medium ${trend?.direction === 'up' ? 'text-success' : 'text-error'}`}>
                    {trend?.percentage}%
                  </span>
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            {isLoading ? (
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-20"></div>
                <div className="h-4 bg-gray-200 rounded w-32 mt-2"></div>
              </div>
            ) : (
              <>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="text-3xl font-bold text-gray-900"
                >
                  {value}
                </motion.div>
                <p className="text-sm text-gray-500">{subtitle}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MetricsCard;