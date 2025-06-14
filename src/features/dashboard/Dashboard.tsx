import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppBackgroundLayer from 'src/components/common/AppBackgroundLayer';
import Header from 'src/components/common/Header';
import { spacing } from 'src/constants';
import UserStories from 'src/components/common/UserStories';
import Categories from 'src/components/common/Categories';
import { useOnboardProfileController } from '@features/profile/OnboardProfileController';
import { fontFamily } from 'src/themes/typography';
import { colors } from 'src/themes/colors';
import GradientText from 'src/components/common/Gardient';
import RNButton from 'src/components/common/RNButton';
import TrendingVideosList from 'src/components/common/TrendingVideosList';
import Post from 'src/components/common/Post';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from 'src/navigation/types';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeIn, FadeInLeft, FadeInRight } from 'react-native-reanimated';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

type DashboardNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  'Dashboard'
>;

const Dashboard = () => {

  const navigation = useNavigation<DashboardNavigationProp>();

    const {
      categories,
      onSelectCategories,
      selectedCategories,
    } = useOnboardProfileController();
    

    const trendingVideos = ()=>{
        return (
          <View >
            <View style={styles.tradingViewContainer}>
              <Animated.Text entering={FadeInLeft.delay(400)} style={styles.tradingTitle}>Trending Videos</Animated.Text>
              <RNButton
                titleAsChildren={
                  <GradientText text="VIEW ALL" style={styles.viewAllText} />
                }
                active={true}
                diabelGradient={true}
                entering={FadeInRight.delay(400)}
              />
            </View>
            <TrendingVideosList />
          </View>
        );
    }

  return (
    <AppBackgroundLayer status='ScrollView'>
      <View style={styles.main}>
        <Header
          hSpace={spacing.md}
          onPressRigth={() =>
            navigation.navigate('OnboardProfile', { userId: '2' })
          }
        />
        <UserStories />

        <Categories
          data={categories}
          onSelect={onSelectCategories}
          active={selectedCategories}
        />
        {trendingVideos()}
        <View style={styles.postSection}>
          <Post
            type="Video"
            onPress={() => {
              navigation.navigate('Profile');
            }}
          />
          <Post
            type="Video"
            onPress={() => {
              navigation.navigate('Profile');
            }}
          />
          <Post
            type="Video"
            onPress={() => {
              navigation.navigate('Profile');
            }}
          />
        </View>
      </View>
    </AppBackgroundLayer>
  );
}

export default Dashboard

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingTop:20
  },
  tradingViewContainer: {
    flexDirection: 'row',
    marginHorizontal: spacing.lg,
    justifyContent: 'space-between',
    alignItems:"center",
    marginBottom:spacing.md
  },
  tradingTitle: {
    fontSize: 18,
    fontFamily: fontFamily.akira,
    color: colors.white,
  },
  viewAllText: {
    fontSize: 12,
    fontFamily: fontFamily.medium,
    color: colors.white,
    letterSpacing:1
  },
  postSection:{
    flex:1,
    marginVertical:spacing.lg
  }
});