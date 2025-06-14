import React, {
  forwardRef,
  useImperativeHandle,
  Ref,
  useEffect,
  useState,
} from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import Animated, { AnimatedProps } from 'react-native-reanimated';
import {
  useVideoPlayer,
  VideoSource,
  VideoView,
} from 'expo-video';

interface Props {
  entering?: AnimatedProps<Animated.View>['entering'];
  exiting?: AnimatedProps<Animated.View>['exiting'];
  animatedStyle?: any;

  // New optional URI
  uri?: string;

  // OR a pre-created player instance
  player?: ReturnType<typeof useVideoPlayer>; // ⬅️ Accept player instance
}

export interface VideoHandle {
  play: () => void;
  pause: () => void;
  getStatus: () => Promise<{
    isPlaying: boolean;
    duration: number;
    position: number;
  }>;
}

const Video = forwardRef<VideoHandle, Props>(
  (
    { entering, exiting, animatedStyle, uri, player: externalPlayer },
    ref: Ref<VideoHandle>
  ) => {
    const internalPlayer = uri
      ? useVideoPlayer({ uri }, (p) => {
          p.loop = true;
        })
      : undefined;

    // Use external player if passed, otherwise fallback to internal one
    const player = externalPlayer ?? internalPlayer;

    const [status, setStatus] = useState({
      isPlaying: false,
      duration: 0,
      position: 0,
    });

    useImperativeHandle(ref, () => ({
      play: () => player?.play(),
      pause: () => player?.pause(),
      getStatus: async () => status,
    }));

    useEffect(() => {
      const updateStatus = () => {
        setStatus({
          isPlaying: !!player?.playing,
          duration: player?.duration ?? 0,
          position: player?.currentTime ?? 0,
        });
      };

      player?.addListener('timeUpdate', updateStatus);
      updateStatus();

      return () => {
        player?.removeListener('timeUpdate', updateStatus);
      };
    }, [player]);

    return (
      <Animated.View
        entering={entering}
        exiting={exiting}
        style={[styles.container, animatedStyle]}
      >
        {player && (
          <VideoView
            player={player}
            style={styles.video}
            allowsFullscreen
            allowsPictureInPicture
            contentFit="cover"
          />
        )}
      </Animated.View>
    );
  }
);

export default Video;

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  video: {
    ...StyleSheet.absoluteFillObject,
  },
});
