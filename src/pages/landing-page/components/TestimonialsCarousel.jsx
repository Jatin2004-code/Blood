import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      role: "Blood Recipient",
      location: "Mumbai, Maharashtra",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      bloodType: "B+",
      story: `When my father needed emergency surgery, BloodConnect Pro helped us find 3 compatible donors within 15 minutes. The AI matching system was incredible - it connected us with donors who were not only nearby but also immediately available. The platform literally saved my father's life.`,
      rating: 5,
      date: "2 weeks ago",
      impact: "Life Saved",
      verified: true
    },
    {
      id: 2,
      name: "Dr. Rajesh Kumar",
      role: "Emergency Physician",
      location: "Delhi, India",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      bloodType: "O-",
      story: `As an emergency doctor, I've seen how critical blood availability is. BloodConnect Pro has revolutionized our hospital's blood procurement process. The real-time donor network and instant alerts have reduced our response time by 70%. It's an essential tool for any healthcare facility.`,
      rating: 5,
      date: "1 month ago",
      impact: "Hospital Partner",
      verified: true
    },
    {
      id: 3,
      name: "Amit Patel",
      role: "Regular Donor",
      location: "Ahmedabad, Gujarat",
      avatar: "https://randomuser.me/api/portraits/men/28.jpg",
      bloodType: "A+",
      story: `I've donated blood 47 times through BloodConnect Pro. The gamification features keep me motivated - I love earning badges and seeing my impact on the leaderboard. But more importantly, knowing that my donations have directly helped 23 people gives me immense satisfaction.`,
      rating: 5,
      date: "3 days ago",
      impact: "47 Donations",
      verified: true
    },
    {
      id: 4,
      name: "Sister Mary Joseph",
      role: "Hospital Administrator",
      location: "Kochi, Kerala",
      avatar: "https://randomuser.me/api/portraits/women/55.jpg",
      bloodType: "AB+",
      story: `Our hospital has been using BloodConnect Pro for 2 years. The platform's reliability and the quality of donors in the network is exceptional. The emergency alert system has helped us manage critical situations efficiently, and the donor verification process ensures safety.`,
      rating: 5,
      date: "1 week ago",
      impact: "2 Years Partner",
      verified: true
    },
    {
      id: 5,
      name: "Ravi Krishnan",
      role: "Blood Bank Manager",
      location: "Bangalore, Karnataka",
      avatar: "https://randomuser.me/api/portraits/men/38.jpg",
      bloodType: "O+",
      story: `BloodConnect Pro has transformed how we manage our blood inventory. The predictive analytics help us forecast demand, and the donor network ensures we never run short. The platform's integration with our existing systems was seamless.`,
      rating: 5,
      date: "5 days ago",
      impact: "Blood Bank",
      verified: true
    },
    {
      id: 6,
      name: "Anita Desai",
      role: "Thalassemia Patient\'s Mother",
      location: "Pune, Maharashtra",
      avatar: "https://randomuser.me/api/portraits/women/42.jpg",
      bloodType: "B-",
      story: `My daughter needs regular blood transfusions due to thalassemia. BloodConnect Pro has been a blessing - we have a network of regular donors who are always ready to help. The platform's scheduling feature helps us plan ahead, reducing stress during difficult times.`,
      rating: 5,
      date: "4 days ago",
      impact: "Regular Support",
      verified: true
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials?.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials?.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials?.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials?.length) % testimonials?.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const currentTestimonial = testimonials?.[currentIndex];

  const getImpactColor = (impact) => {
    if (impact?.includes('Life') || impact?.includes('Hospital') || impact?.includes('Blood Bank')) {
      return 'bg-primary text-white';
    }
    if (impact?.includes('Donations') || impact?.includes('Years')) {
      return 'bg-accent text-white';
    }
    return 'bg-secondary text-white';
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
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
            Stories That Inspire Us
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real experiences from donors, recipients, and healthcare professionals who trust BloodConnect Pro
          </p>
        </motion.div>

        {/* Main Testimonial */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl shadow-modal p-8 md:p-12 border border-gray-100"
            >
              {/* Quote Icon */}
              <div className="flex justify-center mb-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name="Quote" size={32} className="text-primary" />
                </div>
              </div>

              {/* Story */}
              <div className="text-center mb-8">
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed italic">
                  "{currentTestimonial?.story}"
                </p>
              </div>

              {/* Rating */}
              <div className="flex justify-center mb-8">
                <div className="flex space-x-1">
                  {[...Array(5)]?.map((_, i) => (
                    <Icon
                      key={i}
                      name="Star"
                      size={20}
                      className={i < currentTestimonial?.rating ? 'text-warning fill-current' : 'text-gray-300'}
                    />
                  ))}
                </div>
              </div>

              {/* Author Info */}
              <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Image
                      src={currentTestimonial?.avatar}
                      alt={currentTestimonial?.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    {currentTestimonial?.verified && (
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full flex items-center justify-center border-2 border-white">
                        <Icon name="Check" size={12} className="text-white" />
                      </div>
                    )}
                  </div>
                  <div className="text-center md:text-left">
                    <h4 className="font-semibold text-gray-900 text-lg">
                      {currentTestimonial?.name}
                    </h4>
                    <p className="text-gray-600">{currentTestimonial?.role}</p>
                    <p className="text-sm text-gray-500">{currentTestimonial?.location}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="font-mono text-lg font-bold text-primary">
                      {currentTestimonial?.bloodType}
                    </div>
                    <div className="text-xs text-gray-500">Blood Type</div>
                  </div>
                  <div className={`px-4 py-2 rounded-full text-sm font-medium ${getImpactColor(currentTestimonial?.impact)}`}>
                    {currentTestimonial?.impact}
                  </div>
                </div>
              </div>

              {/* Date */}
              <div className="text-center mt-6">
                <span className="text-sm text-gray-500">{currentTestimonial?.date}</span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors duration-200 z-10"
          >
            <Icon name="ChevronLeft" size={20} className="text-gray-600" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors duration-200 z-10"
          >
            <Icon name="ChevronRight" size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center space-x-2 mt-8">
          {testimonials?.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-primary w-8' : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Thumbnail Navigation */}
        <div className="mt-12 grid grid-cols-3 md:grid-cols-6 gap-4 max-w-2xl mx-auto">
          {testimonials?.map((testimonial, index) => (
            <button
              key={testimonial?.id}
              onClick={() => goToSlide(index)}
              className={`relative group transition-all duration-300 ${
                index === currentIndex ? 'scale-110' : 'opacity-60 hover:opacity-100'
              }`}
            >
              <Image
                src={testimonial?.avatar}
                alt={testimonial?.name}
                className="w-16 h-16 rounded-full object-cover mx-auto"
              />
              <div className="absolute inset-0 rounded-full bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              {index === currentIndex && (
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-primary rounded-full"></div>
              )}
            </button>
          ))}
        </div>

        {/* Auto-play Control */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="flex items-center space-x-2 px-4 py-2 bg-white rounded-full shadow-card border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
          >
            <Icon name={isAutoPlaying ? "Pause" : "Play"} size={16} className="text-gray-600" />
            <span className="text-sm text-gray-600">
              {isAutoPlaying ? 'Pause' : 'Play'} Auto-scroll
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;