import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CallToAction = () => {
  const navigate = useNavigate();

  const handleDonorRegistration = () => {
    navigate('/donor-registration');
  };

  const handleEmergencyRequest = () => {
    navigate('/emergency-blood-request');
  };

  const handleFindDonors = () => {
    navigate('/map-based-donor-search');
  };

  const ctaOptions = [
    {
      id: 'become-donor',
      title: 'Become a Life Saver',
      description: 'Join our community of verified blood donors and help save lives in your area',
      icon: 'Heart',
      action: handleDonorRegistration,
      buttonText: 'Register as Donor',
      buttonVariant: 'default',
      color: 'primary',
      bgGradient: 'from-primary/10 to-primary/5',
      features: ['Verified Profile', 'Smart Matching', 'Earn Rewards', 'Track Impact']
    },
    {
      id: 'request-blood',
      title: 'Need Blood Urgently?',
      description: 'Connect with compatible donors instantly through our AI-powered matching system',
      icon: 'AlertCircle',
      action: handleEmergencyRequest,
      buttonText: 'Request Blood Now',
      buttonVariant: 'destructive',
      color: 'error',
      bgGradient: 'from-error/10 to-error/5',
      features: ['Instant Alerts', 'Real-time Matching', '24/7 Support', 'Emergency Priority']
    },
    {
      id: 'find-donors',
      title: 'Explore Donor Network',
      description: 'Browse our verified donor community and find compatible matches near you',
      icon: 'MapPin',
      action: handleFindDonors,
      buttonText: 'Find Donors',
      buttonVariant: 'secondary',
      color: 'secondary',
      bgGradient: 'from-secondary/10 to-secondary/5',
      features: ['Location-based', 'Advanced Filters', 'Donor Profiles', 'Availability Status']
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      primary: {
        text: 'text-primary',
        bg: 'bg-primary/10',
        border: 'border-primary/20',
        icon: 'text-primary'
      },
      error: {
        text: 'text-error',
        bg: 'bg-error/10',
        border: 'border-error/20',
        icon: 'text-error'
      },
      secondary: {
        text: 'text-secondary',
        bg: 'bg-secondary/10',
        border: 'border-secondary/20',
        icon: 'text-secondary'
      }
    };
    return colorMap?.[color] || colorMap?.primary;
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-accent rounded-full blur-3xl"></div>
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main CTA Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Join thousands of people who are already using BloodConnect Pro to save lives and build stronger communities
          </p>
          
          {/* Emergency Stats */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 mb-8">
            <div className="flex items-center space-x-2 text-error">
              <Icon name="AlertTriangle" size={20} className="emergency-pulse" />
              <span className="text-sm font-medium">5 urgent requests in your area</span>
            </div>
            <div className="flex items-center space-x-2 text-success">
              <Icon name="Users" size={20} />
              <span className="text-sm font-medium">1,247 donors online now</span>
            </div>
            <div className="flex items-center space-x-2 text-warning">
              <Icon name="Clock" size={20} />
              <span className="text-sm font-medium">Avg response: 12 minutes</span>
            </div>
          </div>
        </motion.div>

        {/* CTA Options Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {ctaOptions?.map((option, index) => {
            const colors = getColorClasses(option?.color);
            
            return (
              <motion.div
                key={option?.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group"
              >
                <div className={`bg-white rounded-2xl p-8 shadow-modal hover:shadow-2xl transition-all duration-300 border border-gray-200 group-hover:border-gray-300 bg-gradient-to-br ${option?.bgGradient} relative overflow-hidden`}>
                  {/* Background Pattern */}
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                    <Icon name={option?.icon} size={128} className={colors?.icon} />
                  </div>

                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 ${colors?.bg} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon name={option?.icon} size={32} className={colors?.icon} />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {option?.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {option?.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-3 mb-8">
                    {option?.features?.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-3">
                        <div className={`w-5 h-5 ${colors?.bg} rounded-full flex items-center justify-center`}>
                          <Icon name="Check" size={12} className={colors?.icon} />
                        </div>
                        <span className="text-sm font-medium text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Button
                    variant={option?.buttonVariant}
                    fullWidth
                    size="lg"
                    onClick={option?.action}
                    iconName={option?.icon}
                    iconPosition="left"
                    className="font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:scale-105"
                  >
                    {option?.buttonText}
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 mb-8">
            <div className="flex items-center space-x-2 text-gray-300">
              <Icon name="Shield" size={20} className="text-success" />
              <span className="text-sm">Secure & Private</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-300">
              <Icon name="CheckCircle" size={20} className="text-success" />
              <span className="text-sm">Government Approved</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-300">
              <Icon name="Users" size={20} className="text-success" />
              <span className="text-sm">50,000+ Lives Saved</span>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h4 className="text-lg font-semibold text-white mb-4">
              Need Help Getting Started?
            </h4>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="flex items-center space-x-2 text-gray-300">
                <Icon name="Phone" size={16} />
                <span className="text-sm">24/7 Support: 1800-BLOOD-HELP</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Icon name="Mail" size={16} />
                <span className="text-sm">help@bloodconnectpro.com</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;