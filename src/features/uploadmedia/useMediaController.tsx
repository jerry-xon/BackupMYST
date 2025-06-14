import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import useDeviceMedia, { CameraMediaItem } from "src/hooks/useDeviceMedia";
import { MainStackParamList } from "src/navigation/types";
type NavigationProp = NativeStackNavigationProp<MainStackParamList,'VideoLibrary'>;

const useMediaController = ()=>{

    const [status ,setStatus] = React.useState<boolean>(false)
    const [selectedMedia, setSelectedMedia] = React.useState<CameraMediaItem| null>(null);
    const navigation = useNavigation<NavigationProp>();
    const [hasAnimated, setHasAnimated] = React.useState(false);
    const [enableMediaLink, setEnableMediaLink] = React.useState<boolean>();


    React.useEffect(() => {
      if (!hasAnimated && status) {
        setHasAnimated(true);
      }
    }, [status]);

   

    const handleStatus = (item?:CameraMediaItem)=>{
      navigation.navigate('MediaInformation', { video:  item ? item : null  });
      if(item === undefined) {
        setEnableMediaLink(!enableMediaLink)
      }
    }

    const onBack = ()=>{
      navigation.goBack()
    }


    return {
      status,
      activeMedia: selectedMedia,
      handleStatus,
      onBack,
      hasAnimated,
      enableMediaLink,
      setEnableMediaLink
    };
}

export default useMediaController;