import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

const ImageLightbox = ({ images, initialIndex = 0, isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
              aria-label="Close"
            >
              <X className="w-8 h-8" />
            </button>

            <button
              onClick={handlePrevious}
              className="absolute left-4 text-white hover:text-gray-300 transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft className="w-12 h-12" />
            </button>

            <motion.img
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              src={images[currentIndex]}
              alt={`Image ${currentIndex + 1}`}
              className="max-w-full max-h-[90vh] object-contain"
            />

            <button
              onClick={handleNext}
              className="absolute right-4 text-white hover:text-gray-300 transition-colors"
              aria-label="Next"
            >
              <ChevronRight className="w-12 h-12" />
            </button>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm">
              {currentIndex + 1} / {images.length}
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ImageLightbox;
