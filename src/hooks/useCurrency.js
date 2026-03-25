import { useCallback } from 'react';
import { formatCurrency, formatCompactCurrency } from '../utils/currencyFormatter';

/**
 * Custom hook for currency formatting
 */
export function useCurrency() {
  const format = useCallback((amount, showSign = false) => {
    return formatCurrency(amount, showSign);
  }, []);

  const formatCompact = useCallback((amount) => {
    return formatCompactCurrency(amount);
  }, []);

  return { format, formatCompact };
}

export default useCurrency;
