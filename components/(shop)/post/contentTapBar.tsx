import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ActiveTab } from '../../../types/shop/shopSocial';


interface Props {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

const TABS: { key: ActiveTab; icon: string; iconActive: string }[] = [
  { key: 'posts', icon: 'grid-outline',        iconActive: 'grid' },
  { key: 'reels', icon: 'play-circle-outline', iconActive: 'play-circle' },
];

const ContentTabBar: React.FC<Props> = ({ activeTab, onTabChange }) => (
  <View style={styles.container}>
    {TABS.map(({ key, icon, iconActive }) => {
      const isActive = activeTab === key;
      return (
        <TouchableOpacity
          key={key}
          style={[styles.tab, isActive && styles.tabActive]}
          onPress={() => onTabChange(key)}
          activeOpacity={0.8}
        >
          <Ionicons
            name={(isActive ? iconActive : icon) as any}
            size={22}
            color={isActive ? '#e91e8c' : '#aaa'}
          />
        </TouchableOpacity>
      );
    })}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 0.5,
    borderTopColor: '#e8e8e8',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 11,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: { borderBottomColor: '#e91e8c' },
});

export default ContentTabBar;