// firebase/shop/shop.ts
import firestore from "@react-native-firebase/firestore";
import { Shop } from "../../types/shop/shop";

const SHOP_COLLECTION = "shops";

// ─── Fetch single shop by ID ──────────────────────────────────────────────────

export async function fetchShopsById(shopId: string): Promise<Shop> {
  const doc = await firestore()
    .collection(SHOP_COLLECTION)
    .doc(shopId)
    .get();

  if (!doc.exists) {
    throw new Error(`Shop not found: ${shopId}`);
  }

  return { shopId: doc.id, ...doc.data() } as Shop;
}