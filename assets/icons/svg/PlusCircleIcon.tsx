import React from 'react';
import Svg, {
  Rect,
  Mask,
  G,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';

interface PlusInCircleIconProps {
    height?:number,
    width?:number
}

const PlusInCircleIcon = (Props:PlusInCircleIconProps) => (

  <Svg width={Props.height ? Props.height :19} height= {Props.width ? Props.width : 18} viewBox="0 0 19 18" fill="none">
    <Rect x="0.6875" width="18" height="18" rx="9" fill="url(#paint0_linear)" />
    <Mask
      id="mask0"
      maskUnits="userSpaceOnUse"
      x="3"
      y="3"
      width="13"
      height="12"
    >
      <Rect x="3.6875" y="3" width="12" height="12" fill="#D9D9D9" />
    </Mask>
    <G mask="url(#mask0)">
      <Path
        d="M9.1875 11.5H10.1875V9.5H12.1875V8.5H10.1875V6.5H9.1875V8.5H7.1875V9.5H9.1875V11.5ZM9.6875 14C8.99583 14 8.34583 13.8687 7.7375 13.6062C7.12917 13.3438 6.6 12.9875 6.15 12.5375C5.7 12.0875 5.34375 11.5583 5.08125 10.95C4.81875 10.3417 4.6875 9.69167 4.6875 9C4.6875 8.30833 4.81875 7.65833 5.08125 7.05C5.34375 6.44167 5.7 5.9125 6.15 5.4625C6.6 5.0125 7.12917 4.65625 7.7375 4.39375C8.34583 4.13125 8.99583 4 9.6875 4C10.3792 4 11.0292 4.13125 11.6375 4.39375C12.2458 4.65625 12.775 5.0125 13.225 5.4625C13.675 5.9125 14.0312 6.44167 14.2937 7.05C14.5562 7.65833 14.6875 8.30833 14.6875 9C14.6875 9.69167 14.5562 10.3417 14.2937 10.95C14.0312 11.5583 13.675 12.0875 13.225 12.5375C12.775 12.9875 12.2458 13.3438 11.6375 13.6062C11.0292 13.8687 10.3792 14 9.6875 14ZM9.6875 13C10.8042 13 11.75 12.6125 12.525 11.8375C13.3 11.0625 13.6875 10.1167 13.6875 9C13.6875 7.88333 13.3 6.9375 12.525 6.1625C11.75 5.3875 10.8042 5 9.6875 5C8.57083 5 7.625 5.3875 6.85 6.1625C6.075 6.9375 5.6875 7.88333 5.6875 9C5.6875 10.1167 6.075 11.0625 6.85 11.8375C7.625 12.6125 8.57083 13 9.6875 13Z"
        fill="white"
      />
    </G>
    <Defs>
      <LinearGradient
        id="paint0_linear"
        x1="-5.13192"
        y1="7.54328"
        x2="19.0852"
        y2="26.2257"
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#E8467C" />
        <Stop offset="1" stopColor="#BC1948" />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default PlusInCircleIcon;
