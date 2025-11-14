import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Database, UserCheck, Mail } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';

const PrivacyPolicy = () => {
  const sections = [
    {
      icon: Database,
      title: "Information We Collect",
      content: [
        "Personal information (name, email, phone number) when you register or contact us",
        "Vehicle preferences and search history to improve your experience",
        "Payment information when you make transactions (securely processed)",
        "Device and browser information for analytics and security",
        "Location data (with your permission) to show nearby listings"
      ]
    },
    {
      icon: Lock,
      title: "How We Use Your Information",
      content: [
        "To provide and improve our car marketplace services",
        "To communicate with you about listings, offers, and updates",
        "To process transactions and send confirmations",
        "To personalize your experience and show relevant listings",
        "To prevent fraud and ensure platform security",
        "To comply with legal obligations"
      ]
    },
    {
      icon: Shield,
      title: "Data Security",
      content: [
        "We use industry-standard SSL encryption for all data transmission",
        "Your payment information is processed through secure payment gateways",
        "We implement strict access controls and regular security audits",
        "Data is stored on secure servers with regular backups",
        "We never sell your personal information to third parties"
      ]
    },
    {
      icon: Eye,
      title: "Information Sharing",
      content: [
        "We share information with sellers only when you express interest in a vehicle",
        "Service providers who help us operate the platform (under strict agreements)",
        "Law enforcement when required by law or to protect rights and safety",
        "We do not sell or rent your personal information to marketers",
        "You can control what information is visible in your public profile"
      ]
    },
    {
      icon: UserCheck,
      title: "Your Rights",
      content: [
        "Access and download your personal data at any time",
        "Request correction of inaccurate information",
        "Delete your account and associated data",
        "Opt-out of marketing communications",
        "Control cookie preferences",
        "Lodge a complaint with data protection authorities"
      ]
    },
    {
      icon: Mail,
      title: "Contact Us",
      content: [
        "If you have questions about this Privacy Policy, contact us at:",
        "Email: privacy@autochoice.pk",
        "Phone: +92 91 123 4567",
        "Address: Saddar Road, Peshawar, Pakistan"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs />
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
            <Shield className="w-8 h-8 text-purple-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Last Updated: November 11, 2025
          </p>
        </motion.div>

        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg shadow-md p-8 mb-8"
        >
          <p className="text-gray-700 leading-relaxed mb-4">
            At AutoChoice, we are committed to protecting your privacy and ensuring the security of your personal information. 
            This Privacy Policy describes how we collect, use, disclose, and safeguard your information when you use our 
            car marketplace platform.
          </p>
          <p className="text-gray-700 leading-relaxed">
            By using AutoChoice, you agree to the collection and use of information in accordance with this policy. 
            If you do not agree with our policies and practices, please do not use our services.
          </p>
        </motion.div>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="bg-white rounded-lg shadow-md p-8"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Icon className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h2>
                    <ul className="space-y-3">
                      {section.content.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="flex-shrink-0 w-1.5 h-1.5 bg-purple-600 rounded-lg mt-2"></span>
                          <span className="text-gray-700 leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Cookies Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-purple-50 rounded-lg p-8 mt-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies and Tracking</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We use cookies and similar tracking technologies to enhance your experience on our platform. 
            Cookies help us remember your preferences, understand how you use our site, and show you relevant content.
          </p>
          <p className="text-gray-700 leading-relaxed">
            You can control cookie settings through your browser preferences. However, disabling cookies may 
            limit some functionality of our platform.
          </p>
        </motion.div>

        {/* Updates Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-white rounded-lg shadow-md p-8 mt-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Policy</h2>
          <p className="text-gray-700 leading-relaxed">
            We may update this Privacy Policy from time to time to reflect changes in our practices or for legal, 
            operational, or regulatory reasons. We will notify you of any material changes by posting the new 
            Privacy Policy on this page and updating the "Last Updated" date. We encourage you to review this 
            Privacy Policy periodically.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
