// store/shop/infoShopStore.ts
import { create } from "zustand";
import { fetchShopsById } from "../../firebase/shop/shopById";
import { Shop } from "../../types/shop/shop";

// ─── State shape ──────────────────────────────────────────────────────────────

interface ShopState {
  shops:       Record<string, Shop>;   // { [shopId]: Shop }
  loadingIds:  Record<string, boolean>; // { [shopId]: true } while fetching
  errors:      Record<string, string>;  // { [shopId]: errorMessage }

  // Actions
  fetchShop:  (id: string) => Promise<void>;
  clearShop:  (id: string) => void;
  clearAll:   () => void;
  getShop:    (id: string) => Shop | null;
}

// ─── Store ────────────────────────────────────────────────────────────────────

export const useInfoShopStore = create<ShopState>((set, get) => ({
  shops:      {},
  loadingIds: {},
  errors:     {},

  // ── Fetch — skips if already cached ────────────────────────────────────────
  fetchShop: async (id: string) => {
    // Already cached — no need to re-fetch
    if (get().shops[id]) return;

    set((state) => ({
      loadingIds: { ...state.loadingIds, [id]: true  },
      errors:     { ...state.errors,     [id]: "" },
    }));

    try {
      const shop = await fetchShopsById(id);
      set((state) => ({
        shops:      { ...state.shops,      [id]: shop  },
        loadingIds: { ...state.loadingIds, [id]: false },
      }));
    } catch (e: any) {
      set((state) => ({
        errors:     { ...state.errors,     [id]: e?.message ?? "Failed to load shop" },
        loadingIds: { ...state.loadingIds, [id]: false },
      }));
    }
  },

  // ── Remove one shop from cache ──────────────────────────────────────────────
  clearShop: (id: string) => {
    set((state) => {
      const shops      = { ...state.shops };
      const loadingIds = { ...state.loadingIds };
      const errors     = { ...state.errors };
      delete shops[id];
      delete loadingIds[id];
      delete errors[id];
      return { shops, loadingIds, errors };
    });
  },

  // ── Wipe entire cache ───────────────────────────────────────────────────────
  clearAll: () => set({ shops: {}, loadingIds: {}, errors: {} }),

  // ── Selector helper ─────────────────────────────────────────────────────────
  getShop: (id: string) => get().shops[id] ?? null,
}));