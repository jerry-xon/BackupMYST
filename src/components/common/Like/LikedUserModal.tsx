import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  FlatList,
  Modal,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';

interface Props {
  visible: boolean;
  users: { id: string; name: string }[];
  onClose: () => void;
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const LikedUsersModal: React.FC<Props> = ({ visible, users, onClose }) => {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      scale.value = withTiming(1, { duration: 300 });
      opacity.value = withTiming(1, { duration: 200 });
    } else {
      scale.value = withTiming(0, { duration: 200 });
      opacity.value = withTiming(0, { duration: 200 });
    }
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: interpolate(scale.value, [0, 1], [0.8, 1]) }],
    opacity: opacity.value,
  }));

  return (
    <Modal visible={visible} transparent animationType="none">
      <View style={styles.overlay}>
        <Animated.View style={[styles.modalContainer, animatedStyle]}>
          <Text style={styles.header}>Liked by</Text>
          <FlatList
            data={users}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Text style={styles.user}>{item.name}</Text>
            )}
          />
          <Pressable style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Close</Text>
          </Pressable>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: SCREEN_WIDTH * 0.85,
    maxHeight: SCREEN_HEIGHT * 0.6,
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  header: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  user: {
    color: 'white',
    fontSize: 16,
    paddingVertical: 6,
  },
  button: {
    marginTop: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#333',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default LikedUsersModal;
