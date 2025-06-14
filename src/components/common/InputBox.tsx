import { Platform, Pressable, StyleProp, StyleSheet, Text, TextInput, TextInputProps, TouchableOpacity, View, ViewStyle } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from 'src/themes/colors';
import { fontFamily } from 'src/themes/typography';
import Animated, { AnimatedProps, FadeInDown } from 'react-native-reanimated';
import GradientText from './Gardient';

interface InputBoxProps extends TextInputProps {
    rightIcon?:React.ReactNode,
    title?:string,
    marginBottom?:number,
    inputValue?:string,
    onWriteText?:(text:string)=>void,
    containerProps?:StyleProp<ViewStyle>,
    error?:string,
    entering?:AnimatedProps<Animated.View>['entering'];
    exiting?: AnimatedProps<Animated.View>['exiting'];
}

function InputBox(Props:InputBoxProps) {
  const [value, setValue] = React.useState<string>('');
  const [inputHeight, setInputHeight] = React.useState<number>(25); 

  React.useEffect(() => {
    setValue(Props.inputValue ?? '');
  }, [Props.inputValue]);

  const onContentSizeChange = React.useCallback((event: any) => {
    if (Props.multiline) {
      const height = event.nativeEvent.contentSize.height;
      // Set a min height to avoid shrinking too small
      setInputHeight(Math.max(height, 30));
    }
  }, [Props.multiline]);
  

  const onChangeText = React.useCallback((e: string) => {
    setValue(e);
    if (Props.onWriteText !== undefined) {
      Props.onWriteText(e);
    }
  }, []);

  return (
    <Animated.View
      style={[styles.container, Props.containerProps]}
      entering={Props.entering}
      exiting={Props.exiting}
    >
      <LinearGradient
        colors={
          !value
            ? [colors.blurBlue, colors.blurBlue]
            : ([...colors.linearGradient.activeInputBox] as [
                string,
                string,
                ...string[]
              ])
        }
        style={styles.gradientBorder}
      >
        <View style={styles.inputWrapper}>
          {Props?.rightIcon && (
            <View style={styles.rightIconContainer}>{Props.rightIcon}</View>
          )}

          <View style={styles.inputColumn}>
            <Text style={[styles.title, !Props?.title && { display: 'none' }]}>
              {Props?.title}
            </Text>

            <TextInput
              style={[styles.input, { minHeight: inputHeight }]}
              value={value}
              onChangeText={onChangeText}
              onContentSizeChange={(e) => {
                const newHeight = e.nativeEvent.contentSize.height;
                setInputHeight(newHeight);
                if (newHeight > 0) {
                  setTimeout(() => {}, 100);
                }
              }}
              scrollEnabled={false}
              {...Props}
            />
          </View>
          {/* <Pressable
            style={{
              position: 'absolute',
              right: 10,
              top: Platform.OS === 'ios' ? 15 : 18,
            }}
          >
            <GradientText
              text="Check"
              style={{ fontSize: 10, fontFamily: fontFamily.semiBold }}
            />
          </Pressable> */}
        </View>
      </LinearGradient>
      {Props?.error && <Text style={styles.error}>{Props.error}</Text>}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  rightIconContainer: {
    paddingLeft: 16,
    paddingRight: 12,
    top: Platform.OS === 'ios' ? 15 : 18
  },

  gradientBorder: {
    padding: 1,
    borderRadius: 12,
  },
  inputWrapper: {
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: colors.darkBlue,
    opacity: 0.92,
    overlayColor: 'hidden',

    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  input: {
    fontSize: 14,
    color: colors.white,
    borderRadius: 10,
    fontFamily: fontFamily.medium,
    paddingVertical: 0,
    textAlign: 'left',
    alignSelf: 'stretch',
    textAlignVertical:"top"
    // zIndex:5
  },
  inputColumn: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontFamily: fontFamily.regular,
    fontSize: 11,
    letterSpacing: 0,
    color: colors.textGray,
    left: Platform.OS === 'ios' ? 0 : 3,
    top: Platform.OS === 'ios' ? 6 : 6,
    paddingBottom: 5,//this
  },
  error: {
    fontSize: 12,
    fontFamily: fontFamily.medium,
    color: '#BC1948',
    left: 10,
  },
});


export default React.memo(InputBox);
