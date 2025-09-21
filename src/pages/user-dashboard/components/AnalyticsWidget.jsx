import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';

const AnalyticsWidget = ({ donationTrends = [], impactStats = [], bloodTypeDistribution = [] }) => {
  const COLORS = ['#DC2626', '#059669', '#0369A1', '#F59E0B', '#7C3AED', '#EC4899'];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-modal">
          <p className="text-sm font-medium text-gray-900">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {entry?.name}: {entry?.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Analytics & Impact</h2>
        <div className="flex items-center space-x-2">
          <Icon name="BarChart3" size={20} className="text-gray-400" />
          <span className="text-sm text-gray-500">Personal Stats</span>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Donation Trends Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-50 rounded-lg p-4"
        >
          <h3 className="text-sm font-medium text-gray-700 mb-4">Monthly Donation Trends</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={donationTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                  axisLine={{ stroke: '#E5E7EB' }}
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                  axisLine={{ stroke: '#E5E7EB' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="donations" 
                  stroke="#DC2626" 
                  strokeWidth={3}
                  dot={{ fill: '#DC2626', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#DC2626', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Impact Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-50 rounded-lg p-4"
        >
          <h3 className="text-sm font-medium text-gray-700 mb-4">Community Impact</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={impactStats}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="category" 
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                  axisLine={{ stroke: '#E5E7EB' }}
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                  axisLine={{ stroke: '#E5E7EB' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="value" 
                  fill="#059669"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Blood Type Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-50 rounded-lg p-4"
        >
          <h3 className="text-sm font-medium text-gray-700 mb-4">Blood Type Distribution</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={bloodTypeDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {bloodTypeDistribution?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS?.[index % COLORS?.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {bloodTypeDistribution?.map((entry, index) => (
              <div key={entry?.name} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS?.[index % COLORS?.length] }}
                ></div>
                <span className="text-xs text-gray-600 font-mono">{entry?.name}</span>
                <span className="text-xs text-gray-500">({entry?.value}%)</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Key Metrics Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-50 rounded-lg p-4"
        >
          <h3 className="text-sm font-medium text-gray-700 mb-4">Key Insights</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-white rounded-md">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name="TrendingUp" size={16} className="text-primary" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">Donation Streak</div>
                  <div className="text-xs text-gray-500">Current active streak</div>
                </div>
              </div>
              <div className="text-lg font-bold text-primary">12 months</div>
            </div>

            <div className="flex items-center justify-between p-3 bg-white rounded-md">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
                  <Icon name="Users" size={16} className="text-success" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">Lives Impacted</div>
                  <div className="text-xs text-gray-500">Estimated recipients</div>
                </div>
              </div>
              <div className="text-lg font-bold text-success">36 people</div>
            </div>

            <div className="flex items-center justify-between p-3 bg-white rounded-md">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-warning/10 rounded-full flex items-center justify-center">
                  <Icon name="Award" size={16} className="text-warning" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">Community Rank</div>
                  <div className="text-xs text-gray-500">City leaderboard</div>
                </div>
              </div>
              <div className="text-lg font-bold text-warning">#7</div>
            </div>

            <div className="flex items-center justify-between p-3 bg-white rounded-md">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center">
                  <Icon name="Calendar" size={16} className="text-secondary" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">Next Eligible</div>
                  <div className="text-xs text-gray-500">Available to donate</div>
                </div>
              </div>
              <div className="text-lg font-bold text-secondary">15 days</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AnalyticsWidget;