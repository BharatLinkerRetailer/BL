import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CartItemRow from './cartItemRow';
import type { ShopGroup } from '../../../types/cart/cart';

interface Props {
  group: ShopGroup;
}

export default function ShopSection({ group }: Props) {
  return (
    <View style={styles.section}>
      {/* Shop Header */}
      <View style={styles.shopHeader}>
        <View style={styles.shopIcon}>
          <Text style={styles.shopIconText}>🛍️</Text>
        </View>
        <View style={styles.shopInfo}>
          <Text style={styles.shopName}>{group.shopName}</Text>
          <Text style={styles.shopSubtitle}>
            {group.items.length} {group.items.length === 1 ? 'item' : 'items'}
          </Text>
        </View>
      </View>

      {/* Items */}
      <View style={styles.itemsContainer}>
        {group.items.map((item) => (
          <CartItemRow key={item.cartItemId} item={item} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
    marginHorizontal: 16,
  },
  shopHeader: {
    backgroundColor: '#f8fafc',
    borderRadius: 24,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  shopIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#ecfdf5',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shopIconText: {
    fontSize: 28,
  },
  shopInfo: {
    marginLeft: 12,
  },
  shopName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  shopSubtitle: {
    fontSize: 14,
    color: '#64748b',
  },
  itemsContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },
});