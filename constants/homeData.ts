// ─── constants/homeData.ts ──────────────────────────────────────────────────
import {Banner,PlatformBenefit,HomeCategory} from '../types/home/index'
// constants/homeData.ts
export const BANNERS: Banner[] = [
  {
    id: "empower",
    tag: "WELCOME TO THE FUTURE",
    title: "Empowering Local Retailers",
    subtitle: "Turn your shop into a digital powerhouse and compete with big e-commerce",
    accent: "#0C831F",        // Your signature green
    bgDark: "#F8F9FA",        // Light elegant background
    bgAccent: "#E8F5E9",      // Very soft green
  },
  {
    id: "grow",
    tag: "GROW FASTER",
    title: "More Customers, More Sales",
    subtitle: "Reach thousands of buyers in your city with just one tap",
    accent: "#0C831F",
    bgDark: "#F8F9FA",
    bgAccent: "#E8F5E9",
  },
  {
    id: "fight",
    tag: "LOCAL HEROES",
    title: "Fight Big E-commerce",
    subtitle: "Digital tools & smart technology made for small businesses like yours",
    accent: "#0C831F",
    bgDark: "#F8F9FA",
    bgAccent: "#E8F5E9",
  },
  {
    id: "trust",
    tag: "WHY CHOOSE US",
    title: "Built for Indian Retailers",
    subtitle: "Fast delivery • Zero commission • Full control of your business",
    accent: "#0C831F",
    bgDark: "#F8F9FA",
    bgAccent: "#E8F5E9",
  },
];


export const PLATFORM_BENEFITS: PlatformBenefit[] = [
  {
    id: "digital-store",
    icon: "📱",
    label: "Your Own Digital Store",
    desc: "Get a beautiful online shop in minutes",
    color: "#00C853", // electric green — fresh, growth, go!
  },
  {
    id: "zero-commission",
    icon: "💸",
    label: "Zero Commission",
    desc: "Keep 100% of your earnings",
    color: "#FF6D00", // vivid amber-orange — energy, wealth, warmth
  },
  {
    id: "reach-customers",
    icon: "🌍",
    label: "Reach More Customers",
    desc: "Connect with buyers in your city instantly",
    color: "#2979FF", // electric blue — trust, reach, sky
  },
  {
    id: "full-control",
    icon: "🔧",
    label: "Full Control",
    desc: "Manage products, orders & pricing yourself",
    color: "#D500F9", // vivid magenta-purple — power, bold, premium
  },
  {
    id: "easy-to-use",
    icon: "⚡",
    label: "Super Easy to Use",
    desc: "No technical skills needed",
    color: "#FF1744", // vivid red — excitement, speed, urgency
  },
];
// ── Home categories ───────────────────────────────────────────────────────────
export const HOME_CATEGORIES: HomeCategory[] = [
  { id: "dairy",        icon: "🥛", label: "Dairy",         color: "#e8f4f8" },
  { id: "meat",         icon: "🥩", label: "Meat",          color: "#fde8e8" },
  { id: "veggies",      icon: "🥦", label: "Veggies",       color: "#e8f8ec" },
  { id: "bakery",       icon: "🍰", label: "Bakery",        color: "#fdf3e8" },
  { id: "beauty",       icon: "🧴", label: "Beauty",        color: "#f3e8fd" },
  { id: "electronics",  icon: "📱", label: "Electronics",   color: "#e8ecfd" },
  { id: "cleaning",     icon: "🧹", label: "Cleaning",      color: "#e8fdf8" },
  { id: "snacks",       icon: "🍫", label: "Snacks",        color: "#fde8f3" },
  { id: "fruits",       icon: "🍎", label: "Fruits",        color: "#fff0e8" },
  { id: "beverages",    icon: "🧃", label: "Beverages",     color: "#e8f8ff" },
  { id: "frozen",       icon: "🧊", label: "Frozen",        color: "#eaf6ff" },
  { id: "grains",       icon: "🌾", label: "Grains & Rice", color: "#fdf9e8" },
  { id: "spices",       icon: "🌶️", label: "Spices",        color: "#fdeee8" },
  { id: "oils",         icon: "🫙", label: "Oils & Ghee",   color: "#fdf6e8" },
  { id: "eggs",         icon: "🥚", label: "Eggs",          color: "#fffbe8" },
  { id: "seafood",      icon: "🐟", label: "Seafood",       color: "#e8f4fd" },
  { id: "baby",         icon: "🍼", label: "Baby Care",     color: "#fde8f9" },
  { id: "petcare",      icon: "🐾", label: "Pet Care",      color: "#f0fde8" },
  { id: "stationery",   icon: "✏️", label: "Stationery",    color: "#ece8fd" },
  { id: "toys",         icon: "🧸", label: "Toys",          color: "#fff3e8" },
  { id: "medicines",    icon: "💊", label: "Medicines",     color: "#e8fdec" },
  { id: "fitness",      icon: "🏋️", label: "Fitness",       color: "#fde8ea" },
  { id: "kitchen",      icon: "🍳", label: "Kitchenware",   color: "#e8eafd" },
  { id: "flowers",      icon: "💐", label: "Flowers",       color: "#fde8f5" },
];

export const HOME_CATEGORIES_CARD_GRADIENTS: ReadonlyArray<readonly [string, string, string]> = [
  ["#00558C", "#0077BE", "#29A8E0"] as const,  // dairy    — steel blue
  ["#8C1C1C", "#C22B2B", "#E85555"] as const,  // meat     — deep red
  ["#005C14", "#0C831F", "#34C754"] as const,  // veggies  — fresh green
  ["#8C5000", "#C27200", "#E8A020"] as const,  // bakery   — warm amber
  ["#6200B3", "#8B00D9", "#BB5EFF"] as const,  // beauty   — vivid purple
  ["#1040A0", "#1857CC", "#4285F4"] as const,  // electronics — electric blue
  ["#007A6E", "#00A898", "#2ECEC0"] as const,  // cleaning — teal
  ["#B00060", "#D9006B", "#FF4FA0"] as const,  // snacks   — hot pink
  ["#B84500", "#E05800", "#FF7A1A"] as const,  // fruits   — vivid orange
  ["#005780", "#007BB5", "#00AAEE"] as const,  // beverages — sky blue
  ["#005090", "#006DC2", "#3399E8"] as const,  // frozen   — icy blue
  ["#7A6000", "#A88200", "#D4AA00"] as const,  // grains   — golden yellow
  ["#8C2000", "#C23000", "#E85010"] as const,  // spices   — chili red
  ["#7A5500", "#A87800", "#D4A020"] as const,  // oils     — deep gold
  ["#7A7000", "#A89C00", "#D4C800"] as const,  // eggs     — yolk yellow
  ["#004A80", "#0066B2", "#1A99EE"] as const,  // seafood  — ocean blue
  ["#B0006B", "#D9008A", "#FF40B8"] as const,  // baby     — soft magenta
  ["#3A7A00", "#50AA00", "#78D830"] as const,  // petcare  — leaf green
  ["#3A00B3", "#5500D9", "#8040FF"] as const,  // stationery — indigo
  ["#B06000", "#D98000", "#FFA820"] as const,  // toys     — sunny orange
  ["#006040", "#008A5C", "#20B87A"] as const,  // medicines — emerald
  ["#8C0020", "#C2002A", "#E82050"] as const,  // fitness  — energetic red
  ["#1A3A9C", "#2A55CC", "#5580F0"] as const,  // kitchen  — cobalt
  ["#8C0066", "#BB008A", "#EE30BB"] as const,  // flowers  — fuchsia
];