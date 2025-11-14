import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, ShieldCheck, Wrench } from 'lucide-react';

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

const cardData = [
  {
    title: 'Transparent Financing',
    description: 'Explore flexible finance and leasing options tailored to your budget. Our experts provide clear, simple terms with no hidden fees.',
    icon: <DollarSign className="w-8 h-8 text-purple-700" />
  },
  {
    title: 'Certified Warranty',
    description: 'Drive with confidence. Every vehicle is backed by a comprehensive warranty, with extended plans available for total peace of mind.',
    icon: <ShieldCheck className="w-8 h-8 text-purple-700" />
  },
  {
    title: 'Expert Servicing',
    description: 'Book servicing and repairs with our certified technicians. We use genuine parts to keep your car running like new.',
    icon: <Wrench className="w-8 h-8 text-purple-700" />
  }
];

const IssuesSections = () => (
  <motion.section 
    className="min-h-screen py-20 px-4 flex items-center justify-center bg-[#F9FAFB] overflow-hidden"
    variants={sectionVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
  >
    <div className="container mx-auto max-w-6xl text-center">
      
      <motion.h2 
        className="text-3xl md:text-4xl font-semibold mb-12 text-gray-800"
        variants={itemVariants}
      >
        Peace of Mind, Guaranteed
      </motion.h2>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
        variants={sectionVariants}
      >
        {cardData.map((item) => (
          <motion.div 
            key={item.title} 
            className="p-8 bg-white/50 backdrop-blur-lg rounded-lg shadow-lg border border-white/30 text-left"
            variants={itemVariants}
            whileHover={{ scale: 1.05, transition: { type: 'spring', stiffness: 300 } }}
          >
            <div className="p-3 bg-purple-100 rounded-lg inline-block mb-4">
              {item.icon}
            </div>
            <h3 className="font-semibold text-xl mb-3 text-gray-900">{item.title}</h3>
            <p className="text-sm text-gray-700 leading-relaxed">{item.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </motion.section>
);

export default IssuesSections;
