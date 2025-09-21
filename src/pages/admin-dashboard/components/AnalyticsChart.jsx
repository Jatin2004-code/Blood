import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AnalyticsChart = ({ title, type = 'bar', data = [], timeRange = '7d' }) => {
  const [selectedRange, setSelectedRange] = useState(timeRange);
  const [isExporting, setIsExporting] = useState(false);

  const mockData = {
    donations: [
      { name: 'Mon', value: 45, previous: 38 },
      { name: 'Tue', value: 52, previous: 42 },
      { name: 'Wed', value: 38, previous: 35 },
      { name: 'Thu', value: 61, previous: 48 },
      { name: 'Fri', value: 55, previous: 52 },
      { name: 'Sat', value: 67, previous: 58 },
      { name: 'Sun', value: 43, previous: 41 }
    ],
    bloodTypes: [
      { name: 'O+', value: 35, color: '#DC2626' },
      { name: 'A+', value: 28, color: '#059669' },
      { name: 'B+', value: 22, color: '#0369A1' },
      { name: 'AB+', value: 8, color: '#F59E0B' },
      { name: 'O-', value: 4, color: '#EF4444' },
      { name: 'A-', value: 2, color: '#10B981' },
      { name: 'B-', value: 1, color: '#3B82F6' }
    ],
    regions: [
      { name: 'Mumbai', value: 156, growth: 12 },
      { name: 'Delhi', value: 142, growth: 8 },
      { name: 'Bangalore', value: 128, growth: 15 },
      { name: 'Chennai', value: 98, growth: 6 },
      { name: 'Kolkata', value: 87, growth: 10 },
      { name: 'Hyderabad', value: 76, growth: 18 }
    ]
  };

  const timeRanges = [
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '3 Months' },
    { value: '1y', label: '1 Year' }
  ];

  const getChartData = () => {
    if (data?.length > 0) return data;
    
    switch (type) {
      case 'pie':
        return mockData?.bloodTypes;
      case 'line':
        return mockData?.donations;
      default:
        return mockData?.regions;
    }
  };

  const handleExport = async () => {
    setIsExporting(true);
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Exporting chart data...');
    setIsExporting(false);
  };

  const renderChart = () => {
    const chartData = getChartData();

    switch (type) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="name" stroke="#6B7280" fontSize={12} />
              <YAxis stroke="#6B7280" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#DC2626" 
                strokeWidth={3}
                dot={{ fill: '#DC2626', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#DC2626', strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="previous" 
                stroke="#9CA3AF" 
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        );

      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
                labelLine={false}
              >
                {chartData?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry?.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        );

      default:
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="name" stroke="#6B7280" fontSize={12} />
              <YAxis stroke="#6B7280" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar 
                dataKey="value" 
                fill="#DC2626" 
                radius={[4, 4, 0, 0]}
                opacity={0.8}
              />
            </BarChart>
          </ResponsiveContainer>
        );
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-card border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-600">Analytics overview for selected period</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
              {timeRanges?.map((range) => (
                <button
                  key={range?.value}
                  onClick={() => setSelectedRange(range?.value)}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors duration-200 ${
                    selectedRange === range?.value
                      ? 'bg-white text-primary shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {range?.label}
                </button>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleExport}
              loading={isExporting}
              iconName="Download"
            >
              Export
            </Button>
          </div>
        </div>
      </div>
      <div className="p-6">
        {renderChart()}
      </div>
      {type === 'bar' && (
        <div className="px-6 pb-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {getChartData()?.slice(0, 6)?.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="text-sm font-medium text-gray-900">{item?.name}</div>
                  <div className="text-xs text-gray-600">{item?.value} donors</div>
                </div>
                {item?.growth && (
                  <div className="flex items-center space-x-1 text-success">
                    <Icon name="TrendingUp" size={14} />
                    <span className="text-xs font-medium">+{item?.growth}%</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyticsChart;