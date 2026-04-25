// ─── components/shop/shopData.ts ─────────────────────────────────────────────

import { ShopCategory } from "../../../types/shop/shop";

export interface Category {
  id:    ShopCategory | "all";
  label: string;
  icon:  string;
}

export const CATEGORIES: Category[] = [
  { id: "all",         label: "All",         icon: "apps-outline"          },
  { id: "Grocery",     label: "Grocery",     icon: "cart-outline"          },
  { id: "Pharmacy",    label: "Pharmacy",    icon: "medkit-outline"        },
  { id: "Bakery",      label: "Bakery",      icon: "cafe-outline"          },
  { id: "Electronics", label: "Electronics", icon: "hardware-chip-outline" },
  { id: "Fashion",     label: "Fashion",     icon: "shirt-outline"         },
  { id: "Flowers",     label: "Flowers",     icon: "flower-outline"        },
  { id: "Restaurant",  label: "Restaurant",  icon: "restaurant-outline"    },
  { id: "Service",     label: "Service",     icon: "construct-outline"     },
];

// ─── Banner ───────────────────────────────────────────────────────────────────

export interface Banner {
  id:       string;
  title:    string;
  subtitle: string;
  emoji:    string;
  bg:       string;   // card background color
  accent:   string;   // title + button color
}

export const BANNERS: Banner[] = [
  {
    id:       "1",
    title:    "Bakery Near By",
    subtitle: "Fresh baked every morning",
    emoji:    "🥐",
    bg:       "#FFF3E0",
    accent:   "#E65100",
  },
  {
    id:       "2",
    title:    "Restaurants Near By",
    subtitle: "Best food near you",
    emoji:    "🍕",
    bg:       "#FCE4EC",
    accent:   "#AD1457",
  },
  {
    id:       "3",
    title:    "Groceries Store",
    subtitle: "Delivered in 30 mins",
    emoji:    "🛒",
    bg:       "#E8F5E9",
    accent:   "#2E7D32",
  },
  {
    id:       "4",
    title:    "Medicine Store",
    subtitle: "From nearby pharmacies",
    emoji:    "💊",
    bg:       "#E3F2FD",
    accent:   "#1565C0",
  },
  {
    id:       "5",
    title:    "Flowers Shop",
    subtitle: "For every occasion",
    emoji:    "💐",
    bg:       "#F3E5F5",
    accent:   "#6A1B9A",
  },
];