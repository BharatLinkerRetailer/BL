export const C = {
  navy: "#121314",
  navyLight: "#0a2d6e",
  green: "#1e7c3e",
  greenLight: "#d4fee8",
  gold: "#F5C518",
  ivory: "#f0f9ff80",
  ink: "#111827",
  muted: "#6B7280",
  border: "#000000ef",
  white: "#FFFFFF",
  red: "#EF4444",
  overlay: "rgba(5, 28, 69, 0.43)",
};

export const HERO_HEIGHT = 260;
export const HEADER_MIN = 64;
export const TAB_KEYS = ["info", "delivery", "chat-ai"] as const;
export type TabKey = typeof TAB_KEYS[number];

export const MOCK_BANNERS = [
  "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800",
  "https://images.unsplash.com/photo-1506617564039-2f3b650b7010?w=800",
  "https://images.unsplash.com/photo-1553546895-531931aa1aa8?w=800",
];

export const INFO_ROWS = [
  { icon: "time-outline", label: "Hours", value: "Mon–Sat  8:00 AM – 9:00 PM" },
  { icon: "location-outline", label: "Address", value: "12 MG Road, Ranchi, Jharkhand 834001" },
  { icon: "call-outline", label: "Contact", value: "+91 98765 43210" },
  { icon: "globe-outline", label: "Website", value: "bharatlinker.in" },
];