    import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  username: string;
  onBack?: () => void;
  onOptions?: () => void;
}

const STATUS_H =
  Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0) : 44;

const TopNavBar: React.FC<Props> = ({ username, onBack, onOptions }) => (
  <View style={styles.container}>
    {/* <TouchableOpacity onPress={onBack} style={styles.iconBtn} activeOpacity={0.7}>
      <Ionicons name="arrow-back" size={24} color="#111" />
    </TouchableOpacity> */}

    <View style={styles.titleWrap}>
      <Text style={styles.title} numberOfLines={1}>
        {username}
      </Text>
      <Ionicons name="lock-closed" size={11} color="#888" style={styles.lock} />
    </View>

    {/* <TouchableOpacity onPress={onOptions} style={styles.iconBtn} activeOpacity={0.7}>
      <Ionicons name="ellipsis-horizontal" size={22} color="#111" />
    </TouchableOpacity> */}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 6,
    paddingTop: STATUS_H + 4,
    paddingBottom: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 0.5,
    borderBottomColor: '#e8e8e8',
  },
  iconBtn: { padding: 8 },
  titleWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111',
  },
  lock: { marginTop: 1 },
});

export default TopNavBar;