import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { Car, Users, Award, TrendingUp } from "lucide-react";

const StatsSection = () => {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

    const stats = [
        {
            icon: Car,
            value: 250,
            suffix: "+",
            label: "Premium Cars",
            color: "from-purple-500 to-purple-600",
            bgColor: "bg-purple-50"
        },
        {
            icon: Users,
            value: 850,
            suffix: "+",
            label: "Happy Customers",
            color: "from-cyan-500 to-cyan-600",
            bgColor: "bg-cyan-50"
        },
        {
            icon: Award,
            value: 45,
            suffix: "+",
            label: "Verified Dealers",
            color: "from-emerald-500 to-emerald-600",
            bgColor: "bg-emerald-50"
        },
        {
            icon: TrendingUp,
            value: 98,
            suffix: "%",
            label: "Satisfaction Rate",
            color: "from-pink-500 to-pink-600",
            bgColor: "bg-pink-50"
        }
    ];

    return (
        <section className="py-20 bg-gradient-to-br from-purple-50 via-white to-cyan-50 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
                        Our <span className="bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">Success</span> Story
                    </h2>
                    <p className="text-xl text-gray-600 font-medium">
                        Numbers that speak for themselves
                    </p>
                </motion.div>

                {/* Stats Grid */}
                <div
                    ref={ref}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -8, scale: 1.05 }}
                                className="group"
                            >
                                <div className="relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-purple-200 text-center">
                                    {/* Icon */}
                                    <div className={`w-16 h-16 ${stat.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                        <Icon className={`w-8 h-8 bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`} strokeWidth={2.5} />
                                    </div>

                                    {/* Number */}
                                    <div className={`text-5xl font-black mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                                        {inView ? (
                                            <CountUp start={0} end={stat.value} duration={2.5} separator="," />
                                        ) : (
                                            "0"
                                        )}
                                        <span>{stat.suffix}</span>
                                    </div>

                                    {/* Label */}
                                    <p className="text-sm font-bold text-gray-600 uppercase tracking-wide">
                                        {stat.label}
                                    </p>

                                    {/* Decorative Element */}
                                    <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${stat.color} opacity-5 rounded-bl-full`}></div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Bottom Text */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="mt-16 text-center"
                >
                    <p className="text-lg text-gray-600 font-medium">
                        Join thousands of satisfied customers who found their dream car with us
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default StatsSection;
