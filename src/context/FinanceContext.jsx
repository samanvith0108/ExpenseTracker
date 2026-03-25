import { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { sampleTransactions, DEFAULT_BUDGET, LEGACY_SEED_TITLES } from '../utils/sampleData';

const FinanceContext = createContext(null);

const STORAGE_KEYS = {
  TRANSACTIONS: 'fintrack_transactions',
  BUDGET: 'fintrack_budget',
  THEME: 'fintrack_theme',
};

const isLegacySeedData = (transactions) => {
  if (!Array.isArray(transactions) || transactions.length === 0) {
    return false;
  }

  const matchingSeedRows = transactions.filter((tx) => LEGACY_SEED_TITLES.has(tx?.title)).length;

  // If most of the rows are old demo rows, drop them in migration.
  return matchingSeedRows >= Math.min(5, transactions.length);
};

// Load from localStorage or use defaults
const loadState = () => {
  try {
    const savedTransactions = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
    const savedBudget = localStorage.getItem(STORAGE_KEYS.BUDGET);
    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME);
    const parsedTransactions = savedTransactions ? JSON.parse(savedTransactions) : sampleTransactions;
    const cleanedTransactions = isLegacySeedData(parsedTransactions) ? [] : parsedTransactions;

    return {
      transactions: cleanedTransactions,
      budget: savedBudget ? JSON.parse(savedBudget) : DEFAULT_BUDGET,
      theme: savedTheme || 'dark',
    };
  } catch {
    return {
      transactions: sampleTransactions,
      budget: DEFAULT_BUDGET,
      theme: 'dark',
    };
  }
};

// Reducer actions
const ACTIONS = {
  ADD_TRANSACTION: 'ADD_TRANSACTION',
  UPDATE_TRANSACTION: 'UPDATE_TRANSACTION',
  DELETE_TRANSACTION: 'DELETE_TRANSACTION',
  SET_BUDGET: 'SET_BUDGET',
  TOGGLE_THEME: 'TOGGLE_THEME',
  LOAD_STATE: 'LOAD_STATE',
};

const financeReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_TRANSACTION:
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
      };

    case ACTIONS.UPDATE_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.map((t) =>
          t.id === action.payload.id ? { ...t, ...action.payload } : t
        ),
      };

    case ACTIONS.DELETE_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.filter((t) => t.id !== action.payload),
      };

    case ACTIONS.SET_BUDGET:
      return {
        ...state,
        budget: action.payload,
      };

    case ACTIONS.TOGGLE_THEME:
      return {
        ...state,
        theme: state.theme === 'dark' ? 'light' : 'dark',
      };

    case ACTIONS.LOAD_STATE:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};

export function FinanceProvider({ children }) {
  const [state, dispatch] = useReducer(financeReducer, null, loadState);

  // Sync to localStorage on every state change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(state.transactions));
    localStorage.setItem(STORAGE_KEYS.BUDGET, JSON.stringify(state.budget));
    localStorage.setItem(STORAGE_KEYS.THEME, state.theme);
  }, [state.transactions, state.budget, state.theme]);

  // Apply theme class to body
  useEffect(() => {
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(state.theme);
  }, [state.theme]);

  const addTransaction = useCallback((transaction) => {
    dispatch({ type: ACTIONS.ADD_TRANSACTION, payload: transaction });
  }, []);

  const updateTransaction = useCallback((transaction) => {
    dispatch({ type: ACTIONS.UPDATE_TRANSACTION, payload: transaction });
  }, []);

  const deleteTransaction = useCallback((id) => {
    dispatch({ type: ACTIONS.DELETE_TRANSACTION, payload: id });
  }, []);

  const setBudget = useCallback((amount) => {
    dispatch({ type: ACTIONS.SET_BUDGET, payload: amount });
  }, []);

  const toggleTheme = useCallback(() => {
    dispatch({ type: ACTIONS.TOGGLE_THEME });
  }, []);

  const value = {
    transactions: state.transactions,
    budget: state.budget,
    theme: state.theme,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    setBudget,
    toggleTheme,
  };

  return (
    <FinanceContext.Provider value={value}>
      {children}
    </FinanceContext.Provider>
  );
}

export function useFinance() {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
}

export default FinanceContext;
