import { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Eye, 
  MessageSquare, 
  DollarSign, 
  Car,
  Calendar,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';
import { motion } from 'framer-motion';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('30days');

  const stats = {
    totalViews: 2847,
    viewsChange: 15.3,
    totalInquiries: 156,
    inquiriesChange: 8.7,
    avgResponseTime: '2.5 hours',
    responseChange: -12.5,
    conversionRate: 5.5,
    conversionChange: 2.1
  };

  const viewsData = [
    { date: 'Jan 15', views: 145, inquiries: 8 },
    { date: 'Jan 16', views: 178, inquiries: 12 },
    { date: 'Jan 17', views: 156, inquiries: 9 },
    { date: 'Jan 18', views: 198, inquiries: 15 },
    { date: 'Jan 19', views: 223, inquiries: 18 },
    { date: 'Jan 20', views: 189, inquiries: 11 },
    { date: 'Jan 21', views: 245, inquiries: 21 }
  ];

  const topPerformingCars = [
    {
      id: 1,
      title: 'Toyota Corolla GLi 2020',
      views: 456,
      inquiries: 28,
      conversionRate: 6.1,
      image: 'https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=400'
    },
    {
      id: 2,
      title: 'Honda Civic Oriel 2021',
      views: 389,
      inquiries: 24,
      conversionRate: 6.2,
      image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=400'
    },
    {
      id: 3,
      title: 'Suzuki Cultus VXL 2020',
      views: 312,
      inquiries: 19,
      conversionRate: 6.1,
      image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400'
    }
  ];

  const inquirySourceData = [
    { source: 'Direct Search', count: 68, percentage: 43.6 },
    { source: 'Featured Listing', count: 42, percentage: 26.9 },
    { source: 'Similar Cars', count: 28, percentage: 17.9 },
    { source: 'Social Media', count: 18, percentage: 11.5 }
  ];

  const StatCard = ({ icon: Icon, title, value, change, subtitle }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-purple-100 rounded-lg">
          <Icon className="w-6 h-6 text-purple-600" />
        </div>
        <div className={`flex items-center gap-1 text-sm font-medium ${
          change >= 0 ? 'text-green-600' : 'text-red-600'
        }`}>
          {change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          {Math.abs(change)}%
        </div>
      </div>
      <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
      <p className="text-sm text-gray-600 mt-1">{title}</p>
      {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Sales Analytics</h1>
              <p className="text-gray-600 mt-2">Track your listing performance and insights</p>
            </div>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
              <option value="year">This Year</option>
            </select>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Eye}
            title="Total Views"
            value={stats.totalViews.toLocaleString()}
            change={stats.viewsChange}
            subtitle="Across all listings"
          />
          <StatCard
            icon={MessageSquare}
            title="Total Inquiries"
            value={stats.totalInquiries}
            change={stats.inquiriesChange}
            subtitle="From potential buyers"
          />
          <StatCard
            icon={Activity}
            title="Avg Response Time"
            value={stats.avgResponseTime}
            change={stats.responseChange}
            subtitle="To buyer inquiries"
          />
          <StatCard
            icon={TrendingUp}
            title="Conversion Rate"
            value={`${stats.conversionRate}%`}
            change={stats.conversionChange}
            subtitle="Views to inquiries"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Views & Inquiries Chart */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Views & Inquiries Trend</h2>
              <BarChart3 className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {viewsData.map((data, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{data.date}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-purple-600 font-medium">{data.views} views</span>
                      <span className="text-green-600 font-medium">{data.inquiries} inquiries</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1 bg-gray-200 rounded-lg h-2 overflow-hidden">
                      <div
                        className="bg-purple-600 h-full rounded-lg"
                        style={{ width: `${(data.views / 250) * 100}%` }}
                      />
                    </div>
                    <div className="flex-1 bg-gray-200 rounded-lg h-2 overflow-hidden">
                      <div
                        className="bg-green-600 h-full rounded-lg"
                        style={{ width: `${(data.inquiries / 25) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Inquiry Sources */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Inquiry Sources</h2>
              <PieChart className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {inquirySourceData.map((source, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-700">{source.source}</span>
                    <span className="text-sm font-semibold text-gray-900">{source.count}</span>
                  </div>
                  <div className="bg-gray-200 rounded-lg h-2 overflow-hidden">
                    <div
                      className="bg-purple-600 h-full rounded-lg transition-all duration-500"
                      style={{ width: `${source.percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{source.percentage}% of total</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Performing Cars */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Top Performing Listings</h2>
          <div className="space-y-4">
            {topPerformingCars.map((car, index) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-purple-300 transition-colors"
              >
                <div className="flex items-center justify-center w-8 h-8 bg-purple-100 text-purple-600 font-bold rounded-full">
                  {index + 1}
                </div>
                <img
                  src={car.image}
                  alt={car.title}
                  className="w-24 h-20 object-cover rounded-full"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{car.title}</h3>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {car.views} views
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-4 h-4" />
                      {car.inquiries} inquiries
                    </span>
                    <span className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      {car.conversionRate}% conversion
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Additional Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Best Day</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">Saturday</p>
            <p className="text-sm text-gray-600 mt-1">Most inquiries received</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Activity className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Peak Hours</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">2 PM - 6 PM</p>
            <p className="text-sm text-gray-600 mt-1">Highest activity period</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Car className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Avg Time to Sell</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">18 days</p>
            <p className="text-sm text-gray-600 mt-1">From listing to sale</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
