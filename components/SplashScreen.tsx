import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';

const logo = require('../assets/images/icon.png'); // Fixed path to logo

const SplashScreen = ({ onFinish }: { onFinish: () => void }) => {
  const spinValue = React.useRef(new Animated.Value(0)).current;
  const fadeValue = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeValue, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1200,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(fadeValue, {
        toValue: 0,
        duration: 400,
        delay: 400,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onFinish();
    });
  }, [fadeValue, spinValue, onFinish]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={StyleSheet.absoluteFill}>
      <LinearGradient
        colors={["#0f2027", "#2c5364", "#00c6ff"]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <Animated.View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          opacity: fadeValue,
        }}
        accessible accessibilityLabel="App loading"
      >
        <Animated.Image
          source={logo}
          style={{
            width: 100,
            height: 100,
            marginBottom: 24,
            transform: [{ rotate: spin }],
          }}
          accessibilityIgnoresInvertColors
          accessibilityLabel="App logo"
        />
        <Ionicons name="planet" size={48} color="#fff" accessibilityLabel="Brand icon" />
      </Animated.View>
    </View>
  );
};

export default SplashScreen;
