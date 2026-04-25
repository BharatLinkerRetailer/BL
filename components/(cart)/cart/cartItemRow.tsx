import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../../../store/cart/cartStore';
import { formatPrice } from '../../../hooks/formatePrice';
import type { CartItem } from '../../../types/cart/cart';

interface Props {
  item: CartItem;
}

export default function CartItemRow({ item }: Props) {
  const { updateQuantity, removeItem } = useCart();
  const lineTotal = item.unitPrice * item.quantity;

  return (
    <View style={styles.container}>
      {/* Image */}
      <View style={styles.imageContainer}>
        {item.imageUrl && (
          <Image
            source={{ uri: item.imageUrl }}
            style={styles.image}
            resizeMode="cover"
          />
        )}
      </View>

      {/* Details */}
      <View style={styles.details}>
        <Text style={styles.name} numberOfLines={2}>
          {item.name}
        </Text>

        {/* Attributes */}
        {Object.keys(item.attributes).length > 0 && (
          <View style={styles.attributesContainer}>
            {Object.entries(item.attributes).map(([key, value]) => (
              <View key={key} style={styles.attributeTag}>
                <Text style={styles.attributeText}>{value}</Text>
              </View>
            ))}
          </View>
        )}

        <View style={styles.priceRow}>
          <View>
            <Text style={styles.price}>{formatPrice(lineTotal)}</Text>
            {item.compareAtPrice && (
              <Text style={styles.strikethrough}>
                {formatPrice(item.compareAtPrice * item.quantity)}
              </Text>
            )}
          </View>

          {/* Quantity */}
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => updateQuantity(item.cartItemId, item.quantity - 1)}
            >
              <Ionicons name="remove" size={18} color="#374151" />
            </TouchableOpacity>

            <Text style={styles.quantityText}>{item.quantity}</Text>

            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => updateQuantity(item.cartItemId, item.quantity + 1)}
            >
              <Ionicons name="add" size={18} color="#374151" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Remove */}
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removeItem(item.cartItemId)}
      >
        <Ionicons name="trash" size={24} color="#ef4444" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
  },
  imageContainer: {
    width: 80,
    height: 80,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    overflow: 'hidden',
    marginRight: 16,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
    color: '#111827',
  },
  attributesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 8,
  },
  attributeTag: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
  },
  attributeText: {
    fontSize: 12,
    color: '#4b5563',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  price: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
  },
  strikethrough: {
    fontSize: 13,
    color: '#9ca3af',
    textDecorationLine: 'line-through',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 999,
    padding: 4,
  },
  quantityButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityText: {
    width: 40,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  removeButton: {
    padding: 8,
    alignSelf: 'flex-start',
  },
});