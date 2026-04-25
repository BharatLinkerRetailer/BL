// ─── hooks/useShops.ts ────────────────────────────────────────────────────────

import { useState, useCallback, useRef, useEffect } from "react";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import {
  fetchShops,
  FetchShopsOptions,
  ShopFilters,
  SortOption,
  SortDirection,
} from "../firebase/shop/shop";
import { ShopListItem, ShopCategory } from "../types/shop/shop";

export interface UseShopsReturn {
  shops:          ShopListItem[];
  loading:        boolean;
  loadingMore:    boolean;
  error:          string | null;
  hasMore:        boolean;
  searchQuery:    string;
  activeCategory: string;
  sortBy:         SortOption;
  sortDirection:  SortDirection;
  filters:        ShopFilters;
  setSearchQuery: (q: string) => void;
  setCategory:    (id: string) => void;
  setSort:        (by: SortOption, dir?: SortDirection) => void;
  setFilters:     (f: ShopFilters) => void;
  refresh:        () => void;
  loadMore:       () => void;
}

export function useShops(): UseShopsReturn {
  const [shops,          setShops]          = useState<ShopListItem[]>([]);
  const [loading,        setLoading]        = useState(false);
  const [loadingMore,    setLoadingMore]    = useState(false);
  const [error,          setError]          = useState<string | null>(null);
  const [hasMore,        setHasMore]        = useState(false);
  const [searchQuery,    setSearchQueryRaw] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy,         setSortBy]         = useState<SortOption>("ratingAverage");
  const [sortDirection,  setSortDirection]  = useState<SortDirection>("desc");
  const [filters,        setFiltersState]   = useState<ShopFilters>({});

  const lastDocRef  = useRef<FirebaseFirestoreTypes.DocumentSnapshot | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Core loader ───────────────────────────────────────────────────────────
  const load = useCallback(async (opts: FetchShopsOptions, append = false) => {
    try {
      append ? setLoadingMore(true) : setLoading(true);
      setError(null);

      const result = await fetchShops(opts);

      setShops((prev) => append ? [...prev, ...result.shops] : result.shops);
      setHasMore(result.hasMore);
      lastDocRef.current = result.lastDocument;
    } catch (e: any) {
      setError(e?.message ?? "Failed to load shops");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  // ── Build options helper ──────────────────────────────────────────────────
  const buildOptions = useCallback((
    query:    string,
    category: string,
    sort:     SortOption,
    dir:      SortDirection,
    f:        ShopFilters,
  ): FetchShopsOptions => ({
    searchQuery:   query,
    sortBy:        sort,
    sortDirection: dir,
    filters: {
      ...f,
      ...(category !== "all" && { category: category as ShopCategory }),
    },
  }), []);

  // ── Initial load on mount ─────────────────────────────────────────────────
  useEffect(() => {
    load(buildOptions(searchQuery, activeCategory, sortBy, sortDirection, filters));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Refresh (reset cursor) ────────────────────────────────────────────────
  const refresh = useCallback(() => {
    lastDocRef.current = null;
    load(buildOptions(searchQuery, activeCategory, sortBy, sortDirection, filters));
  }, [searchQuery, activeCategory, sortBy, sortDirection, filters, load, buildOptions]);

  // ── Load next page ────────────────────────────────────────────────────────
  const loadMore = useCallback(() => {
    if (loadingMore || !hasMore) return;
    load(
      {
        ...buildOptions(searchQuery, activeCategory, sortBy, sortDirection, filters),
        lastDocument: lastDocRef.current ?? undefined,
      },
      true,
    );
  }, [loadingMore, hasMore, searchQuery, activeCategory, sortBy, sortDirection, filters, load, buildOptions]);

  // ── Search — debounced 400 ms ─────────────────────────────────────────────
  const setSearchQuery = useCallback((q: string) => {
    setSearchQueryRaw(q);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      lastDocRef.current = null;
      load(buildOptions(q, activeCategory, sortBy, sortDirection, filters));
    }, 400);
  }, [activeCategory, sortBy, sortDirection, filters, load, buildOptions]);

  // ── Category pill ─────────────────────────────────────────────────────────
  const setCategory = useCallback((id: string) => {
    setActiveCategory(id);
    lastDocRef.current = null;
    load(buildOptions(searchQuery, id, sortBy, sortDirection, filters));
  }, [searchQuery, sortBy, sortDirection, filters, load, buildOptions]);

  // ── Sort ──────────────────────────────────────────────────────────────────
  const setSort = useCallback((by: SortOption, dir: SortDirection = "desc") => {
    setSortBy(by);
    setSortDirection(dir);
    lastDocRef.current = null;
    load(buildOptions(searchQuery, activeCategory, by, dir, filters));
  }, [searchQuery, activeCategory, filters, load, buildOptions]);

  // ── Filters ───────────────────────────────────────────────────────────────
  const setFilters = useCallback((f: ShopFilters) => {
    setFiltersState(f);
    lastDocRef.current = null;
    load(buildOptions(searchQuery, activeCategory, sortBy, sortDirection, f));
  }, [searchQuery, activeCategory, sortBy, sortDirection, load, buildOptions]);

  return {
    shops, loading, loadingMore, error, hasMore,
    searchQuery, activeCategory, sortBy, sortDirection, filters,
    setSearchQuery, setCategory, setSort, setFilters,
    refresh, loadMore,
  };
}