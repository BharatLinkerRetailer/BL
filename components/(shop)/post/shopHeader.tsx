import React, { memo } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Shop } from '../../../types/shop/shopSocial';

const { width: W } = Dimensions.get('window');

interface Props {
  shop: Shop;
  posts:              number;
  followers:          number;
  following:          number;
  onFollow?:          () => void;
  onMessage?:         () => void;
  onFollowersPress?:  () => void;
  onFollowingPress?:  () => void;
}

// ─── fmt ─────────────────────────────────────────────────────────────────────

const fmt = (n: number): string => {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000)     return (n / 1_000).toFixed(1) + 'K';
  return String(n);
};

// ─── stat bubble ─────────────────────────────────────────────────────────────

const StatBubble = memo(({
  label,
  value,
  onPress,
}: {
  label: string;
  value: number;
  onPress?: () => void;
}) => (
  <TouchableOpacity
    style={styles.bubble}
    onPress={onPress}
    activeOpacity={onPress ? 0.7 : 1}
    disabled={!onPress}
  >
    <Text style={styles.bubbleValue}>{fmt(value)}</Text>
    <Text style={styles.bubbleLabel}>{label}</Text>
  </TouchableOpacity>
));

// ─── main ─────────────────────────────────────────────────────────────────────

const ShopHeader: React.FC<Props> = ({
  shop,
  posts,
  followers,
  following,
  onFollow,
  onMessage,
  onFollowersPress,
  onFollowingPress,
}) => {
  const { avatar, name, username, bio, isVerified, category } = shop;

  return (
    <View style={styles.container}>

      {/* ── band 1: avatar left, stats right ── */}
      <View style={styles.band}>

        {/* avatar */}
        <View style={styles.avatarWrap}>
          <View style={styles.ring} />
          <Image source={{ uri: avatar }} style={styles.avatar} />
          {isVerified && (
            <View style={styles.tick}>
              <Ionicons name="checkmark-circle" size={20} color="#3897f0" />
            </View>
          )}
        </View>

        {/* stats — same row as avatar */}
        <View style={styles.statsGroup}>
          <StatBubble label="Posts"     value={posts} />
          <StatBubble label="Followers" value={followers} onPress={onFollowersPress} />
          <StatBubble label="Following" value={following} onPress={onFollowingPress} />
        </View>
        

      </View>

      {/* ── band 3: action buttons full width ── */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.btnFollow}
          onPress={onFollow}
          activeOpacity={0.85}
        >
          <Text style={styles.btnFollowText}>Follow</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnMessage}
          onPress={onMessage}
          activeOpacity={0.85}
        >
          <Ionicons name="chatbubble-outline" size={15} color="#111" />
          <Text style={styles.btnMessageText}>Message</Text>
        </TouchableOpacity>

        
      </View>

    </View>
  );
};

// ─── styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 14,
    gap: 14,
  },

  // band 1
  band: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  avatarWrap: {
    width: 86,
    height: 86,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ring: {
    position: 'absolute',
    width: 86,
    height: 86,
    borderRadius: 43,
    borderWidth: 3,
    borderColor: '#e91e8c',
  },
  avatar: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 2.5,
    borderColor: '#fff',
  },
  tick: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 10,
    lineHeight: 0,
  },

  // stats
  statsGroup: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  bubble: {
    alignItems: 'center',
    gap: 2,
    paddingVertical: 4,
    paddingHorizontal: 6,
  },
  bubbleValue: {
    fontSize: 19,
    fontWeight: '800',
    color: '#111',
    letterSpacing: -0.5,
  },
  bubbleLabel: {
    fontSize: 11,
    color: '#888',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },

  // band 2
  metaBlock: { gap: 2 },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  name: {
    fontSize: 15,
    fontWeight: '800',
    color: '#111',
    letterSpacing: -0.2,
  },
  username: {
    fontSize: 13,
    color: '#999',
    fontWeight: '500',
  },
  category: {
    fontSize: 12,
    color: '#aaa',
    fontWeight: '500',
  },
  bio: {
    fontSize: 13,
    color: '#333',
    lineHeight: 19,
    marginTop: 2,
  },

  // band 3
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  btnFollow: {
    flex: 1,
    backgroundColor: '#e91e8c',
    paddingVertical: 9,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnFollowText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  btnMessage: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#F2F2F2',
    paddingVertical: 9,
    borderRadius: 10,
  },
  btnMessageText: {
    color: '#111',
    fontWeight: '600',
    fontSize: 14,
  },
  btnMore: {
    backgroundColor: '#F2F2F2',
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default memo(ShopHeader);