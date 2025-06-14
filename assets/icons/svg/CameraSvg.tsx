// CameraIcon.tsx
import React from 'react';
import Svg, { Path } from 'react-native-svg';

const CameraIcon = ({ size = 24, color = 'white' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 17a4.998 4.998 0 1 0 0-10 4.998 4.998 0 0 0 0 10Zm0-8.2A3.202 3.202 0 1 1 8.8 12 3.207 3.207 0 0 1 12 8.8ZM20 5h-3.172l-1.414-1.414A2 2 0 0 0 13.172 3h-2.344a2 2 0 0 0-1.414.586L8 5H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Zm0 14H4V7h4.586l1.707-1.707a.996.996 0 0 1 .707-.293h2.344c.266 0 .52.105.707.293L15.414 7H20v12Z"
      fill={color}
    />
  </Svg>
);

export default CameraIcon;
