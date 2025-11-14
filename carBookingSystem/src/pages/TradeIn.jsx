import { useState } from 'react';
import { motion } from 'framer-motion';
import Breadcrumbs from '../components/Breadcrumbs';
import { Car, Calendar, Gauge, DollarSign, CheckCircle, TrendingUp } from 'lucide-react';
import { useToast } from '../components/Toast';

const TradeIn = () => {
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    mileage: '',
    condition: '',
    accidents: '',
    serviceHistory: '',
    modifications: ''
  });
  const [estimatedValue, setEstimatedValue] = useState(null);

  const carMakes = ['Toyota', 'Honda', 'Suzuki', 'Mercedes', 'BMW', 'Audi', 'Nissan', 'Hyundai'];
  const years = Array.from({ length: 25 }, (_, i) => new Date().getFullYear() - i);
  const conditions = [
    { value: 'excellent', label: 'Excellent', multiplier: 1.0 },
    { value: 'good', label: 'Good', multiplier: 0.85 },
    { value: 'fair', label: 'Fair', multiplier: 0.70 },
    { value: 'poor', label: 'Poor', multiplier: 0.55 }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const calculateValue = () => {
    // Basic valuation algorithm (simplified)
    const baseValue = 2000000; // Base value in PKR
    const yearFactor = (2025 - parseInt(formData.year)) * 100000;
    const mileageFactor = (parseInt(formData.mileage) / 10000) * 50000;
    const conditionMultiplier = conditions.find(c => c.value === formData.condition)?.multiplier || 0.85;
    const accidentPenalty = formData.accidents === 'yes' ? 200000 : 0;
    const serviceBonus = formData.serviceHistory === 'complete' ? 100000 : 0;
    
    let value = (baseValue - yearFactor - mileageFactor) * conditionMultiplier - accidentPenalty + serviceBonus;
    value = Math.max(value, 500000); // Minimum value
    
    setEstimatedValue(Math.round(value));
    setStep(3);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.make || !formData.model || !formData.year || !formData.mileage || !formData.condition) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    calculateValue();
  };

  const resetForm = () => {
    setFormData({
      make: '',
      model: '',
      year: '',
      mileage: '',
      condition: '',
      accidents: '',
      serviceHistory: '',
      modifications: ''
    });
    setEstimatedValue(null);
    setStep(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs />
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
            <TrendingUp className="w-8 h-8 text-purple-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Trade-In Valuation</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get an instant estimate of your vehicle's trade-in value. Quick, easy, and free.
          </p>
        </motion.div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step >= s ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {s}
                </div>
                {s < 3 && (
                  <div className={`w-16 h-1 ${step > s ? 'bg-purple-600' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-16 mt-2">
            <span className="text-sm text-gray-600">Vehicle Info</span>
            <span className="text-sm text-gray-600">Condition</span>
            <span className="text-sm text-gray-600">Valuation</span>
          </div>
        </div>

        {/* Form */}
        {step < 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Vehicle Information</h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Make <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="make"
                        value={formData.make}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      >
                        <option value="">Select Make</option>
                        {carMakes.map(make => (
                          <option key={make} value={make}>{make}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Model <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="model"
                        value={formData.model}
                        onChange={handleChange}
                        required
                        placeholder="e.g., Corolla, Civic"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Year <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      >
                        <option value="">Select Year</option>
                        {years.map(year => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mileage (km) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="mileage"
                        value={formData.mileage}
                        onChange={handleChange}
                        required
                        placeholder="e.g., 50000"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (formData.make && formData.model && formData.year && formData.mileage) {
                        setStep(2);
                      } else {
                        toast.error('Please fill in all required fields');
                      }
                    }}
                    className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 rounded-lg hover:from-purple-700 hover:to-purple-800 transition-colors font-semibold"
                  >
                    Continue
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Vehicle Condition</h2>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Overall Condition <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {conditions.map(condition => (
                        <label
                          key={condition.value}
                          className={`relative flex flex-col items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            formData.condition === condition.value
                              ? 'border-purple-600 bg-purple-50'
                              : 'border-gray-200 hover:border-purple-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="condition"
                            value={condition.value}
                            checked={formData.condition === condition.value}
                            onChange={handleChange}
                            className="sr-only"
                          />
                          <span className="font-semibold text-gray-900">{condition.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Any Accidents?
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="accidents"
                          value="no"
                          checked={formData.accidents === 'no'}
                          onChange={handleChange}
                          className="w-4 h-4 text-purple-600"
                        />
                        <span>No</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="accidents"
                          value="yes"
                          checked={formData.accidents === 'yes'}
                          onChange={handleChange}
                          className="w-4 h-4 text-purple-600"
                        />
                        <span>Yes</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Service History
                    </label>
                    <select
                      name="serviceHistory"
                      value={formData.serviceHistory}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    >
                      <option value="">Select</option>
                      <option value="complete">Complete Records</option>
                      <option value="partial">Partial Records</option>
                      <option value="none">No Records</option>
                    </select>
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 rounded-lg hover:from-purple-700 hover:to-purple-800 transition-colors font-semibold"
                    >
                      Get Valuation
                    </button>
                  </div>
                </div>
              )}
            </form>
          </motion.div>
        )}

        {/* Results */}
        {step === 3 && estimatedValue && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg shadow-2xl p-8 text-white text-center">
              <CheckCircle className="w-16 h-16 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Estimated Trade-In Value</h2>
              <div className="text-5xl font-bold mb-4">
                PKR {estimatedValue.toLocaleString()}
              </div>
              <p className="text-blue-100">
                Based on {formData.year} {formData.make} {formData.model}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Valuation Breakdown</h3>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Vehicle</span>
                  <span className="font-semibold">{formData.year} {formData.make} {formData.model}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Mileage</span>
                  <span className="font-semibold">{parseInt(formData.mileage).toLocaleString()} km</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Condition</span>
                  <span className="font-semibold capitalize">{formData.condition}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Accidents</span>
                  <span className="font-semibold">{formData.accidents === 'yes' ? 'Yes' : 'No'}</span>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-2">Important Note</h3>
              <p className="text-sm text-gray-700">
                This is an estimated value based on the information provided. Final trade-in value may vary based on 
                physical inspection, market conditions, and dealer policies. Contact us for an accurate appraisal.
              </p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={resetForm}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
              >
                Calculate Another
              </button>
              <button
                onClick={() => window.location.href = '/contact'}
                className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 rounded-lg hover:from-purple-700 hover:to-purple-800 transition-colors font-semibold"
              >
                Contact Us
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TradeIn;
