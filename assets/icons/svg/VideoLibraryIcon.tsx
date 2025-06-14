import React from 'react';
import Svg, { Mask, Rect, G, Path, Defs } from 'react-native-svg';

interface Props {
  fill?: string;
  width?: number;
  height?: number;
}

const VideoLibraryIcon: React.FC<Props> = ({
  fill = 'white',
  width = 25,
  height = 24,
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 25 24"
      fill="none"
    >
      <Defs>
        <Mask
          id="mask0_474_2338"
          maskUnits="userSpaceOnUse"
          x={0}
          y={0}
          width={25}
          height={24}
        >
          <Rect x={0.75} width={24} height={24} fill="#D9D9D9" />
        </Mask>
      </Defs>
      <G mask="url(#mask0_474_2338)">
        <Path
          d="M12.25 14.5L19.25 10L12.25 5.5V14.5ZM8.75 18C8.2 18 7.72917 17.8042 7.3375 17.4125C6.94583 17.0208 6.75 16.55 6.75 16V4C6.75 3.45 6.94583 2.97917 7.3375 2.5875C7.72917 2.19583 8.2 2 8.75 2H20.75C21.3 2 21.7708 2.19583 22.1625 2.5875C22.5542 2.97917 22.75 3.45 22.75 4V16C22.75 16.55 22.5542 17.0208 22.1625 17.4125C21.7708 17.8042 21.3 18 20.75 18H8.75ZM8.75 16H20.75V4H8.75V16ZM4.75 22C4.2 22 3.72917 21.8042 3.3375 21.4125C2.94583 21.0208 2.75 20.55 2.75 20V6H4.75V20H18.75V22H4.75Z"
          fill={fill}
        />
      </G>
    </Svg>
  );
};

export default VideoLibraryIcon;
