import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from 'react-native-reanimated';
import { GLOBAL_WIDTH, spacing } from 'src/constants';
import Svg, {
  Rect,
  Circle,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';

const count = 15; // Define this outside so it's consistent
const containerWidth = GLOBAL_WIDTH - spacing.lg;
const spacingBetweenBars = 10;
const totalSpacing = (count - 1) * spacingBetweenBars;
const segmentWidth = (containerWidth - totalSpacing) / count;

export type ProgressStatus = 'Pending' | 'Start' | 'In-progress' | 'End' 

interface ProgressProps {
  start?: boolean;
  end?: boolean;
  status?: ProgressStatus
}

interface RadioButtonProps {
  active?: boolean;
}

const RadioButton = ({ active = false }: RadioButtonProps) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    {active && (
      <Defs>
        <LinearGradient
          id="paint0_linear"
          x1="0"
          y1="0"
          x2="0"
          y2="24"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#B2FEFA" />
          <Stop offset="1" stopColor="#0ED2F7" />
        </LinearGradient>
        <LinearGradient
          id="paint1_linear"
          x1="6"
          y1="6"
          x2="6"
          y2="18"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#B2FEFA" />
          <Stop offset="1" stopColor="#0ED2F7" />
        </LinearGradient>
      </Defs>
    )}

    <Rect
      x="0.5"
      y="0.5"
      width="23"
      height="23"
      rx="11.5"
      stroke={active ? 'url(#paint0_linear)' : 'grey'}
    />
    <Circle
      cx="12"
      cy="12"
      r="6"
      fill={active ? 'url(#paint1_linear)' : 'grey'}
    />
  </Svg>
);


const Progress = ({ start = false, status = 'Pending' ,...props }: ProgressProps) => {
  const progresses = Array(count)
    .fill(0)
    .map(() => useSharedValue(0));

  useEffect(() => {
    if (status === 'In-progress' ) {
      progresses.forEach((p, index) => {
        p.value = withDelay(index * 60, withTiming(1, { duration: 60 }));
      });
    }
  }, [status]);

  return (
    <>
      <View style={{ position: 'absolute', top: -12, left: -8,zIndex:5 }}>
        <RadioButton active={status !== 'Pending'} />
      </View>
      <View style={{ position: 'absolute', top: -12, right: -8,zIndex:5 }}>
        <RadioButton active={status === 'End'} />
      </View>

      <View style={[styles.container]}>
        {progresses.map((progress, index) => {
          const animatedStyle = useAnimatedStyle(() => ({
            width: `${progress.value * 100}%`,
          }));

          return (
            <View
              key={index}
              style={[styles.segmentContainer, { width: segmentWidth }]}
            >
              <View style={styles.backgroundBar} />
              <Animated.View style={[styles.animatedBar, animatedStyle]} />
            </View>
          );
        })}
      </View>
    </>
  );
};

export default Progress;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // marginHorizontal:spacing.lg,
    gap: spacingBetweenBars,
    overflow: 'hidden',
    zIndex:3
  },
  segmentContainer: {
    height: 1,
    backgroundColor: 'transparent',
    overflow: 'hidden',
    borderRadius: 2,
    position: 'relative',
  },
  backgroundBar: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
  },
  animatedBar: {
    height: 1,
    backgroundColor: '#00FFFF',
    borderRadius: 2,
  },
});
