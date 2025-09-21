import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const MatchingProgress = ({ requestData, onComplete, onCancel }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [matchedDonors, setMatchedDonors] = useState([]);
  const [isMatching, setIsMatching] = useState(true);
  const [estimatedTime, setEstimatedTime] = useState(120);

  const matchingSteps = [
    {
      id: 'validating',
      title: 'Validating Request',
      description: 'Checking request details and requirements',
      icon: 'CheckCircle',
      duration: 3000
    },
    {
      id: 'searching',
      title: 'Searching Donors',
      description: 'Finding compatible donors in your area',
      icon: 'Search',
      duration: 5000
    },
    {
      id: 'matching',
      title: 'AI Matching',
      description: 'Ranking donors based on compatibility and proximity',
      icon: 'Zap',
      duration: 4000
    },
    {
      id: 'notifying',
      title: 'Sending Notifications',
      description: 'Alerting matched donors about your request',
      icon: 'Bell',
      duration: 3000
    },
    {
      id: 'complete',
      title: 'Matching Complete',
      description: 'Donors have been notified and responses are being collected',
      icon: 'CheckCircle2',
      duration: 1000
    }
  ];

  const mockDonors = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      bloodType: requestData?.bloodGroup,
      distance: '2.3 km',
      lastDonation: '3 months ago',
      rating: 4.9,
      responseTime: '< 15 min',
      availability: 'Available now',
      phone: '98765 43210',
      verified: true,
      donationCount: 12,
      matchScore: 98
    },
    {
      id: 2,
      name: 'Priya Sharma',
      bloodType: requestData?.bloodGroup,
      distance: '3.7 km',
      lastDonation: '2 months ago',
      rating: 4.8,
      responseTime: '< 30 min',
      availability: 'Available in 1 hour',
      phone: '87654 32109',
      verified: true,
      donationCount: 8,
      matchScore: 95
    },
    {
      id: 3,
      name: 'Amit Patel',
      bloodType: requestData?.bloodGroup,
      distance: '5.1 km',
      lastDonation: '4 months ago',
      rating: 4.7,
      responseTime: '< 45 min',
      availability: 'Available after 2 PM',
      phone: '76543 21098',
      verified: true,
      donationCount: 15,
      matchScore: 92
    },
    {
      id: 4,
      name: 'Sneha Gupta',
      bloodType: requestData?.bloodGroup,
      distance: '6.8 km',
      lastDonation: '1 month ago',
      rating: 4.9,
      responseTime: '< 1 hour',
      availability: 'Available tomorrow',
      phone: '65432 10987',
      verified: true,
      donationCount: 6,
      matchScore: 88
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setEstimatedTime(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (currentStep < matchingSteps?.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, matchingSteps?.[currentStep]?.duration);

      return () => clearTimeout(timer);
    } else {
      setIsMatching(false);
      setMatchedDonors(mockDonors);
    }
  }, [currentStep]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const handleContactDonor = (donor) => {
    window.open(`tel:${donor?.phone?.replace(/\s/g, '')}`);
  };

  const handleWhatsAppDonor = (donor) => {
    const message = encodeURIComponent(
      `Hi ${donor?.name}, I found your contact through BloodConnect Pro. I urgently need ${requestData?.bloodGroup} blood for ${requestData?.patientName}. Can you please help? Location: ${requestData?.hospitalAddress}`
    );
    window.open(`https://wa.me/91${donor?.phone?.replace(/\s/g, '')}?text=${message}`);
  };

  if (isMatching) {
    return (
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Zap" size={32} className="text-primary heartbeat" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Finding Compatible Donors
          </h2>
          <p className="text-gray-600">
            Our AI is matching you with the best donors in your area
          </p>
        </div>
        <div className="space-y-6">
          {matchingSteps?.map((step, index) => (
            <div
              key={step?.id}
              className={`flex items-center space-x-4 p-4 rounded-lg transition-all duration-500 ${
                index === currentStep
                  ? 'bg-primary/10 border-2 border-primary'
                  : index < currentStep
                  ? 'bg-green-50 border-2 border-green-200' :'bg-gray-50 border-2 border-gray-200'
              }`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                index === currentStep
                  ? 'bg-primary text-white'
                  : index < currentStep
                  ? 'bg-success text-white' :'bg-gray-300 text-gray-600'
              }`}>
                {index < currentStep ? (
                  <Icon name="Check" size={20} />
                ) : (
                  <Icon 
                    name={step?.icon} 
                    size={20} 
                    className={index === currentStep ? 'heartbeat' : ''}
                  />
                )}
              </div>
              
              <div className="flex-1">
                <h3 className={`font-semibold ${
                  index === currentStep ? 'text-primary' : 
                  index < currentStep ? 'text-success' : 'text-gray-600'
                }`}>
                  {step?.title}
                </h3>
                <p className="text-sm text-gray-600">{step?.description}</p>
              </div>

              {index === currentStep && (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm text-primary font-medium">Processing...</span>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon name="Clock" size={20} className="text-blue-600" />
              <div>
                <p className="text-sm font-medium text-blue-800">
                  Estimated completion time
                </p>
                <p className="text-xs text-blue-600">
                  Based on current system load
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-blue-600">
                {formatTime(estimatedTime)}
              </p>
              <p className="text-xs text-blue-600">remaining</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <Button
            variant="outline"
            onClick={onCancel}
            iconName="X"
            iconPosition="left"
          >
            Cancel Request
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="CheckCircle2" size={32} className="text-success" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Matching Complete!
        </h2>
        <p className="text-gray-600">
          Found {matchedDonors?.length} compatible donors in your area
        </p>
      </div>
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <Icon name="Bell" size={20} className="text-green-600" />
          <div className="text-sm text-green-800">
            <p className="font-medium">Notifications Sent Successfully</p>
            <p>All matched donors have been notified about your urgent request</p>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Matched Donors (Ranked by Compatibility)
        </h3>
        
        {matchedDonors?.map((donor, index) => (
          <div
            key={donor?.id}
            className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-semibold">
                    {donor?.name?.charAt(0)}
                  </div>
                  {donor?.verified && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-success rounded-full flex items-center justify-center">
                      <Icon name="Check" size={12} className="text-white" />
                    </div>
                  )}
                  <div className="absolute -top-1 -left-1 w-6 h-6 bg-warning text-white rounded-full flex items-center justify-center text-xs font-bold">
                    #{index + 1}
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-semibold text-gray-900">{donor?.name}</h4>
                    <span className="text-xs bg-primary text-white px-2 py-1 rounded-full font-medium">
                      {donor?.bloodType}
                    </span>
                    <span className="text-xs bg-success text-white px-2 py-1 rounded-full">
                      {donor?.matchScore}% match
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                    <span className="flex items-center space-x-1">
                      <Icon name="MapPin" size={14} />
                      <span>{donor?.distance}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Icon name="Clock" size={14} />
                      <span>{donor?.responseTime}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Icon name="Star" size={14} className="text-yellow-500" />
                      <span>{donor?.rating}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Icon name="Heart" size={14} className="text-red-500" />
                      <span>{donor?.donationCount} donations</span>
                    </span>
                  </div>
                  
                  <div className="mt-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      donor?.availability?.includes('now') 
                        ? 'bg-green-100 text-green-800'
                        : donor?.availability?.includes('hour')
                        ? 'bg-yellow-100 text-yellow-800' :'bg-gray-100 text-gray-800'
                    }`}>
                      {donor?.availability}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleWhatsAppDonor(donor)}
                  iconName="MessageCircle"
                  iconPosition="left"
                >
                  WhatsApp
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => handleContactDonor(donor)}
                  iconName="Phone"
                  iconPosition="left"
                >
                  Call Now
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center space-x-4">
        <Button
          variant="outline"
          onClick={() => window.location.href = '/user-dashboard'}
          iconName="LayoutDashboard"
          iconPosition="left"
        >
          Go to Dashboard
        </Button>
        <Button
          variant="default"
          onClick={onComplete}
          iconName="CheckCircle"
          iconPosition="left"
        >
          Track Request
        </Button>
      </div>
    </div>
  );
};

export default MatchingProgress;