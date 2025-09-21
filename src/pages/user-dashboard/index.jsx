import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import MetricsCard from './components/MetricsCard';
import DonationTimeline from './components/DonationTimeline';
import GamificationPanel from './components/GamificationPanel';
import UpcomingAppointments from './components/UpcomingAppointments';
import ActivityFeed from './components/ActivityFeed';
import QuickActions from './components/QuickActions';
import NotificationCenter from './components/NotificationCenter';
import AnalyticsWidget from './components/AnalyticsWidget';

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Mock user data
  const mockUser = {
    id: 1,
    name: "Rajesh Kumar",
    email: "rajesh.kumar@email.com",
    bloodType: "O+",
    phone: "+91 9876543210",
    location: "Mumbai, Maharashtra",
    available: true,
    role: "donor",
    joinDate: "2023-01-15",
    lastDonation: "2024-08-15",
    nextEligible: "2024-12-15",
    totalDonations: 12,
    livesImpacted: 36,
    currentStreak: 8,
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  };

  // Mock metrics data
  const metricsData = [
    {
      title: "Total Donations",
      value: "12",
      subtitle: "Blood donations completed",
      icon: "Heart",
      color: "primary",
      trend: { direction: "up", percentage: 15 }
    },
    {
      title: "Lives Impacted",
      value: "36",
      subtitle: "Estimated recipients helped",
      icon: "Users",
      color: "success",
      trend: { direction: "up", percentage: 25 }
    },
    {
      title: "Current Streak",
      value: "8",
      subtitle: "Consecutive months donating",
      icon: "Flame",
      color: "warning",
      trend: { direction: "up", percentage: 12 }
    },
    {
      title: "Next Eligible",
      value: "15 days",
      subtitle: "Until next donation",
      icon: "Calendar",
      color: "secondary"
    }
  ];

  // Mock donation history
  const donationHistory = [
    {
      id: 1,
      hospital: "Lilavati Hospital",
      location: "Bandra, Mumbai",
      date: "15 Aug 2024",
      time: "10:30 AM",
      bloodType: "O+",
      quantity: 450,
      status: "completed",
      recipient: {
        name: "Priya Sharma",
        avatar: "https://randomuser.me/api/portraits/women/25.jpg"
      },
      thankYouMessage: "Thank you so much for saving my life! Your donation helped me during my surgery. I am forever grateful."
    },
    {
      id: 2,
      hospital: "KEM Hospital",
      location: "Parel, Mumbai",
      date: "20 Jun 2024",
      time: "2:15 PM",
      bloodType: "O+",
      quantity: 450,
      status: "completed",
      recipient: {
        name: "Amit Patel",
        avatar: "https://randomuser.me/api/portraits/men/45.jpg"
      },
      thankYouMessage: "Your generosity gave me a second chance at life. Thank you from the bottom of my heart."
    },
    {
      id: 3,
      hospital: "Hinduja Hospital",
      location: "Mahim, Mumbai",
      date: "25 Apr 2024",
      time: "11:00 AM",
      bloodType: "O+",
      quantity: 450,
      status: "completed"
    }
  ];

  // Mock badges and achievements
  const badges = [
    {
      id: 1,
      name: "First Drop",
      description: "First donation",
      type: "first_donation",
      level: "bronze",
      earnedDate: "15 Jan 2023",
      isNew: false
    },
    {
      id: 2,
      name: "Life Saver",
      description: "10+ donations",
      type: "life_saver",
      level: "gold",
      earnedDate: "20 Jun 2024",
      isNew: false
    },
    {
      id: 3,
      name: "Streak Master",
      description: "6 month streak",
      type: "streak_master",
      level: "silver",
      earnedDate: "15 Aug 2024",
      isNew: true
    },
    {
      id: 4,
      name: "Community Hero",
      description: "Top 10 donor",
      type: "community_hero",
      level: "platinum",
      earnedDate: "01 Sep 2024",
      isNew: true
    }
  ];

  const achievements = [
    {
      id: 1,
      name: "Regular Donor",
      description: "Donate 20 times",
      icon: "Calendar",
      current: 12,
      target: 20
    },
    {
      id: 2,
      name: "Year Long Streak",
      description: "12 consecutive months",
      icon: "Flame",
      current: 8,
      target: 12
    },
    {
      id: 3,
      name: "Community Leader",
      description: "Top 5 in city",
      icon: "Trophy",
      current: 7,
      target: 5
    }
  ];

  const leaderboard = [
    { id: 1, name: "Arjun Singh", location: "Mumbai", donations: 45, isCurrentUser: false },
    { id: 2, name: "Sneha Reddy", location: "Mumbai", donations: 38, isCurrentUser: false },
    { id: 3, name: "Vikram Joshi", location: "Mumbai", donations: 32, isCurrentUser: false },
    { id: 4, name: "Kavya Nair", location: "Mumbai", donations: 28, isCurrentUser: false },
    { id: 5, name: "Rohit Gupta", location: "Mumbai", donations: 25, isCurrentUser: false },
    { id: 6, name: "Anita Desai", location: "Mumbai", donations: 22, isCurrentUser: false },
    { id: 7, name: "Rajesh Kumar", location: "Mumbai", donations: 12, isCurrentUser: true }
  ];

  // Mock upcoming appointments
  const upcomingAppointments = [
    {
      id: 1,
      hospital: "Tata Memorial Hospital",
      address: "Dr. E Borges Road, Parel, Mumbai",
      date: "25 Dec 2024",
      time: "10:00 AM",
      bloodType: "O+",
      duration: "45 minutes",
      distance: "2.5 km",
      urgency: "high",
      specialInstructions: "Please arrive 15 minutes early for pre-donation screening. Ensure you have had a proper meal 2-3 hours before donation."
    }
  ];

  // Mock activity feed
  const activityFeed = [
    {
      id: 1,
      type: "thank_you",
      title: "Thank you message received",
      description: "Priya Sharma sent you a thank you message",
      timestamp: new Date(Date.now() - 3600000),
      thankYouMessage: "Thank you so much for saving my life! Your donation helped me during my surgery.",
      sender: {
        name: "Priya Sharma",
        avatar: "https://randomuser.me/api/portraits/women/25.jpg"
      }
    },
    {
      id: 2,
      type: "badge_earned",
      title: "New badge earned!",
      description: "You earned the \'Community Hero\' badge",
      timestamp: new Date(Date.now() - 7200000),
      metadata: {
        badgeName: "Community Hero"
      }
    },
    {
      id: 3,
      type: "donation",
      title: "Donation completed",
      description: "Successfully donated at Lilavati Hospital",
      timestamp: new Date(Date.now() - 86400000 * 7),
      metadata: {
        hospital: "Lilavati Hospital",
        bloodType: "O+"
      }
    },
    {
      id: 4,
      type: "milestone",
      title: "Milestone achieved!",
      description: "You've now impacted 36 lives with your donations",
      timestamp: new Date(Date.now() - 86400000 * 10),
      metadata: {
        milestone: "36 lives impacted"
      }
    }
  ];

  // Mock notifications
  const notifications = [
    {
      id: 1,
      type: "request",
      title: "Urgent Blood Request",
      message: "O+ blood needed at KEM Hospital for emergency surgery",
      timestamp: new Date(Date.now() - 1800000),
      read: false,
      priority: "high",
      metadata: {
        location: "KEM Hospital, Parel",
        bloodType: "O+",
        urgency: "high"
      },
      details: "A 35-year-old patient requires immediate O+ blood for emergency surgery. The hospital is 3.2 km from your location.",
      actions: [
        { id: 1, label: "Respond", icon: "Heart", primary: true },
        { id: 2, label: "Share", icon: "Share", primary: false }
      ]
    },
    {
      id: 2,
      type: "match",
      title: "Donor Match Found",
      message: "You\'ve been matched with a blood request in your area",
      timestamp: new Date(Date.now() - 3600000),
      read: false,
      priority: "medium",
      metadata: {
        location: "Hinduja Hospital, Mahim",
        bloodType: "O+"
      },
      details: "A patient at Hinduja Hospital needs O+ blood. You're one of 5 compatible donors in the area.",
      actions: [
        { id: 1, label: "Accept", icon: "Check", primary: true },
        { id: 2, label: "Decline", icon: "X", primary: false }
      ]
    },
    {
      id: 3,
      type: "appointment",
      title: "Appointment Reminder",
      message: "Your donation appointment is tomorrow at 10:00 AM",
      timestamp: new Date(Date.now() - 7200000),
      read: true,
      priority: "medium",
      metadata: {
        location: "Tata Memorial Hospital"
      },
      details: "Don't forget your upcoming donation appointment. Please arrive 15 minutes early.",
      actions: [
        { id: 1, label: "Confirm", icon: "Check", primary: true },
        { id: 2, label: "Reschedule", icon: "Calendar", primary: false }
      ]
    }
  ];

  // Mock analytics data
  const donationTrends = [
    { month: 'Jan', donations: 1 },
    { month: 'Feb', donations: 1 },
    { month: 'Mar', donations: 1 },
    { month: 'Apr', donations: 1 },
    { month: 'May', donations: 0 },
    { month: 'Jun', donations: 1 },
    { month: 'Jul', donations: 1 },
    { month: 'Aug', donations: 1 },
    { month: 'Sep', donations: 1 },
    { month: 'Oct', donations: 1 },
    { month: 'Nov', donations: 1 },
    { month: 'Dec', donations: 1 }
  ];

  const impactStats = [
    { category: 'Emergency', value: 8 },
    { category: 'Surgery', value: 15 },
    { category: 'Cancer', value: 7 },
    { category: 'Accident', value: 6 }
  ];

  const bloodTypeDistribution = [
    { name: 'O+', value: 35 },
    { name: 'A+', value: 25 },
    { name: 'B+', value: 20 },
    { name: 'AB+', value: 10 },
    { name: 'O-', value: 6 },
    { name: 'Others', value: 4 }
  ];

  useEffect(() => {
    // Simulate loading user data
    const loadUserData = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setUser(mockUser);
      } catch (error) {
        console.error('Failed to load user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, []);

  const handleStatusUpdate = (updatedUser) => {
    setUser(updatedUser);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Heart" size={32} className="text-primary heartbeat" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading Dashboard</h2>
          <p className="text-gray-500">Fetching your donation data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold">
                  {user?.avatar ? (
                    <img 
                      src={user?.avatar} 
                      alt={user?.name} 
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  ) : (
                    user?.name?.charAt(0)?.toUpperCase() || 'U'
                  )}
                </div>
                {user?.available && (
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-success rounded-full border-2 border-white"></div>
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Welcome back, {user?.name?.split(' ')?.[0] || 'User'}!
                </h1>
                <p className="text-gray-500">
                  {user?.bloodType} donor • {user?.location}
                </p>
                <div className="flex items-center space-x-4 mt-1">
                  <span className="text-sm text-gray-500">
                    Member since {new Date(user?.joinDate)?.toLocaleDateString('en-IN', { 
                      month: 'long', 
                      year: 'numeric' 
                    })}
                  </span>
                  <span className="text-sm text-gray-400">•</span>
                  <span className={`text-sm font-medium ${user?.available ? 'text-success' : 'text-gray-500'}`}>
                    {user?.available ? 'Available to donate' : 'Currently unavailable'}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={() => navigate('/emergency-blood-request')}
                iconName="AlertTriangle"
                iconPosition="left"
                className="emergency-pulse"
              >
                Emergency Request
              </Button>
              <Button
                variant="default"
                onClick={() => navigate('/map-based-donor-search')}
                iconName="MapPin"
                iconPosition="left"
              >
                Find Donors
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-8 space-y-8">
            {/* Metrics Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {metricsData?.map((metric, index) => (
                  <MetricsCard
                    key={metric?.title}
                    {...metric}
                    isLoading={false}
                  />
                ))}
              </div>
            </motion.div>

            {/* Donation Timeline */}
            <DonationTimeline donations={donationHistory} />

            {/* Upcoming Appointments */}
            <UpcomingAppointments appointments={upcomingAppointments} />

            {/* Analytics Widget */}
            <AnalyticsWidget
              donationTrends={donationTrends}
              impactStats={impactStats}
              bloodTypeDistribution={bloodTypeDistribution}
            />
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            {/* Quick Actions */}
            <QuickActions 
              user={user} 
              onStatusUpdate={handleStatusUpdate} 
            />

            {/* Notification Center */}
            <NotificationCenter notifications={notifications} />

            {/* Gamification Panel */}
            <GamificationPanel
              badges={badges}
              achievements={achievements}
              leaderboard={leaderboard}
              userRank={7}
            />

            {/* Activity Feed */}
            <ActivityFeed activities={activityFeed} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;