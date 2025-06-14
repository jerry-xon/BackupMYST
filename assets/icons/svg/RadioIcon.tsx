import React from 'react';
import Svg, { Circle } from 'react-native-svg';

interface RadioIconProps {
  active?: boolean;
  size?: number;
}

const RadioIcon: React.FC<RadioIconProps> = ({ active = false, size = 20 }) => {
  const strokeColor = active ? '#ffffff' : '#C4C4C4';

  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      {/* Outer circle */}
      <Circle cx="10" cy="10" r="9" stroke={strokeColor} strokeWidth="2" />

      {/* Inner filled circle only if active */}
      {active && <Circle cx="10" cy="10" r="5" fill="#ffffff" />}
    </Svg>
  );
};

export default RadioIcon;
