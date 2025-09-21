import React from 'react';
import Icon from '../../../components/AppIcon';

const KPICard = ({ title, value, change, changeType, icon, color = 'primary', trend = [] }) => {
  const getColorClasses = (colorName) => {
    const colors = {
      primary: 'text-primary bg-primary/10',
      success: 'text-success bg-success/10',
      warning: 'text-warning bg-warning/10',
      error: 'text-error bg-error/10',
      secondary: 'text-secondary bg-secondary/10'
    };
    return colors?.[colorName] || colors?.primary;
  };

  const getChangeColor = (type) => {
    return type === 'positive' ? 'text-success' : type === 'negative' ? 'text-error' : 'text-gray-500';
  };

  return (
    <div className="bg-white rounded-xl shadow-card border border-gray-200 p-6 hover:shadow-modal transition-shadow duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${getColorClasses(color)}`}>
          <Icon name={icon} size={24} />
        </div>
        {change && (
          <div className={`flex items-center space-x-1 ${getChangeColor(changeType)}`}>
            <Icon 
              name={changeType === 'positive' ? 'TrendingUp' : changeType === 'negative' ? 'TrendingDown' : 'Minus'} 
              size={16} 
            />
            <span className="text-sm font-medium">{change}</span>
          </div>
        )}
      </div>
      <div className="space-y-2">
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        <p className="text-sm text-gray-600">{title}</p>
      </div>
      {trend?.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-1 h-8">
            {trend?.map((point, index) => (
              <div
                key={index}
                className={`flex-1 rounded-sm ${getColorClasses(color)?.split(' ')?.[1]} opacity-60`}
                style={{ height: `${Math.max(4, (point / Math.max(...trend)) * 24)}px` }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default KPICard;