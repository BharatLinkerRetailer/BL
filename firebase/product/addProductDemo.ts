// utils/seedProducts.ts

import { getApp } from "@react-native-firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  updateDoc,
  serverTimestamp,
} from "@react-native-firebase/firestore";

const db = getFirestore(getApp());

const SHOP_IDS = [
  "8S2lWFYcqCwIWV3IMWKw",
  "FjlslfASucEIWVbwTpjH",
  "H0HBzShCZCFbWZmLG9vP",
  "LEbS3nps0y1MByCqyYIB",
];

const DEMO_PRODUCTS = [
  {
    title: "Classic Cotton T-Shirt",                                   // ✓ was `name`
    slug: "classic-cotton-t-shirt",
    description: "100% organic cotton, pre-shrunk, available in multiple sizes.",
    banner: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800",
    type: "physical",
    category: "apparel",
    tags: ["t-shirt", "cotton", "unisex"],
    status: "active",
    price: 79900,                                                      // ✓ display-level default
    compareAtPrice: 99900,                                             // ✓ display-level default
    variant: {
      sku: "TSH-WHT-M",
      attributes: { color: "White", size: "M" },
      price: 79900,
      compareAtPrice: 99900,
      costPrice: 30000,
      isDefault: true,
      status: "active",
    },
    image: {
      url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
      storageRef: "demo/tshirt.jpg",
      altText: "Classic Cotton T-Shirt",
      isPrimary: true,
      order: 1,
    },
  },
  {
    title: "Running Sneakers",                                         // ✓ was `name`
    slug: "running-sneakers",
    description: "Lightweight mesh upper with cushioned sole for all-day comfort.",
    banner: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
    type: "physical",
    category: "footwear",
    tags: ["shoes", "running", "sports"],
    status: "active",
    price: 299900,
    compareAtPrice: 399900,
    variant: {
      sku: "SNK-BLK-42",
      attributes: { color: "Black", size: "42" },
      price: 299900,
      compareAtPrice: 399900,
      costPrice: 120000,
      isDefault: true,
      status: "active",
    },
    image: {
      url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
      storageRef: "demo/sneakers.jpg",
      altText: "Running Sneakers",
      isPrimary: true,
      order: 1,
    },
  },
  {
    title: "Leather Wallet",                                           // ✓ was `name`
    slug: "leather-wallet",
    description: "Slim genuine leather bifold wallet with 6 card slots.",
    banner: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800",
    type: "physical",
    category: "accessories",
    tags: ["wallet", "leather", "men"],
    status: "active",
    price: 149900,
    // compareAtPrice omitted — optional field, no null needed  ✓
    variant: {
      sku: "WLT-BRN-ONE",
      attributes: { color: "Brown" },
      price: 149900,
      // compareAtPrice omitted ✓
      costPrice: 50000,
      isDefault: true,
      status: "active",
    },
    image: {
      url: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400",
      storageRef: "demo/wallet.jpg",
      altText: "Leather Wallet",
      isPrimary: true,
      order: 1,
    },
  },
  {
    title: "UI Kit – Dashboard Pro",                                   // ✓ was `name`
    slug: "ui-kit-dashboard-pro",
    description: "50+ Figma components, dark/light mode, fully responsive.",
    banner: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800",
    type: "digital",
    category: "design-assets",
    tags: ["figma", "ui-kit", "dashboard"],
    status: "active",
    price: 199900,
    compareAtPrice: 299900,
    variant: {
      sku: "UIKIT-PRO-LTD",
      attributes: { license: "Lifetime" },
      price: 199900,
      compareAtPrice: 299900,
      costPrice: 0,
      isDefault: true,
      status: "active",
    },
    image: {
      url: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400",
      storageRef: "demo/uikit.jpg",
      altText: "UI Kit Dashboard Pro",
      isPrimary: true,
      order: 1,
    },
  },
  {
    title: "Wireless Earbuds",                                         // ✓ was `name`
    slug: "wireless-earbuds",
    description: "Active noise cancellation, 24hr battery, IPX5 water resistant.",
    banner: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800",
    type: "physical",
    category: "electronics",
    tags: ["earbuds", "wireless", "audio"],
    status: "active",
    price: 499900,
    compareAtPrice: 699900,
    variant: {
      sku: "EAR-WHT-ONE",
      attributes: { color: "White" },
      price: 499900,
      compareAtPrice: 699900,
      costPrice: 200000,
      isDefault: true,
      status: "active",
    },
    image: {
      url: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400",
      storageRef: "demo/earbuds.jpg",
      altText: "Wireless Earbuds",
      isPrimary: true,
      order: 1,
    },
  },
  {
    title: "Yoga Mat",                                                 // ✓ was `name`
    slug: "yoga-mat",
    description: "6mm non-slip TPE mat with alignment lines and carry strap.",
    banner: "https://images.unsplash.com/photo-1601925228008-28c52b63a7e1?w=800",
    type: "physical",
    category: "fitness",
    tags: ["yoga", "mat", "fitness"],
    status: "active",
    price: 129900,
    // compareAtPrice omitted ✓
    variant: {
      sku: "YGA-PRP-ONE",
      attributes: { color: "Purple" },
      price: 129900,
      // compareAtPrice omitted ✓
      costPrice: 45000,
      isDefault: true,
      status: "out_of_stock",
    },
    image: {
      url: "https://images.unsplash.com/photo-1601925228008-28c52b63a7e1?w=400",
      storageRef: "demo/yogamat.jpg",
      altText: "Yoga Mat",
      isPrimary: true,
      order: 1,
    },
  },
];

export async function seedProducts(): Promise<void> {
  for (const shopId of SHOP_IDS) {
    console.log(`Seeding shop: ${shopId}`);

    for (const demo of DEMO_PRODUCTS) {
      const { variant, image, ...productData } = demo;

      // 1. Create product (without defaultVariantId — not known yet)
      const productRef = await addDoc(collection(db, "products"), {
        ...productData,
        shopId,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      // 2. Create variant with timestamps                             // ✓ added createdAt/updatedAt
      const variantRef = await addDoc(
        collection(db, "products", productRef.id, "variants"),
        {
          ...variant,
          productId: productRef.id,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        }
      );

      // 3. Patch product with defaultVariantId now that variant exists // ✓ was never set before
      await updateDoc(productRef, {
        defaultVariantId: variantRef.id,
      });

      // 4. Create image — variantId: null (primary image applies to all variants) // ✓ was variantRef.id
      await addDoc(
        collection(db, "products", productRef.id, "images"),
        {
          ...image,
          productId: productRef.id,
          variantId: null,
        }
      );

      console.log(`  ✓ ${demo.title} → ${productRef.id}`);
    }
  }

  console.log("Done.");
}