// stores/product/useProductStore.ts
import { create } from "zustand";
import { getProductsByShopId, type ProductEntry } from "../../firebase/shop/fetchShopProduct";

type ProductState = {
  products: Record<string, ProductEntry[]>;     // shopId → products
  loadingIds: Set<string>;                      // Better performance than array
  errors: Record<string, string>;
};

type ProductActions = {
  fetchProducts: (shopId: string) => Promise<void>;
  getProducts: (shopId: string) => ProductEntry[];
  isLoading: (shopId: string) => boolean;
  getError: (shopId: string) => string | null;
  clearProducts: (shopId: string) => void;
  clearAll: () => void;
};

type ProductStore = ProductState & ProductActions;

const INITIAL_STATE: ProductState = {
  products: {},
  loadingIds: new Set(),
  errors: {},
};

export const useProductStore = create<ProductStore>((set, get) => ({
  ...INITIAL_STATE,

  // ─── Getters ─────────────────────────────────────────────────────────────
  getProducts: (shopId: string) => get().products[shopId] ?? [],

  isLoading: (shopId: string) => get().loadingIds.has(shopId),

  getError: (shopId: string) => get().errors[shopId] || null,

  // ─── Actions ─────────────────────────────────────────────────────────────
  fetchProducts: async (shopId: string) => {
    const state = get();

    // Prevent duplicate fetch
    if (state.loadingIds.has(shopId)) return;

    // Set loading state
    set((s) => ({
      loadingIds: new Set(s.loadingIds).add(shopId),
      errors: { ...s.errors, [shopId]: "" },
    }));

    try {
      const products = await getProductsByShopId(shopId);

      set((s) => ({
        products: {
          ...s.products,
          [shopId]: products,
        },
        loadingIds: new Set(
          Array.from(s.loadingIds).filter((id) => id !== shopId)
        ),
      }));
    } catch (err: any) {
      console.error(`Failed to fetch products for shop ${shopId}:`, err);

      set((s) => ({
        loadingIds: new Set(
          Array.from(s.loadingIds).filter((id) => id !== shopId)
        ),
        errors: {
          ...s.errors,
          [shopId]: err?.message ?? "Failed to fetch products",
        },
      }));
    }
  },

  clearProducts: (shopId: string) =>
    set((s) => {
      const nextProducts = { ...s.products };
      delete nextProducts[shopId];

      const nextErrors = { ...s.errors };
      delete nextErrors[shopId];

      return {
        products: nextProducts,
        errors: nextErrors,
        // Note: We don't remove from loadingIds as it should already be cleared
      };
    }),

  clearAll: () => set(INITIAL_STATE),
}));