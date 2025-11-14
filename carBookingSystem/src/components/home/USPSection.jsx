import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Award, TrendingUp, HeadphonesIcon, Clock, BadgeCheck } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

const USPSection = () => {
  const features = [
    {
      icon: Shield,
      title: "100% Verified",
      description: "Every seller thoroughly verified for your complete safety",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      iconBg: "bg-gradient-to-br from-purple-100 to-purple-200"
    },
    {
      icon: BadgeCheck,
      title: "Quality Certified",
      description: "All vehicles inspected and certified by experts",
      color: "from-cyan-500 to-cyan-600",
      bgColor: "bg-cyan-50",
      iconBg: "bg-gradient-to-br from-cyan-100 to-cyan-200"
    },
    {
      icon: TrendingUp,
      title: "Best Deals",
      description: "Competitive pricing with transparent, no-hidden-fees",
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-50",
      iconBg: "bg-gradient-to-br from-emerald-100 to-emerald-200"
    },
    {
      icon: HeadphonesIcon,
      title: "24/7 Support",
      description: "Expert team ready to assist you anytime, anywhere",
      color: "from-pink-500 to-pink-600",
      bgColor: "bg-pink-50",
      iconBg: "bg-gradient-to-br from-pink-100 to-pink-200"
    },
    {
      icon: Clock,
      title: "Quick Process",
      description: "Fast and hassle-free buying experience guaranteed",
      color: "from-amber-500 to-amber-600",
      bgColor: "bg-amber-50",
      iconBg: "bg-gradient-to-br from-amber-100 to-amber-200"
    },
    {
      icon: Award,
      title: "Top Rated",
      description: "Trusted by thousands with 5-star customer reviews",
      color: "from-indigo-500 to-indigo-600",
      bgColor: "bg-indigo-50",
      iconBg: "bg-gradient-to-br from-indigo-100 to-indigo-200"
    }
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-50/30 to-transparent"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Why Choose <span className="bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">AutoChoice</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">
            Experience the difference with our premium car marketplace
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative"
              >
                <div className="h-full bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-purple-200">
                  {/* Icon */}
                  <div className={`w-16 h-16 ${feature.iconBg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-8 h-8 bg-gradient-to-br ${feature.color} bg-clip-text text-transparent`} strokeWidth={2.5} />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed font-medium">
                    {feature.description}
                  </p>

                  {/* Decorative Element */}
                  <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${feature.color} opacity-5 rounded-bl-full`}></div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-50 to-cyan-50 rounded-lg border-2 border-purple-200">
            <span className="text-sm font-bold text-gray-700">Trusted by 850+ happy customers</span>
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-cyan-400 border-2 border-white"></div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default USPSection;
