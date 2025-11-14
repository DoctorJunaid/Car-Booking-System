import { useState, useEffect } from 'react';
import CarCard from '../components/CarCard';
import Breadcrumbs from '../components/Breadcrumbs';
import { CarCardSkeleton } from '../components/SkeletonLoader';
import EmptyState from '../components/EmptyState';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { getUsedCars, getBrands } from '../utils/carData';

const UsedCars = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    priceRange: 'all',
    brand: 'all',
    year: 'all',
    fuelType: 'all',
    transmission: 'all'
  });
  const [showFilters, setShowFilters] = useState(false);
  const [usedCars, setUsedCars] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for better UX
    setLoading(true);
    setTimeout(() => {
      setUsedCars(getUsedCars());
      setBrands(getBrands());
      setLoading(false);
    }, 500);
  }, []);

  const filteredCars = usedCars.filter(car => {
    const matchesSearch = car.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBrand = filters.brand === 'all' || car.brand === filters.brand;
    const matchesYear = filters.year === 'all' || car.year.toString() === filters.year;
    const matchesFuel = filters.fuelType === 'all' || car.fuelType === filters.fuelType;
    const matchesTransmission = filters.transmission === 'all' || car.transmission === filters.transmission;
    
    let matchesPrice = true;
    if (filters.priceRange !== 'all') {
      const price = car.price;
      switch(filters.priceRange) {
        case 'under2m': matchesPrice = price < 2000000; break;
        case '2m-3m': matchesPrice = price >= 2000000 && price < 3000000; break;
        case '3m-4m': matchesPrice = price >= 3000000 && price < 4000000; break;
        case 'above4m': matchesPrice = price >= 4000000; break;
      }
    }

    return matchesSearch && matchesBrand && matchesYear && matchesFuel && matchesTransmission && matchesPrice;
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
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Used Cars</h1>
          <p className="text-gray-600">Browse our collection of quality pre-owned vehicles</p>
        </motion.div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by car name..."
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
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                  <select
                    value={filters.priceRange}
                    onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="all">All Prices</option>
                    <option value="under2m">Under 2M</option>
                    <option value="2m-3m">2M - 3M</option>
                    <option value="3m-4m">3M - 4M</option>
                    <option value="above4m">Above 4M</option>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                  <select
                    value={filters.year}
                    onChange={(e) => setFilters({...filters, year: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="all">All Years</option>
                    {[...new Set(usedCars.map(c => c.year))].sort((a, b) => b - a).map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fuel Type</label>
                  <select
                    value={filters.fuelType}
                    onChange={(e) => setFilters({...filters, fuelType: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="all">All Types</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Transmission</label>
                  <select
                    value={filters.transmission}
                    onChange={(e) => setFilters({...filters, transmission: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="all">All Types</option>
                    <option value="Manual">Manual</option>
                    <option value="Automatic">Automatic</option>
                  </select>
                </div>
              </div>

              <button
                onClick={() => setFilters({
                  priceRange: 'all',
                  brand: 'all',
                  year: 'all',
                  fuelType: 'all',
                  transmission: 'all'
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
            Showing <span className="font-semibold text-gray-900">{filteredCars.length}</span> used cars
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
                specsSubtitle={`${car.engine} • ${car.transmission} • ${car.fuelType}`}
                mileage={`${car.mileage.toLocaleString()} km`}
                fuelType={car.fuelType}
                transmission={car.transmission}
                price={car.price}
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
                  condition: car.condition,
                  bodyType: car.bodyType,
                  seating: car.seating
                }}
                year={car.year}
                brand={car.brand}
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
                year: 'all',
                fuelType: 'all',
                transmission: 'all'
              });
            }}
          />
        )}
      </div>
    </div>
  );
};

export default UsedCars;
