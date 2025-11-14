import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { forwardRef } from 'react';

/**
 * Standardized Button Component
 * 
 * Variants:
 * - primary: Blue gradient, main CTAs
 * - secondary: White with border, secondary actions
 * - success: Green, positive actions (sell, confirm)
 * - danger: Red, destructive actions (delete, cancel)
 * - ghost: Transparent with border, subtle actions
 * - link: Text only, inline actions
 * 
 * Sizes:
 * - sm: Small (py-2 px-4)
 * - md: Medium (py-3 px-6) - default
 * - lg: Large (py-4 px-8)
 * 
 * Usage:
 * <Button variant="primary" size="md">Click Me</Button>
 * <Button variant="secondary" to="/path">Link Button</Button>
 * <Button variant="success" onClick={handler}>Action</Button>
 */

const Button = forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  icon: Icon,
  iconPosition = 'left',
  to,
  href,
  onClick,
  type = 'button',
  className = '',
  ...props
}, ref) => {
  
  // Base styles
  const baseStyles = 'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  // Size styles
  const sizeStyles = {
    sm: 'text-sm py-2 px-4',
    md: 'text-base py-3 px-6',
    lg: 'text-lg py-4 px-8'
  };
  
  // Variant styles
  const variantStyles = {
    primary: 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 focus:ring-purple-500',
    secondary: 'bg-white text-gray-900 border-2 border-gray-300 hover:bg-gray-50 hover:border-gray-400 active:scale-95 focus:ring-gray-500',
    success: 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 focus:ring-green-500',
    danger: 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 focus:ring-red-500',
    ghost: 'bg-transparent text-gray-700 border-2 border-gray-300 hover:bg-gray-50 hover:border-gray-400 active:scale-95 focus:ring-gray-500',
    link: 'bg-transparent text-purple-600 hover:text-purple-600 hover:underline p-0 shadow-none'
  };
  
  // Width styles
  const widthStyles = fullWidth ? 'w-full' : '';
  
  // Combine all styles
  const combinedStyles = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyles} ${className}`;
  
  // Loading spinner
  const LoadingSpinner = () => (
    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );
  
  // Button content
  const ButtonContent = () => (
    <>
      {loading && <LoadingSpinner />}
      {!loading && Icon && iconPosition === 'left' && <Icon className="w-5 h-5" />}
      {children}
      {!loading && Icon && iconPosition === 'right' && <Icon className="w-5 h-5" />}
    </>
  );
  
  // Render as Link (React Router)
  if (to) {
    return (
      <motion.div
        whileHover={{ scale: variant === 'link' ? 1 : 1.02 }}
        whileTap={{ scale: variant === 'link' ? 1 : 0.98 }}
      >
        <Link
          ref={ref}
          to={to}
          className={combinedStyles}
          {...props}
        >
          <ButtonContent />
        </Link>
      </motion.div>
    );
  }
  
  // Render as anchor (external link)
  if (href) {
    return (
      <motion.a
        ref={ref}
        href={href}
        className={combinedStyles}
        whileHover={{ scale: variant === 'link' ? 1 : 1.02 }}
        whileTap={{ scale: variant === 'link' ? 1 : 0.98 }}
        {...props}
      >
        <ButtonContent />
      </motion.a>
    );
  }
  
  // Render as button
  return (
    <motion.button
      ref={ref}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={combinedStyles}
      whileHover={{ scale: variant === 'link' ? 1 : 1.02 }}
      whileTap={{ scale: variant === 'link' ? 1 : 0.98 }}
      {...props}
    >
      <ButtonContent />
    </motion.button>
  );
});

Button.displayName = 'Button';

export default Button;
