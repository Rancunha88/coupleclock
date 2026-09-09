/**
 * Design tokens extracted from the "Eternal Intimacy" Stitch design system
 * (Stitch project "Relationship Milestone Tracker", projects/5453167564599630916).
 */

export const colors = {
  primary: '#570013',
  onPrimary: '#ffffff',
  primaryContainer: '#800020',
  onPrimaryContainer: '#ff828a',
  primaryFixed: '#ffdada',
  primaryFixedDim: '#ffb3b5',
  onPrimaryFixed: '#40000b',
  onPrimaryFixedVariant: '#8e0f28',

  secondary: '#70585b',
  onSecondary: '#ffffff',
  secondaryContainer: '#f8d8db',
  onSecondaryContainer: '#755d5f',
  secondaryFixed: '#fbdbde',
  secondaryFixedDim: '#debfc2',
  onSecondaryFixed: '#281719',
  onSecondaryFixedVariant: '#574144',

  tertiary: '#735c00',
  onTertiary: '#ffffff',
  tertiaryContainer: '#cca730',
  onTertiaryContainer: '#4f3d00',
  tertiaryFixed: '#ffe088',
  tertiaryFixedDim: '#e9c349',
  onTertiaryFixed: '#241a00',
  onTertiaryFixedVariant: '#574500',

  error: '#ba1a1a',
  onError: '#ffffff',
  errorContainer: '#ffdad6',
  onErrorContainer: '#93000a',

  background: '#fbf9f8',
  onBackground: '#1b1c1b',
  surface: '#fbf9f8',
  onSurface: '#1b1c1b',
  surfaceVariant: '#e4e2e1',
  onSurfaceVariant: '#584141',
  surfaceDim: '#dbdad9',
  surfaceBright: '#fbf9f8',
  surfaceContainerLowest: '#ffffff',
  surfaceContainerLow: '#f5f3f2',
  surfaceContainer: '#efedec',
  surfaceContainerHigh: '#e9e8e7',
  surfaceContainerHighest: '#e4e2e1',

  outline: '#8c7071',
  outlineVariant: '#e0bfbf',
  inverseSurface: '#303030',
  inverseOnSurface: '#f2f0ef',
  inversePrimary: '#ffb3b5',
  surfaceTint: '#af2b3e',

  /** Soft rose track color used behind the anniversary progress bar. */
  progressTrack: '#fadadd',
} as const;

export const radius = {
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  full: 9999,
} as const;

export const spacing = {
  stackSm: 8,
  stackMd: 16,
  gutter: 16,
  containerMargin: 24,
  stackLg: 32,
  sectionGap: 48,
} as const;

export const fontFamily = {
  displayBold: 'PlayfairDisplay_700Bold',
  displaySemiBold: 'PlayfairDisplay_600SemiBold',
  bodyRegular: 'Manrope_400Regular',
  bodySemiBold: 'Manrope_600SemiBold',
  bodyBold: 'Manrope_700Bold',
} as const;

export const typography = {
  displayLg: {
    fontFamily: fontFamily.displayBold,
    fontSize: 48,
    lineHeight: 56,
    letterSpacing: -0.4,
  },
  headlineLg: {
    fontFamily: fontFamily.displaySemiBold,
    fontSize: 32,
    lineHeight: 40,
  },
  headlineLgMobile: {
    fontFamily: fontFamily.displaySemiBold,
    fontSize: 28,
    lineHeight: 36,
  },
  headlineBrand: {
    fontFamily: fontFamily.displayBold,
    fontSize: 22,
    lineHeight: 28,
  },
  dateHeadline: {
    fontFamily: fontFamily.displaySemiBold,
    fontSize: 24,
    lineHeight: 30,
  },
  bodyLg: {
    fontFamily: fontFamily.bodyRegular,
    fontSize: 18,
    lineHeight: 28,
  },
  bodyMd: {
    fontFamily: fontFamily.bodyRegular,
    fontSize: 16,
    lineHeight: 24,
  },
  labelSm: {
    fontFamily: fontFamily.bodySemiBold,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.6,
    textTransform: 'uppercase' as const,
  },
  labelXs: {
    fontFamily: fontFamily.bodyRegular,
    fontSize: 11,
    lineHeight: 14,
  },
} as const;

export const shadow = {
  card: {
    boxShadow: `0 4px 16px rgba(128, 0, 32, 0.08)`,
  },
  cardLg: {
    boxShadow: `0 12px 32px rgba(128, 0, 32, 0.12)`,
  },
  button: {
    boxShadow: `0 4px 12px rgba(128, 0, 32, 0.25)`,
  },
} as const;
