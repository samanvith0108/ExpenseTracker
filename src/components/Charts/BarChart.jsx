import {
  BarChart as RechartsBar,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
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

const CustomLegend = ({ payload }) => (
  <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center mt-2">
    {payload?.map((entry, i) => (
      <div key={i} className="flex items-center gap-2">
        <div className="w-3 h-3 rounded" style={{ backgroundColor: entry.color }} />
        <span className="text-xs text-dark-300">{entry.value}</span>
      </div>
    ))}
  </div>
);

export default function IncomeExpenseBarChart({ data, title = 'Income vs Expense' }) {
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
        <p className="text-dark-500 text-sm">No data available</p>
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl p-5 sm:p-6 min-h-[360px]">
      <h3 className="text-sm font-semibold text-dark-200 uppercase tracking-wider mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={280}>
        <RechartsBar data={chartData} barGap={4}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
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
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(148, 163, 184, 0.05)' }} />
          <Legend content={<CustomLegend />} />
          <Bar
            dataKey="income"
            name="Income"
            fill="#10b981"
            radius={[6, 6, 0, 0]}
            maxBarSize={40}
          />
          <Bar
            dataKey="expense"
            name="Expense"
            fill="#f87171"
            radius={[6, 6, 0, 0]}
            maxBarSize={40}
          />
        </RechartsBar>
      </ResponsiveContainer>
    </div>
  );
}
