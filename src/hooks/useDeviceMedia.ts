import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  AssetType,
  CameraRoll,
  PhotoIdentifier,
} from '@react-native-camera-roll/camera-roll';
import RNFS from 'react-native-fs';
import { Alert, Linking, NativeModules, Platform } from 'react-native';
const { VideoMetadata } = NativeModules;
const { GroupedMedia } = NativeModules;

import uuid from 'react-native-uuid';


export async function getGroupedMedia() {
  try {
    const albums = await GroupedMedia.getGroupedMedia();
    !!albums.length && albums.map((e:any)=>{
    })
    return albums;
  } catch (e) {
    console.error('Error fetching grouped media:', e);
    return [];
  }
}

const getDuration = async (uri:string) => {
  try {
    const duration = await VideoMetadata.getVideoDuration(uri);
    
    return duration;
  } catch (e) {
    console.error('Failed to get duration:', uri);
    return 0
  }
};

type PhotoNode = PhotoIdentifier['node'];

export interface CameraMediaItem extends PhotoNode {
  playableUri: string;
  duration:number
}
interface Props {
  assetType?: AssetType | undefined;
}

export default function useDeviceMedia(Props?:Props) {
  
  const [selected, setSelected] = useState<CameraMediaItem | null>(null);
  const [media, setMedia] = useState<CameraMediaItem[]>([]);
  const [selectedCamera, setSelectedCamera] = useState<any | null>(null);
  const [selectedMedia, setSelectedMedia] = useState<{[key: string]: CameraMediaItem}>({});
  const [endCursor, setEndCursor] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loading,setLoading] = React.useState<boolean>(false)
  const [error, setError] = React.useState<boolean>(false);



  const loadMediaFromCameraRoll = useCallback(async (type:AssetType|undefined) => {
    if (!hasNextPage) return;
    try {
      setLoading(true)
      setError(false)
      const result = await CameraRoll.getPhotos({
        assetType: type,
        first: 100,
        after: endCursor ?? undefined,
      });

      const mediaList = await Promise.all(
        result.edges.map(async (edge) => {
          const node = edge.node;
          const { type, image } = node;
          const originalUri = image.uri;

          let playableUri = originalUri;

          if (
            Platform.OS === 'ios' &&
            type.startsWith('video') &&
            originalUri.startsWith('ph://')
          ) {
            try {
              const safeFileName =
                image.filename ?? `${originalUri.replace('ph://', '')}.mov`;

              const destPath = `${RNFS.CachesDirectoryPath}/${safeFileName}`;
              const fileExists = await RNFS.exists(destPath);

              if (!fileExists) {
                const copiedPath = await RNFS.copyAssetsVideoIOS(
                  originalUri,
                  destPath
                );
                playableUri = 'file://' + copiedPath;
              } else {
                playableUri = 'file://' + destPath;
              }
            } catch (err) {
              console.warn('Failed to copy iOS video:', err);
            }
          }

          // ✅ Get duration (only Android needs this since iOS returns it natively)
          let duration = 0;
          if (Platform.OS === 'android') {
            try {
              let value = await getDuration(originalUri);
              duration = parseInt(value)
            } catch (e) {
              console.warn('Failed to get durationvvvvvv:', playableUri);
            }
          }

          return {
            ...node,
            playableUri,
            duration,
            id: uuid.v4()
          };
        })
      );


      setMedia((prev) => [...prev, ...mediaList]);
      setSelected(mediaList[0]);
      setEndCursor(result.page_info.end_cursor ?? null);
      setHasNextPage(result.page_info.has_next_page);
      setLoading(false)
      setError(false)
    } catch (error) {
      setError(true)
      setLoading(false)
      console.error('Error loading CameraRoll assets:', error);
    }
  }, [endCursor, hasNextPage]);


  const handleMedia = (item: CameraMediaItem) => {
    setSelected(item)
    let prevMedia = {...selectedMedia}
    if(prevMedia.hasOwnProperty(item?.playableUri)){
      delete prevMedia[item.playableUri]
      prevMedia = {}
    }else{
      prevMedia = {[item?.playableUri]:item}
    }
    setSelectedMedia(prevMedia)

  }

  const onEndReached = async () => {
    if(hasNextPage){
      await loadMediaFromCameraRoll(Props?.assetType);
    }
  };

  return useMemo(
    () => ({
      selected,
      cameraMedia: media,
      selectedCamera,
      setSelected,
      setSelectedCamera,
      selectedMedia,
      handleMedia,
      onEndReached,
      loadMediaFromCameraRoll,
      loading
    }),
    [
      selected,
      media,
      selectedCamera,
      selectedMedia,
      handleMedia,
      onEndReached,
      loading
    ]
  );
}
