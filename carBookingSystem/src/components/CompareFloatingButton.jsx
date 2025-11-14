import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GitCompare, X } from 'lucide-react';
import { useCompare } from '../context/CompareContext';

const CompareFloatingButton = () => {
  const { compareList, removeFromCompare } = useCompare();

  if (compareList.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      className="fixed bottom-24 right-6 z-40"
    >
      <div className="bg-white rounded-3xl shadow-2xl border-2 border-purple-200 overflow-hidden max-w-sm">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GitCompare className="w-5 h-5" />
            <span className="font-bold">Compare ({compareList.length}/3)</span>
          </div>
        </div>

        {/* Car List */}
        <div className="p-3 max-h-60 overflow-y-auto">
          <AnimatePresence>
            {compareList.map((car) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex items-center gap-3 mb-2 p-2.5 bg-purple-50 rounded-xl border border-purple-100"
              >
                <img
                  src={car.image || car.imageUrl || 'https://via.placeholder.com/150x100?text=No+Image'}
                  alt={`${car.make} ${car.model}`}
                  className="w-16 h-12 object-cover rounded-full"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/150x100?text=No+Image';
                  }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {car.make} {car.model}
                  </p>
                  <p className="text-xs text-gray-600">{car.year}</p>
                </div>
                <button
                  onClick={() => removeFromCompare(car.id)}
                  className="p-1.5 hover:bg-rose-100 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4 text-rose-600" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Action Button */}
        <div className="p-3 border-t-2 border-purple-200">
          <Link
            to="/compare"
            className="block w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white text-center py-3 rounded-xl hover:from-purple-700 hover:to-purple-800 hover:shadow-lg transition-all font-bold"
          >
            Compare Now
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default CompareFloatingButton;
