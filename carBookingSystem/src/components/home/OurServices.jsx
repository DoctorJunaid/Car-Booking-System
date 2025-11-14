import React from 'react';
import { motion } from 'framer-motion';
import { Landmark, ShieldCheck, DollarSign, Gauge } from 'lucide-react';

const sectionVariants = {
  hidden: { 
    opacity: 0 
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 50
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12
    }
  }
};

const reasons = [
  {
    icon: <Landmark className="w-8 h-8 text-purple-700" strokeWidth={1.75} />,
    title: 'Special Financing Offers',
    description: 'Our stress-free finance department can find financial solutions to save you money.'
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-purple-700" strokeWidth={1.75} />,
    title: 'Trusted Car Dealership',
    description: 'We are a trusted dealership committed to providing quality, reliability, and customer satisfaction.'
  },
  {
    icon: <DollarSign className="w-8 h-8 text-purple-700" strokeWidth={1.75} />,
    title: 'Transparent Pricing',
    description: 'We believe in clear and honest pricing with no hidden fees, ensuring you get the best value.'
  },
  {
    icon: <Gauge className="w-8 h-8 text-purple-700" strokeWidth={1.75} />,
    title: 'Expert Car Service',
    description: 'Our certified technicians provide top-notch service and maintenance to keep your car running perfectly.'
  },
];

const WhyChooseUs = () => {
  return (
    <motion.section 
      className="py-20 bg-gradient-to-b from-white to-gray-50"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container mx-auto px-6 text-center">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-16"
          variants={itemVariants}
        >
          Why Choose Us?
        </motion.h2>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={sectionVariants}
        >
          {reasons.map((reason, index) => (
            <motion.div 
              key={index} 
              className="flex flex-col items-center p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              variants={itemVariants}
              whileHover={{ scale: 1.05, transition: { type: 'spring', stiffness: 300 } }}
            >
              <div className="flex-shrink-0 p-4 bg-purple-100 rounded-lg mb-5">
                {reason.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{reason.title}</h3>
              <p className="text-gray-600 text-center text-sm leading-relaxed">{reason.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default WhyChooseUs;

