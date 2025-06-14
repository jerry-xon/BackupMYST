import { Image, Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import React from 'react';
import {SpacingValue } from 'src/constants';
import { colors } from 'src/themes/colors';
import { fontFamily } from 'src/themes/typography';
import RNButton from './RNButton';
import Menu from '@assets/icons/svg/Menu.svg';
import Weather from '@assets/icons/svg/Weather.svg';
import Animated, { FadeInLeft, FadeInRight, ZoomIn } from 'react-native-reanimated';
import GradientRing from './Ring';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

const height = 60

interface PostHeaderProps {
  key?: string;
  hSpace?: SpacingValue;
  vSpace?: SpacingValue;
  onPressProfile?:()=>void
}

const PostHeader = (Props: PostHeaderProps) => {


  const onPressProfile = ()=>{
    if(Props.onPressProfile !== undefined) {
      Props.onPressProfile()
    }
  }

  const continerStyle: ViewStyle = {
    ...styles.container,
    marginHorizontal: Props.hSpace,
    marginVertical:Props.vSpace
  };

  return (
    <View style={[continerStyle]}>
      <View style={styles.row}>
        <AnimatedPressable entering={FadeInLeft.delay(120)} onPress={onPressProfile} >
          <GradientRing
            borderRadius={40}
            active={false}
            style={{
              height: height * 0.9,
              width: height * 0.9,
            }}
          >
            <Image
              source={{ uri: 'https://i.pravatar.cc/100' }}
              style={{
                width: '100%',
                height: '100%',
                alignSelf: 'center',
                backgroundColor: 'grey',
              }}
              resizeMode="cover"
            />
          </GradientRing>
        </AnimatedPressable>

        <View style={styles.firstColumns}>
          <Animated.Text
            entering={ZoomIn.delay(200)}
            style={styles.userNameText}
          >
            Savan Soni
          </Animated.Text>
          <Animated.View
            entering={ZoomIn.delay(250)}
            style={styles.rowTitleContainer}
          >
            <Weather />
            <Text style={styles.dayStatusText}>Delhi,India</Text>
          </Animated.View>
        </View>
        <View style={styles.rightIconsContainer}>
          <RNButton
            title="Follow"
            active={true}
            mainContainer={{ width: 90 }}
            gradientStyle={{ flex: 0, height: 30 }}
            titleStyle={styles.titleStyle}
            entering={FadeInRight.delay(200)}
          />
          <RNButton
            titleAsChildren={<Menu />}
            active={true}
            diabelGradient={true}
            entering={FadeInRight.delay(200)}
          />
        </View>
      </View>
    </View>
  );
};

export default PostHeader;

const styles = StyleSheet.create({
  container: {
    height: height,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height:"100%"
  },
  firstColumns: {
    marginLeft: 10,
    flex: 1,
    alignSelf: 'stretch',
    justifyContent:"center"
  },
  rowTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  dayStatusText: {
    fontSize: 14,
    fontFamily: fontFamily.medium,
    color: colors.lightWhite,
    marginLeft: 7,
    lineHeight: 20,
  },
  userNameText: {
    fontSize: 18,
    fontFamily: fontFamily.bold,
    color: colors.white,
  },
  rightIconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  titleStyle:{
    fontSize:11
  }
});
