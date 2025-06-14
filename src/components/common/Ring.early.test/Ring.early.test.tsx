
import { Circle } from 'react-native-svg';
import Ring from '../Ring';

// src/components/common/Ring.integration.test.tsx
import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import React from "react";

// src/components/common/Ring.integration.test.tsx
// --- Mocks ---

// 1. MockDimensions interface and initializer
interface MockDimensions {
  get: jest.Mock;
  addEventListener: jest.Mock;
  removeEventListener: jest.Mock;
  set: jest.Mock;
  roundToNearestPixel: jest.Mock;
  width: number;
  height: number;
}

const mockDimensions: MockDimensions = {
  get: jest.fn().mockImplementation((dim: string) => {
    if (dim === 'window') {
      return { width: 375, height: 667 };
    }
    return { width: 0, height: 0 };
  }),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  set: jest.fn(),
  roundToNearestPixel: jest.fn().mockImplementation((n: number) => Math.round(n)),
  width: 375,
  height: 667,
};

// 2. Mock react-native-reanimated hooks and methods
const mockUseSharedValue = jest.fn().mockImplementation((init: number) => {
  return { value: init };
});
const mockUseAnimatedProps = jest.fn().mockImplementation(() => ({}));
const mockWithTiming = jest.fn().mockImplementation((toValue: number) => toValue);
const mockWithRepeat = jest.fn().mockImplementation((animation: any) => animation);

const mockCreateAnimatedComponent = jest.fn().mockImplementation((Component: any) => Component);

// 3. Apply mocks
jest.mock("react-native-reanimated", () => {
  const actual = jest.requireActual("react-native-reanimated");
  return {
    ...actual,
    useSharedValue: mockUseSharedValue,
    useAnimatedProps: mockUseAnimatedProps,
    withTiming: mockWithTiming,
    withRepeat: mockWithRepeat,
    createAnimatedComponent: mockCreateAnimatedComponent,
    default: {
      ...actual,
      createAnimatedComponent: mockCreateAnimatedComponent,
    },
  };
});

jest.mock("react-native", () => {
  const actual = jest.requireActual("react-native");
  return {
    ...actual,
    Dimensions: {
      ...actual.Dimensions,
      get: mockDimensions.get,
      addEventListener: mockDimensions.addEventListener,
      removeEventListener: mockDimensions.removeEventListener,
      set: mockDimensions.set,
      roundToNearestPixel: mockDimensions.roundToNearestPixel,
    },
    StyleSheet: actual.StyleSheet,
    View: actual.View,
    Image: actual.Image,
  };
});

jest.mock("react-native-svg", () => {
  const actual = jest.requireActual("react-native-svg");
  return {
    ...actual,
    Svg: (props: any) => <svg {...props} />,
    Circle: (props: any) => <circle {...props} />,
  };
});

// --- Tests ---

describe('Ring() Ring method', () => {
  // Happy Paths
  describe('Happy paths', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      // Reset mockDimensions to default values
      mockDimensions.get.mockReturnValue({ width: 375, height: 667 } as any);
    });

    it('renders the SVG ring and avatar image correctly', () => {
      // This test ensures the SVG ring and avatar image are rendered as expected.
      render(<Ring />);
      // SVG root
      const svg = screen.getByRole('img', { hidden: true }) || document.querySelector('svg');
      expect(svg).toBeInTheDocument();

      // The static background circle
      const circles = document.querySelectorAll('circle');
      expect(circles.length).toBeGreaterThanOrEqual(1);

      // The avatar image
      const img = document.querySelector('img');
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src', 'https://i.pravatar.cc/100');
      expect(img).toHaveStyle('width: 60px');
      expect(img).toHaveStyle('height: 60px');
      expect(img).toHaveStyle('border-radius: 30px');
    });

    it('calls useSharedValue and useAnimatedProps with correct initial values', () => {
      // This test ensures the animation hooks are called with the expected arguments.
      render(<Ring />);
      expect(jest.mocked(mockUseSharedValue)).toHaveBeenCalledWith(0);
      expect(jest.mocked(mockUseAnimatedProps)).toHaveBeenCalled();
    });

    it('applies correct SVG circle props for ring', () => {
      // This test checks that the SVG circles have the correct props.
      render(<Ring />);
      const circles = document.querySelectorAll('circle');
      // The first circle is the static background
      const staticCircle = circles[0];
      expect(staticCircle).toHaveAttribute('stroke', '#e5e5e5');
      expect(staticCircle).toHaveAttribute('fill', 'none');
      expect(staticCircle).toHaveAttribute('cx', '50');
      expect(staticCircle).toHaveAttribute('cy', '50');
      expect(staticCircle).toHaveAttribute('r', '40');
      expect(staticCircle).toHaveAttribute('stroke-width', '4');
    });

    it('uses Animated.createAnimatedComponent to wrap Circle', () => {
      // This test ensures that Animated.createAnimatedComponent is called with Circle.
      render(<Ring />);
      expect(jest.mocked(mockCreateAnimatedComponent)).toHaveBeenCalledWith(Circle as any);
    });

    it('uses Dimensions.get("window") to determine width', () => {
      // This test ensures that Dimensions.get is called with "window".
      render(<Ring />);
      expect(jest.mocked(mockDimensions.get)).toHaveBeenCalledWith('window');
    });

    it('applies correct strokeDasharray to animated circle', () => {
      // This test checks that the animated circle has the correct strokeDasharray.
      render(<Ring />);
      const circles = document.querySelectorAll('circle');
      // The second circle is the animated one
      const animatedCircle = circles[1];
      // CIRCUMFERENCE = 2 * Math.PI * 40
      const expectedCircumference = (2 * Math.PI * 40).toString();
      expect(animatedCircle).toHaveAttribute('stroke-dasharray', expectedCircumference);
    });

    it('renders the avatar image absolutely positioned', () => {
      // This test ensures the avatar image is absolutely positioned.
      render(<Ring />);
      const img = document.querySelector('img');
      expect(img).toHaveStyle('position: absolute');
    });
  });

  // Edge Cases
  describe('Edge cases', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('handles Dimensions.get returning zero width gracefully', () => {
      // This test ensures the component does not crash if Dimensions.get returns zero width.
      mockDimensions.get.mockReturnValue({ width: 0, height: 0 } as any);
      render(<Ring />);
      // The SVG should still render
      const svg = document.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('handles Dimensions.get returning a very large width', () => {
      // This test ensures the component can handle a very large width.
      mockDimensions.get.mockReturnValue({ width: 10000, height: 10000 } as any);
      render(<Ring />);
      // The SVG should still render
      const svg = document.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('handles useSharedValue returning a non-zero initial value', () => {
      // This test ensures the animation still works if useSharedValue is initialized with a non-zero value.
      mockUseSharedValue.mockImplementationOnce(() => ({ value: 0.5 }));
      render(<Ring />);
      expect(jest.mocked(mockUseSharedValue)).toHaveBeenCalledWith(0);
    });

    it('handles withTiming and withRepeat returning unexpected values', () => {
      // This test ensures the component does not crash if withTiming/withRepeat return unexpected values.
      mockWithTiming.mockImplementationOnce(() => 'unexpected' as any);
      mockWithRepeat.mockImplementationOnce(() => 'unexpected' as any);
      render(<Ring />);
      expect(jest.mocked(mockWithTiming)).toHaveBeenCalled();
      expect(jest.mocked(mockWithRepeat)).toHaveBeenCalled();
    });

    it('renders correctly if the image fails to load (broken URI)', () => {
      // This test ensures the component still renders if the image URI is broken.
      render(<Ring />);
      const img = document.querySelector('img');
      expect(img).toHaveAttribute('src', 'https://i.pravatar.cc/100');
      // Simulate image error event
      if (img) {
        img.dispatchEvent(new Event('error'));
      }
      // The SVG should still be present
      const svg = document.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });
  });
});