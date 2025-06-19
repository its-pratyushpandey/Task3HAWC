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
    TouchableOpacity,
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

  const handleForgotPassword = () => {
    Haptics.selectionAsync();
    Alert.alert('Forgot Password', 'Password reset flow goes here.');
  };

  const handleSignUp = () => {
    Haptics.selectionAsync();
    Alert.alert('Sign Up', 'Sign up flow goes here.');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Static Gradient Background */}
      <View style={[StyleSheet.absoluteFill, { zIndex: -1 }]}> 
        <LinearGradient
          colors={["#1e3c72", "#2a5298", "#6dd5ed"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
      </View>
      {/* Glassmorphism Card */}
      <View style={styles.centeredContainer}>
        <View style={[styles.glassCard, { width: width * 0.92, maxWidth: 420 }]}>  
          <View style={styles.iconWrapper}>
            <Ionicons name="shield-checkmark" size={60} color="#2193b0" accessibilityLabel="Premium login icon" />
          </View>
          <Text style={styles.title} accessibilityRole="header">Sign In</Text>
          {error ? (
            <Text ref={errorRef} style={[styles.error, { opacity: error ? 1 : 0 }]} accessibilityLiveRegion="polite">
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
            icon={<Ionicons name="mail-outline" size={22} color={focusField === 'email' ? '#2193b0' : '#aaa'} />}
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
            icon={<Ionicons name="lock-closed-outline" size={22} color={focusField === 'password' ? '#2193b0' : '#aaa'} />}
            rightIcon={
              <TouchableOpacity
                onPress={() => {
                  setShowPassword((prev) => !prev);
                  Haptics.selectionAsync();
                }}
                accessible
                accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
              >
                <Ionicons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={22}
                  color="#aaa"
                />
              </TouchableOpacity>
            }
            onFocus={() => setFocusField('password')}
            onBlur={() => setFocusField(null)}
            style={styles.input}
            accessibilityLabel="Password Input"
            returnKeyType="done"
          />
          <TouchableOpacity
            onPress={handleForgotPassword}
            style={styles.forgotLink}
            accessibilityRole="button"
            accessibilityLabel="Forgot Password"
          >
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
          <CustomButton
            title={loading ? 'Signing In...' : 'Sign In'}
            onPress={handleLogin}
            disabled={loading}
            accessibilityLabel="Sign In Button"
            style={styles.button}
          />
          <View style={styles.signupRow}>
            <Text style={styles.signupText}>Don't have an account?</Text>
            <TouchableOpacity
              onPress={handleSignUp}
              accessibilityRole="button"
              accessibilityLabel="Sign Up"
            >
              <Text style={styles.signupLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
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
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: 28,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#2193b0',
    shadowOpacity: 0.13,
    shadowRadius: 24,
    elevation: 8,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.22)',
    backdropFilter: 'blur(16px)', // for web, ignored on native
  },
  iconWrapper: {
    marginBottom: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 18,
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
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.13)',
    color: '#222',
    marginBottom: 14,
    fontSize: 16,
    paddingVertical: 13,
    paddingHorizontal: 16,
    width: '100%',
    maxWidth: 400,
  },
  button: {
    backgroundColor: 'linear-gradient(90deg, #2193b0 0%, #6dd5ed 100%)', // for web, ignored on native
    borderRadius: 12,
    paddingVertical: 15,
    marginTop: 10,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    shadowColor: '#2193b0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.14,
    shadowRadius: 8,
    elevation: 3,
  },
  forgotLink: {
    alignSelf: 'flex-end',
    marginBottom: 8,
    marginTop: -6,
  },
  forgotText: {
    color: '#2193b0',
    fontWeight: '600',
    fontSize: 15,
    textDecorationLine: 'underline',
    letterSpacing: 0.1,
  },
  signupRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
  },
  signupText: {
    color: '#444',
    fontSize: 15,
    marginRight: 4,
  },
  signupLink: {
    color: '#2193b0',
    fontWeight: '700',
    fontSize: 15,
    textDecorationLine: 'underline',
    letterSpacing: 0.1,
  },
});

export default LoginScreen;
