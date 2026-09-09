import { StyleSheet, Text, type StyleProp, type TextStyle } from 'react-native';

import { colors, typography } from '@/theme';

export interface SectionLabelProps {
  readonly children: string;
  readonly color?: string;
  readonly align?: 'left' | 'center';
  readonly style?: StyleProp<TextStyle>;
}

export function SectionLabel({ children, color = colors.outline, align = 'left', style }: SectionLabelProps) {
  return (
    <Text style={[styles.label, { color, textAlign: align }, style]} selectable>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  label: {
    ...typography.labelSm,
  },
});
