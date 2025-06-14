import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { captureRef } from 'react-native-view-shot';
import Video from 'react-native-video';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface CapturedFrame {
  id: string;
  uri: string;
  timestamp: number;
}

const NativeVideoClipGenerator: React.FC = () => {
  const [capturedFrames, setCapturedFrames] = useState<CapturedFrame[]>([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [paused, setPaused] = useState(true);
  const [isBuffering, setIsBuffering] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);

  const videoUri =
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

  const videoRef = useRef<any>(null);
  const viewShotRef = useRef<View>(null);
  const intervalRef = useRef<any>(null);

  const handleLoad = ({ duration }: { duration: number }) => {
    setVideoDuration(duration);
    startCapturingFrames(duration);
  };

  const startCapturingFrames = (duration: number) => {
    let second = 0;
    setIsCapturing(true);
    intervalRef.current = setInterval(async () => {
      if (second >= Math.floor(duration)) {
        clearInterval(intervalRef.current!);
        intervalRef.current = null;
        setIsCapturing(false);
        setPaused(false); // Play video after capturing all frames
        return;
      }

      try {
        const uri = await captureRef(viewShotRef, {
          format: 'jpg',
          quality: 0.8,
          result: 'tmpfile',
        });

        setCapturedFrames((prev) => [
          ...prev,
          {
            id: Date.now().toString() + second,
            uri,
            timestamp: second,
          },
        ]);
      } catch (err) {
        console.log('Capture error:', err);
      }

      second++;
    }, 1000);
  };

  const handleProgress = ({ currentTime }: { currentTime: number }) => {
    setCurrentTime(currentTime);
  };

  const handleBuffer = ({ isBuffering }: { isBuffering: boolean }) => {
    setIsBuffering(isBuffering);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <View style={styles.container}>
      <View ref={viewShotRef} style={styles.videoWrapper} collapsable={false}>
        <Video
          ref={videoRef}
          source={{ uri: videoUri }}
          resizeMode="contain"
          style={styles.video}
          paused={paused}
          onLoad={handleLoad}
          onProgress={handleProgress}
          onBuffer={handleBuffer}
          controls
        />
        {(isBuffering || isCapturing) && (
          <View style={styles.loaderOverlay}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={styles.loaderText}>
              {isCapturing ? 'Capturing Frames...' : 'Buffering...'}
            </Text>
          </View>
        )}
      </View>

      <Text style={styles.label}>Captured Clips</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {capturedFrames.map((frame) => (
          <View key={frame.id} style={styles.thumbnailWrapper}>
            <Image source={{ uri: frame.uri }} style={styles.thumbnail} />
            <Text style={styles.timestamp}>{frame.timestamp}s</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: '#fff',
  },
  videoWrapper: {
    width: '100%',
    height: 220,
    backgroundColor: 'black',
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  loaderOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  loaderText: {
    color: '#fff',
    marginTop: 8,
    fontSize: 14,
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
    fontWeight: '600',
  },
  thumbnailWrapper: {
    marginRight: 10,
    alignItems: 'center',
  },
  thumbnail: {
    width: 100,
    height: 60,
    borderRadius: 6,
  },
  timestamp: {
    fontSize: 12,
    marginTop: 4,
  },
});

export default NativeVideoClipGenerator;
