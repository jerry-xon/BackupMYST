import React from 'react';
import Svg, { Rect, G, Path, Mask, Defs } from 'react-native-svg';

type Props = {
  fill?: string;
};

const UploadMediaIcon = ({ fill = 'rgba(255,255,255,0.5)' }: Props) => {
  return (
    <Svg width={25} height={24} viewBox="0 0 25 24" fill="none">
      <Defs>
        <Mask
          id="mask0"
          maskUnits="userSpaceOnUse"
          x={0}
          y={0}
          width={25}
          height={24}
        >
          <Rect x={0.5} width={24} height={24} fill="#D9D9D9" />
        </Mask>
      </Defs>
      <G mask="url(#mask0)">
        <Path
          d="M11.5 17H13.5V13H17.5V11H13.5V7H11.5V11H7.5V13H11.5V17ZM5.5 21C4.95 21 4.47917 20.8042 4.0875 20.4125C3.69583 20.0208 3.5 19.55 3.5 19V5C3.5 4.45 3.69583 3.97917 4.0875 3.5875C4.47917 3.19583 4.95 3 5.5 3H19.5C20.05 3 20.5208 3.19583 20.9125 3.5875C21.3042 3.97917 21.5 4.45 21.5 5V19C21.5 19.55 21.3042 20.0208 20.9125 20.4125C20.5208 20.8042 20.05 21 19.5 21H5.5ZM5.5 19H19.5V5H5.5V19Z"
          fill={fill}
        />
      </G>
    </Svg>
  );
};

export default UploadMediaIcon;
