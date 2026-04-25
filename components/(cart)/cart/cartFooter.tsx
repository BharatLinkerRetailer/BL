import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCart } from '../../../store/cart/cartStore';
import { formatPrice } from '../../../hooks/formatePrice';

export default function CartFooter() {
  const { getTotalAmount, getTotalItems } = useCart();
  const total = getTotalAmount();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.footer, { paddingBottom: insets.bottom || 16 }]}>
      <View style={styles.content}>
        <View>
          <Text style={styles.label}>
            {getTotalItems()} items • Total
          </Text>
          <Text style={styles.totalPrice}>{formatPrice(total)}</Text>
        </View>

        <TouchableOpacity style={styles.checkoutButton} activeOpacity={0.85}>
          <Text style={styles.checkoutText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 20,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  label: {
    fontSize: 14,
    color: '#64748b',
  },
  totalPrice: {
    fontSize: 32,
    fontWeight: '700',
    color: '#111827',
    marginTop: 2,
  },
  checkoutButton: {
    backgroundColor: '#10b981',
    paddingHorizontal: 40,
    paddingVertical: 18,
    borderRadius: 999,
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  checkoutText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
});