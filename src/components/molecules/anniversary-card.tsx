import { MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Modal, Platform, Pressable, StyleSheet, Text, View } from 'react-native';

import { Card } from '@/components/atoms/card';
import { PillButton } from '@/components/atoms/pill-button';
import { SectionLabel } from '@/components/atoms/section-label';
import { colors, radius, typography } from '@/theme';
import { formatIsoDate, formatLongDate, parseIsoDate } from '@/utils/love-counter';

export interface AnniversaryCardProps {
  readonly startDate: string;
  readonly onChangeStartDate: (iso: string) => void;
}

export function AnniversaryCard({ startDate, onChangeStartDate }: AnniversaryCardProps) {
  const [isPickerOpen, setPickerOpen] = useState(false);
  const [draftDate, setDraftDate] = useState(() => parseIsoDate(startDate));

  const openPicker = () => {
    setDraftDate(parseIsoDate(startDate));
    setPickerOpen(true);
  };

  const handleChange = (event: { type: string }, selected?: Date) => {
    if (Platform.OS === 'android') {
      setPickerOpen(false);
      if (event.type === 'set' && selected) {
        onChangeStartDate(formatIsoDate(selected));
      }
      return;
    }
    if (selected) setDraftDate(selected);
  };

  const confirmIosDate = () => {
    onChangeStartDate(formatIsoDate(draftDate));
    setPickerOpen(false);
  };

  return (
    <Card>
      <View style={styles.header}>
        <SectionLabel>The Beginning</SectionLabel>
        <MaterialIcons name="event" size={22} color={colors.primary} />
      </View>

      <Pressable
        onPress={openPicker}
        accessibilityRole="button"
        accessibilityLabel="Edit relationship start date"
        style={({ pressed }) => [styles.dateRow, pressed && styles.dateRowPressed]}
      >
        <View>
          <SectionLabel style={styles.dateFieldLabel}>Relationship Start Date</SectionLabel>
          <Text style={styles.dateValue} selectable>
            {formatLongDate(startDate)}
          </Text>
        </View>
        <MaterialIcons name="edit-calendar" size={22} color={colors.onSurfaceVariant} />
      </Pressable>

      {isPickerOpen && Platform.OS === 'android' ? (
        <DateTimePicker value={draftDate} mode="date" onChange={handleChange} maximumDate={new Date()} />
      ) : null}

      {Platform.OS === 'ios' ? (
        <Modal visible={isPickerOpen} transparent animationType="slide" onRequestClose={() => setPickerOpen(false)}>
          <View style={styles.modalBackdrop}>
            <View style={styles.modalSheet}>
              <DateTimePicker
                value={draftDate}
                mode="date"
                display="inline"
                onChange={handleChange}
                maximumDate={new Date()}
              />
              <PillButton label="Done" onPress={confirmIosDate} />
            </View>
          </View>
        </Modal>
      ) : null}
    </Card>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'rgba(224, 191, 191, 0.5)',
    borderRadius: radius.sm,
    padding: 16,
  },
  dateRowPressed: {
    borderColor: colors.primary,
  },
  dateFieldLabel: {
    fontSize: 11,
    letterSpacing: 0.4,
    marginBottom: 4,
  },
  dateValue: {
    ...typography.dateHeadline,
    color: colors.onSurface,
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(27, 28, 27, 0.4)',
  },
  modalSheet: {
    backgroundColor: colors.surfaceContainerLowest,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    padding: 24,
    gap: 16,
  },
});
