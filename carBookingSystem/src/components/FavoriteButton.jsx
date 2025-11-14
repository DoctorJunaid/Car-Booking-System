import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useFavorites } from '../hooks/useFavorites';

const FavoriteButton = ({ carId, className = '' }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(carId);

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(carId);
      }}
      className={`p-2 rounded-lg bg-white/95 backdrop-blur-sm shadow-md hover:shadow-lg transition-all border border-gray-100 ${className}`}
      aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Heart
        className={`w-5 h-5 transition-all ${
          favorite ? 'fill-red-500 text-red-500' : 'text-gray-500 hover:text-red-500'
        }`}
      />
    </motion.button>
  );
};

export default FavoriteButton;
