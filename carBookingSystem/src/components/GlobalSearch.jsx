import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, TrendingUp, Clock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllCars } from '../utils/carData';

const GlobalSearch = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    // Load recent searches from localStorage
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      const cars = getAllCars();
      const filtered = cars.filter(car => 
        car.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.year.toString().includes(searchQuery)
      ).slice(0, 5);
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const saveRecentSearch = (query) => {
    const updated = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      saveRecentSearch(searchQuery);
      navigate(`/cars/used?search=${encodeURIComponent(searchQuery)}`);
      onClose();
      setSearchQuery('');
    }
  };

  const handleCarClick = (car) => {
    saveRecentSearch(`${car.brand} ${car.model}`);
    onClose();
    setSearchQuery('');
  };

  const handleRecentClick = (query) => {
    setSearchQuery(query);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-20 px-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search Input */}
          <form onSubmit={handleSearch} className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for cars by brand, model, or year..."
                className="w-full pl-12 pr-12 py-4 text-lg border-none focus:outline-none focus:ring-0"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </form>

          {/* Search Results */}
          <div className="max-h-96 overflow-y-auto">
            {searchQuery.trim() ? (
              searchResults.length > 0 ? (
                <div className="p-2">
                  <p className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">
                    Search Results
                  </p>
                  {searchResults.map((car) => (
                    <Link
                      key={car.id}
                      to={`/car/${car.id}`}
                      onClick={() => handleCarClick(car)}
                      className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <img
                        src={car.imageUrl}
                        alt={car.title}
                        className="w-16 h-12 object-cover rounded-full"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 truncate">
                          {car.title}
                        </p>
                        <p className="text-sm text-gray-600">
                          {car.year} • {car.mileage.toLocaleString()} km
                        </p>
                      </div>
                      <p className="font-bold text-purple-600">
                        Rs {car.price.toLocaleString()}
                      </p>
                    </Link>
                  ))}
                  <button
                    onClick={handleSearch}
                    className="w-full mt-2 px-4 py-3 text-center text-purple-600 hover:bg-purple-50 rounded-lg font-medium transition-colors"
                  >
                    View all results for "{searchQuery}"
                  </button>
                </div>
              ) : (
                <div className="p-8 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-600">No cars found for "{searchQuery}"</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Try searching with different keywords
                  </p>
                </div>
              )
            ) : (
              <div className="p-4">
                {/* Recent Searches */}
                {recentSearches.length > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between px-2 mb-2">
                      <p className="text-xs font-semibold text-gray-500 uppercase flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Recent Searches
                      </p>
                      <button
                        onClick={clearRecentSearches}
                        className="text-xs text-purple-600 hover:text-purple-600"
                      >
                        Clear
                      </button>
                    </div>
                    <div className="space-y-1">
                      {recentSearches.map((query, index) => (
                        <button
                          key={index}
                          onClick={() => handleRecentClick(query)}
                          className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-3"
                        >
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-700">{query}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quick Links */}
                <div>
                  <p className="px-2 mb-2 text-xs font-semibold text-gray-500 uppercase flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Popular Searches
                  </p>
                  <div className="space-y-1">
                    {['Toyota Corolla', 'Honda Civic', 'Suzuki Alto', 'Honda City', 'Toyota Yaris'].map((query) => (
                      <button
                        key={query}
                        onClick={() => handleRecentClick(query)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-3"
                      >
                        <TrendingUp className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-700">{query}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <kbd className="px-2 py-1 bg-white border border-gray-300 rounded">ESC</kbd>
                  to close
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-2 py-1 bg-white border border-gray-300 rounded">↵</kbd>
                  to search
                </span>
              </div>
              <span>{searchResults.length} results</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default GlobalSearch;
