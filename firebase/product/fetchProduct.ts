// firebase/product/getProducts.ts
import firestore, {
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  getDocs,
  type FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";

import type { Product } from "../../types/product/product";

export type ProductEntry = {
  product: Product;
  /** Banner image URL for home grid / ProductCard (string | null) */
  image: string | null;
};

type GetProductsParams = {
  pageSize?: number;
  lastDoc?: FirebaseFirestoreTypes.QueryDocumentSnapshot | null;
};

type GetProductsResult = {
  entries: ProductEntry[];
  lastDoc: FirebaseFirestoreTypes.QueryDocumentSnapshot | null;
  hasMore: boolean;
};

/**
 * Fetches paginated products for home feed.
 * Uses product's `banner` field as the main image for the card.
 */
export const getProducts = async ({
  pageSize = 20,
  lastDoc = null,
}: GetProductsParams = {}): Promise<GetProductsResult> => {
  try {
    const db = firestore();
    const productsRef = collection(db, "products");

    let q = query(
      productsRef,
      orderBy("createdAt", "desc"),
      limit(pageSize)
    );

    if (lastDoc) {
      q = query(q, startAfter(lastDoc));
    }

    const snap = await getDocs(q);
    const entries: ProductEntry[] = [];

    for (const doc of snap.docs) {
      const data = doc.data();

      const product: Product = {
        id: doc.id,
        ...data,
      } as Product;

      // Use banner as image URL (as per your current data structure)
      const imageUrl: string | null = product.banner ?? null;

      entries.push({
        product,
        image: imageUrl,
      });
    }

    const newLastDoc = snap.docs.length > 0 ? snap.docs[snap.docs.length - 1] : null;

    return {
      entries,
      lastDoc: newLastDoc,
      hasMore: snap.docs.length === pageSize,
    };
  } catch (error: any) {
    console.error("Error fetching products for home:", error);
    throw new Error(error?.message ?? "Failed to fetch products");
  }
};