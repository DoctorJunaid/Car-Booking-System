import { Shield, Lock, Award, CheckCircle, BadgeCheck, FileCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const TrustBadges = ({ variant = 'default' }) => {
  const badges = [
    {
      icon: Shield,
      title: 'Secure Payments',
      description: '256-bit SSL Encryption',
      color: 'text-green-600',
      bg: 'bg-green-50'
    },
    {
      icon: BadgeCheck,
      title: 'Verified Dealers',
      description: 'All dealers verified',
      color: 'text-purple-600',
      bg: 'bg-purple-50'
    },
    {
      icon: FileCheck,
      title: 'Legal Documentation',
      description: 'Complete paperwork',
      color: 'text-purple-600',
      bg: 'bg-purple-50'
    },
    {
      icon: Award,
      title: 'Quality Assured',
      description: 'Inspected vehicles',
      color: 'text-amber-600',
      bg: 'bg-amber-50'
    }
  ];

  if (variant === 'compact') {
    return (
      <div className="flex flex-wrap items-center justify-center gap-4 py-4">
        {badges.map((badge, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-gray-200 shadow-sm"
          >
            <badge.icon className={`w-4 h-4 ${badge.color}`} />
            <span className="text-xs font-medium text-gray-700">{badge.title}</span>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {badges.map((badge, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className={`${badge.bg} rounded-lg p-4 text-center border border-gray-200 hover:shadow-md transition-shadow`}
        >
          <div className="flex justify-center mb-3">
            <div className={`${badge.bg} rounded-lg p-3 border-2 ${badge.color.replace('text-', 'border-')}`}>
              <badge.icon className={`w-6 h-6 ${badge.color}`} />
            </div>
          </div>
          <h4 className="font-bold text-gray-900 text-sm mb-1">{badge.title}</h4>
          <p className="text-xs text-gray-600">{badge.description}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default TrustBadges;
