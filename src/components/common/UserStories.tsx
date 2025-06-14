import { Image, StyleSheet, View } from 'react-native';
import React, { useMemo } from 'react';
import { FlashList } from '@shopify/flash-list';
import { spacing } from 'src/constants';
import GradientRing from './Ring';
import { colors } from 'src/themes/colors';

const ITEM_HEIGHT = 70;
const ITEM_WIDTH = ITEM_HEIGHT * 0.95;

const UserStories = () => {
  const data = useMemo(
    () =>
      Array.from({ length: 12 }, (_, index) => ({
        id: index.toString(),
        avatar: `https://i.pravatar.cc/100?img=${index + 1}`, 
      })),
    []
  );

  const renderItem = React.useCallback(
    ({ item }: any) => (
    
        <GradientRing 
          borderRadius={40}
          strokeWidth={2} 
          active={true} style={styles.ringStyle}
          gradientColors={colors.linearGradient.pinkGradient}
        >
          <Image
            source={{ uri: item.avatar }}
            style={styles.avatarImage}
            resizeMode="cover"
          />
        </GradientRing>
    ),
    []
  );

  const ItemSeparator = React.useCallback(
    () => <View style={styles.separator} />,
    []
  );

  const keyExtractor = React.useCallback((item:any) => item.id, []);

  return (
    <View style={styles.container}>
      <FlashList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        horizontal={true}
        ItemSeparatorComponent={ItemSeparator}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        estimatedItemSize={ITEM_WIDTH + 8} 
      />
    </View>
  );
};

export default React.memo(UserStories);

const styles = StyleSheet.create({
  container: {
    height: ITEM_HEIGHT, 
    justifyContent: 'center',
    marginVertical: spacing.md,
    flex:1
  },
  ringStyle: {
    height: ITEM_WIDTH,
    width: ITEM_WIDTH,
    padding: 5,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    backgroundColor: 'grey',
    borderRadius: 35,
  },
  separator: {
    width: 8,
  },
  contentContainer: {
    paddingHorizontal: spacing.md,
  },
});
