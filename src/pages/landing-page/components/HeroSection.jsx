import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      title: "Save Lives with Every Drop",
      subtitle: "Connect with blood donors instantly through AI-powered matching",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      cta: "Become a Donor"
    },
    {
      title: "Emergency Blood Requests",
      subtitle: "Get help when you need it most with real-time donor alerts",
      image: "https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=1200",
      cta: "Request Blood"
    },
    {
      title: "Join Our Community",
      subtitle: "Be part of a network that has saved over 50,000 lives",
      image: "https://images.pixabay.com/photo/2017/08/07/14/02/people-2604149_1280.jpg?auto=compress&cs=tinysrgb&w=1200",
      cta: "Get Started"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides?.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides?.length]);

  const handleDonorRegistration = () => {
    navigate('/donor-registration');
  };

  const handleEmergencyRequest = () => {
    navigate('/emergency-blood-request');
  };

  const handleFindDonors = () => {
    navigate('/map-based-donor-search');
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-primary/5 via-white to-secondary/5 overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-4 h-4 bg-primary rounded-full blood-drop"></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-secondary rounded-full blood-drop" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 left-1/4 w-5 h-5 bg-accent rounded-full blood-drop" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-1/3 w-2 h-2 bg-primary rounded-full blood-drop" style={{ animationDelay: '3s' }}></div>
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Main Heading */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="flex items-center space-x-3"
              >
                <div className="relative">
                  <Icon name="Heart" size={40} className="text-primary heartbeat" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full blood-drop"></div>
                </div>
                <span className="text-lg font-semibold text-secondary">BloodConnect Pro</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight"
              >
                {heroSlides?.[currentSlide]?.title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="text-xl text-gray-600 leading-relaxed"
              >
                {heroSlides?.[currentSlide]?.subtitle}
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                variant="default"
                size="lg"
                onClick={handleDonorRegistration}
                iconName="Heart"
                iconPosition="left"
                className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Become a Donor
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={handleEmergencyRequest}
                iconName="AlertCircle"
                iconPosition="left"
                className="border-2 border-secondary text-secondary hover:bg-secondary hover:text-white px-8 py-4 text-lg font-semibold transition-all duration-300"
              >
                Request Blood
              </Button>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">50K+</div>
                <div className="text-sm text-gray-600">Lives Saved</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">25K+</div>
                <div className="text-sm text-gray-600">Active Donors</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">98%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
            </motion.div>

            {/* Emergency Alert */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="bg-error/10 border border-error/20 rounded-lg p-4 flex items-center space-x-3"
            >
              <Icon name="AlertTriangle" size={20} className="text-error emergency-pulse" />
              <div className="flex-1">
                <div className="text-sm font-medium text-error">Emergency Alert</div>
                <div className="text-xs text-gray-600">3 urgent blood requests in your area</div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleFindDonors}
                className="text-error hover:bg-error/10"
              >
                Help Now
              </Button>
            </motion.div>
          </motion.div>

          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src={heroSlides?.[currentSlide]?.image}
                alt="Blood donation hero"
                className="w-full h-[600px] object-cover transition-all duration-1000"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              
              {/* Floating Stats Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.6 }}
                className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-success rounded-full flex items-center justify-center">
                      <Icon name="Users" size={20} className="text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">Active Now</div>
                      <div className="text-xs text-gray-600">1,247 donors online</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-primary">24/7</div>
                    <div className="text-xs text-gray-600">Available</div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Slide Indicators */}
            <div className="flex justify-center space-x-2 mt-6">
              {heroSlides?.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide ? 'bg-primary' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center space-y-2">
          <span className="text-sm text-gray-500">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Icon name="ChevronDown" size={20} className="text-gray-400" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;