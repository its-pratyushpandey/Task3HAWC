import CustomButton from '@/components/CustomButton';
import InputField from '@/components/InputField';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, Dimensions, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

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
    Alert.alert('Login Info', `Email: ${email}\nPassword: ${password}`);
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
        <Ionicons name="person-circle-outline" size={72} color="#0a7ea4" style={{ marginBottom: 16 }} />
        <Text style={styles.title}>Login Now</Text>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <InputField
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          icon={<Ionicons name="mail-outline" size={22} color="#0a7ea4" />}
        />
        <InputField
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          icon={<Ionicons name="lock-closed-outline" size={22} color="#0a7ea4" />}
          rightIcon={
            <TouchableOpacity onPress={() => setShowPassword((prev) => !prev)}>
              <Ionicons
                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                size={22}
                color="#0a7ea4"
              />
            </TouchableOpacity>
          }
        />
        <CustomButton title="Login" onPress={handleLogin} />
        <TouchableOpacity style={styles.link}>
          <Text style={styles.linkText}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.link}>
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
    backgroundColor: '#fff',
    minHeight: Dimensions.get('window').height,
    width: '100%',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 32,
    color: '#222',
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
    color: '#007AFF',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default LoginScreen;
