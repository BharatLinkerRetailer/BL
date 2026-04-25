// ─── constants/homeData.ts ──────────────────────────────────────────────────

export interface Banner {
  id:       string;
  tag:      string;
  title:    string;
  subtitle: string;
  accent:   string;
  bgDark:   string;
  bgAccent: string;
}// constants/homeData.ts
export type PlatformBenefit = {
  id: string;
  icon: string;
  label: string;
  desc: string;
  color: string;
};
export interface HomeCategory {
  id:    string;
  icon:  string;
  label: string;
  color: string;
}