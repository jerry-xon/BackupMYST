import React, { useRef, useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from 'src/themes/colors';
import { fontFamily } from 'src/themes/typography';
import Animated, { FadeInLeft, FadeInRight } from 'react-native-reanimated';

interface OTPInputProps {
  length?: number;
  onChangeOTP: (otp: string) => void;
  inputProps?: TextInputProps;
  viewStyle?:StyleProp<ViewStyle>
}

const OTPInput: React.FC<OTPInputProps> = ({
  length = 6,
  onChangeOTP,
  inputProps,
}) => {
  const [otpValues, setOtpValues] = useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const handleChange = (text: string, index: number) => {
    let newOtp = [...otpValues];
    const characters = text.split('');

    if (characters.length === length) {
      newOtp = characters.slice(0, length);
    } else {
      newOtp[index] = characters[0] || '';
    }

    setOtpValues(newOtp);
    onChangeOTP(newOtp.join(''));

    if (characters.length === 1 && index < length - 1) {
      // Delay focus to allow next input to become editable
      setTimeout(() => {
        if (newOtp[index] && newOtp[index + 1] === '') {
          inputRefs.current[index + 1]?.focus();
        }
      }, 100);
    }

    if (characters.length === length) {
      inputRefs.current[length - 1]?.blur();
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => {
    if (e.nativeEvent.key === 'Backspace' && otpValues[index] === '') {
      if (index > 0) inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      {otpValues.map((val, i) => (
        <Animated.View key={String(i)} entering={FadeInLeft.delay(140 * i)} >
          <LinearGradient
            key={i}
            colors={
              !val
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
              <TextInput
                style={styles.input}
                keyboardType="number-pad"
                editable={i === 0 || otpValues[i - 1] !== ''}
                maxLength={1}
                value={val}
                ref={(ref) => {
                  inputRefs.current[i] = ref;
                }}
                onChangeText={(text) => handleChange(text, i)}
                onKeyPress={(e) => handleKeyPress(e, i)}
                {...inputProps}
              />
            </View>
          </LinearGradient>
        </Animated.View>
      ))}
    </View>
  );
};

export default OTPInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 32,
  },
  gradientBorder: {
    padding: 1,
    borderRadius: 12,
  },
  inputWrapper: {
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: colors.darkBlue,
    opacity:0.92,
    overlayColor:"hidden"
  },
  input: {
    width: 45,
    height: 45,
    fontSize: 14,
    textAlign: 'center',
    color: 'white',
    borderRadius: 10,
    paddingVertical: 0,
    fontFamily:fontFamily.medium
  },
});
