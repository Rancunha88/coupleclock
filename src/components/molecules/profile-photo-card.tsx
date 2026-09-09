import { MaterialIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View, type ImageSourcePropType } from 'react-native';

import { Card } from '@/components/atoms/card';
import { SectionLabel } from '@/components/atoms/section-label';
import { colors, radius, shadow, typography } from '@/theme';

export interface ProfilePhotoCardProps {
  readonly photoSource: ImageSourcePropType;
  readonly onPickPhoto: () => void;
}

export function ProfilePhotoCard({ photoSource, onPickPhoto }: ProfilePhotoCardProps) {
  return (
    <Card style={styles.card}>
      <SectionLabel style={styles.label}>Couple Portrait</SectionLabel>
      <View style={styles.avatarWrap}>
        <Image source={photoSource} style={styles.avatar} contentFit="cover" transition={200} accessibilityLabel="Couple photo" />
        <Pressable
          onPress={onPickPhoto}
          accessibilityRole="button"
          accessibilityLabel="Update shared photo"
          style={({ pressed }) => [styles.cameraButton, { opacity: pressed ? 0.85 : 1 }]}
        >
          <MaterialIcons name="photo-camera" size={20} color={colors.onPrimary} />
        </Pressable>
      </View>
      <Text style={styles.caption}>Tap to update your shared photo</Text>
    </Card>
  );
}

const AVATAR_SIZE = 128;

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
  },
  label: {
    alignSelf: 'flex-start',
    marginBottom: 24,
  },
  avatarWrap: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    marginBottom: 8,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: radius.full,
    backgroundColor: colors.surfaceContainerLow,
  },
  cameraButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 40,
    height: 40,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow.card,
  },
  caption: {
    ...typography.labelXs,
    color: colors.onSurfaceVariant,
    marginTop: 8,
  },
});
