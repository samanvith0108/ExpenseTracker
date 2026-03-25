import { useMemo, useCallback } from 'react';
import { useFinance } from '../context/FinanceContext';
import { v4 as uuidv4 } from 'uuid';

/**
 * Custom hook for transaction CRUD operations and computed data
 */
export function useTransactions({ search = '', filters = {}, sortBy = 'date', sortOrder = 'desc' } = {}) {
  const { transactions, addTransaction, updateTransaction, deleteTransaction } = useFinance();

  // Filter + Search + Sort transactions
  const filteredTransactions = useMemo(() => {
    let result = [...transactions];

    // Search by title and notes
    if (search.trim()) {
      const query = search.toLowerCase().trim();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(query) ||
          (t.notes && t.notes.toLowerCase().includes(query))
      );
    }

    // Filter by category
    if (filters.category) {
      result = result.filter((t) => t.category === filters.category);
    }

    // Filter by type
    if (filters.type) {
      result = result.filter((t) => t.type === filters.type);
    }

    // Filter by date range
    if (filters.startDate) {
      result = result.filter((t) => t.date >= filters.startDate);
    }
    if (filters.endDate) {
      result = result.filter((t) => t.date <= filters.endDate);
    }

    // Filter by recurring
    if (filters.recurring !== undefined && filters.recurring !== '') {
      result = result.filter((t) => t.recurring === (filters.recurring === 'true' || filters.recurring === true));
    }

    // Sort
    result.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'date':
          comparison = new Date(a.date) - new Date(b.date);
          break;
        case 'amount':
          comparison = a.amount - b.amount;
          break;
        case 'category':
          comparison = a.category.localeCompare(b.category);
          break;
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        default:
          comparison = new Date(a.date) - new Date(b.date);
      }
      return sortOrder === 'desc' ? -comparison : comparison;
    });

    return result;
  }, [transactions, search, filters, sortBy, sortOrder]);

  // Summary stats
  const stats = useMemo(() => {
    const totalIncome = transactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = transactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const netBalance = totalIncome - totalExpense;

    // Category breakdown for expenses
    const categoryBreakdown = transactions
      .filter((t) => t.type === 'expense')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {});

    // Top spending category
    const topCategory = Object.entries(categoryBreakdown).sort(
      ([, a], [, b]) => b - a
    )[0];

    // Monthly data for charts
    const monthlyData = transactions.reduce((acc, t) => {
      const month = t.date.substring(0, 7); // YYYY-MM
      if (!acc[month]) {
        acc[month] = { month, income: 0, expense: 0 };
      }
      if (t.type === 'income') {
        acc[month].income += t.amount;
      } else {
        acc[month].expense += t.amount;
      }
      return acc;
    }, {});

    return {
      totalIncome,
      totalExpense,
      netBalance,
      categoryBreakdown,
      topCategory: topCategory ? { category: topCategory[0], amount: topCategory[1] } : null,
      monthlyData: Object.values(monthlyData).sort((a, b) => a.month.localeCompare(b.month)),
      transactionCount: transactions.length,
      recurringCount: transactions.filter((t) => t.recurring).length,
    };
  }, [transactions]);

  // Create transaction with auto-generated ID
  const createTransaction = useCallback(
    (data) => {
      const transaction = {
        ...data,
        id: uuidv4(),
        amount: Number(data.amount),
      };
      addTransaction(transaction);
      return transaction;
    },
    [addTransaction]
  );

  return {
    transactions: filteredTransactions,
    allTransactions: transactions,
    stats,
    createTransaction,
    updateTransaction,
    deleteTransaction,
  };
}

export default useTransactions;
