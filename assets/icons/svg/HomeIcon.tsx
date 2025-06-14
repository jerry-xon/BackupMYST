import React from 'react';
import Svg, { Mask, Rect, G, Path, Defs } from 'react-native-svg';

type Props = {
  fill?: string; // fill color (default: white)
  bg?: string; // background color (default: transparent)
};

const HomeIcon = ({ fill = 'white', bg = 'transparent' }: Props) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Defs>
        <Mask
          id="mask0_284_629"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="24"
          height="24"
        >
          <Rect width="24" height="24" fill="#D9D9D9" />
        </Mask>
      </Defs>
      <G mask="url(#mask0_284_629)">
        <Path
          d="M6 19H9V13H15V19H18V10L12 5.5L6 10V19ZM4 21V9L12 3L20 9V21H13V15H11V21H4Z"
          fill={bg}
        />
        <Path
          d="M6 19H9V13H15V19H18V10L12 5.5L6 10V19ZM4 21V9L12 3L20 9V21H13V15H11V21H4Z"
          fill={fill}
        />
      </G>
    </Svg>
  );
};

export default HomeIcon;
