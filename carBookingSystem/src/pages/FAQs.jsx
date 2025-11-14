import { useState } from 'react';
import { ChevronDown, Search, HelpCircle, MessageCircle, Mail, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Breadcrumbs from '../components/Breadcrumbs';

const FAQs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [openFAQ, setOpenFAQ] = useState(null);

  const categories = [
    { id: 'all', name: 'All FAQs', icon: HelpCircle },
    { id: 'buying', name: 'Buying', icon: MessageCircle },
    { id: 'selling', name: 'Selling', icon: MessageCircle },
    { id: 'payment', name: 'Payment', icon: MessageCircle },
    { id: 'account', name: 'Account', icon: MessageCircle }
  ];

  const faqs = [
    // Buying FAQs
    {
      id: 1,
      category: 'buying',
      question: 'How do I buy a car on AutoChoice?',
      answer: 'Browse our listings, select a car you like, contact the seller through our platform, schedule a test drive, and complete the purchase. We provide secure communication channels and verification services to ensure a safe transaction.'
    },
    {
      id: 2,
      category: 'buying',
      question: 'Can I test drive a car before buying?',
      answer: 'Yes! You can contact the seller directly through our messaging system to schedule a test drive at a convenient time and location. We recommend always test driving a vehicle before making a purchase decision.'
    },
    {
      id: 3,
      category: 'buying',
      question: 'Are the cars inspected?',
      answer: 'Certified Pre-Owned cars undergo a comprehensive 150+ point inspection. For used cars, we recommend getting an independent inspection. We can connect you with trusted inspection services in your area.'
    },
    {
      id: 4,
      category: 'buying',
      question: 'What payment methods are accepted?',
      answer: 'Payment methods vary by seller. Common options include bank transfers, cash, and financing through partner banks. Always discuss payment terms with the seller before finalizing the purchase.'
    },
    {
      id: 5,
      category: 'buying',
      question: 'Is there a warranty on used cars?',
      answer: 'Certified Pre-Owned cars come with up to 2 years extended warranty. Regular used cars may have remaining manufacturer warranty. Check individual listings for warranty details.'
    },
    {
      id: 6,
      category: 'buying',
      question: 'Can I negotiate the price?',
      answer: 'Yes, prices are negotiable. Contact the seller through our platform to discuss pricing. Many sellers are open to reasonable offers, especially for cash buyers.'
    },

    // Selling FAQs
    {
      id: 7,
      category: 'selling',
      question: 'How do I list my car for sale?',
      answer: 'Create a seller account, go to "Add New Listing", upload photos, fill in car details, set your price, and publish. Your listing will be live immediately and visible to thousands of potential buyers.'
    },
    {
      id: 8,
      category: 'selling',
      question: 'How much does it cost to list a car?',
      answer: 'Basic listings are free! We offer premium features like featured placement and boost options for a small fee. Check our pricing page for detailed information on premium features.'
    },
    {
      id: 9,
      category: 'selling',
      question: 'How long does it take to sell a car?',
      answer: 'On average, cars sell within 18 days on our platform. Factors affecting sale time include pricing, condition, photos quality, and market demand. Well-priced cars with good photos sell faster.'
    },
    {
      id: 10,
      category: 'selling',
      question: 'Can I edit my listing after publishing?',
      answer: 'Yes! You can edit your listing anytime from your seller dashboard. Update photos, price, description, or any other details. Changes are reflected immediately.'
    },
    {
      id: 11,
      category: 'selling',
      question: 'How do I handle inquiries?',
      answer: 'All inquiries come through our secure messaging system. You\'ll receive notifications for new messages. Respond promptly to increase your chances of a quick sale. Average response time is 2-3 hours.'
    },
    {
      id: 12,
      category: 'selling',
      question: 'What documents do I need to sell my car?',
      answer: 'You\'ll need: Original registration book, CNIC copy, token tax receipt, and transfer letter. We provide a checklist and guide you through the documentation process.'
    },

    // Payment FAQs
    {
      id: 13,
      category: 'payment',
      question: 'Is payment processing secure?',
      answer: 'Yes, we use industry-standard encryption for all transactions. For direct payments, we recommend meeting at a bank for secure fund transfer. Never share sensitive financial information through messages.'
    },
    {
      id: 14,
      category: 'payment',
      question: 'Do you offer financing options?',
      answer: 'Yes! We partner with major banks to offer car financing. Check eligibility, get pre-approved, and complete your purchase with flexible payment plans. Interest rates start from 12% per annum.'
    },
    {
      id: 15,
      category: 'payment',
      question: 'Can I trade in my old car?',
      answer: 'Many sellers accept trade-ins. Use our Price Estimator to get your car\'s value, then discuss trade-in options with the seller. This can reduce your out-of-pocket expense significantly.'
    },
    {
      id: 16,
      category: 'payment',
      question: 'Are there any hidden fees?',
      answer: 'No hidden fees from AutoChoice. However, consider transfer fees, registration costs, and token tax when budgeting. Sellers should disclose all costs upfront.'
    },

    // Account FAQs
    {
      id: 17,
      category: 'account',
      question: 'How do I create an account?',
      answer: 'Click "Login/Signup" in the top right, fill in your details, verify your email, and you\'re ready! Creating an account is free and takes less than 2 minutes.'
    },
    {
      id: 18,
      category: 'account',
      question: 'Is my personal information safe?',
      answer: 'Absolutely! We use bank-level encryption to protect your data. We never share your personal information with third parties without your consent. Read our Privacy Policy for details.'
    },
    {
      id: 19,
      category: 'account',
      question: 'Can I have both buyer and seller accounts?',
      answer: 'Yes! One account gives you access to both buying and selling features. Switch between buyer and seller modes easily from your dashboard.'
    },
    {
      id: 20,
      category: 'account',
      question: 'How do I delete my account?',
      answer: 'Go to Settings > Account > Delete Account. Note that this action is permanent and will remove all your listings and data. Contact support if you need assistance.'
    },
    {
      id: 21,
      category: 'account',
      question: 'What is account verification?',
      answer: 'Verification confirms your identity and builds trust. Upload your CNIC and get a "Verified" badge. Verified sellers get 3x more inquiries and sell faster.'
    },
    {
      id: 22,
      category: 'account',
      question: 'How do I reset my password?',
      answer: 'Click "Forgot Password" on the login page, enter your email, and follow the reset link sent to your inbox. For security, reset links expire after 24 hours.'
    }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs />
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
            <HelpCircle className="w-8 h-8 text-purple-700" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about buying and selling cars on AutoChoice
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 shadow-lg"
            />
          </div>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
                }`}
              >
                <Icon className="w-5 h-5" />
                {category.name}
              </button>
            );
          })}
        </motion.div>

        {/* Results Count */}
        <div className="text-center mb-8">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-gray-900">{filteredFAQs.length}</span> questions
          </p>
        </div>

        {/* FAQ List */}
        <div className="max-w-4xl mx-auto space-y-4">
          {filteredFAQs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900 pr-8">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 shrink-0 transition-transform ${
                    openFAQ === faq.id ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              <AnimatePresence>
                {openFAQ === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 text-gray-600 border-t border-gray-100 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredFAQs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">No FAQs found matching your search</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-colors"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Still Have Questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16 bg-linear-to-r from-blue-900 to-blue-700 text-white rounded-lg p-8 text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Can't find the answer you're looking for? Our support team is here to help you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-purple-700 rounded-lg hover:bg-purple-50 transition-colors font-medium"
            >
              <Mail className="w-5 h-5" />
              Contact Us
            </a>
            <a
              href="tel:+923001234567"
              className="inline-flex items-center gap-2 px-6 py-3 bg-purple-800 text-white rounded-lg hover:bg-purple-600 transition-colors font-medium"
            >
              <Phone className="w-5 h-5" />
              Call Support
            </a>
          </div>
        </motion.div>

        {/* Quick Links */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-6 shadow-lg text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4">
              <MessageCircle className="w-6 h-6 text-purple-700" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Buyer's Guide</h3>
            <p className="text-sm text-gray-600 mb-4">Learn how to buy your dream car</p>
            <a href="/about" className="text-purple-700 hover:text-purple-600 font-medium text-sm">
              Learn More →
            </a>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-lg text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4">
              <MessageCircle className="w-6 h-6 text-purple-700" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Seller's Guide</h3>
            <p className="text-sm text-gray-600 mb-4">Tips for selling your car fast</p>
            <a href="/signup?as=seller" className="text-purple-700 hover:text-purple-600 font-medium text-sm">
              Get Started →
            </a>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-lg text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4">
              <HelpCircle className="w-6 h-6 text-purple-700" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Price Estimator</h3>
            <p className="text-sm text-gray-600 mb-4">Get your car's market value</p>
            <a href="/estimator" className="text-purple-700 hover:text-purple-600 font-medium text-sm">
              Estimate Now →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQs;
