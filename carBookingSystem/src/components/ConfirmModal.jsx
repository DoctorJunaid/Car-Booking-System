import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, X } from 'lucide-react';

const ConfirmModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'danger' // 'danger' | 'warning' | 'info'
}) => {
  const typeStyles = {
    danger: {
      icon: 'text-red-600',
      iconBg: 'bg-red-50',
      button: 'bg-red-600 hover:bg-red-700'
    },
    warning: {
      icon: 'text-yellow-600',
      iconBg: 'bg-yellow-50',
      button: 'bg-yellow-600 hover:bg-yellow-700'
    },
    info: {
      icon: 'text-purple-600',
      iconBg: 'bg-purple-50',
      button: 'bg-purple-600 hover:from-purple-700 hover:to-purple-800'
    }
  };

  const styles = typeStyles[type] || typeStyles.danger;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`${styles.iconBg} p-3 rounded-lg border border-gray-100`}>
                  <AlertCircle className={`w-6 h-6 ${styles.icon}`} />
                </div>
                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100 p-1.5"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{message}</p>

              <div className="flex gap-3">
                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all font-medium"
                >
                  {cancelText}
                </motion.button>
                <motion.button
                  onClick={() => {
                    onConfirm();
                    onClose();
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex-1 px-4 py-2.5 ${styles.button} text-white rounded-lg transition-all font-medium shadow-md hover:shadow-lg`}
                >
                  {confirmText}
                </motion.button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ConfirmModal;
