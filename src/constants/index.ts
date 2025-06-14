import { Dimensions } from "react-native";

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
} as const;

export type SpacingKey = keyof typeof spacing;
export type SpacingValue = (typeof spacing)[SpacingKey];

export const buttonHeight:number = 41;
export const HEADER_HEIGHT = 115

export const GLOBAL_WIDTH = Dimensions.get('window').width
export const GLOBAL_HEIGHT = Dimensions.get('window').height;

export const  MEDIA_HEIGHT = GLOBAL_HEIGHT * 0.4


export function isValidURL(url:string) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}