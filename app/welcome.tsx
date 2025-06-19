import CustomButton from '@/components/CustomButton';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();
  const color = Colors.light.tint;

  return (
    <View style={styles.container}>
      <Animated.View entering={FadeInUp.duration(800)} style={styles.iconWrapper}>
        <View style={styles.iconCircle}>
          <IconSymbol name="house.fill" size={64} color={color} />
        </View>
      </Animated.View>
      <Animated.Text entering={FadeInUp.delay(200).duration(800)} style={styles.title} accessibilityRole="header">
        Welcome To
      </Animated.Text>
      <Animated.Text entering={FadeInUp.delay(400).duration(800)} style={styles.subtitle} accessibilityRole="text">
        create an account and access thousand of cool stuffs
      </Animated.Text>
      <Animated.View entering={FadeInUp.delay(600).duration(800)} style={{ width: '100%', alignItems: 'center' }}>
        <CustomButton
          title="Get Started"
          onPress={() => router.push('/login')}
          style={styles.button}
          accessibilityLabel="Get Started, go to login"
        >
          <Ionicons name="rocket-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.buttonText}>Get Started</Text>
        </CustomButton>
      </Animated.View>
      <Animated.View entering={FadeInUp.delay(800).duration(800)} style={styles.loginRow}>
        <Ionicons name="person-circle-outline" size={20} color={color} style={{ marginRight: 4 }} />
        <Text style={styles.loginText}>Do you have an account?</Text>
        <TouchableOpacity
          onPress={() => router.push('/login')}
          accessibilityRole="button"
          accessibilityLabel="Log in to your account"
        >
          <Text style={styles.loginLink}> Log in</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  iconWrapper: {
    marginBottom: 32,
  },
  iconCircle: {
    backgroundColor: '#e6f2fa',
    borderRadius: 64,
    width: 96,
    height: 96,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.light.tint,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.light.tint,
    marginBottom: 8,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#687076',
    marginBottom: 32,
    textAlign: 'center',
    lineHeight: 22,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.tint,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 32,
    width: width * 0.8,
    justifyContent: 'center',
    shadowColor: Colors.light.tint,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  loginRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 32,
    justifyContent: 'center',
  },
  loginText: {
    color: '#687076',
    fontSize: 15,
  },
  loginLink: {
    color: Colors.light.tint,
    fontWeight: '700',
    fontSize: 15,
    marginLeft: 2,
    textDecorationLine: Platform.OS === 'web' ? 'underline' : 'none',
  },
});
