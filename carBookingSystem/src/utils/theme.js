// Unified Theme Configuration for AutoChoice - Premium Edition

export const colors = {
  // Primary Brand Colors - Purple/Violet Theme
  primary: {
    50: '#faf5ff',
    100: '#f3e8ff',
    200: '#e9d5ff',
    300: '#d8b4fe',
    400: '#c084fc',
    500: '#a855f7',
    600: '#9333ea',
    700: '#7e22ce',
    800: '#6b21a8',
    900: '#581c87',
  },
  
  // Secondary Brand Colors - Teal/Cyan
  secondary: {
    50: '#ecfeff',
    100: '#cffafe',
    200: '#a5f3fc',
    300: '#67e8f9',
    400: '#22d3ee',
    500: '#06b6d4',
    600: '#0891b2',
    700: '#0e7490',
    800: '#155e75',
    900: '#164e63',
  },
  
  // Accent Colors
  accent: {
    orange: '#fb923c',
    green: '#34d399',
    red: '#f87171',
    yellow: '#fbbf24',
    pink: '#f472b6',
  },
  
  // Neutral Colors - Warmer tones
  gray: {
    50: '#fafaf9',
    100: '#f5f5f4',
    200: '#e7e5e4',
    300: '#d6d3d1',
    400: '#a8a29e',
    500: '#78716c',
    600: '#57534e',
    700: '#44403c',
    800: '#292524',
    900: '#1c1917',
  }
};

export const spacing = {
  xs: '0.5rem',    // 8px
  sm: '0.75rem',   // 12px
  md: '1rem',      // 16px
  lg: '1.5rem',    // 24px
  xl: '2rem',      // 32px
  '2xl': '3rem',   // 48px
  '3xl': '4rem',   // 64px
};

export const borderRadius = {
  sm: '0.5rem',    // 8px
  md: '0.875rem',  // 14px
  lg: '1.25rem',   // 20px
  xl: '1.75rem',   // 28px
  '2xl': '2rem',   // 32px
  '3xl': '2.5rem', // 40px
  full: '9999px',
};

export const shadows = {
  sm: '0 2px 4px 0 rgb(0 0 0 / 0.06)',
  md: '0 6px 12px -2px rgb(0 0 0 / 0.12)',
  lg: '0 12px 24px -4px rgb(0 0 0 / 0.15)',
  xl: '0 24px 48px -8px rgb(0 0 0 / 0.18)',
  '2xl': '0 32px 64px -16px rgb(0 0 0 / 0.22)',
  glow: '0 0 20px rgb(168 85 247 / 0.4)',
  glowLg: '0 0 40px rgb(168 85 247 / 0.5)',
};

export const transitions = {
  fast: '150ms ease-in-out',
  normal: '200ms ease-in-out',
  slow: '300ms ease-in-out',
};

// Status Colors
export const statusColors = {
  success: {
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    border: 'border-emerald-300',
    icon: 'text-emerald-600',
  },
  error: {
    bg: 'bg-rose-50',
    text: 'text-rose-700',
    border: 'border-rose-300',
    icon: 'text-rose-600',
  },
  warning: {
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    border: 'border-amber-300',
    icon: 'text-amber-600',
  },
  info: {
    bg: 'bg-cyan-50',
    text: 'text-cyan-700',
    border: 'border-cyan-300',
    icon: 'text-cyan-600',
  },
};

// Button Variants
export const buttonVariants = {
  primary: 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-lg hover:shadow-xl',
  secondary: 'bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white shadow-lg hover:shadow-xl',
  success: 'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl',
  danger: 'bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl',
  ghost: 'hover:bg-purple-50 text-purple-700 border border-purple-200',
  outline: 'bg-white hover:bg-purple-50 text-purple-700 border-2 border-purple-300 shadow-sm',
};

// Card Styles
export const cardStyles = {
  default: 'bg-white rounded-2xl shadow-lg border border-purple-100/50',
  hover: 'bg-white rounded-2xl shadow-lg border border-purple-100/50 hover:shadow-2xl hover:border-purple-200 transition-all duration-300',
  flat: 'bg-white rounded-xl border-2 border-gray-200',
  gradient: 'bg-gradient-to-br from-white to-purple-50/30 rounded-2xl shadow-lg border border-purple-100',
};

export default {
  colors,
  spacing,
  borderRadius,
  shadows,
  transitions,
  statusColors,
  buttonVariants,
  cardStyles,
};
