import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { C } from "../infoConstant";
import { TAB_KEYS, TabKey } from "../infoConstant";

type Props = {
  activeTab: TabKey;
  setActiveTab: (tab: TabKey) => void;
};

export default function ShopTabBar({ activeTab, setActiveTab }: Props) {
  return (
    <View style={styles.tabBar}>
      {TAB_KEYS.map((t) => (
        <Pressable
          key={t}
          style={[styles.tabItem, activeTab === t && styles.tabItemActive]}
          onPress={() => setActiveTab(t)}
        >
          <Text style={[styles.tabLabel, activeTab === t && styles.tabLabelActive]}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </Text>
          {activeTab === t && <View style={styles.tabUnderline} />}
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    backgroundColor: "C.white",
    marginTop: 14,
    borderBottomWidth: 0,
    paddingHorizontal: 16,
    
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 14,
    position: "relative",
  },
  tabItemActive: {},
  tabLabel: { fontSize: 13, fontWeight: "500", color: C.muted },
  tabLabelActive: { fontWeight: "800", color: C.navy },
  tabUnderline: {
    position: "absolute",
    bottom: 0,
    left: "15%",
    right: "15%",
    height: 3,
    borderRadius: 2,
    backgroundColor: C.navy,
  },
});