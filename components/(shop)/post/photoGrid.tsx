import React, { memo } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Photo } from '../../../types/shop/shopSocial';

const { width: W } = Dimensions.get('window');
const GAP = 1.5;
const CELL = (W - GAP * 2) / 3;

interface Props {
  photos: Photo[];
  onPress?: (photo: Photo) => void;
}

interface CellProps {
  photo: Photo;
  size: number;
  onPress?: (photo: Photo) => void;
}

const PhotoCell: React.FC<CellProps> = memo(({ photo, size, onPress }) => (
  <TouchableOpacity
    activeOpacity={0.85}
    onPress={() => onPress?.(photo)}
    style={{ width: size, height: size, overflow: 'hidden' }}
  >
    <Image
      source={{ uri: photo.uri }}
      style={styles.img}
      resizeMode="cover"
    />
    {photo.isMultiple && (
      <View style={styles.badge}>
        <Ionicons name="copy-outline" size={13} color="#fff" />
      </View>
    )}
    {photo.isVideo && !photo.isMultiple && (
      <View style={styles.badge}>
        <Ionicons name="videocam" size={13} color="#fff" />
      </View>
    )}
  </TouchableOpacity>
));

const PhotoGrid: React.FC<Props> = memo(({ photos, onPress }) => (
  <View style={styles.grid}>
    {photos.map((p, i) => {
      const wide = (i + 1) % 7 === 0;
      const size = wide ? CELL * 2 + GAP : CELL;
      return (
        <PhotoCell
          key={p.id}
          photo={p}
          size={size}
          onPress={onPress}
        />
      );
    })}
  </View>
));

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GAP,
    backgroundColor: '#e0e0e0',
  },
  img: {
    width: '100%',
    height: '100%',
  },
  badge: {
    position: 'absolute',
    top: 6,
    right: 6,
  },
});

export default PhotoGrid;