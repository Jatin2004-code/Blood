import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const FeaturesSection = () => {
  const features = [
    {
      id: 'ai-matching',
      icon: 'Brain',
      title: 'AI-Powered Matching',
      description: 'Advanced algorithms match donors with recipients based on blood type, location, and availability in real-time.',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      features: ['Smart Location Matching', 'Blood Type Compatibility', 'Availability Prediction', 'Priority Scoring'],
      color: 'primary'
    },
    {
      id: 'emergency-alerts',
      icon: 'AlertTriangle',
      title: 'Emergency Alert System',
      description: 'Instant notifications to nearby donors when emergency blood requests are made, ensuring rapid response.',
      image: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=600',
      features: ['Real-time Notifications', 'Geofenced Alerts', 'Priority Levels', 'Multi-channel Delivery'],
      color: 'error'
    },
    {
      id: 'gamification',
      icon: 'Trophy',
      title: 'Gamification & Rewards',
      description: 'Earn badges, maintain streaks, and climb leaderboards while contributing to your community.',
      image: 'https://images.pixabay.com/photo/2017/08/07/14/02/people-2604149_1280.jpg?auto=compress&cs=tinysrgb&w=600',
      features: ['Achievement Badges', 'Donation Streaks', 'Community Leaderboards', 'Reward Points'],
      color: 'accent'
    },
    {
      id: 'privacy-security',
      icon: 'Shield',
      title: 'Privacy & Security',
      description: 'Bank-grade encryption and privacy controls ensure your personal information remains secure.',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      features: ['End-to-end Encryption', 'Privacy Controls', 'Secure Authentication', 'Data Protection'],
      color: 'secondary'
    },
    {
      id: 'real-time-tracking',
      icon: 'MapPin',
      title: 'Real-time Tracking',
      description: 'Track donation requests, donor responses, and delivery status with live updates.',
      image: 'https://images.pexels.com/photos/1036936/pexels-photo-1036936.jpeg?auto=compress&cs=tinysrgb&w=600',
      features: ['Live Status Updates', 'GPS Tracking', 'Delivery Confirmation', 'Timeline View'],
      color: 'success'
    },
    {
      id: 'community-network',
      icon: 'Users',
      title: 'Community Network',
      description: 'Connect with a verified network of donors, hospitals, and blood banks in your area.',
      image: 'https://images.pixabay.com/photo/2016/11/29/06/15/adult-1867743_1280.jpg?auto=compress&cs=tinysrgb&w=600',
      features: ['Verified Network', 'Hospital Partnerships', 'Blood Bank Integration', 'Community Events'],
      color: 'warning'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const getColorClasses = (color) => {
    const colorMap = {
      primary: {
        text: 'text-primary',
        bg: 'bg-primary/10',
        border: 'border-primary/20',
        hover: 'hover:bg-primary/20'
      },
      error: {
        text: 'text-error',
        bg: 'bg-error/10',
        border: 'border-error/20',
        hover: 'hover:bg-error/20'
      },
      accent: {
        text: 'text-accent',
        bg: 'bg-accent/10',
        border: 'border-accent/20',
        hover: 'hover:bg-accent/20'
      },
      secondary: {
        text: 'text-secondary',
        bg: 'bg-secondary/10',
        border: 'border-secondary/20',
        hover: 'hover:bg-secondary/20'
      },
      success: {
        text: 'text-success',
        bg: 'bg-success/10',
        border: 'border-success/20',
        hover: 'hover:bg-success/20'
      },
      warning: {
        text: 'text-warning',
        bg: 'bg-warning/10',
        border: 'border-warning/20',
        hover: 'hover:bg-warning/20'
      }
    };
    return colorMap?.[color] || colorMap?.primary;
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Powerful Features for Life-Saving Connections
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform combines cutting-edge technology with human compassion to create the most effective blood donation network
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          {features?.map((feature, index) => {
            const colors = getColorClasses(feature?.color);
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={feature?.id}
                variants={itemVariants}
                className="group"
              >
                <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-center`}>
                  {/* Image */}
                  <div className="flex-1 relative">
                    <div className="relative overflow-hidden rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                      <Image
                        src={feature?.image}
                        alt={feature?.title}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                      
                      {/* Floating Icon */}
                      <div className={`absolute top-4 ${isEven ? 'right-4' : 'left-4'} w-12 h-12 ${colors?.bg} ${colors?.border} border rounded-xl flex items-center justify-center backdrop-blur-sm`}>
                        <Icon name={feature?.icon} size={24} className={colors?.text} />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        {feature?.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {feature?.description}
                      </p>
                    </div>

                    {/* Feature List */}
                    <div className="space-y-3">
                      {feature?.features?.map((item, itemIndex) => (
                        <motion.div
                          key={itemIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: itemIndex * 0.1, duration: 0.4 }}
                          className="flex items-center space-x-3"
                        >
                          <div className={`w-6 h-6 ${colors?.bg} rounded-full flex items-center justify-center`}>
                            <Icon name="Check" size={14} className={colors?.text} />
                          </div>
                          <span className="text-sm font-medium text-gray-700">{item}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Learn More Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`inline-flex items-center space-x-2 px-6 py-3 ${colors?.bg} ${colors?.text} rounded-lg font-medium ${colors?.hover} transition-all duration-300 group/btn`}
                    >
                      <span>Learn More</span>
                      <Icon 
                        name="ArrowRight" 
                        size={16} 
                        className="group-hover/btn:translate-x-1 transition-transform duration-300" 
                      />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Ready to Make a Difference?
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of donors who are already using BloodConnect Pro to save lives in their communities
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-primary text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Start Saving Lives
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-secondary text-secondary rounded-lg font-semibold hover:bg-secondary hover:text-white transition-all duration-300"
              >
                Watch Demo
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;