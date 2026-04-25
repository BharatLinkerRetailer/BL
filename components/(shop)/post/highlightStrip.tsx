import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Highlight } from '../../../types/shop/shopSocial';

interface Props {
  highlights: Highlight[];
  onPress?: (item: Highlight) => void;
}

const HighlightItem: React.FC<{ item: Highlight; onPress?: (item: Highlight) => void }> = ({
  item,
  onPress,
}) => (
  <TouchableOpacity style={styles.item} onPress={() => onPress?.(item)} activeOpacity={0.8}>
    <View style={styles.ring}>
      <Image source={{ uri: item.cover }} style={styles.cover} />
    </View>
    <Text style={styles.label} numberOfLines={1}>
      {item.label}
    </Text>
  </TouchableOpacity>
);

const HighlightStrip: React.FC<Props> = ({ highlights, onPress }) => {
  if (!highlights.length) return null;
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.strip}
    >
      {highlights.map(h => (
        <HighlightItem key={h.id} item={h} onPress={onPress} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  strip: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 16,
    backgroundColor: '#fff',
  },
  item: { alignItems: 'center', width: 64 },
  ring: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: '#e91e8c',
    padding: 2,
    marginBottom: 5,
  },
  cover: {
    width: '100%',
    height: '100%',
    borderRadius: 28,
    backgroundColor: '#f0f0f0',
  },
  label: {
    fontSize: 11,
    color: '#333',
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default HighlightStrip;