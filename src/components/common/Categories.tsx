import { FlatList, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import React from 'react';
import { colors } from 'src/themes/colors';
import { FlashList } from '@shopify/flash-list';
import { spacing } from 'src/constants';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import GradientViewText from './GradientViewText';
import { fontFamily } from 'src/themes/typography';
import { CategoriesProps, SelectedCategory, useOnboardProfileController } from '@features/profile/OnboardProfileController';

interface Props {
  data?: CategoriesProps[];
  onSelect?: (e: string) => void;
  active?: SelectedCategory;
  contentContainerStyle?: StyleProp<ViewStyle>;
  hasAnimated?: boolean;
  setHasAnimated?:()=>void
}

const Categories = (Props: Props) => {
  const [data, setData] = React.useState<CategoriesProps[]>([]);
  // After first render
  
  React.useEffect(() => {
    if (!Props.hasAnimated && Props.setHasAnimated) {
      const timer = setTimeout(() => {
        Props.setHasAnimated!();
      }, 500); // 500ms or match your animation duration
      return () => clearTimeout(timer);
    }
  }, [Props.hasAnimated]);
  React.useEffect(() => {
    if (Props.data !== undefined) {
      setData(Props.data);
    }
  }, [Props.data]);

  const onSelect = (str: string) => {
    if (Props.onSelect !== undefined) {
      Props.onSelect(str);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        horizontal
        keyExtractor={(item, index) => item.id?.toString() || item.name + index}
        renderItem={({ item, index }) => (
          <GradientViewText
            onSelect={() => onSelect(item.name)}
            active={Props?.active?.hasOwnProperty(item.name)}
            entering={
              !Props.hasAnimated
                ? FadeInRight.delay(180 * (index + 1))
                : undefined
            }
          >
            <Animated.Text
              entering={!Props.hasAnimated ? FadeInDown.delay(100) : undefined}
              style={[
                styles.description,
                {
                  fontSize: 14,
                  fontFamily: fontFamily.medium,
                },
              ]}
            >
              {item.name}
            </Animated.Text>
          </GradientViewText>
        )}
        ItemSeparatorComponent={() => <View style={{ width: 5 }} />}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[
          { paddingHorizontal: spacing.md },
          Props?.contentContainerStyle,
        ]}
      />
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  description: {
    fontFamily: fontFamily.light,
    fontSize: 14,
    lineHeight: 14 * 1.6,
    letterSpacing: 0,
    color: colors.white,
  },
  container: {
    height: 60, // Fixed height
    justifyContent: 'center',
  },
  itemText: {
    fontSize: 20,
    color: 'red',
    fontFamily: fontFamily.medium,
    backgroundColor: '#222',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
});
