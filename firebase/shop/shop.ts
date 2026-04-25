// firebase/shop/shop.ts
import {
  getFirestore,
  collection,
  query,
  where,
  orderBy,
  startAfter,
  limit as firestoreLimit,
  getDocs,
  getDoc,
  doc,
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";

import type { Shop, ShopListItem } from "../../types/shop/shop";
import { db } from "../../firebase/config";
import {
  FetchShopsOptions,
  FetchShopsResult,
  ShopFilters,
} from "../../types/shop/shop";

// ─── Helpers ──────────────────────────────────────────────────────────────────
export function tokenise(text: string): string[] {
  if (!text?.trim()) return [];
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .split(/\s+/)
    .filter((t) => t.length > 1);
}

export function buildSearchKeywords(shop: Partial<Shop>): string[] {
  const raw = [
    shop.shopName,
    shop.category,
    shop.subCategory,
    shop.description,
    shop.city,
    shop.addressLine1,
  ]
    .filter(Boolean)
    .join(" ");

  return [...new Set(tokenise(raw))];
}

// ─── Main Fetch Function ──────────────────────────────────────────────────────
export async function fetchShops(
  options: FetchShopsOptions = {}
): Promise<FetchShopsResult> {
  try {
    const {
      searchQuery = "",
      filters = {},
      sortBy = "ratingAverage",
      sortDirection = "desc",
      limit = 20,
      lastDocument,
    } = options;

    const trimmedQuery = searchQuery.trim();

    // ── SPECIAL CASE: @username direct lookup ───────────────────────────────
    // If search starts with @, we treat everything after @ as the exact shop username
    // and return that single shop (bypassing all filters, sorting, pagination, etc.)
    if (trimmedQuery.startsWith('@')) {
      const username = trimmedQuery.slice(1).trim();

      if (username) {
        console.log(`🔍 @username lookup: searching for shop with username "${username}"`);

        const usernameQuery = query(
          collection(db, "shops"),
          where("isActive", "==", true),
          where("status", "==", "approved"),
          where("username", "==", username)   // ← Field name assumed as "username"
        );

        const snapshot = await getDocs(usernameQuery);

        if (snapshot.empty) {
          console.log(`No shop found with username: ${username}`);
          return {
            shops: [],
            lastDocument: null,
            hasMore: false,
          };
        }

        const docSnap = snapshot.docs[0];
        const data = docSnap.data();

        const shop: ShopListItem = {
          shopId: docSnap.id,
          shopName: data.shopName ?? "",
          category: data.category,
          subCategory: data.subCategory,
          logoUrl: data.logoUrl,
          city: data.city,
          isOpen: data.isOpen ?? false,
          ratingAverage: data.ratingAverage ?? 0,
          ratingCount: data.ratingCount ?? 0,
          deliveryAvailable: data.deliveryAvailable ?? false,
          homeServiceAvailable: data.homeServiceAvailable ?? false,
          pickupAvailable: data.pickupAvailable ?? false,
        };

        return {
          shops: [shop],
          lastDocument: null,
          hasMore: false,
        };
      }
    }

    // ── DEBUG LOG (normal search) ─────────────────────────────────────────────
    console.log("🔍 fetchShops called with:", {
      searchQuery: trimmedQuery,
      filters: { ...filters },
      sortBy,
      sortDirection,
      limit,
      hasLastDocument: !!lastDocument,
    });

    const constraints: any[] = [
      where("isActive", "==", true),
      where("status", "==", "approved"),
    ];

    // ── Category Filter ───────────────────────────────────────────────────────
    const categories = filters.categories?.length
      ? filters.categories
      : filters.category
      ? [filters.category]
      : [];

    if (categories.length > 0) {
      constraints.push(where("category", "in", categories));
    }

    // ── Availability Filters ──────────────────────────────────────────────────
    if (filters.isOpen === true) {
      constraints.push(where("isOpen", "==", true));
    }
    if (filters.deliveryAvailable === true) {
      constraints.push(where("deliveryAvailable", "==", true));
    }
    if (filters.homeServiceAvailable === true) {
      constraints.push(where("homeServiceAvailable", "==", true));
    }
    if (filters.pickupAvailable === true) {
      constraints.push(where("pickupAvailable", "==", true));
    }

    // Optional: subCategory (legacy)
    if (filters.subCategory) {
      constraints.push(where("subCategory", "==", filters.subCategory));
    }

    // ── Keyword Search (normal behaviour) ─────────────────────────────────────
    const tokens = tokenise(trimmedQuery);
    if (tokens.length > 0) {
      constraints.push(where("searchKeywords", "array-contains", tokens[0]));
    }

    // ── Sorting ───────────────────────────────────────────────────────────────
    constraints.push(orderBy(sortBy, sortDirection));

    // ── Pagination ────────────────────────────────────────────────────────────
    if (lastDocument) {
      constraints.push(startAfter(lastDocument));
    }
    constraints.push(firestoreLimit(limit + 1));

    // ── Execute Query ─────────────────────────────────────────────────────────
    const q = query(collection(db, "shops"), ...constraints);
    const snapshot = await getDocs(q);
    let docs = snapshot.docs;

    console.log(`📊 Fetched ${docs.length} documents`);

    // ── Client-side filter for remaining search tokens ────────────────────────
    if (tokens.length > 1) {
      const remainingTokens = tokens.slice(1);
      docs = docs.filter((docSnap: any) => {
        const keywords: string[] = docSnap.get("searchKeywords") ?? [];
        return remainingTokens.every((token) => keywords.includes(token));
      });
    }

    // ── Pagination bookkeeping ────────────────────────────────────────────────
    const hasMore = docs.length > limit;
    if (hasMore) docs.pop();

    // ── Map to ShopListItem ───────────────────────────────────────────────────
    const shops: ShopListItem[] = docs.map((d: FirebaseFirestoreTypes.QueryDocumentSnapshot) => {
      const data = d.data();
      return {
        shopId: d.id,
        shopName: data.shopName ?? "",
        category: data.category,
        subCategory: data.subCategory,
        logoUrl: data.logoUrl,
        city: data.city,
        isOpen: data.isOpen ?? false,
        ratingAverage: data.ratingAverage ?? 0,
        ratingCount: data.ratingCount ?? 0,
        deliveryAvailable: data.deliveryAvailable ?? false,
        homeServiceAvailable: data.homeServiceAvailable ?? false,
        pickupAvailable: data.pickupAvailable ?? false,
      };
    });

    return {
      shops,
      lastDocument: docs.length > 0 ? docs[docs.length - 1] : null,
      hasMore,
    };
  } catch (error: any) {
    console.error("❌ Error in fetchShops:", error.message);
    console.error("Full error object:", error);

    if (error.message?.includes("requires an index")) {
      console.warn(
        "🔥 Firestore Index Required! Click the link below to create it:\n",
        error.message.split("https://")[1]
      );
    }

    throw new Error(error?.message ?? "Failed to fetch shops");
  }
}

// ─── Fetch Single Shop (for detail screen) ────────────────────────────────────
export async function fetchShopById(shopId: string): Promise<Shop | null> {
  const snap = await getDoc(doc(db, "shops", shopId));
  if (!snap.exists()) return null;
  return { shopId: snap.id, ...(snap.data() as Omit<Shop, "shopId">) };
}