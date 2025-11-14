import React from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Car, Frown } from 'lucide-react';

const EmptyState = ({ 
  type = 'no-results', 
  searchQuery = '', 
  onClearFilters,
  title,
  description 
}) => {
  const illustrations = {
    'no-results': {
      icon: Search,
      defaultTitle: 'No cars found',
      defaultDescription: searchQuery 
        ? `We couldn't find any cars matching "${searchQuery}"`
        : 'No cars match your current filters',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    'no-cars': {
      icon: Car,
      defaultTitle: 'No cars available',
      defaultDescription: 'Check back soon for new listings',
      color: 'text-gray-600',
      bgColor: 'bg-gray-50'
    },
    'error': {
      icon: Frown,
      defaultTitle: 'Something went wrong',
      defaultDescription: 'We encountered an error loading the cars',
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    }
  };

  const config = illustrations[type] || illustrations['no-results'];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-4"
    >
      {/* Illustration */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
        className={`${config.bgColor} rounded-lg p-8 mb-6`}
      >
        <Icon className={`w-16 h-16 ${config.color}`} strokeWidth={1.5} />
      </motion.div>

      {/* Text Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center max-w-md"
      >
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {title || config.defaultTitle}
        </h3>
        <p className="text-gray-600 mb-6">
          {description || config.defaultDescription}
        </p>

        {/* Action Button */}
        {onClearFilters && (
          <motion.button
            onClick={onClearFilters}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-colors shadow-md hover:shadow-lg"
          >
            <Filter className="w-5 h-5" />
            Clear All Filters
          </motion.button>
        )}
      </motion.div>

      {/* Decorative Elements */}
      <div className="mt-8 flex gap-2">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.3, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className="w-2 h-2 bg-gray-400 rounded-full"
          />
        ))}
      </div>
    </motion.div>
  );
};

export default EmptyState;
