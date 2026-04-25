// stores/home/useHomeProductStore.ts
import { create } from "zustand";
import {
  getProducts,
  type ProductEntry,
} from "../../firebase/product/fetchProduct";

// ─── State Shape ────────────────────────────────────────────────────────────

type HomeProductState = {
  entries: ProductEntry[];

  // Pagination
  lastDoc: any | null;           // Firestore DocumentSnapshot or cursor
  hasMore: boolean;

  // UI Status
  status: "idle" | "loading" | "fetching-more" | "success" | "error";
  error: string | null;

  // Pull-to-refresh specific
  isRefreshing: boolean;
};

// ─── Actions ─────────────────────────────────────────────────────────────────

type HomeProductActions = {
  fetchInitial: () => Promise<void>;
  fetchMore: () => Promise<void>;
  refresh: () => Promise<void>;
  reset: () => void;
};

// ─── Combined Store Type ─────────────────────────────────────────────────────

type HomeProductStore = HomeProductState & HomeProductActions;

// ─── Initial State ───────────────────────────────────────────────────────────

const INITIAL_STATE: HomeProductState = {
  entries: [],
  lastDoc: null,
  hasMore: true,
  status: "idle",
  error: null,
  isRefreshing: false,
};

// ─── Store ───────────────────────────────────────────────────────────────────

export const useHomeProductStore = create<HomeProductStore>((set, get) => ({
  ...INITIAL_STATE,

  // ─── Fetch Initial Products ───────────────────────────────────────────────
  fetchInitial: async () => {
    const { status } = get();
    if (status === "loading") return;

    set({ status: "loading", error: null });

    try {
      const { entries, lastDoc, hasMore } = await getProducts({
        pageSize: 20,
      });

      set({
        entries,
        lastDoc,
        hasMore,
        status: "success",
      });
    } catch (err: any) {
      console.error("Failed to fetch initial products:", err);
      set({
        status: "error",
        error: err?.message ?? "Failed to load products",
      });
    }
  },

  // ─── Infinite Scroll: Fetch More ──────────────────────────────────────────
  fetchMore: async () => {
    const { status, hasMore, lastDoc } = get();

    // Prevent duplicate or unnecessary calls
    if (status === "fetching-more" || !hasMore || !lastDoc) return;

    set({ status: "fetching-more", error: null });

    try {
      const { entries, lastDoc: nextLastDoc, hasMore: nextHasMore } =
        await getProducts({
          pageSize: 20,
          lastDoc,
        });

      set((state) => ({
        entries: [...state.entries, ...entries],
        lastDoc: nextLastDoc,
        hasMore: nextHasMore,
        status: "success",
      }));
    } catch (err: any) {
      console.error("Failed to fetch more products:", err);
      set({
        status: "error",
        error: err?.message ?? "Failed to load more products",
      });
    }
  },

  // ─── Pull-to-Refresh ──────────────────────────────────────────────────────
  refresh: async () => {
    const { status } = get();
    if (status === "loading") return;

    set({ isRefreshing: true, error: null });

    try {
      const { entries, lastDoc, hasMore } = await getProducts({
        pageSize: 20,
      });

      set({
        entries,
        lastDoc,
        hasMore,
        status: "success",
        isRefreshing: false,
      });
    } catch (err: any) {
      console.error("Refresh failed:", err);
      set({
        status: "error",
        error: err?.message ?? "Failed to refresh products",
        isRefreshing: false,
      });
    }
  },

  // ─── Reset Store ──────────────────────────────────────────────────────────
  reset: () => set(INITIAL_STATE),
}));