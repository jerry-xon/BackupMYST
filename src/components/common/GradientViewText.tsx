import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { fontFamily } from 'src/themes/typography';
import { colors } from 'src/themes/colors';
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  type AnimatedProps,
} from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface GradientViewTextProps {
  active?: boolean;
  children?: React.ReactNode;
  onSelect?: () => void;
  disabled?: boolean;
  prevent?: boolean;
  entering?: AnimatedProps<Animated.View>['entering'];
  exiting?: AnimatedProps<Animated.View>['exiting'];
}

const GradientViewText = (props: GradientViewTextProps) => {
  const [active, setActive] = React.useState<boolean>(false);
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  React.useEffect(() => {
    setActive(!!props.active);
  }, [props.active]);

  const onPress = () => {
    if (props?.prevent) {
      setActive(false);
    }
    if (props.onSelect) {
      props.onSelect();
    }
  };

  const onPressIn = () => {
    scale.value = withSpring(0.8);
  };

  const onPressOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <Animated.View
      entering={props.entering}
      exiting={props.exiting}
      style={{ borderRadius: 30 }}
    >
      <AnimatedPressable
        disabled={!!props.disabled}
        style={[animatedStyle, { borderRadius: 30 }]}
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
      >
        <LinearGradient
          colors={
            !active
              ? [colors.blurBorderColor, colors.blurBorderColor]
              : ([...colors.linearGradient.activeInputBox] as [
                  string,
                  string,
                  ...string[]
                ])
          }
          style={styles.gradientBorder}
        >
          <View style={styles.inputWrapper}>{props?.children}</View>
        </LinearGradient>
      </AnimatedPressable>
    </Animated.View>
  );
};

export default GradientViewText;

const styles = StyleSheet.create({
  gradientBorder: {
    padding: 1,
    borderRadius: 30,
  },
  inputWrapper: {
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: colors.darkBlue,
    alignSelf: 'stretch',
    height: 33,
    paddingHorizontal: 18,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
