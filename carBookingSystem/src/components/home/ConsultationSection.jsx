import React from 'react';
import { motion } from 'framer-motion';

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

const ConsultationSection = () => (
  <motion.section 
    className="py-20 bg-white overflow-hidden"
    variants={sectionVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
  >
    <div className="container mx-auto px-6 text-center">
      
      <motion.h3 
        className="text-3xl font-semibold mb-4 text-purple-700"
        variants={itemVariants}
      >
        Need help choosing a car?
      </motion.h3>
      
      <motion.p 
        className="text-gray-600 text-lg mb-8"
        variants={itemVariants}
      >
        Book a free consultation with our product experts.
      </motion.p>
      
      <motion.div variants={itemVariants}>
        <motion.a
          href="/contact"
          className="inline-block bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-purple-800 transition-colors duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Book Consultation
        </motion.a>
      </motion.div>
      
    </div>
  </motion.section>
);

export default ConsultationSection;

