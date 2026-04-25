import type { LineItem, CurrencyAmount, VariantAttributes } from '../product/product'; // your existing file
export interface CartItem extends LineItem {
  cartItemId: string;
  shopId: string;
  shopName: string;
}

export interface ShopGroup {
  shopId: string;
  shopName: string;
  items: CartItem[];
}