import { Pressable, SafeAreaView, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'
import { HEADER_HEIGHT, SpacingKey, SpacingValue } from 'src/constants'
import { colors } from 'src/themes/colors'
import UserImage from './UserImage'
import Morning from '@assets/icons/svg/Morning.svg'
import { fontFamily } from 'src/themes/typography'
import RNButton from './RNButton'
import Notification  from '@assets/icons/svg/Notification.svg'
import Reward from '@assets/icons/svg/Reward.svg';
import Animated, { FadeIn, FadeInLeft, FadeInRight, FadeOut, ZoomIn } from 'react-native-reanimated'


interface HeaderProps {
  key?: string;
  hSpace?: SpacingValue;
  onPressRigth?:(e:1|2)=>void
}

const Header = (Props:HeaderProps) => {

  const continerStyle:ViewStyle  = {
    ...styles.container,
    marginHorizontal:Props.hSpace
  }

  return (
    <View style={[continerStyle]}>
      <View style={styles.row}>
        <Animated.View entering={FadeInLeft.delay(120)} exiting={FadeInRight} >
          <UserImage
            source={require('../../../assets/icons/user.png')}
            height={45}
            gradientStatus="None"
          />
        </Animated.View>
        <View style={styles.firstColumns}>
          <View style={styles.rowTitleContainer}>
            <Morning />
            <Animated.Text
              entering={ZoomIn.delay(200)}
              style={styles.dayStatusText}
            >
              Good Morning
            </Animated.Text>
          </View>
          <Animated.Text
            entering={ZoomIn.delay(200)}
            style={styles.userNameText}
          >
            Savan Soni
          </Animated.Text>
        </View>
        <View style={styles.rightIconsContainer}>
          <RNButton
            titleAsChildren={<Notification />}
            active={true}
            diabelGradient={true}
            onPress={()=>Props.onPressRigth!(1)}
          />
          <RNButton
            titleAsChildren={<Reward />}
            active={true}
            diabelGradient={true}
          />
        </View>
      </View>
    </View>
  );
}

export default Header

const styles = StyleSheet.create({
  container: {
    height: HEADER_HEIGHT,
    justifyContent: 'flex-end',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  firstColumns: {
    marginLeft: 10,
    flex: 1,
    alignSelf: 'stretch',
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
    fontFamily: fontFamily.akira,
    color: colors.white,
  },
  rightIconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});