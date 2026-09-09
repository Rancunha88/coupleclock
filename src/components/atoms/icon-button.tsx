import { MaterialIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet } from 'react-native';

import { radius } from '@/theme';

export interface IconButtonProps {
  readonly name: keyof typeof MaterialIcons.glyphMap;
  readonly color: string;
  readonly backgroundColor?: string;
  readonly size?: number;
  readonly onPress?: () => void;
  readonly accessibilityLabel: string;
}

export function IconButton({
  name,
  color,
  backgroundColor = 'transparent',
  size = 24,
  onPress,
  accessibilityLabel,
}: IconButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      hitSlop={8}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor, opacity: pressed ? 0.7 : 1 },
      ]}
    >
      <MaterialIcons name={name} color={color} size={size} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
