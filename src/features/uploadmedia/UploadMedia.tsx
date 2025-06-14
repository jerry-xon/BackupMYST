import React from 'react';
import {
  Image,
  Linking,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AppBackgroundLayer from 'src/components/common/AppBackgroundLayer';
import UploadMediaHeader from 'src/components/common/UploadMediaHeader';
import CloseSvg from '@assets/icons/svg/CloseSvg.svg';
import CustomGalleryPicker from './CustomGalleryPicker';
import useMediaController from './useMediaController';
import GradientText from 'src/components/common/Gardient';
import { fontFamily } from 'src/themes/typography';
import { colors } from 'src/themes/colors';
import { MEDIA_HEIGHT, spacing } from 'src/constants';
import RNVideo from 'src/components/common/video/RNVideo';
import useDeviceMedia from 'src/hooks/useDeviceMedia';
import usePermissions from 'src/hooks/usePermissions';
import { PERMISSIONS } from 'react-native-permissions';
import { useFocusEffect } from '@react-navigation/native';
import ImageCropPicker, {
  Image as CropImage,
  Video as CropVideo,
} from 'react-native-image-crop-picker';
import MediaTopView from 'src/components/common/MediaTopView';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
export default function UploadMedia() {
  const [pause, setPaused] = React.useState<boolean>(true);
  const { status, handleStatus, onBack, ...props } = useMediaController();
  const media = useDeviceMedia({ assetType: 'Videos' });

  const permission = usePermissions(
    Platform.select({
      ios: [PERMISSIONS.IOS.PHOTO_LIBRARY] as any,
      android:
        Number(Platform.Version) >= 33
          ? [
              PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
              PERMISSIONS.ANDROID.READ_MEDIA_VIDEO,
            ]
          : [PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE],
    })!
  );

  const pickSingleFile = async () => {
    try {
      const res = await ImageCropPicker.openPicker({
        mediaType: 'any',
        cropping: false, // or true, depending on your need
      });

      // You can narrow type manually
      if ('mime' in res && res.mime.startsWith('video/')) {
        const video = res as CropVideo;
        console.log('Video URI:', video.path, 'Duration:', video.duration);
      } else {
        const image = res as CropImage;
        console.log('Image URI:', image.path, 'Width:', image.width);
      }
      const mediaItem: any = {
        playableUri: res.path,
        duration: 'duration' in res ? res.duration ?? 0 : 0,
        type: res.mime,
        image: {
          uri: res.path,
          width: res.width,
          height: res.height,
          filename: res.filename ?? '',
          playableDuration: 'duration' in res ? res.duration ?? 0 : 0,
          extension: '',
          filepath: '',
          fileSize: 0,
          orientation: 1,
        },
        timestamp: Date.now(),
        group_name: [],
        location: null,
        id: res.path,
        modificationTimestamp: Date.now(),
      };

      media?.handleMedia(mediaItem);
    } catch (err: any) {
      console.log('Picker error', err);
    }
  };

  React.useEffect(() => {
    if (permission?.isGranted) {
      media?.loadMediaFromCameraRoll('Videos');
    }
  }, [permission.isGranted, permission.statusMap]);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        setPaused(true);
        setTimeout(() => {
          props.setEnableMediaLink(false);
        }, 600);
      };
    }, [])
  );

  const renderSelectedMedia = React.useCallback(() => {
    let url = media.selected?.playableUri;
    let type = media.selected?.type;
    if (media?.loading) {
      return (
        <SkeletonPlaceholder backgroundColor={colors.blurBorderColor}>
          <SkeletonPlaceholder.Item
            flexDirection="row"
            alignItems="center"
            alignSelf="center"
          >
            <SkeletonPlaceholder.Item width={'100%'} height={MEDIA_HEIGHT} />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
      );
    }
    return (
      <Pressable style={styles.previewContainer}>
        {!!url && String(type).includes('video') ? (
          <RNVideo
            source={{ uri: url }}
            paused={pause}
            onPlayAgain={() => setPaused(false)}
            onPlayVideo={() => setPaused(false)}
            onPauseVideo={() => setPaused(true)}
          />
        ) : !!url && url ? (
          <Image source={{ uri: url }} style={styles.preview} />
        ) : null}
      </Pressable>
    );
  }, [media?.selectedMedia, media?.loading,pause]);

  const renderPostDetails = React.useCallback(() => {
    return (
      <View style={{ flex: 1 }}>
        <MediaTopView
          onSelect={(e) => {
            if (e.label === 'Albums') {
              pickSingleFile();
            }
          }}
          enableSwitch={props.enableMediaLink}
          onSwitch={(e) => e && handleStatus()}
        />
        <CustomGalleryPicker
          cameraMedia={media?.cameraMedia}
          handleMedia={media?.handleMedia}
          onEndReached={media?.onEndReached}
          loading={media?.loading}
        />
      </View>
    );
  }, [media?.cameraMedia, media?.selectedMedia, media?.loading]);

  const renderView = React.useCallback(() => {
    if (permission.statusMap === null) return <></>;
    else if (permission?.isDenied || permission?.isBlocked) {
      return (
        <View style={[styles.container, styles.permissionContainer]}>
          <Text style={styles.permissionTitle}>Allow Media Access</Text>
          <Text
            style={styles.permissionDesc}
            onPress={() => Linking.openSettings()}
          >
            To continue, please{' '}
            <Text style={{ fontFamily: fontFamily.bold }}>allow access</Text> to
            your photo library from settings. This lets you view and select
            images from your device.
          </Text>
        </View>
      );
    } else if (permission?.isGranted) {
      return (
        <View style={styles.container}>
          {renderSelectedMedia()}
          {renderPostDetails()}
        </View>
      );
    }
  }, [media?.selectedMedia, media?.cameraMedia, pause, media?.loading]);

  const header = React.useCallback(() => {
    return (
      <UploadMediaHeader
        title={'New Video'}
        showDropDown
        leftChidlren={
          <Pressable
            style={styles.imageContainer}
            onPress={() => {
              setPaused(true);
              onBack();
            }}
          >
            <CloseSvg />
          </Pressable>
        }
        rightChidlren={
          Object.keys(media?.selectedMedia).length > 0 && (
            <Pressable
              onPress={() =>
                handleStatus(Object.values(media?.selectedMedia)[0])
              }
            >
              <GradientText
                text="Next"
                style={{
                  fontSize: 15,
                  letterSpacing: 1,
                  fontFamily: fontFamily.medium,
                }}
              />
            </Pressable>
          )
        }
      />
    );
  }, [media?.selectedMedia]);

  return (
    <AppBackgroundLayer avoidKeyboardScroll={true}>
      {header()}
      {renderView()}
    </AppBackgroundLayer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleStyle: {
    fontSize: 11,
  },
  imageContainer: {
    height: 18,
    width: 18,
  },
  previewContainer: {
    width: '100%',
    height: MEDIA_HEIGHT,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  preview: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  postDetailsText: {
    fontSize: 16,
    fontFamily: fontFamily.bold,
    color: colors.white,
  },
  permissionTitle: {
    fontSize: 24,
    fontFamily: fontFamily.bold,
    color: colors.white,
    textAlign: 'center',
    alignSelf: 'center',
  },
  permissionDesc: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    color: colors.white,
    textAlign: 'center',
    alignSelf: 'center',
    lineHeight: 24,
    width: '90%',
  },
  permissionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 80,
  },
  row: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: spacing.sm,
  },
});
