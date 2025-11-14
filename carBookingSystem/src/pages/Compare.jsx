import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { X, Plus, ArrowRight, Check } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import { getAllCars } from '../utils/carData';
import { useCompare } from '../context/CompareContext';

const Compare = () => {
  const { compareList, removeFromCompare } = useCompare();
  const [selectedCars, setSelectedCars] = useState([null, null, null]);
  const [availableCars, setAvailableCars] = useState([]);
  const [showCarSelector, setShowCarSelector] = useState(null);

  useEffect(() => {
    const cars = getAllCars();
    setAvailableCars(cars);
    
    // Pre-populate with cars from compare context
    const newSelected = [null, null, null];
    compareList.forEach((car, idx) => {
      if (idx < 3) newSelected[idx] = car;
    });
    setSelectedCars(newSelected);
  }, [compareList]);

  const handleSelectCar = (index, car) => {
    const newSelected = [...selectedCars];
    newSelected[index] = car;
    setSelectedCars(newSelected);
    setShowCarSelector(null);
  };

  const handleRemoveCar = (index) => {
    const car = selectedCars[index];
    if (car) {
      removeFromCompare(car.id);
    }
    const newSelected = [...selectedCars];
    newSelected[index] = null;
    setSelectedCars(newSelected);
  };

  const comparisonFeatures = [
    { label: 'Price', key: 'price', format: (val) => `Rs ${val?.toLocaleString()}` },
    { label: 'Year', key: 'year' },
    { label: 'Mileage', key: 'mileage', format: (val) => `${val?.toLocaleString()} km` },
    { label: 'Fuel Type', key: 'fuelType' },
    { label: 'Transmission', key: 'transmission' },
    { label: 'Engine', key: 'engine' },
    { label: 'Color', key: 'color' },
    { label: 'Condition', key: 'condition' },
    { label: 'Body Type', key: 'bodyType' },
    { label: 'Seating', key: 'seating', format: (val) => `${val} seats` },
  ];

  const getFeatureValue = (car, feature) => {
    if (!car) return '-';
    const value = car[feature.key];
    return feature.format ? feature.format(value) : value || '-';
  };

  const getBestValue = (feature) => {
    const values = selectedCars
      .filter(car => car !== null)
      .map(car => car[feature.key])
      .filter(val => val !== undefined && val !== null);

    if (values.length === 0) return null;

    if (feature.key === 'price') {
      return Math.min(...values);
    }
    if (feature.key === 'year') {
      return Math.max(...values);
    }
    if (feature.key === 'mileage') {
      return Math.min(...values);
    }
    return null;
  };

  const isBestValue = (car, feature) => {
    if (!car) return false;
    const bestValue = getBestValue(feature);
    if (bestValue === null) return false;
    return car[feature.key] === bestValue;
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20">
        <Breadcrumbs />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 mt-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Compare Cars
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select up to 3 cars to compare their features side by side
          </p>
        </motion.div>

        {/* Comparison Grid */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="sticky left-0 bg-white z-10 p-4 text-left font-semibold text-gray-900 min-w-[150px]">
                    Feature
                  </th>
                  {[0, 1, 2].map((index) => (
                    <th key={index} className="p-4 min-w-[280px]">
                      {selectedCars[index] ? (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="relative"
                        >
                          <button
                            onClick={() => handleRemoveCar(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-lg p-1 hover:bg-red-600 transition-colors z-10"
                          >
                            <X className="w-4 h-4" />
                          </button>
                          <img
                            src={selectedCars[index].image || selectedCars[index].imageUrl || 'https://via.placeholder.com/400x300?text=No+Image'}
                            alt={`${selectedCars[index].make} ${selectedCars[index].model}`}
                            className="w-full h-40 object-cover rounded-lg mb-3"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                            }}
                          />
                          <h3 className="font-bold text-lg text-gray-900">
                            {selectedCars[index].make} {selectedCars[index].model}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {selectedCars[index].year}
                          </p>
                          <Link
                            to={`/car/${selectedCars[index].id}`}
                            className="inline-flex items-center gap-1 text-purple-600 hover:text-purple-600 text-sm mt-2"
                          >
                            View Details <ArrowRight className="w-4 h-4" />
                          </Link>
                        </motion.div>
                      ) : (
                        <button
                          onClick={() => setShowCarSelector(index)}
                          className="w-full h-64 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-purple-50 transition-all flex flex-col items-center justify-center gap-3 group"
                        >
                          <Plus className="w-12 h-12 text-gray-400 group-hover:text-blue-500 transition-colors" />
                          <span className="text-gray-600 group-hover:text-purple-600 font-medium">
                            Select Car {index + 1}
                          </span>
                        </button>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feature, idx) => (
                  <tr
                    key={feature.key}
                    className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                  >
                    <td className="sticky left-0 bg-inherit z-10 p-4 font-medium text-gray-700 border-r border-gray-200">
                      {feature.label}
                    </td>
                    {[0, 1, 2].map((index) => (
                      <td key={index} className="p-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          {isBestValue(selectedCars[index], feature) && (
                            <Check className="w-5 h-5 text-green-600" />
                          )}
                          <span className={`${
                            isBestValue(selectedCars[index], feature)
                              ? 'font-bold text-green-600'
                              : 'text-gray-900'
                          }`}>
                            {getFeatureValue(selectedCars[index], feature)}
                          </span>
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 flex items-center justify-center gap-6 text-sm text-gray-600"
        >
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5 text-green-600" />
            <span>Best Value</span>
          </div>
        </motion.div>

        {/* Empty State */}
        {!selectedCars.some(car => car !== null) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mt-12"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-100 rounded-full mb-4">
              <Plus className="w-10 h-10 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Start Comparing Cars
            </h3>
            <p className="text-gray-600 mb-6">
              Click on the boxes above to select cars and compare their features
            </p>
            <Link
              to="/cars/used"
              className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-purple-800 transition-colors"
            >
              Browse Cars <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        )}
      </div>

      {/* Car Selector Modal */}
      {showCarSelector !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowCarSelector(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                Select a Car
              </h2>
              <button
                onClick={() => setShowCarSelector(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(80vh-100px)]">
              <div className="grid md:grid-cols-2 gap-4">
                {availableCars
                  .filter(car => !selectedCars.some(selected => selected?.id === car.id))
                  .map((car) => (
                    <motion.button
                      key={car.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSelectCar(showCarSelector, car)}
                      className="flex gap-4 p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all text-left"
                    >
                      <img
                        src={car.imageUrl || car.image || 'https://via.placeholder.com/300x200?text=No+Image'}
                        alt={`${car.brand} ${car.model}`}
                        className="w-32 h-24 object-cover rounded-full"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                        }}
                      />
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900">
                          {car.brand} {car.model}
                        </h3>
                        <p className="text-sm text-gray-600">{car.year}</p>
                        <p className="text-lg font-bold text-purple-600 mt-1">
                          Rs {car.price?.toLocaleString()}
                        </p>
                      </div>
                    </motion.button>
                  ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Compare;
