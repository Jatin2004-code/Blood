import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const StatsCounter = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const stats = [
    {
      id: 'lives-saved',
      icon: 'Heart',
      label: 'Lives Saved',
      value: 52847,
      suffix: '+',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      description: 'Through successful blood donations'
    },
    {
      id: 'active-donors',
      icon: 'Users',
      label: 'Active Donors',
      value: 28394,
      suffix: '+',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      description: 'Verified and ready to help'
    },
    {
      id: 'successful-matches',
      icon: 'GitBranch',
      label: 'Successful Matches',
      value: 45621,
      suffix: '',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      description: 'AI-powered donor connections'
    },
    {
      id: 'response-time',
      icon: 'Clock',
      label: 'Avg Response Time',
      value: 12,
      suffix: ' min',
      color: 'text-success',
      bgColor: 'bg-success/10',
      description: 'Emergency request response'
    },
    {
      id: 'blood-banks',
      icon: 'Building',
      label: 'Partner Blood Banks',
      value: 156,
      suffix: '+',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      description: 'Across major cities'
    },
    {
      id: 'success-rate',
      icon: 'TrendingUp',
      label: 'Success Rate',
      value: 98.7,
      suffix: '%',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      description: 'Request fulfillment rate'
    }
  ];

  const [counters, setCounters] = useState(
    stats?.reduce((acc, stat) => ({ ...acc, [stat?.id]: 0 }), {})
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef?.current) {
      observer?.observe(sectionRef?.current);
    }

    return () => observer?.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const animateCounters = () => {
      stats?.forEach((stat) => {
        const duration = 2000; // 2 seconds
        const steps = 60;
        const increment = stat?.value / steps;
        let current = 0;
        let step = 0;

        const timer = setInterval(() => {
          step++;
          current = Math.min(stat?.value, increment * step);
          
          setCounters(prev => ({
            ...prev,
            [stat?.id]: current
          }));

          if (step >= steps) {
            clearInterval(timer);
            setCounters(prev => ({
              ...prev,
              [stat?.id]: stat?.value
            }));
          }
        }, duration / steps);
      });
    };

    const delay = setTimeout(animateCounters, 300);
    return () => clearTimeout(delay);
  }, [isVisible]);

  const formatNumber = (num, suffix) => {
    if (suffix === '%') {
      return num?.toFixed(1);
    }
    if (num >= 1000) {
      return (num / 1000)?.toFixed(num % 1000 === 0 ? 0 : 1) + 'K';
    }
    return Math.floor(num)?.toLocaleString();
  };

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-r from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Impact in Numbers
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real-time statistics showing how BloodConnect Pro is making a difference in saving lives across communities
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats?.map((stat, index) => (
            <motion.div
              key={stat?.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="bg-white rounded-2xl p-8 shadow-card hover:shadow-modal transition-all duration-300 border border-gray-100 group-hover:border-gray-200">
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${stat?.bgColor} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon name={stat?.icon} size={28} className={stat?.color} />
                </div>

                {/* Counter */}
                <div className="mb-4">
                  <div className={`text-4xl md:text-5xl font-bold ${stat?.color} mb-2`}>
                    {formatNumber(counters?.[stat?.id], stat?.suffix)}
                    <span className="text-2xl">{stat?.suffix}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {stat?.label}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {stat?.description}
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isVisible ? { width: '100%' } : {}}
                    transition={{ duration: 2, delay: index * 0.1 + 0.5 }}
                    className={`h-2 rounded-full ${stat?.color?.replace('text-', 'bg-')}`}
                  />
                </div>

                {/* Live Indicator */}
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span className="text-xs text-gray-500 font-medium">Live Data</span>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Real-time Updates */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center space-x-3 bg-white rounded-full px-6 py-3 shadow-card border border-gray-200">
            <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-700">
              Last updated: {new Date()?.toLocaleTimeString()}
            </span>
            <Icon name="RefreshCw" size={16} className="text-gray-400" />
          </div>
        </motion.div>

        {/* Achievement Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { icon: 'Award', label: 'Healthcare Excellence Award 2024', color: 'text-warning' },
            { icon: 'Shield', label: 'ISO 27001 Certified', color: 'text-secondary' },
            { icon: 'Star', label: '4.9/5 User Rating', color: 'text-accent' },
            { icon: 'CheckCircle', label: 'Government Approved', color: 'text-success' }
          ]?.map((badge, index) => (
            <div key={index} className="text-center group">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 group-hover:bg-gray-200 transition-colors duration-300 mb-3">
                <Icon name={badge?.icon} size={20} className={badge?.color} />
              </div>
              <p className="text-xs text-gray-600 font-medium">{badge?.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default StatsCounter;