import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { createThumbnail } from 'react-native-create-thumbnail';

interface UseVideoThumbnailsOptions {
  localFile: string; // Required: Local file path (e.g. file:///...)
  intervalSeconds?: number; // Optional: Interval between thumbnails
  maxDurationSeconds?: number; // Optional: Max duration of video to scan
}

interface UseVideoThumbnailsResult {
  thumbnails: string[];
  loading: boolean;
  error: string | null;
}

const useVideoThumbnails = ({
  localFile,
  intervalSeconds = 5,
  maxDurationSeconds = 60,
}: UseVideoThumbnailsOptions): UseVideoThumbnailsResult => {
  const [thumbnails, setThumbnails] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const generateThumbnails = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!localFile) {
          throw new Error('No local video file provided.');
        }

        const thumbs: string[] = [];

        for (let time = 0; time < maxDurationSeconds; time += intervalSeconds) {
          const { path } = await createThumbnail({
            url: localFile,
            timeStamp: time * 1000,
          });
          thumbs.push(path);
        }

        setThumbnails(thumbs);
      } catch (err: any) {
        const errorMessage = 'Failed to generate thumbnails.';
        Alert.alert('Error', errorMessage);
        setError(err.message || 'Failed to generate thumbnails.');
      } finally {
        setLoading(false);
      }
    };

    generateThumbnails();
  }, [localFile, intervalSeconds, maxDurationSeconds]);

  return { thumbnails, loading, error };
};

export default useVideoThumbnails;
