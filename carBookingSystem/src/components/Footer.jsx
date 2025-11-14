import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';
import TrustBadges from './TrustBadges';
import { useToast } from './Toast';

const footerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      // Store in localStorage for demo purposes
      const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
      
      if (subscribers.includes(email)) {
        toast.info('You are already subscribed!');
      } else {
        subscribers.push(email);
        localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers));
        toast.success('Successfully subscribed to our newsletter!');
        setEmail('');
      }
      
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <motion.footer 
      className="bg-gradient-to-br from-purple-50 via-white to-cyan-50 border-t-2 border-purple-200"
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand Section */}
          <motion.div variants={itemVariants}>
            <Link to="/" className="flex items-center gap-1 group">
              <span className="font-bold text-2xl bg-gradient-to-r from-purple-700 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                AutoChoice
              </span>
            </Link>
            <p className="text-gray-600 mt-4 text-sm leading-relaxed font-medium">
              Your trusted partner in finding the perfect car. Quality, transparency, and service you can count on.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="font-bold text-gray-900 mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/cars/used" className="text-sm font-medium text-gray-600 hover:text-purple-700 transition-colors">Used Cars</Link></li>
              <li><Link to="/cars/new" className="text-sm font-medium text-gray-600 hover:text-purple-700 transition-colors">New Cars</Link></li>
              <li><Link to="/signup?as=seller" className="text-sm font-medium text-gray-600 hover:text-purple-700 transition-colors">Sell Your Car</Link></li>
              <li><Link to="/cars/certified" className="text-sm font-medium text-gray-600 hover:text-purple-700 transition-colors">Certified Cars</Link></li>
              <li><Link to="/trade-in" className="text-sm font-medium text-gray-600 hover:text-purple-700 transition-colors">Trade-In Value</Link></li>
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div variants={itemVariants}>
            <h4 className="font-bold text-gray-900 mb-4 text-lg">Company</h4>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-sm font-medium text-gray-600 hover:text-purple-700 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-sm font-medium text-gray-600 hover:text-purple-700 transition-colors">Contact</Link></li>
              <li><Link to="/faqs" className="text-sm font-medium text-gray-600 hover:text-purple-700 transition-colors">FAQs</Link></li>
              <li><Link to="/compare" className="text-sm font-medium text-gray-600 hover:text-purple-700 transition-colors">Compare Cars</Link></li>
              <li><Link to="/privacy" className="text-sm font-medium text-gray-600 hover:text-purple-700 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-sm font-medium text-gray-600 hover:text-purple-700 transition-colors">Terms of Service</Link></li>
            </ul>
          </motion.div>

          {/* Newsletter Section – Fixed responsiveness */}
          <motion.div variants={itemVariants}>
            <h4 className="font-bold text-gray-900 mb-4 text-lg">Stay in the Loop</h4>
            <p className="text-gray-600 text-sm mb-4 font-medium">
              Get the latest deals and offers straight to your inbox.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 w-full">
              <input
                type="email"
                aria-label="Email Address"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                className="flex-1 min-w-0 px-4 py-3 text-sm text-gray-900 border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 px-5 py-3 text-sm font-bold text-white shadow-lg hover:shadow-xl hover:from-purple-700 hover:to-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Trust Badges */}
      <motion.div className="border-t-2 border-purple-200 bg-white/50 backdrop-blur-sm" variants={itemVariants}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <TrustBadges variant="compact" />
        </div>
      </motion.div>

      {/* Bottom Bar */}
      <motion.div className="border-t-2 border-purple-200" variants={itemVariants}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <p className="text-sm text-gray-600 font-medium text-center sm:text-left">
              © {new Date().getFullYear()} AutoChoice. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-600 font-medium">
              <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span>Secured with SSL</span>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <a 
              href="https://facebook.com/autochoicepk" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Follow us on Facebook" 
              className="text-gray-500 hover:text-[#1877F2] transition-all transform hover:scale-125"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a 
              href="https://twitter.com/autochoicepk" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Follow us on Twitter" 
              className="text-gray-500 hover:text-[#1DA1F2] transition-all transform hover:scale-125"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a 
              href="https://instagram.com/autochoicepk" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Follow us on Instagram" 
              className="text-gray-500 hover:text-[#E4405F] transition-all transform hover:scale-125"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a 
              href="https://linkedin.com/company/autochoice-pakistan" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Follow us on LinkedIn" 
              className="text-gray-500 hover:text-[#0A66C2] transition-all transform hover:scale-125"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
