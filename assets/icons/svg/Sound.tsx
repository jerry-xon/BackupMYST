import React from 'react';
import Svg, { Rect, Mask, G, Path, Line, Defs } from 'react-native-svg';

interface SoundIconProps {
  size?: number;
  color?: string;
  isMuted?: boolean;
}

const SoundIcon: React.FC<SoundIconProps> = ({
  size = 32,
  color = 'white',
  isMuted = false,
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      {/* Background Circle */}
      <Rect width="32" height="32" rx="16" fill="black" fillOpacity="0" />

      {/* Mask for main icon shape */}
      <Mask
        id="soundMask"
        maskUnits="userSpaceOnUse"
        x="8"
        y="8"
        width="16"
        height="16"
      >
        <Rect x="8" y="8" width="16" height="16" fill="#D9D9D9" />
      </Mask>

      {/* Sound Icon Shape */}
      <G mask="url(#soundMask)">
        <Path
          d="M17.3333 21.8166V20.4499C18.3333 20.161 19.1389 19.6055 19.75 18.7832C20.3611 17.961 20.6667 17.0277 20.6667 15.9832C20.6667 14.9388 20.3611 14.0055 19.75 13.1832C19.1389 12.361 18.3333 11.8055 17.3333 11.5166V10.1499C18.7111 10.461 19.8333 11.1582 20.7 12.2416C21.5667 13.3249 22 14.5721 22 15.9832C22 17.3943 21.5667 18.6416 20.7 19.7249C19.8333 20.8082 18.7111 21.5055 17.3333 21.8166ZM10 17.9999V13.9999H12.6667L16 10.6666V21.3332L12.6667 17.9999H10ZM17.3333 18.6666V13.2999C17.8556 13.5443 18.2639 13.911 18.5583 14.3999C18.8528 14.8888 19 15.4221 19 15.9999C19 16.5666 18.8528 17.0916 18.5583 17.5749C18.2639 18.0582 17.8556 18.4221 17.3333 18.6666ZM14.6667 13.8999L13.2333 15.3332H11.3333V16.6666H13.2333L14.6667 18.0999V13.8999Z"
          fill={color}
        />
      </G>

      {/* Diagonal Slash Line for Muted */}
      {isMuted && (
        <Line
          x1="8"
          y1="8"
          x2="24"
          y2="24"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        />
      )}
    </Svg>
  );
};

export default SoundIcon;
