/// components/(home)/home/ProductCard.tsx
import React, { useRef } from "react";
import {
  Animated,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import type { Product } from "../../../types/product/product";
import { useCart } from "../../../store/cart/cartStore";

const C = {
  green: "#0C831F",
  greenLight: "#E8F5E9",
  red: "#E23744",
  gray1: "#F5F6F7",
  gray2: "#E8EAED",
  gray3: "#9AA0AB",
  gray4: "#C5CAD3",
  white: "#FFFFFF",
  text: "#1C1C1E",
  textSub: "#6B7280",
};

// ─── Helpers ───────────────────────────────────────────────────────────────
function formatPrice(paise: number): string {
  return "₹" + (paise / 100).toLocaleString("en-IN", { maximumFractionDigits: 0 });
}

const { width: SCREEN_W } = Dimensions.get("window");
const CARD_W = (SCREEN_W - 16 * 2 - 10) / 2;
const IMG_H = CARD_W * 0.92;

// ─── Props ─────────────────────────────────────────────────────────────────
interface ProductCardProps {
  product: Product;
  image: string | null;
  shopName: string;                    // ← Required for cart grouping
  onPress: () => void;
  deliveryMins?: number;
}

export function ProductCard({
  product,
  image,
  shopName,
  onPress,
  deliveryMins = 10,
}: ProductCardProps) {
  const { addToCart, updateQuantity, items } = useCart();

  // Find current cart item
  const cartItem = items.find(
    (i) => i.productId === product.id && i.variantId === product.defaultVariantId
  );
  const currentQuantity = cartItem?.quantity || 0;

  // Price & Discount
  const unitPrice = product.price;
  const compareAtPrice = product.compareAtPrice ?? 0;
  const hasDiscount = compareAtPrice > unitPrice;
  const discountPct = hasDiscount
    ? Math.round(((compareAtPrice - unitPrice) / compareAtPrice) * 100)
    : 0;

  const isOutOfStock = false; // TODO: connect with real inventory later

  // Animation
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const animatePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.88, duration: 80, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, bounciness: 14, useNativeDriver: true }),
    ]).start();
  };

  const handleAddToCart = () => {
    animatePress();
    const lineItem = {
      productId: product.id,
      variantId: product.defaultVariantId,
      sku: `${product.id}-default`,
      name: product.title,
      attributes: {},
      quantity: 1,
      unitPrice: product.price,
      compareAtPrice: product.compareAtPrice,
      imageUrl: image,
      shopId: product.shopId,
      shopName: shopName,
    };
    addToCart(lineItem);
  };

  const handleQuantityChange = (newQty: number) => {
    animatePress();
    if (cartItem) {
      updateQuantity(cartItem.cartItemId, newQty);
    }
  };

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.93}
      onPress={onPress}
    >
      {/* Image Area */}
      <View style={styles.imgWrapper}>
        {image ? (
          <Image source={{ uri: image }} style={styles.img} resizeMode="contain" />
        ) : (
          <View style={[styles.img, styles.imgPlaceholder]}>
            <Ionicons name="image-outline" size={32} color={C.gray4} />
          </View>
        )}

        {/* Delivery Badge */}
        <View style={styles.deliveryBadge}>
          <Ionicons name="flash" size={9} color={C.green} />
          <Text style={styles.deliveryText}>{deliveryMins} mins</Text>
        </View>

        {/* Discount Badge */}
        {hasDiscount && !isOutOfStock && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>
              {discountPct}%{"\n"}OFF
            </Text>
          </View>
        )}

        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <View style={styles.oosOverlay}>
            <View style={styles.oosPill}>
              <Text style={styles.oosText}>Out of stock</Text>
            </View>
          </View>
        )}
      </View>

      {/* Body */}
      <View style={styles.body}>
        <Text style={styles.name} numberOfLines={2}>
          {product.title}
        </Text>

        {/* Price + Quantity Control */}
        <View style={styles.bottomRow}>
          <View>
            <Text style={styles.price}>{formatPrice(unitPrice)}</Text>
            {hasDiscount && (
              <Text style={styles.compare}>{formatPrice(compareAtPrice)}</Text>
            )}
          </View>

          {!isOutOfStock && (
            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
              {currentQuantity === 0 ? (
                /* ADD Button */
                <TouchableOpacity style={styles.addBtn} onPress={handleAddToCart}>
                  <Text style={styles.addBtnText}>ADD</Text>
                  <Text style={styles.addBtnPlus}>+</Text>
                </TouchableOpacity>
              ) : (
                /* Quantity Stepper: - quantity + */
                <View style={styles.stepper}>
                  <TouchableOpacity
                    style={styles.stepperMinus}
                    onPress={() => handleQuantityChange(currentQuantity - 1)}
                  >
                    <Ionicons name="remove" size={18} color={C.green} />
                  </TouchableOpacity>

                  <Text style={styles.stepperQuantity}>{currentQuantity}</Text>

                  <TouchableOpacity
                    style={styles.stepperPlus}
                    onPress={() => handleQuantityChange(currentQuantity + 1)}
                  >
                    <Ionicons name="add" size={18} color={C.green} />
                  </TouchableOpacity>
                </View>
              )}
            </Animated.View>
          )}
        </View>

        {/* Savings */}
        {hasDiscount && !isOutOfStock && (
          <View style={styles.savingsRow}>
            <Ionicons name="pricetag" size={9} color={C.green} />
            <Text style={styles.savingsText}>
              Save ₹{((compareAtPrice - unitPrice) / 100).toFixed(0)}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}


// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  card: {
    width: CARD_W,
    backgroundColor: C.white,
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: C.gray2,
    // ...Platform.select({
    //   ios: {
    //     shadowColor: "#00000030",
    //     shadowOffset: { width: 0, height: 1 },
    //     shadowOpacity: 0.07,
    //     shadowRadius: 6,
    //   },
    //   android: { elevation: 0.5 },
    // }),
  },

  imgWrapper: {
    backgroundColor: C.gray1,
    position: "relative",
    padding: 8,
  },
  img: {
    width: "100%",
    height: IMG_H,
  },
  imgPlaceholder: {
    alignItems: "center",
    justifyContent: "center",
  },

  deliveryBadge: {
    position: "absolute",
    top: 7,
    left: 7,
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    backgroundColor: C.greenLight,
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: "#B8DFC0",
  },
  deliveryText: {
    fontSize: 9,
    fontWeight: "700",
    color: C.green,
    letterSpacing: 0.2,
  },

  discountBadge: {
    position: "absolute",
    top: 7,
    right: 7,
    backgroundColor: C.red,
    borderRadius: 6,
    paddingHorizontal: 5,
    paddingVertical: 3,
    alignItems: "center",
  },
  discountText: {
    fontSize: 9,
    fontWeight: "800",
    color: C.white,
    textAlign: "center",
    lineHeight: 11,
  },

  oosOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.72)",
    alignItems: "center",
    justifyContent: "center",
  },
  oosPill: {
    backgroundColor: "rgba(0,0,0,0.55)",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  oosText: {
    fontSize: 11,
    fontWeight: "600",
    color: C.white,
    letterSpacing: 0.3,
  },

  body: {
    paddingHorizontal: 9,
    paddingTop: 7,
    paddingBottom: 9,
    gap: 4,
  },

  qtyPill: {
    alignSelf: "flex-start",
    backgroundColor: C.gray1,
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: C.gray2,
  },
  qtyText: {
    fontSize: 10,
    fontWeight: "600",
    color: C.textSub,
  },

  name: {
    fontSize: 12.5,
    fontWeight: "600",
    color: C.text,
    lineHeight: 17,
    letterSpacing: 0.1,
  },

  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 2,
  },
  price: {
    fontSize: 14,
    fontWeight: "800",
    color: C.text,
    letterSpacing: -0.3,
  },
  compare: {
    fontSize: 10.5,
    color: C.gray3,
    textDecorationLine: "line-through",
    marginTop: 1,
  },

  addBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: C.green,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    gap: 2,
    backgroundColor: C.white,
    minWidth: 58,
  },
  addBtnText: {
    fontSize: 12,
    fontWeight: "800",
    color: C.green,
    letterSpacing: 0.8,
  },
  addBtnPlus: {
    fontSize: 14,
    fontWeight: "700",
    color: C.green,
    lineHeight: 16,
  },

  notifyBtn: {
    borderWidth: 1,
    borderColor: C.gray3,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  notifyText: {
    fontSize: 11,
    fontWeight: "600",
    color: C.textSub,
  },
  /* Quantity Stepper */
  stepper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: C.greenLight,
    borderRadius: 999,
    padding: 4,
  },
  stepperMinus: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
  },
  stepperQuantity: {
    minWidth: 32,
    textAlign: "center",
    fontSize: 17,
    fontWeight: "700",
    color: C.green,
  },
  stepperPlus: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
  },

  savingsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    backgroundColor: C.greenLight,
    borderRadius: 5,
    paddingHorizontal: 6,
    paddingVertical: 3,
    alignSelf: "flex-start",
  },
  savingsText: {
    fontSize: 9.5,
    fontWeight: "700",
    color: C.green,
  },
});