import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  width,
  height,
  priority = false,
  objectFit = 'cover',
  placeholder = 'blur',
  onLoad,
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [imageSrc, setImageSrc] = useState(priority ? src : null);
  const imgRef = useRef(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            setImageSrc(src);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px', // Start loading 50px before image enters viewport
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [src, priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };

  // Convert Unsplash URLs to optimized format
  const getOptimizedSrc = (url) => {
    if (!url) return url;
    
    // If it's an Unsplash image, add optimization parameters
    if (url.includes('unsplash.com')) {
      const separator = url.includes('?') ? '&' : '?';
      return `${url}${separator}auto=format&fit=crop&w=${width || 800}&q=80`;
    }
    
    // If it's a Pexels image, it's already optimized
    if (url.includes('pexels.com')) {
      return url;
    }
    
    return url;
  };

  const optimizedSrc = getOptimizedSrc(imageSrc);

  return (
    <div 
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{ 
        width: width ? `${width}px` : '100%',
        height: height ? `${height}px` : '100%'
      }}
    >
      {/* Placeholder/Skeleton */}
      {!isLoaded && (
        <div 
          className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"
          style={{ 
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite'
          }}
        />
      )}

      {/* Actual Image */}
      {(isInView || priority) && optimizedSrc && (
        <motion.img
          src={optimizedSrc}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          onLoad={handleLoad}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className={`absolute inset-0 w-full h-full object-${objectFit}`}
          {...props}
        />
      )}
    </div>
  );
};

// Add shimmer animation to global styles
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
  `;
  document.head.appendChild(style);
}

export default OptimizedImage;
