import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AlertProvider } from '@/template';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppProvider } from '../contexts/AppContext';

export default function RootLayout() {
  return (
    <AlertProvider>
      <SafeAreaProvider>
        <AppProvider>
          <StatusBar style="light" />
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen
              name="player"
              options={{ presentation: 'fullScreenModal', animation: 'fade' }}
            />
            <Stack.Screen
              name="match/[id]"
              options={{ presentation: 'card', animation: 'slide_from_right' }}
            />
          </Stack>
        </AppProvider>
      </SafeAreaProvider>
    </AlertProvider>
  );
}
