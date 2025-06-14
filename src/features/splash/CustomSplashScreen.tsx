import React, { useEffect } from 'react';
import { ImageBackground, Text, View, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { useNavigation } from '@react-navigation/native';

type SplashScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Splash'
>;

export const CustomSplashScreen = () => {
  const navigation = useNavigation<SplashScreenNavigationProp>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('LoginSignup');
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <ImageBackground
      source={require('@assets/Splashbg.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.content}>
        <Text style={styles.title}>MYST</Text>
        <Text style={styles.subtitle}>Monetize Your Screen Time ⏳</Text>
        <Text style={styles.madeIn}>
          Made in INDIA ❤️{'\n'}Made for World 🌍
        </Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 48,
    color: '#fff',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    marginTop: 8,
  },
  madeIn: {
    position: 'absolute',
    bottom: 40,
    textAlign: 'center',
    color: '#fff',
    fontSize: 14,
  },
});
