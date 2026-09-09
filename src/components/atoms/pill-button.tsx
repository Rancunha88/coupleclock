import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text } from 'react-native';

import { colors, fontFamily, radius, shadow, typography } from '@/theme';

export interface PillButtonProps {
  readonly label: string;
  readonly onPress?: () => void;
  readonly disabled?: boolean;
}

export function PillButton({ label, onPress, disabled }: PillButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => [styles.wrapper, { opacity: disabled ? 0.5 : pressed ? 0.9 : 1 }]}
    >
      <LinearGradient
        colors={[colors.primary, colors.primaryContainer]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      >
        <Text style={styles.label}>{label}</Text>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: radius.sm,
    ...shadow.button,
  },
  gradient: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    ...typography.bodyLg,
    fontFamily: fontFamily.bodySemiBold,
    color: colors.onPrimary,
  },
});
