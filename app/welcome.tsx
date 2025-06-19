import CustomButton from '@/components/CustomButton';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Text } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function WelcomeScreen() {
  const router = useRouter();
  return (
    <ThemedView className="flex-1 justify-center items-center bg-gradient-to-b from-blue-900 to-blue-400 px-6">
      <Animated.View entering={FadeInDown.duration(800)} className="items-center">
        <Ionicons
          name="rocket-outline"
          size={96}
          color="#fff"
          style={{
            marginBottom: 24,
            textShadowColor: '#0a7ea4',
            textShadowOffset: { width: 2, height: 2 },
            textShadowRadius: 8,
          }}
          accessibilityLabel="App Logo"
        />
        <Text
          className="text-4xl font-bold text-white mb-4 tracking-wide"
          accessibilityRole="header"
        >
          Welcome
        </Text>
        <Text className="text-lg text-white/80 mb-8 text-center max-w-xs">
          Experience a premium, secure, and modern login experience. Get started
          now!
        </Text>
        <CustomButton
          title="Login Now"
          onPress={() => router.push('/login')}
          style={{
            backgroundColor: '#0a7ea4',
            width: 220,
            borderRadius: 16,
            shadowColor: '#0a7ea4',
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 4,
          }}
          accessibilityLabel="Login Now Button"
        />
      </Animated.View>
    </ThemedView>
  );
}
