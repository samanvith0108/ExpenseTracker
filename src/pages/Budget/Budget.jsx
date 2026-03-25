import { useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, Target, TrendingUp, CalendarDays } from 'lucide-react';
import { toast } from 'react-toastify';
import { useBudget } from '../../hooks/useBudget';
import { formatCurrency } from '../../utils/currencyFormatter';
import { getCategoryByValue } from '../../utils/sampleData';
import BudgetCard from '../../components/BudgetCard/BudgetCard';
import StatCard from '../../components/common/StatCard';

export default function Budget() {
  const budgetData = useBudget();
  const [budgetInput, setBudgetInput] = useState(budgetData.budget);
  const [isEditing, setIsEditing] = useState(false);

  const handleSaveBudget = () => {
    const amount = Number(budgetInput);
    if (amount <= 0 || Number.isNaN(amount)) {
      toast.error('Please enter a valid budget amount', {
        style: { background: '#1e293b', color: '#f1f5f9' },
      });
      return;
    }
    budgetData.setBudget(amount);
    setIsEditing(false);
    toast.success('Budget updated.', {
      icon: '💰',
      style: { background: '#1e293b', color: '#f1f5f9' },
    });
  };

  const sortedCategories = Object.entries(budgetData.categorySpending)
    .sort(([, a], [, b]) => b - a);

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4"
      >
        <div className="p-2.5 rounded-xl bg-primary-500/10 text-primary-400">
          <Wallet className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-dark-50">Budget Tracker</h1>
          <p className="text-sm text-dark-300 mt-0.5">Monitor and manage your monthly spending</p>
        </div>
      </motion.div>

      <BudgetCard
        budget={budgetData.budget}
        totalSpent={budgetData.totalSpent}
        remaining={budgetData.remaining}
        percentage={budgetData.percentage}
        isOverBudget={budgetData.isOverBudget}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass rounded-2xl p-5 sm:p-6"
      >
        <h3 className="text-sm font-semibold text-dark-200 uppercase tracking-wider mb-4">
          Set Monthly Budget
        </h3>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-300 font-medium">₹</span>
            <input
              type="number"
              value={budgetInput}
              onChange={(e) => {
                setBudgetInput(e.target.value);
                setIsEditing(true);
              }}
              className="w-full pl-8 pr-4 py-3 rounded-xl bg-dark-800/50 border border-dark-700/50 text-lg font-bold text-dark-100 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500/50 transition-all"
            />
          </div>
          <button
            onClick={handleSaveBudget}
            disabled={!isEditing}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold text-sm hover:shadow-lg hover:shadow-primary-500/20 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Save
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Daily Average"
          value={formatCurrency(budgetData.dailyAverage)}
          subtitle="Avg spending per day"
          icon={CalendarDays}
          color="accent"
          index={0}
        />
        <StatCard
          title="Projected Spending"
          value={formatCurrency(budgetData.projectedSpending)}
          subtitle={
            budgetData.projectedSpending > budgetData.budget
              ? 'Warning: may exceed budget'
              : 'On track this month'
          }
          icon={Target}
          color={budgetData.projectedSpending > budgetData.budget ? 'danger' : 'primary'}
          index={1}
        />
        <StatCard
          title="Savings Rate"
          value={
            budgetData.budget > 0
              ? `${Math.max(0, Math.round(((budgetData.budget - budgetData.totalSpent) / budgetData.budget) * 100))}%`
              : '0%'
          }
          subtitle="of budget saved"
          icon={TrendingUp}
          color="primary"
          index={2}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass rounded-2xl p-5 sm:p-6"
      >
        <h3 className="text-sm font-semibold text-dark-200 uppercase tracking-wider mb-5">
          Category Spending
        </h3>
        {sortedCategories.length > 0 ? (
          <div className="space-y-4">
            {sortedCategories.map(([category, amount], index) => {
              const cat = getCategoryByValue(category);
              const percentage = budgetData.totalSpent > 0
                ? Math.round((amount / budgetData.totalSpent) * 100)
                : 0;

              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{cat.icon}</span>
                      <span className="text-sm font-medium text-dark-200">{cat.label}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold text-dark-100">{formatCurrency(amount)}</span>
                      <span className="text-xs text-dark-400 ml-2">{percentage}%</span>
                    </div>
                  </div>
                  <div className="h-2 rounded-full bg-dark-800/80 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 0.8, delay: index * 0.05 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: cat.color }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-dark-400 text-center py-8">No spending data for this month</p>
        )}
      </motion.div>
    </div>
  );
}
