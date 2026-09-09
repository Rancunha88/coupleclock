import { Image } from 'expo-image';
import { useEffect, useRef } from 'react';
import { Animated, Easing, Pressable, StyleSheet, Text, View, type ImageSourcePropType } from 'react-native';

import { colors, radius, shadow, typography } from '@/theme';

export interface CoupleHeroProps {
  readonly photoSource: ImageSourcePropType;
  readonly badgeLabel: string;
}

export function CoupleHero({ photoSource, badgeLabel }: CoupleHeroProps) {
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 2000, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0, duration: 2000, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [pulse]);

  const scale = pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.02] });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.frame, { transform: [{ scale }] }]}>
        <Pressable style={styles.imageWrapper} accessibilityRole="image" accessibilityLabel="Couple photo">
          <Image source={photoSource} style={styles.image} contentFit="cover" transition={200} />
        </Pressable>
      </Animated.View>
      <View style={styles.badge}>
        <Text style={styles.badgeLabel}>{badgeLabel}</Text>
      </View>
    </View>
  );
}

const FRAME_SIZE = 280;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 8,
  },
  frame: {
    width: FRAME_SIZE,
    height: FRAME_SIZE,
    padding: 12,
    borderRadius: radius.xl,
    backgroundColor: 'rgba(255,255,255,0.7)',
    ...shadow.cardLg,
  },
  imageWrapper: {
    flex: 1,
    borderRadius: radius.lg,
    overflow: 'hidden',
    backgroundColor: colors.surfaceContainerLow,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  badge: {
    position: 'absolute',
    bottom: -14,
    right: 24,
    backgroundColor: 'rgba(255,255,255,0.85)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: 'rgba(128, 0, 32, 0.1)',
    ...shadow.card,
  },
  badgeLabel: {
    ...typography.labelSm,
    color: colors.primary,
  },
});
