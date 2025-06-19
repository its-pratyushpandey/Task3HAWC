import React from 'react';
import { StyleSheet, TextInput, TextInputProps, View, ViewStyle } from 'react-native';

interface InputFieldProps extends TextInputProps {
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: ViewStyle;
  errorText?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  icon,
  rightIcon,
  containerStyle,
  errorText,
  style,
  ...props
}) => {
  return (
    <View style={[styles.inputContainer, containerStyle]}>
      {icon && <View style={styles.icon}>{icon}</View>}
      <TextInput
        style={[styles.input, style]}
        placeholderTextColor="#aaa"
        {...props}
        accessible
        accessibilityLabel={props.placeholder}
      />
      {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
    backgroundColor: '#fafafa',
    width: '100%',
    maxWidth: 400,
  },
  icon: {
    marginRight: 8,
  },
  rightIcon: {
    marginLeft: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#222',
    padding: 0,
    backgroundColor: 'transparent',
  },
});

export default InputField;
