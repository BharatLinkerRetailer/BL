import React from "react";
import { View, Text, Pressable } from "react-native";
import { shopStyles as styles } from "./styles/shop.style";

interface Props {
  title: string;
  onSeeAll?: () => void;
}

export default function SectionHeader({ title, onSeeAll }: Props) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {onSeeAll && (
        <Pressable onPress={onSeeAll}>
          <Text style={styles.seeAll}>See all</Text>
        </Pressable>
      )}
    </View>
  );
}