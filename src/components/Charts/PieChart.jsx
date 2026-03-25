import { PieChart as RechartsPie, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { getCategoryByValue } from '../../utils/sampleData';
import { formatCurrency } from '../../utils/currencyFormatter';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="glass rounded-xl px-4 py-3 shadow-xl">
        <p className="text-sm font-semibold text-dark-100">{data.name}</p>
        <p className="text-sm text-primary-400 font-bold">{formatCurrency(data.value)}</p>
        <p className="text-xs text-dark-400">{data.payload.percentage}%</p>
      </div>
    );
  }
  return null;
};

const CustomLegend = ({ payload }) => (
  <div className="flex flex-wrap gap-x-3 gap-y-2 justify-center mt-4 px-2">
    {payload?.map((entry, index) => (
      <div key={index} className="flex items-center gap-1.5">
        <div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: entry.color }}
        />
        <span className="text-xs text-dark-300">{entry.value}</span>
      </div>
    ))}
  </div>
);

export default function SpendingPieChart({ data, title = 'Spending by Category', height = 240 }) {
  // Transform category breakdown data
  const total = Object.values(data).reduce((sum, val) => sum + val, 0);
  const chartData = Object.entries(data)
    .map(([category, amount]) => {
      const cat = getCategoryByValue(category);
      return {
        name: cat.label,
        value: amount,
        color: cat.color,
        percentage: total > 0 ? Math.round((amount / total) * 100) : 0,
      };
    })
    .sort((a, b) => b.value - a.value);

  if (chartData.length === 0) {
    return (
      <div className="glass rounded-2xl p-6 flex items-center justify-center h-[300px]">
        <p className="text-dark-500 text-sm">No data to display</p>
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl p-5 sm:p-6 h-fit self-start shadow-[0_8px_24px_rgba(2,6,23,0.28)]">
      <h3 className="text-sm font-semibold text-dark-200 uppercase tracking-wider mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsPie>
          <Pie
            data={chartData}
            cx="50%"
            cy="47%"
            innerRadius={52}
            outerRadius={82}
            paddingAngle={3}
            dataKey="value"
            stroke="none"
          >
            {chartData.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />
        </RechartsPie>
      </ResponsiveContainer>
    </div>
  );
}
