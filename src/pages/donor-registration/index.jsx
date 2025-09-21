import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ProgressIndicator from './components/ProgressIndicator';
import PersonalInfoStep from './components/PersonalInfoStep';
import MedicalInfoStep from './components/MedicalInfoStep';
import ProfileUploadStep from './components/ProfileUploadStep';
import DocumentVerificationStep from './components/DocumentVerificationStep';
import TermsAndPreferencesStep from './components/TermsAndPreferencesStep';
import NavigationButtons from './components/NavigationButton';

const DonorRegistration = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [savedProgress, setSavedProgress] = useState(false);

  const totalSteps = 5;
  const steps = [
    { label: 'Personal Info', icon: 'User' },
    { label: 'Medical Info', icon: 'Heart' },
    { label: 'Profile Photo', icon: 'Camera' },
    { label: 'Documents', icon: 'FileText' },
    { label: 'Terms & Preferences', icon: 'Settings' }
  ];

  // Load saved progress from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('donorRegistrationProgress');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData?.formData || {});
        setCurrentStep(parsedData?.currentStep || 1);
        setSavedProgress(true);
      } catch (error) {
        console.error('Error loading saved progress:', error);
      }
    }
  }, []);

  // Save progress to localStorage
  const saveProgress = () => {
    const progressData = {
      formData,
      currentStep,
      timestamp: new Date()?.toISOString()
    };
    localStorage.setItem('donorRegistrationProgress', JSON.stringify(progressData));
    setSavedProgress(true);
    setTimeout(() => setSavedProgress(false), 2000);
  };

  const updateFormData = (newData) => {
    setFormData(prev => ({ ...prev, ...newData }));
    // Clear related errors when data is updated
    const updatedErrors = { ...errors };
    Object.keys(newData)?.forEach(key => {
      if (updatedErrors?.[key]) {
        delete updatedErrors?.[key];
      }
    });
    setErrors(updatedErrors);
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1: // Personal Info
        if (!formData?.fullName?.trim()) newErrors.fullName = 'Full name is required';
        if (!formData?.email?.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/?.test(formData?.email)) newErrors.email = 'Invalid email format';
        if (!formData?.phone?.trim()) newErrors.phone = 'Phone number is required';
        else if (!/^\+91\s\d{5}\s\d{5}$/?.test(formData?.phone)) newErrors.phone = 'Invalid phone format (+91 98765 43210)';
        if (!formData?.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
        if (!formData?.gender) newErrors.gender = 'Gender is required';
        if (!formData?.weight) newErrors.weight = 'Weight is required';
        else if (parseInt(formData?.weight) < 50) newErrors.weight = 'Minimum weight 50kg required';
        if (!formData?.address1?.trim()) newErrors.address1 = 'Address is required';
        if (!formData?.city?.trim()) newErrors.city = 'City is required';
        if (!formData?.state) newErrors.state = 'State is required';
        if (!formData?.pinCode?.trim()) newErrors.pinCode = 'PIN code is required';
        else if (!/^\d{6}$/?.test(formData?.pinCode)) newErrors.pinCode = 'Invalid PIN code';
        if (!formData?.emergencyContactName?.trim()) newErrors.emergencyContactName = 'Emergency contact name is required';
        if (!formData?.emergencyContactPhone?.trim()) newErrors.emergencyContactPhone = 'Emergency contact phone is required';
        break;

      case 2: // Medical Info
        if (!formData?.bloodGroup) newErrors.bloodGroup = 'Blood group is required';
        if (!formData?.lastDonationConfirm) newErrors.lastDonationConfirm = 'Please confirm last donation timeline';
        if (!formData?.recentProceduresConfirm) newErrors.recentProceduresConfirm = 'Please confirm recent procedures';
        if (!formData?.pregnancyConfirm) newErrors.pregnancyConfirm = 'Please confirm pregnancy/breastfeeding status';
        if (!formData?.travelConfirm) newErrors.travelConfirm = 'Please confirm travel history';
        break;

      case 3: // Profile Upload
        if (!formData?.profileImage) newErrors.profileImage = 'Profile photo is required';
        break;

      case 4: // Document Verification
        if (!formData?.documents?.aadhar) newErrors.documents = { ...newErrors?.documents, aadhar: 'Aadhar card is required' };
        if (!formData?.documents?.pan) newErrors.documents = { ...newErrors?.documents, pan: 'PAN card is required' };
        if (!formData?.aadharNumber?.trim()) newErrors.aadharNumber = 'Aadhar number is required';
        else if (!/^\d{4}\s\d{4}\s\d{4}$/?.test(formData?.aadharNumber)) newErrors.aadharNumber = 'Invalid Aadhar format';
        if (!formData?.panNumber?.trim()) newErrors.panNumber = 'PAN number is required';
        else if (!/^[A-Z]{5}\d{4}[A-Z]$/?.test(formData?.panNumber)) newErrors.panNumber = 'Invalid PAN format';
        break;

      case 5: // Terms & Preferences
        if (!formData?.availability) newErrors.availability = 'Please select your availability';
        if (!formData?.acceptTerms) newErrors.acceptTerms = 'You must accept the terms of service';
        if (!formData?.acceptPrivacy) newErrors.acceptPrivacy = 'You must accept the privacy policy';
        if (!formData?.confirmAccuracy) newErrors.confirmAccuracy = 'Please confirm information accuracy';
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
      saveProgress();
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Clear saved progress
      localStorage.removeItem('donorRegistrationProgress');
      
      // Navigate to success page or dashboard
      navigate('/user-dashboard', { 
        state: { 
          message: 'Registration completed successfully! Your account is pending verification.',
          type: 'success'
        }
      });
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    const stepProps = {
      formData,
      updateFormData,
      errors
    };

    switch (currentStep) {
      case 1:
        return <PersonalInfoStep {...stepProps} />;
      case 2:
        return <MedicalInfoStep {...stepProps} />;
      case 3:
        return <ProfileUploadStep {...stepProps} />;
      case 4:
        return <DocumentVerificationStep {...stepProps} />;
      case 5:
        return <TermsAndPreferencesStep {...stepProps} />;
      default:
        return null;
    }
  };

  const canProceed = () => {
    return validateStep(currentStep);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="relative">
              <Icon name="Heart" size={48} className="text-primary heartbeat" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-success rounded-full border-2 border-white flex items-center justify-center">
                <Icon name="Plus" size={12} className="text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Become a Blood Donor</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join our community of life-savers. Complete your registration to start helping those in need.
          </p>
        </div>

        {/* Saved Progress Indicator */}
        {savedProgress && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg"
          >
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={20} className="text-success" />
              <span className="text-sm text-green-800 font-medium">Progress saved successfully!</span>
            </div>
          </motion.div>
        )}

        {/* Progress Indicator */}
        <ProgressIndicator 
          currentStep={currentStep} 
          totalSteps={totalSteps} 
          steps={steps} 
        />

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="mb-6"
          >
            {renderStepContent()}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <NavigationButtons
          currentStep={currentStep}
          totalSteps={totalSteps}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          canProceed={canProceed()}
          saveProgress={saveProgress}
        />

        {/* Help Section */}
        <div className="mt-8 text-center">
          <div className="bg-white rounded-lg shadow-card border border-gray-200 p-6">
            <div className="flex items-center justify-center mb-4">
              <Icon name="HelpCircle" size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Need Help?</h3>
            <p className="text-gray-600 mb-4">
              If you have questions about the registration process or blood donation requirements, 
              our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <Button
                variant="outline"
                size="sm"
                iconName="Phone"
                iconPosition="left"
                onClick={() => window.open('tel:+911234567890')}
              >
                Call Support
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="Mail"
                iconPosition="left"
                onClick={() => window.open('mailto:support@bloodconnectpro.com')}
              >
                Email Us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorRegistration;