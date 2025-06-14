import AppBackgroundLayer from 'src/components/common/AppBackgroundLayer';
import UploadMediaHeader from 'src/components/common/UploadMediaHeader';
import RNButton from 'src/components/common/RNButton';
import { FadeInRight } from 'react-native-reanimated';
import CloseSvg from '@assets/icons/svg/CloseSvg.svg';
import {
  ActivityIndicator,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { MainStackParamList } from 'src/navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { colors } from 'src/themes/colors';
import { fontFamily } from 'src/themes/typography';
import { spacing } from 'src/constants';
import Thumbnail from 'src/components/common/video/Thumbnail';
import React from 'react';
import ImagePicker, { openPicker } from 'react-native-image-crop-picker';
import useVideoThumbnails from 'src/hooks/useVideoThumbnails';
import FastImage from 'react-native-fast-image';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { useAppDispatch, useAppSelector } from 'src/store';
import { setState } from 'src/store/slice/postSlice';

type NavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  'EditCover'
>;

type MediaInformationRouteProp = RouteProp<MainStackParamList, 'EditCover'>;
type MediaInformationNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  'EditCover'
>;

type Props = {
  route: MediaInformationRouteProp;
  navigation: MediaInformationNavigationProp;
};

const EditCover = (Props: Props) => {
  const navigation = useNavigation<NavigationProp>();
  const [media, setMedia] = React.useState<string>('');
  const [load, setLoad] = React.useState<boolean>(false);
    const dispatch = useAppDispatch();
    const app = useAppSelector(state=>state.post)
  
  const uri = Props?.route?.params?.video?.playableUri ?? Props?.route?.params?.url;

  const { thumbnails, loading, error } = useVideoThumbnails({
    localFile: typeof uri === 'string' ? uri : uri ?? '',
    intervalSeconds: 5,
    maxDurationSeconds: 60,
  });

  React.useEffect(() => {
    if (thumbnails?.length > 0) {
      setMedia(thumbnails[0]);
    }
  }, [thumbnails]);

  const onPicker = async () => {
    try {
      const res = await ImagePicker.openCamera({
        cropping: true,
      });
      if (res?.path) {
      }
    } catch (e) {}
  };

  const showMediaView = React.useCallback(() => {
      return (
        <Pressable style={styles.thumbnailContainer} >
          {media && (
            <Image
              onLoad={() => setLoad(true)}
              onLoadEnd={() => setLoad(!load)}
              onLoadStart={() => setLoad(true)}
              style={styles.thumbnailImage}
              source={{ uri: media }}
              resizeMode={FastImage.resizeMode.contain}
            />
          )}
        </Pressable>
      );
  }, [media]);

  const onSelectThumbnail = (e:string)=>{
    setMedia(e)
      dispatch(setState({videoThumbnail:media}))
  }

  return (
    <AppBackgroundLayer scroll={true}>
      <View style={styles.container}>
        <UploadMediaHeader
          title={'Edit Cover'}
          leftChidlren={
            <Pressable
              style={styles.imageContainer}
              onPress={() => navigation.goBack()}
            >
              <CloseSvg />
            </Pressable>
          }
          rightChidlren={
            <RNButton
              title="Done"
              active
              mainContainer={{ alignSelf: 'flex-end', height: 30, width: 60 }}
              titleStyle={styles.titleStyle}
              entering={FadeInRight.delay(200)}
              onPress={() => navigation.goBack()}
            />
          }
        />

        <Text style={styles.titlText}>
          Select a cover image from your video or camera roll{' '}
        </Text>
        {loading ? (
          <View style={styles.thumbnailContainer}>
            <SkeletonPlaceholder
              borderRadius={4}
              backgroundColor={colors.blurBorderColor}
            >
              <SkeletonPlaceholder.Item
                flexDirection="row"
                alignItems="center"
                alignSelf="center"
              >
                <SkeletonPlaceholder.Item
                  width={'90%'}
                  height={450}
                  borderRadius={10}
                />
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder>
          </View>
        ) : (
          showMediaView()
        )}

        <Thumbnail onPress={onSelectThumbnail} data={thumbnails} />

        <RNButton
          title="ADD CAMERA ROLL"
          active
          mainContainer={{
            marginVertical: spacing.xl,
            width: '90%',
            alignSelf: 'center',
            marginBottom:
              Platform.OS === 'android' ? spacing.xxl * 2 : spacing.xxl,
          }}
          entering={FadeInRight.delay(200)}
          onPress={() => onPicker()}
        />
      </View>
    </AppBackgroundLayer>
  );
};

export default EditCover;

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

  titlText: {
    fontSize: 16,
    fontFamily: fontFamily.regular,
    lineHeight: 24,
    color: colors.white,
    alignSelf: 'center',
    width: '70%',
    textAlign: 'center',
  },
  thumbnailContainer: {
    height: 456,
    width: '100%',
    backgroundColor: "transparent",
    marginVertical: spacing.lg,
  },
  thumbnailImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
});
