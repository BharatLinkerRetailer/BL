
import type { LineItem, CurrencyAmount } from '../types/product/product';
export const formatPrice = (amount: CurrencyAmount): string => {
  return `₹${(amount / 100).toFixed(2)}`;
};