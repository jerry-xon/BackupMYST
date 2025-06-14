
import PostHeader from '../PostHeader';

// src/components/common/PostHeader.test.tsx
import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import React from "react";

// src/components/common/PostHeader.test.tsx
// Mocks for react-native components
jest.mock("react-native", () => {
  const React = require('react');
  return {
    StyleSheet: { create: (styles: any) => styles },
    Text: (props: any) => <text {...props} />,
    View: (props: any) => <view {...props} />,
  };
});


interface MockSvgProps {
  width?: number;
  height?: number;
  fill?: string;
  style?: object;
}

// Mock for UserImage
const mockUserImage = jest.fn().mockImplementation((props) => {
  return (
    <mock-user-image data-testid="user-image" {...props}>
      {props.children}
    </mock-user-image>
  );
});
jest.mock("../UserImage", () => ({
  __esModule: true,
  default: mockUserImage,
}));

// Mock for RNButton
const mockRNButton = jest.fn().mockImplementation((props) => {
  return (
    <mock-rn-button data-testid={`rn-button-${props.title || 'icon'}`} {...props}>
      {props.titleAsChildren || props.title}
    </mock-rn-button>
  );
});
jest.mock("../RNButton", () => ({
  __esModule: true,
  default: mockRNButton,
}));

// Mock for Menu SVG
const mockMenu = jest.fn().mockImplementation((props: MockSvgProps) => {
  return <mock-menu data-testid="menu-icon" {...props} />;
});
jest.mock("@assets/icons/svg/Menu.svg", () => ({
  __esModule: true,
  default: mockMenu,
}));

// Mock for Weather SVG
const mockWeather = jest.fn().mockImplementation((props: MockSvgProps) => {
  return <mock-weather data-testid="weather-icon" {...props} />;
});
jest.mock("@assets/icons/svg/Weather.svg", () => ({
  __esModule: true,
  default: mockWeather,
}));

// Mock for Morning SVG (not used in PostHeader, but imported)
const mockMorning = jest.fn().mockImplementation((props: MockSvgProps) => {
  return <mock-morning data-testid="morning-icon" {...props} />;
});
jest.mock("@assets/icons/svg/Morning.svg", () => ({
  __esModule: true,
  default: mockMorning,
}));

describe('PostHeader() PostHeader method', () => {
  // Happy Path Tests
  describe('Happy paths', () => {
    it('renders all main elements with default props', () => {
      // This test ensures the component renders all expected elements with default props.
      render(<PostHeader />);
      // UserImage
      expect(screen.getByTestId('user-image')).toBeInTheDocument();
      // Username
      expect(screen.getByText('Savan Soni')).toBeInTheDocument();
      // Weather icon
      expect(screen.getByTestId('weather-icon')).toBeInTheDocument();
      // Location text
      expect(screen.getByText('Delhi,India')).toBeInTheDocument();
      // Follow button
      expect(screen.getByTestId('rn-button-Follow')).toBeInTheDocument();
      // Menu button (icon button)
      expect(screen.getByTestId('rn-button-icon')).toBeInTheDocument();
      // Menu icon inside RNButton
      expect(screen.getByTestId('menu-icon')).toBeInTheDocument();
    });

    it('passes hSpace as marginHorizontal in container style', () => {
      // This test checks that the hSpace prop is applied as marginHorizontal in the container style.
      const hSpaceValue = 16;
      render(<PostHeader hSpace={hSpaceValue as any} />);
      // The container is a <view> with marginHorizontal
      // Find the first <view> and check its props
      const container = screen.getAllByRole('generic')[0];
      expect(container).toHaveProperty('props.marginHorizontal', hSpaceValue);
    });

    it('renders RNButton with correct props for Follow', () => {
      // This test ensures the Follow button receives the correct props.
      render(<PostHeader />);
      expect(mockRNButton).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Follow',
          active: true,
          mainContainer: { width: 90 },
          gradientStyle: { flex: 0, height: 30 },
          titleStyle: expect.any(Object),
        }),
        {}
      );
    });

    it('renders RNButton with Menu icon as children', () => {
      // This test ensures the Menu icon is passed as children to the RNButton.
      render(<PostHeader />);
      expect(mockRNButton).toHaveBeenCalledWith(
        expect.objectContaining({
          titleAsChildren: expect.any(Object),
          active: true,
          diabelGradient: true,
        }),
        {}
      );
      // The Menu icon should be rendered inside the RNButton
      expect(screen.getByTestId('menu-icon')).toBeInTheDocument();
    });

    it('renders UserImage with correct props', () => {
      // This test ensures UserImage receives the correct props.
      render(<PostHeader />);
      expect(mockUserImage).toHaveBeenCalledWith(
        expect.objectContaining({
          source: expect.any(Object),
          height: 45,
          gradientStatus: 'None',
        }),
        {}
      );
    });

    it('renders the correct text content for username and location', () => {
      // This test checks that the username and location are rendered as expected.
      render(<PostHeader />);
      expect(screen.getByText('Savan Soni')).toBeInTheDocument();
      expect(screen.getByText('Delhi,India')).toBeInTheDocument();
    });
  });

  // Edge Case Tests
  describe('Edge cases', () => {
    it('renders correctly when hSpace is 0', () => {
      // This test checks that the component handles hSpace=0 without error.
      render(<PostHeader hSpace={0 as any} />);
      const container = screen.getAllByRole('generic')[0];
      expect(container).toHaveProperty('props.marginHorizontal', 0);
    });

    it('renders correctly when hSpace is a large value', () => {
      // This test checks that the component handles a large hSpace value.
      render(<PostHeader hSpace={1000 as any} />);
      const container = screen.getAllByRole('generic')[0];
      expect(container).toHaveProperty('props.marginHorizontal', 1000);
    });

    it('renders correctly when key prop is provided', () => {
      // This test checks that the component accepts a key prop.
      render(<PostHeader key="unique-key" />);
      // No error should occur, and all elements should render
      expect(screen.getByTestId('user-image')).toBeInTheDocument();
      expect(screen.getByText('Savan Soni')).toBeInTheDocument();
    });

    it('renders correctly when extra unrelated props are passed', () => {
      // This test checks that unrelated props do not break the component.
      render(<PostHeader hSpace={8 as any} key="another-key" />);
      expect(screen.getByTestId('user-image')).toBeInTheDocument();
      expect(screen.getByText('Delhi,India')).toBeInTheDocument();
    });

    it('renders correctly when called multiple times (no shared state)', () => {
      // This test ensures that multiple renders do not interfere with each other.
      render(<PostHeader />);
      render(<PostHeader />);
      expect(screen.getAllByTestId('user-image').length).toBeGreaterThanOrEqual(2);
    });
  });
});