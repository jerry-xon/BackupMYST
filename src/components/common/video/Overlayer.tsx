import React from 'react';
import { View, Pressable, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { OnVideoErrorData, type VideoRef } from 'react-native-video';
import PlayPauseIcon from '@assets/icons/svg/PlayPauseIcon';
import { spacing } from 'src/constants';
import Sound from '@assets/icons/svg/Sound';
import RNButton from '../RNButton';
import { FadeInRight } from 'react-native-reanimated';
import { fontFamily } from 'src/themes/typography';
import { colors } from 'src/themes/colors';

interface OverlayerProps {
  videoRef: React.RefObject<VideoRef | null>;
  isPlaying: boolean;
  hasEnded: boolean;
  setIsPlaying: (playing: boolean) => void;
  setHasEnded: (ended: boolean) => void;
  isMuted?: boolean;
  setIsMuted?: () => void;
  editCover?: boolean;
  onPressEditCover?: () => void;
  onPlay?: () => void;
  onPause?: () => void;
  onPlayAgain?: () => void;
  error?: OnVideoErrorData | null;
}

const Overlayer = (Props: OverlayerProps) => {


  const togglePlayback = () => {
    if (!Props.videoRef.current) return;

    if (Props.hasEnded) {
      Props.videoRef.current.seek?.(0); // Restart video
      Props.setHasEnded(false);
      Props.setIsPlaying(true);
      if(Props.onPlayAgain !== undefined) {
        Props.onPlayAgain()
      }
      
    } else if (Props.isPlaying) {
      Props.videoRef.current.pause?.();
      Props.setIsPlaying(false);
      if (Props.onPause !== undefined) {
        Props.onPause();
      }
    } else {
      Props.videoRef.current.resume?.(); // Or .play() if you're using other players
      Props.setIsPlaying(true);
      if (Props.onPlay !== undefined) {
        Props.onPlay();
      }
    }
  };


  const onMute = ()=>{
    if(Props.setIsMuted !== undefined) {
      Props.setIsMuted()
    }
  }

  const onPressEditCover = ()=>{
    if(Props.onPressEditCover !== undefined) {
      Props.onPressEditCover();
    }
  }

    return (
      <Pressable style={styles.overlay} onPress={togglePlayback}>
        {/* ✅ Show full-screen error overlay */}
        {Props.error ? (
          <View style={styles.errorOverlay}>
            <Text style={styles.errorText}>
              {JSON.stringify(Props.error.error)}
            </Text>
          </View>
        ) : (
          <View style={styles.bottomLayer}>
            <TouchableOpacity style={{ top: 10 }} onPress={() => onMute()}>
              <Sound isMuted={!!Props.isMuted} />
            </TouchableOpacity>

            {Props.editCover && (
              <RNButton
                title="Edit Cover"
                active
                mainContainer={{
                  alignSelf: 'flex-end',
                  height: 30,
                  width: 160,
                }}
                titleStyle={styles.titleStyle}
                entering={FadeInRight.delay(200)}
                onPress={onPressEditCover}
              />
            )}

            <TouchableOpacity style={{ top: 10 ,backgroundColor:"transparent" }} onPress={togglePlayback}>
              <PlayPauseIcon
                isPlaying={Props.isPlaying}
                size={48}
              />
            </TouchableOpacity>
          </View>
        )}
      </Pressable>
    );
};

export default React.memo(Overlayer);


const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  bottomLayer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  },
  titleStyle: {
    fontSize: 11,
  },
  errorOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  errorButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  errorText:{
    fontSize:14,
    fontFamily: fontFamily.regular,
    width:"90%",
    alignSelf:"center",
    textAlign:"center",
    color:colors.white
  }
});

