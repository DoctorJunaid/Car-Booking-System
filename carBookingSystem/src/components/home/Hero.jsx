import React, { useState } from "react";
import { motion } from "framer-motion";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

// Luxury car image - PNG with transparent background
const heroImage = "./hero2.png";

// Popular car brands with real logos
const carBrands = [
  { name: "Mercedes", logo: "https://www.carlogos.org/car-logos/mercedes-benz-logo.png" },
  { name: "Tesla", logo: "https://www.carlogos.org/car-logos/tesla-logo.png" },
  { name: "BMW", logo: "https://www.carlogos.org/car-logos/bmw-logo.png" },
  { name: "Toyota", logo: "https://www.carlogos.org/car-logos/toyota-logo.png" },
  { name: "Honda", logo: "https://www.carlogos.org/car-logos/honda-logo.png" },
  { name: "Audi", logo: "https://www.carlogos.org/car-logos/audi-logo.png" },
  { name: "Hyundai", logo: "https://www.carlogos.org/car-logos/hyundai-logo.png" },
  { name: "Suzuki", logo: "https://www.carlogos.org/car-logos/suzuki-logo.png" },
];

const HeroSection = () => {
  const carMakes = [
    { id: 1, name: "Tesla", models: ["Model S", "Model 3", "Model X", "Model Y"] },
    { id: 2, name: "BMW", models: ["X5", "3 Series", "5 Series", "X3"] },
    { id: 3, name: "Toyota", models: ["Camry", "Corolla", "RAV4", "Highlander"] },
    { id: 4, name: "Mercedes", models: ["C-Class", "E-Class", "GLE", "GLA"] },
    { id: 5, name: "Audi", models: ["A4", "Q5", "A6", "Q7"] },
    { id: 6, name: "Honda", models: ["Civic", "Accord", "CR-V", "Pilot"] },
  ];

  const carTypes = [
    { id: 1, label: "Sedan", value: "sedan" },
    { id: 2, label: "SUV", value: "suv" },
    { id: 3, label: "Sports", value: "sports" },
    { id: 4, label: "Luxury", value: "luxury" },
    { id: 5, label: "Electric", value: "electric" },
  ];

  const [selectedMake, setSelectedMake] = useState("");
  const [availableModels, setAvailableModels] = useState([]);
  const [searchData, setSearchData] = useState({
    brand: "",
    model: "",
    type: "",
  });

  const handleMakeChange = (makeValue) => {
    setSelectedMake(makeValue);
    setSearchData({ ...searchData, brand: makeValue, model: "" });
    const selectedCar = carMakes.find((car) => car.name === makeValue);
    setAvailableModels(selectedCar ? selectedCar.models : []);
  };

  const handleSearch = () => {
    window.location.href = '/cars/used';
  };

  const getBrandLabel = () => searchData.brand || "Brand";
  const getModelLabel = () => searchData.model || "Model";
  const getTypeLabel = () => {
    const type = carTypes.find((t) => t.value === searchData.type);
    return type ? type.label : "Type";
  };

  return (
    <section className="relative bg-gradient-to-br from-purple-50 via-white to-cyan-50 overflow-hidden flex items-center py-3">
      {/* Decorative background blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-6 lg:mb-8">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 z-10"
          >
            {/* Circular Stats Badge */}
            <div className="inline-flex items-center gap-4">
              <div className="relative w-28 h-28">
                {/* Outer circle background */}
                <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r="52"
                    fill="none"
                    stroke="rgba(168,85,247,0.1)"
                    strokeWidth="3"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="52"
                    fill="none"
                    stroke="#a855f7"
                    strokeWidth="3"
                    strokeDasharray="326.73"
                    strokeDashoffset="81.68"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-[10px] text-gray-600 font-medium uppercase tracking-wide">Cars Listed</div>
                  <div className="text-3xl font-bold text-gray-900 mt-1">250+</div>
                  <div className="text-xs text-purple-600 font-medium">Verified</div>
                </div>
              </div>
              <div className="text-[11px] text-gray-600 uppercase tracking-widest font-medium">
                TRUSTED SELLERS
              </div>
            </div>

            {/* Main Heading */}
            <div className="space-y-3">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-none text-gray-900 tracking-tight">
                Find Your
                <br />
                <span className="bg-gradient-to-r from-purple-600 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                  Dream Car
                </span>
              </h1>
              <p className="text-base text-gray-600 max-w-md leading-relaxed">
                Discover thousands of quality vehicles with transparent pricing, verified sellers, and comprehensive vehicle history reports.
              </p>
            </div>

            {/* Search Form */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-purple-200/50 shadow-xl">
              <div className="grid grid-cols-3 gap-3 mb-4">
                {/* Brand Dropdown */}
                <Menu as="div" className="relative">
                  <MenuButton className="w-full flex items-center justify-between px-4 py-3.5 bg-purple-50 hover:bg-purple-100 rounded-lg border border-purple-200 hover:border-purple-300 transition-all font-medium text-sm text-gray-700">
                    <span className="truncate">{getBrandLabel()}</span>
                    <ChevronDownIcon className="w-4 h-4 text-purple-600" />
                  </MenuButton>
                  <MenuItems className="absolute z-50 mt-2 w-full rounded-lg bg-white shadow-2xl border border-purple-200 p-1.5 max-h-60 overflow-y-auto">
                    {carMakes.map((car) => (
                      <MenuItem key={car.id}>
                        <button
                          onClick={() => handleMakeChange(car.name)}
                          className="w-full text-left px-3 py-2 rounded text-sm font-medium text-gray-700 hover:bg-gradient-to-r hover:from-purple-600 hover:to-purple-700 hover:text-white transition-all"
                        >
                          {car.name}
                        </button>
                      </MenuItem>
                    ))}
                  </MenuItems>
                </Menu>

                {/* Model Dropdown */}
                <Menu as="div" className="relative">
                  <MenuButton
                    disabled={!selectedMake}
                    className="w-full flex items-center justify-between px-4 py-3.5 bg-purple-50 hover:bg-purple-100 rounded-lg border border-purple-200 hover:border-purple-300 transition-all font-medium text-sm text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <span className="truncate">{getModelLabel()}</span>
                    <ChevronDownIcon className="w-4 h-4 text-purple-600" />
                  </MenuButton>
                  <MenuItems className="absolute z-50 mt-2 w-full rounded-lg bg-white shadow-2xl border border-purple-200 p-1.5 max-h-60 overflow-y-auto">
                    {availableModels.map((model, index) => (
                      <MenuItem key={index}>
                        <button
                          onClick={() => setSearchData({ ...searchData, model })}
                          className="w-full text-left px-3 py-2 rounded text-sm font-medium text-gray-700 hover:bg-gradient-to-r hover:from-purple-600 hover:to-purple-700 hover:text-white transition-all"
                        >
                          {model}
                        </button>
                      </MenuItem>
                    ))}
                  </MenuItems>
                </Menu>

                {/* Type Dropdown */}
                <Menu as="div" className="relative">
                  <MenuButton className="w-full flex items-center justify-between px-4 py-3.5 bg-purple-50 hover:bg-purple-100 rounded-lg border border-purple-200 hover:border-purple-300 transition-all font-medium text-sm text-gray-700">
                    <span className="truncate">{getTypeLabel()}</span>
                    <ChevronDownIcon className="w-4 h-4 text-purple-600" />
                  </MenuButton>
                  <MenuItems className="absolute z-50 mt-2 w-full rounded-lg bg-white shadow-2xl border border-purple-200 p-1.5">
                    {carTypes.map((type) => (
                      <MenuItem key={type.id}>
                        <button
                          onClick={() => setSearchData({ ...searchData, type: type.value })}
                          className="w-full text-left px-3 py-2 rounded text-sm font-medium text-gray-700 hover:bg-gradient-to-r hover:from-purple-600 hover:to-purple-700 hover:text-white transition-all"
                        >
                          {type.label}
                        </button>
                      </MenuItem>
                    ))}
                  </MenuItems>
                </Menu>
              </div>

              {/* Search Button */}
              <motion.button
                onClick={handleSearch}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-full font-bold text-sm shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all"
              >
                Search Cars
              </motion.button>
            </div>

            {/* Quick Stats - Centered */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-900">Verified</div>
                  <div className="text-[10px] text-gray-600">All Sellers</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-900">Best Price</div>
                  <div className="text-[10px] text-gray-600">Guaranteed</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-900">98% Rating</div>
                  <div className="text-[10px] text-gray-600">Satisfaction</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Car Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative z-10"
          >
            <div className="relative">
              {/* Car Image - PNG with transparent background */}
              <img
                src={heroImage}
                alt="Luxury Car"
                className="w-full h-[300px] object-cover drop-shadow-[0_0_80px_rgba(168,85,247,0.4)]"
                onError={(e) => {
                  e.currentTarget.src = 'https://www.pngmart.com/files/22/Lamborghini-PNG-Isolated-File.png';
                }}
              />
              
              {/* Purple/Cyan glow effect behind car */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[70%] bg-gradient-to-r from-purple-500/20 to-cyan-500/20 blur-[120px] -z-10"></div>
            </div>
          </motion.div>
        </div>

        {/* Brand Logos Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="pt-6 lg:pt-8 border-t border-purple-200"
        >
          <p className="text-center text-sm text-gray-500 mb-5 font-medium">
            Browse Popular Brands
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12">
            {carBrands.map((brand, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.08 }}
                className="grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all cursor-pointer"
                title={brand.name}
              >
                <img 
                  src={brand.logo} 
                  alt={brand.name}
                  className="h-8 w-auto object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Custom CSS for blob animation */}
      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -50px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(50px, 50px) scale(1.05); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
