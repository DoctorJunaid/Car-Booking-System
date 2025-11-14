// Centralized car data management with localStorage for Pakistani context

// Initialize default car data
const defaultCars = [
  // New Cars (2024 Models)
  {
    id: 'new-1',
    title: 'Toyota Corolla Altis Grande 1.8 CVT-i',
    brand: 'Toyota',
    model: 'Corolla',
    variant: 'Altis Grande 1.8 CVT-i',
    year: 2024,
    price: 5999000,
    mileage: 0,
    fuelType: 'Petrol',
    transmission: 'CVT',
    engine: '1800cc',
    bodyType: 'Sedan',
    color: 'Pearl White',
    city: 'Karachi',
    condition: 'new',
    certified: false,
    imageUrl: 'https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=800',
    features: ['ABS', 'Airbags', 'Climate Control', 'Cruise Control', 'Alloy Rims'],
    description: 'Brand new 2024 Toyota Corolla with full warranty and latest features.',
    sellerName: 'Toyota Indus Motors',
    sellerPhone: '0300-1234567',
    views: 456,
    inquiries: 23,
    listedDate: '2024-01-20',
    status: 'active'
  },
  {
    id: 'new-2',
    title: 'Honda Civic RS 1.5 Turbo CVT',
    brand: 'Honda',
    model: 'Civic',
    variant: 'RS 1.5 Turbo CVT',
    year: 2024,
    price: 8699000,
    mileage: 0,
    fuelType: 'Petrol',
    transmission: 'CVT',
    engine: '1500cc Turbo',
    bodyType: 'Sedan',
    color: 'Platinum White Pearl',
    city: 'Lahore',
    condition: 'new',
    certified: false,
    imageUrl: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800',
    features: ['Honda Sensing', 'Sunroof', 'Leather Seats', 'LED Headlights', 'Push Start'],
    description: 'Latest 2024 Honda Civic RS with turbo engine and advanced safety features.',
    sellerName: 'Honda Atlas Cars',
    sellerPhone: '0321-9876543',
    views: 678,
    inquiries: 34,
    listedDate: '2024-01-18',
    status: 'active'
  },
  {
    id: 'new-3',
    title: 'Suzuki Swift GLX 1.2 AGS',
    brand: 'Suzuki',
    model: 'Swift',
    variant: 'GLX 1.2 AGS',
    year: 2024,
    price: 3899000,
    mileage: 0,
    fuelType: 'Petrol',
    transmission: 'AGS',
    engine: '1200cc',
    bodyType: 'Hatchback',
    color: 'Fire Red',
    city: 'Islamabad',
    condition: 'new',
    certified: false,
    imageUrl: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800',
    features: ['Keyless Entry', 'Touchscreen', 'Rear Camera', 'Fog Lights'],
    description: 'Brand new Suzuki Swift with AGS transmission and modern features.',
    sellerName: 'Pak Suzuki Motors',
    sellerPhone: '0333-4567890',
    views: 234,
    inquiries: 15,
    listedDate: '2024-01-22',
    status: 'active'
  },
  {
    id: 'new-4',
    title: 'Toyota Fortuner Legender 2.8 4x4',
    brand: 'Toyota',
    model: 'Fortuner',
    variant: 'Legender 2.8 4x4',
    year: 2024,
    price: 14999000,
    mileage: 0,
    fuelType: 'Diesel',
    transmission: 'Automatic',
    engine: '2700cc',
    bodyType: 'SUV',
    color: 'Attitude Black',
    city: 'Karachi',
    condition: 'new',
    certified: false,
    imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800',
    features: ['4WD', 'Leather Interior', 'Sunroof', '360 Camera', 'JBL Sound System'],
    description: 'Premium SUV with powerful diesel engine and luxury features.',
    sellerName: 'Toyota Indus Motors',
    sellerPhone: '0300-1234567',
    views: 892,
    inquiries: 45,
    listedDate: '2024-01-15',
    status: 'active'
  },
  {
    id: 'new-5',
    title: 'Honda City Aspire 1.5 CVT',
    brand: 'Honda',
    model: 'City',
    variant: 'Aspire 1.5 CVT',
    year: 2024,
    price: 4699000,
    mileage: 0,
    fuelType: 'Petrol',
    transmission: 'CVT',
    engine: '1500cc',
    bodyType: 'Sedan',
    color: 'Modern Steel Metallic',
    city: 'Lahore',
    condition: 'new',
    certified: false,
    imageUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
    features: ['Cruise Control', 'Alloy Wheels', 'Rear Camera', 'Smart Entry'],
    description: 'Stylish and fuel-efficient sedan perfect for city driving.',
    sellerName: 'Honda Atlas Cars',
    sellerPhone: '0321-9876543',
    views: 345,
    inquiries: 19,
    listedDate: '2024-01-19',
    status: 'active'
  },
  {
    id: 'new-6',
    title: 'Suzuki Alto VXL AGS 660cc',
    brand: 'Suzuki',
    model: 'Alto',
    variant: 'VXL AGS',
    year: 2024,
    price: 2399000,
    mileage: 0,
    fuelType: 'Petrol',
    transmission: 'AGS',
    engine: '660cc',
    bodyType: 'Hatchback',
    color: 'Silky Silver',
    city: 'Faisalabad',
    condition: 'new',
    certified: false,
    imageUrl: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800',
    features: ['Power Windows', 'Central Locking', 'Front Power Outlet'],
    description: 'Most affordable new car with excellent fuel economy.',
    sellerName: 'Pak Suzuki Motors',
    sellerPhone: '0333-4567890',
    views: 567,
    inquiries: 28,
    listedDate: '2024-01-21',
    status: 'active'
  },

  // Certified Pre-Owned Cars (2021-2022)
  {
    id: 'cert-1',
    title: 'Toyota Corolla Altis Grande 1.8 CVT',
    brand: 'Toyota',
    model: 'Corolla',
    variant: 'Altis Grande 1.8 CVT',
    year: 2021,
    price: 4899000,
    mileage: 18000,
    fuelType: 'Petrol',
    transmission: 'CVT',
    engine: '1800cc',
    bodyType: 'Sedan',
    color: 'Silver Metallic',
    city: 'Karachi',
    condition: 'certified',
    certified: true,
    imageUrl: 'https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=800',
    features: ['150-Point Inspection', '2 Year Warranty', 'ABS', 'Airbags', 'Alloy Rims'],
    description: 'Certified pre-owned with complete service history and extended warranty.',
    sellerName: 'PakWheels Certified',
    sellerPhone: '0300-2345678',
    views: 389,
    inquiries: 21,
    listedDate: '2024-01-17',
    status: 'active'
  },
  {
    id: 'cert-2',
    title: 'Honda Civic Oriel 1.8 CVT',
    brand: 'Honda',
    model: 'Civic',
    variant: 'Oriel 1.8 CVT',
    year: 2022,
    price: 6299000,
    mileage: 12000,
    fuelType: 'Petrol',
    transmission: 'CVT',
    engine: '1800cc',
    bodyType: 'Sedan',
    color: 'Crystal Black Pearl',
    city: 'Lahore',
    condition: 'certified',
    certified: true,
    imageUrl: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800',
    features: ['Certified', 'Sunroof', 'Leather Seats', 'Navigation', 'Warranty'],
    description: 'Low mileage certified Honda Civic with full inspection report.',
    sellerName: 'PakWheels Certified',
    sellerPhone: '0321-8765432',
    views: 512,
    inquiries: 29,
    listedDate: '2024-01-16',
    status: 'active'
  },
  {
    id: 'cert-3',
    title: 'Toyota Fortuner 2.7 VVTi',
    brand: 'Toyota',
    model: 'Fortuner',
    variant: '2.7 VVTi',
    year: 2021,
    price: 11999000,
    mileage: 22000,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    engine: '2700cc',
    bodyType: 'SUV',
    color: 'White Pearl',
    city: 'Islamabad',
    condition: 'certified',
    certified: true,
    imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800',
    features: ['Certified', '4WD', 'Leather', 'Sunroof', 'Extended Warranty'],
    description: 'Premium certified SUV with complete maintenance records.',
    sellerName: 'PakWheels Certified',
    sellerPhone: '0333-5678901',
    views: 678,
    inquiries: 38,
    listedDate: '2024-01-14',
    status: 'active'
  },
  {
    id: 'cert-4',
    title: 'Honda City Aspire 1.5 CVT',
    brand: 'Honda',
    model: 'City',
    variant: 'Aspire 1.5 CVT',
    year: 2022,
    price: 3999000,
    mileage: 15000,
    fuelType: 'Petrol',
    transmission: 'CVT',
    engine: '1500cc',
    bodyType: 'Sedan',
    color: 'Lunar Silver Metallic',
    city: 'Karachi',
    condition: 'certified',
    certified: true,
    imageUrl: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800',
    features: ['Certified', 'Cruise Control', 'Alloy Wheels', 'Warranty'],
    description: 'Well-maintained certified City with low mileage.',
    sellerName: 'PakWheels Certified',
    sellerPhone: '0300-2345678',
    views: 298,
    inquiries: 17,
    listedDate: '2024-01-18',
    status: 'active'
  },

  // Used Cars (2017-2020)
  {
    id: 'used-1',
    title: 'Toyota Corolla GLi 1.3 Manual',
    brand: 'Toyota',
    model: 'Corolla',
    variant: 'GLi 1.3 Manual',
    year: 2018,
    price: 3200000,
    mileage: 45000,
    fuelType: 'Petrol',
    transmission: 'Manual',
    engine: '1300cc',
    bodyType: 'Sedan',
    color: 'White',
    city: 'Karachi',
    condition: 'used',
    certified: false,
    imageUrl: 'https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=800',
    features: ['ABS', 'Airbags', 'Power Windows', 'Original Paint'],
    description: 'Well-maintained Corolla with complete service history.',
    sellerName: 'Ahmed Khan',
    sellerPhone: '0300-3456789',
    views: 234,
    inquiries: 12,
    listedDate: '2024-01-15',
    status: 'active'
  },
  {
    id: 'used-2',
    title: 'Honda Civic VTi Oriel 1.8 Automatic',
    brand: 'Honda',
    model: 'Civic',
    variant: 'VTi Oriel 1.8',
    year: 2019,
    price: 4500000,
    mileage: 32000,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    engine: '1800cc',
    bodyType: 'Sedan',
    color: 'Black',
    city: 'Lahore',
    condition: 'used',
    certified: false,
    imageUrl: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800',
    features: ['Sunroof', 'Leather Seats', 'Alloy Rims', 'Fog Lights'],
    description: 'Excellent condition Civic with low mileage and full service record.',
    sellerName: 'Bilal Ahmed',
    sellerPhone: '0321-4567890',
    views: 189,
    inquiries: 8,
    listedDate: '2024-01-10',
    status: 'active'
  },
  {
    id: 'used-3',
    title: 'Suzuki Alto VXR 660cc',
    brand: 'Suzuki',
    model: 'Alto',
    variant: 'VXR',
    year: 2020,
    price: 1850000,
    mileage: 28000,
    fuelType: 'Petrol',
    transmission: 'Manual',
    engine: '660cc',
    bodyType: 'Hatchback',
    color: 'Silver',
    city: 'Islamabad',
    condition: 'used',
    certified: false,
    imageUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
    features: ['Power Windows', 'Central Locking', 'AC', 'CD Player'],
    description: 'Fuel-efficient Alto in excellent condition, first owner.',
    sellerName: 'Sara Ali',
    sellerPhone: '0333-6789012',
    views: 156,
    inquiries: 15,
    listedDate: '2023-12-20',
    status: 'active'
  },
  {
    id: 'used-4',
    title: 'Honda City Aspire 1.5 Automatic',
    brand: 'Honda',
    model: 'City',
    variant: 'Aspire 1.5',
    year: 2017,
    price: 2800000,
    mileage: 52000,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    engine: '1500cc',
    bodyType: 'Sedan',
    color: 'Grey',
    city: 'Multan',
    condition: 'used',
    certified: false,
    imageUrl: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800',
    features: ['Alloy Wheels', 'Rear Camera', 'Cruise Control', 'Fog Lights'],
    description: 'Reliable City with regular maintenance, accident-free.',
    sellerName: 'Hassan Raza',
    sellerPhone: '0300-7890123',
    views: 98,
    inquiries: 5,
    listedDate: '2024-01-08',
    status: 'active'
  },
  {
    id: 'used-5',
    title: 'Suzuki Cultus VXL 1.0 Manual',
    brand: 'Suzuki',
    model: 'Cultus',
    variant: 'VXL',
    year: 2019,
    price: 2100000,
    mileage: 38000,
    fuelType: 'Petrol',
    transmission: 'Manual',
    engine: '1000cc',
    bodyType: 'Hatchback',
    color: 'Red',
    city: 'Faisalabad',
    condition: 'used',
    certified: false,
    imageUrl: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800',
    features: ['Power Steering', 'AC', 'Power Windows', 'Immobilizer'],
    description: 'Clean Cultus with good fuel average, family used.',
    sellerName: 'Fatima Malik',
    sellerPhone: '0321-8901234',
    views: 145,
    inquiries: 9,
    listedDate: '2024-01-12',
    status: 'active'
  },
  {
    id: 'used-6',
    title: 'Toyota Yaris ATIV X 1.3 CVT',
    brand: 'Toyota',
    model: 'Yaris',
    variant: 'ATIV X CVT',
    year: 2020,
    price: 3400000,
    mileage: 25000,
    fuelType: 'Petrol',
    transmission: 'CVT',
    engine: '1300cc',
    bodyType: 'Sedan',
    color: 'Blue',
    city: 'Rawalpindi',
    condition: 'used',
    certified: false,
    imageUrl: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800',
    features: ['Touchscreen', 'Rear Camera', 'Alloy Wheels', 'Keyless Entry'],
    description: 'Low mileage Yaris with excellent condition, single owner.',
    sellerName: 'Usman Ali',
    sellerPhone: '0333-9012345',
    views: 178,
    inquiries: 11,
    listedDate: '2024-01-13',
    status: 'active'
  }
];

// Initialize localStorage with default data if empty
export const initializeCarData = () => {
  if (!localStorage.getItem('cars')) {
    localStorage.setItem('cars', JSON.stringify(defaultCars));
  }
};

// Get all cars
export const getAllCars = () => {
  const cars = localStorage.getItem('cars');
  return cars ? JSON.parse(cars) : defaultCars;
};

// Get cars by condition
export const getCarsByCondition = (condition) => {
  const cars = getAllCars();
  return cars.filter(car => car.condition === condition);
};

// Get new cars
export const getNewCars = () => getCarsByCondition('new');

// Get used cars
export const getUsedCars = () => getCarsByCondition('used');

// Get certified cars
export const getCertifiedCars = () => getCarsByCondition('certified');

// Get car by ID
export const getCarById = (id) => {
  const cars = getAllCars();
  return cars.find(car => car.id === id);
};

// Add new car
export const addCar = (carData) => {
  const cars = getAllCars();
  const newCar = {
    ...carData,
    id: `car-${Date.now()}`,
    views: 0,
    inquiries: 0,
    listedDate: new Date().toISOString().split('T')[0],
    status: 'active'
  };
  cars.push(newCar);
  localStorage.setItem('cars', JSON.stringify(cars));
  return newCar;
};

// Update car
export const updateCar = (id, updates) => {
  const cars = getAllCars();
  const index = cars.findIndex(car => car.id === id);
  if (index !== -1) {
    cars[index] = { ...cars[index], ...updates };
    localStorage.setItem('cars', JSON.stringify(cars));
    return cars[index];
  }
  return null;
};

// Delete car
export const deleteCar = (id) => {
  const cars = getAllCars();
  const filtered = cars.filter(car => car.id !== id);
  localStorage.setItem('cars', JSON.stringify(filtered));
  return true;
};

// Increment views
export const incrementViews = (id) => {
  const car = getCarById(id);
  if (car) {
    updateCar(id, { views: (car.views || 0) + 1 });
  }
};

// Increment inquiries
export const incrementInquiries = (id) => {
  const car = getCarById(id);
  if (car) {
    updateCar(id, { inquiries: (car.inquiries || 0) + 1 });
  }
};

// Search cars
export const searchCars = (query) => {
  const cars = getAllCars();
  const lowerQuery = query.toLowerCase();
  return cars.filter(car => 
    car.title.toLowerCase().includes(lowerQuery) ||
    car.brand.toLowerCase().includes(lowerQuery) ||
    car.model.toLowerCase().includes(lowerQuery) ||
    car.city.toLowerCase().includes(lowerQuery)
  );
};

// Filter cars
export const filterCars = (filters) => {
  let cars = getAllCars();
  
  if (filters.condition) {
    cars = cars.filter(car => car.condition === filters.condition);
  }
  
  if (filters.brand && filters.brand !== 'all') {
    cars = cars.filter(car => car.brand === filters.brand);
  }
  
  if (filters.minPrice) {
    cars = cars.filter(car => car.price >= filters.minPrice);
  }
  
  if (filters.maxPrice) {
    cars = cars.filter(car => car.price <= filters.maxPrice);
  }
  
  if (filters.year && filters.year !== 'all') {
    cars = cars.filter(car => car.year.toString() === filters.year);
  }
  
  if (filters.fuelType && filters.fuelType !== 'all') {
    cars = cars.filter(car => car.fuelType === filters.fuelType);
  }
  
  if (filters.transmission && filters.transmission !== 'all') {
    cars = cars.filter(car => car.transmission === filters.transmission);
  }
  
  if (filters.bodyType && filters.bodyType !== 'all') {
    cars = cars.filter(car => car.bodyType === filters.bodyType);
  }
  
  if (filters.city && filters.city !== 'all') {
    cars = cars.filter(car => car.city === filters.city);
  }
  
  return cars;
};

// Get unique brands
export const getBrands = () => {
  const cars = getAllCars();
  return [...new Set(cars.map(car => car.brand))].sort();
};

// Get unique cities
export const getCities = () => {
  const cars = getAllCars();
  return [...new Set(cars.map(car => car.city))].sort();
};

// Get stats
export const getStats = () => {
  const cars = getAllCars();
  return {
    total: cars.length,
    new: cars.filter(c => c.condition === 'new').length,
    used: cars.filter(c => c.condition === 'used').length,
    certified: cars.filter(c => c.condition === 'certified').length,
    active: cars.filter(c => c.status === 'active').length,
    totalViews: cars.reduce((sum, car) => sum + (car.views || 0), 0),
    totalInquiries: cars.reduce((sum, car) => sum + (car.inquiries || 0), 0)
  };
};
