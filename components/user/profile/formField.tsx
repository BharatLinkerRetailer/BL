import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardTypeOptions,
} from "react-native";

interface Props {
  label: string;
  value: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  editable?: boolean;
  helperText?: string;
  required?: boolean;
}

export const FormField: React.FC<Props> = ({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
  editable = true,
  helperText,
  required = false,
}) => (
  <View style={styles.container}>
    <Text style={styles.label}>
      {label}
      {required && <Text style={styles.asterisk}> *</Text>}
    </Text>
    <TextInput
      style={[styles.input, !editable && styles.inputDisabled]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      keyboardType={keyboardType}
      editable={editable}
      placeholderTextColor="#AAAAAA"
    />
    {helperText && <Text style={styles.helperText}>{helperText}</Text>}
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#6B21A8",
    marginBottom: 8,
  },
  asterisk: {
    color: "#6B21A8",
    fontWeight: "700",
  },
  input: {
    backgroundColor: "#EDE7FA",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: "#1A1A1A",
    borderWidth: 0,
  },
  inputDisabled: {
    opacity: 0.6,
  },
  helperText: {
    fontSize: 12,
    color: "#AAAAAA",
    marginTop: 6,
    marginLeft: 4,
  },
});