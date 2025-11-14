import { useState, useEffect } from 'react';
import CarCard from '../components/CarCard';
import Breadcrumbs from '../components/Breadcrumbs';
import EmptyState from '../components/EmptyState';
import { Search, SlidersHorizontal, X, ShieldCheck, Award, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { getCertifiedCars, getBrands } from '../utils/carData';

const CertifiedCars = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    priceRange: 'all',
    brand: 'all',
    year: 'all'
  });
  const [showFilters, setShowFilters] = useState(false);
  const [certifiedCars, setCertifiedCars] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    setCertifiedCars(getCertifiedCars());
    setBrands(getBrands());
  }, []);

  const filteredCars = certifiedCars.filter(car => {
    const matchesSearch = car.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBrand = filters.brand === 'all' || car.brand === filters.brand;
    const matchesYear = filters.year === 'all' || car.year.toString() === filters.year;
    
    let matchesPrice = true;
    if (filters.priceRange !== 'all') {
      const price = car.price;
      switch(filters.priceRange) {
        case 'under4m': matchesPrice = price < 4000000; break;
        case '4m-6m': matchesPrice = price >= 4000000 && price < 6000000; break;
        case '6m-10m': matchesPrice = price >= 6000000 && price < 10000000; break;
        case 'above10m': matchesPrice = price >= 10000000; break;
      }
    }

    return matchesSearch && matchesBrand && matchesYear && matchesPrice;
  });

  const certificationBenefits = [
    {
      icon: ShieldCheck,
      title: 'Comprehensive Inspection',
      description: '150+ point quality check'
    },
    {
      icon: Award,
      title: 'Extended Warranty',
      description: 'Up to 2 years coverage'
    },
    {
      icon: CheckCircle,
      title: 'Verified History',
      description: 'Complete service records'
    }
  ];

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
            <ShieldCheck className="w-8 h-8 text-purple-700" />
            <h1 className="text-4xl font-bold text-gray-900">Certified Pre-Owned Cars</h1>
          </div>
          <p className="text-gray-600">Quality assured vehicles with extended warranty and complete inspection</p>
        </motion.div>

        {/* Certification Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          {certificationBenefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Icon className="w-6 h-6 text-purple-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{benefit.title}</h3>
                    <p className="text-sm text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* What Makes a Car Certified */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-linear-to-r from-blue-900 to-blue-700 text-white rounded-lg p-8 mb-8 shadow-xl"
        >
          <h2 className="text-2xl font-bold mb-4">What Makes a Car Certified?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Rigorous Inspection</h3>
                <p className="text-sm text-blue-100">150+ point mechanical and cosmetic inspection</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Low Mileage</h3>
                <p className="text-sm text-blue-100">Maximum 50,000 km for certification</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Complete History</h3>
                <p className="text-sm text-blue-100">Verified service records and accident-free</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Extended Warranty</h3>
                <p className="text-sm text-blue-100">Up to 2 years comprehensive coverage</p>
              </div>
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
                placeholder="Search certified cars..."
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
                    <option value="under4m">Under 4M</option>
                    <option value="4m-6m">4M - 6M</option>
                    <option value="6m-10m">6M - 10M</option>
                    <option value="above10m">Above 10M</option>
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
                    {[...new Set(certifiedCars.map(c => c.year))].sort((a, b) => b - a).map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                onClick={() => setFilters({
                  priceRange: 'all',
                  brand: 'all',
                  year: 'all'
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
            Showing <span className="font-semibold text-gray-900">{filteredCars.length}</span> certified cars
          </p>
        </div>

        {/* Cars Grid */}
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
                specsSubtitle={`${car.engine} • ${car.transmission} • ${car.fuelType} • Certified`}
                mileage={`${car.mileage.toLocaleString()} km`}
                fuelType={car.fuelType}
                transmission={car.transmission}
                price={car.price}
                year={car.year}
                brand={car.brand}
                certified={true}
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
                  condition: 'Certified',
                  bodyType: car.bodyType,
                  seating: car.seating
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredCars.length === 0 && (
          <EmptyState
            type="no-results"
            searchQuery={searchQuery}
            onClearFilters={() => {
              setSearchQuery('');
              setFilters({
                priceRange: 'all',
                brand: 'all',
                year: 'all'
              });
            }}
          />
        )}
      </div>
    </div>
  );
};

export default CertifiedCars;
