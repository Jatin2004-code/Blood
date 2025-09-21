import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const DonationTimeline = ({ donations = [] }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success text-white';
      case 'scheduled':
        return 'bg-warning text-white';
      case 'cancelled':
        return 'bg-error text-white';
      default:
        return 'bg-gray-400 text-white';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return 'CheckCircle';
      case 'scheduled':
        return 'Clock';
      case 'cancelled':
        return 'XCircle';
      default:
        return 'Circle';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Donation History</h2>
        <div className="flex items-center space-x-2">
          <Icon name="History" size={20} className="text-gray-400" />
          <span className="text-sm text-gray-500">{donations?.length} donations</span>
        </div>
      </div>
      <div className="space-y-6">
        {donations?.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Heart" size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No donations yet</h3>
            <p className="text-gray-500 mb-4">Start your donation journey today and save lives!</p>
            <button className="text-primary hover:text-primary/80 font-medium">
              Schedule First Donation
            </button>
          </div>
        ) : (
          donations?.map((donation, index) => (
            <motion.div
              key={donation?.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative flex items-start space-x-4"
            >
              {/* Timeline Line */}
              {index !== donations?.length - 1 && (
                <div className="absolute left-6 top-12 w-0.5 h-16 bg-gray-200"></div>
              )}

              {/* Status Icon */}
              <div className={`w-12 h-12 rounded-full ${getStatusColor(donation?.status)} flex items-center justify-center flex-shrink-0 z-10`}>
                <Icon name={getStatusIcon(donation?.status)} size={20} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-medium text-gray-900">{donation?.hospital}</h3>
                      <p className="text-sm text-gray-500">{donation?.location}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">{donation?.date}</div>
                      <div className="text-xs text-gray-500">{donation?.time}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <span className="text-xs text-gray-500">Blood Type</span>
                      <div className="font-mono font-medium text-primary">{donation?.bloodType}</div>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500">Quantity</span>
                      <div className="font-medium text-gray-900">{donation?.quantity} ml</div>
                    </div>
                  </div>

                  {donation?.recipient && (
                    <div className="flex items-center space-x-3 p-3 bg-white rounded-md border border-gray-200">
                      <Image
                        src={donation?.recipient?.avatar}
                        alt={donation?.recipient?.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">{donation?.recipient?.name}</div>
                        <div className="text-xs text-gray-500">Recipient</div>
                      </div>
                      {donation?.thankYouMessage && (
                        <Icon name="MessageCircle" size={16} className="text-primary" />
                      )}
                    </div>
                  )}

                  {donation?.thankYouMessage && (
                    <div className="mt-3 p-3 bg-primary/5 border border-primary/20 rounded-md">
                      <div className="flex items-start space-x-2">
                        <Icon name="Heart" size={16} className="text-primary mt-0.5" />
                        <div>
                          <div className="text-sm text-gray-700">{donation?.thankYouMessage}</div>
                          <div className="text-xs text-gray-500 mt-1">Thank you message</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default DonationTimeline;