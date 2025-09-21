import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ currentStep, totalSteps, steps }) => {
  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="w-full bg-white rounded-lg shadow-card border border-gray-200 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Registration Progress</h2>
        <span className="text-sm text-gray-500">
          Step {currentStep} of {totalSteps}
        </span>
      </div>
      {/* Progress Bar */}
      <div className="relative mb-6">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className="absolute top-0 left-0 w-full h-2 flex justify-between">
          {steps?.map((_, index) => (
            <div
              key={index}
              className={`w-4 h-4 rounded-full border-2 -mt-1 transition-all duration-300 ${
                index + 1 <= currentStep
                  ? 'bg-primary border-primary' :'bg-white border-gray-300'
              }`}
            ></div>
          ))}
        </div>
      </div>
      {/* Step Labels */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
        {steps?.map((step, index) => (
          <div
            key={index}
            className={`text-center p-2 rounded-md transition-all duration-200 ${
              index + 1 === currentStep
                ? 'bg-primary/10 text-primary'
                : index + 1 < currentStep
                ? 'text-success' :'text-gray-500'
            }`}
          >
            <div className="flex items-center justify-center mb-1">
              <Icon 
                name={
                  index + 1 < currentStep ? 'CheckCircle' : 
                  index + 1 === currentStep ? step?.icon : 
                  'Circle'
                } 
                size={16} 
              />
            </div>
            <span className="text-xs font-medium">{step?.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;