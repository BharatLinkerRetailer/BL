import { CategoryTab } from "../types/category/category";

export const CATEGORY_TABS: CategoryTab[] = [
  {
    id:    "all",
    label: "All",
    subCategories: [], // populated at runtime by flattening all tabs below
  },
  {
    id:    "electronics",
    label: "Electronics",
    subCategories: [
      { id: "e1", name: "Mobile",    subtitle: "Smartphones",    icon: "📱", bgColor: "#E3F2FD" },
      { id: "e2", name: "Laptops",   subtitle: "Work & Gaming",  icon: "💻", bgColor: "#EDE7F6" },
      { id: "e3", name: "Cameras",   subtitle: "DSLR & More",    icon: "📷", bgColor: "#FFF3E0" },
      { id: "e4", name: "Audio",     subtitle: "Headphones",     icon: "🎧", bgColor: "#FCE4EC" },
      { id: "e5", name: "TV",        subtitle: "Smart displays", icon: "📺", bgColor: "#E8F5E9" },
      { id: "e6", name: "Wearables", subtitle: "Watches & Fit",  icon: "⌚", bgColor: "#F3E5F5" },
      { id: "e7", name: "Mobile",    subtitle: "Smartphones",    icon: "📱", bgColor: "#E3F2FD" },
      { id: "e8", name: "Laptops",   subtitle: "Work & Gaming",  icon: "💻", bgColor: "#EDE7F6" },
      { id: "e9", name: "Cameras",   subtitle: "DSLR & More",    icon: "📷", bgColor: "#FFF3E0" },
      { id: "e10", name: "Audio",     subtitle: "Headphones",     icon: "🎧", bgColor: "#FCE4EC" },
      { id: "e11", name: "TV",        subtitle: "Smart displays", icon: "📺", bgColor: "#E8F5E9" },
      { id: "e12", name: "Wearables", subtitle: "Watches & Fit",  icon: "⌚", bgColor: "#F3E5F5" },
    ],
  },
  {
    id:    "garments",
    label: "Garments",
    subCategories: [
      { id: "g1", name: "Men",       subtitle: "Casual & Formal", icon: "👔", bgColor: "#E3F2FD" },
      { id: "g2", name: "Women",     subtitle: "Ethnic & Western",icon: "👗", bgColor: "#FCE4EC" },
      { id: "g3", name: "Kids",      subtitle: "Fun & Comfy",     icon: "🧒", bgColor: "#FFF9C4" },
      { id: "g4", name: "Footwear",  subtitle: "Shoes & Sandals", icon: "👟", bgColor: "#F0F4C3" },
      { id: "g5", name: "Winterwear",subtitle: "Jackets & More",  icon: "🧥", bgColor: "#FFCCBC" },
    ],
  },
  {
    id:    "sports",
    label: "Sports",
    subCategories: [
      { id: "s1", name: "Cricket",   subtitle: "Bats & Gear",    icon: "🏏", bgColor: "#E8F5E9" },
      { id: "s2", name: "Football",  subtitle: "Balls & Kits",   icon: "⚽", bgColor: "#FFF3E0" },
      { id: "s3", name: "Fitness",   subtitle: "Gym Equipment",  icon: "🏋️", bgColor: "#E3F2FD" },
      { id: "s4", name: "Cycling",   subtitle: "Bikes & Parts",  icon: "🚴", bgColor: "#F3E5F5" },
      { id: "s5", name: "Yoga",      subtitle: "Mats & Blocks",  icon: "🧘", bgColor: "#FFF8E1" },
    ],
  },
  {
    id:    "grocery",
    label: "Grocery",
    subCategories: [
      { id: "gr1", name: "Vegetables",  subtitle: "Fresh daily",     icon: "🥬", bgColor: "#E8F5E9" },
      { id: "gr2", name: "Fruits",      subtitle: "Organic pick",    icon: "🍎", bgColor: "#FFF3E0" },
      { id: "gr3", name: "Dairy",       subtitle: "Pure & fresh",    icon: "🥛", bgColor: "#E3F2FD", badgeText: "NEW" },
      { id: "gr4", name: "Bakery",      subtitle: "Freshly baked",   icon: "🍞", bgColor: "#FFF8E1" },
      { id: "gr5", name: "Snacks",      subtitle: "Tasty treats",    icon: "🍿", bgColor: "#FCE4EC" },
      { id: "gr6", name: "Beverages",   subtitle: "Coffee & Tea",    icon: "☕", bgColor: "#F3E5F5" },
      { id: "gr7", name: "Eggs",        subtitle: "Farm fresh",      icon: "🥚", bgColor: "#FFF9C4" },
      { id: "gr8", name: "Meat & Fish", subtitle: "Premium cuts",    icon: "🍗", bgColor: "#FFEBEE" },
      { id: "gr9", name: "Frozen",      subtitle: "Quick meals",     icon: "🧊", bgColor: "#B2EBF2" },
      { id: "gr10",name: "Spices",      subtitle: "Authentic flavors",icon: "🌶️",bgColor: "#EFE5B8" },
    ],
  },
  {
    id:    "beauty",
    label: "Beauty",
    subCategories: [
      { id: "b1", name: "Skincare",   subtitle: "Glow up",         icon: "🧴", bgColor: "#FCE4EC" },
      { id: "b2", name: "Haircare",   subtitle: "Shampoo & Oils",  icon: "💆", bgColor: "#F0F4C3" },
      { id: "b3", name: "Makeup",     subtitle: "Lips & Eyes",     icon: "💄", bgColor: "#F3E5F5" },
      { id: "b4", name: "Fragrances", subtitle: "Perfumes & Deos", icon: "🌸", bgColor: "#FFF9C4" },
    ],
  },
];

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Returns subCategories for a given tab id.
 *  "all" flattens everything across all tabs. */
export function getSubCategories(tabId: string) {
  if (tabId === "all") {
    return CATEGORY_TABS.flatMap((t) => (t.id !== "all" ? t.subCategories : []));
  }
  return CATEGORY_TABS.find((t) => t.id === tabId)?.subCategories ?? [];
}