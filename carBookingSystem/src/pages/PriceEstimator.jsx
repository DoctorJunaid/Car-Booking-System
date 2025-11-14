import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Car, 
  Calendar, 
  Gauge, 
  MapPin,
  DollarSign,
  CheckCircle,
  TrendingUp,
  Award,
  Shield,
  Zap
} from 'lucide-react';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const scaleIn = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

const PriceEstimator = () => {
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: '',
    mileage: '',
    condition: '',
    city: '',
    transmission: '',
    fuelType: ''
  });

  const [estimatedPrice, setEstimatedPrice] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const calculatePrice = (e) => {
    e.preventDefault();
    setIsCalculating(true);

    // Simulate price calculation
    setTimeout(() => {
      const basePrice = 2500000; // Base price in PKR
      const yearFactor = (2024 - parseInt(formData.year)) * 50000;
      const mileageFactor = parseInt(formData.mileage) * 2;
      const conditionFactor = formData.condition === 'excellent' ? 200000 : 
                             formData.condition === 'good' ? 100000 : 
                             formData.condition === 'fair' ? 0 : -100000;

      const estimated = basePrice - yearFactor - mileageFactor + conditionFactor;
      const minPrice = estimated * 0.9;
      const maxPrice = estimated * 1.1;

      setEstimatedPrice({
        min: Math.round(minPrice),
        max: Math.round(maxPrice),
        average: Math.round(estimated)
      });
      setIsCalculating(false);
    }, 2000);
  };

  const carBrands = [
    'Toyota', 'Honda', 'Suzuki', 'Daihatsu', 'Nissan', 
    'Mitsubishi', 'Hyundai', 'KIA', 'Mercedes', 'BMW'
  ];

  const cities = [
    'Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad',
    'Multan', 'Peshawar', 'Quetta', 'Sialkot', 'Gujranwala'
  ];

  const features = [
    {
      icon: Shield,
      title: "Accurate Estimates",
      description: "Based on real market data and trends"
    },
    {
      icon: TrendingUp,
      title: "Market Analysis",
      description: "Current market conditions considered"
    },
    {
      icon: Award,
      title: "Free Service",
      description: "No hidden charges or fees"
    },
    {
      icon: Zap,
      title: "Instant Results",
      description: "Get your estimate in seconds"
    }
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <motion.section 
        className="relative text-white py-24 overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={fadeInUp}
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1920&h=800&fit=crop&q=80"
            alt="Car Price Estimator"
            className="w-full h-full object-cover brightness-75"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6"
            variants={fadeInUp}
          >
            Car Price Estimator
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto"
            variants={fadeInUp}
          >
            Get an instant estimate of your car's market value in Pakistan
          </motion.p>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        className="py-16 bg-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200"
              >
                <div className="bg-purple-600/10 backdrop-blur-sm w-14 h-14 rounded-full flex items-center justify-center mb-4 border border-purple-600/20">
                  <feature.icon className="w-7 h-7 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Main Estimator Section */}
      <motion.section 
        className="py-20 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Side - Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Enter Car Details
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                Fill in the information below to get an accurate price estimate
              </p>

              <form onSubmit={calculatePrice} className="space-y-6">
                {/* Brand Selection */}
                <div>
                  <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-2">
                    Car Brand *
                  </label>
                  <div className="relative">
                    <Car className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select
                      id="brand"
                      name="brand"
                      value={formData.brand}
                      onChange={handleChange}
                      required
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all appearance-none bg-white"
                    >
                      <option value="">Select Brand</option>
                      {carBrands.map((brand) => (
                        <option key={brand} value={brand}>{brand}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Model Input */}
                <div>
                  <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-2">
                    Model *
                  </label>
                  <input
                    type="text"
                    id="model"
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm"
                    placeholder="e.g., Corolla, Civic, Alto"
                  />
                </div>

                {/* Year Selection */}
                <div>
                  <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-2">
                    Year *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select
                      id="year"
                      name="year"
                      value={formData.year}
                      onChange={handleChange}
                      required
                      className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all appearance-none bg-white/50 backdrop-blur-sm"
                    >
                      <option value="">Select Year</option>
                      {Array.from({ length: 25 }, (_, i) => 2024 - i).map((year) => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Mileage Input */}
                <div>
                  <label htmlFor="mileage" className="block text-sm font-medium text-gray-700 mb-2">
                    Mileage (KM) *
                  </label>
                  <div className="relative">
                    <Gauge className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      id="mileage"
                      name="mileage"
                      value={formData.mileage}
                      onChange={handleChange}
                      required
                      className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm"
                      placeholder="e.g., 50000"
                    />
                  </div>
                </div>

                {/* Condition Selection */}
                <div>
                  <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-2">
                    Condition *
                  </label>
                  <select
                    id="condition"
                    name="condition"
                    value={formData.condition}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all appearance-none bg-white/50 backdrop-blur-sm"
                  >
                    <option value="">Select Condition</option>
                    <option value="excellent">Excellent</option>
                    <option value="good">Good</option>
                    <option value="fair">Fair</option>
                    <option value="poor">Poor</option>
                  </select>
                </div>

                {/* City Selection */}
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all appearance-none bg-white/50 backdrop-blur-sm"
                    >
                      <option value="">Select City</option>
                      {cities.map((city) => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Transmission */}
                <div>
                  <label htmlFor="transmission" className="block text-sm font-medium text-gray-700 mb-2">
                    Transmission *
                  </label>
                  <select
                    id="transmission"
                    name="transmission"
                    value={formData.transmission}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all appearance-none bg-white/50 backdrop-blur-sm"
                  >
                    <option value="">Select Transmission</option>
                    <option value="automatic">Automatic</option>
                    <option value="manual">Manual</option>
                  </select>
                </div>

                {/* Fuel Type */}
                <div>
                  <label htmlFor="fuelType" className="block text-sm font-medium text-gray-700 mb-2">
                    Fuel Type *
                  </label>
                  <select
                    id="fuelType"
                    name="fuelType"
                    value={formData.fuelType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all appearance-none bg-white/50 backdrop-blur-sm"
                  >
                    <option value="">Select Fuel Type</option>
                    <option value="petrol">Petrol</option>
                    <option value="diesel">Diesel</option>
                    <option value="hybrid">Hybrid</option>
                    <option value="electric">Electric</option>
                    <option value="cng">CNG</option>
                  </select>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isCalculating}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-purple-600 text-white py-4 rounded-lg font-semibold hover:from-purple-700 hover:to-purple-800 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCalculating ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Calculating...
                    </>
                  ) : (
                    <>
                      <DollarSign className="w-5 h-5" />
                      Calculate Price
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>

            {/* Right Side - Result */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6 }}
            >
              {!estimatedPrice ? (
                <div className="bg-gray-50 rounded-2xl p-12 border border-gray-200 h-full flex flex-col items-center justify-center text-center">
                  <div className="bg-gray-200 w-24 h-24 rounded-full flex items-center justify-center mb-6">
                    <DollarSign className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Ready to Estimate?
                  </h3>
                  <p className="text-gray-600 max-w-md">
                    Fill in your car details on the left and click "Calculate Price" to get an instant market value estimate.
                  </p>
                </div>
              ) : (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  {/* Estimated Price Card */}
                  <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl p-8 shadow-2xl">
                    <div className="flex items-center gap-3 mb-4">
                      <CheckCircle className="w-8 h-8 text-green-400" />
                      <h3 className="text-2xl font-bold">Estimated Value</h3>
                    </div>
                    
                    <div className="mb-6">
                      <p className="text-blue-100 text-sm mb-2">Average Market Price</p>
                      <p className="text-5xl font-bold text-white">
                        {formatPrice(estimatedPrice.average)}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-6 border-t border-blue-500">
                      <div>
                        <p className="text-blue-100 text-sm mb-1">Minimum</p>
                        <p className="text-2xl font-bold text-white">
                          {formatPrice(estimatedPrice.min)}
                        </p>
                      </div>
                      <div>
                        <p className="text-blue-100 text-sm mb-1">Maximum</p>
                        <p className="text-2xl font-bold text-white">
                          {formatPrice(estimatedPrice.max)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Car Details Summary */}
                  <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-md">
                    <h4 className="text-lg font-bold text-gray-900 mb-4">Your Car Details</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Brand & Model:</span>
                        <span className="font-semibold text-gray-900">{formData.brand} {formData.model}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Year:</span>
                        <span className="font-semibold text-gray-900">{formData.year}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Mileage:</span>
                        <span className="font-semibold text-gray-900">{formData.mileage} KM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Condition:</span>
                        <span className="font-semibold text-gray-900 capitalize">{formData.condition}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">City:</span>
                        <span className="font-semibold text-gray-900">{formData.city}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <button
                      onClick={() => setEstimatedPrice(null)}
                      className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-purple-800 transition-all duration-300"
                    >
                      Calculate Again
                    </button>
                    <button
                      className="w-full bg-white border-2 border-purple-600 text-purple-600 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-all duration-300"
                    >
                      List Your Car
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* How It Works Section */}
      <motion.section 
        className="py-20 bg-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Get your car's value in 3 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Enter Details",
                description: "Fill in your car's information including brand, model, year, and condition"
              },
              {
                step: "02",
                title: "Get Estimate",
                description: "Our algorithm analyzes market data to calculate an accurate price range"
              },
              {
                step: "03",
                title: "List or Sell",
                description: "Use the estimate to list your car or negotiate with confidence"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                className="bg-white rounded-2xl p-8 shadow-md border border-gray-200 text-center"
              >
                <div className="bg-purple-600/10 backdrop-blur-sm text-purple-600 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 border-2 border-purple-600/20">
                  {item.step}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Disclaimer */}
      <motion.section 
        className="py-12 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
        variants={fadeInUp}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              Important Note
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              This is an estimated price based on market trends and the information provided. Actual prices may vary depending on additional factors such as car history, modifications, documentation, and current market demand. For a more accurate valuation, we recommend getting your car inspected by our experts.
            </p>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default PriceEstimator;
