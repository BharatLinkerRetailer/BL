// ─── components/category/categoryPills.tsx ───────────────────────────────────

import React from "react";
import { ScrollView, Text, Pressable } from "react-native";
import { categoryPillsStyle } from "./style/categoryPills.style"; // ✅ kept your style file

import { CategoryTab } from "../../../types/category/category";

interface Props {
  tabs:      CategoryTab[];
  activeTab: string;
  onSelect:  (id: string) => void;
}

function Pill({
  item, selected, onPress,
}: {
  item:     CategoryTab;
  selected: boolean;
  onPress:  () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[categoryPillsStyle.pill, selected && categoryPillsStyle.pillActive]}
    >
      <Text style={[categoryPillsStyle.pillText, selected && categoryPillsStyle.pillTextActive]}>
        {item.label}
      </Text>
    </Pressable>
  );
}

export default function CategoryPills({ tabs, activeTab, onSelect }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={categoryPillsStyle.categoryList}
    >
      {tabs.map((tab) => (
        <Pill
          key={tab.id}
          item={tab}
          selected={activeTab === tab.id}
          onPress={() => onSelect(tab.id)}
        />
      ))}
    </ScrollView>
  );
}