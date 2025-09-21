import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const PatientDetailsForm = ({ formData, onFormChange, errors }) => {
  const bloodGroups = [
    { value: 'A+', label: 'A+ (A Positive)' },
    { value: 'A-', label: 'A- (A Negative)' },
    { value: 'B+', label: 'B+ (B Positive)' },
    { value: 'B-', label: 'B- (B Negative)' },
    { value: 'AB+', label: 'AB+ (AB Positive)' },
    { value: 'AB-', label: 'AB- (AB Negative)' },
    { value: 'O+', label: 'O+ (O Positive)' },
    { value: 'O-', label: 'O- (O Negative)' }
  ];

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' }
  ];

  const relationshipOptions = [
    { value: 'self', label: 'Self' },
    { value: 'spouse', label: 'Spouse' },
    { value: 'parent', label: 'Parent' },
    { value: 'child', label: 'Child' },
    { value: 'sibling', label: 'Sibling' },
    { value: 'relative', label: 'Relative' },
    { value: 'friend', label: 'Friend' },
    { value: 'other', label: 'Other' }
  ];

  const handleInputChange = (field, value) => {
    onFormChange({
      ...formData,
      [field]: value
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Icon name="User" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-gray-900">Patient Details</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Patient Name"
          type="text"
          placeholder="Enter patient's full name"
          value={formData?.patientName || ''}
          onChange={(e) => handleInputChange('patientName', e?.target?.value)}
          error={errors?.patientName}
          required
          className="col-span-1"
        />

        <Input
          label="Patient Age"
          type="number"
          placeholder="Enter age"
          value={formData?.patientAge || ''}
          onChange={(e) => handleInputChange('patientAge', e?.target?.value)}
          error={errors?.patientAge}
          required
          min="1"
          max="120"
          className="col-span-1"
        />

        <Select
          label="Gender"
          options={genderOptions}
          value={formData?.patientGender || ''}
          onChange={(value) => handleInputChange('patientGender', value)}
          error={errors?.patientGender}
          required
          placeholder="Select gender"
          className="col-span-1"
        />

        <Select
          label="Blood Group Required"
          options={bloodGroups}
          value={formData?.bloodGroup || ''}
          onChange={(value) => handleInputChange('bloodGroup', value)}
          error={errors?.bloodGroup}
          required
          placeholder="Select blood group"
          searchable
          className="col-span-1"
        />

        <Input
          label="Units Required"
          type="number"
          placeholder="Number of units needed"
          value={formData?.unitsRequired || ''}
          onChange={(e) => handleInputChange('unitsRequired', e?.target?.value)}
          error={errors?.unitsRequired}
          required
          min="1"
          max="10"
          description="Typically 1 unit = 450ml of blood"
          className="col-span-1"
        />

        <Select
          label="Relationship to Patient"
          options={relationshipOptions}
          value={formData?.relationship || ''}
          onChange={(value) => handleInputChange('relationship', value)}
          error={errors?.relationship}
          required
          placeholder="Your relationship"
          className="col-span-1"
        />
      </div>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-blue-600 mt-0.5" />
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">Blood Compatibility Information:</p>
            <p>
              {formData?.bloodGroup === 'O-' && 'Universal donor - can donate to all blood types'}
              {formData?.bloodGroup === 'AB+' && 'Universal recipient - can receive from all blood types'}
              {formData?.bloodGroup && !['O-', 'AB+']?.includes(formData?.bloodGroup) && 
                `Compatible donors: ${formData?.bloodGroup === 'A+' ? 'A+, A-, O+, O-' : 
                formData?.bloodGroup === 'A-' ? 'A-, O-' :
                formData?.bloodGroup === 'B+' ? 'B+, B-, O+, O-' :
                formData?.bloodGroup === 'B-' ? 'B-, O-' :
                formData?.bloodGroup === 'AB-' ? 'AB-, A-, B-, O-' :
                formData?.bloodGroup === 'O+' ? 'O+, O-' : ''}`
              }
              {!formData?.bloodGroup && 'Select blood group to see compatibility information'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetailsForm;