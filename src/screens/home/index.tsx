import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { CoupleHero } from '@/components/molecules/couple-hero';
import { TogetherForCard } from '@/components/molecules/together-for-card';
import { TotalDaysCard } from '@/components/molecules/total-days-card';
import { useLoveProfile } from '@/hooks/use-love-profile';
import { useNow } from '@/hooks/use-now';
import { colors, spacing, typography } from '@/theme';
import { computeLoveStats, formatLongDate, parseIsoDate } from '@/utils/love-counter';
import { getPhotoSource } from '@/utils/photo-source';

export function HomeScreen() {
  const { profile } = useLoveProfile();
  const now = useNow();
  const stats = computeLoveStats(profile.startDate, now);
  const badgeLabel = `Est. ${parseIsoDate(profile.startDate).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })}`;

  return (
    <ScrollView
      style={styles.container}
      contentInsetAdjustmentBehavior="automatic"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.content}
    >
      <CoupleHero photoSource={getPhotoSource(profile.photoUri)} badgeLabel={badgeLabel} />

      <View style={styles.namesBlock}>
        <Text style={styles.names} selectable>
          {profile.yourName} &amp; {profile.partnerName}
        </Text>
        <View style={styles.anniversaryRow}>
          <View style={styles.hairline} />
          <Text style={styles.anniversaryText}>Anniversary: {formatLongDate(profile.startDate)}</Text>
          <View style={styles.hairline} />
        </View>
      </View>

      <TogetherForCard
        years={stats.years}
        months={stats.months}
        days={stats.days}
        nextAnniversaryDaysLeft={stats.nextAnniversaryDaysLeft}
        nextAnniversaryProgress={stats.nextAnniversaryProgress}
      />

      <TotalDaysCard totalDays={stats.totalDays} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: spacing.containerMargin,
    paddingTop: spacing.stackLg,
    paddingBottom: spacing.sectionGap,
    gap: spacing.gutter,
    alignItems: 'stretch',
  },
  namesBlock: {
    alignItems: 'center',
    marginBottom: spacing.stackMd,
    gap: 8,
  },
  names: {
    ...typography.displayLg,
    fontSize: 36,
    lineHeight: 42,
    color: colors.primary,
    textAlign: 'center',
  },
  anniversaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  hairline: {
    width: 32,
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.outlineVariant,
  },
  anniversaryText: {
    ...typography.bodyMd,
    color: colors.outline,
  },
});
