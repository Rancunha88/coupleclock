import { Manrope_400Regular, Manrope_600SemiBold, Manrope_700Bold, useFonts } from '@expo-google-fonts/manrope';
import {
  PlayfairDisplay_600SemiBold,
  PlayfairDisplay_700Bold,
} from '@expo-google-fonts/playfair-display';
import { Stack } from 'expo-router/stack';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import { BrandHeaderTitle, BrandOnlyTitle, SettingsLinkButton } from '@/components/organisms/app-header';
import { LoveProfileProvider } from '@/hooks/use-love-profile';
import { colors } from '@/theme';

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Manrope_400Regular,
    Manrope_600SemiBold,
    Manrope_700Bold,
    PlayfairDisplay_600SemiBold,
    PlayfairDisplay_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <LoveProfileProvider>
      <Stack screenOptions={{ headerShadowVisible: false, headerBackButtonDisplayMode: 'minimal' }}>
        <Stack.Screen
          name="index"
          options={{
            headerStyle: { backgroundColor: colors.primary },
            headerTintColor: colors.onPrimary,
            headerTitle: () => <BrandHeaderTitle />,
            headerRight: () => <SettingsLinkButton tintColor={colors.onPrimary} />,
          }}
        />
        <Stack.Screen
          name="settings"
          options={{
            headerStyle: { backgroundColor: colors.surfaceContainerLowest },
            headerTintColor: colors.primary,
            headerTitle: () => <BrandOnlyTitle color={colors.primary} />,
          }}
        />
      </Stack>
    </LoveProfileProvider>
  );
}
