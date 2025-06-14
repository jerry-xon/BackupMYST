import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  LayoutChangeEvent,
  StyleProp,
  ViewStyle,
  TextStyle,
  Pressable,
  Switch,
  Platform,
} from 'react-native';
import { spacing } from 'src/constants';
import { colors } from 'src/themes/colors';
import { fontFamily } from 'src/themes/typography';
import DropDown from '@assets/icons/svg/DropDown.svg';

const { width } = Dimensions.get('window');

// Define type for dropdown item
interface DropdownItem {
  id: string;
  label: string;
}

interface MediaTopViewProps {
  data?: DropdownItem[];
  containerStyle?: StyleProp<ViewStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  buttonTextStyle?: StyleProp<TextStyle>;
  dropdownStyle?: StyleProp<ViewStyle>;
  itemStyle?: StyleProp<ViewStyle>;
  itemTextStyle?: StyleProp<TextStyle>;
  placeholder?: string;
  onSelect?: (item: DropdownItem) => void;
  onSwitch?:(e:boolean)=>void,
  enableSwitch?:boolean
}

const defaultData: DropdownItem[] = [
  { id: '1', label: 'Recents' },
  { id: '2', label: 'Albums' },
];

const MediaTopView: React.FC<MediaTopViewProps> = ({
  data = defaultData,
  containerStyle,
  buttonStyle,
  buttonTextStyle,
  dropdownStyle,
  itemStyle,
  itemTextStyle,
  placeholder = 'Recents',
  onSelect,
  ...props
}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [selected, setSelected] = useState<DropdownItem | null>(null);
  const [dropdownTop, setDropdownTop] = useState<number>(0);
  const [enableMediaLink, setEnableMediaLink] = React.useState<boolean>();
  const [buttonLayout, setButtonLayout] = useState<{
    y: number;
    height: number;
  } | null>(null);

  const toggleDropdown = () => {
    if (visible) {
      setVisible(false);
    } else if (buttonLayout) {
      setDropdownTop(buttonLayout.y);
      setVisible(true);
    }
  };

  const handleSelect = (item: DropdownItem) => {
    setSelected(item);
    setVisible(false);
    if (onSelect) {
      onSelect(item);
    }
  };

  const onButtonLayout = (event: LayoutChangeEvent) => {
    const { y, height } = event.nativeEvent.layout;
    setButtonLayout({ y, height });
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.row}>
        <TouchableOpacity
          onPress={toggleDropdown}
          onLayout={onButtonLayout}
          style={[styles.row, { justifyContent: 'flex-start' }]}
        >
          <Text style={styles.postDetailsText}>
            {selected ? selected.label : placeholder}
          </Text>
          <TouchableOpacity style={{ marginLeft: spacing.sm }}>
            <DropDown />
          </TouchableOpacity>
        </TouchableOpacity>
        <View>
          <Switch
            trackColor={{
              false: colors.blurBorderColor,
              true:
                Platform.OS === 'android'
                  ? colors.blurBorderColor
                  : colors.blurBorderColor,
            }}
            thumbColor={
              Platform.OS === 'android'
                ? enableMediaLink
                  ? colors.white
                  : colors.blurBorderColor
                : enableMediaLink
                ? colors.white
                : colors.blurBorderColor 
            }
            value={!!props?.enableSwitch}
            onValueChange={() => {
              if(props.onSwitch !== undefined) {
                props.onSwitch(!!!props?.enableSwitch);
              }
            }}
          />
        </View>
      </View>

      {visible && (
        <>
          <TouchableWithoutFeedback onPress={() => setVisible(false)}>
            <View style={styles.overlay} />
          </TouchableWithoutFeedback>

          <View style={[styles.dropdown, { top: dropdownTop }, dropdownStyle]}>
            {data.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[styles.item, itemStyle]}
                onPress={() => handleSelect(item)}
              >
                <Text style={[styles.itemText, itemTextStyle]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
  },
  button: {
    alignSelf: 'flex-start',
    padding: spacing.md,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
  },
  dropdown: {
    position: 'absolute',
    left: 110,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 10,
    zIndex: 1000,
    backgroundColor: colors.darkBlue,
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  itemText: {
    fontSize: 16,
    color: colors.white,
    fontFamily: fontFamily.medium,
  },
  postDetailsText: {
    fontSize: 16,
    fontFamily: fontFamily.bold,
    color: colors.white,
  },
  row: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: spacing.sm,
  },
});

export default MediaTopView;
