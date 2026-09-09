import { MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fontFamily } from '@/theme';

export function BrandHeaderTitle() {
  return (
    <View style={styles.brandRow}>
      <MaterialIcons name="favorite" size={24} color={colors.onPrimary} />
      <Text style={styles.brandText}>CoupleClock</Text>
    </View>
  );
}

export interface SettingsLinkButtonProps {
  readonly tintColor?: string;
}

export function SettingsLinkButton({ tintColor = colors.onPrimary }: SettingsLinkButtonProps) {
  return (
    <Link href="/settings" asChild>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Open settings"
        hitSlop={8}
        style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
      >
        <MaterialIcons name="settings" size={24} color={tintColor} />
      </Pressable>
    </Link>
  );
}

export interface BrandOnlyTitleProps {
  readonly color?: string;
}

export function BrandOnlyTitle({ color = colors.primary }: BrandOnlyTitleProps) {
  return <Text style={[styles.brandText, { color }]}>CoupleClock</Text>;
}

const styles = StyleSheet.create({
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  brandText: {
    fontFamily: fontFamily.displayBold,
    fontSize: 28,
    letterSpacing: -0.3,
    color: colors.onPrimary,
  },
});
