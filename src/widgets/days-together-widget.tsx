import { HStack, Image, Spacer, Text, VStack } from '@expo/ui/swift-ui';
import {
  containerBackground,
  font,
  foregroundStyle,
  kerning,
  lineLimit,
  minimumScaleFactor,
  padding,
} from '@expo/ui/swift-ui/modifiers';
import { createWidget } from 'expo-widgets';

export interface DaysTogetherProps {
  readonly names: string;
  readonly days: string;
  readonly since: string;
}

// Runs in the isolated widget runtime: no imports from app code, constants must live inside.
const DaysTogetherWidget = (props: DaysTogetherProps) => {
  'widget';
  const blush = '#ffb3b5';
  return (
    <VStack
      spacing={0}
      modifiers={[
        padding({ all: 4 }),
        containerBackground(
          {
            type: 'linearGradient',
            colors: ['#8e0f28', '#570013'],
            startPoint: { x: 0, y: 0 },
            endPoint: { x: 1, y: 1 },
          },
          'widget',
        ),
      ]}>
      <HStack>
        <Text modifiers={[font({ design: 'serif', weight: 'semibold', size: 13 }), foregroundStyle(blush), lineLimit(1)]}>
          {props.names}
        </Text>
        <Spacer />
        <Image systemName="heart.fill" size={14} color={blush} />
      </HStack>
      <Spacer />
      <Text
        modifiers={[
          font({ design: 'serif', weight: 'bold', size: 40 }),
          foregroundStyle('#ffffff'),
          lineLimit(1),
          minimumScaleFactor(0.5),
        ]}>
        {props.days}
      </Text>
      <Text modifiers={[font({ weight: 'bold', size: 10 }), kerning(1), foregroundStyle('#ffffff')]}>
        DAYS TOGETHER
      </Text>
      <Spacer />
      <Text modifiers={[font({ size: 11 }), foregroundStyle(blush), lineLimit(1)]}>Since {props.since}</Text>
    </VStack>
  );
};

export default createWidget('DaysTogether', DaysTogetherWidget);
