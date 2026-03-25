export const CATEGORIES = [
  { value: 'food', label: 'Food & Dining', icon: '🍕', color: '#f97316' },
  { value: 'transport', label: 'Transport', icon: '🚗', color: '#3b82f6' },
  { value: 'shopping', label: 'Shopping', icon: '🛍️', color: '#8b5cf6' },
  { value: 'entertainment', label: 'Entertainment', icon: '🎬', color: '#ec4899' },
  { value: 'bills', label: 'Bills & Utilities', icon: '💡', color: '#f59e0b' },
  { value: 'health', label: 'Health', icon: '🏥', color: '#10b981' },
  { value: 'education', label: 'Education', icon: '📚', color: '#06b6d4' },
  { value: 'rent', label: 'Rent', icon: '🏠', color: '#6366f1' },
  { value: 'salary', label: 'Salary', icon: '💰', color: '#22c55e' },
  { value: 'freelance', label: 'Freelance', icon: '💻', color: '#14b8a6' },
  { value: 'investment', label: 'Investment', icon: '📈', color: '#a855f7' },
  { value: 'other', label: 'Other', icon: '📦', color: '#64748b' },
];

export const getCategoryByValue = (value) => {
  return CATEGORIES.find((cat) => cat.value === value) || CATEGORIES[CATEGORIES.length - 1];
};

export const sampleTransactions = [];
export const DEFAULT_BUDGET = 0;

// Used for one-time migration to clear old seeded demo rows from local storage.
export const LEGACY_SEED_TITLES = new Set([
  'Monthly Salary',
  'Freelance Web Project',
  'Apartment Rent',
  'Electricity Bill',
  'Swiggy Order',
  'Uber Rides',
  'Netflix Subscription',
  'Gym Membership',
  'Grocery Shopping',
  'Udemy Course',
  'Amazon Shopping',
  'Internet Bill',
  'Investment - SIP',
  'Investment Returns',
  'Zomato Lunch',
  'Movie Tickets',
  'Mobile Recharge',
  'Metro Card Recharge',
  'Doctor Visit',
  'Coffee & Snacks',
  'Clothing Purchase',
  'Spotify Premium',
  'Petrol',
  'Book Purchase',
  'Weekend Dinner',
  'Freelance Logo Design',
]);
