import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import MainNavigation from '../../components/ui/MainNavigation';
import EmergencyActionBar from '../../components/ui/EmergencyActionBar';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

// Import all components
import UrgencySelector from './components/UrgencySelector';
import PatientDetailsForm from './components/PatientDetailsForm';
import HospitalLocationForm from './components/HospitalLocationForm';
import ContactInformationForm from './components/ContactInformationForm';
import MedicalRequirementsForm from './components/MedicalRequirementsForm';
import RequestDescriptionForm from './components/RequestDescriptionForm';
import MatchingProgress from './components/MatchingProgress';

const EmergencyBloodRequest = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showMatching, setShowMatching] = useState(false);
  const [formData, setFormData] = useState({
    urgency: '',
    patientName: '',
    patientAge: '',
    patientGender: '',
    bloodGroup: '',
    unitsRequired: '',
    relationship: '',
    hospital: '',
    customHospitalName: '',
    hospitalAddress: '',
    city: '',
    state: '',
    pincode: '',
    landmark: '',
    latitude: '',
    longitude: '',
    contactName: '',
    contactRelationship: '',
    primaryPhone: '',
    alternatePhone: '',
    email: '',
    whatsappNumber: '',
    contactTimeFrom: '09:00',
    contactTimeTo: '21:00',
    preferredContactMethods: [],
    allowEmergencyContact: false,
    shareLocationWithDonors: false,
    componentType: '',
    timeline: '',
    hemoglobinLevel: '',
    plateletCount: '',
    medicalConditions: [],
    otherCondition: '',
    requiresCrossmatch: false,
    hasAllergies: false,
    isPregnant: false,
    hasInfectiousDiseases: false,
    allergyDetails: '',
    description: ''
  });
  const [errors, setErrors] = useState({});

  const steps = [
    { id: 1, title: 'Urgency Level', icon: 'Zap', component: UrgencySelector },
    { id: 2, title: 'Patient Details', icon: 'User', component: PatientDetailsForm },
    { id: 3, title: 'Hospital Location', icon: 'MapPin', component: HospitalLocationForm },
    { id: 4, title: 'Contact Info', icon: 'Phone', component: ContactInformationForm },
    { id: 5, title: 'Medical Requirements', icon: 'Stethoscope', component: MedicalRequirementsForm },
    { id: 6, title: 'Description', icon: 'FileText', component: RequestDescriptionForm }
  ];

  const mockUser = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user',
    bloodType: 'O+',
    available: true
  };

  const emergencyAlerts = [
    { id: 1, type: 'critical', message: 'Urgent O- blood needed' },
    { id: 2, type: 'urgent', message: 'AB+ required for surgery' }
  ];

  useEffect(() => {
    // Auto-save form data to localStorage
    localStorage.setItem('emergencyBloodRequest', JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    // Load saved form data on component mount
    const savedData = localStorage.getItem('emergencyBloodRequest');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData);
      } catch (error) {
        console.error('Error loading saved form data:', error);
      }
    }
  }, []);

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData?.urgency) {
          newErrors.urgency = 'Please select urgency level';
        }
        break;

      case 2:
        if (!formData?.patientName?.trim()) {
          newErrors.patientName = 'Patient name is required';
        }
        if (!formData?.patientAge || formData?.patientAge < 1 || formData?.patientAge > 120) {
          newErrors.patientAge = 'Valid patient age is required';
        }
        if (!formData?.patientGender) {
          newErrors.patientGender = 'Gender is required';
        }
        if (!formData?.bloodGroup) {
          newErrors.bloodGroup = 'Blood group is required';
        }
        if (!formData?.unitsRequired || formData?.unitsRequired < 1 || formData?.unitsRequired > 10) {
          newErrors.unitsRequired = 'Valid number of units is required (1-10)';
        }
        if (!formData?.relationship) {
          newErrors.relationship = 'Relationship to patient is required';
        }
        break;

      case 3:
        if (!formData?.hospital) {
          newErrors.hospital = 'Hospital selection is required';
        }
        if (formData?.hospital === 'other' && !formData?.customHospitalName?.trim()) {
          newErrors.customHospitalName = 'Hospital name is required';
        }
        if (!formData?.hospitalAddress?.trim()) {
          newErrors.hospitalAddress = 'Hospital address is required';
        }
        if (!formData?.city?.trim()) {
          newErrors.city = 'City is required';
        }
        if (!formData?.state) {
          newErrors.state = 'State is required';
        }
        if (!formData?.pincode || !/^\d{6}$/?.test(formData?.pincode)) {
          newErrors.pincode = 'Valid 6-digit PIN code is required';
        }
        break;

      case 4:
        if (!formData?.contactName?.trim()) {
          newErrors.contactName = 'Contact name is required';
        }
        if (!formData?.contactRelationship) {
          newErrors.contactRelationship = 'Relationship is required';
        }
        if (!formData?.primaryPhone || !/^\d{5}\s\d{5}$/?.test(formData?.primaryPhone)) {
          newErrors.primaryPhone = 'Valid 10-digit phone number is required';
        }
        if (!formData?.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
          newErrors.email = 'Valid email address is required';
        }
        if (!formData?.preferredContactMethods || formData?.preferredContactMethods?.length === 0) {
          newErrors.preferredContactMethods = 'Select at least one contact method';
        }
        break;

      case 5:
        if (!formData?.componentType) {
          newErrors.componentType = 'Blood component type is required';
        }
        if (!formData?.timeline) {
          newErrors.timeline = 'Timeline is required';
        }
        if (!formData?.medicalConditions || formData?.medicalConditions?.length === 0) {
          newErrors.medicalConditions = 'Select at least one medical condition';
        }
        if (formData?.medicalConditions?.includes('other') && !formData?.otherCondition?.trim()) {
          newErrors.otherCondition = 'Please specify the medical condition';
        }
        if (formData?.hasAllergies && !formData?.allergyDetails?.trim()) {
          newErrors.allergyDetails = 'Please provide allergy details';
        }
        break;

      case 6:
        if (!formData?.description?.trim()) {
          newErrors.description = 'Request description is required';
        } else if (formData?.description?.trim()?.length < 50) {
          newErrors.description = 'Description must be at least 50 characters';
        } else if (formData?.description?.trim()?.length > 1000) {
          newErrors.description = 'Description must not exceed 1000 characters';
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < steps?.length) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear saved form data
      localStorage.removeItem('emergencyBloodRequest');
      
      // Show matching progress
      setShowMatching(true);
    } catch (error) {
      console.error('Error submitting request:', error);
      alert('Failed to submit request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormChange = (newData) => {
    setFormData(newData);
    // Clear errors for changed fields
    const changedFields = Object.keys(newData)?.filter(key => newData?.[key] !== formData?.[key]);
    const newErrors = { ...errors };
    changedFields?.forEach(field => {
      delete newErrors?.[field];
    });
    setErrors(newErrors);
  };

  const handleMatchingComplete = () => {
    navigate('/user-dashboard');
  };

  const handleMatchingCancel = () => {
    setShowMatching(false);
  };

  const getCurrentStepComponent = () => {
    const step = steps?.find(s => s?.id === currentStep);
    if (!step) return null;

    const Component = step?.component;
    return (
      <Component
        formData={formData}
        onFormChange={handleFormChange}
        errors={errors}
      />
    );
  };

  const getProgressPercentage = () => {
    return ((currentStep - 1) / (steps?.length - 1)) * 100;
  };

  if (showMatching) {
    return (
      <>
        <Helmet>
          <title>Finding Donors - BloodConnect Pro</title>
          <meta name="description" content="AI-powered donor matching in progress" />
        </Helmet>

        <div className="min-h-screen bg-gray-50">
          <MainNavigation 
            user={mockUser} 
            emergencyAlerts={emergencyAlerts}
            onNavigate={(path) => navigate(path)}
          />
          <EmergencyActionBar 
            emergencyAlerts={emergencyAlerts}
            onEmergencyAction={(action) => console.log('Emergency action:', action)}
          />

          <div className="pt-20 pb-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <MatchingProgress
                requestData={formData}
                onComplete={handleMatchingComplete}
                onCancel={handleMatchingCancel}
              />
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Emergency Blood Request - BloodConnect Pro</title>
        <meta name="description" content="Submit urgent blood requirement with AI-powered donor matching" />
        <meta name="keywords" content="emergency blood request, urgent blood need, blood donation, donor matching" />
      </Helmet>
      <div className="min-h-screen bg-gray-50">
        <MainNavigation 
          user={mockUser} 
          emergencyAlerts={emergencyAlerts}
          onNavigate={(path) => navigate(path)}
        />
        <EmergencyActionBar 
          emergencyAlerts={emergencyAlerts}
          onEmergencyAction={(action) => console.log('Emergency action:', action)}
        />

        <div className="pt-20 pb-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Heart" size={32} className="text-primary heartbeat" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Emergency Blood Request
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Submit your urgent blood requirement and get matched with verified donors in your area
              </p>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-700">
                  Step {currentStep} of {steps?.length}
                </span>
                <span className="text-sm text-gray-500">
                  {Math.round(getProgressPercentage())}% Complete
                </span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${getProgressPercentage()}%` }}
                />
              </div>

              {/* Step Indicators */}
              <div className="flex justify-between mt-4">
                {steps?.map((step) => (
                  <div
                    key={step?.id}
                    className={`flex flex-col items-center space-y-2 ${
                      step?.id <= currentStep ? 'text-primary' : 'text-gray-400'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors duration-200 ${
                      step?.id < currentStep
                        ? 'bg-primary border-primary text-white'
                        : step?.id === currentStep
                        ? 'border-primary bg-primary/10' :'border-gray-300 bg-white'
                    }`}>
                      {step?.id < currentStep ? (
                        <Icon name="Check" size={16} />
                      ) : (
                        <Icon name={step?.icon} size={16} />
                      )}
                    </div>
                    <span className="text-xs font-medium hidden sm:block">
                      {step?.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Form Content */}
            <div className="bg-white rounded-xl shadow-card border border-gray-200 p-6 md:p-8">
              {getCurrentStepComponent()}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  iconName="ChevronLeft"
                  iconPosition="left"
                >
                  Previous
                </Button>

                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    onClick={() => navigate('/landing-page')}
                    iconName="X"
                    iconPosition="left"
                  >
                    Cancel
                  </Button>

                  <Button
                    variant="default"
                    onClick={handleNext}
                    loading={isSubmitting}
                    iconName={currentStep === steps?.length ? "Send" : "ChevronRight"}
                    iconPosition="right"
                  >
                    {currentStep === steps?.length 
                      ? (isSubmitting ? 'Submitting...' : 'Submit Request')
                      : 'Next'
                    }
                  </Button>
                </div>
              </div>
            </div>

            {/* Emergency Contact Info */}
            <div className="mt-8 bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Icon name="AlertTriangle" size={20} className="text-red-600 mt-0.5" />
                <div className="text-sm text-red-800">
                  <p className="font-medium mb-1">Emergency Contact:</p>
                  <p>
                    For life-threatening emergencies, call <strong>108</strong> (Ambulance) or <strong>102</strong> (Medical Emergency) immediately. 
                    This platform is for blood donor coordination and should not replace emergency medical services.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmergencyBloodRequest;