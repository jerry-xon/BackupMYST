// components/SwipeCard.tsx
import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;

type Props = {
  children: React.ReactNode;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
};

const SwipeCard: React.FC<Props> = ({ children, onSwipeLeft, onSwipeRight }) => {
  const translateX = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler({
    onActive: (event) => {
      translateX.value = event.translationX;
    },
    onEnd: () => {
      if (translateX.value > SWIPE_THRESHOLD) {
        runOnJS(onSwipeRight)();
      } else if (translateX.value < -SWIPE_THRESHOLD) {
        runOnJS(onSwipeLeft)();
      }
      // Always bounce back to center
      translateX.value = withSpring(0, { damping: 15 });
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={[styles.card, animatedStyle]}>
        {children}
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  card: {
    width: SCREEN_WIDTH,
    height: '100%',
    position: 'relative',
  },
});

export default SwipeCard;