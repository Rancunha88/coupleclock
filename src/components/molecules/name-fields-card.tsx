import { StyleSheet, TextInput, View } from 'react-native';

import { Card } from '@/components/atoms/card';
import { HeartDivider } from '@/components/atoms/heart-divider';
import { SectionLabel } from '@/components/atoms/section-label';
import { colors, typography } from '@/theme';

export interface NameFieldsCardProps {
  readonly yourName: string;
  readonly partnerName: string;
  readonly onChangeYourName: (value: string) => void;
  readonly onChangePartnerName: (value: string) => void;
}

export function NameFieldsCard({
  yourName,
  partnerName,
  onChangeYourName,
  onChangePartnerName,
}: NameFieldsCardProps) {
  return (
    <Card>
      <SectionLabel style={styles.label}>Names</SectionLabel>

      <View style={styles.field}>
        <SectionLabel style={styles.fieldLabel}>Your Name</SectionLabel>
        <TextInput
          value={yourName}
          onChangeText={onChangeYourName}
          placeholder="Your name"
          placeholderTextColor={colors.onSurfaceVariant}
          style={styles.input}
          accessibilityLabel="Your name"
        />
      </View>

      <HeartDivider />

      <View style={styles.field}>
        <SectionLabel style={styles.fieldLabel}>Partner&apos;s Name</SectionLabel>
        <TextInput
          value={partnerName}
          onChangeText={onChangePartnerName}
          placeholder="Partner's name"
          placeholderTextColor={colors.onSurfaceVariant}
          style={styles.input}
          accessibilityLabel="Partner's name"
        />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  label: {
    marginBottom: 24,
  },
  field: {
    gap: 8,
  },
  fieldLabel: {
    fontSize: 11,
    letterSpacing: 0.4,
  },
  input: {
    ...typography.bodyLg,
    color: colors.onSurface,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.outlineVariant,
    paddingVertical: 8,
  },
});
