import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import PostHeader from './PostHeader';
import { spacing } from 'src/constants';
import Rocket from '@assets/icons/svg/RocketIcon';
import Dislike from '@assets/icons/svg/Dislike.svg';
import Comments from '@assets/icons/svg/Comments.svg';
import Save from '@assets/icons/svg/Save.svg';
import Share from '@assets/icons/svg/Share.svg';

import { fontFamily } from 'src/themes/typography';
import { colors } from 'src/themes/colors';
import LikeInfo from './Like/LikeInfo';
import GradientText from './Gardient';
import Animated from 'react-native-reanimated';
import RNVideo from './video/RNVideo';
const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

const height = 558;
const content = 436;
const uri = 'https://videos.pexels.com/video-files/2759477/2759477-uhd_2560_1440_30fps.mp4';

interface PostProps {
  type?: 'Image' | 'Video';
  onPress?:()=>void
}

interface AImageProps {
  children?: React.ReactNode;
  title?: string;
}

const AImage = (Props: AImageProps) => {
  return (
    <Pressable style={styles.namingImageSection}>
      <Pressable>{Props.children}</Pressable>
      {Props.title && <Text style={styles.imageText}>{Props.title}</Text>}
    </Pressable>
  );
};



const Post = (Props:PostProps) => {
  

  const bottomInfo = React.useCallback(() => {
    return (
      <View style={styles.bottomSection}>
        <View style={styles.firstRow}>
          <View style={styles.imagesSection}>
            <AImage children={<Rocket />} title="320" />
            <AImage children={<Dislike />} title="320" />
            <AImage children={<Comments />} title="320" />
          </View>
          <View style={styles.secondImagesSection}>
            <AImage children={<Save />} />
            <AImage children={<Share />} />
          </View>
        </View>
        <View style={styles.likedsection}>
          <LikeInfo
            status="Liked"
            nameOfuser="saradoe_123"
            avatars={[
              'https://randomuser.me/api/portraits/women/1.jpg',
              'https://randomuser.me/api/portraits/men/2.jpg',
              'https://randomuser.me/api/portraits/women/3.jpg',
            ]}
            onPress={() => {}}
          />

          <View style={styles.nameSection}>
            <Text style={styles.nameStyle}>Savan Soni</Text>
            <Text
              numberOfLines={1}
              style={[
                styles.nameStyle,
                { fontFamily: fontFamily.regular, width: '80%' },
              ]}
            >
              Attended the concert last week...❤️🫶🏻{' '}
            </Text>
          </View>
          <View
            style={[
              styles.nameSection,
              { justifyContent: 'space-between', marginVertical: spacing.sm },
            ]}
          >
            <GradientText text="MEME" style={styles.categoriesText} />
            <Text
              numberOfLines={1}
              style={[
                styles.nameStyle,
                {
                  fontFamily: fontFamily.regular,
                  fontSize: 12,
                  color: colors.lightWhite,
                },
              ]}
            >
              1 Day Ago
            </Text>
          </View>
        </View>
      </View>
    );
  },[]);

  const onPress = ()=>{
    if(Props.onPress !== undefined) {
      Props.onPress()
    }
  }

  return (
    <Pressable style={styles.container}>
      {Props.type === 'Video' ? (
        <AnimatedPressable style={[styles.postContainer]}>
          <RNVideo source={{ uri: uri }} resizeMode="cover" />
        </AnimatedPressable>
      ) : (
        <AnimatedPressable style={[styles.postContainer]} onPress={onPress} >
          <Animated.Image
            source={{
              uri: 'https://images.pexels.com/photos/32307142/pexels-photo-32307142/free-photo-of-young-graduate-holding-dr-seuss-book-outdoors.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            }}
            style={[styles.postStyle]}
          />
        </AnimatedPressable>
      )}
      <View style={styles.layer} pointerEvents="box-none">
        <View
          style={styles.gradient}
          pointerEvents="none" 
        >
          <LinearGradient
            colors={['black', 'transparent']}
            style={StyleSheet.absoluteFill}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 0.2 }}
          />
        </View>
        <Pressable style={{ zIndex: 40 }}>
          <PostHeader 
            hSpace={spacing.md} 
            vSpace={spacing.md} 
            onPressProfile={onPress}
          />
        </Pressable>
      </View>
      {bottomInfo()}
    </Pressable>
  );
};

export default React.memo(Post);

const styles = StyleSheet.create({
  container: {
    height: height,
    width: '100%',
  },
  postContainer: {
    height: content,
    width: '100%',
    overflow:"hidden"
  },
  postStyle: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  layer: {
    ...StyleSheet.absoluteFillObject,
    height: content,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    height: content,
  },
  soundIcon: {
    position: 'absolute',
    right: 18,
    bottom: 18,
  },
  bottomSection: {
    marginHorizontal: spacing.md,
    marginVertical: spacing.sm,
    flex: 1,
  },
  firstRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imagesSection: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
    gap: 15,
  },
  secondImagesSection: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 15,
  },
  namingImageSection: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  imageText: {
    fontSize: 16,
    fontFamily: fontFamily.medium,
    color: colors.white,
    marginLeft: 7,
  },
  likedsection: {},
  nameStyle: {
    fontSize: 14,
    fontFamily: fontFamily.medium,
    color: colors.white,
    lineHeight: 20,
  },
  nameSection: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 10,
  },
  categoriesText: {
    fontSize: 12,
    fontFamily: fontFamily.medium,
    color: colors.white,
    letterSpacing: 1,
  },
});
