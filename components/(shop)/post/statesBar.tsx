import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface Props {
  posts: number;
  followers: number;
  following: number;
  onFollowersPress?: () => void;
  onFollowingPress?: () => void;
}

const fmt = (n: number): string => {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K';
  return String(n);
};

interface StatItemProps {
  label: string;
  value: number;
  onPress?: () => void;
}

const StatItem: React.FC<StatItemProps> = ({ label, value, onPress }) => (
  <TouchableOpacity style={styles.item} onPress={onPress} activeOpacity={0.7}>
    <Text style={styles.value}>{fmt(value)}</Text>
    <Text style={styles.label}>{label}</Text>
  </TouchableOpacity>
);

const StatsBar: React.FC<Props> = ({
  posts,
  followers,
  following,
  onFollowersPress,
  onFollowingPress,
}) => (
  <View style={styles.container}>
    <StatItem label="Posts" value={posts} />
    <View style={styles.divider} />
    <StatItem label="Followers" value={followers} onPress={onFollowersPress} />
    <View style={styles.divider} />
    <StatItem label="Following" value={following} onPress={onFollowingPress} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 14,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#e8e8e8',
  },
  item: { flex: 1, alignItems: 'center' },
  value: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111',
    letterSpacing: -0.3,
  },
  label: {
    fontSize: 11,
    color: '#777',
    marginTop: 2,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  divider: { width: 0.5, height: 32, backgroundColor: '#ddd' },
});

export default StatsBar;