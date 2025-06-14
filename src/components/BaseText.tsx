import React from "react";
import { Text, TextStyle, TextProps, StyleProp } from "react-native";
import { typography, TypographyVariant } from "../themes/typography";

type BaseTextProps = {
  children: React.ReactNode;
  variant?: TypographyVariant;
  color?: string;
  weight?: TextStyle["fontWeight"];
  numberOfLines?: number;
  style?: StyleProp<TextStyle>;
} & TextProps;

export const BaseText: React.FC<BaseTextProps> = ({
  children,
  variant = "body",
  color,
  weight,
  numberOfLines,
  style,
  ...props
}) => {
  const textStyle: TextStyle = {
    ...typography[variant],
    ...(color && { color }),
    ...(weight && { fontWeight: weight }),
  };

  return (
    <Text
      numberOfLines={numberOfLines}
      style={[textStyle, style]}
      {...props}
    >
      {children}
    </Text>
  );
};
