import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Pencil, Trash2, RotateCcw } from 'lucide-react';
import { getCategoryByValue } from '../../utils/sampleData';
import { formatCurrency } from '../../utils/currencyFormatter';

export default function TransactionCard({ transaction, onEdit, onDelete, index = 0 }) {
  const { title, amount, category, date, type, notes, recurring } = transaction;
  const cat = getCategoryByValue(category);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group relative glass rounded-2xl p-4 sm:p-5 hover:border-primary-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/5"
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        {/* Category Icon */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0"
          style={{ backgroundColor: `${cat.color}15`, border: `1px solid ${cat.color}30` }}
        >
          {cat.icon}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-dark-100 truncate">{title}</h3>
            {recurring && (
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-accent-500/10 text-accent-400 border border-accent-500/20 shrink-0">
                <RotateCcw className="w-3 h-3" />
                Recurring
              </span>
            )}
          </div>
          <div className="flex items-center flex-wrap gap-2 mt-1 text-sm text-dark-400">
            <span style={{ color: cat.color }}>{cat.label}</span>
            <span className="w-1 h-1 rounded-full bg-dark-600" />
            <span>{format(new Date(date), 'dd MMM yyyy')}</span>
          </div>
          {notes && (
            <p className="text-xs text-dark-500 mt-1 truncate sm:max-w-[320px]">{notes}</p>
          )}
        </div>

        {/* Amount */}
        <div className="sm:text-right shrink-0">
          <p className={`text-lg font-bold ${type === 'income' ? 'text-primary-400' : 'text-danger-400'}`}>
            {type === 'income' ? '+' : '-'}{formatCurrency(amount)}
          </p>
          <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full
            ${type === 'income'
              ? 'bg-primary-500/10 text-primary-400'
              : 'bg-danger-500/10 text-danger-400'
            }`}
          >
            {type === 'income' ? 'Income' : 'Expense'}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200 shrink-0">
          {onEdit && (
            <button
              onClick={() => onEdit(transaction)}
              className="p-2 rounded-lg text-dark-400 hover:text-accent-400 hover:bg-accent-500/10 transition-all duration-200"
              aria-label="Edit transaction"
            >
              <Pencil className="w-4 h-4" />
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(transaction.id)}
              className="p-2 rounded-lg text-dark-400 hover:text-danger-400 hover:bg-danger-500/10 transition-all duration-200"
              aria-label="Delete transaction"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
