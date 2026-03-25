import { motion } from 'framer-motion';
import { formatCurrency } from '../../utils/currencyFormatter';

export default function BudgetCard({ budget, totalSpent, remaining, percentage, isOverBudget }) {
  const progressColor = isOverBudget
    ? 'from-danger-500 to-danger-400'
    : percentage > 75
      ? 'from-warning-500 to-warning-400'
      : 'from-primary-500 to-accent-500';

  const glowColor = isOverBudget
    ? 'shadow-danger-500/20'
    : percentage > 75
      ? 'shadow-warning-500/20'
      : 'shadow-primary-500/20';

  return (
    <div className="glass rounded-2xl p-5 sm:p-6 h-fit self-start shadow-[0_8px_24px_rgba(2,6,23,0.28)]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-dark-200 uppercase tracking-wider">Monthly Budget</h3>
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full
          ${isOverBudget
            ? 'bg-danger-500/15 text-danger-400'
            : 'bg-primary-500/15 text-primary-400'
          }`}
        >
          {percentage}% Used
        </span>
      </div>

      {/* Progress Bar */}
      <div className="relative h-3 rounded-full bg-dark-800/90 overflow-hidden mb-5">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(percentage, 100)}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className={`absolute inset-y-0 left-0 rounded-full bg-gradient-to-r ${progressColor} shadow-lg ${glowColor}`}
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <p className="text-xs text-dark-400 mb-1">Budget</p>
          <p className="text-base font-bold text-dark-100">{formatCurrency(budget)}</p>
        </div>
        <div>
          <p className="text-xs text-dark-400 mb-1">Spent</p>
          <p className="text-base font-bold text-danger-400">{formatCurrency(totalSpent)}</p>
        </div>
        <div>
          <p className="text-xs text-dark-400 mb-1">Remaining</p>
          <p className={`text-base font-bold ${isOverBudget ? 'text-danger-400' : 'text-primary-400'}`}>
            {formatCurrency(Math.abs(remaining))}
            {isOverBudget && <span className="text-xs ml-1">over</span>}
          </p>
        </div>
      </div>
    </div>
  );
}
