// App layout with splash and navigation
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import 'react-native-reanimated';

import SplashScreen from '@/components/SplashScreen';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  // Detect system color scheme
  const colorScheme = useColorScheme();
  // Load custom font
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  // Splash screen state
  const [showSplash, setShowSplash] = useState(true);

  if (!loaded) {
    // Wait for font to load
    return null;
  }

  if (showSplash) {
    // Show splash screen until ready
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  // Main navigation stack
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack initialRouteName="welcome">
        {/* Welcome and Login screens only */}
        <Stack.Screen name="welcome" options={{ title: 'Welcome', headerShown: false }} />
        <Stack.Screen name="login" options={{ title: 'Login', headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
