// ─── types/shop/shop.ts ───────────────────────────────────────────────────────

import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

// ─── Reusable Firebase Types ─────────────────────────────────────────────────
type DocumentSnapshot = FirebaseFirestoreTypes.DocumentSnapshot;
type Timestamp = FirebaseFirestoreTypes.Timestamp;
type FieldValue = FirebaseFirestoreTypes.FieldValue;
type GeoPoint = FirebaseFirestoreTypes.GeoPoint;

// ─── Core Types ──────────────────────────────────────────────────────────────
export type DaySchedule = { open: string | null; close: string | null };

export type OperatingHours = {
  monday: DaySchedule;
  tuesday: DaySchedule;
  wednesday: DaySchedule;
  thursday: DaySchedule;
  friday: DaySchedule;
  saturday: DaySchedule;
  sunday: DaySchedule;
};

export type PaymentMethod = "cash" | "upi" | "card" | "cod" | "wallet";
export type ShopStatus = "approved" | "pending" | "suspended";

export type ShopCategory =
  | "Grocery"
  | "Pharmacy"
  | "Bakery"
  | "Electronics"
  | "Fashion"
  | "Flowers"
  | "Restaurant"
  | "Service";

// ─── Sorting ─────────────────────────────────────────────────────────────────
export type SortOption =
  | "ratingAverage"
  | "totalOrders"
  | "shopName"
  | "createdAt";

export type SortDirection = "asc" | "desc";

// ─── Filters (✅ FIXED & MATCHES FilterSheet + Store) ───────────────────────
export interface ShopFilters {
  // Used by FilterSheet
  categories?: string[];           // multiple category selection
  
  // Legacy / additional filters (still supported)
  category?: ShopCategory;         // single category (for backward compatibility)
  subCategory?: string;
  deliveryAvailable?: boolean;
  homeServiceAvailable?: boolean;
  pickupAvailable?: boolean;
  isOpen?: boolean;
}

// ─── Query Options ───────────────────────────────────────────────────────────
export interface FetchShopsOptions {
  searchQuery?: string;
  filters?: ShopFilters;
  sortBy?: SortOption;
  sortDirection?: SortDirection;
  limit?: number;
  lastDocument?: DocumentSnapshot;
}

export interface FetchShopsResult {
  shops: ShopListItem[];
  lastDocument: DocumentSnapshot | null;
  hasMore: boolean;
}

// ─── Main Shop Entity ────────────────────────────────────────────────────────
export type Shop = {
  shopId: string;
  ownerId: string;
  shopName: string;
  category: ShopCategory;
  subCategory?: string;
  description?: string;
  logoUrl?: string;
  bannerImages?: string[];
  addressLine1: string;
  addressLine2?: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  latitude: number;
  longitude: number;
  location: GeoPoint;
  geohash: string;
  operatingHours: OperatingHours;
  isOpen: boolean;
  deliveryAvailable: boolean;
  homeServiceAvailable: boolean;
  pickupAvailable?: boolean;
  maxDeliveryDistanceKm?: number;
  paymentMethods: PaymentMethod[];
  searchKeywords: string[];
  verificationStatus: "draft" | "pending" | "approved" | "rejected";
  status: ShopStatus;
  isActive: boolean;
  isDeleted: boolean;
  totalProducts?: number;
  ratingAverage?: number;
  ratingCount?: number;
  totalOrders?: number;
  createdAt: Timestamp | FieldValue;
  updatedAt: Timestamp | FieldValue;
};

// ─── Lightweight version for lists ───────────────────────────────────────────
export type ShopListItem = Pick<
  Shop,
  | "shopId"
  | "shopName"
  | "category"
  | "subCategory"
  | "logoUrl"
  | "city"
  | "isOpen"
  | "ratingAverage"
  | "ratingCount"
  | "deliveryAvailable"
  | "homeServiceAvailable"
  | "pickupAvailable"
>;