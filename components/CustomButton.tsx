import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  disabled?: boolean;
  children?: React.ReactNode;
  accessibilityLabel?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ title, onPress, style, disabled, children, accessibilityLabel }) => {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={[animatedStyle, { width: '100%' }]}>
      <TouchableOpacity
        style={[styles.button, style, disabled && styles.disabled]}
        onPress={() => {
          scale.value = withSpring(0.96, { damping: 8 }, () => {
            scale.value = withSpring(1);
          });
          onPress();
        }}
        activeOpacity={0.8}
        disabled={disabled}
        accessible
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel || title}
      >
        {children ? (
          <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%' }}>{children}</View>
        ) : (
          <Text style={styles.buttonText}>{title}</Text>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  disabled: {
    backgroundColor: '#b0c4de',
  },
});

export default CustomButton;
