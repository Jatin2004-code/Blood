import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const NavigationButtons = ({ 
  currentStep, 
  totalSteps, 
  onPrevious, 
  onNext, 
  onSubmit, 
  isSubmitting, 
  canProceed = true,
  saveProgress 
}) => {
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  return (
    <div className="bg-white rounded-lg shadow-card border border-gray-200 p-6">
      <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
        {/* Previous Button */}
        <div className="flex items-center space-x-3">
          {!isFirstStep && (
            <Button
              variant="outline"
              onClick={onPrevious}
              disabled={isSubmitting}
              iconName="ChevronLeft"
              iconPosition="left"
              className="min-w-32"
            >
              Previous
            </Button>
          )}
          
          {/* Save Progress Button */}
          {saveProgress && (
            <Button
              variant="ghost"
              onClick={saveProgress}
              disabled={isSubmitting}
              iconName="Save"
              iconPosition="left"
              className="text-gray-600 hover:text-gray-800"
            >
              Save Progress
            </Button>
          )}
        </div>

        {/* Step Indicator */}
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <span>Step {currentStep} of {totalSteps}</span>
          <div className="flex space-x-1">
            {Array.from({ length: totalSteps }, (_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  index + 1 <= currentStep ? 'bg-primary' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Next/Submit Button */}
        <div className="flex items-center space-x-3">
          {isLastStep ? (
            <Button
              variant="default"
              onClick={onSubmit}
              disabled={!canProceed || isSubmitting}
              loading={isSubmitting}
              iconName="Check"
              iconPosition="left"
              className="min-w-40 bg-success hover:bg-success/90"
            >
              {isSubmitting ? 'Submitting...' : 'Complete Registration'}
            </Button>
          ) : (
            <Button
              variant="default"
              onClick={onNext}
              disabled={!canProceed || isSubmitting}
              iconName="ChevronRight"
              iconPosition="right"
              className="min-w-32"
            >
              Next
            </Button>
          )}
        </div>
      </div>

      {/* Progress Indicator */}
      {!canProceed && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="AlertCircle" size={16} className="text-yellow-600" />
            <span className="text-sm text-yellow-800">
              Please complete all required fields to continue
            </span>
          </div>
        </div>
      )}

      {/* Submission Status */}
      {isSubmitting && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="Loader2" size={16} className="text-blue-600 animate-spin" />
            <span className="text-sm text-blue-800">
              Processing your registration... Please don't close this page.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavigationButtons;