import type { ReactNode } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { colors, radius, shadow } from '@/theme';

export interface CardProps {
  readonly children: ReactNode;
  readonly style?: StyleProp<ViewStyle>;
}

export function Card({ children, style }: CardProps) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: radius.md,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(128, 0, 32, 0.05)',
    ...shadow.card,
  },
});
