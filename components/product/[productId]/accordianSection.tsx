// components/product/AccordionSection.tsx
import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Enable LayoutAnimation on Android
if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

interface Props {
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}

export function AccordionSection({
  title,
  children,
  defaultExpanded = false,
}: Props) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded((v) => !v);
  };

  return (
    <View style={styles.root}>
      <TouchableOpacity
        style={styles.header}
        onPress={toggle}
        activeOpacity={0.7}
      >
        <Text style={styles.title}>{title}</Text>
        <Ionicons
          name={expanded ? "chevron-up" : "chevron-down"}
          size={20}
          color="#424242"
        />
      </TouchableOpacity>

      <View style={styles.divider} />

      {expanded && <View style={styles.body}>{children}</View>}
    </View>
  );
}

/** Pre-built body for plain text content */
export function AccordionText({ text }: { text: string }) {
  return <Text style={accordionBodyStyles.text}>{text}</Text>;
}

/** Pre-built body for a label/value list */
export function AccordionList({
  items,
}: {
  items: { label: string; value: string }[];
}) {
  return (
    <View style={accordionBodyStyles.list}>
      {items.map(({ label, value }) => (
        <View key={label} style={accordionBodyStyles.row}>
          <Text style={accordionBodyStyles.label}>{label}</Text>
          <Text style={accordionBodyStyles.value}>{value}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#FFFFFF",
    marginTop: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#212121",
  },
  divider: {
    height: 1,
    backgroundColor: "#EEEEEE",
    marginHorizontal: 16,
  },
  body: {
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
});

const accordionBodyStyles = StyleSheet.create({
  text: {
    fontSize: 14,
    color: "#616161",
    lineHeight: 22,
  },
  list: {
    gap: 10,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  label: {
    width: 130,
    fontSize: 13.5,
    color: "#9E9E9E",
    flexShrink: 0,
  },
  value: {
    flex: 1,
    fontSize: 13.5,
    color: "#212121",
    fontWeight: "500",
  },
});