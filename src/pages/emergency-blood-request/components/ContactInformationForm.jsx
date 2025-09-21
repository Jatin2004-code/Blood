import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const ContactInformationForm = ({ formData, onFormChange, errors }) => {
  const relationshipOptions = [
    { value: 'patient', label: 'Patient' },
    { value: 'spouse', label: 'Spouse' },
    { value: 'parent', label: 'Parent' },
    { value: 'child', label: 'Child' },
    { value: 'sibling', label: 'Sibling' },
    { value: 'relative', label: 'Relative' },
    { value: 'friend', label: 'Friend' },
    { value: 'doctor', label: 'Doctor/Medical Staff' },
    { value: 'other', label: 'Other' }
  ];

  const preferredContactMethods = [
    { id: 'phone', label: 'Phone Call', icon: 'Phone' },
    { id: 'sms', label: 'SMS/Text', icon: 'MessageSquare' },
    { id: 'whatsapp', label: 'WhatsApp', icon: 'MessageCircle' },
    { id: 'email', label: 'Email', icon: 'Mail' }
  ];

  const handleInputChange = (field, value) => {
    onFormChange({
      ...formData,
      [field]: value
    });
  };

  const handleContactMethodChange = (methodId, checked) => {
    const currentMethods = formData?.preferredContactMethods || [];
    const updatedMethods = checked
      ? [...currentMethods, methodId]
      : currentMethods?.filter(method => method !== methodId);
    
    handleInputChange('preferredContactMethods', updatedMethods);
  };

  const formatPhoneNumber = (value) => {
    // Remove all non-digits
    const digits = value?.replace(/\D/g, '');
    
    // Format as +91 XXXXX XXXXX for Indian numbers
    if (digits?.length <= 10) {
      return digits?.replace(/(\d{5})(\d{5})/, '$1 $2');
    }
    return digits?.slice(0, 10)?.replace(/(\d{5})(\d{5})/, '$1 $2');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Icon name="Phone" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Primary Contact Name"
          type="text"
          placeholder="Enter contact person's name"
          value={formData?.contactName || ''}
          onChange={(e) => handleInputChange('contactName', e?.target?.value)}
          error={errors?.contactName}
          required
          className="col-span-1"
        />

        <Select
          label="Relationship to Patient"
          options={relationshipOptions}
          value={formData?.contactRelationship || ''}
          onChange={(value) => handleInputChange('contactRelationship', value)}
          error={errors?.contactRelationship}
          required
          placeholder="Select relationship"
          className="col-span-1"
        />

        <div className="col-span-1">
          <Input
            label="Primary Phone Number"
            type="tel"
            placeholder="Enter 10-digit mobile number"
            value={formData?.primaryPhone || ''}
            onChange={(e) => {
              const formatted = formatPhoneNumber(e?.target?.value);
              handleInputChange('primaryPhone', formatted);
            }}
            error={errors?.primaryPhone}
            required
            maxLength="11"
            description="Format: XXXXX XXXXX"
          />
        </div>

        <div className="col-span-1">
          <Input
            label="Alternate Phone Number"
            type="tel"
            placeholder="Enter alternate contact number"
            value={formData?.alternatePhone || ''}
            onChange={(e) => {
              const formatted = formatPhoneNumber(e?.target?.value);
              handleInputChange('alternatePhone', formatted);
            }}
            error={errors?.alternatePhone}
            maxLength="11"
            description="Optional backup contact"
          />
        </div>

        <Input
          label="Email Address"
          type="email"
          placeholder="Enter email for updates"
          value={formData?.email || ''}
          onChange={(e) => handleInputChange('email', e?.target?.value)}
          error={errors?.email}
          required
          className="md:col-span-2"
          description="You'll receive request updates and donor responses"
        />

        <Input
          label="WhatsApp Number"
          type="tel"
          placeholder="WhatsApp number (if different)"
          value={formData?.whatsappNumber || ''}
          onChange={(e) => {
            const formatted = formatPhoneNumber(e?.target?.value);
            handleInputChange('whatsappNumber', formatted);
          }}
          error={errors?.whatsappNumber}
          maxLength="11"
          className="col-span-1"
          description="Leave blank if same as primary phone"
        />

        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Best Time to Contact
          </label>
          <div className="grid grid-cols-2 gap-2">
            <Input
              label="From"
              type="time"
              value={formData?.contactTimeFrom || '09:00'}
              onChange={(e) => handleInputChange('contactTimeFrom', e?.target?.value)}
              className="text-sm"
            />
            <Input
              label="To"
              type="time"
              value={formData?.contactTimeTo || '21:00'}
              onChange={(e) => handleInputChange('contactTimeTo', e?.target?.value)}
              className="text-sm"
            />
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          Preferred Contact Methods <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {preferredContactMethods?.map((method) => (
            <div key={method?.id} className="flex items-center space-x-2">
              <Checkbox
                checked={(formData?.preferredContactMethods || [])?.includes(method?.id)}
                onChange={(e) => handleContactMethodChange(method?.id, e?.target?.checked)}
              />
              <div className="flex items-center space-x-2">
                <Icon name={method?.icon} size={16} className="text-gray-600" />
                <span className="text-sm text-gray-700">{method?.label}</span>
              </div>
            </div>
          ))}
        </div>
        {errors?.preferredContactMethods && (
          <p className="text-sm text-error">{errors?.preferredContactMethods}</p>
        )}
      </div>
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            checked={formData?.allowEmergencyContact || false}
            onChange={(e) => handleInputChange('allowEmergencyContact', e?.target?.checked)}
          />
          <label className="text-sm text-gray-700">
            Allow 24/7 emergency contact for critical situations
          </label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            checked={formData?.shareLocationWithDonors || false}
            onChange={(e) => handleInputChange('shareLocationWithDonors', e?.target?.checked)}
          />
          <label className="text-sm text-gray-700">
            Share precise location with matched donors
          </label>
        </div>
      </div>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Shield" size={20} className="text-blue-600 mt-0.5" />
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">Privacy & Security:</p>
            <p>
              Your contact information is only shared with verified donors who match your requirements. 
              We use secure channels and never share your data with third parties.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInformationForm;