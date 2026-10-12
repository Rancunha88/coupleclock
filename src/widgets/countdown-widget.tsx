import { Circle, HStack, RoundedRectangle, Spacer, Text, VStack, ZStack } from '@expo/ui/swift-ui';
import {
  containerBackground,
  font,
  foregroundStyle,
  frame,
  lineLimit,
  minimumScaleFactor,
  padding,
  rotationEffect,
  shadow,
  strokeBorder,
} from '@expo/ui/swift-ui/modifiers';
import { createWidget } from 'expo-widgets';

export interface CountdownProps {
  readonly yourName: string;
  readonly partnerName: string;
  readonly days: string;
  readonly label: string;
  readonly date: string;
  /** Fraction of the way from the last anniversary to the next, 0–1. */
  readonly progress: number;
  readonly light: boolean;
}

// Runs in the isolated widget runtime: no imports from app code, constants must live inside.
const CountdownWidget = (props: CountdownProps) => {
  'widget';
  const c = props.light
    ? {
        bg: '#f0eeec', card: '#fbf9f8', name: '#570013', accent: '#8e0f28', well: '#f3f0ee', track: '#e9e4e2',
        ring: ['#570013', '#c2414f'], strong: '#570013', label: '#70585b', faint: '#9e8a8c',
        shadowDark: '#21570013', shadowLight: '#E6FFFFFF',
      }
    : {
        bg: '#141517', card: '#17181b', name: '#f1f1f1', accent: '#ffb3b5', well: '#121315', track: '#1d1e21',
        ring: ['#c2414f', '#ffb3b5'], strong: '#ffffff', label: '#8b8e94', faint: '#5f6268',
        shadowDark: '#BF000000', shadowLight: '#0BFFFFFF',
      };
  // Inner ring is 66pt wide with a 6pt stroke inset by half its width: radius 30.
  const circumference = 2 * Math.PI * 30;
  const arc = Math.max(0.01, props.progress * circumference);

  return (
    <ZStack modifiers={[padding({ all: 10 }), containerBackground(c.bg, 'widget')]}>
      <RoundedRectangle
        cornerRadius={16}
        modifiers={[
          foregroundStyle(c.card),
          shadow({ radius: 4, x: 4, y: 4, color: c.shadowDark }),
          shadow({ radius: 3, x: -3, y: -3, color: c.shadowLight }),
        ]}
      />
      <VStack
        alignment="leading"
        spacing={0}
        modifiers={[padding({ all: 12 }), frame({ maxWidth: 1000, maxHeight: 1000, alignment: 'topLeading' })]}>
        <Text modifiers={[font({ design: 'serif', weight: 'semibold', size: 14 }), foregroundStyle(c.name), lineLimit(1), minimumScaleFactor(0.6)]}>
          {props.yourName}
        </Text>
        <HStack spacing={4}>
          <Text modifiers={[font({ design: 'serif', weight: 'semibold', size: 14 }), foregroundStyle(c.accent)]}>&</Text>
          <Text modifiers={[font({ design: 'serif', weight: 'semibold', size: 14 }), foregroundStyle(c.name), lineLimit(1), minimumScaleFactor(0.6)]}>
            {props.partnerName}
          </Text>
        </HStack>
        <Spacer />
        <HStack spacing={8}>
          <ZStack modifiers={[frame({ width: 74, height: 74 })]}>
            <Circle
              modifiers={[
                foregroundStyle(c.well),
                // Dark top-left rim, light bottom-right rim: reads as pressed in.
                strokeBorder({
                  content: { type: 'linearGradient', colors: [c.shadowDark, c.shadowLight], startPoint: { x: 0, y: 0 }, endPoint: { x: 1, y: 1 } },
                  style: { lineWidth: 2 },
                  shape: 'circle',
                }),
              ]}
            />
            <Circle
              modifiers={[
                foregroundStyle('#00000000'),
                frame({ width: 66, height: 66 }),
                strokeBorder({ content: c.track, style: { lineWidth: 6 }, shape: 'circle' }),
                strokeBorder({
                  content: { type: 'linearGradient', colors: c.ring, startPoint: { x: 0, y: 0 }, endPoint: { x: 1, y: 1 } },
                  style: { lineWidth: 6, lineCap: 'round', dash: [arc, circumference] },
                  shape: 'circle',
                }),
                rotationEffect(-90),
              ]}
            />
            <Text modifiers={[font({ design: 'serif', weight: 'bold', size: 24 }), foregroundStyle(c.strong), lineLimit(1), minimumScaleFactor(0.6)]}>
              {props.days}
            </Text>
          </ZStack>
          <VStack alignment="leading" spacing={0}>
            <Text modifiers={[font({ weight: 'semibold', size: 13 }), foregroundStyle(c.strong)]}>days</Text>
            <Text modifiers={[font({ size: 11.5 }), foregroundStyle(c.label), lineLimit(3), minimumScaleFactor(0.8)]}>
              {props.label}
            </Text>
            <Text modifiers={[font({ size: 10 }), foregroundStyle(c.faint), padding({ top: 4 })]}>{props.date}</Text>
          </VStack>
        </HStack>
      </VStack>
    </ZStack>
  );
};

export const CountdownDark = createWidget('Countdown', CountdownWidget);
export const CountdownLight = createWidget('CountdownLight', CountdownWidget);
