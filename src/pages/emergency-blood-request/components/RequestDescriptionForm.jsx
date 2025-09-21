import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const RequestDescriptionForm = ({ formData, onFormChange, errors }) => {
  const [isListening, setIsListening] = useState(false);
  const [charCount, setCharCount] = useState(formData?.description?.length || 0);

  const maxChars = 1000;
  const minChars = 50;

  const quickTemplates = [
    {
      id: 'emergency-surgery',
      title: 'Emergency Surgery',
      template: `Urgent blood requirement for emergency surgery. Patient is currently in critical condition and requires immediate blood transfusion. Surgery is scheduled within the next few hours. Please contact immediately if you can help.`
    },
    {
      id: 'accident-trauma',
      title: 'Accident/Trauma',
      template: `Blood needed urgently due to accident/trauma. Patient has lost significant blood and requires immediate transfusion. Currently admitted in emergency ward. Any help would be greatly appreciated.`
    },
    {
      id: 'cancer-treatment',
      title: 'Cancer Treatment',
      template: `Blood required for cancer patient undergoing treatment. Regular transfusions are needed to maintain hemoglobin levels during chemotherapy. Patient is responding well to treatment and your donation can make a significant difference.`
    },
    {
      id: 'childbirth',
      title: 'Childbirth Complications',
      template: `Blood needed for childbirth complications. Mother requires blood transfusion due to excessive bleeding during delivery. Both mother and baby need your support during this critical time.`
    }
  ];

  const handleInputChange = (value) => {
    setCharCount(value?.length);
    onFormChange({
      ...formData,
      description: value
    });
  };

  const useTemplate = (template) => {
    handleInputChange(template);
  };

  const startVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Voice input is not supported in your browser. Please type your message.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    setIsListening(true);

    recognition.onstart = () => {
      console.log('Voice recognition started');
    };

    recognition.onresult = (event) => {
      const transcript = event?.results?.[0]?.[0]?.transcript;
      const currentText = formData?.description || '';
      const newText = currentText + (currentText ? ' ' : '') + transcript;
      handleInputChange(newText);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event?.error);
      setIsListening(false);
      alert('Voice input failed. Please try again or type your message.');
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition?.start();
  };

  const clearDescription = () => {
    handleInputChange('');
  };

  const getCharCountColor = () => {
    if (charCount < minChars) return 'text-error';
    if (charCount > maxChars * 0.9) return 'text-warning';
    return 'text-success';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon name="FileText" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-gray-900">Request Description</h3>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={startVoiceInput}
            loading={isListening}
            iconName="Mic"
            iconPosition="left"
          >
            {isListening ? 'Listening...' : 'Voice Input'}
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={clearDescription}
            iconName="Trash2"
            iconPosition="left"
          >
            Clear
          </Button>
        </div>
      </div>
      <div className="space-y-4">
        <div className="relative">
          <textarea
            placeholder="Describe your blood requirement situation. Include details about the patient's condition, urgency, and any specific needs. This helps donors understand the importance of your request."
            value={formData?.description || ''}
            onChange={(e) => handleInputChange(e?.target?.value)}
            className={`w-full h-32 px-4 py-3 border rounded-lg resize-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200 ${
              errors?.description ? 'border-error' : 'border-gray-300'
            }`}
            maxLength={maxChars}
          />
          
          <div className="absolute bottom-3 right-3 flex items-center space-x-2">
            <span className={`text-xs font-medium ${getCharCountColor()}`}>
              {charCount}/{maxChars}
            </span>
            {charCount < minChars && (
              <Icon name="AlertCircle" size={14} className="text-error" />
            )}
          </div>
        </div>

        {errors?.description && (
          <p className="text-sm text-error flex items-center space-x-1">
            <Icon name="AlertCircle" size={14} />
            <span>{errors?.description}</span>
          </p>
        )}

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">
            {charCount < minChars ? (
              <span className="text-error">
                Minimum {minChars} characters required ({minChars - charCount} more needed)
              </span>
            ) : (
              <span className="text-success">
                ✓ Description meets minimum requirements
              </span>
            )}
          </span>
          
          <div className="flex items-center space-x-4">
            <span className="text-gray-500">
              Estimated reading time: {Math.ceil(charCount / 200)} min
            </span>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Icon name="Zap" size={16} className="text-primary" />
          <h4 className="text-sm font-medium text-gray-900">Quick Templates</h4>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {quickTemplates?.map((template) => (
            <button
              key={template?.id}
              type="button"
              onClick={() => useTemplate(template?.template)}
              className="p-3 text-left border border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors duration-200"
            >
              <h5 className="text-sm font-medium text-gray-900 mb-1">
                {template?.title}
              </h5>
              <p className="text-xs text-gray-600 line-clamp-2">
                {template?.template?.substring(0, 100)}...
              </p>
            </button>
          ))}
        </div>
      </div>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Lightbulb" size={20} className="text-blue-600 mt-0.5" />
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">Writing Tips:</p>
            <ul className="space-y-1 text-xs">
              <li>• Be specific about the urgency and timeline</li>
              <li>• Mention the patient's current condition</li>
              <li>• Include any special requirements or considerations</li>
              <li>• Express gratitude and explain how donors can help</li>
              <li>• Keep the tone respectful and informative</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <Icon name="Shield" size={20} className="text-green-600" />
          <div className="text-sm text-green-800">
            <p className="font-medium mb-1">Privacy Notice:</p>
            <p>
              Your description will be shared with potential donors to help them understand your situation. 
              Avoid sharing sensitive personal information like ID numbers or financial details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestDescriptionForm;