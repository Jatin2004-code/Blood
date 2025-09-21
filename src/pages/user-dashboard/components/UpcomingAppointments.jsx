import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UpcomingAppointments = ({ appointments = [] }) => {
  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high':
        return 'bg-error/10 border-error/20 text-error';
      case 'medium':
        return 'bg-warning/10 border-warning/20 text-warning';
      case 'low':
        return 'bg-success/10 border-success/20 text-success';
      default:
        return 'bg-gray-100 border-gray-200 text-gray-600';
    }
  };

  const handleReschedule = (appointmentId) => {
    console.log('Reschedule appointment:', appointmentId);
  };

  const handleCancel = (appointmentId) => {
    console.log('Cancel appointment:', appointmentId);
  };

  const handleSetReminder = (appointmentId) => {
    console.log('Set reminder for appointment:', appointmentId);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Upcoming Appointments</h2>
        <Button variant="outline" size="sm" iconName="Plus" iconPosition="left">
          Schedule New
        </Button>
      </div>
      <div className="space-y-4">
        {appointments?.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Calendar" size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No upcoming appointments</h3>
            <p className="text-gray-500 mb-4">Schedule your next donation to continue saving lives</p>
            <Button variant="default" iconName="Calendar" iconPosition="left">
              Schedule Donation
            </Button>
          </div>
        ) : (
          appointments?.map((appointment, index) => (
            <motion.div
              key={appointment?.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-card transition-shadow duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="Calendar" size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{appointment?.hospital}</h3>
                    <p className="text-sm text-gray-500">{appointment?.address}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center space-x-1">
                        <Icon name="Clock" size={14} className="text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {appointment?.date} at {appointment?.time}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="MapPin" size={14} className="text-gray-400" />
                        <span className="text-sm text-gray-600">{appointment?.distance}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getUrgencyColor(appointment?.urgency)}`}>
                  {appointment?.urgency} priority
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 rounded-md p-3">
                  <div className="text-xs text-gray-500 mb-1">Blood Type Needed</div>
                  <div className="font-mono font-medium text-primary">{appointment?.bloodType}</div>
                </div>
                <div className="bg-gray-50 rounded-md p-3">
                  <div className="text-xs text-gray-500 mb-1">Estimated Duration</div>
                  <div className="font-medium text-gray-900">{appointment?.duration}</div>
                </div>
              </div>

              {appointment?.specialInstructions && (
                <div className="bg-warning/5 border border-warning/20 rounded-md p-3 mb-4">
                  <div className="flex items-start space-x-2">
                    <Icon name="Info" size={16} className="text-warning mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-warning">Special Instructions</div>
                      <div className="text-sm text-gray-700 mt-1">{appointment?.specialInstructions}</div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Bell"
                    iconPosition="left"
                    onClick={() => handleSetReminder(appointment?.id)}
                  >
                    Remind Me
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="MapPin"
                    iconPosition="left"
                  >
                    Directions
                  </Button>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Calendar"
                    iconPosition="left"
                    onClick={() => handleReschedule(appointment?.id)}
                  >
                    Reschedule
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="X"
                    iconPosition="left"
                    onClick={() => handleCancel(appointment?.id)}
                    className="text-error hover:text-error hover:bg-error/10"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default UpcomingAppointments;