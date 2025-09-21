import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const MedicalRequirementsForm = ({ formData, onFormChange, errors }) => {
  const componentTypes = [
    { value: 'whole-blood', label: 'Whole Blood', description: 'Complete blood with all components' },
    { value: 'packed-rbc', label: 'Packed RBC', description: 'Red blood cells only' },
    { value: 'platelets', label: 'Platelets', description: 'Platelet concentrate' },
    { value: 'plasma', label: 'Fresh Frozen Plasma', description: 'Plasma component' },
    { value: 'cryoprecipitate', label: 'Cryoprecipitate', description: 'Clotting factors' }
  ];

  const urgencyTimeframes = [
    { value: 'immediate', label: 'Immediate (Within 1 hour)' },
    { value: '2-hours', label: 'Within 2 hours' },
    { value: '6-hours', label: 'Within 6 hours' },
    { value: '12-hours', label: 'Within 12 hours' },
    { value: '24-hours', label: 'Within 24 hours' },
    { value: 'planned', label: 'Planned procedure (48+ hours)' }
  ];

  const medicalConditions = [
    { id: 'surgery', label: 'Surgery/Operation', icon: 'Scissors' },
    { id: 'accident', label: 'Accident/Trauma', icon: 'AlertTriangle' },
    { id: 'cancer', label: 'Cancer Treatment', icon: 'Heart' },
    { id: 'anemia', label: 'Severe Anemia', icon: 'Activity' },
    { id: 'childbirth', label: 'Childbirth Complications', icon: 'Baby' },
    { id: 'organ-transplant', label: 'Organ Transplant', icon: 'Heart' },
    { id: 'blood-disorder', label: 'Blood Disorder', icon: 'Droplet' },
    { id: 'other', label: 'Other Medical Condition', icon: 'Stethoscope' }
  ];

  const handleInputChange = (field, value) => {
    onFormChange({
      ...formData,
      [field]: value
    });
  };

  const handleConditionChange = (conditionId, checked) => {
    const currentConditions = formData?.medicalConditions || [];
    const updatedConditions = checked
      ? [...currentConditions, conditionId]
      : currentConditions?.filter(condition => condition !== conditionId);
    
    handleInputChange('medicalConditions', updatedConditions);
  };

  const calculateCompatibleDonors = () => {
    if (!formData?.bloodGroup) return 0;
    
    // Mock calculation based on blood group compatibility
    const donorCounts = {
      'O-': 850, 'O+': 1200, 'A-': 650, 'A+': 900,
      'B-': 450, 'B+': 750, 'AB-': 200, 'AB+': 350
    };
    
    return donorCounts?.[formData?.bloodGroup] || 0;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Icon name="Stethoscope" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-gray-900">Medical Requirements</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label="Blood Component Required"
          options={componentTypes}
          value={formData?.componentType || ''}
          onChange={(value) => handleInputChange('componentType', value)}
          error={errors?.componentType}
          required
          placeholder="Select blood component"
          description="Choose the specific blood component needed"
          className="col-span-1"
        />

        <Select
          label="Required Timeline"
          options={urgencyTimeframes}
          value={formData?.timeline || ''}
          onChange={(value) => handleInputChange('timeline', value)}
          error={errors?.timeline}
          required
          placeholder="When is blood needed?"
          className="col-span-1"
        />

        <Input
          label="Hemoglobin Level (g/dL)"
          type="number"
          placeholder="Current Hb level"
          value={formData?.hemoglobinLevel || ''}
          onChange={(e) => handleInputChange('hemoglobinLevel', e?.target?.value)}
          error={errors?.hemoglobinLevel}
          min="1"
          max="20"
          step="0.1"
          description="Patient's current hemoglobin level"
          className="col-span-1"
        />

        <Input
          label="Platelet Count (per μL)"
          type="number"
          placeholder="Current platelet count"
          value={formData?.plateletCount || ''}
          onChange={(e) => handleInputChange('plateletCount', e?.target?.value)}
          error={errors?.plateletCount}
          min="1000"
          max="1000000"
          description="Required for platelet transfusions"
          className="col-span-1"
        />

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Medical Condition/Reason <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {medicalConditions?.map((condition) => (
              <div key={condition?.id} className="flex items-center space-x-2 p-2 border border-gray-200 rounded-md hover:bg-gray-50">
                <Checkbox
                  checked={(formData?.medicalConditions || [])?.includes(condition?.id)}
                  onChange={(e) => handleConditionChange(condition?.id, e?.target?.checked)}
                />
                <div className="flex items-center space-x-2">
                  <Icon name={condition?.icon} size={16} className="text-gray-600" />
                  <span className="text-sm text-gray-700">{condition?.label}</span>
                </div>
              </div>
            ))}
          </div>
          {errors?.medicalConditions && (
            <p className="text-sm text-error mt-1">{errors?.medicalConditions}</p>
          )}
        </div>

        {(formData?.medicalConditions || [])?.includes('other') && (
          <Input
            label="Specify Other Condition"
            type="text"
            placeholder="Please specify the medical condition"
            value={formData?.otherCondition || ''}
            onChange={(e) => handleInputChange('otherCondition', e?.target?.value)}
            error={errors?.otherCondition}
            required
            className="md:col-span-2"
          />
        )}
      </div>
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          Additional Medical Information
        </label>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={formData?.requiresCrossmatch || false}
              onChange={(e) => handleInputChange('requiresCrossmatch', e?.target?.checked)}
            />
            <label className="text-sm text-gray-700">
              Requires cross-matching before transfusion
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              checked={formData?.hasAllergies || false}
              onChange={(e) => handleInputChange('hasAllergies', e?.target?.checked)}
            />
            <label className="text-sm text-gray-700">
              Patient has known allergies or transfusion reactions
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              checked={formData?.isPregnant || false}
              onChange={(e) => handleInputChange('isPregnant', e?.target?.checked)}
            />
            <label className="text-sm text-gray-700">
              Patient is pregnant (requires special screening)
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              checked={formData?.hasInfectiousDiseases || false}
              onChange={(e) => handleInputChange('hasInfectiousDiseases', e?.target?.checked)}
            />
            <label className="text-sm text-gray-700">
              Patient has history of infectious diseases
            </label>
          </div>
        </div>

        {formData?.hasAllergies && (
          <Input
            label="Allergy Details"
            type="text"
            placeholder="Specify allergies or previous reactions"
            value={formData?.allergyDetails || ''}
            onChange={(e) => handleInputChange('allergyDetails', e?.target?.value)}
            error={errors?.allergyDetails}
            required
            description="Important for donor screening"
          />
        )}
      </div>
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="Users" size={20} className="text-green-600" />
            <div>
              <p className="text-sm font-medium text-green-800">
                Estimated Compatible Donors
              </p>
              <p className="text-xs text-green-600">
                Based on your requirements and location
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-green-600">
              {calculateCompatibleDonors()?.toLocaleString()}
            </p>
            <p className="text-xs text-green-600">donors nearby</p>
          </div>
        </div>
      </div>
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="AlertTriangle" size={20} className="text-amber-600 mt-0.5" />
          <div className="text-sm text-amber-800">
            <p className="font-medium mb-1">Medical Information Accuracy:</p>
            <p>
              Accurate medical information helps us match you with the most suitable donors 
              and ensures safe transfusion. Please consult with medical staff if unsure about any details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalRequirementsForm;