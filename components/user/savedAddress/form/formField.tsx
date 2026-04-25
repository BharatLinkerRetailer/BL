import React, { useState } from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';
import { styles, COLORS } from './style/addressScreenForm.style';

interface FormFieldProps extends TextInputProps {
  label: string;
  required?: boolean;
  optional?: boolean;
  multiline?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  required = false,
  optional = false,
  multiline = false,
  ...inputProps
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>
        {label}
        {required && <Text style={styles.required}> *</Text>}
        {optional && <Text style={styles.optional}> (Optional)</Text>}
      </Text>
      <TextInput
        style={[
          styles.input,
          multiline && styles.textArea,
          focused && styles.inputFocused,
        ]}
        placeholderTextColor={COLORS.placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        multiline={multiline}
        {...inputProps}
      />
    </View>
  );
};

export default FormField;