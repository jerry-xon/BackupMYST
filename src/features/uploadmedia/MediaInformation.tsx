import React from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import AppBackgroundLayer from 'src/components/common/AppBackgroundLayer';
import UploadMediaHeader from 'src/components/common/UploadMediaHeader';
import RNButton from 'src/components/common/RNButton';
import { FadeInDown, FadeInRight } from 'react-native-reanimated';
import CloseSvg from '@assets/icons/svg/CloseSvg.svg';
import { fontFamily } from 'src/themes/typography';
import { colors } from 'src/themes/colors';
import { isValidURL, spacing } from 'src/constants';
import InputBox from 'src/components/common/InputBox';
import TagLine from '@assets/icons/svg/TagLine.svg';
import Attachment from '@assets/icons/svg/AttachmentSvg';
import CProfile from '@assets/icons/svg/CreatorIcon';
import Caption from '@assets/icons/svg/Caption.svg';
import { CategoriesProps, SelectedCategory} from '@features/profile/OnboardProfileController';
import Categories from 'src/components/common/Categories';
import RNVideo from 'src/components/common/video/RNVideo';
import { MainStackParamList } from 'src/navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, useFocusEffect, useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from 'src/store';
import { setFormData, setState } from 'src/store/slice/postSlice';
import { fetchCategories } from 'src/store/slice/categoriesSlice';

type NavigationProp = NativeStackNavigationProp<MainStackParamList,'MediaInformation'>;


type MediaInformationRouteProp = RouteProp<
  MainStackParamList,
  'MediaInformation'
>;
type MediaInformationNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  'MediaInformation'
>;

type Props = {
  route: MediaInformationRouteProp;
  navigation: MediaInformationNavigationProp;
};


function MediaInformation(Props:Props) {
  const { video } = Props.route.params;
  const navigation = useNavigation<NavigationProp>()
  const [categories, setCategories] = React.useState<CategoriesProps[]>();
  const [selectedCategories,setSelectedCategories] = React.useState<SelectedCategory>({});
  const [pause,setPaused] = React.useState<boolean>(true);
  const [urlError ,setUrlError] =  React.useState<string>("")
  const [videoUrl,setVideoUrl] = React.useState<string|null>(null);
  const dispatch = useAppDispatch();
  const value = useAppSelector((state) => state.post);

  const { categories: catgeoryFromApi  , error , status } = useAppSelector((state)=>state.categoris)

  // const realCate = React.useMemo(() => catgeoryFromApi, [catgeoryFromApi]);

  const handelParams = ()=>{
    let url = Props?.route?.params?.video;
    if (url === null) {
      setVideoUrl(null);
    } else {
      console.log(url)
      dispatch(
        setState({
          videoURl: url?.playableUri,
          duration:Platform.OS === 'android' ? url?.duration :  url?.image?.playableDuration,
        })
      );
      setVideoUrl(url?.playableUri);
    }
  }

  React.useEffect(() => {
    setCategories(catgeoryFromApi)
  }, [catgeoryFromApi]);

  React.useEffect(() => {
    dispatch(fetchCategories());
    handelParams()
  }, []);

  useFocusEffect(
      React.useCallback(() => {
        return () => {
          setPaused(true)
        };
      }, [])
  );

  const onSelectCategories = (e: string) => {
     setSelectedCategories((prev) => {
       const updated = { ...prev };
       if (updated.hasOwnProperty(e)) {
         delete updated[e];
       } else {
         updated[e] = e;
       }
       return updated;
     });
   };

  
   const onCheckUrl = (url:string)=>{
    setVideoUrl(url)
    if(isValidURL(url)){
      setUrlError("")
    }else{
      setUrlError("URL is not valid.")
    }
   }

  const renderSelectedMedia = React.useCallback(() => {
    if (videoUrl === null) {
      return (
        <View
          style={[styles.previewContainer, { backgroundColor: 'transparent' }]}
        ></View>
      );
    }
    let url:any = videoUrl;
    return (
      <Pressable style={styles.previewContainer}>
        <RNVideo
          source={{ uri: url }}
          editCover={true}
          paused={pause}
          onPlayAgain={() => setPaused(false)}
          onPlayVideo={() => setPaused(false)}
          onPauseVideo={() => setPaused(true)}
          onPressEditCover={() =>
            navigation.navigate('EditCover', { video: null ,url : videoUrl })
          }
        />
      </Pressable>
    );
  },[videoUrl]);

  const renderPostDetails = () => {

    return (
      <View style={styles.detailsContainer}>
        <View style={{ paddingHorizontal: spacing.md }}>
          <Text style={styles.postDetailsText}>
            {video === null ? 'Upload a link' : 'Post Details'}
          </Text>

          <View style={{ marginVertical: spacing.md }}>
            {Props.route?.params?.video === null && (
              <InputBox
                entering={FadeInDown.delay(100)}
                title="Poslink"
                rightIcon={<Attachment />}
                value={videoUrl === null ? '' : videoUrl}
                onChangeText={onCheckUrl}
                error={urlError}
              />
            )}

            <InputBox
              entering={FadeInDown.delay(100)}
              title="Tagline"
              rightIcon={<TagLine />}
              value={value.tag}
              onChangeText={(e) => dispatch(setState({ tag: e }))}
            />
            <InputBox
              entering={FadeInDown.delay(100)}
              title="Caption"
              rightIcon={<Caption />}
              multiline={true}
              numberOfLines={10}
              value={value.caption}
              onChangeText={(e) => dispatch(setState({ caption: e }))}
            />
            {Props.route?.params?.video === null && (
              <InputBox
                entering={FadeInDown.delay(100)}
                title="Creator’s ID"
                rightIcon={<CProfile />}
              />
            )}

            <View style={styles.categoryContainer}>
              <Text style={styles.postDetailsText}>Select Categories</Text>
              <Text style={styles.selectedCategories}>
                Select{' '}
                <Text style={styles.postDetailsText}>
                  {Object.keys(selectedCategories).length}
                </Text>{' '}
                only
              </Text>
            </View>
          </View>
        </View>
        <View style={{ marginVertical: spacing.lg }}>
          <Categories
            data={catgeoryFromApi}
            onSelect={onSelectCategories}
            active={selectedCategories}
            contentContainerStyle={{ paddingLeft: spacing.md }}
          />
        </View>
      </View>
    );
  };


  const header = React.useCallback(()=>{
    return(
      <UploadMediaHeader
      title={'Video'}
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
          title="POST"
          active
          mainContainer={{ alignSelf: 'flex-end', height: 30, width: 60 }}
          titleStyle={styles.titleStyle}
          entering={FadeInRight.delay(200)}
          onPress={() => dispatch(setFormData())}
        />
      }
    />
    )
  },[])

  return (
    <AppBackgroundLayer scroll={true} stickyHeader={header}>
      <View style={styles.container}>
        {renderSelectedMedia()}
        {renderPostDetails()}
      </View>
    </AppBackgroundLayer>
  );
}

export default React.memo(MediaInformation)

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
    height: 351,
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
    marginLeft:5
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 32,
  },
  selectedCategories: {
    fontSize: 12,
    fontFamily: fontFamily.regular,
    color: colors.white,
  },
  detailsContainer: {
    flex: 1,
    backgroundColor: colors.blurBlue,
    paddingVertical: spacing.md,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontFamily: fontFamily.semiBold,
    color: colors.white,
  },
});
