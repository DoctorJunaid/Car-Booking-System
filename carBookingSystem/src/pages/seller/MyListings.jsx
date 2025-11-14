import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  MessageSquare, 
  MoreVertical,
  CheckCircle,
  Clock,
  XCircle,
  TrendingUp,
  Plus
} from 'lucide-react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { motion } from 'framer-motion';
import { getAllCars, updateCar, deleteCar as deleteCarData } from '../../utils/carData';

const MyListings = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [listings, setListings] = useState([]);

  useEffect(() => {
    loadListings();
  }, []);

  const loadListings = () => {
    const allCars = getAllCars();
    const formattedListings = allCars.map(car => ({
      id: car.id,
      title: car.title,
      brand: car.brand,
      model: car.model,
      year: car.year,
      price: car.price,
      mileage: car.mileage,
      status: car.status,
      views: car.views,
      inquiries: car.inquiries,
      image: car.imageUrl,
      listedDate: car.listedDate,
      lastUpdated: car.listedDate
    }));
    setListings(formattedListings);
  };



  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'bg-green-100 text-green-800', icon: CheckCircle, text: 'Active' },
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock, text: 'Pending Review' },
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

  const filteredListings = listings
    .filter(listing => {
      const matchesSearch = listing.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterStatus === 'all' || listing.status === filterStatus;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (sortBy === 'recent') return new Date(b.listedDate) - new Date(a.listedDate);
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'views') return b.views - a.views;
      return 0;
    });

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      deleteCarData(id);
      loadListings();
    }
  };

  const handleStatusChange = (id, newStatus) => {
    updateCar(id, { status: newStatus });
    loadListings();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Listings</h1>
              <p className="text-gray-600 mt-2">Manage all your car listings</p>
            </div>
            <Link
              to="/seller/add-car"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-colors shadow-lg"
            >
              <Plus className="w-5 h-5" />
              Add New Listing
            </Link>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600">Total Listings</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">{listings.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600">Active</p>
            <p className="text-2xl font-bold text-green-600 mt-2">
              {listings.filter(l => l.status === 'active').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600">Sold</p>
            <p className="text-2xl font-bold text-purple-600 mt-2">
              {listings.filter(l => l.status === 'sold').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600">Total Views</p>
            <p className="text-2xl font-bold text-purple-600 mt-2">
              {listings.reduce((sum, l) => sum + l.views, 0)}
            </p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search listings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="sold">Sold</option>
              <option value="inactive">Inactive</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="recent">Most Recent</option>
              <option value="price-high">Price: High to Low</option>
              <option value="price-low">Price: Low to High</option>
              <option value="views">Most Viewed</option>
            </select>
          </div>
        </div>

        {/* Listings Grid */}
        <div className="space-y-4">
          {filteredListings.length === 0 ? (
            <div className="bg-white rounded-lg shadow-lg p-12 text-center">
              <p className="text-gray-500 text-lg">No listings found</p>
              <Link
                to="/seller/add-car"
                className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Add Your First Listing
              </Link>
            </div>
          ) : (
            filteredListings.map((listing, index) => (
              <motion.div
                key={listing.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <img
                    src={listing.image}
                    alt={listing.title}
                    className="w-full md:w-48 h-36 object-cover rounded-full"
                  />

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{listing.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {listing.brand} • {listing.model} • {listing.year}
                        </p>
                      </div>
                      {getStatusBadge(listing.status)}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-500">Price</p>
                        <p className="text-lg font-bold text-gray-900">
                          PKR {(listing.price / 1000000).toFixed(1)}M
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Mileage</p>
                        <p className="text-sm font-semibold text-gray-700">
                          {listing.mileage.toLocaleString()} km
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Views</p>
                        <p className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {listing.views}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Inquiries</p>
                        <p className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                          <MessageSquare className="w-4 h-4" />
                          {listing.inquiries}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="text-xs text-gray-500">
                        Listed: {new Date(listing.listedDate).toLocaleDateString()} • 
                        Updated: {new Date(listing.lastUpdated).toLocaleDateString()}
                      </div>

                      <div className="flex items-center gap-2">
                        <Link
                          to={`/seller/edit-car/${listing.id}`}
                          className="inline-flex items-center gap-1 px-4 py-2 text-sm font-medium text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                          Edit
                        </Link>
                        
                        <Menu as="div" className="relative">
                          <MenuButton className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                            <MoreVertical className="w-5 h-5" />
                          </MenuButton>
                          <MenuItems className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                            <MenuItem>
                              <button
                                onClick={() => handleStatusChange(listing.id, listing.status === 'active' ? 'inactive' : 'active')}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 data-focus:bg-gray-100"
                              >
                                {listing.status === 'active' ? 'Mark as Inactive' : 'Mark as Active'}
                              </button>
                            </MenuItem>
                            <MenuItem>
                              <button
                                onClick={() => handleStatusChange(listing.id, 'sold')}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 data-focus:bg-gray-100"
                              >
                                Mark as Sold
                              </button>
                            </MenuItem>
                            <MenuItem>
                              <button
                                onClick={() => handleDelete(listing.id)}
                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 data-focus:bg-red-50"
                              >
                                Delete Listing
                              </button>
                            </MenuItem>
                          </MenuItems>
                        </Menu>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MyListings;
