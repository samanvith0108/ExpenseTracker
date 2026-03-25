import axios from 'axios';

const currencyApi = axios.create({
  baseURL: 'https://api.exchangerate-api.com/v4/latest',
  timeout: 10000,
});

/**
 * Fetch exchange rates relative to INR
 * @param {string} base - Base currency code (default 'INR')
 * @returns {Promise<Object>} Exchange rates object
 */
export const getExchangeRates = async (base = 'INR') => {
  try {
    const response = await currencyApi.get(`/${base}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch exchange rates:', error);
    return null;
  }
};

/**
 * Convert amount between currencies
 * @param {number} amount
 * @param {string} from
 * @param {string} to
 * @returns {Promise<number|null>}
 */
export const convertCurrency = async (amount, from = 'INR', to = 'USD') => {
  try {
    const data = await getExchangeRates(from);
    if (data && data.rates && data.rates[to]) {
      return amount * data.rates[to];
    }
    return null;
  } catch {
    return null;
  }
};
