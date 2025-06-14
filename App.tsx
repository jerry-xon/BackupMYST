import { StyleSheet } from 'react-native';
import Navigation from './src/navigation/Navigation';
import { useMontserratFonts } from './src/utils';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  const fontsLoaded = useMontserratFonts();

  if (!fontsLoaded) return null;

  return (
    <GestureHandlerRootView>
      <Navigation />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
