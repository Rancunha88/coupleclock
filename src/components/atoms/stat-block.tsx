import { StyleSheet, Text, View } from 'react-native';

import { colors, typography } from '@/theme';

export interface StatBlockProps {
  readonly value: number | string;
  readonly label: string;
}

export function StatBlock({ value, label }: StatBlockProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.value} selectable>
        {value}
      </Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    minWidth: 64,
  },
  value: {
    ...typography.displayLg,
    fontSize: 40,
    lineHeight: 46,
    color: colors.primary,
    fontVariant: ['tabular-nums'],
  },
  label: {
    ...typography.labelSm,
    color: colors.secondary,
    marginTop: 4,
  },
});
