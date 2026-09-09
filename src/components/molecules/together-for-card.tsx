import { StyleSheet, Text, View } from 'react-native';

import { Card } from '@/components/atoms/card';
import { ProgressBar } from '@/components/atoms/progress-bar';
import { SectionLabel } from '@/components/atoms/section-label';
import { StatBlock } from '@/components/atoms/stat-block';
import { colors, fontFamily, spacing, typography } from '@/theme';

export interface TogetherForCardProps {
  readonly years: number;
  readonly months: number;
  readonly days: number;
  readonly nextAnniversaryDaysLeft: number;
  readonly nextAnniversaryProgress: number;
}

export function TogetherForCard({
  years,
  months,
  days,
  nextAnniversaryDaysLeft,
  nextAnniversaryProgress,
}: TogetherForCardProps) {
  return (
    <Card style={styles.card}>
      <SectionLabel align="center">Together for</SectionLabel>
      <View style={styles.statsRow}>
        <StatBlock value={years} label="Years" />
        <StatBlock value={months} label="Month" />
        <StatBlock value={days} label="Days" />
      </View>
      <View style={styles.progressSection}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressLabel}>Next Anniversary</Text>
          <Text style={styles.progressValue}>{nextAnniversaryDaysLeft} Days Left</Text>
        </View>
        <ProgressBar progress={nextAnniversaryProgress} />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.stackMd,
    marginTop: 16,
  },
  progressSection: {
    width: '100%',
    marginTop: spacing.stackLg,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    ...typography.labelSm,
    color: colors.outline,
  },
  progressValue: {
    ...typography.labelSm,
    color: colors.primary,
    fontFamily: fontFamily.bodyBold,
  },
});
