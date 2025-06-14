import React from 'react';
import { Text, StyleSheet, StyleProp, TextStyle } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from 'src/themes/colors';

const GradientText = ({ text ,style }: { text: string ,style:StyleProp<TextStyle> }) => {
  return (
    <MaskedView maskElement={<Text style={[styles.text, style]}>{text}</Text>}>
      <LinearGradient
        colors={colors.linearGradient.activeInputBox as [string , string]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Text style={[styles.text, { opacity: 0 }, style]}>{text}</Text>
      </LinearGradient>
    </MaskedView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
  },
});

export default GradientText;
