import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function EmptyCart() {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>🛒</Text>
      <Text style={styles.title}>Your cart is empty</Text>
      <Text style={styles.subtitle}>
        Looks like you haven’t added anything yet.{'\n'}Start shopping now!
      </Text>

      <TouchableOpacity style={styles.browseButton}>
        <Text style={styles.browseText}>Browse Products</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  emoji: {
    fontSize: 90,
    marginBottom: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 24,
  },
  browseButton: {
    marginTop: 48,
    backgroundColor: '#111827',
    paddingHorizontal: 40,
    paddingVertical: 18,
    borderRadius: 999,
  },
  browseText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
});