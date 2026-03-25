import {
  LineChart as RechartsLine,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import { formatCompactCurrency } from '../../utils/currencyFormatter';
import { format, parse } from 'date-fns';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass rounded-xl px-4 py-3 shadow-xl">
        <p className="text-sm font-medium text-dark-300 mb-1">{label}</p>
        {payload.map((entry, i) => (
          <p key={i} className="text-sm font-bold" style={{ color: entry.color }}>
            {entry.name}: {formatCompactCurrency(entry.value)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function SpendingLineChart({ data, title = 'Monthly Trend' }) {
  // Format month labels
  const chartData = data.map((item) => ({
    ...item,
    label: (() => {
      try {
        const date = parse(item.month, 'yyyy-MM', new Date());
        return format(date, 'MMM yy');
      } catch {
        return item.month;
      }
    })(),
  }));

  if (chartData.length === 0) {
    return (
      <div className="glass rounded-2xl p-6 flex items-center justify-center h-[300px]">
        <p className="text-dark-500 text-sm">No trend data available</p>
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl p-5 sm:p-6 min-h-[360px]">
      <h3 className="text-sm font-semibold text-dark-200 uppercase tracking-wider mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f87171" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#f87171" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis
            dataKey="label"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#64748b', fontSize: 12 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#64748b', fontSize: 12 }}
            tickFormatter={formatCompactCurrency}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="income"
            name="Income"
            stroke="#10b981"
            strokeWidth={2.5}
            fill="url(#incomeGrad)"
            dot={{ fill: '#10b981', r: 4, strokeWidth: 0 }}
            activeDot={{ r: 6, fill: '#10b981', stroke: '#0f172a', strokeWidth: 2 }}
          />
          <Area
            type="monotone"
            dataKey="expense"
            name="Expense"
            stroke="#f87171"
            strokeWidth={2.5}
            fill="url(#expenseGrad)"
            dot={{ fill: '#f87171', r: 4, strokeWidth: 0 }}
            activeDot={{ r: 6, fill: '#f87171', stroke: '#0f172a', strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
