import React from 'react';
import Svg, { Path } from 'react-native-svg';

type Props = {
  fill?: string; // dynamic color (default semi-transparent white)
};

const AddSvg = ({ fill = 'rgba(255,255,255,0.5)' }: Props) => {
  return (
    <Svg width="19" height="18" viewBox="0 0 19 18" fill="none">
      <Path
        d="M8.5 14H10.5V10H14.5V8H10.5V4H8.5V8H4.5V10H8.5V14ZM2.5 18C1.95 18 1.47917 17.8042 1.0875 17.4125C0.695833 17.0208 0.5 16.55 0.5 16V2C0.5 1.45 0.695833 0.979167 1.0875 0.5875C1.47917 0.195833 1.95 0 2.5 0H16.5C17.05 0 17.5208 0.195833 17.9125 0.5875C18.3042 0.979167 18.5 1.45 18.5 2V16C18.5 16.55 18.3042 17.0208 17.9125 17.4125C17.5208 17.8042 17.05 18 16.5 18H2.5ZM2.5 16H16.5V2H2.5V16Z"
        fill={fill}
      />
    </Svg>
  );
};

export default AddSvg;
