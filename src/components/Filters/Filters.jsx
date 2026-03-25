import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, X } from 'lucide-react';
import { useState } from 'react';
import { CATEGORIES } from '../../utils/sampleData';

export default function Filters({ filters, onFilterChange, sortBy, sortOrder, onSortChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const activeFilterCount = Object.values(filters).filter((v) => v !== '' && v !== undefined).length;

  const clearFilters = () => {
    onFilterChange({});
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3 flex-wrap">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
            ${isOpen || activeFilterCount > 0
              ? 'bg-primary-500/15 text-primary-400 border border-primary-500/30'
              : 'bg-dark-800/50 text-dark-300 border border-dark-700/50 hover:border-dark-600'
            }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
          {activeFilterCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-primary-500 text-white text-[11px] flex items-center justify-center font-bold">
              {activeFilterCount}
            </span>
          )}
        </button>

        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value, sortOrder)}
          className="px-4 py-2.5 rounded-xl text-sm font-medium bg-dark-800/50 text-dark-300 border border-dark-700/50 hover:border-dark-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
        >
          <option value="date">Sort: Date</option>
          <option value="amount">Sort: Amount</option>
          <option value="category">Sort: Category</option>
          <option value="title">Sort: Title</option>
        </select>

        <button
          onClick={() => onSortChange(sortBy, sortOrder === 'desc' ? 'asc' : 'desc')}
          className="px-3 py-2.5 rounded-xl text-sm bg-dark-800/50 text-dark-300 border border-dark-700/50 hover:border-dark-600 transition-all duration-200"
        >
          {sortOrder === 'desc' ? '↓ Newest' : '↑ Oldest'}
        </button>

        {activeFilterCount > 0 && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 px-3 py-2.5 rounded-xl text-sm text-danger-400 hover:bg-danger-500/10 transition-all duration-200"
          >
            <X className="w-4 h-4" />
            Clear all
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="glass rounded-2xl p-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="text-xs font-medium text-dark-300 mb-1.5 block">Category</label>
                  <select
                    value={filters.category || ''}
                    onChange={(e) => onFilterChange({ ...filters, category: e.target.value || undefined })}
                    className="w-full px-3 py-2.5 rounded-xl bg-dark-800/50 border border-dark-700/50 text-sm text-dark-200 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
                  >
                    <option value="">All Categories</option>
                    {CATEGORIES.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.icon} {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-medium text-dark-300 mb-1.5 block">Type</label>
                  <select
                    value={filters.type || ''}
                    onChange={(e) => onFilterChange({ ...filters, type: e.target.value || undefined })}
                    className="w-full px-3 py-2.5 rounded-xl bg-dark-800/50 border border-dark-700/50 text-sm text-dark-200 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
                  >
                    <option value="">All Types</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-medium text-dark-300 mb-1.5 block">From Date</label>
                  <input
                    type="date"
                    value={filters.startDate || ''}
                    onChange={(e) => onFilterChange({ ...filters, startDate: e.target.value || undefined })}
                    className="w-full px-3 py-2.5 rounded-xl bg-dark-800/50 border border-dark-700/50 text-sm text-dark-200 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-dark-300 mb-1.5 block">To Date</label>
                  <input
                    type="date"
                    value={filters.endDate || ''}
                    onChange={(e) => onFilterChange({ ...filters, endDate: e.target.value || undefined })}
                    className="w-full px-3 py-2.5 rounded-xl bg-dark-800/50 border border-dark-700/50 text-sm text-dark-200 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
