import { useState } from 'react';
import { motion } from 'framer-motion';
import Breadcrumbs from '../components/Breadcrumbs';
import Toast from '../components/Toast';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Send,
  MessageSquare,
  User
} from 'lucide-react';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const scaleIn = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error for this field when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setToast({
        show: true,
        message: 'Please fix the errors in the form',
        type: 'error'
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Store submission in localStorage (in production, this would be sent to a backend)
    setTimeout(() => {
      const submission = {
        ...formData,
        timestamp: new Date().toISOString(),
        id: Date.now()
      };
      
      // Get existing submissions
      const submissions = JSON.parse(localStorage.getItem('contact_submissions') || '[]');
      submissions.push(submission);
      localStorage.setItem('contact_submissions', JSON.stringify(submissions));
      
      setToast({
        show: true,
        message: 'Message sent successfully! We\'ll get back to you within 24 hours.',
        type: 'success'
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+92 91 123 4567", "+92 300 1234567"],
      link: "tel:+92911234567"
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@autochoice.pk", "support@autochoice.pk"],
      link: "mailto:info@autochoice.pk"
    },
    {
      icon: MapPin,
      title: "Address",
      details: ["Saddar Road, Peshawar", "Khyber Pakhtunkhwa, Pakistan"],
      link: "https://maps.google.com"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Mon - Sat: 9:00 AM - 8:00 PM", "Sunday: 10:00 AM - 6:00 PM"],
      link: null
    }
  ];

  const socialLinks = [
    { name: "Facebook", link: "https://facebook.com/autochoicepk", color: "hover:bg-purple-600", icon: "facebook" },
    { name: "Twitter", link: "https://twitter.com/autochoicepk", color: "hover:bg-sky-500", icon: "twitter" },
    { name: "Instagram", link: "https://instagram.com/autochoicepk", color: "hover:bg-pink-600", icon: "instagram" },
    { name: "LinkedIn", link: "https://linkedin.com/company/autochoice-pakistan", color: "hover:from-purple-700 hover:to-purple-800", icon: "linkedin" }
  ];

  const reasons = [
    "Expert automotive consultation",
    "Quick response time (within 24 hours)",
    "Personalized car recommendations",
    "Financing assistance",
    "Trade-in evaluation",
    "Test drive scheduling"
  ];

  return (
    <div className="bg-white">
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Breadcrumbs />
      </div>
      {/* Hero Section */}
      <motion.section 
        className="relative text-white py-24 overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={fadeInUp}
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=800&fit=crop&q=80"
            alt="Contact Us"
            className="w-full h-full object-cover brightness-75"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6"
            variants={fadeInUp}
          >
            Get in Touch
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto"
            variants={fadeInUp}
          >
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </motion.p>
        </div>
      </motion.section>

      {/* Contact Info Cards */}
      <motion.section 
        className="py-16 bg-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200"
              >
                <div className="bg-purple-600/10 backdrop-blur-sm w-14 h-14 rounded-full flex items-center justify-center mb-4 border border-purple-600/20">
                  <info.icon className="w-7 h-7 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {info.title}
                </h3>
                {info.details.map((detail, idx) => (
                  <p key={idx} className="text-gray-600 text-sm mb-1">
                    {detail}
                  </p>
                ))}
                {info.link && (
                  <a 
                    href={info.link}
                    className="inline-block mt-3 text-purple-600 hover:text-purple-600 font-medium text-sm"
                  >
                    {info.title === "Address" ? "View on Map →" : "Contact Now →"}
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Main Contact Form Section */}
      <motion.section 
        className="py-20 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Side - Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Send us a Message
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                Fill out the form below and our team will get back to you within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Input */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-all ${
                        errors.name 
                          ? 'border-red-500 focus:ring-red-500' 
                          : 'border-gray-300 focus:ring-gray-900'
                      }`}
                      placeholder="Ahmed Khan"
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>

                {/* Email Input */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-all ${
                        errors.email 
                          ? 'border-red-500 focus:ring-red-500' 
                          : 'border-gray-300 focus:ring-gray-900'
                      }`}
                      placeholder="ahmed@example.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                {/* Phone Input */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                      placeholder="+92 300 1234567"
                    />
                  </div>
                </div>

                {/* Subject Input */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-all ${
                        errors.subject 
                          ? 'border-red-500 focus:ring-red-500' 
                          : 'border-gray-300 focus:ring-gray-900'
                      }`}
                      placeholder="How can we help you?"
                    />
                  </div>
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-600">{errors.subject}</p>
                  )}
                </div>

                {/* Message Textarea */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-all resize-none ${
                      errors.message 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-gray-300 focus:ring-gray-900'
                    }`}
                    placeholder="Tell us more about your inquiry..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-purple-600 text-white py-4 rounded-lg font-semibold hover:from-purple-700 hover:to-purple-800 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>

            {/* Right Side - Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Why Contact Us */}
              <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Why Contact Us?
                </h3>
                <ul className="space-y-3">
                  {reasons.map((reason, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: false }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="bg-purple-600/10 backdrop-blur-sm rounded-lg p-1 mt-0.5 border border-purple-600/20">
                        <svg className="w-3 h-3 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-700">{reason}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Social Media */}
              <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-md">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Connect With Us
                </h3>
                <p className="text-gray-600 mb-6">
                  Follow us on social media for the latest cars, deals, and updates.
                </p>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center transition-all duration-300 ${social.color} hover:text-white`}
                      aria-label={`Follow us on ${social.name}`}
                    >
                      <span className="text-xl font-bold">
                        {social.icon === 'facebook' && 'f'}
                        {social.icon === 'twitter' && '𝕏'}
                        {social.icon === 'instagram' && '📷'}
                        {social.icon === 'linkedin' && 'in'}
                      </span>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Quick Response */}
              <div className="bg-purple-600 text-white p-8 rounded-2xl">
                <h3 className="text-2xl font-bold mb-3">
                  Quick Response Guaranteed
                </h3>
                <p className="text-blue-50 mb-4">
                  Our dedicated team is committed to responding to all inquiries within 24 hours during business days.
                </p>
                <div className="flex items-center gap-2 text-blue-100">
                  <Clock className="w-5 h-5" />
                  <span className="text-sm">Average response time: 4 hours</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Map Section */}
      <motion.section 
        className="py-20 bg-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={fadeInUp}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Visit Our Showroom
            </h2>
            <p className="text-xl text-gray-600">
              Come see our collection in person. We're here to help!
            </p>
          </div>

          <motion.div
            variants={scaleIn}
            className="rounded-2xl overflow-hidden shadow-2xl border border-gray-200"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d212270.5254848425!2d71.35195655!3d34.0150559!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38d917b90f0e79cf%3A0xa816b2637558a412!2sPeshawar%2C%20Khyber%20Pakhtunkhwa%2C%20Pakistan!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="AutoChoice Location - Peshawar"
            />
          </motion.div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section 
        className="py-20 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={staggerContainer}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Quick answers to common questions
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "What are your business hours?",
                a: "We're open Monday to Saturday from 9:00 AM to 8:00 PM, and Sunday from 10:00 AM to 6:00 PM."
              },
              {
                q: "Do you offer test drives?",
                a: "Yes! We encourage test drives. Simply contact us to schedule an appointment at your convenience."
              },
              {
                q: "What financing options do you provide?",
                a: "We offer various financing options including loans, leasing, and trade-in programs. Our team will help you find the best option."
              },
              {
                q: "How long does it take to get a response?",
                a: "We typically respond within 4 hours during business days, and within 24 hours on weekends."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:border-purple-300 transition-all duration-300"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {faq.q}
                </h3>
                <p className="text-gray-600">
                  {faq.a}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Contact;
