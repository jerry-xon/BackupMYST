import React, { useRef } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Video, { OnVideoErrorData, ReactVideoProps, VideoRef } from 'react-native-video';
import Overlayer from './Overlayer';
import { colors } from 'src/themes/colors';

interface RNVideoProps extends ReactVideoProps {
  key?: string;
  editCover?: boolean;
  onPressEditCover?: () => void;
  onPlayVideo?: () => void;
  onPauseVideo?: () => void;
  onPlayAgain?: () => void;
}

const RNVideo = (props: RNVideoProps) => {
  const videoRef = useRef<VideoRef>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [hasEnded, setHasEnded] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(false);
  const [error, setError] = React.useState<OnVideoErrorData|null>(null);

  React.useEffect(()=>{
    if(props.paused === undefined) setIsPlaying(false)
    else  setIsPlaying(!props.paused)
    
  },[props.paused])


  const handleEnd = () => {
    setIsPlaying(false);
    setHasEnded(true);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const newVolume = isMuted ? 1 : 0;
    videoRef.current.setVolume?.(newVolume);
    setIsMuted(!isMuted);
  };


  const onEditCover = React.useCallback(()=>{
    if(props.onPressEditCover !== undefined) {
      props.onPressEditCover()
    }
  },[])



  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        key={props?.key}
        style={styles.video}
        resizeMode="contain"
        controls={false} // disable default UI
        onEnd={handleEnd}
        paused={!isPlaying}
        onError={(e)=>setError(e)}
        {...props}
      />
      <Overlayer
        videoRef={videoRef}
        isPlaying={isPlaying}
        hasEnded={hasEnded}
        setIsPlaying={setIsPlaying}
        setHasEnded={setHasEnded}
        setIsMuted={toggleMute}
        isMuted={isMuted}
        editCover={!!props.editCover}
        onPressEditCover={onEditCover}
        onPause={props.onPauseVideo}
        onPlayAgain={props.onPlayAgain}
        onPlay={props.onPlayVideo}
        error={error}
      />
    </View>
  );
};

export default React.memo(RNVideo);

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width,
    height:"100%",
    // height,
    backgroundColor: colors.darkBlue,
  },
});
