// firebase/shop/fetchShopProduct.ts
import firestore from "@react-native-firebase/firestore";

import type { Product, Variant, ProductImage } from "../../types/product/product";

export type ProductEntry = {
  product: Product;
  variant: Variant;           // Default variant (required)
  image: ProductImage | null; // Primary image (optional)
};

/**
 * Fetches all active products for a specific shop along with their default variant and primary image.
 */
export const getProductsByShopId = async (
  shopId: string
): Promise<ProductEntry[]> => {
  try {
    // Fetch active products for the shop
    const productsSnap = await firestore()
      .collection("products")
      .where("shopId", "==", shopId)
      .where("status", "==", "active")
      .orderBy("createdAt", "desc")        // Consistent ordering
      .get();

    const entries: ProductEntry[] = [];

    for (const productDoc of productsSnap.docs) {
      const productData = productDoc.data();
      console.log(productData)
      const product: Product = {
        id: productDoc.id,
        ...productData,
      } as Product;

      // ── Fetch Default Variant ─────────────────────────────────────
      const variantsSnap = await firestore()
        .collection("products")
        .doc(product.id)
        .collection("variants")
        .where("isDefault", "==", true)
        .limit(1)
        .get();

      if (variantsSnap.empty) {
        continue; // Skip this product if no default variant exists
      }

      const variantDoc = variantsSnap.docs[0];
      const variant: Variant = {
        id: variantDoc.id,
        ...variantDoc.data(),
      } as Variant;

      // ── Fetch Primary Image ───────────────────────────────────────
      const imagesSnap = await firestore()
        .collection("products")
        .doc(product.id)
        .collection("images")
        .where("isPrimary", "==", true)
        .limit(1)
        .get();

      const image: ProductImage | null = imagesSnap.empty
        ? null
        : ({
            id: imagesSnap.docs[0].id,
            ...imagesSnap.docs[0].data(),
          } as ProductImage);

      entries.push({
        product,
        variant,
        image,
      });
    }

    return entries;
  } catch (error: any) {
    console.error(`Error fetching products for shop ${shopId}:`, error);
    throw new Error(error?.message ?? "Failed to fetch shop products");
  }
};