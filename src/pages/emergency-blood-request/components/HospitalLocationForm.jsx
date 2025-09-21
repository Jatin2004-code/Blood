import React, { useState, useEffect } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const HospitalLocationForm = ({ formData, onFormChange, errors }) => {
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [showMap, setShowMap] = useState(false);

  const hospitals = [
    { value: 'aiims-delhi', label: 'AIIMS Delhi', description: 'All India Institute of Medical Sciences' },
    { value: 'apollo-delhi', label: 'Apollo Hospital Delhi', description: 'Multi-specialty hospital' },
    { value: 'max-saket', label: 'Max Hospital Saket', description: 'Super specialty hospital' },
    { value: 'fortis-gurgaon', label: 'Fortis Hospital Gurgaon', description: 'Healthcare facility' },
    { value: 'medanta-gurgaon', label: 'Medanta Hospital Gurgaon', description: 'Multi-specialty hospital' },
    { value: 'batra-delhi', label: 'Batra Hospital Delhi', description: 'Medical center' },
    { value: 'other', label: 'Other Hospital', description: 'Specify hospital details manually' }
  ];

  const stateOptions = [
    { value: 'delhi', label: 'Delhi' },
    { value: 'haryana', label: 'Haryana' },
    { value: 'uttar-pradesh', label: 'Uttar Pradesh' },
    { value: 'punjab', label: 'Punjab' },
    { value: 'rajasthan', label: 'Rajasthan' },
    { value: 'maharashtra', label: 'Maharashtra' },
    { value: 'karnataka', label: 'Karnataka' },
    { value: 'tamil-nadu', label: 'Tamil Nadu' },
    { value: 'west-bengal', label: 'West Bengal' },
    { value: 'gujarat', label: 'Gujarat' }
  ];

  const handleInputChange = (field, value) => {
    onFormChange({
      ...formData,
      [field]: value
    });
  };

  const detectLocation = () => {
    setIsDetectingLocation(true);
    
    if (navigator.geolocation) {
      navigator.geolocation?.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position?.coords;
          
          // Mock reverse geocoding - in real app, use Google Maps API
          setTimeout(() => {
            handleInputChange('latitude', latitude?.toString());
            handleInputChange('longitude', longitude?.toString());
            handleInputChange('hospitalAddress', `Detected Location: ${latitude?.toFixed(4)}, ${longitude?.toFixed(4)}`);
            handleInputChange('city', 'Delhi');
            handleInputChange('state', 'delhi');
            handleInputChange('pincode', '110001');
            setIsDetectingLocation(false);
          }, 2000);
        },
        (error) => {
          console.error('Location detection failed:', error);
          setIsDetectingLocation(false);
          alert('Unable to detect location. Please enter hospital details manually.');
        }
      );
    } else {
      setIsDetectingLocation(false);
      alert('Geolocation is not supported by this browser.');
    }
  };

  const toggleMap = () => {
    setShowMap(!showMap);
  };

  useEffect(() => {
    if (formData?.latitude && formData?.longitude) {
      setShowMap(true);
    }
  }, [formData?.latitude, formData?.longitude]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon name="MapPin" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-gray-900">Hospital Location</h3>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={detectLocation}
          loading={isDetectingLocation}
          iconName="Navigation"
          iconPosition="left"
        >
          {isDetectingLocation ? 'Detecting...' : 'Detect Location'}
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <Select
            label="Select Hospital"
            options={hospitals}
            value={formData?.hospital || ''}
            onChange={(value) => handleInputChange('hospital', value)}
            error={errors?.hospital}
            required
            placeholder="Choose hospital or select 'Other'"
            searchable
            description="Select from registered hospitals or choose 'Other' for manual entry"
          />
        </div>

        {formData?.hospital === 'other' && (
          <Input
            label="Hospital Name"
            type="text"
            placeholder="Enter hospital name"
            value={formData?.customHospitalName || ''}
            onChange={(e) => handleInputChange('customHospitalName', e?.target?.value)}
            error={errors?.customHospitalName}
            required
            className="md:col-span-2"
          />
        )}

        <Input
          label="Hospital Address"
          type="text"
          placeholder="Enter complete hospital address"
          value={formData?.hospitalAddress || ''}
          onChange={(e) => handleInputChange('hospitalAddress', e?.target?.value)}
          error={errors?.hospitalAddress}
          required
          className="md:col-span-2"
        />

        <Input
          label="City"
          type="text"
          placeholder="Enter city"
          value={formData?.city || ''}
          onChange={(e) => handleInputChange('city', e?.target?.value)}
          error={errors?.city}
          required
          className="col-span-1"
        />

        <Select
          label="State"
          options={stateOptions}
          value={formData?.state || ''}
          onChange={(value) => handleInputChange('state', value)}
          error={errors?.state}
          required
          placeholder="Select state"
          searchable
          className="col-span-1"
        />

        <Input
          label="PIN Code"
          type="text"
          placeholder="Enter 6-digit PIN code"
          value={formData?.pincode || ''}
          onChange={(e) => handleInputChange('pincode', e?.target?.value)}
          error={errors?.pincode}
          required
          pattern="[0-9]{6}"
          maxLength="6"
          className="col-span-1"
        />

        <Input
          label="Landmark (Optional)"
          type="text"
          placeholder="Nearby landmark for easy location"
          value={formData?.landmark || ''}
          onChange={(e) => handleInputChange('landmark', e?.target?.value)}
          className="col-span-1"
        />
      </div>
      {(formData?.latitude && formData?.longitude) && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Location Preview</span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={toggleMap}
              iconName={showMap ? "EyeOff" : "Eye"}
              iconPosition="left"
            >
              {showMap ? 'Hide Map' : 'Show Map'}
            </Button>
          </div>

          {showMap && (
            <div className="w-full h-64 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
              <iframe
                width="100%"
                height="100%"
                loading="lazy"
                title="Hospital Location"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps?q=${formData?.latitude},${formData?.longitude}&z=15&output=embed`}
                className="border-0"
              />
            </div>
          )}

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={16} className="text-green-600" />
              <span className="text-sm font-medium text-green-800">
                Location detected successfully. Donors within 10km radius will be notified.
              </span>
            </div>
          </div>
        </div>
      )}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="AlertTriangle" size={20} className="text-yellow-600 mt-0.5" />
          <div className="text-sm text-yellow-800">
            <p className="font-medium mb-1">Location Accuracy Important:</p>
            <p>
              Accurate hospital location helps donors find you quickly during emergencies. 
              Double-check the address and use location detection for precise coordinates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalLocationForm;