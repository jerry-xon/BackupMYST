import { CameraMediaItem } from "src/hooks/useDeviceMedia";

export type MainRoots = {
  Tabs: undefined;
  EditCover: { video: CameraMediaItem | null; url: string };
  MediaInformation: { video: CameraMediaItem | null };
  Profile: undefined;
  AuthFlow: undefined;
  OTP: undefined;
  OnboardProfile: { userId: string };
  Splash: undefined;
  LoginSignup: undefined;
  PhoneNumber: undefined;
  ReelPlayer: undefined;
  ReelsScreen: undefined;
  InviteScreen: undefined;
  Wallet: undefined;
};

export type RootStackParamList = MainRoots & {
  OTP: undefined;
  OnboardProfile: { userId: string };
  Splash: undefined;
  LoginSignup: undefined;
  PhoneNumber: undefined;
  ReelPlayer: undefined;
  ReelsScreen: undefined;
  InviteScreen: undefined;
  Wallet: undefined;
};

export type MainStackParamList = {
  Dashboard: undefined;
  OnboardProfile: { userId: string };
  VideoLibrary: undefined;
  EditCover: { video: CameraMediaItem | null ,url: string };
  MediaInformation: { video: CameraMediaItem | null };
  Profile: undefined;
  ReelsScreen: undefined;
};

export type RootTabParamList = {
  Home: undefined;
  Search: { userId: string };
  UploadMedia:undefined;
  VideoLibrary:undefined;
  Balance:undefined
  OTP: undefined;
  Wallet: undefined;
};
