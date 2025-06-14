import { TextStyle } from "react-native";


export const fontFamily = {
  thin: 'Montserrat_100Thin',
  thinItalic: 'Montserrat_100Thin_Italic',
  extraLight: 'Montserrat_200ExtraLight',
  extraLightItalic: 'Montserrat_200ExtraLight_Italic',
  light: 'Montserrat_300Light',
  lightItalic: 'Montserrat_300Light_Italic',
  regular: 'Montserrat_400Regular',
  medium: 'Montserrat_500Medium',
  mediumItalic: 'Montserrat_500Medium_Italic',
  semiBold: 'Montserrat_600SemiBold',
  semiBoldItalic: 'Montserrat_600SemiBold_Italic',
  bold: 'Montserrat_700Bold',
  boldItalic: 'Montserrat_700Bold_Italic',
  extraBold: 'Montserrat_800ExtraBold',
  extraBoldItalic: 'Montserrat_800ExtraBold_Italic',
  black: 'Montserrat_900Black',
  blackItalic: 'Montserrat_900Black_Italic',
  akira:"Akira"
} as const;

export type FontFamilyKey = keyof typeof fontFamily;
export type FontFamilyValue = (typeof fontFamily)[FontFamilyKey];


type TypographyVariant =
  | "heading1"
  | "heading2"
  | "body"
  | "caption"
  | "button"
  | "label"
  | "heading3";

export const typography: Record<TypographyVariant, TextStyle> = {
  heading1: {
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 40,
    fontFamily: fontFamily.bold,
  },
  heading3: {
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 40,
    fontFamily: fontFamily.bold,
  },
  heading2: {
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 32,
    fontFamily: fontFamily.semiBold,
  },
  body: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    fontFamily: fontFamily.regular,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    fontFamily: fontFamily.regular,
  },
  button: {
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
    fontFamily: fontFamily.semiBold,
  },
  label: {
    fontSize: 10,
    fontWeight: '400',
    fontFamily: fontFamily.regular,
  },
};

export type { TypographyVariant };
