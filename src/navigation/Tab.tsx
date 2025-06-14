import React from 'react';
import { View, Platform, StyleSheet, Pressable } from 'react-native';

import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';
import { RootTabParamList } from './types';
import Dashboard from '@features/dashboard/Dashboard';
import OnboardProfile from '@features/profile/OnboardProfile';
import HomeIcon from '@assets/icons/svg/HomeIcon';

import SearchSvg  from '@assets/icons/svg/SearchIocn'
import UploadMediaIcon from '@assets/icons/svg/UploadMediaIcon';
import VideoLibrary from '@assets/icons/svg/VideoLibraryIcon';

import Balance from '@assets/icons/svg/BalanceIcon';
import { colors } from 'src/themes/colors';
import { fontFamily } from 'src/themes/typography';
import Animated, { FadeInLeft,  useAnimatedStyle,  withTiming,} from 'react-native-reanimated';
import UploadMedia from '@features/uploadmedia/UploadMedia';
import { ReelsScreen } from '@features/reelscreen/ReelsScreen';

// Define your tab param list


const Tab = createBottomTabNavigator<RootTabParamList>();
const AnimatedPessable = Animated.createAnimatedComponent(Pressable);

function MyTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  
  const getIcon = (routeName: string, isFocused: boolean) => {
    const iconColor = !isFocused ? 'rgba(255, 255, 255, 0.5)' : 'white'; // set your default color

    switch (routeName) {
      case 'Home':
        return <HomeIcon fill={iconColor} />; // or color={iconColor}
      case 'Search':
        return <SearchSvg fill={iconColor} />;
      case 'UploadMedia':
        return <UploadMediaIcon fill={iconColor} />;
      case 'VideoLibrary':
        return <VideoLibrary fill={iconColor} />;
      default:
        return <Balance fill={iconColor} />;
    }
  };


  const currentRouteName = state.routes[state.index].name;

  if (currentRouteName === 'UploadMedia') {
    return null; 
  }

  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key] as {
          options: BottomTabNavigationOptions;
        };
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };
        const rContainerStyle = useAnimatedStyle(() => {
          return {
            padding: withTiming(isFocused ? 10 : 8, { duration: 200 }),
          };
        });

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <Pressable
            key={route.key}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
          >
            <Animated.View
              // layout={LinearTransition.springify().mass(0.8)}
              style={[styles.tabContainer, rContainerStyle]}
            >
              <Animated.View>{getIcon(route.name, isFocused)}</Animated.View>
              {isFocused && (
                <Animated.Text
                  entering={FadeInLeft.delay(200)}
                  style={[
                    {
                      ...styles.labelText,
                      color: isFocused ? colors.white : colors.black,
                    },
                  ]}
                >
                  {typeof label === 'function'
                    ? label({
                        focused: isFocused,
                        color: isFocused ? colors.white : colors.black,
                        position: 'below-icon',
                        children: route.name,
                      })
                    : label}
                </Animated.Text>
              )}
            </Animated.View>
          </Pressable>
        );
      })}
    </View>
  );
}


function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        
      }}
      tabBar={(props) => <MyTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={Dashboard} />
      <Tab.Screen name="Search" component={OnboardProfile} />
      <Tab.Screen name="UploadMedia" component={UploadMedia} />
      <Tab.Screen name="VideoLibrary" component={ReelsScreen} />
      <Tab.Screen name="Balance" component={Dashboard} />
    </Tab.Navigator>
  );
}

export default TabNavigator;

const styles = StyleSheet.create({
  container: {
    position: 'absolute', // <-- make it float
    bottom: Platform.OS === 'android' ? 50 : 40, // <-- give margin from bottom if needed
    left: 10,
    right: 10,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.darkBlue, // semi-transparent white
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    elevation: 10, // for Android shadow
    shadowColor: '#000', // for iOS shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:colors.blurBorderColor,
    borderRadius:25,
    gap:5,

  },
  labelText:{
    fontSize:14,
    fontFamily:fontFamily.medium,
    letterSpacing:0.4,
  }
});