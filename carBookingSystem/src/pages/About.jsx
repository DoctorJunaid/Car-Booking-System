import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Breadcrumbs from '../components/Breadcrumbs';
import { 
  Award, 
  Users, 
  Target, 
  Heart, 
  Shield, 
  TrendingUp,
  CheckCircle,
  Star,
  Zap,
  Globe,
  Clock,
  ThumbsUp
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
      staggerChildren: 0.2
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

const slideInLeft = {
  hidden: { x: -100, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { duration: 0.6 }
  }
};

const slideInRight = {
  hidden: { x: 100, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { duration: 0.6 }
  }
};

const About = () => {
  const stats = [
    { number: "50K+", label: "Happy Customers", icon: Users },
    { number: "15K+", label: "Cars Sold", icon: TrendingUp },
    { number: "98%", label: "Satisfaction Rate", icon: ThumbsUp },
    { number: "24/7", label: "Customer Support", icon: Clock }
  ];

  const values = [
    {
      icon: Shield,
      title: "Trust & Transparency",
      description: "We believe in complete transparency. Every car comes with a detailed history report and honest pricing."
    },
    {
      icon: Heart,
      title: "Customer First",
      description: "Your satisfaction is our priority. We go above and beyond to ensure you find the perfect vehicle."
    },
    {
      icon: Award,
      title: "Quality Assured",
      description: "Every vehicle undergoes rigorous inspection to meet our high standards of quality and safety."
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "We leverage cutting-edge technology to make your car buying experience seamless and enjoyable."
    }
  ];

  const milestones = [
    { year: "2015", title: "Founded", description: "Started with a vision to revolutionize car buying" },
    { year: "2017", title: "10K Customers", description: "Reached our first major milestone" },
    { year: "2020", title: "National Expansion", description: "Expanded operations across the country" },
    { year: "2023", title: "Industry Leader", description: "Became the most trusted car marketplace" }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
    },
    {
      name: "Michael Chen",
      role: "Chief Technology Officer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Customer Success",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop"
    },
    {
      name: "David Kim",
      role: "Operations Director",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop"
    }
  ];

  const features = [
    "Certified Pre-Owned Vehicles",
    "Comprehensive Warranty",
    "Free Vehicle History Report",
    "Flexible Financing Options",
    "Trade-In Assistance",
    "Home Delivery Available"
  ];

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Breadcrumbs />
      </div>
      {/* Hero Section */}
      <motion.section 
        className="relative text-white py-24 overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        {/* Background Image - No Heavy Overlay */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&h=1080&fit=crop&q=80"
            alt="Luxury Cars"
            className="w-full h-full object-cover brightness-90"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6"
            variants={fadeInUp}
          >
            Driving Your Dreams
            <br />
            <span className="bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
              Forward
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8"
            variants={fadeInUp}
          >
            We're not just selling cars – we're creating experiences, building trust, 
            and helping you find the perfect vehicle for your journey.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap justify-center gap-4"
          >
            <a 
              href="#our-story"
              className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-block"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('our-story')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Our Story
            </a>
            <Link 
              to="/contact"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-all duration-300 inline-block"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section 
        className="py-16 bg-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                className="text-center group"
                whileHover={{ scale: 1.05 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-50 rounded-full mb-4 group-hover:bg-purple-600 transition-colors duration-300">
                  <stat.icon className="w-8 h-8 text-purple-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <motion.h3 
                  className="text-4xl font-bold text-gray-900 mb-2"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {stat.number}
                </motion.h3>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Our Story Section */}
      <motion.section 
        id="our-story"
        className="py-20 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div variants={slideInLeft}>
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&q=80"
                alt="Our Team"
                className="rounded-2xl shadow-xl w-full h-[400px] object-cover"
              />
            </motion.div>

            <motion.div variants={slideInRight}>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                Founded in 2015, AutoChoice began with a simple mission: to make car buying 
                transparent, trustworthy, and enjoyable. What started as a small dealership 
                has grown into one of the nation's most trusted automotive marketplaces.
              </p>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                We've helped over 50,000 customers find their perfect vehicle, and we're 
                just getting started. Our commitment to quality, transparency, and customer 
                satisfaction drives everything we do.
              </p>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-purple-600 border-2 border-white flex items-center justify-center text-white font-semibold">
                      {i}
                    </div>
                  ))}
                </div>
                <p className="text-gray-600">
                  <span className="font-bold text-purple-600">50,000+</span> satisfied customers
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Values Section */}
      <motion.section 
        className="py-20 bg-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-8 shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200"
              >
                <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mb-6 transform group-hover:rotate-6 transition-transform duration-300">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Timeline Section */}
      <motion.section 
        className="py-20 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600">
              Milestones that shaped our story
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-600 via-blue-400 to-blue-600 opacity-30" />

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`flex flex-col md:flex-row items-center gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200">
                      <span className="inline-block bg-purple-600 text-white px-4 py-1 rounded-lg text-sm font-semibold mb-4">
                        {milestone.year}
                      </span>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600">
                        {milestone.description}
                      </p>
                    </div>
                  </div>

                  <div className="relative flex items-center justify-center">
                    <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center shadow-lg z-10 border-4 border-white">
                      <Star className="w-8 h-8 text-white" fill="white" />
                    </div>
                  </div>

                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section 
        className="py-20 bg-gray-900 text-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-200">
              The passionate people behind AutoChoice
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                className="group"
              >
                <div className="relative overflow-hidden rounded-2xl mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-80 object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-gray-300">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Features Grid */}
      <motion.section 
        className="py-20 bg-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose Us
            </h2>
            <p className="text-xl text-gray-600">
              Benefits that set us apart
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-4 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200"
              >
                <div className="shrink-0">
                  <CheckCircle className="w-8 h-8 text-purple-600" />
                </div>
                <p className="text-gray-900 font-semibold text-lg">{feature}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Mission & Vision */}
      <motion.section 
        className="py-20 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              variants={slideInLeft}
              className="bg-white rounded-2xl p-10 shadow-lg border border-gray-200"
            >
              <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                To revolutionize the car buying experience by providing transparent, 
                trustworthy, and customer-centric services that empower every individual 
                to find their perfect vehicle with confidence and ease.
              </p>
            </motion.div>

            <motion.div
              variants={slideInRight}
              className="bg-purple-600 rounded-2xl p-10 shadow-xl text-white"
            >
              <div className="bg-white/20 backdrop-blur-sm w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="relative text-3xl font-bold mb-4">Our Vision</h3>
              <p className="relative text-blue-100 text-lg leading-relaxed">
                To become the world's most trusted automotive marketplace, where every 
                transaction is built on integrity, innovation, and an unwavering commitment 
                to customer satisfaction.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="py-20 relative text-white overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&h=800&fit=crop&q=80"
            alt="Sports Car"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-700/70" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block mb-6">
            <div className="bg-white/10 backdrop-blur-sm px-6 py-2 rounded-lg border border-white/20">
              <span className="text-sm font-medium">Ready to Get Started?</span>
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Find Your Perfect Car Today
          </h2>
          <p className="text-xl text-blue-50 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who found their dream vehicle with AutoChoice
          </p>

          <motion.div
            className="flex flex-wrap justify-center gap-4"
            variants={staggerContainer}
          >
            <motion.div variants={scaleIn}>
              <Link
                to="/cars/used"
                className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl inline-block"
              >
                Browse Cars
              </Link>
            </motion.div>
            <motion.div variants={scaleIn}>
              <Link
                to="/contact"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-all duration-300 inline-block"
              >
                Contact Us
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default About;
