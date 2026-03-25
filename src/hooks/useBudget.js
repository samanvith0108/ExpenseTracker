import { useMemo } from 'react';
import { useFinance } from '../context/FinanceContext';

/**
 * Custom hook for budget tracking calculations
 */
export function useBudget() {
  const { transactions, budget, setBudget } = useFinance();

  const budgetData = useMemo(() => {
    const currentMonth = new Date().toISOString().substring(0, 7);

    const totalSpent = transactions
      .filter((t) => t.type === 'expense' && t.date.startsWith(currentMonth))
      .reduce((sum, t) => sum + t.amount, 0);

    const remaining = budget - totalSpent;
    const percentage = budget > 0 ? Math.min(Math.round((totalSpent / budget) * 100), 100) : 0;
    const isOverBudget = totalSpent > budget;

    // Category-wise budget breakdown (current month expenses only)
    const categorySpending = transactions
      .filter((t) => t.type === 'expense' && t.date.startsWith(currentMonth))
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {});

    // Daily average spending this month
    const dayOfMonth = new Date().getDate();
    const dailyAverage = dayOfMonth > 0 ? Math.round(totalSpent / dayOfMonth) : 0;

    // Projected month-end spending
    const daysInMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      0
    ).getDate();
    const projectedSpending = Math.round(dailyAverage * daysInMonth);

    return {
      budget,
      totalSpent,
      remaining,
      percentage,
      isOverBudget,
      categorySpending,
      dailyAverage,
      projectedSpending,
      setBudget,
    };
  }, [transactions, budget, setBudget]);

  return budgetData;
}

export default useBudget;
