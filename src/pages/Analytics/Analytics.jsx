import { motion } from 'framer-motion';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Award,
  Activity,
} from 'lucide-react';
import { useTransactions } from '../../hooks/useTransactions';
import { formatCurrency } from '../../utils/currencyFormatter';
import { getCategoryByValue } from '../../utils/sampleData';
import StatCard from '../../components/common/StatCard';
import SpendingPieChart from '../../components/Charts/PieChart';
import SpendingLineChart from '../../components/Charts/LineChart';
import IncomeExpenseBarChart from '../../components/Charts/BarChart';

export default function Analytics() {
  const { stats } = useTransactions();

  const savingsRate = stats.totalIncome > 0
    ? Math.round(((stats.totalIncome - stats.totalExpense) / stats.totalIncome) * 100)
    : 0;

  const topCat = stats.topCategory ? getCategoryByValue(stats.topCategory.category) : null;

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4"
      >
        <div className="p-2.5 rounded-xl bg-primary-500/10 text-primary-400">
          <BarChart3 className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-dark-50">Analytics</h1>
          <p className="text-sm text-dark-300 mt-0.5">Deep insights into your spending patterns</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
          title="Net Savings"
          value={formatCurrency(stats.netBalance)}
          subtitle={`${savingsRate}% savings rate`}
          icon={DollarSign}
          color={stats.netBalance >= 0 ? 'accent' : 'danger'}
          index={2}
        />
        <StatCard
          title="Top Category"
          value={topCat ? `${topCat.icon} ${topCat.label}` : 'N/A'}
          subtitle={stats.topCategory ? formatCurrency(stats.topCategory.amount) : ''}
          icon={Award}
          color="warning"
          index={3}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SpendingLineChart
          data={stats.monthlyData}
          title="Monthly Spending Trend"
        />
        <IncomeExpenseBarChart
          data={stats.monthlyData}
          title="Income vs Expense"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SpendingPieChart
          data={stats.categoryBreakdown}
          title="Spending by Category"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-2xl p-5 sm:p-6"
        >
          <h3 className="text-sm font-semibold text-dark-200 uppercase tracking-wider mb-5 flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Financial Insights
          </h3>
          <div className="space-y-4">
            <InsightCard
              icon="💰"
              title="Savings Rate"
              description={
                savingsRate >= 20
                  ? `Strong performance. You are saving ${savingsRate}% of your income.`
                  : savingsRate >= 0
                    ? `You are saving ${savingsRate}% of your income. Try to push this above 20%.`
                    : 'You are spending more than you earn. Reduce discretionary expenses first.'
              }
              status={savingsRate >= 20 ? 'good' : savingsRate >= 0 ? 'warning' : 'bad'}
            />

            {topCat && (
              <InsightCard
                icon={topCat.icon}
                title="Biggest Expense"
                description={`${topCat.label} is your highest spending category at ${formatCurrency(stats.topCategory.amount)}.`}
                status="info"
              />
            )}

            <InsightCard
              icon="🔁"
              title="Recurring Expenses"
              description={`You have ${stats.recurringCount} recurring transactions. Review them regularly.`}
              status="info"
            />

            <InsightCard
              icon="📊"
              title="Activity Level"
              description={`${stats.transactionCount} transactions recorded so far.`}
              status="good"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function InsightCard({ icon, title, description, status }) {
  const statusColors = {
    good: 'border-primary-500/20 bg-primary-500/5',
    warning: 'border-warning-500/20 bg-warning-500/5',
    bad: 'border-danger-500/20 bg-danger-500/5',
    info: 'border-dark-600/30 bg-dark-800/30',
  };

  return (
    <div className={`p-4 rounded-xl border ${statusColors[status]} transition-all duration-200 hover:scale-[1.01]`}>
      <div className="flex items-start gap-3">
        <span className="text-xl">{icon}</span>
        <div>
          <p className="text-sm font-semibold text-dark-200">{title}</p>
          <p className="text-xs text-dark-300 mt-0.5 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}
