import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const PersonalInfoStep = ({ formData, updateFormData, errors }) => {
  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' }
  ];

  const stateOptions = [
    { value: 'maharashtra', label: 'Maharashtra' },
    { value: 'delhi', label: 'Delhi' },
    { value: 'karnataka', label: 'Karnataka' },
    { value: 'gujarat', label: 'Gujarat' },
    { value: 'rajasthan', label: 'Rajasthan' },
    { value: 'uttar-pradesh', label: 'Uttar Pradesh' },
    { value: 'west-bengal', label: 'West Bengal' },
    { value: 'tamil-nadu', label: 'Tamil Nadu' }
  ];

  const handleInputChange = (field, value) => {
    updateFormData({ [field]: value });
  };

  return (
    <div className="bg-white rounded-lg shadow-card border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Personal Information</h3>
        <p className="text-gray-600">Please provide your basic personal details for registration.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Full Name"
          type="text"
          placeholder="Enter your full name"
          value={formData?.fullName || ''}
          onChange={(e) => handleInputChange('fullName', e?.target?.value)}
          error={errors?.fullName}
          required
          className="mb-4"
        />

        <Input
          label="Email Address"
          type="email"
          placeholder="your.email@example.com"
          value={formData?.email || ''}
          onChange={(e) => handleInputChange('email', e?.target?.value)}
          error={errors?.email}
          description="We'll use this for important notifications"
          required
          className="mb-4"
        />

        <Input
          label="Phone Number"
          type="tel"
          placeholder="+91 98765 43210"
          value={formData?.phone || ''}
          onChange={(e) => handleInputChange('phone', e?.target?.value)}
          error={errors?.phone}
          required
          className="mb-4"
        />

        <Input
          label="Date of Birth"
          type="date"
          value={formData?.dateOfBirth || ''}
          onChange={(e) => handleInputChange('dateOfBirth', e?.target?.value)}
          error={errors?.dateOfBirth}
          required
          className="mb-4"
        />

        <Select
          label="Gender"
          options={genderOptions}
          value={formData?.gender || ''}
          onChange={(value) => handleInputChange('gender', value)}
          error={errors?.gender}
          placeholder="Select your gender"
          required
          className="mb-4"
        />

        <Input
          label="Weight (kg)"
          type="number"
          placeholder="65"
          value={formData?.weight || ''}
          onChange={(e) => handleInputChange('weight', e?.target?.value)}
          error={errors?.weight}
          description="Minimum 50kg required for donation"
          required
          min="50"
          max="200"
          className="mb-4"
        />

        <Input
          label="Address Line 1"
          type="text"
          placeholder="House/Flat number, Street name"
          value={formData?.address1 || ''}
          onChange={(e) => handleInputChange('address1', e?.target?.value)}
          error={errors?.address1}
          required
          className="mb-4"
        />

        <Input
          label="Address Line 2"
          type="text"
          placeholder="Area, Landmark (Optional)"
          value={formData?.address2 || ''}
          onChange={(e) => handleInputChange('address2', e?.target?.value)}
          className="mb-4"
        />

        <Input
          label="City"
          type="text"
          placeholder="Enter your city"
          value={formData?.city || ''}
          onChange={(e) => handleInputChange('city', e?.target?.value)}
          error={errors?.city}
          required
          className="mb-4"
        />

        <Select
          label="State"
          options={stateOptions}
          value={formData?.state || ''}
          onChange={(value) => handleInputChange('state', value)}
          error={errors?.state}
          placeholder="Select your state"
          searchable
          required
          className="mb-4"
        />

        <Input
          label="PIN Code"
          type="text"
          placeholder="400001"
          value={formData?.pinCode || ''}
          onChange={(e) => handleInputChange('pinCode', e?.target?.value)}
          error={errors?.pinCode}
          required
          pattern="[0-9]{6}"
          maxLength="6"
          className="mb-4"
        />

        <Input
          label="Emergency Contact Name"
          type="text"
          placeholder="Contact person name"
          value={formData?.emergencyContactName || ''}
          onChange={(e) => handleInputChange('emergencyContactName', e?.target?.value)}
          error={errors?.emergencyContactName}
          required
          className="mb-4"
        />

        <Input
          label="Emergency Contact Phone"
          type="tel"
          placeholder="+91 98765 43210"
          value={formData?.emergencyContactPhone || ''}
          onChange={(e) => handleInputChange('emergencyContactPhone', e?.target?.value)}
          error={errors?.emergencyContactPhone}
          required
          className="mb-4"
        />
      </div>
    </div>
  );
};

export default PersonalInfoStep;