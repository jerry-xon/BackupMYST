import React from 'react';
import Svg, { Rect, Mask, G, Path, SvgProps } from 'react-native-svg';

interface CustomGridIconProps extends SvgProps {
  fill?: string;
  width?: number;
  height?: number;
}

const CustomGridIcon: React.FC<CustomGridIconProps> = ({
  fill = 'white',
  width = 24,
  height = 24,
  ...props
}) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" {...props}>
    <Mask
      id="mask0"
      maskUnits="userSpaceOnUse"
      x={0}
      y={0}
      width={24}
      height={24}
    >
      <Rect width={24} height={24} fill="#D9D9D9" />
    </Mask>
    <G mask="url(#mask0)">
      <Path
        d="M3 11V3H11V11H3ZM3 21V13H11V21H3ZM13 11V3H21V11H13ZM13 21V13H21V21H13ZM5 9H9V5H5V9ZM15 9H19V5H15V9ZM15 19H19V15H15V19ZM5 19H9V15H5V19Z"
        fill={fill}
      />
    </G>
  </Svg>
);

export default CustomGridIcon;
