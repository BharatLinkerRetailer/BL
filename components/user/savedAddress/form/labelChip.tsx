import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles, COLORS } from './style/addressScreenForm.style';
import { AddressLabel } from '../types';

interface LabelChipProps {
  label: AddressLabel;
  active: boolean;
  onPress: (label: AddressLabel) => void;
}

const CHIP_ICONS: Record<AddressLabel, keyof typeof Ionicons.glyphMap> = {
  Home: 'home-outline',
  Work: 'briefcase-outline',
  Other: 'location-outline',
};

const LabelChip: React.FC<LabelChipProps> = ({ label, active, onPress }) => (
  <TouchableOpacity
    style={[styles.chip, active && styles.chipActive]}
    onPress={() => onPress(label)}
    activeOpacity={0.7}
  >
    <Ionicons
      name={CHIP_ICONS[label]}
      size={14}
      color={active ? COLORS.brand : COLORS.muted}
    />
    <Text style={[styles.chipText, active && styles.chipTextActive]}>
      {label}
    </Text>
  </TouchableOpacity>
);

export default LabelChip;