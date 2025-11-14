import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Gauge, 
  Fuel, 
  Cog, 
  Calendar, 
  MapPin, 
  Phone, 
  Mail, 
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';
import { getCarById, incrementViews } from '../utils/carData';

const CarDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch car data by ID
    const carData = getCarById(id);
    
    if (carData) {
      setCar(carData);
      // Increment view count
      incrementViews(id);
    }
    
    setLoading(false);
  }, [id]);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 pb-12 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading car details...</p>
        </div>
      </div>
    );
  }

  // Show not found state
  if (!car) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 pb-12 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Car Not Found</h1>
          <p className="text-gray-600 mb-6">The car you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate('/cars/used')}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-purple-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Browse Cars
          </button>
        </div>
      </div>
    );
  }

  // Prepare images array (use single image if no array)
  const images = car.imageUrl ? [car.imageUrl] : [];
  
  // Prepare car data for display
  const carData = {
    id: car.id,
    title: car.title,
    subtitle: car.variant || `${car.engine} ${car.transmission}`,
    price: car.price,
    images: images,
    specs: {
      mileage: car.mileage ? `${car.mileage.toLocaleString()} km` : '0 km',
      fuelType: car.fuelType,
      transmission: car.transmission,
      year: car.year.toString(),
      location: car.city,
      engine: car.engine,
      bodyType: car.bodyType,
      color: car.color
    },
    features: car.features || [],
    description: car.description,
    seller: {
      name: car.sellerName,
      phone: car.sellerPhone,
      location: car.city
    },
    condition: car.condition,
    certified: car.certified,
    views: car.views || 0,
    listedDate: car.listedDate
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === carData.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? carData.images.length - 1 : prev - 1
    );
  };

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PKR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(carData.price);

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to listings</span>
        </button>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{carData.title}</h1>
              <p className="text-lg text-gray-600">{carData.subtitle}</p>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                <span className="capitalize">{carData.condition}</span>
                <span>•</span>
                <span>{carData.views} views</span>
                <span>•</span>
                <span>Listed {new Date(carData.listedDate).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Image Gallery */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative">
                <img
                  src={carData.images[currentImageIndex]}
                  alt={carData.title}
                  className="w-full h-96 object-cover"
                />
                
                {/* Navigation Buttons */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-lg p-2 shadow-lg transition-colors"
                >
                  <ChevronLeft className="h-6 w-6 text-gray-700" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-lg p-2 shadow-lg transition-colors"
                >
                  <ChevronRight className="h-6 w-6 text-gray-700" />
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-lg text-sm">
                  {currentImageIndex + 1} / {carData.images.length}
                </div>
              </div>

              {/* Thumbnail Images */}
              <div className="p-4 flex gap-3 overflow-x-auto">
                {carData.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`shrink-0 w-24 h-20 rounded-xl overflow-hidden border-2 transition-all hover:scale-105 ${
                      index === currentImageIndex ? 'border-purple-600 shadow-lg' : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${carData.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Specifications */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Specifications</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Calendar className="h-5 w-5 text-purple-700" />
                  <div>
                    <p className="text-xs text-gray-600">Year</p>
                    <p className="font-semibold">{carData.specs.year}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Gauge className="h-5 w-5 text-purple-700" />
                  <div>
                    <p className="text-xs text-gray-600">Mileage</p>
                    <p className="font-semibold">{carData.specs.mileage}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Fuel className="h-5 w-5 text-purple-700" />
                  <div>
                    <p className="text-xs text-gray-600">Fuel Type</p>
                    <p className="font-semibold">{carData.specs.fuelType}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Cog className="h-5 w-5 text-purple-700" />
                  <div>
                    <p className="text-xs text-gray-600">Transmission</p>
                    <p className="font-semibold">{carData.specs.transmission}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Cog className="h-5 w-5 text-purple-700" />
                  <div>
                    <p className="text-xs text-gray-600">Engine</p>
                    <p className="font-semibold">{carData.specs.engine}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <MapPin className="h-5 w-5 text-purple-700" />
                  <div>
                    <p className="text-xs text-gray-600">Body Type</p>
                    <p className="font-semibold">{carData.specs.bodyType}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-5 h-5 rounded-full border-2 border-blue-900" style={{ backgroundColor: carData.specs.color === 'White' ? '#fff' : carData.specs.color === 'Black' ? '#000' : carData.specs.color === 'Silver' ? '#c0c0c0' : '#666' }}></div>
                  <div>
                    <p className="text-xs text-gray-600">Color</p>
                    <p className="font-semibold">{carData.specs.color}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <MapPin className="h-5 w-5 text-purple-700" />
                  <div>
                    <p className="text-xs text-gray-600">Location</p>
                    <p className="font-semibold">{carData.specs.location}</p>
                  </div>
                </div>
                {carData.certified && (
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <div>
                      <p className="text-xs text-green-600">Status</p>
                      <p className="font-semibold text-green-700">Certified</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Social Proof */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Popularity</h2>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Live
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">{carData.views || 0}</div>
                  <div className="text-xs text-gray-600 mt-1">Total Views</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">{Math.floor((carData.views || 0) / 10)}</div>
                  <div className="text-xs text-gray-600 mt-1">Interested Buyers</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">4.8</div>
                  <div className="text-xs text-gray-600 mt-1">Seller Rating</div>
                </div>
              </div>
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <span className="font-semibold">⚡ High Interest:</span> {Math.floor((carData.views || 0) / 5)} people viewed this in the last 24 hours
                </p>
              </div>
            </div>

            {/* Vehicle History Report */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg shadow-lg p-6 border border-purple-100">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Vehicle History Report</h2>
                  <p className="text-sm text-gray-600">Comprehensive vehicle background check</p>
                </div>
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-lg text-xs font-semibold">
                  Available
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 text-xl">✓</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">No Accidents</p>
                      <p className="text-xs text-gray-600">Clean accident history</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 text-xl">✓</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Single Owner</p>
                      <p className="text-xs text-gray-600">One previous owner</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 text-xl">✓</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Service Records</p>
                      <p className="text-xs text-gray-600">Complete maintenance history</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 text-xl">✓</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Title Status</p>
                      <p className="text-xs text-gray-600">Clean title, no issues</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 rounded-lg hover:from-purple-700 hover:to-purple-800 transition-colors font-semibold">
                View Full History Report
              </button>
            </div>

            {/* Features */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Features</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {carData.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-600 to-purple-700 rounded-full"></div>
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Description</h2>
              <p className="text-gray-700 leading-relaxed">{carData.description}</p>
            </div>
          </div>

          {/* Right Column - Price and Contact */}
          <div className="space-y-6">
            
            {/* Price Card */}
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <div className="text-3xl font-bold text-gray-900">{formattedPrice}</div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className={`p-2 rounded-lg transition-colors ${
                      isLiked ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
                  </button>
                  <button className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 text-gray-600 mb-6">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{carData.specs.location}</span>
              </div>

              <div className="space-y-3">
                <button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 px-4 rounded-lg font-semibold hover:from-purple-700 hover:to-purple-800 transition-colors">
                  Contact Seller
                </button>
                <button className="w-full border border-blue-900 text-purple-700 py-3 px-4 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
                  Schedule Test Drive
                </button>
              </div>
            </div>

            {/* Seller Info */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Seller Information</h3>
              <div className="space-y-3">
                <div>
                  <p className="font-semibold text-gray-900">{carData.seller.name}</p>
                  <p className="text-sm text-gray-600">{carData.seller.location}</p>
                </div>
                <a 
                  href={`tel:${carData.seller.phone}`}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Phone className="h-4 w-4 text-purple-700" />
                  <span className="text-sm">{carData.seller.phone}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;
