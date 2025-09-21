import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const GamificationPanel = ({ badges = [], achievements = [], leaderboard = [], userRank = 0 }) => {
  const badgeColors = {
    bronze: 'bg-amber-100 text-amber-800 border-amber-200',
    silver: 'bg-gray-100 text-gray-800 border-gray-200',
    gold: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    platinum: 'bg-purple-100 text-purple-800 border-purple-200'
  };

  const getBadgeIcon = (type) => {
    switch (type) {
      case 'first_donation':
        return 'Heart';
      case 'streak_master':
        return 'Flame';
      case 'life_saver':
        return 'Shield';
      case 'community_hero':
        return 'Users';
      case 'regular_donor':
        return 'Calendar';
      default:
        return 'Award';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Achievements</h2>
        <div className="flex items-center space-x-2">
          <Icon name="Trophy" size={20} className="text-warning" />
          <span className="text-sm text-gray-500">Rank #{userRank}</span>
        </div>
      </div>
      {/* Badges Section */}
      <div className="mb-8">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Earned Badges</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {badges?.map((badge, index) => (
            <motion.div
              key={badge?.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`relative p-4 rounded-lg border-2 ${badgeColors?.[badge?.level]} text-center`}
            >
              <div className="w-12 h-12 mx-auto mb-2 relative">
                <Icon name={getBadgeIcon(badge?.type)} size={32} />
                {badge?.isNew && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                )}
              </div>
              <div className="text-xs font-medium">{badge?.name}</div>
              <div className="text-xs opacity-75 mt-1">{badge?.description}</div>
              {badge?.earnedDate && (
                <div className="text-xs opacity-60 mt-2">{badge?.earnedDate}</div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
      {/* Achievements Progress */}
      <div className="mb-8">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Achievement Progress</h3>
        <div className="space-y-4">
          {achievements?.map((achievement, index) => (
            <motion.div
              key={achievement?.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <Icon name={achievement?.icon} size={20} className="text-gray-600" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">{achievement?.name}</div>
                    <div className="text-xs text-gray-500">{achievement?.description}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">
                    {achievement?.current}/{achievement?.target}
                  </div>
                  <div className="text-xs text-gray-500">
                    {Math.round((achievement?.current / achievement?.target) * 100)}%
                  </div>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(achievement?.current / achievement?.target) * 100}%` }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                  className="bg-primary h-2 rounded-full"
                ></motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      {/* Leaderboard */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-4">Community Leaderboard</h3>
        <div className="space-y-3">
          {leaderboard?.slice(0, 5)?.map((user, index) => (
            <motion.div
              key={user?.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center space-x-3 p-3 rounded-lg ${
                user?.isCurrentUser ? 'bg-primary/10 border border-primary/20' : 'bg-gray-50'
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                index === 0 ? 'bg-yellow-500 text-white' :
                index === 1 ? 'bg-gray-400 text-white' :
                index === 2 ? 'bg-amber-600 text-white': 'bg-gray-200 text-gray-600'
              }`}>
                {index < 3 ? (
                  <Icon name="Crown" size={16} />
                ) : (
                  index + 1
                )}
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900">
                  {user?.name}
                  {user?.isCurrentUser && (
                    <span className="ml-2 text-xs text-primary font-medium">(You)</span>
                  )}
                </div>
                <div className="text-xs text-gray-500">{user?.location}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">{user?.donations}</div>
                <div className="text-xs text-gray-500">donations</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GamificationPanel;