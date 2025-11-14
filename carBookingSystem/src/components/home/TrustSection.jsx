import { Shield, Lock, Users, Award, CheckCircle, FileCheck, BadgeCheck, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const TrustSection = () => {
  const trustFeatures = [
    {
      icon: Shield,
      title: 'Secure Transactions',
      description: 'All payments protected with 256-bit SSL encryption and secure payment gateways',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: BadgeCheck,
      title: 'Verified Dealers',
      description: 'Every dealer is thoroughly verified and background-checked before listing',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: FileCheck,
      title: 'Legal Documentation',
      description: 'Complete paperwork assistance and legal transfer documentation support',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Award,
      title: 'Quality Inspection',
      description: 'Professional vehicle inspection reports for all certified cars',
      color: 'from-amber-500 to-amber-600'
    },
    {
      icon: Users,
      title: 'Customer Support',
      description: '24/7 dedicated support team ready to assist with any queries',
      color: 'from-pink-500 to-pink-600'
    },
    {
      icon: Clock,
      title: 'Money-Back Guarantee',
      description: '7-day return policy on certified vehicles if not satisfied',
      color: 'from-indigo-500 to-indigo-600'
    }
  ];

  const certifications = [
    { name: 'SSL Secured', icon: Lock },
    { name: 'Verified Business', icon: BadgeCheck },
    { name: 'Licensed Dealer', icon: Award },
    { name: 'Customer Rated', icon: CheckCircle }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-blue-100 text-gray-900 px-5 py-2.5 rounded-lg text-sm font-semibold mb-6 shadow-sm">
            <Shield className="h-4 w-4 text-green-600" />
            Your Trust, Our Priority
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Why <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">Trust</span> AutoChoice?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We prioritize your security and satisfaction with industry-leading standards and comprehensive protection.
          </p>
        </motion.div>

        {/* Trust Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {trustFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group"
            >
              <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Certifications Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200"
        >
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Certified & Trusted</h3>
            <p className="text-gray-600">Recognized by industry standards and customer satisfaction</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-purple-50 transition-colors"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <cert.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-semibold text-gray-900">{cert.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Security Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 text-sm text-gray-600 bg-white px-6 py-3 rounded-lg shadow-md border border-gray-200">
            <Lock className="w-4 h-4 text-green-600" />
            <span>Your data is protected with bank-level security</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustSection;
