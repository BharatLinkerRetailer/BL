// firebase/product/getProductDetail.ts
import firestore from "@react-native-firebase/firestore";
import type { Product, Variant, ProductImage, Inventory, ProductDetail } from "../../types/product/product";

export const getProductDetail = async (productId: string): Promise<ProductDetail> => {
  try {
    // 1. Fetch main Product document
    const productDoc = await firestore().collection("products").doc(productId).get();

    if (!productDoc.exists) {
      throw new Error("Product not found");
    }

    const product: Product = {
      id: productDoc.id,
      ...productDoc.data(),
    } as Product;

    // 2. Fetch all Variants (subcollection)
    const variantsSnap = await firestore()
      .collection("products")
      .doc(productId)
      .collection("variants")
      .get();

    const variants: Variant[] = variantsSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Variant[];

    // 3. Fetch all Images (subcollection)
    const imagesSnap = await firestore()
      .collection("products")
      .doc(productId)
      .collection("images")
      .orderBy("order", "asc")           // Sort by display order
      .get();

    const images: ProductImage[] = imagesSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as ProductImage[];

    // 4. Fetch Inventory (keyed by variantId)
    const inventorySnap = await firestore()
      .collection("products")
      .doc(productId)
      .collection("inventory")
      .get();

    const inventory: Record<string, Inventory> = {};

    inventorySnap.docs.forEach((doc) => {
      inventory[doc.id] = {
        variantId: doc.id,
        ...doc.data(),
      } as Inventory;
    });

    return {
      product,
      variants,
      images,
      inventory,
    };
  } catch (error: any) {
    console.error(`Error fetching product detail ${productId}:`, error);
    throw new Error(error?.message ?? "Failed to fetch product details");
  }
};