import { StyleSheet, View } from 'react-native';
import React from 'react';
import { FlashList } from '@shopify/flash-list';
import TrendingVideos, { TrendingVideoHEIGHT } from './TrendingVideos';
import { spacing } from 'src/constants';
import Animated, { FadeInRight } from 'react-native-reanimated';

const TrendingVideosList = () => {
  return (
    <View style={styles.container}>
      <FlashList
        data={Array(12).fill(0)}
        renderItem={({ item ,index }) => (
          <Animated.View 
            // entering={FadeInRight.delay(120 * (index + 1))}
          >
            <TrendingVideos />
          </Animated.View>
        )}
        horizontal={true}
        ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: spacing.md }}
        estimatedItemSize={TrendingVideoHEIGHT}
      />
    </View>
  );
};

export default React.memo(TrendingVideosList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxHeight: TrendingVideoHEIGHT,
    justifyContent: 'center',
  },
});
