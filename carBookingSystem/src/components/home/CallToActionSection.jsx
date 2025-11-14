import React from "react";

import { CarFront, BadgeDollarSign, ArrowRight } from "lucide-react";

import { motion } from "framer-motion";


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};


const cardVariants = {
  hidden: { opacity: 0, y: 20 }, // State for load-in
  visible: { opacity: 1, y: 0 }, // State for load-in
  rest: { scale: 1 }, // State for hover-off
  hover: {
    scale: 1.03,
    y: -5, 
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)", 
    transition: { type: "spring", stiffness: 300, damping: 15 },
  },
};


const iconVariants = {
  rest: { scale: 1, rotate: 0 },
  hover: {
    scale: 1.15,
    rotate: 3,
    transition: { type: "spring", stiffness: 300, damping: 10 },
  },
};

const CallToActionSection = () => {
  return (
    <section className="w-full py-16 bg-white">
      <div className="container mx-auto px-4">
      
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
  
          <motion.div
            className="bg-[#EBF1FF] rounded-2xl p-8 flex flex-col sm:flex-row justify-between items-center gap-6"
            variants={cardVariants} 
            whileHover="hover"    
            initial="rest"        
          >
            {/* Text Content */}
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
                Are You Looking
                <br />
                For a Car ?
              </h2>
              <p className="text-gray-600 mb-6 text-sm sm:text-base">
                We are commited to providing our customers with exceptional
                service.
              </p>
              <motion.a
                href="/cars/used"
                className="cursor-pointer bg-purple-600 text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center sm:justify-start gap-2 mx-auto sm:mx-0"
                whileHover={{ scale: 1.05, backgroundColor: "#1D4ED8" }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                Get Started
                <ArrowRight size={18} />
              </motion.a>
            </div>

         
            <motion.div
              className="flex-shrink-0"
              variants={iconVariants} 
            >
              <CarFront
                size={110}
                className="text-blue-500"
                strokeWidth={1.5}
              />
            </motion.div>
          </motion.div>

         {/* card 2 */}
          <motion.div
            className="bg-[#FFEBFA] rounded-2xl p-8 flex flex-col sm:flex-row justify-between items-center gap-6"
            variants={cardVariants}
            whileHover="hover"
            initial="rest"
          >
            {/* Text Content */}
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
                Do You Want To
                <br />
                Sell a Car ?
              </h2>
              <p className="text-gray-600 mb-6 text-sm sm:text-base">
                We are commited to providing our customers with exceptional
                service.
              </p>
              <motion.a
                href="/signup?as=seller"
                className="cursor-pointer bg-[#050B20] text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center sm:justify-start gap-2 mx-auto sm:mx-0"
                whileHover={{ scale: 1.05, opacity: 0.9 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                Get Started
                <ArrowRight size={18} />
              </motion.a>
            </div>

            
            <motion.div
              className="flex-shrink-0"
              variants={iconVariants} 
            >
              <BadgeDollarSign
                size={110}
                className="text-pink-500"
                strokeWidth={1.5}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToActionSection;
