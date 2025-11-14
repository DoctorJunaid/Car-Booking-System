import { useState, useEffect } from 'react';
import CarCard from '../components/CarCard';
import Breadcrumbs from '../components/Breadcrumbs';
import { CarCardSkeleton } from '../components/SkeletonLoader';
import EmptyState from '../components/EmptyState';
import { Search, SlidersHorizontal, X, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { getNewCars, getBrands } from '../utils/carData';

const NewCars = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    priceRange: 'all',
    brand: 'all',
    bodyType: 'all'
  });
  const [showFilters, setShowFilters] = useState(false);
  const [newCars, setNewCars] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setNewCars(getNewCars());
      setBrands(getBrands());
      setLoading(false);
    }, 500);
  }, []);

  const filteredCars = newCars.filter(car => {
    const matchesSearch = car.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBrand = filters.brand === 'all' || car.brand === filters.brand;
    const matchesBodyType = filters.bodyType === 'all' || car.bodyType === filters.bodyType;
    
    let matchesPrice = true;
    if (filters.priceRange !== 'all') {
      const price = car.price;
      switch(filters.priceRange) {
        case 'under3m': matchesPrice = price < 3000000; break;
        case '3m-5m': matchesPrice = price >= 3000000 && price < 5000000; break;
        case '5m-8m': matchesPrice = price >= 5000000 && price < 8000000; break;
        case 'above8m': matchesPrice = price >= 8000000; break;
      }
    }

    return matchesSearch && matchesBrand && matchesBodyType && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs />
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-8 h-8 text-purple-700" />
            <h1 className="text-4xl font-bold text-gray-900">New Cars</h1>
          </div>
          <p className="text-gray-600">Explore the latest models with zero mileage and full warranty</p>
        </motion.div>

        {/* Featured Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-linear-to-r from-blue-900 to-blue-700 text-white rounded-lg p-8 mb-8 shadow-xl"
        >
          <h2 className="text-2xl font-bold mb-2">2024 Models Now Available!</h2>
          <p className="text-blue-100 mb-4">Get the latest features, technology, and full manufacturer warranty</p>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              <span>0 km Mileage</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              <span>Full Warranty</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              <span>Latest Technology</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              <span>Financing Available</span>
            </div>
          </div>
        </motion.div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search new cars..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            <motion.button
              onClick={() => setShowFilters(!showFilters)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-colors"
            >
              <SlidersHorizontal className="w-5 h-5" />
              Filters
            </motion.button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 pt-6 border-t border-gray-200"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                  <select
                    value={filters.priceRange}
                    onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="all">All Prices</option>
                    <option value="under3m">Under 3M</option>
                    <option value="3m-5m">3M - 5M</option>
                    <option value="5m-8m">5M - 8M</option>
                    <option value="above8m">Above 8M</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                  <select
                    value={filters.brand}
                    onChange={(e) => setFilters({...filters, brand: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="all">All Brands</option>
                    {brands.map(brand => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Body Type</label>
                  <select
                    value={filters.bodyType}
                    onChange={(e) => setFilters({...filters, bodyType: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="all">All Types</option>
                    <option value="Sedan">Sedan</option>
                    <option value="SUV">SUV</option>
                    <option value="Hatchback">Hatchback</option>
                  </select>
                </div>
              </div>

              <button
                onClick={() => setFilters({
                  priceRange: 'all',
                  brand: 'all',
                  bodyType: 'all'
                })}
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:text-gray-900"
              >
                <X className="w-4 h-4" />
                Clear All Filters
              </button>
            </motion.div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-gray-900">{filteredCars.length}</span> new cars
          </p>
        </div>

        {/* Cars Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            {[...Array(6)].map((_, index) => (
              <CarCardSkeleton key={index} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            {filteredCars.map((car, index) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="h-auto"
              >
                <CarCard 
                id={car.id}
                imageUrl={car.imageUrl}
                title={car.title}
                specsSubtitle={`${car.engine} • ${car.transmission} • ${car.fuelType} • Brand New`}
                mileage={`${car.mileage} km`}
                fuelType={car.fuelType}
                transmission={car.transmission}
                price={car.price}
                year={car.year}
                brand={car.brand}
                bodyType={car.bodyType}
                carData={{
                  id: car.id,
                  image: car.imageUrl,
                  make: car.brand,
                  model: car.model,
                  year: car.year,
                  price: car.price,
                  mileage: car.mileage,
                  fuelType: car.fuelType,
                  transmission: car.transmission,
                  engine: car.engine,
                  color: car.color,
                  condition: 'New',
                  bodyType: car.bodyType,
                  seating: car.seating
                }}
              />
            </motion.div>
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && filteredCars.length === 0 && (
          <EmptyState
            type="no-results"
            searchQuery={searchQuery}
            onClearFilters={() => {
              setSearchQuery('');
              setFilters({
                priceRange: 'all',
                brand: 'all',
                bodyType: 'all'
              });
            }}
          />
        )}
      </div>
    </div>
  );
};

export default NewCars;
