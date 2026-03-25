import { motion } from 'framer-motion';
import { Inbox } from 'lucide-react';

export default function EmptyState({
  title = 'No data found',
  description = 'Try adjusting your filters or add some transactions.',
  icon: Icon = Inbox,
  action,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center py-16 px-4"
    >
      <div className="w-20 h-20 rounded-2xl bg-dark-800/50 flex items-center justify-center mb-5">
        <Icon className="w-10 h-10 text-dark-500" />
      </div>
      <h3 className="text-lg font-semibold text-dark-300 mb-2">{title}</h3>
      <p className="text-sm text-dark-500 text-center max-w-sm mb-6">{description}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 text-white text-sm font-semibold hover:shadow-lg hover:shadow-primary-500/20 transition-all duration-200"
        >
          {action.label}
        </button>
      )}
    </motion.div>
  );
}
