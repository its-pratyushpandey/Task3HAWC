import CustomButton from '@/components/CustomButton';
import InputField from '@/components/InputField';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Dimensions, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [focusField, setFocusField] = useState<string | null>(null);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleLogin = () => {
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      return;
    }
    setError('');
    setLoading(true);
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
      <Animated.View
        entering={FadeInUp.duration(800)}
        style={styles.container}
        className="bg-gradient-to-b from-blue-900 to-blue-400"
      >
        <Ionicons name="person-circle-outline" size={72} color="#fff" style={{ marginBottom: 16, textShadowColor: '#0a7ea4', textShadowOffset: { width: 2, height: 2 }, textShadowRadius: 8 }} accessibilityLabel="Profile Icon" />
        <Text style={styles.title} accessibilityRole="header">Login Now</Text>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <InputField
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          icon={<Ionicons name="mail-outline" size={22} color={focusField === 'email' ? '#0a7ea4' : '#fff'} />}
          onFocus={() => setFocusField('email')}
          onBlur={() => setFocusField(null)}
          style={{ borderColor: focusField === 'email' ? '#0a7ea4' : '#fff', borderWidth: 1, backgroundColor: 'rgba(255,255,255,0.1)', color: '#fff' }}
          accessibilityLabel="Email Input"
        />
        <InputField
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          icon={<Ionicons name="lock-closed-outline" size={22} color={focusField === 'password' ? '#0a7ea4' : '#fff'} />}
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
          style={{ borderColor: focusField === 'password' ? '#0a7ea4' : '#fff', borderWidth: 1, backgroundColor: 'rgba(255,255,255,0.1)', color: '#fff' }}
          accessibilityLabel="Password Input"
        />
        <CustomButton title={loading ? '' : 'Login'} onPress={handleLogin} disabled={loading} accessibilityLabel="Login Button">
          {loading && <ActivityIndicator color="#fff" style={{ position: 'absolute', left: '50%' }} />}
        </CustomButton>
        <TouchableOpacity style={styles.link} accessibilityRole="button" accessibilityLabel="Forgot Password">
          <Text style={styles.linkText}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.link} accessibilityRole="button" accessibilityLabel="Sign Up">
          <Text style={styles.linkText}>Sign Up</Text>
        </TouchableOpacity>
      </Animated.View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    minHeight: Dimensions.get('window').height,
    width: '100%',
    borderRadius: 24,
    shadowColor: '#0a7ea4',
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 32,
    color: '#fff',
    letterSpacing: 1,
  },
  error: {
    color: 'red',
    marginBottom: 12,
    marginTop: 4,
    fontSize: 14,
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
