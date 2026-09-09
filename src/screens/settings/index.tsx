import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';

import { PillButton } from '@/components/atoms/pill-button';
import { AnniversaryCard } from '@/components/molecules/anniversary-card';
import { NameFieldsCard } from '@/components/molecules/name-fields-card';
import { ProfilePhotoCard } from '@/components/molecules/profile-photo-card';
import { useLoveProfile } from '@/hooks/use-love-profile';
import { colors, spacing, typography } from '@/theme';
import { getPhotoSource } from '@/utils/photo-source';

export function SettingsScreen() {
  const { profile, updateProfile } = useLoveProfile();
  const [yourName, setYourName] = useState(profile.yourName);
  const [partnerName, setPartnerName] = useState(profile.partnerName);
  const [startDate, setStartDate] = useState(profile.startDate);
  const [photoUri, setPhotoUri] = useState(profile.photoUri);

  const handlePickPhoto = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission needed', 'Allow photo library access to update your shared photo.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    const uri = result.assets?.[0]?.uri;
    if (!result.canceled && uri) {
      setPhotoUri(uri);
    }
  };

  const handleSave = () => {
    updateProfile({ yourName, partnerName, startDate, photoUri });
    Alert.alert('Saved', 'Your settings have been updated.');
  };

  return (
    <ScrollView
      style={styles.container}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>Manage your shared details.</Text>
      </View>

      <ProfilePhotoCard photoSource={getPhotoSource(photoUri)} onPickPhoto={handlePickPhoto} />

      <NameFieldsCard
        yourName={yourName}
        partnerName={partnerName}
        onChangeYourName={setYourName}
        onChangePartnerName={setPartnerName}
      />

      <AnniversaryCard startDate={startDate} onChangeStartDate={setStartDate} />

      <PillButton label="Save Changes" onPress={handleSave} />
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
  },
  header: {
    marginBottom: 8,
    gap: 8,
  },
  title: {
    ...typography.headlineLg,
    color: colors.onSurface,
  },
  subtitle: {
    ...typography.bodyLg,
    color: colors.onSurfaceVariant,
  },
});
