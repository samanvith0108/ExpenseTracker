import { motion } from 'framer-motion';

export default function StatCard({ title, value, subtitle, icon: Icon, trend, color = 'primary', index = 0 }) {
  const colorMap = {
    primary: {
      bg: 'from-primary-500/16 to-primary-500/6',
      border: 'border-primary-500/24',
      icon: 'text-primary-300 bg-primary-500/15',
      value: 'text-primary-300',
    },
    danger: {
      bg: 'from-danger-500/16 to-danger-500/6',
      border: 'border-danger-500/24',
      icon: 'text-danger-300 bg-danger-500/15',
      value: 'text-danger-300',
    },
    accent: {
      bg: 'from-accent-500/16 to-accent-500/6',
      border: 'border-accent-500/24',
      icon: 'text-accent-300 bg-accent-500/15',
      value: 'text-accent-300',
    },
    warning: {
      bg: 'from-warning-500/16 to-warning-500/6',
      border: 'border-warning-500/24',
      icon: 'text-warning-300 bg-warning-500/15',
      value: 'text-warning-300',
    },
  };

  const c = colorMap[color] || colorMap.primary;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.07 }}
      className={`glass rounded-2xl p-5 sm:p-6 bg-gradient-to-br ${c.bg} border ${c.border} shadow-[0_8px_24px_rgba(2,6,23,0.28)] hover:shadow-[0_12px_30px_rgba(2,6,23,0.34)] transition-all duration-300`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-dark-300 uppercase tracking-wider mb-2">{title}</p>
          <p className={`text-2xl sm:text-3xl font-bold ${c.value} truncate`}>{value}</p>
          {subtitle && (
            <p className="text-xs text-dark-400 mt-1.5">{subtitle}</p>
          )}
        </div>
        {Icon && (
          <div className={`p-3 rounded-xl ${c.icon} shrink-0`}>
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>
      {trend !== undefined && (
        <div className="mt-3 flex items-center gap-1.5">
          <span className={`text-xs font-semibold ${trend >= 0 ? 'text-primary-300' : 'text-danger-300'}`}>
            {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </span>
          <span className="text-xs text-dark-400">vs last month</span>
        </div>
      )}
    </motion.div>
  );
}
