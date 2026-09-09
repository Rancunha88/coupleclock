import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

import { colors } from '@/theme';

export function HeartDivider() {
  return (
    <View style={styles.row} accessible={false}>
      <View style={styles.line} />
      <MaterialIcons name="favorite" size={20} color={colors.secondaryContainer} style={styles.icon} />
      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  line: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.outlineVariant,
  },
  icon: {
    marginHorizontal: 16,
  },
});
