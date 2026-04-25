// scripts/seedShops.ts

import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { Shop, ShopCategory, PaymentMethod } from "../../types/shop/shop";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const geo = (lat: number, lng: number) =>
  new firestore.GeoPoint(lat, lng) as FirebaseFirestoreTypes.GeoPoint;

/** Very simple geohash encoder (precision-5, good enough for dev) */
function encodeGeohash(lat: number, lng: number, precision = 5): string {
  const BASE32 = "0123456789bcdefghjkmnpqrstuvwxyz";
  let idx = 0,
    bit = 0,
    even = true,
    hash = "";
  let minLat = -90,
    maxLat = 90,
    minLng = -180,
    maxLng = 180;

  while (hash.length < precision) {
    if (even) {
      const mid = (minLng + maxLng) / 2;
      if (lng > mid) {
        idx = (idx << 1) | 1;
        minLng = mid;
      } else {
        idx = idx << 1;
        maxLng = mid;
      }
    } else {
      const mid = (minLat + maxLat) / 2;
      if (lat > mid) {
        idx = (idx << 1) | 1;
        minLat = mid;
      } else {
        idx = idx << 1;
        maxLat = mid;
      }
    }
    even = !even;
    if (++bit === 5) {
      hash += BASE32[idx];
      bit = 0;
      idx = 0;
    }
  }
  return hash;
}

const allDays = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const;

const hours = (open: string | null, close: string | null) =>
  Object.fromEntries(
    allDays.map((d) => [d, { open, close }]),
  ) as Shop["operatingHours"];

const weekdayHours = (): Shop["operatingHours"] =>
  Object.fromEntries(
    allDays.map((d) => [
      d,
      ["saturday", "sunday"].includes(d)
        ? { open: "10:00", close: "18:00" }
        : { open: "09:00", close: "21:00" },
    ]),
  ) as Shop["operatingHours"];

// ─── Demo Shops ───────────────────────────────────────────────────────────────

const DEMO_SHOPS: Omit<Shop, "createdAt" | "updatedAt">[] = [
  // 1. Grocery
  {
    shopId: "shop_001",
    ownerId: "owner_001",
    shopName: "FreshMart Superstore",
    category: "Grocery",
    subCategory: "Supermarket",
    description:
      "Your one-stop shop for fresh produce, dairy, and pantry staples.",
    logoUrl: "https://placehold.co/200x200?text=FreshMart",
    bannerImages: ["https://placehold.co/800x400?text=FreshMart+Banner"],
    addressLine1: "12 Market Street",
    addressLine2: "Near City Bus Stand",
    landmark: "Opposite Town Hall",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400001",
    country: "India",
    latitude: 19.076,
    longitude: 72.8777,
    location: geo(19.076, 72.8777),
    geohash: encodeGeohash(19.076, 72.8777),
    operatingHours: hours("07:00", "22:00"),
    isOpen: true,
    deliveryAvailable: true,
    homeServiceAvailable: false,
    pickupAvailable: true,
    maxDeliveryDistanceKm: 5,
    paymentMethods: ["cash", "upi", "card"] as PaymentMethod[],
    searchKeywords: ["grocery", "supermarket", "fresh", "vegetables", "fruits"],
    verificationStatus: "approved",
    status: "approved",
    isActive: true,
    isDeleted: false,
    totalProducts: 420,
    ratingAverage: 4.3,
    ratingCount: 218,
    totalOrders: 3450,
  },

  // 2. Pharmacy
  {
    shopId: "shop_002",
    ownerId: "owner_002",
    shopName: "MediQuick Pharmacy",
    category: "Pharmacy",
    subCategory: "General Pharmacy",
    description:
      "24/7 pharmacy with prescription & OTC medicines, health devices.",
    logoUrl: "https://placehold.co/200x200?text=MediQuick",
    bannerImages: ["https://placehold.co/800x400?text=MediQuick+Banner"],
    addressLine1: "45 Health Avenue",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560001",
    country: "India",
    latitude: 12.9716,
    longitude: 77.5946,
    location: geo(12.9716, 77.5946),
    geohash: encodeGeohash(12.9716, 77.5946),
    operatingHours: hours("00:00", "23:59"), // 24 hrs
    isOpen: true,
    deliveryAvailable: true,
    homeServiceAvailable: false,
    pickupAvailable: true,
    maxDeliveryDistanceKm: 3,
    paymentMethods: ["cash", "upi", "card", "wallet"] as PaymentMethod[],
    searchKeywords: ["pharmacy", "medicine", "drugs", "health", "24hr"],
    verificationStatus: "approved",
    status: "approved",
    isActive: true,
    isDeleted: false,
    totalProducts: 980,
    ratingAverage: 4.6,
    ratingCount: 512,
    totalOrders: 8900,
  },

  // 3. Bakery
  {
    shopId: "shop_003",
    ownerId: "owner_003",
    shopName: "Golden Crust Bakery",
    category: "Bakery",
    subCategory: "Artisan Breads & Cakes",
    description:
      "Freshly baked sourdough, pastries, and custom celebration cakes.",
    logoUrl: "https://placehold.co/200x200?text=GoldenCrust",
    bannerImages: ["https://placehold.co/800x400?text=GoldenCrust+Banner"],
    addressLine1: "7 Baker's Lane",
    landmark: "Next to City Library",
    city: "Pune",
    state: "Maharashtra",
    pincode: "411001",
    country: "India",
    latitude: 18.5204,
    longitude: 73.8567,
    location: geo(18.5204, 73.8567),
    geohash: encodeGeohash(18.5204, 73.8567),
    operatingHours: hours("07:00", "20:00"),
    isOpen: true,
    deliveryAvailable: true,
    homeServiceAvailable: false,
    pickupAvailable: true,
    maxDeliveryDistanceKm: 4,
    paymentMethods: ["cash", "upi"] as PaymentMethod[],
    searchKeywords: ["bakery", "bread", "cake", "pastry", "sourdough"],
    verificationStatus: "approved",
    status: "approved",
    isActive: true,
    isDeleted: false,
    totalProducts: 65,
    ratingAverage: 4.8,
    ratingCount: 340,
    totalOrders: 2100,
  },

  // 4. Electronics
  {
    shopId: "shop_004",
    ownerId: "owner_004",
    shopName: "TechZone Electronics",
    category: "Electronics",
    subCategory: "Gadgets & Accessories",
    description:
      "Latest smartphones, laptops, and accessories at competitive prices.",
    logoUrl: "https://placehold.co/200x200?text=TechZone",
    bannerImages: ["https://placehold.co/800x400?text=TechZone+Banner"],
    addressLine1: "88 Tech Park Road",
    addressLine2: "Ground Floor, Silicon Mall",
    city: "Hyderabad",
    state: "Telangana",
    pincode: "500001",
    country: "India",
    latitude: 17.385,
    longitude: 78.4867,
    location: geo(17.385, 78.4867),
    geohash: encodeGeohash(17.385, 78.4867),
    operatingHours: weekdayHours(),
    isOpen: false, // currently closed
    deliveryAvailable: true,
    homeServiceAvailable: true,
    pickupAvailable: true,
    maxDeliveryDistanceKm: 10,
    paymentMethods: ["card", "upi", "wallet", "cod"] as PaymentMethod[],
    searchKeywords: ["electronics", "phone", "laptop", "gadget", "accessories"],
    verificationStatus: "approved",
    status: "approved",
    isActive: true,
    isDeleted: false,
    totalProducts: 230,
    ratingAverage: 4.1,
    ratingCount: 178,
    totalOrders: 1540,
  },

  // 5. Restaurant
  {
    shopId: "shop_005",
    ownerId: "owner_005",
    shopName: "Spice Route Kitchen",
    category: "Restaurant",
    subCategory: "North Indian",
    description:
      "Authentic North Indian cuisine with live tandoor and home delivery.",
    logoUrl: "https://placehold.co/200x200?text=SpiceRoute",
    bannerImages: ["https://placehold.co/800x400?text=SpiceRoute+Banner"],
    addressLine1: "22 Food Street",
    landmark: "Behind Central Park",
    city: "Delhi",
    state: "Delhi",
    pincode: "110001",
    country: "India",
    latitude: 28.6139,
    longitude: 77.209,
    location: geo(28.6139, 77.209),
    geohash: encodeGeohash(28.6139, 77.209),
    operatingHours: hours("11:00", "23:00"),
    isOpen: true,
    deliveryAvailable: true,
    homeServiceAvailable: false,
    pickupAvailable: true,
    maxDeliveryDistanceKm: 6,
    paymentMethods: ["cash", "upi", "card", "wallet"] as PaymentMethod[],
    searchKeywords: [
      "restaurant",
      "food",
      "north indian",
      "delivery",
      "tandoor",
      "biryani",
    ],
    verificationStatus: "approved",
    status: "approved",
    isActive: true,
    isDeleted: false,
    totalProducts: 85,
    ratingAverage: 4.5,
    ratingCount: 892,
    totalOrders: 12500,
  },

  // 6. Fashion  (pending verification – useful to test filtered views)
  {
    shopId: "shop_006",
    ownerId: "owner_006",
    shopName: "Trendy Threads",
    category: "Fashion",
    subCategory: "Women's Wear",
    description: "Ethnic and western wear for every occasion.",
    logoUrl: "https://placehold.co/200x200?text=TrendyThreads",
    addressLine1: "5 Fashion Street",
    city: "Chennai",
    state: "Tamil Nadu",
    pincode: "600001",
    country: "India",
    latitude: 13.0827,
    longitude: 80.2707,
    location: geo(13.0827, 80.2707),
    geohash: encodeGeohash(13.0827, 80.2707),
    operatingHours: weekdayHours(),
    isOpen: false,
    deliveryAvailable: true,
    homeServiceAvailable: false,
    pickupAvailable: false,
    maxDeliveryDistanceKm: 15,
    paymentMethods: ["upi", "card", "cod"] as PaymentMethod[],
    searchKeywords: [
      "fashion",
      "clothes",
      "ethnic",
      "saree",
      "kurti",
      "western",
    ],
    verificationStatus: "pending", // ← not yet approved
    status: "pending",
    isActive: false,
    isDeleted: false,
    totalProducts: 150,
    ratingAverage: undefined,
    ratingCount: undefined,
    totalOrders: 0,
  },

  // 7. Service (home service example)
  {
    shopId: "shop_007",
    ownerId: "owner_007",
    shopName: "CleanPro Home Services",
    category: "Service",
    subCategory: "Cleaning & Pest Control",
    description:
      "Professional home cleaning, deep cleaning & pest control at your doorstep.",
    logoUrl: "https://placehold.co/200x200?text=CleanPro",
    bannerImages: ["https://placehold.co/800x400?text=CleanPro+Banner"],
    addressLine1: "34 Service Hub",
    city: "Kolkata",
    state: "West Bengal",
    pincode: "700001",
    country: "India",
    latitude: 22.5726,
    longitude: 88.3639,
    location: geo(22.5726, 88.3639),
    geohash: encodeGeohash(22.5726, 88.3639),
    operatingHours: weekdayHours(),
    isOpen: true,
    deliveryAvailable: false,
    homeServiceAvailable: true,
    pickupAvailable: false,
    paymentMethods: ["cash", "upi"] as PaymentMethod[],
    searchKeywords: [
      "cleaning",
      "home service",
      "pest control",
      "maid",
      "housekeeping",
    ],
    verificationStatus: "approved",
    status: "approved",
    isActive: true,
    isDeleted: false,
    totalProducts: 18,
    ratingAverage: 4.7,
    ratingCount: 95,
    totalOrders: 430,
  },
];




// helper to remove undefined fields
function removeUndefined<T extends object>(obj: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v !== undefined)
  ) as Partial<T>;
}
// ─── Seed Function ────────────────────────────────────────────────────────────

export async function seedShops(): Promise<void> {
  const db = firestore();
  const batch = db.batch();
  const serverTs = firestore.FieldValue.serverTimestamp();

  for (const shop of DEMO_SHOPS) {
    const ref = db.collection("shops").doc(); // Firestore generates the ID

    batch.set(ref, {
      ...removeUndefined(shop), 
      shopId: ref.id, // ✅ use the generated ID as shopId inside the document too
      createdAt: serverTs,
      updatedAt: serverTs,
    });
  }

  await batch.commit();
  console.log(`✅ Seeded ${DEMO_SHOPS.length} demo shops into Firestore.`);
}

// ─── Call it (e.g., from a dev screen or __DEV__ block) ───────────────────────
// seedShops().catch(console.error);
