import React, { useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  Platform,
  Pressable,
  Image,
  ViewStyle,
} from 'react-native';
import { CameraMediaItem } from 'src/hooks/useDeviceMedia';
import RadioIcon from '@assets/icons/svg/RadioIcon';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { colors } from 'src/themes/colors';
import { FlashList, CellContainer } from '@shopify/flash-list';

const numColumns = 4;
const imageSize = Dimensions.get('window').width / numColumns;

interface CustomGalleryPickerProps {
  cameraMedia: CameraMediaItem[];
  handleMedia: (e: CameraMediaItem) => void;
  onEndReached: () => void;
  loading?: boolean;
}
interface GalleryItemProps {
  item: CameraMediaItem;
  isSelected: boolean;
  onSelect: (item: CameraMediaItem) => void;
}


interface CellRendererProps {
  children: React.ReactNode;
  style?: ViewStyle;
}


const CellRenderer = ({
  children,
  style,
  index,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
  index: number;
}) => {
  return (
    <CellContainer style={[style]} index={index}>
      {children}
    </CellContainer>
  );
};

const SkeltonView = () => {
  return (
    <SkeletonPlaceholder
      speed={1800}
      highlightColor="rgba(0, 4, 40, 0.5)"
      backgroundColor={colors.blurBlue}
    >
      <SkeletonPlaceholder.Item
        flexDirection="row"
        alignItems="center"
        alignSelf="center"
      >
        <SkeletonPlaceholder.Item width={imageSize} height={imageSize} />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
};


const GalleryItem: React.FC<GalleryItemProps> = ({
  item,
  isSelected,
  onSelect,
}) => {
  const [loading, setLoading] = useState(true);

  const formatDuration = () => {
    const duration =
      Platform.OS === 'android' ? item?.duration : item.image.playableDuration;
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <Pressable
      style={styles.imageWrapper}
      onPress={() => onSelect(item)}
    >
      <View style={styles.image}>
        {loading && <SkeltonView />}
        <Image
          source={{ uri: item?.image?.uri }}
          style={[styles.image]}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
        />
      </View>
      <View style={styles.layer} pointerEvents="none">
        <RadioIcon active={isSelected} />
        {item?.type?.includes('video') && (
          <Text style={styles.durationText}>{formatDuration()}</Text>
        )}
      </View>
    </Pressable>
  );
};

function CustomGalleryPicker({
  cameraMedia,
  handleMedia,
  onEndReached,
}: CustomGalleryPickerProps) {
  const [selected, setSelected] = useState<{ [key: string]: CameraMediaItem }>(
    {}
  );

  const onSelect = (item: CameraMediaItem) => {
    let prevMedia = { ...selected };
    if (prevMedia.hasOwnProperty(item?.playableUri)) {
      delete prevMedia[item.playableUri];
      prevMedia = {};
    } else {
      prevMedia = { [item?.playableUri]: item };
    }
    setSelected(prevMedia);
    handleMedia(item);
  };

  const renderItem = useCallback(
    ({ item }: { item: CameraMediaItem }) => (
      <GalleryItem
        item={item}
        isSelected={!!selected[item.playableUri]}
        onSelect={onSelect}
      />
    ),
    [selected]
  );

  return (
    <View style={styles.container}>
      <FlashList
        data={cameraMedia}
        extraData={selected}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        estimatedItemSize={imageSize * 1.1}
        onEndReachedThreshold={0.5}
        // CellRendererComponent={CellRenderer}
        onEndReached={() => {
          if (cameraMedia.length > 0) {
            onEndReached();
          }
        }}
      />
    </View>
  );
}

export default React.memo(CustomGalleryPicker);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageWrapper: {
    position: 'relative',
    width: imageSize,
    height: imageSize,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  layer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(231, 214, 214, 0)',
    zIndex: 1,
    alignItems: 'flex-end',
    padding: 8,
  },
  listContainer: {
    paddingBottom: Platform.OS === 'android' ? 60 : 16,
  },
  durationText: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    color: '#fff',
    paddingHorizontal: 6,
    paddingVertical: 2,
    fontSize: 12,
    borderRadius: 4,
  },
});
