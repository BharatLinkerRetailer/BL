// components/product/FloatingCartBar.tsx
import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter, Href } from "expo-router";

import type { Product, Variant } from "../../../types/product/product";
import { useCart } from "../../../store/cart/cartStore";

interface Props {
  product: Product;
  variant: Variant;
  shopName: string;
  imageUrl?: string | null;
  disabled?: boolean;
  onAddToCart?: () => void;
  onCartPress?: () => void;
}

export function FloatingCartBar({
  product,
  variant,
  shopName,
  imageUrl,
  disabled = false,
  onAddToCart,
  onCartPress,
}: Props) {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { getTotalItems, addToCart, updateQuantity, items } = useCart();

  // Find current quantity of this exact variant in cart
  const cartItem = items.find(
    (i) => i.productId === product.id && i.variantId === variant.id
  );
  const currentQuantity = cartItem?.quantity || 0;

  const cartItemCount = getTotalItems();
  const slideAnim = useRef(new Animated.Value(100)).current;

  // Slide up animation
  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: 0,
      useNativeDriver: true,
      tension: 65,
      friction: 11,
    }).start();
  }, []);

  const handleCartPress = () => {
    if (onCartPress) {
      onCartPress();
    } else {
      router.push("/cart" as Href);
    }
  };

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart();
      return;
    }
    if (disabled) return;

    const lineItem = {
      productId: product.id,
      variantId: variant.id,
      sku: variant.sku,
      name: product.title,
      attributes: variant.attributes || {},
      quantity: 1,
      unitPrice: variant.price,
      compareAtPrice: variant.compareAtPrice,
      imageUrl: imageUrl || null,
      shopId: product.shopId,
      shopName: shopName,
    };

    addToCart(lineItem);
  };

  const handleQuantityChange = (newQty: number) => {
    if (!cartItem) return;
    updateQuantity(cartItem.cartItemId, newQty);
    // When quantity becomes 0, your useCart store automatically removes it
  };

  return (
    <Animated.View
      style={[
        styles.root,
        { paddingBottom: insets.bottom + 8 },
        { transform: [{ translateY: slideAnim }] },
      ]}
    >
      {/* Cart Icon Button */}
      <TouchableOpacity
        style={styles.cartBtn}
        onPress={handleCartPress}
        activeOpacity={0.75}
      >
        <Ionicons name="cart-outline" size={28} color="#212121" />
        {cartItemCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {cartItemCount > 9 ? "9+" : cartItemCount}
            </Text>
          </View>
        )}
      </TouchableOpacity>

      {/* ── Dynamic Right Section ── */}
      {!disabled && currentQuantity > 0 ? (
        /* Quantity Stepper */
        <View style={styles.stepperContainer}>
          <TouchableOpacity
            style={styles.stepperButton}
            onPress={() => handleQuantityChange(currentQuantity - 1)}
          >
            <Ionicons name="remove" size={24} color="#F02174" />
          </TouchableOpacity>

          <Text style={styles.stepperQuantity}>{currentQuantity}</Text>

          <TouchableOpacity
            style={styles.stepperButton}
            onPress={() => handleQuantityChange(currentQuantity + 1)}
          >
            <Ionicons name="add" size={24} color="#F02174" />
          </TouchableOpacity>
        </View>
      ) : (
        /* Add to Cart Button */
        <TouchableOpacity
          style={[styles.addBtn, disabled && styles.addBtnDisabled]}
          disabled={disabled}
          onPress={handleAddToCart}
          activeOpacity={0.85}
        >
          <Text style={styles.addBtnText}>
            {disabled ? "Out of Stock" : "Add to cart"}
          </Text>
        </TouchableOpacity>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  root: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
    elevation: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: -3 },
  },

  cartBtn: {
    width: 58,
    height: 58,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: "#E0E0E0",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FAFAFA",
    flexShrink: 0,
  },
  badge: {
    position: "absolute",
    top: 6,
    right: 6,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#F02174",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 3,
  },
  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "800",
  },

  /* Add to Cart Button */
  addBtn: {
    flex: 1,
    height: 58,
    borderRadius: 8,
    backgroundColor: "#F02174",
    alignItems: "center",
    justifyContent: "center",
  },
  addBtnDisabled: {
    backgroundColor: "#BDBDBD",
  },
  addBtnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.2,
  },

  /* Quantity Stepper */
  stepperContainer: {
    flex: 1,
    height: 58,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: "#F02174",
    overflow: "hidden",
  },
  stepperButton: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  stepperQuantity: {
    fontSize: 20,
    fontWeight: "700",
    color: "#212121",
    minWidth: 40,
    textAlign: "center",
  },
});