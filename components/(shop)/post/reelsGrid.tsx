import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Text,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Reel } from '../../../types/shop/shopSocial';

const { width: W } = Dimensions.get('window');
const CELL_W = (W - 4) / 3;
const CELL_H = CELL_W * 1.65;

interface Props {
  reels: Reel[];
  onPress?: (reel: Reel) => void;
}

const ReelCell: React.FC<{ reel: Reel; onPress?: (r: Reel) => void }> = ({
  reel,
  onPress,
}) => (
  <TouchableOpacity
    activeOpacity={0.85}
    onPress={() => onPress?.(reel)}
    style={[styles.cell, { width: CELL_W, height: CELL_H }]}
  >
    <Image source={{ uri: reel.thumbnail }} style={styles.thumb} />
    <View style={styles.overlay} />
    <View style={styles.playIcon}>
      <Ionicons name="play" size={16} color="#fff" />
    </View>
    <View style={styles.viewsRow}>
      <Ionicons name="eye-outline" size={11} color="#fff" />
      <Text style={styles.viewsText}>{reel.views}</Text>
    </View>
    <View style={styles.durBadge}>
      <Text style={styles.durText}>{reel.duration}</Text>
    </View>
  </TouchableOpacity>
);

const ReelsGrid: React.FC<Props> = ({ reels, onPress }) => (
  <View style={styles.grid}>
    {reels.map(r => (
      <ReelCell key={r.id} reel={r} onPress={onPress} />
    ))}
  </View>
);

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 2,
    backgroundColor: '#000',
  },
  cell: { overflow: 'hidden', backgroundColor: '#1a1a1a', position: 'relative' },
  thumb: { width: '100%', height: '100%', resizeMode: 'cover' },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.18)',
  },
  playIcon: { position: 'absolute', top: 7, right: 7 },
  viewsRow: {
    position: 'absolute',
    bottom: 5,
    left: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  viewsText: { color: '#fff', fontSize: 10, fontWeight: '600' },
  durBadge: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: 'rgba(0,0,0,0.55)',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 3,
  },
  durText: { color: '#fff', fontSize: 9, fontWeight: '600' },
});

export default ReelsGrid;