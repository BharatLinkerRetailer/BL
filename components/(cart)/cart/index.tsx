import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { useCart } from '../../../store/cart/cartStore';
import ShopSection from './shopSection';
import CartFooter from './cartFooter';
import EmptyCart from './emptyCart';

export default function CartScreen() {
  const { getGroupedByShop, getTotalItems } = useCart();
  const groups = getGroupedByShop();

  if (getTotalItems() === 0) {
    return <EmptyCart />;
  }

  return (
    <>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Your Cart</Text>
        </View>

        {groups.map((group) => (
          <ShopSection key={group.shopId} group={group} />
        ))}
      </ScrollView>

      <CartFooter />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#111827',
  },
});