// ─── components/category/categoryGrid.tsx ────────────────────────────────────

import React from "react";
import {
  View, Text, TouchableOpacity,
  StyleSheet, Dimensions,
} from "react-native";

import { CATEGORY_TABS, getSubCategories } from "../../../constants/categoryData";
import { SubCategory, CategoryItem, CategoryGridProps } from "../../../types/category/category";

const { width } = Dimensions.get("window");
const H_PAD     = 16;
const GAP       = 8;
const TILE_SMALL = (width - H_PAD * 2 - GAP * 3) / 4;
const TILE_LARGE = (width - H_PAD * 2 - GAP) / 2;

// ── Mapper ────────────────────────────────────────────────────────────────────

function toItem(sub: SubCategory): CategoryItem {
  return {
    id:    sub.id,
    label: sub.name,
    emoji: sub.icon,
    bg:    sub.bgColor,
    badge: sub.badgeText,
  };
}

// ── Tiles ─────────────────────────────────────────────────────────────────────

function SmallTile({ item, onPress }: { item: CategoryItem; onPress: () => void }) {
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={onPress}
      style={[styles.smallTile, { width: TILE_SMALL }]}
    >
      <View style={[styles.smallImg, { backgroundColor: item.bg }]}>
        {item.badge && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.badge}</Text>
          </View>
        )}
        <Text style={styles.emoji}>{item.emoji}</Text>
      </View>
      <Text style={styles.smallLabel} numberOfLines={2}>{item.label}</Text>
    </TouchableOpacity>
  );
}

function LargeTile({ item, onPress }: { item: CategoryItem; onPress: () => void }) {
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={onPress}
      style={[styles.largeTile, { width: TILE_LARGE }]}
    >
      <View style={[styles.largeImg, { backgroundColor: item.bg }]}>
        {item.badge && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.badge}</Text>
          </View>
        )}
        <Text style={styles.emojiLarge}>{item.emoji}</Text>
      </View>
      <Text style={styles.largeLabel} numberOfLines={2}>{item.label}</Text>
    </TouchableOpacity>
  );
}

// ── Section layouts ───────────────────────────────────────────────────────────

/** First item = large left, next 2 = small stacked right */
function HeroRow({
  items, onPress,
}: { items: CategoryItem[]; onPress: (item: CategoryItem) => void }) {
  const [hero, ...rest] = items;
  return (
    <View style={styles.heroRow}>
      <LargeTile item={hero} onPress={() => onPress(hero)} />
      <View style={styles.smallCol}>
        {rest.slice(0, 2).map((item) => (
          <SmallTile key={item.id} item={item} onPress={() => onPress(item)} />
        ))}
      </View>
    </View>
  );
}

/** Rows of 4 small tiles */
function Grid4({
  items, onPress,
}: { items: CategoryItem[]; onPress: (item: CategoryItem) => void }) {
  const rows: CategoryItem[][] = [];
  for (let i = 0; i < items.length; i += 4) rows.push(items.slice(i, i + 4));
  return (
    <View>
      {rows.map((row, i) => (
        <View key={i} style={styles.row}>
          {row.map((item) => (
            <SmallTile key={item.id} item={item} onPress={() => onPress(item)} />
          ))}
        </View>
      ))}
    </View>
  );
}

// ── Category section (heading + hero + grid) ──────────────────────────────────

function CategorySection({
  heading, items, onPress,
}: {
  heading: string;
  items:   CategoryItem[];
  onPress: (item: CategoryItem) => void;
}) {
  if (items.length === 0) return null;

  const hero = items.slice(0, 3);
  const rest = items.slice(3);

  return (
    <View style={styles.section}>
      {/* ── Heading row ── */}
      <View style={styles.headingRow}>
        <Text style={styles.heading}>{heading}</Text>
      </View>


      {/* ── Hero layout for first 3 ── */}
      {hero.length >= 3 && (
        <HeroRow items={hero} onPress={onPress} />
      )}

      {/* ── Grid for the rest ── */}
      {rest.length > 0 && (
        <Grid4 items={rest} onPress={onPress} />
      )}
    </View>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────

export default function CategoryGrid({
  activeTab, onItemPress,
}: CategoryGridProps): React.JSX.Element {

  function handlePress(item: CategoryItem) {
    onItemPress?.(item);
  }

  // ── "All" → one section per parent tab ───────────────────────────────────
  if (activeTab === "all") {
    return (
      <View style={styles.container}>
        {CATEGORY_TABS
          .filter((tab) => tab.id !== "all")   // skip the "All" meta-tab
          .map((tab) => (
            <CategorySection
              key={tab.id}
              heading={tab.label}              // e.g. "Electronics", "Garments"
              items={tab.subCategories.map(toItem)}
              onPress={handlePress}
            />
          ))}
      </View>
    );
  }

  // ── Single tab → one section ──────────────────────────────────────────────
  const items = getSubCategories(activeTab).map(toItem);
  const label = CATEGORY_TABS.find((t) => t.id === activeTab)?.label ?? "";

  return (
    <View style={styles.container}>
      <CategorySection
        heading={label}
        items={items}
        onPress={handlePress}
      />
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container:    { paddingHorizontal: H_PAD, paddingBottom: 24 },

  // Section wrapper
  section:      { marginBottom: 28 },
  headingRow:   { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 8 },
  heading:      { fontSize: 16, fontWeight: "700", color: "#111" },
  seeAll:       { fontSize: 12, color: "#888", fontWeight: "500" },
  divider:      { height: 1, backgroundColor: "#F0F0F0", marginBottom: 12 },

  // Layout helpers
  heroRow:      { flexDirection: "row", gap: GAP, marginBottom: GAP },
  smallCol:     { flex: 1, gap: GAP },
  row:          { flexDirection: "row", gap: GAP, marginBottom: GAP },

  // Large tile
  largeTile:    { flex: 1 },
  largeImg:     { width: "100%", aspectRatio: 1, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  emojiLarge:   { fontSize: 36 },
  largeLabel:   { fontSize: 12, fontWeight: "500", textAlign: "center", marginTop: 5, color: "#212121" },

  // Small tile
  smallTile:    { alignItems: "center" },
  smallImg:     { width: "100%", aspectRatio: 1, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  emoji:        { fontSize: 22 },
  smallLabel:   { fontSize: 10, textAlign: "center", marginTop: 4, color: "#424242", lineHeight: 13 },

  // Badge
  badge:        { position: "absolute", top: 6, right: 6, backgroundColor: "#F44336", borderRadius: 5, paddingHorizontal: 5, paddingVertical: 1 },
  badgeText:    { fontSize: 8, fontWeight: "700", color: "#fff" },
});