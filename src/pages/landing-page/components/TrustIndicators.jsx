import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TrustIndicators = () => {
  const certifications = [
    {
      id: 'iso-27001',
      name: 'ISO 27001 Certified',
      description: 'Information Security Management',
      icon: 'Shield',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    },
    {
      id: 'hipaa',
      name: 'HIPAA Compliant',
      description: 'Healthcare Data Protection',
      icon: 'Lock',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      id: 'gdpr',
      name: 'GDPR Compliant',
      description: 'Data Privacy Regulation',
      icon: 'UserCheck',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      id: 'fda',
      name: 'FDA Guidelines',
      description: 'Blood Safety Standards',
      icon: 'CheckCircle',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    }
  ];

  const partners = [
    {
      id: 'aiims',
      name: 'AIIMS Delhi',
      type: 'Premier Hospital',
      logo: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      description: 'All India Institute of Medical Sciences'
    },
    {
      id: 'apollo',
      name: 'Apollo Hospitals',
      type: 'Healthcare Network',
      logo: 'https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=200',
      description: 'Leading healthcare provider'
    },
    {
      id: 'fortis',
      name: 'Fortis Healthcare',
      type: 'Medical Institution',
      logo: 'https://images.pixabay.com/photo/2017/10/04/09/56/laboratory-2815641_1280.jpg?auto=compress&cs=tinysrgb&w=200',
      description: 'Trusted medical partner'
    },
    {
      id: 'max',
      name: 'Max Healthcare',
      type: 'Hospital Chain',
      logo: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      description: 'Quality healthcare services'
    },
    {
      id: 'red-cross',
      name: 'Indian Red Cross',
      type: 'NGO Partner',
      logo: 'https://images.pexels.com/photos/6129507/pexels-photo-6129507.jpeg?auto=compress&cs=tinysrgb&w=200',
      description: 'Humanitarian organization'
    },
    {
      id: 'blood-bank',
      name: 'Central Blood Bank',
      type: 'Blood Bank Network',
      logo: 'https://images.pixabay.com/photo/2016/11/08/05/29/surgery-1807541_1280.jpg?auto=compress&cs=tinysrgb&w=200',
      description: 'Blood collection & storage'
    }
  ];

  const awards = [
    {
      id: 'healthcare-excellence',
      title: 'Healthcare Excellence Award 2024',
      organization: 'Ministry of Health & Family Welfare',
      icon: 'Award',
      color: 'text-warning'
    },
    {
      id: 'digital-india',
      title: 'Digital India Innovation Award',
      organization: 'Government of India',
      icon: 'Star',
      color: 'text-primary'
    },
    {
      id: 'social-impact',
      title: 'Social Impact Recognition',
      organization: 'United Nations India',
      icon: 'Heart',
      color: 'text-accent'
    },
    {
      id: 'startup-award',
      title: 'Best HealthTech Startup 2023',
      organization: 'NASSCOM',
      icon: 'Trophy',
      color: 'text-secondary'
    }
  ];

  const stats = [
    {
      value: '99.9%',
      label: 'Uptime Guarantee',
      description: 'Always available when you need us'
    },
    {
      value: '256-bit',
      label: 'SSL Encryption',
      description: 'Bank-grade security protection'
    },
    {
      value: '24/7',
      label: 'Support Available',
      description: 'Round-the-clock assistance'
    },
    {
      value: '< 2 min',
      label: 'Average Response',
      description: 'Emergency alert delivery time'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
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
            Trusted by Healthcare Leaders
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform meets the highest standards of security, compliance, and reliability in healthcare technology
          </p>
        </motion.div>

        {/* Security & Compliance */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Security & Compliance
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications?.map((cert, index) => (
              <motion.div
                key={cert?.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-card hover:shadow-modal transition-all duration-300 border border-gray-100 group"
              >
                <div className={`w-12 h-12 ${cert?.bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon name={cert?.icon} size={24} className={cert?.color} />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{cert?.name}</h4>
                <p className="text-sm text-gray-600">{cert?.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Hospital Partners */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Trusted Healthcare Partners
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {partners?.map((partner, index) => (
              <motion.div
                key={partner?.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white rounded-xl p-4 shadow-card hover:shadow-modal transition-all duration-300 border border-gray-100 group text-center"
              >
                <div className="relative mb-4">
                  <Image
                    src={partner?.logo}
                    alt={partner?.name}
                    className="w-16 h-16 rounded-lg object-cover mx-auto group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h4 className="font-semibold text-gray-900 text-sm mb-1">{partner?.name}</h4>
                <p className="text-xs text-gray-500 mb-2">{partner?.type}</p>
                <p className="text-xs text-gray-600">{partner?.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Awards & Recognition */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Awards & Recognition
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {awards?.map((award, index) => (
              <motion.div
                key={award?.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-card hover:shadow-modal transition-all duration-300 border border-gray-100 group text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon name={award?.icon} size={28} className={award?.color} />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2 text-sm leading-tight">{award?.title}</h4>
                <p className="text-xs text-gray-600">{award?.organization}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Trust Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-white rounded-2xl p-8 md:p-12 shadow-modal border border-gray-100"
        >
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Platform Reliability
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats?.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat?.value}
                </div>
                <div className="text-lg font-semibold text-gray-900 mb-1">
                  {stat?.label}
                </div>
                <div className="text-sm text-gray-600">
                  {stat?.description}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Government Approval */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center space-x-4 bg-white rounded-full px-8 py-4 shadow-card border border-gray-200">
            <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
              <Icon name="CheckCircle" size={20} className="text-success" />
            </div>
            <div className="text-left">
              <div className="font-semibold text-gray-900">Government Approved</div>
              <div className="text-sm text-gray-600">Ministry of Health & Family Welfare, India</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustIndicators;