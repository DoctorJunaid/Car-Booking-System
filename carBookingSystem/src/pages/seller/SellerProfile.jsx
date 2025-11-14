import { useState } from 'react';
import { User, Mail, Phone, MapPin, Building, Save, Camera, Shield, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const SellerProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Muhammad Ahmed',
    email: 'ahmed@email.com',
    phone: '+92 300 1234567',
    whatsapp: '+92 300 1234567',
    city: 'Karachi',
    address: 'DHA Phase 5, Karachi',
    businessName: 'Ahmed Auto Traders',
    cnic: '42101-1234567-1',
    ntn: 'NTN-1234567',
    bio: 'Professional car dealer with 10+ years of experience. Specializing in Japanese imported cars.',
    profileImage: 'https://ui-avatars.com/api/?name=Muhammad+Ahmed&size=200&background=1e3a8a&color=fff'
  });

  const [stats] = useState({
    totalSales: 45,
    rating: 4.8,
    reviews: 38,
    responseRate: 95,
    memberSince: '2020'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    console.log('Saving profile:', profileData);
    setIsEditing(false);
    // TODO: Add API call to save profile
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData(prev => ({
          ...prev,
          profileImage: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Seller Profile</h1>
          <p className="text-gray-600 mt-2">Manage your profile information and credentials</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <div className="text-center">
                <div className="relative inline-block">
                  <img
                    src={profileData.profileImage}
                    alt={profileData.name}
                    className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-purple-100"
                  />
                  {isEditing && (
                    <label className="absolute bottom-0 right-0 bg-gradient-to-r from-purple-600 to-purple-700 text-white p-2 rounded-lg cursor-pointer hover:from-purple-700 hover:to-purple-800 transition-colors">
                      <Camera className="w-4 h-4" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
                <h2 className="text-xl font-bold text-gray-900 mt-4">{profileData.name}</h2>
                <p className="text-sm text-gray-600">{profileData.businessName}</p>
                
                <div className="flex items-center justify-center gap-1 mt-3">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="font-semibold text-gray-900">{stats.rating}</span>
                  <span className="text-sm text-gray-600">({stats.reviews} reviews)</span>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Total Sales</span>
                    <span className="font-semibold text-gray-900">{stats.totalSales}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Response Rate</span>
                    <span className="font-semibold text-green-600">{stats.responseRate}%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Member Since</span>
                    <span className="font-semibold text-gray-900">{stats.memberSince}</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-center gap-2 text-sm text-green-600">
                    <Shield className="w-5 h-5" />
                    <span className="font-medium">Verified Seller</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Profile Information</h2>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 text-purple-700 border border-blue-900 rounded-lg hover:bg-purple-50 transition-colors"
                  >
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-colors flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      Save Changes
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          name="name"
                          value={profileData.name}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-50 disabled:text-gray-600"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="email"
                          name="email"
                          value={profileData.email}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-50 disabled:text-gray-600"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="tel"
                          name="phone"
                          value={profileData.phone}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-50 disabled:text-gray-600"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        WhatsApp Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="tel"
                          name="whatsapp"
                          value={profileData.whatsapp}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-50 disabled:text-gray-600"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          name="city"
                          value={profileData.city}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-50 disabled:text-gray-600"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          name="address"
                          value={profileData.address}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-50 disabled:text-gray-600"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Business Information */}
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Business Name
                      </label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          name="businessName"
                          value={profileData.businessName}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-50 disabled:text-gray-600"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CNIC Number
                      </label>
                      <input
                        type="text"
                        name="cnic"
                        value={profileData.cnic}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-50 disabled:text-gray-600"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        NTN Number (Optional)
                      </label>
                      <input
                        type="text"
                        name="ntn"
                        value={profileData.ntn}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-50 disabled:text-gray-600"
                      />
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">About</h3>
                  <textarea
                    name="bio"
                    value={profileData.bio}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-50 disabled:text-gray-600"
                    placeholder="Tell buyers about yourself and your business..."
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerProfile;
