import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { Card } from '@/components/atoms/card';
import { colors, radius, typography } from '@/theme';

export interface TotalDaysCardProps {
  readonly totalDays: number;
}

export function TotalDaysCard({ totalDays }: TotalDaysCardProps) {
  return (
    <Card style={styles.card}>
      <View style={styles.iconWrap}>
        <MaterialIcons name="timer" size={22} color={colors.onPrimaryFixedVariant} />
      </View>
      <View>
        <Text style={styles.label}>Total Days</Text>
        <Text style={styles.value} selectable>
          {totalDays.toLocaleString('en-US')}
        </Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 16,
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: radius.sm,
    backgroundColor: colors.secondaryFixed,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    ...typography.labelSm,
    color: colors.outline,
  },
  value: {
    ...typography.headlineLgMobile,
    color: colors.primary,
    fontVariant: ['tabular-nums'],
  },
});
