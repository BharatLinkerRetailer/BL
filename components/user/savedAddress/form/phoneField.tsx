import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { styles, COLORS } from './style/addressScreenForm.style';

interface PhoneFieldProps {
  value: string;
  onChangeText: (text: string) => void;
}

const PhoneField: React.FC<PhoneFieldProps> = ({ value, onChangeText }) => {
  const [focused, setFocused] = useState(false);

  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>
        Phone Number <Text style={styles.required}>*</Text>
      </Text>
      <View style={[styles.phoneRow, focused && styles.phoneRowFocused]}>
        <Text style={styles.phonePrefix}>+91</Text>
        <TextInput
          style={styles.phoneInput}
          placeholder="98765 43210"
          placeholderTextColor={COLORS.placeholder}
          keyboardType="phone-pad"
          maxLength={10}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </View>
    </View>
  );
};

export default PhoneField;