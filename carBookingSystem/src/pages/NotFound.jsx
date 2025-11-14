import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search, Car } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  const popularLinks = [
    { to: '/cars/used', label: 'Used Cars', icon: Car },
    { to: '/cars/new', label: 'New Cars', icon: Car },
    { to: '/cars/certified', label: 'Certified Cars', icon: Car },
    { to: '/about', label: 'About Us', icon: Search },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          {/* 404 Illustration */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="mb-8"
          >
            <div className="relative inline-block">
              <h1 className="text-[150px] sm:text-[200px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 leading-none">
                404
              </h1>
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  y: [0, -10, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: 'reverse'
                }}
                className="absolute -top-8 -right-8 sm:-right-12"
              >
                <Car className="w-16 h-16 sm:w-20 sm:h-20 text-purple-600" />
              </motion.div>
            </div>
          </motion.div>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Oops! Wrong Turn
            </h2>
            <p className="text-lg text-gray-600 mb-2">
              Looks like this page took a detour and got lost.
            </p>
            <p className="text-gray-500">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <motion.button
              onClick={() => navigate(-1)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-purple-600 text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-colors shadow-md"
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </motion.button>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-purple-800 transition-colors shadow-md"
              >
                <Home className="w-5 h-5" />
                Back to Home
              </Link>
            </motion.div>
          </motion.div>

          {/* Popular Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Popular Pages
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {popularLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    <Link
                      to={link.to}
                      className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-purple-50 transition-colors group"
                    >
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-purple-600 transition-colors">
                        <Icon className="w-6 h-6 text-purple-600 group-hover:text-white transition-colors" />
                      </div>
                      <span className="text-sm font-medium text-gray-700 group-hover:text-purple-600 transition-colors">
                        {link.label}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Decorative Elements */}
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              repeatType: 'reverse'
            }}
            className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full blur-3xl -z-10"
          />
          <motion.div
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              repeatType: 'reverse',
              delay: 1
            }}
            className="absolute bottom-20 right-10 w-32 h-32 bg-purple-200 rounded-full blur-3xl -z-10"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
