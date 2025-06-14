import React from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  StyleProp,
  LayoutChangeEvent,
} from 'react-native';
import Svg, {
  Defs,
  LinearGradient,
  Stop,
  Circle,
  Rect,
} from 'react-native-svg';

interface GradientRingProps {
  children: React.ReactNode;
  strokeWidth?: number;
  gradientColors?: string[];
  active?: boolean;
  isCircular?: boolean;
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
}

const GradientRing: React.FC<GradientRingProps> = ({
  children,
  strokeWidth = 3,
  gradientColors = ['#feda75', '#fa7e1e', '#d62976', '#962fbf', '#4f5bd5'],
  active = true,
  isCircular = false,
  borderRadius = 12,
  style,
}) => {
  const [layout, setLayout] = React.useState({ width: 0, height: 0 });

  const onLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    if (width !== layout.width || height !== layout.height) {
      setLayout({ width, height });
    }
  };

  const { width, height } = layout;
  const halfStroke = strokeWidth / 2;

  return (
    <View onLayout={onLayout} style={[style, { position: 'relative' }]}>
      {width > 0 && height > 0 && (
        <Svg
          width={width}
          height={height}
          style={StyleSheet.absoluteFill}
          pointerEvents="none"
        >
          <Defs>
            <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
              {gradientColors.map((color, idx) => (
                <Stop
                  key={idx}
                  offset={`${(idx / (gradientColors.length - 1)) * 100}%`}
                  stopColor={color}
                />
              ))}
            </LinearGradient>
          </Defs>

          {isCircular ? (
            <Circle
              cx={width / 2}
              cy={height / 2}
              r={(Math.min(width, height) - strokeWidth) / 2}
              stroke={active ? 'url(#grad)' : '#ccc'}
              strokeWidth={strokeWidth}
              fill="none"
            />
          ) : (
            <Rect
              x={halfStroke}
              y={halfStroke}
              width={width - strokeWidth}
              height={height - strokeWidth}
              rx={borderRadius}
              ry={borderRadius}
              stroke={active ? 'url(#grad)' : '#ccc'}
              strokeWidth={strokeWidth}
              fill="none"
            />
          )}
        </Svg>
      )}

      <View
        style={{
          overflow: 'hidden',
          borderRadius: isCircular
            ? Math.min(width, height) / 2 - strokeWidth
            : borderRadius,
        }}
      >
        {children}
      </View>
    </View>
  );
};

export default GradientRing;
