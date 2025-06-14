import { StyleSheet, Text, Pressable ,PressableProps, StyleProp, ViewStyle, Easing, TextStyle } from 'react-native';
import React from 'react';
import { fontFamily } from 'src/themes/typography';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from 'src/themes/colors';
import { buttonHeight } from 'src/constants';
import Animated, { AnimatedProps, FadeInDown, FadeInUp, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { Gesture } from 'react-native-gesture-handler';
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface RNButtonProps extends PressableProps {
  deactived?: boolean;
  active?: boolean;
  title?: string;
  mainContainer?: StyleProp<ViewStyle>;
  entering?: AnimatedProps<Animated.View>['entering'];
  exiting?: AnimatedProps<Animated.View>['exiting'];
  props?: PressableProps;
  titleAsChildren?: React.ReactNode;
  diabelGradient?:boolean
  gradientcolors?: string[];
  gradientStyle?: StyleProp<ViewStyle>;
  titleStyle?:StyleProp<TextStyle>
}

const RNButton: React.FC<RNButtonProps> = ({
  active = false,
  title,
  ...props
}) => {

  const scale = useSharedValue(1);
  const translateY = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, 
    ],
  }));

  const gardientColor = props.gradientcolors ? props.gradientcolors : props.deactived
    ? [colors.blurBlue, colors.blurBlue]
    : ['#E8467C', '#BC1948']

  
    const button = ()=>{
      return (
        <Pressable
          disabled={props.deactived}
          onPressIn={() => {
            scale.value = withSpring(0.8);
            translateY.value = withSpring(123);
          }}
          onPressOut={() => {
            scale.value = withSpring(1);
            translateY.value = withSpring(0);
          }}
          style={[
            styles.container,
            {
              backgroundColor: active ? 'transparent' : colors.darkBlue,
            },
          ]}
          {...props}
        >
          {props.titleAsChildren}
          {title !== undefined && (
            <Animated.Text
              entering={FadeInDown.delay(50)}
              style={[
                styles.buttonText,
                // { opacity: props.deactived ? 0.5 : 1 },
                props.titleStyle,
              ]}
            >
              {title.toUpperCase()}
            </Animated.Text>
          )}
        </Pressable>
      );
    }


  return (
    <AnimatedPressable
      style={[styles.parentContainer, 
        // animatedStyle, 
      props.mainContainer]}
      entering={props.entering !== undefined ? props.entering : FadeInDown}
      exiting={props.exiting}
    >
      {
        !!!props.diabelGradient ?
        <LinearGradient
        colors={gardientColor as [string, string]}
        style={[styles.gradientBorder, props.gradientStyle]}
      >
       {button()}
      </LinearGradient>
        :
        button()
      }
     
    </AnimatedPressable>
  );
};

export default React.memo(RNButton);

const styles = StyleSheet.create({
  parentContainer: {
  },
  buttonText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
    lineHeight: 14,
    letterSpacing: 1.25,
    textAlign: 'center',
    textTransform: 'uppercase',
    color: '#fff',
    width: '100%',
    textAlignVertical: 'center',
  },
  gradientBorder: {
    padding: 1.5,
    borderRadius: 50,
    flex: 1,
    height: buttonHeight,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: buttonHeight,
    overflow: 'hidden',
    opacity: 0.92,
    overlayColor: 'hidden',
  },
});
