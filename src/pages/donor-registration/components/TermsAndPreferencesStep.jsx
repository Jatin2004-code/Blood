import React from 'react';
import { Checkbox, CheckboxGroup } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const TermsAndPreferencesStep = ({ formData, updateFormData, errors }) => {
  const notificationPreferences = [
    { 
      id: 'email_notifications', 
      label: 'Email Notifications', 
      description: 'Receive updates about donation opportunities and requests via email' 
    },
    { 
      id: 'sms_notifications', 
      label: 'SMS Notifications', 
      description: 'Get urgent blood request alerts via SMS' 
    },
    { 
      id: 'push_notifications', 
      label: 'Push Notifications', 
      description: 'Receive real-time notifications through the app' 
    },
    { 
      id: 'emergency_alerts', 
      label: 'Emergency Alerts', 
      description: 'Get notified about critical blood shortage situations' 
    }
  ];

  const privacySettings = [
    { 
      id: 'profile_visibility', 
      label: 'Make my profile visible to requesters', 
      description: 'Allow people in need to find and contact you directly' 
    },
    { 
      id: 'location_sharing', 
      label: 'Share my location for nearby requests', 
      description: 'Help match you with blood requests in your area' 
    },
    { 
      id: 'contact_sharing', 
      label: 'Allow verified requesters to contact me', 
      description: 'Let emergency requesters reach you through the platform' 
    },
    { 
      id: 'donation_history', 
      label: 'Show my donation history publicly', 
      description: 'Display your contribution count and badges on your profile' 
    }
  ];

  const availabilityOptions = [
    { value: 'always', label: 'Always Available' },
    { value: 'weekdays', label: 'Weekdays Only' },
    { value: 'weekends', label: 'Weekends Only' },
    { value: 'emergency_only', label: 'Emergency Cases Only' },
    { value: 'scheduled', label: 'Scheduled Appointments Only' }
  ];

  const handleCheckboxChange = (field, itemId, checked) => {
    const currentItems = formData?.[field] || [];
    const updatedItems = checked
      ? [...currentItems, itemId]
      : currentItems?.filter(id => id !== itemId);
    updateFormData({ [field]: updatedItems });
  };

  const handleInputChange = (field, value) => {
    updateFormData({ [field]: value });
  };

  return (
    <div className="bg-white rounded-lg shadow-card border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Terms & Preferences</h3>
        <p className="text-gray-600">Configure your privacy settings and notification preferences.</p>
      </div>
      <div className="space-y-8">
        {/* Availability Settings */}
        <div>
          <h4 className="text-lg font-medium text-gray-900 mb-4">Availability Preferences</h4>
          <Select
            label="When are you available to donate?"
            options={availabilityOptions}
            value={formData?.availability || ''}
            onChange={(value) => handleInputChange('availability', value)}
            error={errors?.availability}
            placeholder="Select your availability"
            description="This helps us match you with appropriate donation requests"
            required
            className="mb-4"
          />
        </div>

        {/* Notification Preferences */}
        <div className="border-t border-gray-200 pt-6">
          <CheckboxGroup 
            label="Notification Preferences" 
            error={errors?.notificationPreferences}
            className="mb-4"
          >
            <p className="text-sm text-gray-600 mb-4">
              Choose how you'd like to receive updates and alerts:
            </p>
            <div className="space-y-4">
              {notificationPreferences?.map((pref) => (
                <div key={pref?.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <Checkbox
                    label={pref?.label}
                    description={pref?.description}
                    checked={(formData?.notificationPreferences || [])?.includes(pref?.id)}
                    onChange={(e) => handleCheckboxChange('notificationPreferences', pref?.id, e?.target?.checked)}
                  />
                </div>
              ))}
            </div>
          </CheckboxGroup>
        </div>

        {/* Privacy Settings */}
        <div className="border-t border-gray-200 pt-6">
          <CheckboxGroup 
            label="Privacy Settings" 
            error={errors?.privacySettings}
            className="mb-4"
          >
            <p className="text-sm text-gray-600 mb-4">
              Control how your information is shared and displayed:
            </p>
            <div className="space-y-4">
              {privacySettings?.map((setting) => (
                <div key={setting?.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <Checkbox
                    label={setting?.label}
                    description={setting?.description}
                    checked={(formData?.privacySettings || [])?.includes(setting?.id)}
                    onChange={(e) => handleCheckboxChange('privacySettings', setting?.id, e?.target?.checked)}
                  />
                </div>
              ))}
            </div>
          </CheckboxGroup>
        </div>

        {/* Terms and Conditions */}
        <div className="border-t border-gray-200 pt-6">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Terms and Conditions</h4>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4 max-h-64 overflow-y-auto">
            <div className="text-sm text-gray-700 space-y-4">
              <h5 className="font-medium text-gray-900">BloodConnect Pro Terms of Service</h5>
              
              <div>
                <h6 className="font-medium mb-2">1. Eligibility and Medical Requirements</h6>
                <p>By registering as a donor, you confirm that you meet all medical eligibility criteria for blood donation as per Indian medical guidelines. You agree to provide accurate medical information and undergo health screening before each donation.</p>
              </div>

              <div>
                <h6 className="font-medium mb-2">2. Privacy and Data Protection</h6>
                <p>We are committed to protecting your personal and medical information. Your data will be used only for blood donation matching and emergency response purposes. We comply with applicable data protection laws and regulations.</p>
              </div>

              <div>
                <h6 className="font-medium mb-2">3. Voluntary Participation</h6>
                <p>Blood donation through our platform is entirely voluntary. You have the right to decline any donation request without providing reasons. No monetary compensation is provided for blood donations.</p>
              </div>

              <div>
                <h6 className="font-medium mb-2">4. Emergency Response</h6>
                <p>By enabling emergency alerts, you consent to receive urgent notifications about critical blood requirements. Response to such alerts is voluntary but highly appreciated.</p>
              </div>

              <div>
                <h6 className="font-medium mb-2">5. Platform Responsibility</h6>
                <p>BloodConnect Pro serves as a connecting platform between donors and requesters. We do not provide medical services or guarantee the success of blood donation requests. All medical procedures must be conducted at certified medical facilities.</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <Checkbox
                label="I have read and agree to the Terms of Service"
                description="You must accept the terms to complete registration"
                checked={formData?.acceptTerms || false}
                onChange={(e) => handleInputChange('acceptTerms', e?.target?.checked)}
                error={errors?.acceptTerms}
                required
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <Checkbox
                label="I consent to the Privacy Policy"
                description="We will handle your personal data according to our privacy policy"
                checked={formData?.acceptPrivacy || false}
                onChange={(e) => handleInputChange('acceptPrivacy', e?.target?.checked)}
                error={errors?.acceptPrivacy}
                required
              />
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <Checkbox
                label="I confirm that all information provided is accurate"
                description="Providing false information may result in account suspension"
                checked={formData?.confirmAccuracy || false}
                onChange={(e) => handleInputChange('confirmAccuracy', e?.target?.checked)}
                error={errors?.confirmAccuracy}
                required
              />
            </div>
          </div>
        </div>

        {/* Final Disclaimer */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="AlertTriangle" size={20} className="text-yellow-600 mt-0.5" />
            <div>
              <h5 className="font-medium text-yellow-900 mb-2">Important Notice</h5>
              <p className="text-sm text-yellow-800">
                After completing registration, your account will be reviewed by our medical team. 
                You will receive an email notification once your account is approved and activated. 
                This process typically takes 24-48 hours. Thank you for your patience and willingness 
                to save lives through blood donation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndPreferencesStep;