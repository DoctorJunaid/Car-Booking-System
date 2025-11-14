import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Car, 
  DollarSign, 
  Eye, 
  MessageSquare, 
  TrendingUp, 
  Plus,
  Edit,
  Trash2,
  BarChart3,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { getAllCars, getStats } from '../../utils/carData';

const SellerDashboard = () => {
  const [stats, setStats] = useState({
    totalListings: 0,
    activeListings: 0,
    soldCars: 0,
    totalRevenue: 0,
    totalViews: 0,
    totalInquiries: 0,
    pendingInquiries: 23,
    avgResponseTime: '2.5 hours'
  });

  const [recentListings, setRecentListings] = useState([]);

  useEffect(() => {
    const allCars = getAllCars();
    const carStats = getStats();
    
    // Calculate revenue from sold cars
    const soldCars = allCars.filter(c => c.status === 'sold');
    const totalRevenue = soldCars.reduce((sum, car) => sum + car.price, 0);
    
    setStats({
      totalListings: carStats.total,
      activeListings: carStats.active,
      soldCars: soldCars.length,
      totalRevenue: totalRevenue,
      totalViews: carStats.totalViews,
      totalInquiries: carStats.totalInquiries,
      pendingInquiries: 23,
      avgResponseTime: '2.5 hours'
    });

    // Get recent 3 listings
    const recent = allCars
      .sort((a, b) => new Date(b.listedDate) - new Date(a.listedDate))
      .slice(0, 3)
      .map(car => ({
        id: car.id,
        title: car.title,
        price: car.price,
        status: car.status,
        views: car.views,
        inquiries: car.inquiries,
        image: car.imageUrl,
        listedDate: car.listedDate
      }));
    
    setRecentListings(recent);
  }, []);

  const [recentInquiries, setRecentInquiries] = useState([
    {
      id: 1,
      carTitle: 'Toyota Corolla 2020',
      buyerName: 'Ahmed Khan',
      message: 'Is this car still available? Can we schedule a test drive?',
      time: '2 hours ago',
      status: 'pending'
    },
    {
      id: 2,
      carTitle: 'Honda Civic 2021',
      buyerName: 'Sara Ali',
      message: 'What is your final price? Is there any room for negotiation?',
      time: '5 hours ago',
      status: 'pending'
    },
    {
      id: 3,
      carTitle: 'Toyota Corolla 2020',
      buyerName: 'Bilal Ahmed',
      message: 'Can you provide the service history?',
      time: '1 day ago',
      status: 'responded'
    }
  ]);

  const StatCard = ({ icon: Icon, title, value, subtitle, color, trend }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600 font-medium">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900 mt-2">{value}</h3>
          {subtitle && (
            <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      {trend && (
        <div className="mt-4 flex items-center text-sm">
          <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
          <span className="text-green-500 font-medium">{trend}</span>
          <span className="text-gray-500 ml-1">vs last month</span>
        </div>
      )}
    </motion.div>
  );

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'bg-green-100 text-green-800', icon: CheckCircle, text: 'Active' },
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock, text: 'Pending' },
      sold: { color: 'bg-purple-100 text-purple-700', icon: CheckCircle, text: 'Sold' },
      inactive: { color: 'bg-gray-100 text-gray-800', icon: XCircle, text: 'Inactive' }
    };

    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium ${config.color}`}>
        <Icon className="w-3 h-3" />
        {config.text}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Seller Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your car listings and track performance</p>
        </div>

        {/* Quick Actions */}
        <div className="mb-8 flex flex-wrap gap-4">
          <Link
            to="/seller/add-car"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-colors shadow-lg hover:shadow-xl"
          >
            <Plus className="w-5 h-5" />
            Add New Listing
          </Link>
          <Link
            to="/seller/analytics"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors shadow-md border border-gray-200"
          >
            <BarChart3 className="w-5 h-5" />
            View Analytics
          </Link>
          <Link
            to="/seller/messages"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors shadow-md border border-gray-200 relative"
          >
            <MessageSquare className="w-5 h-5" />
            Messages
            {stats.pendingInquiries > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-lg w-6 h-6 flex items-center justify-center">
                {stats.pendingInquiries}
              </span>
            )}
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Car}
            title="Total Listings"
            value={stats.totalListings}
            subtitle={`${stats.activeListings} active`}
            color="bg-gradient-to-r from-purple-600 to-purple-700"
            trend="+12%"
          />
          <StatCard
            icon={DollarSign}
            title="Total Revenue"
            value={`PKR ${(stats.totalRevenue / 1000000).toFixed(1)}M`}
            subtitle="From sold cars"
            color="bg-green-600"
            trend="+8%"
          />
          <StatCard
            icon={Eye}
            title="Total Views"
            value={stats.totalViews.toLocaleString()}
            subtitle="Across all listings"
            color="bg-purple-600"
            trend="+15%"
          />
          <StatCard
            icon={MessageSquare}
            title="Inquiries"
            value={stats.totalInquiries}
            subtitle={`${stats.pendingInquiries} pending`}
            color="bg-orange-600"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Listings */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Recent Listings</h2>
                <Link
                  to="/seller/listings"
                  className="text-purple-700 hover:text-purple-600 text-sm font-medium"
                >
                  View All
                </Link>
              </div>

              <div className="space-y-4">
                {recentListings.map((listing) => (
                  <div
                    key={listing.id}
                    className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-purple-300 transition-colors"
                  >
                    <img
                      src={listing.image}
                      alt={listing.title}
                      className="w-24 h-20 object-cover rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900">{listing.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">
                            PKR {listing.price.toLocaleString()}
                          </p>
                        </div>
                        {getStatusBadge(listing.status)}
                      </div>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {listing.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="w-4 h-4" />
                          {listing.inquiries}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Link
                        to={`/seller/edit-car/${listing.id}`}
                        className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                      >
                        <Edit className="w-5 h-5" />
                      </Link>
                      <button
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        onClick={() => console.log('Delete', listing.id)}
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Inquiries */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Recent Inquiries</h2>
                <Link
                  to="/seller/messages"
                  className="text-purple-700 hover:text-purple-600 text-sm font-medium"
                >
                  View All
                </Link>
              </div>

              <div className="space-y-4">
                {recentInquiries.map((inquiry) => (
                  <div
                    key={inquiry.id}
                    className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-sm text-gray-900">
                          {inquiry.buyerName}
                        </h4>
                        <p className="text-xs text-gray-500">{inquiry.carTitle}</p>
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded-lg ${
                          inquiry.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {inquiry.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                      {inquiry.message}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{inquiry.time}</span>
                      <button className="text-xs text-purple-700 hover:text-purple-600 font-medium">
                        Reply
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Performance Overview */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Performance Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Users className="w-8 h-8 text-purple-700 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">
                {(stats.totalViews / stats.totalListings).toFixed(0)}
              </p>
              <p className="text-sm text-gray-600">Avg Views per Listing</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <MessageSquare className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">
                {((stats.totalInquiries / stats.totalViews) * 100).toFixed(1)}%
              </p>
              <p className="text-sm text-gray-600">Inquiry Rate</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Clock className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{stats.avgResponseTime}</p>
              <p className="text-sm text-gray-600">Avg Response Time</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
