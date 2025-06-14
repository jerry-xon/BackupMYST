import { MD3LightTheme as DefaultTheme, MD3Theme } from 'react-native-paper';

export const colors: MD3Theme['colors'] & {
  screenBG: string;
  lightWhite: string;
  white: string;
  darkBlue: string;
  darkBlack: string;
  black: string;
  borders: {
    primary: string;
  };
  input: {
    primary: string;
  };
  linearGradient: {
    activeInputBox: string[];
    pinkGradient: string[];
  };
  blurBlue: string;
  blurBorderColor:string,
  textGray:string
} = {
  ...DefaultTheme.colors,
  primary: '#E4122F',
  screenBG: '#FFFFFF',
  white: '#fff',
  darkBlue: '#000428',
  darkBlack: '#111719',
  black: '#000',
  borders: {
    primary: '#EEEEEE',
  },
  input: {
    primary: '#C4C4C4',
  },
  linearGradient: {
    activeInputBox: ['#B2FEFA', '#0ED2F7'],
    pinkGradient: ['#E8467C', '#BC1948'],
  },
  blurBlue: '#FFFFFF0D',
  lightWhite: '#FFFFFFB2',
  blurBorderColor: '#FFFFFF19',
  textGray:"grey"
};
