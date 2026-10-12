import { HStack, RoundedRectangle, Spacer, Text, VStack, ZStack } from '@expo/ui/swift-ui';
import {
  containerBackground,
  font,
  foregroundStyle,
  frame,
  kerning,
  lineLimit,
  minimumScaleFactor,
  padding,
  shadow,
  strokeBorder,
} from '@expo/ui/swift-ui/modifiers';
import { createWidget } from 'expo-widgets';

export interface TimeTogetherProps {
  readonly yourName: string;
  readonly partnerName: string;
  readonly years: number;
  readonly months: number;
  readonly days: number;
  readonly since: string;
  readonly light: boolean;
}

// Runs in the isolated widget runtime: no imports from app code, constants must live inside.
const TimeTogetherWidget = (props: TimeTogetherProps) => {
  'widget';
  const c = props.light
    ? {
        bg: '#f0eeec', card: '#fbf9f8', name: '#570013', accent: '#8e0f28', well: '#f3f0ee',
        strong: '#570013', faint: '#9e8a8c', shadowDark: '#21570013', shadowLight: '#E6FFFFFF',
      }
    : {
        bg: '#141517', card: '#17181b', name: '#f1f1f1', accent: '#ffb3b5', well: '#121315',
        strong: '#ffffff', faint: '#5f6268', shadowDark: '#BF000000', shadowLight: '#0BFFFFFF',
      };
  // Hide the years tile until the first anniversary.
  const tiles = [
    { n: props.years, unit: props.years === 1 ? 'year' : 'years' },
    { n: props.months, unit: props.months === 1 ? 'month' : 'months' },
    { n: props.days, unit: props.days === 1 ? 'day' : 'days' },
  ].filter((tile, i) => i > 0 || tile.n > 0);

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
        <HStack spacing={6}>
          {tiles.map((tile) => (
            <ZStack key={tile.unit} modifiers={[frame({ maxWidth: 1000, height: 50 })]}>
              <RoundedRectangle
                cornerRadius={11}
                modifiers={[
                  foregroundStyle(c.well),
                  // Dark top-left rim, light bottom-right rim: reads as pressed in.
                  strokeBorder({
                    content: { type: 'linearGradient', colors: [c.shadowDark, c.shadowLight], startPoint: { x: 0, y: 0 }, endPoint: { x: 1, y: 1 } },
                    style: { lineWidth: 2 },
                    shape: 'roundedRectangle',
                    cornerRadius: 11,
                  }),
                ]}
              />
              <VStack spacing={4}>
                <Text modifiers={[font({ design: 'serif', weight: 'bold', size: 21 }), foregroundStyle(c.strong), lineLimit(1), minimumScaleFactor(0.6)]}>
                  {String(tile.n)}
                </Text>
                <Text modifiers={[font({ size: 9 }), kerning(0.3), foregroundStyle(c.accent)]}>{tile.unit}</Text>
              </VStack>
            </ZStack>
          ))}
        </HStack>
        <Text modifiers={[font({ size: 10 }), foregroundStyle(c.faint), padding({ top: 8 })]}>Since {props.since}</Text>
      </VStack>
    </ZStack>
  );
};

export const TimeTogetherDark = createWidget('TimeTogether', TimeTogetherWidget);
export const TimeTogetherLight = createWidget('TimeTogetherLight', TimeTogetherWidget);
