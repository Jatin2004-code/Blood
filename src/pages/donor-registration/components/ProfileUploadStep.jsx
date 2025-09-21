import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProfileUploadStep = ({ formData, updateFormData, errors }) => {
  const [dragActive, setDragActive] = useState(false);
  const [imagePreview, setImagePreview] = useState(formData?.profileImage || null);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === "dragenter" || e?.type === "dragover") {
      setDragActive(true);
    } else if (e?.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    
    if (e?.dataTransfer?.files && e?.dataTransfer?.files?.[0]) {
      handleFile(e?.dataTransfer?.files?.[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e?.target?.files && e?.target?.files?.[0]) {
      handleFile(e?.target?.files?.[0]);
    }
  };

  const handleFile = (file) => {
    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes?.includes(file?.type)) {
      alert('Please upload a valid image file (JPEG, PNG, or WebP)');
      return;
    }

    // Validate file size (max 5MB)
    if (file?.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e?.target?.result);
      updateFormData({ 
        profileImage: e?.target?.result,
        profileImageFile: file 
      });
    };
    reader?.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    updateFormData({ 
      profileImage: null,
      profileImageFile: null 
    });
    if (fileInputRef?.current) {
      fileInputRef.current.value = '';
    }
  };

  const openFileDialog = () => {
    fileInputRef?.current?.click();
  };

  return (
    <div className="bg-white rounded-lg shadow-card border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Profile Photo</h3>
        <p className="text-gray-600">Upload a clear photo of yourself for profile verification.</p>
      </div>
      <div className="space-y-6">
        {/* Upload Area */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Upload Zone */}
          <div className="flex-1">
            <div
              className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
                dragActive
                  ? 'border-primary bg-primary/5'
                  : imagePreview
                  ? 'border-success bg-success/5' :'border-gray-300 hover:border-gray-400'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
              />

              {!imagePreview ? (
                <div className="space-y-4">
                  <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                    <Icon name="Upload" size={24} className="text-gray-400" />
                  </div>
                  <div>
                    <p className="text-lg font-medium text-gray-900 mb-2">
                      Drop your photo here, or{' '}
                      <button
                        type="button"
                        onClick={openFileDialog}
                        className="text-primary hover:text-primary/80 underline"
                      >
                        browse
                      </button>
                    </p>
                    <p className="text-sm text-gray-500">
                      Supports: JPEG, PNG, WebP (Max 5MB)
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="mx-auto w-16 h-16 bg-success/10 rounded-full flex items-center justify-center">
                    <Icon name="CheckCircle" size={24} className="text-success" />
                  </div>
                  <p className="text-lg font-medium text-success">Photo uploaded successfully!</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={openFileDialog}
                    iconName="Upload"
                    iconPosition="left"
                  >
                    Change Photo
                  </Button>
                </div>
              )}
            </div>

            {errors?.profileImage && (
              <p className="mt-2 text-sm text-error">{errors?.profileImage}</p>
            )}
          </div>

          {/* Preview Area */}
          {imagePreview && (
            <div className="lg:w-80">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-gray-900">Preview</h4>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={removeImage}
                    className="text-error hover:bg-error/10"
                  >
                    <Icon name="Trash2" size={16} />
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {/* Profile Preview */}
                  <div className="text-center">
                    <div className="inline-block relative">
                      <Image
                        src={imagePreview}
                        alt="Profile preview"
                        className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                      />
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-success rounded-full border-2 border-white flex items-center justify-center">
                        <Icon name="Check" size={14} className="text-white" />
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">Profile View</p>
                  </div>

                  {/* Card Preview */}
                  <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                    <div className="flex items-center space-x-3">
                      <Image
                        src={imagePreview}
                        alt="Card preview"
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-900">
                          {formData?.fullName || 'Your Name'}
                        </p>
                        <p className="text-sm text-gray-500">
                          {formData?.bloodGroup || 'Blood Group'} • Donor
                        </p>
                      </div>
                    </div>
                    <p className="mt-2 text-xs text-gray-500">Card View</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Photo Guidelines */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={20} className="text-blue-600 mt-0.5" />
            <div>
              <h5 className="font-medium text-blue-900 mb-2">Photo Guidelines</h5>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Use a clear, recent photo of yourself</li>
                <li>• Face should be clearly visible and well-lit</li>
                <li>• Avoid sunglasses, hats, or face coverings</li>
                <li>• Professional or casual photos are both acceptable</li>
                <li>• Photo will be used for profile verification only</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Privacy Notice */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Shield" size={20} className="text-gray-600 mt-0.5" />
            <div>
              <h5 className="font-medium text-gray-900 mb-2">Privacy & Security</h5>
              <p className="text-sm text-gray-600">
                Your photo is encrypted and stored securely. It will only be visible to verified medical 
                professionals and administrators for identification purposes during the donation process. 
                You can update or remove your photo at any time from your profile settings.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileUploadStep;