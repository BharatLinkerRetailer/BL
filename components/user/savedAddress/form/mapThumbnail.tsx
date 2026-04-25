import React from 'react';
import { View, Image, ImageSourcePropType } from 'react-native';
import { styles } from './style/addressScreenForm.style';

interface MapThumbnailProps {
  imageSource?: ImageSourcePropType;
}

const MapThumbnail: React.FC<MapThumbnailProps> = ({ imageSource }) => (
  <View style={styles.mapThumb}>
    {imageSource ? (
      <Image source={imageSource} style={styles.mapImage} resizeMode="cover" />
    ) : (
      // Swap this for a real MapView snapshot in production
      <View style={[styles.mapImage, { backgroundColor: '#DDE8F0' }]} />
    )}
    <View style={styles.pinContainer}>
      <View style={styles.pinDot} />
      <View style={styles.pinStem} />
    </View>
  </View>
);

export default MapThumbnail;