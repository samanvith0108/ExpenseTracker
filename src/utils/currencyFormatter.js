/**
 * Format a number as Indian Rupee currency
 * @param {number} amount - The amount to format
 * @param {boolean} showSign - Whether to show + or - sign
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount, showSign = false) => {
  const formatted = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.abs(amount));

  if (showSign) {
    return amount >= 0 ? `+${formatted}` : `-${formatted}`;
  }

  return formatted;
};

/**
 * Format a number as compact Indian currency (e.g., ₹1.2L, ₹50K)
 * @param {number} amount
 * @returns {string}
 */
export const formatCompactCurrency = (amount) => {
  const abs = Math.abs(amount);
  if (abs >= 10000000) {
    return `₹${(abs / 10000000).toFixed(1)}Cr`;
  }
  if (abs >= 100000) {
    return `₹${(abs / 100000).toFixed(1)}L`;
  }
  if (abs >= 1000) {
    return `₹${(abs / 1000).toFixed(1)}K`;
  }
  return `₹${abs}`;
};

/**
 * Calculate percentage
 * @param {number} part
 * @param {number} total
 * @returns {number}
 */
export const calcPercentage = (part, total) => {
  if (total === 0) return 0;
  return Math.round((part / total) * 100);
};
