import CustomButton from '@/components/CustomButton';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from 'expo-router';
import { Image, Text } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function WelcomeScreen() {
  const router = useRouter();
  return (
    <ThemedView className="flex-1 justify-center items-center bg-gradient-to-b from-blue-900 to-blue-400 px-6">
      <Animated.View entering={FadeInDown.duration(800)} className="items-center">
        <Image
          source={require('@/assets/images/react-logo@2x.png')}
          style={{ width: 120, height: 120, marginBottom: 24 }}
          accessibilityLabel="App Logo"
        />
        <Text className="text-4xl font-bold text-white mb-4 tracking-wide">Welcome</Text>
        <Text className="text-lg text-white/80 mb-8 text-center max-w-xs">
          Experience a premium, secure, and modern login experience. Get started now!
        </Text>
        <CustomButton
          title="Login Now"
          onPress={() => router.push('/login')}
          style={{ backgroundColor: '#0a7ea4', width: 220 }}
        />
      </Animated.View>
    </ThemedView>
  );
}
