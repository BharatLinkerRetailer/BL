import React, { useRef, useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Animated,
  LayoutAnimation,
  Platform,
  UIManager,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, styles } from './style/index';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// ── Types ─────────────────────────────────────────────────

interface SubItem {
  id: string;
  label: string;
}

interface FaqCategory {
  id: string;
  title: string;
  subItems: SubItem[];
}

// ── Data ──────────────────────────────────────────────────

const FAQ_DATA: FaqCategory[] = [
  {
    id: 'coupons',
    title: 'Coupons & Offers',
    subItems: [
      { id: 'c1', label: 'How do I apply a coupon?' },
      { id: 'c2', label: "My coupon isn't working" },
      { id: 'c3', label: 'Where can I find available offers?' },
      { id: 'c4', label: 'Cashback not credited' },
    ],
  },
  {
    id: 'general',
    title: 'General Inquiry',
    subItems: [
      { id: 'g1', label: 'How does Zepto work?' },
      { id: 'g2', label: 'Delivery timings & areas' },
      { id: 'g3', label: 'How to update my profile?' },
      { id: 'g4', label: 'Account deletion request' },
    ],
  },
  {
    id: 'payment',
    title: 'Payment Related',
    subItems: [
      { id: 'p1', label: 'Payment failed but amount deducted' },
      { id: 'p2', label: 'Supported payment methods' },
      { id: 'p3', label: 'Refund status & timeline' },
      { id: 'p4', label: 'How to add / remove a card?' },
    ],
  },
  {
    id: 'feedback',
    title: 'Feedback & Suggestions',
    subItems: [
      { id: 'f1', label: 'Share product feedback' },
      { id: 'f2', label: 'Request a new product' },
      { id: 'f3', label: 'App experience feedback' },
    ],
  },
  {
    id: 'order',
    title: 'Order / Products Related',
    subItems: [
      { id: 'o1', label: 'Wrong item delivered' },
      { id: 'o2', label: 'Missing items in my order' },
      { id: 'o3', label: 'Damaged or expired product' },
      { id: 'o4', label: 'Cancel or modify an order' },
      { id: 'o5', label: 'Track my order' },
    ],
  },
  {
    id: 'giftcard',
    title: 'Gift Card',
    subItems: [
      { id: 'gc1', label: 'How to redeem a gift card?' },
      { id: 'gc2', label: 'Gift card balance inquiry' },
      { id: 'gc3', label: 'Gift card not working' },
    ],
  },
  {
    id: 'emi',
    title: 'No-Cost EMI',
    subItems: [
      { id: 'e1', label: 'What is No-Cost EMI?' },
      { id: 'e2', label: 'Eligible cards for EMI' },
      { id: 'e3', label: 'EMI deduction not showing' },
    ],
  },
  {
    id: 'wallet',
    title: 'Wallet Related',
    subItems: [
      { id: 'w1', label: 'How to add money to wallet?' },
      { id: 'w2', label: 'Wallet balance not updated' },
      { id: 'w3', label: 'Wallet transaction history' },
    ],
  },
  {
    id: 'supersaver',
    title: 'Zepto Super Saver',
    subItems: [
      { id: 'ss1', label: 'What is Zepto Super Saver?' },
      { id: 'ss2', label: 'How to subscribe?' },
      { id: 'ss3', label: 'Cancel Super Saver membership' },
      { id: 'ss4', label: 'Benefits not applied' },
    ],
  },
  {
    id: 'daily',
    title: 'Zepto Daily',
    subItems: [
      { id: 'd1', label: 'What is Zepto Daily?' },
      { id: 'd2', label: 'How to set up a daily schedule?' },
      { id: 'd3', label: 'Modify or pause Zepto Daily' },
    ],
  },
];

// ── FaqItem ───────────────────────────────────────────────

interface FaqItemProps {
  category: FaqCategory;
  isOpen: boolean;
  onToggle: (id: string) => void;
  onSubItemPress: (subItem: SubItem) => void;
}

const FaqItem: React.FC<FaqItemProps> = ({ category, isOpen, onToggle, onSubItemPress }) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const handleToggle = useCallback(() => {
    Animated.spring(rotateAnim, {
      toValue: isOpen ? 0 : 1,
      useNativeDriver: true,
      tension: 120,
      friction: 10,
    }).start();

    LayoutAnimation.configureNext({
      duration: 280,
      create: { type: 'easeInEaseOut', property: 'opacity' },
      update: { type: 'spring', springDamping: 0.7 },
    });

    onToggle(category.id);
  }, [isOpen, category.id, onToggle, rotateAnim]);

  const chevronRotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  });

  return (
    <View>
      <Pressable
        onPress={handleToggle}
        style={({ pressed }) => [
          styles.faqTrigger,
          pressed && styles.faqTriggerPressed,
        ]}
        android_ripple={{ color: colors.pinkLight }}
      >
        <Text style={[styles.faqTriggerLabel, isOpen && styles.faqTriggerLabelOpen]}>
          {category.title}
        </Text>
        <Animated.View style={{ transform: [{ rotate: chevronRotate }] }}>
          <Ionicons name="chevron-forward" size={18} color={colors.pink} />
        </Animated.View>
      </Pressable>

      {isOpen && (
        <View style={styles.faqContent}>
          {category.subItems.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.6}
              onPress={() => onSubItemPress(item)}
              style={[
                styles.subItem,
                index === category.subItems.length - 1 && styles.subItemLast,
              ]}
            >
              <Text style={styles.subItemText}>{item.label}</Text>
              <Ionicons name="chevron-forward" size={14} color={colors.chevronMuted} />
            </TouchableOpacity>
          ))}
        </View>
      )}

      <View style={styles.faqDivider} />
    </View>
  );
};

// ── Screen ────────────────────────────────────────────────

export default function HelpAndSupport() {
  const [openId, setOpenId] = useState<string | null>(null);

  const handleToggle = useCallback((id: string) => {
    setOpenId(prev => (prev === id ? null : id));
  }, []);

  const handleSubItemPress = useCallback((subItem: SubItem) => {
    // Wire up your router navigation here
    console.log('Pressed:', subItem.label);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} activeOpacity={0.6}>
          <Ionicons name="chevron-back" size={22} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help & Support</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionLabel}>FAQs</Text>

        <View style={styles.faqList}>
          {FAQ_DATA.map(category => (
            <FaqItem
              key={category.id}
              category={category}
              isOpen={openId === category.id}
              onToggle={handleToggle}
              onSubItemPress={handleSubItemPress}
            />
          ))}
        </View>

        {/* Contact strip */}
        <TouchableOpacity style={styles.contactStrip} activeOpacity={0.8}>
          <View style={styles.contactIconCircle}>
            <Ionicons name="chatbubble-ellipses-outline" size={20} color={colors.white} />
          </View>
          <View style={styles.contactTextBlock}>
            <Text style={styles.contactTitle}>Still need help?</Text>
            <Text style={styles.contactSubtitle}>Chat with us — we reply in under 2 min</Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color={colors.pink} />
        </TouchableOpacity>

        <View style={styles.bottomSpace} />
      </ScrollView>
    </SafeAreaView>
  );
}