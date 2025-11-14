import { motion } from 'framer-motion';
import { FileText, AlertCircle, Scale, Ban, Shield, Users } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';

const TermsOfService = () => {
  const sections = [
    {
      icon: Users,
      title: "User Accounts",
      content: [
        "You must be at least 18 years old to use our services",
        "You are responsible for maintaining the security of your account",
        "You must provide accurate and complete information",
        "One person or entity may not maintain multiple accounts",
        "You are responsible for all activities under your account",
        "Notify us immediately of any unauthorized use of your account"
      ]
    },
    {
      icon: FileText,
      title: "Listing Requirements",
      content: [
        "All vehicle listings must be accurate and truthful",
        "You must have legal right to sell the vehicles you list",
        "Photos must accurately represent the vehicle's condition",
        "Pricing must be clearly stated with no hidden fees",
        "Vehicle history and condition must be disclosed honestly",
        "Listings must comply with all applicable laws and regulations"
      ]
    },
    {
      icon: Ban,
      title: "Prohibited Activities",
      content: [
        "Posting false, misleading, or fraudulent listings",
        "Impersonating another person or entity",
        "Harassing, threatening, or abusing other users",
        "Attempting to manipulate prices or reviews",
        "Using automated systems to access the platform",
        "Violating any applicable laws or regulations",
        "Interfering with the platform's operation or security"
      ]
    },
    {
      icon: Scale,
      title: "Transactions and Payments",
      content: [
        "All transactions are between buyers and sellers directly",
        "AutoChoice facilitates connections but is not party to sales",
        "Payment processing fees may apply to certain transactions",
        "Buyers and sellers are responsible for completing transactions",
        "We recommend meeting in safe, public locations",
        "Verify vehicle condition and documentation before purchase",
        "Report any suspicious activity or fraud attempts"
      ]
    },
    {
      icon: Shield,
      title: "Liability and Disclaimers",
      content: [
        "Platform provided 'as is' without warranties of any kind",
        "We do not guarantee accuracy of user-generated content",
        "Not responsible for disputes between buyers and sellers",
        "Not liable for vehicle condition, quality, or legality",
        "Users assume all risks associated with transactions",
        "Maximum liability limited to fees paid in past 12 months"
      ]
    },
    {
      icon: AlertCircle,
      title: "Termination",
      content: [
        "We may suspend or terminate accounts for violations",
        "You may close your account at any time",
        "Upon termination, your right to use the platform ceases",
        "We may retain certain information as required by law",
        "Outstanding obligations survive account termination",
        "No refunds for prepaid services upon voluntary termination"
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
            <FileText className="w-8 h-8 text-purple-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Please read these terms carefully before using AutoChoice. By accessing our platform, you agree to be bound by these terms.
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Agreement to Terms</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            These Terms of Service ("Terms") govern your access to and use of AutoChoice's car marketplace platform, 
            including our website, mobile applications, and related services (collectively, the "Platform").
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            By accessing or using the Platform, you agree to be bound by these Terms and our Privacy Policy. 
            If you do not agree to these Terms, you may not access or use the Platform.
          </p>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4">
            <p className="text-sm text-yellow-800">
              <strong>Important:</strong> These Terms contain provisions that limit our liability and require 
              individual arbitration for disputes. Please read them carefully.
            </p>
          </div>
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

        {/* Intellectual Property */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-lg shadow-md p-8 mt-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Intellectual Property</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The Platform and its original content, features, and functionality are owned by AutoChoice and are 
            protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
          </p>
          <p className="text-gray-700 leading-relaxed">
            You may not copy, modify, distribute, sell, or lease any part of our Platform without our express 
            written permission. Unauthorized use may result in legal action.
          </p>
        </motion.div>

        {/* Governing Law */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-purple-50 rounded-lg p-8 mt-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Governing Law</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            These Terms shall be governed by and construed in accordance with the laws of Pakistan, without 
            regard to its conflict of law provisions.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Any disputes arising from these Terms or your use of the Platform shall be subject to the exclusive 
            jurisdiction of the courts in Peshawar, Khyber Pakhtunkhwa, Pakistan.
          </p>
        </motion.div>

        {/* Changes to Terms */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="bg-white rounded-lg shadow-md p-8 mt-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to Terms</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We reserve the right to modify these Terms at any time. We will notify users of any material changes 
            by posting the new Terms on the Platform and updating the "Last Updated" date.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Your continued use of the Platform after changes become effective constitutes acceptance of the 
            revised Terms. If you do not agree to the new Terms, you must stop using the Platform.
          </p>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="bg-gray-100 rounded-lg p-8 mt-8 text-center"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Questions About These Terms?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            If you have any questions about these Terms of Service, please contact us:
          </p>
          <div className="space-y-2 text-gray-700">
            <p>Email: legal@autochoice.pk</p>
            <p>Phone: +92 91 123 4567</p>
            <p>Address: Saddar Road, Peshawar, Pakistan</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsOfService;
