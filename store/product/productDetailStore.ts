// stores/product/useProductDetailStore.ts
import { create } from "zustand";
import { getProductDetail } from "../../firebase/product/getProductDetail";
import type { ProductDetail } from "../../types/product/product";

type ProductDetailState = {
  currentProduct: ProductDetail | null;
  loading: boolean;
  error: string | null;
  productId: string | null;
};

type ProductDetailActions = {
  fetchProductDetail: (productId: string) => Promise<void>;
  clearProductDetail: () => void;
};

type ProductDetailStore = ProductDetailState & ProductDetailActions;

const INITIAL_STATE: ProductDetailState = {
  currentProduct: null,
  loading: false,
  error: null,
  productId: null,
};

export const useProductDetailStore = create<ProductDetailStore>((set, get) => ({
  ...INITIAL_STATE,

  fetchProductDetail: async (productId: string) => {
    const { productId: currentId, loading } = get();

    // Prevent duplicate fetch for same product
    if (currentId === productId && !loading) return;

    set({ loading: true, error: null, productId });

    try {
      const productDetail = await getProductDetail(productId);

      set({
        currentProduct: productDetail,
        loading: false,
      });
    } catch (err: any) {
      console.error(err);
      set({
        error: err?.message ?? "Failed to load product",
        loading: false,
      });
    }
  },

  clearProductDetail: () => set(INITIAL_STATE),
}));