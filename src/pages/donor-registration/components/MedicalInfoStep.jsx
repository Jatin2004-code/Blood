import React from 'react';
import Select from '../../../components/ui/Select';
import { Checkbox, CheckboxGroup } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const MedicalInfoStep = ({ formData, updateFormData, errors }) => {
  const bloodGroupOptions = [
    { value: 'A+', label: 'A+ (A Positive)' },
    { value: 'A-', label: 'A- (A Negative)' },
    { value: 'B+', label: 'B+ (B Positive)' },
    { value: 'B-', label: 'B- (B Negative)' },
    { value: 'AB+', label: 'AB+ (AB Positive)' },
    { value: 'AB-', label: 'AB- (AB Negative)' },
    { value: 'O+', label: 'O+ (O Positive)' },
    { value: 'O-', label: 'O- (O Negative)' }
  ];

  const medicalConditions = [
    { id: 'diabetes', label: 'Diabetes', description: 'Type 1 or Type 2 diabetes' },
    { id: 'hypertension', label: 'High Blood Pressure', description: 'Hypertension or related conditions' },
    { id: 'heart_disease', label: 'Heart Disease', description: 'Any cardiovascular conditions' },
    { id: 'liver_disease', label: 'Liver Disease', description: 'Hepatitis, cirrhosis, or other liver conditions' },
    { id: 'kidney_disease', label: 'Kidney Disease', description: 'Chronic kidney disease or related issues' },
    { id: 'cancer', label: 'Cancer History', description: 'Current or past cancer diagnosis' },
    { id: 'blood_disorders', label: 'Blood Disorders', description: 'Anemia, hemophilia, or other blood conditions' },
    { id: 'autoimmune', label: 'Autoimmune Disorders', description: 'Lupus, rheumatoid arthritis, etc.' }
  ];

  const medications = [
    { id: 'blood_thinners', label: 'Blood Thinners', description: 'Warfarin, aspirin, etc.' },
    { id: 'antibiotics', label: 'Antibiotics', description: 'Currently taking antibiotics' },
    { id: 'steroids', label: 'Steroids', description: 'Corticosteroids or anabolic steroids' },
    { id: 'immunosuppressants', label: 'Immunosuppressants', description: 'Medications that suppress immune system' },
    { id: 'antidepressants', label: 'Antidepressants', description: 'Mental health medications' },
    { id: 'hormones', label: 'Hormone Therapy', description: 'Hormone replacement or birth control' }
  ];

  const handleInputChange = (field, value) => {
    updateFormData({ [field]: value });
  };

  const handleCheckboxChange = (field, itemId, checked) => {
    const currentItems = formData?.[field] || [];
    const updatedItems = checked
      ? [...currentItems, itemId]
      : currentItems?.filter(id => id !== itemId);
    updateFormData({ [field]: updatedItems });
  };

  const getBloodGroupColor = (bloodGroup) => {
    const colors = {
      'A+': 'text-red-600 bg-red-50',
      'A-': 'text-red-700 bg-red-100',
      'B+': 'text-blue-600 bg-blue-50',
      'B-': 'text-blue-700 bg-blue-100',
      'AB+': 'text-purple-600 bg-purple-50',
      'AB-': 'text-purple-700 bg-purple-100',
      'O+': 'text-green-600 bg-green-50',
      'O-': 'text-green-700 bg-green-100'
    };
    return colors?.[bloodGroup] || 'text-gray-600 bg-gray-50';
  };

  return (
    <div className="bg-white rounded-lg shadow-card border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Medical Information</h3>
        <p className="text-gray-600">Please provide accurate medical information to ensure safe blood donation.</p>
      </div>
      <div className="space-y-8">
        {/* Blood Group Selection */}
        <div>
          <Select
            label="Blood Group"
            options={bloodGroupOptions}
            value={formData?.bloodGroup || ''}
            onChange={(value) => handleInputChange('bloodGroup', value)}
            error={errors?.bloodGroup}
            placeholder="Select your blood group"
            required
            className="mb-4"
          />
          
          {formData?.bloodGroup && (
            <div className={`inline-flex items-center px-3 py-2 rounded-full text-sm font-medium ${getBloodGroupColor(formData?.bloodGroup)}`}>
              <Icon name="Droplets" size={16} className="mr-2" />
              Blood Group: {formData?.bloodGroup}
            </div>
          )}
        </div>

        {/* Medical Conditions */}
        <div>
          <CheckboxGroup 
            label="Medical Conditions" 
            error={errors?.medicalConditions}
            className="mb-4"
          >
            <p className="text-sm text-gray-600 mb-4">
              Please check any medical conditions you currently have or have had in the past:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {medicalConditions?.map((condition) => (
                <div key={condition?.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <Checkbox
                    label={condition?.label}
                    description={condition?.description}
                    checked={(formData?.medicalConditions || [])?.includes(condition?.id)}
                    onChange={(e) => handleCheckboxChange('medicalConditions', condition?.id, e?.target?.checked)}
                  />
                </div>
              ))}
            </div>
          </CheckboxGroup>
        </div>

        {/* Current Medications */}
        <div>
          <CheckboxGroup 
            label="Current Medications" 
            error={errors?.currentMedications}
            className="mb-4"
          >
            <p className="text-sm text-gray-600 mb-4">
              Please check any medications you are currently taking:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {medications?.map((medication) => (
                <div key={medication?.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <Checkbox
                    label={medication?.label}
                    description={medication?.description}
                    checked={(formData?.currentMedications || [])?.includes(medication?.id)}
                    onChange={(e) => handleCheckboxChange('currentMedications', medication?.id, e?.target?.checked)}
                  />
                </div>
              ))}
            </div>
          </CheckboxGroup>
        </div>

        {/* Eligibility Questions */}
        <div className="border-t border-gray-200 pt-6">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Eligibility Questions</h4>
          <div className="space-y-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <Checkbox
                label="I confirm that I have not donated blood in the last 3 months"
                description="There must be at least 3 months gap between blood donations"
                checked={formData?.lastDonationConfirm || false}
                onChange={(e) => handleInputChange('lastDonationConfirm', e?.target?.checked)}
                error={errors?.lastDonationConfirm}
                required
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <Checkbox
                label="I have not had any tattoos, piercings, or dental work in the last 6 months"
                description="Recent tattoos, piercings, or dental procedures may affect eligibility"
                checked={formData?.recentProceduresConfirm || false}
                onChange={(e) => handleInputChange('recentProceduresConfirm', e?.target?.checked)}
                error={errors?.recentProceduresConfirm}
                required
              />
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <Checkbox
                label="I am not currently pregnant or breastfeeding"
                description="Pregnancy and breastfeeding affect blood donation eligibility"
                checked={formData?.pregnancyConfirm || false}
                onChange={(e) => handleInputChange('pregnancyConfirm', e?.target?.checked)}
                error={errors?.pregnancyConfirm}
                required
              />
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <Checkbox
                label="I have not traveled to malaria-endemic areas in the last 3 months"
                description="Recent travel to certain areas may require deferral period"
                checked={formData?.travelConfirm || false}
                onChange={(e) => handleInputChange('travelConfirm', e?.target?.checked)}
                error={errors?.travelConfirm}
                required
              />
            </div>
          </div>
        </div>

        {/* Medical Disclaimer */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="AlertTriangle" size={20} className="text-warning mt-0.5" />
            <div>
              <h5 className="font-medium text-gray-900 mb-2">Important Medical Disclaimer</h5>
              <p className="text-sm text-gray-600">
                All medical information provided will be kept confidential and used only for blood donation eligibility assessment. 
                A medical professional will conduct a final health screening before donation. If you have any concerns about your 
                eligibility, please consult with our medical team.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalInfoStep;