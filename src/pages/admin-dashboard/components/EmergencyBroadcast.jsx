import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const EmergencyBroadcast = ({ onSendBroadcast }) => {
  const [broadcastData, setBroadcastData] = useState({
    title: '',
    message: '',
    urgency: 'medium',
    targetAudience: 'all',
    bloodTypes: [],
    locations: [],
    channels: ['push', 'email']
  });
  const [isSending, setIsSending] = useState(false);
  const [recentBroadcasts, setRecentBroadcasts] = useState([
    {
      id: 1,
      title: "Critical Blood Shortage - O Negative",
      message: "Urgent need for O- blood donors in Mumbai region. Please visit nearest blood bank immediately.",
      urgency: 'critical',
      targetAudience: 'donors',
      sentAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      deliveryStatus: { sent: 1247, delivered: 1198, opened: 892 }
    },
    {
      id: 2,
      title: "Blood Donation Camp - Tomorrow",
      message: "Join us for a blood donation camp at City Hospital tomorrow from 9 AM to 5 PM.",
      urgency: 'medium',
      targetAudience: 'all',
      sentAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      deliveryStatus: { sent: 3456, delivered: 3401, opened: 2234 }
    }
  ]);

  const urgencyOptions = [
    { value: 'low', label: 'Low Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'high', label: 'High Priority' },
    { value: 'critical', label: 'Critical Emergency' }
  ];

  const audienceOptions = [
    { value: 'all', label: 'All Users' },
    { value: 'donors', label: 'Verified Donors Only' },
    { value: 'active', label: 'Active Users (30 days)' },
    { value: 'location', label: 'Specific Locations' },
    { value: 'bloodtype', label: 'Specific Blood Types' }
  ];

  const bloodTypeOptions = [
    { value: 'O+', label: 'O Positive' },
    { value: 'O-', label: 'O Negative' },
    { value: 'A+', label: 'A Positive' },
    { value: 'A-', label: 'A Negative' },
    { value: 'B+', label: 'B Positive' },
    { value: 'B-', label: 'B Negative' },
    { value: 'AB+', label: 'AB Positive' },
    { value: 'AB-', label: 'AB Negative' }
  ];

  const locationOptions = [
    { value: 'mumbai', label: 'Mumbai' },
    { value: 'delhi', label: 'Delhi' },
    { value: 'bangalore', label: 'Bangalore' },
    { value: 'chennai', label: 'Chennai' },
    { value: 'kolkata', label: 'Kolkata' },
    { value: 'hyderabad', label: 'Hyderabad' }
  ];

  const channelOptions = [
    { value: 'push', label: 'Push Notifications' },
    { value: 'email', label: 'Email' },
    { value: 'sms', label: 'SMS' },
    { value: 'whatsapp', label: 'WhatsApp' }
  ];

  const handleInputChange = (field, value) => {
    setBroadcastData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSendBroadcast = async () => {
    if (!broadcastData?.title || !broadcastData?.message) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSending(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const newBroadcast = {
        id: Date.now(),
        ...broadcastData,
        sentAt: new Date(),
        deliveryStatus: { sent: 0, delivered: 0, opened: 0 }
      };
      
      setRecentBroadcasts(prev => [newBroadcast, ...prev]);
      
      // Reset form
      setBroadcastData({
        title: '',
        message: '',
        urgency: 'medium',
        targetAudience: 'all',
        bloodTypes: [],
        locations: [],
        channels: ['push', 'email']
      });
      
      if (onSendBroadcast) {
        onSendBroadcast(newBroadcast);
      }
      
    } catch (error) {
      console.error('Failed to send broadcast:', error);
    } finally {
      setIsSending(false);
    }
  };

  const getUrgencyColor = (urgency) => {
    const colors = {
      low: 'text-gray-600 bg-gray-100',
      medium: 'text-warning bg-warning/10',
      high: 'text-error bg-error/10',
      critical: 'text-white bg-error emergency-pulse'
    };
    return colors?.[urgency] || colors?.medium;
  };

  const getDeliveryRate = (status) => {
    if (status?.sent === 0) return 0;
    return Math.round((status?.delivered / status?.sent) * 100);
  };

  const getOpenRate = (status) => {
    if (status?.delivered === 0) return 0;
    return Math.round((status?.opened / status?.delivered) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Broadcast Form */}
      <div className="bg-white rounded-xl shadow-card border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-error/10 rounded-lg">
              <Icon name="Radio" size={24} className="text-error" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Emergency Broadcast</h3>
              <p className="text-sm text-gray-600">Send urgent notifications to users</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Input
                label="Broadcast Title"
                type="text"
                placeholder="Enter broadcast title"
                value={broadcastData?.title}
                onChange={(e) => handleInputChange('title', e?.target?.value)}
                required
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message Content
                </label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                  placeholder="Enter your emergency message..."
                  value={broadcastData?.message}
                  onChange={(e) => handleInputChange('message', e?.target?.value)}
                  required
                />
                <div className="text-xs text-gray-500 mt-1">
                  {broadcastData?.message?.length}/500 characters
                </div>
              </div>

              <Select
                label="Urgency Level"
                options={urgencyOptions}
                value={broadcastData?.urgency}
                onChange={(value) => handleInputChange('urgency', value)}
              />
            </div>

            <div className="space-y-4">
              <Select
                label="Target Audience"
                options={audienceOptions}
                value={broadcastData?.targetAudience}
                onChange={(value) => handleInputChange('targetAudience', value)}
              />

              {broadcastData?.targetAudience === 'bloodtype' && (
                <Select
                  label="Blood Types"
                  options={bloodTypeOptions}
                  value={broadcastData?.bloodTypes}
                  onChange={(value) => handleInputChange('bloodTypes', value)}
                  multiple
                  searchable
                />
              )}

              {broadcastData?.targetAudience === 'location' && (
                <Select
                  label="Target Locations"
                  options={locationOptions}
                  value={broadcastData?.locations}
                  onChange={(value) => handleInputChange('locations', value)}
                  multiple
                  searchable
                />
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Delivery Channels
                </label>
                <div className="space-y-2">
                  {channelOptions?.map((channel) => (
                    <label key={channel?.value} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={broadcastData?.channels?.includes(channel?.value)}
                        onChange={(e) => {
                          if (e?.target?.checked) {
                            handleInputChange('channels', [...broadcastData?.channels, channel?.value]);
                          } else {
                            handleInputChange('channels', broadcastData?.channels?.filter(c => c !== channel?.value));
                          }
                        }}
                        className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                      />
                      <span className="text-sm text-gray-700">{channel?.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <div className="text-sm text-gray-600">
              Estimated recipients: <span className="font-medium">~1,247 users</span>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={() => setBroadcastData({
                  title: '',
                  message: '',
                  urgency: 'medium',
                  targetAudience: 'all',
                  bloodTypes: [],
                  locations: [],
                  channels: ['push', 'email']
                })}
              >
                Clear
              </Button>
              <Button
                variant="destructive"
                onClick={handleSendBroadcast}
                loading={isSending}
                iconName="Send"
                className="emergency-pulse"
              >
                Send Broadcast
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Recent Broadcasts */}
      <div className="bg-white rounded-xl shadow-card border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Broadcasts</h3>
          <p className="text-sm text-gray-600">Track delivery and engagement metrics</p>
        </div>

        <div className="divide-y divide-gray-200">
          {recentBroadcasts?.map((broadcast) => (
            <div key={broadcast?.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-sm font-medium text-gray-900">{broadcast?.title}</h4>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getUrgencyColor(broadcast?.urgency)}`}>
                      {broadcast?.urgency}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{broadcast?.message}</p>
                  <div className="text-xs text-gray-500">
                    Sent {broadcast?.sentAt?.toLocaleString('en-IN')} • Target: {broadcast?.targetAudience}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-gray-900">
                    {broadcast?.deliveryStatus?.sent?.toLocaleString('en-IN')}
                  </div>
                  <div className="text-xs text-gray-600">Sent</div>
                </div>
                <div className="text-center p-3 bg-success/10 rounded-lg">
                  <div className="text-lg font-bold text-success">
                    {getDeliveryRate(broadcast?.deliveryStatus)}%
                  </div>
                  <div className="text-xs text-gray-600">Delivered</div>
                </div>
                <div className="text-center p-3 bg-primary/10 rounded-lg">
                  <div className="text-lg font-bold text-primary">
                    {getOpenRate(broadcast?.deliveryStatus)}%
                  </div>
                  <div className="text-xs text-gray-600">Opened</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {recentBroadcasts?.length === 0 && (
          <div className="p-12 text-center">
            <Icon name="Radio" size={48} className="text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">No Broadcasts Sent</h4>
            <p className="text-gray-600">Emergency broadcasts will appear here once sent.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmergencyBroadcast;