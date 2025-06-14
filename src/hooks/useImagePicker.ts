import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Alert, Linking, Platform } from 'react-native';

type PickedImage = {
  uri: string;
  width: number;
  height: number;
  type?: string;
};

export const useImagePicker = () => {
  const [image, setImage] = useState<PickedImage | null>(null);
  const [loading, setLoading] = useState(false);

  const checkAndRequestPermission = async () => {
    const { status, accessPrivileges, canAskAgain } =
      await ImagePicker.getMediaLibraryPermissionsAsync();

      console.log('accessPrivileges : ', accessPrivileges);

    if (status !== 'granted') {
      const result = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (result.status !== 'granted') {
        Alert.alert(
          'Permission Needed',
          'Please allow access to your photo library to continue.',
          [
            {
              text: 'Open Settings',
              onPress: () => Linking.openSettings(),
            },
            { text: 'Cancel', style: 'cancel' },
          ]
        );
        return false;
      }
    }

    if (Platform.OS === 'ios' && accessPrivileges === 'limited') {
      Alert.alert(
        'Limited Access',
        'You have granted limited photo access. You can change this in Settings.',
        [
          {
            text: 'Open Settings',
            onPress: () => Linking.openSettings(),
          },
          { text: 'Continue', style: 'cancel' },
        ]
      );
    }

    return true;
  };

  const pickImage = async () => {
    try {
      setLoading(true);

      const hasPermission = await checkAndRequestPermission();
      if (!hasPermission) return null;

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        allowsEditing: true,
      });

      if (!result.canceled && result.assets?.[0]) {
        const asset = result.assets[0];
        const pickedImage = {
          uri: asset.uri,
          width: asset.width,
          height: asset.height,
          type: asset.type,
        };
        setImage(pickedImage);
        return pickedImage;
      }

      return null;
    } catch (error) {
      console.error('ImagePicker Error:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    image,
    pickImage,
    loading,
  };
};
