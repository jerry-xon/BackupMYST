import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Play from '@assets/icons/svg/PlaySvg.svg';
import { colors } from 'src/themes/colors';
import { fontFamily } from 'src/themes/typography';

export const TrendingVideoHEIGHT = 100;

const TrendingVideos = () => {
  return (
    <Pressable
      style={styles.container}
      onPress={() => console.log('Pressed whole video')}
    >
      <Image
        source={{
          uri: 'https://images.pexels.com/photos/32307142/pexels-photo-32307142/free-photo-of-young-graduate-holding-dr-seuss-book-outdoors.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        }}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={styles.playIcon}>
        <Play height={18} width={18} />
        <Text style={styles.viewsText}>133K</Text>
      </View>
    </Pressable>
  );
};

export default TrendingVideos;

const styles = StyleSheet.create({
  container: {
    height: TrendingVideoHEIGHT,
    width: 80,
    borderWidth: 1,
    overflow: 'hidden',
    borderRadius: TrendingVideoHEIGHT / 10,
  },
  playIcon: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 5,
  },
  viewsText: {
    fontSize: 12,
    color: colors.white,
    fontFamily: fontFamily.semiBold,
    top: -2,
    marginLeft: 2,
  },
});
