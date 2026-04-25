import { Timestamp } from "firebase/firestore";

// ─── Enums ────────────────────────────────────────────────────────────────────

export type ProductType = "physical" | "digital" | "service";

export type ProductStatus = "active" | "draft" | "archived";

export type VariantStatus = "active" | "out_of_stock" | "discontinued";

export type DiscountType = "percentage" | "fixed" | "free_shipping";

export type DiscountStatus = "active" | "inactive" | "expired";

export type CurrencyAmount = number; // Smallest currency unit (e.g. paise, cents)

// ─── Product ──────────────────────────────────────────────────────────────────

/**
 * Core product document stored in Firestore.
 * Pricing lives on Variant — these fields are display-level defaults
 * derived from the defaultVariantId's Variant document.
 */
export interface Product {
  id: string;
  shopId:string;
  slug: string;
  
  title: string;
  description: string;
  banner?:string | null;
  price:CurrencyAmount;
  compareAtPrice?: CurrencyAmount;

  /** ID of the variant shown by default on product pages */
  defaultVariantId: string;

  type: ProductType;
  category: string;
  tags: string[];
  status: ProductStatus;

  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// ─── Variant ──────────────────────────────────────────────────────────────────

/**
 * Flexible attribute map for variant options.
 * @example { color: "Red", size: "M" } | { license: "Lifetime" }
 */
export type VariantAttributes = Record<string, string>;

export interface Variant {
  id: string;
  productId: string;
  sku: string;
  attributes: VariantAttributes;

  /** Selling price in smallest currency unit (e.g. paise, cents) */
  price: CurrencyAmount;
  /** Original price before discount — used for strikethrough display */
  compareAtPrice?: CurrencyAmount;

  /**
   * Your cost of goods — used for margin calculation.
   * @security Never expose this field to the client.
   */
  costPrice: CurrencyAmount;

  isDefault: boolean;
  status: VariantStatus;

  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// ─── Inventory ────────────────────────────────────────────────────────────────

export interface Inventory {
  variantId: string;
  quantity: number;
  lowStockThreshold: number;

  /**
   * Set to `false` for digital products with unlimited supply.
   * When `false`, `quantity` and `lowStockThreshold` are ignored.
   */
  trackInventory: boolean;

  warehouseLocation: string | null;
  lastUpdated: Timestamp;
}

// ─── Images ───────────────────────────────────────────────────────────────────

export interface ProductImage {
  id: string;
  productId: string;

  /** `null` means the image applies to all variants */
  variantId: string | null;

  url: string;

  /** Firebase Storage path — used for deletion and signed URL generation */
  storageRef: string;

  altText: string;
  isPrimary: boolean;

  /** Ascending sort order for display */
  order: number;
}

// ─── Discounts ────────────────────────────────────────────────────────────────

export interface DiscountConditions {
  /** Minimum order value in smallest currency unit */
  minOrderValue?: CurrencyAmount;
  minQuantity?: number;
}

export interface DiscountApplicableTo {
  /** When `true`, discount applies to the entire cart regardless of other fields */
  all: boolean;
  productIds?: string[];
  categoryIds?: string[];
}

export interface Discount {
  id: string;
  code: string;
  type: DiscountType;

  /**
   * Interpretation depends on `type`:
   * - `"percentage"` → 0–100
   * - `"fixed"` → amount in smallest currency unit
   * - `"free_shipping"` → field is ignored
   */
  value: number;

  applicableTo: DiscountApplicableTo;
  conditions: DiscountConditions;

  startsAt: Timestamp;
  expiresAt: Timestamp;

  /** `null` means unlimited usage */
  usageLimit: number | null;
  usageCount: number;

  status: DiscountStatus;

  createdAt: Timestamp;
  updatedAt: Timestamp;
}








// ─── Composite / UI Types ─────────────────────────────────────────────────────

/** Lightweight product card — used for listing and search result pages */
export interface ProductSummary {
  product: Product;
  defaultVariant: Variant;
  primaryImage: ProductImage | null;
}

/** Full product detail payload — used for product detail pages */
export interface ProductDetail {
  product: Product;
  variants: Variant[];
  images: ProductImage[];
  /** Keyed by `variantId` for O(1) lookup */
  inventory: Record<string, Inventory>;
}

/** A single line item in a cart or order */
export interface LineItem {
  productId: string;
  variantId: string;
  sku: string;
  name: string;
  attributes: VariantAttributes;
  quantity: number;
  unitPrice: CurrencyAmount;
  compareAtPrice?: CurrencyAmount;
  imageUrl: string | null;
}