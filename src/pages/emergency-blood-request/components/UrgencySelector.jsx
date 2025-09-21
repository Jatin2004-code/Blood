import React from 'react';
import Icon from '../../../components/AppIcon';

const UrgencySelector = ({ selectedUrgency, onUrgencyChange }) => {
  const urgencyLevels = [
    {
      id: 'critical',
      label: 'Critical',
      description: 'Life-threatening emergency - immediate response required',
      icon: 'AlertTriangle',
      color: 'bg-error text-white',
      borderColor: 'border-error',
      bgLight: 'bg-error/10',
      textColor: 'text-error',
      priority: 1,
      responseTime: '< 15 minutes'
    },
    {
      id: 'urgent',
      label: 'Urgent',
      description: 'Surgery or treatment within 24 hours',
      icon: 'Clock',
      color: 'bg-warning text-white',
      borderColor: 'border-warning',
      bgLight: 'bg-warning/10',
      textColor: 'text-warning',
      priority: 2,
      responseTime: '< 2 hours'
    },
    {
      id: 'routine',
      label: 'Routine',
      description: 'Planned procedure or non-emergency requirement',
      icon: 'Calendar',
      color: 'bg-accent text-white',
      borderColor: 'border-accent',
      bgLight: 'bg-accent/10',
      textColor: 'text-accent',
      priority: 3,
      responseTime: '< 24 hours'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Icon name="Zap" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-gray-900">Urgency Level</h3>
        <span className="text-sm text-gray-500">*Required</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {urgencyLevels?.map((level) => (
          <button
            key={level?.id}
            type="button"
            onClick={() => onUrgencyChange(level?.id)}
            className={`relative p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
              selectedUrgency === level?.id
                ? `${level?.borderColor} ${level?.bgLight} shadow-lg`
                : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
            }`}
          >
            <div className="flex flex-col items-center space-y-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                selectedUrgency === level?.id ? level?.color : 'bg-gray-100'
              }`}>
                <Icon 
                  name={level?.icon} 
                  size={24} 
                  className={selectedUrgency === level?.id ? 'text-white' : 'text-gray-600'}
                />
              </div>
              
              <div className="text-center">
                <h4 className={`font-semibold ${
                  selectedUrgency === level?.id ? level?.textColor : 'text-gray-900'
                }`}>
                  {level?.label}
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  {level?.description}
                </p>
                <div className="mt-2 text-xs font-medium text-gray-500">
                  Response: {level?.responseTime}
                </div>
              </div>
              
              {selectedUrgency === level?.id && (
                <div className="absolute -top-2 -right-2">
                  <div className={`w-6 h-6 rounded-full ${level?.color} flex items-center justify-center`}>
                    <Icon name="Check" size={14} className="text-white" />
                  </div>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
      {selectedUrgency && (
        <div className={`p-4 rounded-lg ${urgencyLevels?.find(l => l?.id === selectedUrgency)?.bgLight}`}>
          <div className="flex items-center space-x-2">
            <Icon name="Info" size={16} className={urgencyLevels?.find(l => l?.id === selectedUrgency)?.textColor} />
            <span className="text-sm font-medium text-gray-700">
              {selectedUrgency === 'critical' && 'Emergency broadcast will be sent to all nearby donors immediately'}
              {selectedUrgency === 'urgent' && 'Priority matching will be activated for faster response'}
              {selectedUrgency === 'routine' && 'Standard matching process will be used'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default UrgencySelector;