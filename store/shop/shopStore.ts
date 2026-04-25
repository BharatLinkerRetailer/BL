// ─── store/shopStore.ts ───────────────────────────────────────────────────────
// ─── store/shopStore.ts ───────────────────────────────────────────────────────
import { create } from "zustand";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { fetchShops} from "../../firebase/shop/shop";
import { ShopListItem, ShopCategory } from "../../types/shop/shop";


import {
  SortOption,
  SortDirection,
  ShopFilters,
  FetchShopsOptions,
} from "../../types/shop/shop";

const DEFAULT_FILTERS: ShopFilters = {
  categories: [],
  isOpen: false,
};

interface ShopState {
  shops: ShopListItem[];
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
  hasMore: boolean;

  searchQuery: string;
  activeCategory: string;
  sortBy: SortOption;
  sortDirection: SortDirection;
  filters: ShopFilters;

  lastDocument: FirebaseFirestoreTypes.DocumentSnapshot | null;
  debounceTimer: ReturnType<typeof setTimeout> | null;

  // Actions
  setSearchQuery: (q: string) => void;
  setCategory: (id: string) => void;
  setSort: (by: SortOption, dir?: SortDirection) => void;
  setFilters: (f: Partial<ShopFilters>) => void;
  refresh: () => void;
  loadMore: () => void;
  init: () => void;
}

export const useShopStore = create<ShopState>((set, get) => {
  // Private loader (no stale closure issues)
  const load = async (opts: FetchShopsOptions, append = false) => {
    set(append ? { loadingMore: true } : { loading: true });
    set({ error: null });

    try {
      const result = await fetchShops(opts);
      set((state) => ({
        shops: append ? [...state.shops, ...result.shops] : result.shops,
        hasMore: result.hasMore,
        lastDocument: result.lastDocument,
      }));
    } catch (e: any) {
      set({ error: e?.message ?? "Failed to load shops" });
    } finally {
      set({ loading: false, loadingMore: false });
    }
  };

  const resetPagination = () => set({ lastDocument: null });

  const buildOptions = (
    query: string,
    category: string,
    sortBy: SortOption,
    sortDirection: SortDirection,
    filters: ShopFilters
  ): FetchShopsOptions => {
    const finalFilters = {
      ...DEFAULT_FILTERS,
      ...filters,
      ...(category !== "all" && { category: category as ShopCategory }),
    };

    return {
      searchQuery: query,
      sortBy,
      sortDirection,
      filters: finalFilters,
    };
  };

  return {
    // ── Initial state ─────────────────────────────────────────────────────
    shops: [],
    loading: false,
    loadingMore: false,
    error: null,
    hasMore: false,

    searchQuery: "",
    activeCategory: "all",
    sortBy: "ratingAverage",
    sortDirection: "desc",
    filters: { ...DEFAULT_FILTERS },

    lastDocument: null,
    debounceTimer: null,

    // ── Actions ───────────────────────────────────────────────────────────
    init() {
      const s = get();
      load(buildOptions(s.searchQuery, s.activeCategory, s.sortBy, s.sortDirection, s.filters));
    },

    refresh() {
      resetPagination();
      const s = get();
      load(buildOptions(s.searchQuery, s.activeCategory, s.sortBy, s.sortDirection, s.filters));
    },

    loadMore() {
      const s = get();
      if (s.loadingMore || !s.hasMore || !s.lastDocument) return;

      load(
        {
          ...buildOptions(s.searchQuery, s.activeCategory, s.sortBy, s.sortDirection, s.filters),
          lastDocument: s.lastDocument,
        },
        true
      );
    },

    setSearchQuery(q: string) {
      const s = get();
      if (s.debounceTimer) clearTimeout(s.debounceTimer);

      const timer = setTimeout(() => {
        const fresh = get();
        resetPagination();
        load(buildOptions(q, fresh.activeCategory, fresh.sortBy, fresh.sortDirection, fresh.filters));
      }, 400);

      set({ searchQuery: q, debounceTimer: timer });
    },

    setCategory(id: string) {
      resetPagination();
      set({ activeCategory: id });
      const s = get();
      load(buildOptions(s.searchQuery, id, s.sortBy, s.sortDirection, s.filters));
    },

    setSort(by: SortOption, dir: SortDirection = "desc") {
      resetPagination();
      set({ sortBy: by, sortDirection: dir });
      const s = get();
      load(buildOptions(s.searchQuery, s.activeCategory, by, dir, s.filters));
    },

    setFilters(f: Partial<ShopFilters>) {
      const s = get();
      const newFilters = { ...s.filters, ...f };

      set({ filters: newFilters });
      resetPagination();

      load(buildOptions(s.searchQuery, s.activeCategory, s.sortBy, s.sortDirection, newFilters));
    },
  };
});