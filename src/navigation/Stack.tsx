import Dashboard from '@features/dashboard/Dashboard';

import { MainStackParamList, RootStackParamList } from './types';
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OTP from "@features/otp/OTP";
import OnboardProfile from "@features/profile/OnboardProfile";
import PhoneNumber from "@features/phonenumber/PhoneNumber";
import { ReelsScreen } from "@features/reelscreen/ReelsScreen";
import { CustomSplashScreen } from '@features/splash/CustomSplashScreen';
import LoginSignup from '@features/loginsignup/LoginSignup';
import InviteScreen from "@features/invitation/InviteScreen";
import Wallet from "@features/wallet/Wallet";

const Stack = createNativeStackNavigator<RootStackParamList>();
const MainNavigator = createNativeStackNavigator<MainStackParamList>();


export const RootStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{ headerShown: false, animation: 'fade_from_bottom' }}
    >
      <Stack.Screen name="Splash" component={CustomSplashScreen} />
      <Stack.Screen name="OTP" component={OTP} />
      <Stack.Screen name="InviteScreen" component={InviteScreen} />
      <Stack.Screen name="ReelsScreen" component={ReelsScreen} />
      <Stack.Screen name="PhoneNumber" component={PhoneNumber} />
      <Stack.Screen name="LoginSignup" component={LoginSignup} />
      <Stack.Screen name="OnboardProfile" component={OnboardProfile} />
      <Stack.Screen name="Wallet" component={Wallet} />
    </Stack.Navigator>
  );
};


export const MainStack = () => {
  return (
    <MainNavigator.Navigator
      initialRouteName="OnboardProfile"
      screenOptions={{
        headerShown: false,
        animation: 'fade_from_bottom',
      }}
    >
      <MainNavigator.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          animation: 'fade_from_bottom',
        }}
      />
      <MainNavigator.Screen name="OnboardProfile" component={OnboardProfile} />
      <MainNavigator.Screen name="ReelsScreen" component={ReelsScreen} />
    </MainNavigator.Navigator>
  );
};
