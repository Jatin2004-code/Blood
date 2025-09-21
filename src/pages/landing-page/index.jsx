import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import HeroSection from './components/HeroSection';
import StatsCounter from './components/StatsCounter';
import FeaturesSection from './components/FeaturesSection';
import TestimonialsCarousel from './components/TestimonialsCarousel';
import TrustIndicators from './components/TrustIndicators';
import CallToAction from './components/CallToAction';

const LandingPage = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>BloodConnect Pro - Save Lives Through Smart Blood Donation</title>
        <meta 
          name="description" 
          content="Connect with blood donors instantly through AI-powered matching. Emergency blood requests, real-time alerts, and verified donor network. Join 50,000+ lives saved." 
        />
        <meta 
          name="keywords" 
          content="blood donation, emergency blood, blood donors, blood bank, AI matching, healthcare, life saving, blood request" 
        />
        <meta property="og:title" content="BloodConnect Pro - Save Lives Through Smart Blood Donation" />
        <meta 
          property="og:description" 
          content="Connect with blood donors instantly through AI-powered matching. Emergency blood requests, real-time alerts, and verified donor network." 
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bloodconnectpro.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="BloodConnect Pro - Save Lives Through Smart Blood Donation" />
        <meta 
          name="twitter:description" 
          content="Connect with blood donors instantly through AI-powered matching. Emergency blood requests, real-time alerts, and verified donor network." 
        />
        <link rel="canonical" href="https://bloodconnectpro.com" />
      </Helmet>

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <HeroSection />

        {/* Statistics Counter */}
        <StatsCounter />

        {/* Features Section */}
        <FeaturesSection />

        {/* Testimonials Carousel */}
        <TestimonialsCarousel />

        {/* Trust Indicators */}
        <TrustIndicators />

        {/* Call to Action */}
        <CallToAction />
      </div>
    </>
  );
};

export default LandingPage;