import CustomButton from '@/components/CustomButton';
import InputField from '@/components/InputField';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useRef, useState } from 'react';
import {
    AccessibilityInfo,
    Alert,
    Dimensions,
    findNodeHandle,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    View,
} from 'react-native';

const { width } = Dimensions.get('window');

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [focusField, setFocusField] = useState<string | null>(null);
  const errorRef = useRef<Text>(null);

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

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Subtle Gradient Background */}
      <LinearGradient
        colors={["#1e3c72", "#2a5298"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      {/* Glassmorphism Card */}
      <View style={styles.centeredContainer}>
        <View style={[styles.glassCard, { width: width * 0.92, maxWidth: 420 }]}>  
          <View style={styles.iconWrapper}>
            <Ionicons name="person-circle-outline" size={56} color="#2980b9" accessibilityLabel="Login icon" />
          </View>
          <Text style={styles.title} accessibilityRole="header">Sign In</Text>
          {error ? (
            <Text ref={errorRef} style={styles.error} accessibilityLiveRegion="polite">
              {error}
            </Text>
          ) : (
            <Text style={styles.error} accessibilityLiveRegion="polite"> </Text>
          )}
          <InputField
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            icon={<Ionicons name="mail-outline" size={22} color={focusField === 'email' ? '#2980b9' : '#aaa'} />}
            onFocus={() => setFocusField('email')}
            onBlur={() => setFocusField(null)}
            style={styles.input}
            accessibilityLabel="Email Input"
            returnKeyType="next"
            blurOnSubmit={false}
          />
          <InputField
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            icon={<Ionicons name="lock-closed-outline" size={22} color={focusField === 'password' ? '#2980b9' : '#aaa'} />}
            rightIcon={
              <Ionicons
                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                size={22}
                color="#aaa"
                onPress={() => setShowPassword((prev) => !prev)}
                accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
                accessible
              />
            }
            onFocus={() => setFocusField('password')}
            onBlur={() => setFocusField(null)}
            style={styles.input}
            accessibilityLabel="Password Input"
            returnKeyType="done"
          />
          <CustomButton
            title={loading ? 'Signing In...' : 'Sign In'}
            onPress={handleLogin}
            disabled={loading}
            accessibilityLabel="Sign In Button"
            style={styles.button}
          />
        </View>
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
    backgroundColor: 'rgba(255,255,255,0.13)',
    borderRadius: 24,
    padding: 28,
    alignItems: 'center',
    shadowColor: '#2980b9',
    shadowOpacity: 0.10,
    shadowRadius: 16,
    elevation: 6,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
  },
  iconWrapper: {
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#222',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  error: {
    color: '#ff4d4f',
    marginBottom: 10,
    marginTop: 2,
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
    minHeight: 20,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.08)',
    color: '#222',
    marginBottom: 14,
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 14,
    width: '100%',
    maxWidth: 400,
  },
  button: {
    backgroundColor: '#2980b9',
    borderRadius: 10,
    paddingVertical: 14,
    marginTop: 8,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    shadowColor: '#2980b9',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 2,
  },
});

export default LoginScreen;
