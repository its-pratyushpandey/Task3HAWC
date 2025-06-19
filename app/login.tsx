import CustomButton from '@/components/CustomButton';
import InputField from '@/components/InputField';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useRef, useState } from 'react';
import { AccessibilityInfo, ActivityIndicator, Alert, Dimensions, findNodeHandle, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInUp, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [focusField, setFocusField] = useState<string | null>(null);
  const errorRef = useRef<Text>(null);

  // Bounce animation for icon
  const bounce = useSharedValue(1);
  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: bounce.value }],
  }));

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleLogin = async () => {
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      setTimeout(() => {
        const node = errorRef.current && findNodeHandle(errorRef.current);
        if (node) AccessibilityInfo.setAccessibilityFocus(node);
      }, 100);
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      setTimeout(() => {
        const node = errorRef.current && findNodeHandle(errorRef.current);
        if (node) AccessibilityInfo.setAccessibilityFocus(node);
      }, 100);
      return;
    }
    setError('');
    setLoading(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Login Info', `Email: ${email}\nPassword: ${password}`);
    }, 1200);
  };

  // Animate icon bounce on mount
  React.useEffect(() => {
    bounce.value = withSpring(1.18, { damping: 4, stiffness: 120 }, () => {
      bounce.value = withSpring(1, { damping: 4, stiffness: 120 });
    });
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Animated Gradient Background */}
      <Animated.View style={StyleSheet.absoluteFill}>
        <LinearGradient
          colors={["#0f2027", "#2c5364", "#2980b9", "#6dd5fa"]}
          start={{ x: 0.1, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
      {/* Glassmorphism Card */}
      <View style={styles.centeredContainer}>
        <Animated.View
          entering={FadeInUp.duration(800)}
          style={[styles.glassCard, { width: width * 0.92, maxWidth: 420 }]}
        >
          {/* Premium Icon with Bounce */}
          <Animated.View style={[styles.iconWrapper, iconStyle]}>
            <Ionicons name="diamond-outline" size={72} color="#6dd5fa" style={styles.iconShadow} accessibilityLabel="Premium Icon" />
          </Animated.View>
          <Text style={styles.title} accessibilityRole="header">Login Now</Text>
          {/* Animated Error Message */}
          <Animated.View
            style={{ minHeight: 24, alignSelf: 'stretch' }}
            entering={error ? FadeInUp.duration(400) : undefined}
          >
            {error ? (
              <Text
                ref={errorRef}
                style={styles.error}
                accessibilityLiveRegion="polite"
                accessibilityRole="alert"
              >
                {error}
              </Text>
            ) : null}
          </Animated.View>
          {/* Inputs */}
          <InputField
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            icon={<Ionicons name="mail-outline" size={22} color={focusField === 'email' ? '#6dd5fa' : '#fff'} />}
            onFocus={() => setFocusField('email')}
            onBlur={() => setFocusField(null)}
            style={[
              styles.input,
              { borderColor: focusField === 'email' ? '#6dd5fa' : 'rgba(255,255,255,0.18)', color: '#fff' },
            ]}
            accessibilityLabel="Email Input"
            returnKeyType="next"
            blurOnSubmit={false}
          />
          <InputField
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            icon={<Ionicons name="lock-closed-outline" size={22} color={focusField === 'password' ? '#6dd5fa' : '#fff'} />}
            rightIcon={
              <TouchableOpacity onPress={() => setShowPassword((prev) => !prev)} accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}>
                <Ionicons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={22}
                  color="#fff"
                />
              </TouchableOpacity>
            }
            onFocus={() => setFocusField('password')}
            onBlur={() => setFocusField(null)}
            style={[
              styles.input,
              { borderColor: focusField === 'password' ? '#6dd5fa' : 'rgba(255,255,255,0.18)', color: '#fff' },
            ]}
            accessibilityLabel="Password Input"
            returnKeyType="done"
          />
          {/* Login Button */}
          <CustomButton title={loading ? '' : 'Login'} onPress={handleLogin} disabled={loading} accessibilityLabel="Login Button" style={styles.button}>
            {loading && <ActivityIndicator color="#fff" style={{ position: 'absolute', left: '50%' }} />}
            {!loading && <Text style={styles.buttonText}>Login</Text>}
          </CustomButton>
          {/* Links */}
          <TouchableOpacity style={styles.link} accessibilityRole="button" accessibilityLabel="Forgot Password">
            <Text style={styles.linkText}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.link} accessibilityRole="button" accessibilityLabel="Sign Up">
            <Text style={styles.linkText}>Sign Up</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  glassCard: {
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: 28,
    padding: 28,
    alignItems: 'center',
    shadowColor: '#6dd5fa',
    shadowOpacity: 0.18,
    shadowRadius: 24,
    elevation: 12,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.22)',
    // Note: backdropFilter is only for web, ignored on native
  },
  iconWrapper: {
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconShadow: {
    textShadowColor: '#2980b9',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#fff',
    letterSpacing: 1,
    textAlign: 'center',
  },
  error: {
    color: '#ff4d4f',
    marginBottom: 12,
    marginTop: 4,
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
    minHeight: 20,
  },
  input: {
    borderWidth: 1.5,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.08)',
    color: '#fff',
    marginBottom: 16,
    fontSize: 17,
    paddingVertical: 12,
    paddingHorizontal: 14,
    shadowColor: '#6dd5fa',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  button: {
    backgroundColor: 'rgba(41,128,185,0.95)',
    borderRadius: 12,
    paddingVertical: 16,
    marginTop: 8,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    shadowColor: '#6dd5fa',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  link: {
    marginTop: 16,
  },
  linkText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    textDecorationLine: 'underline',
    opacity: 0.85,
  },
});

export default LoginScreen;
