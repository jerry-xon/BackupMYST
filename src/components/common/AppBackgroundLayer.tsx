import React from 'react';
import {
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Dot from '@assets/icons/svg/Dots.svg';
import Arc from '@assets/icons/svg/Arc.svg';
import { colors } from 'src/themes/colors';

interface AppBackgroundLayerProps {
  scroll?: boolean;
  children?: React.ReactNode;
  arc?: boolean;
  dots?: boolean;
  avoidKeyboardScroll?: boolean;
  stickyHeader?: React.ComponentType<any> | undefined;
  status?: 'ScrollView' | 'KeyboardAwareScrollView' |'None';
}

const AppBackgroundLayer: React.FC<AppBackgroundLayerProps> = (Props) => {
  const { scroll = false, children,status = "KeyboardAwareScrollView" ,...props } = Props
  return (
    <View style={styles.container}>
      <View style={styles.backgroundLayer}>
        <ImageBackground
          source={require('../../../assets/icons/Background.png')}
          style={StyleSheet.absoluteFillObject}
          resizeMode="cover"
        />
        {props?.arc && (
          <View style={[styles.dotWrapper, { left: 0 }]}>
            <Arc />
          </View>
        )}

        {props?.dots && (
          <View style={styles.dotWrapper}>
            <Dot />
          </View>
        )}
      </View>

      {!!Props.avoidKeyboardScroll ? (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.nonScrollView}>{children}</View>
        </TouchableWithoutFeedback>
      ) : status === 'ScrollView' ? (
        <ScrollView contentContainerStyle={{flexGrow:1}}>
          <View style={{ flex: 1 }}>{children}</View>
        </ScrollView>
      ) : (
        <KeyboardAwareScrollView
          contentContainerStyle={[
            styles.contentContainerStyle,
            { flexGrow: 1 },
          ]}
          enableOnAndroid
          enableAutomaticScroll={true}
          keyboardShouldPersistTaps="handled"
          extraScrollHeight={Platform.OS === 'android' ? 50 : 0}
          keyboardOpeningTime={0}
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={Props.stickyHeader ? [0] : []}
          bounces={false}
        >
          {Props.stickyHeader && <Props.stickyHeader />}
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex: 1 }}>{children}</View>
          </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
      )}
    </View>
  );
};

export default AppBackgroundLayer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBlue,
  },
  flex: {
    flex: 1,
  },
  contentContainerStyle: {
    flexGrow: 1,
  },
  nonScrollView: {
    flex: 1,
  },
  backgroundLayer: {
   height: '100%',
   width: '100%',
   position: 'absolute',
  },
  dotWrapper: {
    position: 'absolute',
    top: 60,
    right: 0,
  },
});
