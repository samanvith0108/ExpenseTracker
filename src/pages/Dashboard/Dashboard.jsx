import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ArrowRight,
  BarChart3,
} from 'lucide-react';
import { useTransactions } from '../../hooks/useTransactions';
import { useBudget } from '../../hooks/useBudget';
import { formatCurrency } from '../../utils/currencyFormatter';
import StatCard from '../../components/common/StatCard';
import BudgetCard from '../../components/BudgetCard/BudgetCard';
import TransactionCard from '../../components/TransactionCard/TransactionCard';
import SpendingPieChart from '../../components/Charts/PieChart';

export default function Dashboard() {
  const { allTransactions, stats } = useTransactions();
  const budgetData = useBudget();

  const recentTransactions = useMemo(
    () =>
      [...allTransactions]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5),
    [allTransactions]
  );

  return (
    <div className="space-y-6 lg:space-y-8">
      <motion.section
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-5 sm:p-6 shadow-[0_8px_24px_rgba(2,6,23,0.28)]"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-dark-50 leading-tight">
              Financial <span className="gradient-text">Dashboard</span>
            </h1>
            <p className="text-sm sm:text-base text-dark-300 mt-1.5">Overview of your financial health</p>
          </div>
          <Link
            to="/transactions/new"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 text-white text-sm leading-none font-semibold hover:shadow-lg hover:shadow-primary-500/25 transition-all duration-200 w-fit"
          >
            Add Transaction
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.section>

      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          title="Total Income"
          value={formatCurrency(stats.totalIncome)}
          icon={TrendingUp}
          color="primary"
          index={0}
        />
        <StatCard
          title="Total Expenses"
          value={formatCurrency(stats.totalExpense)}
          icon={TrendingDown}
          color="danger"
          index={1}
        />
        <StatCard
          title="Net Balance"
          value={formatCurrency(stats.netBalance)}
          subtitle={stats.netBalance >= 0 ? 'Healthy cash position' : 'Overspending detected'}
          icon={DollarSign}
          color={stats.netBalance >= 0 ? 'accent' : 'danger'}
          index={2}
        />
        <StatCard
          title="Transactions"
          value={stats.transactionCount}
          subtitle={`${stats.recurringCount} recurring`}
          icon={BarChart3}
          color="warning"
          index={3}
        />
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-2 items-start gap-6">
        <BudgetCard
          budget={budgetData.budget}
          totalSpent={budgetData.totalSpent}
          remaining={budgetData.remaining}
          percentage={budgetData.percentage}
          isOverBudget={budgetData.isOverBudget}
        />
        <SpendingPieChart
          data={stats.categoryBreakdown}
          title="Spending Breakdown"
          height={220}
        />
      </section>

      <section className="glass rounded-2xl p-4 sm:p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-dark-50">Recent Transactions</h2>
          <Link
            to="/transactions"
            className="text-sm text-primary-300 hover:text-primary-200 font-medium flex items-center gap-1 transition-colors"
          >
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="space-y-3">
          {recentTransactions.map((transaction, index) => (
            <TransactionCard
              key={transaction.id}
              transaction={transaction}
              index={index}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
